'use strict';

const core = require('@actions/core');
const github = require('@actions/github');

const getFallbackBlocks = (jobStatus, payload) => {
  const repoName = `*<${payload.repository.html_url}|${payload.repository.full_name}>*`;
  const eventName = github.context.eventName;
  const success = jobStatus === 'Success';
  const author = `<${payload.sender.html_url}|${payload.sender.login}>`;
  const emoji = success ? ':thumbsup:' : ':thumbsdown:';
  const eventLink = `<${payload.repository.html_url}|${eventName}>`;

  return [
    {
      "type": "section",
      "text": `${repoName}: the result of a ${eventName} by ${author} was: ${emoji}\n Details: ${eventLink}`
    }
  ];
};

const getField = (head, body) => {
  return {
    "type": "mrkdwn",
    "text": `*${head}*: ${body}`
  }
};

const getButton = (title, url) => {
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": title
    },
    "url": url
  };
};

const getPullRequestBlocks = (jobStatus, payload) => {
  const success = jobStatus === 'Success';
  const pullRequest = payload.pull_request;

  const repoName = `*<${payload.repository.html_url}|${payload.repository.full_name}>*`;
  const firstLine = `${repoName}`;

  const emoji = success ? ':thumbsup:' : ':thumbsdown:';
  const prURL = pullRequest.html_url;
  const pullRequestLink = `<${prURL}|${pullRequest.title} #${pullRequest.number}>`;
  const secondLine = `${pullRequestLink} ${emoji}`;

  const author = `<${payload.sender.html_url}|${payload.sender.login}>`;
  const thirdLine = `${author} submitted a pull request`;

  const textBlock = {
    "type": "mrkdwn",
    "text": [firstLine, secondLine, thirdLine].join('\n')
  };

  const divider = {
    "type": "divider"
  };

  return [
    {
      "type": "section",
      "text": textBlock,
      "accessory": getButton('Execution Details', `${prURL}/checks`),
      "fields": [
        getField('Branch', pullRequest.head.ref),
        getField('Sha', pullRequest.head.sha.substring(0, 7)),
        getField('Changed files', pullRequest.changed_files),
        getField('Commits', pullRequest.commits)
      ]
    },
    divider
  ];
};

const formatBlocks = obj => {
  return JSON.stringify(obj).replace(/"/g, '\\"')
};

const run = () => {
  try {
    const jobStatus = core.getInput('job-status');
    const payload = github.context.payload;
    const isPR = github.context.eventName === 'pull_request';
    const blocks = isPR ? getPullRequestBlocks(jobStatus, payload) : getFallbackBlocks(jobStatus, payload);

    core.setOutput('blocks', formatBlocks(blocks));
  } catch (error) {
    core.setFailed(error.message);
  }
};

module.exports = {
  getPullRequestBlocks: getPullRequestBlocks,
  getField: getField,
  getButton: getButton,
  getFallbackBlocks: getFallbackBlocks,
  formatBlocks: formatBlocks,
  run: run
};

if (!process.argv.join('').includes('jasmine')) {
  run();
}

