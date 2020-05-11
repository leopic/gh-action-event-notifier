'use strict';

let github = require('@actions/github');
let core = require('@actions/core');

const pullRequestPayload = require('./support/stubs/pull-request-payload.json');
const pushPayload = require('./support/stubs/push-payload.json');
const pushCommit = require('./support/stubs/push-commit.json');

const blockBuilder = require('../lib/block-builder');

describe('Block Builder', function () {
  describe('formatBlocks', () => {
    it('should prepare a simple object to be consumed by Slack', () => {
      const input = {url: "http://github.com"};

      const expectation = '{\\\"url\\\":\\\"http://github.com\\\"}';
      const output = blockBuilder.formatBlocks(input);

      expect(output).toEqual(expectation);
    });
  });

  describe('getBlockBuilder', () => {
    it('should route pull requests to the getPullRequestBlocks', () => {
      spyOn(blockBuilder, 'getPullRequestBlocks');
      blockBuilder.getBlockBuilder('pull_request');
      expect(blockBuilder.getPullRequestBlocks).toHaveBeenCalled();
    });

    it('should route pushes to the getPushBlocks', () => {
      spyOn(blockBuilder, 'getPushBlocks');
      blockBuilder.getBlockBuilder('push');
      expect(blockBuilder.getPushBlocks).toHaveBeenCalled();
    });

    it('should route all other events to getFallbackBlocks', () => {
      spyOn(blockBuilder, 'getFallbackBlocks');
      blockBuilder.getBlockBuilder('other');
      expect(blockBuilder.getFallbackBlocks).toHaveBeenCalled();
    });
  });

  describe('getButton', () => {
    it('should return a button object', () => {
      const output = blockBuilder.getButton('Google', 'https://google.com');
      const expectation = {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": 'Google'
        },
        "url": 'https://google.com'
      };

      expect(output).toEqual(expectation);
    });
  });

  describe('getCommitListMessage', () => {
    it('should return an empty string when no commits are found', () => {
      const output = blockBuilder.getCommitListMessage({commits: []});

      expect(output).toEqual('No new commits were found');
    });

    it('should return a list of commits when there are commits in the payload', () => {
      const expectation = "The following commits were pushed:\n"
        + "- <https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e|6dcb09b>: Fix all the bugs, Monalisa Octocat\n";

      const output = blockBuilder.getCommitListMessage({commits: [pushCommit]});

      expect(output).toEqual(expectation);
    });
  });

  describe('getField', () => {
    it('should return a field object', () => {
      const output = blockBuilder.getField('Sha', 'ffee00');
      const expectation = {
        "type": "mrkdwn",
        "text": "*Sha*: ffee00"
      };

      expect(output).toEqual(expectation);
    });
  });

  describe('getTextBlock', () => {
    it('should create an object containing the provided text', () => {
      const input = 'hello world!';

      const expectation = {
        "type": "mrkdwn",
        "text": input
      };
      const output = blockBuilder.getTextBlock(input);

      expect(output).toEqual(expectation);
    });
  });

  describe('prepareOutput', () => {
    it('should properly stringify an object and escape quotes', () => {
      const input = {text: "test", list: ["of", "strings"]};
      const output = blockBuilder.formatBlocks(input);
      const expectation = "{\\\"text\\\":\\\"test\\\",\\\"list\\\":[\\\"of\\\",\\\"strings\\\"]}";

      expect(output).toEqual(expectation);
    });
  });

  describe('getFallbackBlocks', () => {
    it('should provide a fallback message for non pull request events', () => {
      const oldEventName = github.context.eventName;
      github.context.eventName = 'push';

      const output = blockBuilder.getFallbackBlocks('Failure', pushPayload, null, 'push');
      const expectation = [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*<https://github.com/Codertocat/Hello-World|Codertocat/Hello-World>*: the result of a push by" +
              " <https://github.com/Codertocat|Codertocat> was: :thumbsdown:\n Details: <https://github.com/Codertocat/Hello-World|push>"
          }
        },
        {
          "type": "divider"
        }
      ];

      expect(output).toEqual(expectation);

      github.context.eventName = oldEventName;
    });
  });

  describe('getPullRequestBlocks', () => {
    it('should build an object for a pull request event', () => {
      const oldEventName = github.context.eventName;
      github.context.eventName = 'pull_request';

      const output = blockBuilder.getPullRequestBlocks('Success', pullRequestPayload, 123);
      const expectation = [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*<https://github.com/Codertocat/Hello-World|Codertocat/Hello-World>*\n" +
              "<https://github.com/Codertocat/Hello-World/pull/2|Update the README with new information. #2> :thumbsup:\n" +
              "<https://github.com/Codertocat|Codertocat> submitted a pull request"
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": 'Execution Details'
            },
            "url": 'https://github.com/Codertocat/Hello-World/actions/runs/123'
          },
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Branch*: changes"
            },
            {
              "type": "mrkdwn",
              "text": "*Sha*: ec26c3e"
            },
            {
              "type": "mrkdwn",
              "text": "*Changed files*: 1"
            },
            {
              "type": "mrkdwn",
              "text": "*Commits*: 1"
            }
          ]
        },
        {
          "type": "divider"
        }
      ];

      expect(output).toEqual(expectation);

      github.context.eventName = oldEventName;
    });
  });

  describe('getPushBlocks', () => {
    it('should provide a friendly formatted message for a push event to any branch', () => {
      const oldEventName = github.context.eventName;
      github.context.eventName = 'push';

      const output = blockBuilder.getPushBlocks('Failure', pushPayload, 123);
      const expectation = [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*<https://github.com/Codertocat/Hello-World|Codertocat/Hello-World>*\nA *push* to *simple-tag* failed :thumbsdown:"
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": 'Execution Details'
            },
            "url": 'https://github.com/Codertocat/Hello-World/actions/runs/123'
          }
        },
        {
          "type": "divider"
        }
      ];

      expect(output).toEqual(expectation);

      github.context.eventName = oldEventName;
    });

    it('should provide a friendly formatted message for a failed push event to a special branch', () => {
      const oldEventName = github.context.eventName;
      const oldTargetRef = pushPayload.ref;
      github.context.eventName = 'push';
      pushPayload.commits = [pushCommit];
      pushPayload.ref = 'refs/heads/prod';

      const output = blockBuilder.getPushBlocks('Failed', pushPayload, 123);
      const message = "*<https://github.com/Codertocat/Hello-World|Codertocat/Hello-World>*\nA *deploy* to *prod* failed :thumbsdown:";

      const expectation = [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": message
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": 'Execution Details'
            },
            "url": 'https://github.com/Codertocat/Hello-World/actions/runs/123'
          }
        },
        {
          "type": "divider"
        }
      ];

      expect(output).toEqual(expectation);

      github.context.eventName = oldEventName;
      pushPayload.ref = oldTargetRef;
      pushPayload.commits = [];
    });

    it('should provide a friendly formatted message for a successful push event to a special branch', () => {
      const oldEventName = github.context.eventName;
      const oldTargetRef = pushPayload.ref;
      github.context.eventName = 'push';
      pushPayload.commits = [pushCommit];
      pushPayload.ref = 'refs/heads/prod';

      const output = blockBuilder.getPushBlocks('Success', pushPayload, 111);
      let message = "*<https://github.com/Codertocat/Hello-World|Codertocat/Hello-World>*\n";
      message += "A *deploy* was made to *prod* :thumbsup:\n";
      message += "The following commits were pushed:\n";
      message += "- <https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e|6dcb09b>: Fix all the bugs, Monalisa Octocat\n";

      const expectation = [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": message.trim()
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": 'Execution Details'
            },
            "url": 'https://github.com/Codertocat/Hello-World/actions/runs/111'
          }
        },
        {
          "type": "divider"
        }
      ];

      expect(output).toEqual(expectation);

      github.context.eventName = oldEventName;
      pushPayload.ref = oldTargetRef;
      pushPayload.commits = [];
    });
  });
});
