'use strict';

const core = require('@actions/core');
const github = require('@actions/github');
const slack = require('@slack/web-api');

const blockBuilder = require('./block-builder');
const postMessage = require('./post-message');
const prefixError = require('./prefix-vendor-error-message');

module.exports.run = async () => {
  let message;

  try {
    const jobStatus = core.getInput('job-status', {required: true});
    const runId = core.getInput('run-id', {required: true});
    const {eventName, payload} = github.context;

    if (!payload) {
      throw new Error('No payload available');
    }

    message = blockBuilder.buildBlocksFor({eventName, jobStatus, payload, runId});

    core.info('Message built');
  } catch (error) {
    return core.setFailed(prefixError(error, 'GitHub'));
  }

  try {
    const slackToken = process.env.SLACK_TOKEN || core.getInput('slackbot-token', {required: true});
    const Slack = new slack.WebClient(slackToken);
    const slackConversationId = process.env.SLACK_CONVERSATION_ID || core.getInput('slack-conversation-id', {required: true});

    await postMessage.postMessage({Slack, channel: slackConversationId, blocks: message});

    core.info('Message posted');
  } catch (error) {
    core.setFailed(prefixError(error, 'Slack'));
  }
};

if (!process.argv.join('').includes('jasmine')) {
  module.exports.run();
}
