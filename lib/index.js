'use strict';

const core = require('@actions/core');
const github = require('@actions/github');

module.exports.getTextBlock = text => {
  return {
    "type": "mrkdwn",
    "text": text
  }
};

module.exports.divider = {
  "type": "divider"
};

module.exports.getShortSha = sha => {
  return sha.substring(0, 7);
};

module.exports.getField = (head, body) => {
  return {
    "type": "mrkdwn",
    "text": `*${head}*: ${body}`
  }
};

module.exports.getButton = (title, url) => {
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": title
    },
    "url": url
  };
};

module.exports.getFallbackBlocks = (jobStatus, payload) => {
  const repoName = `*<${payload.repository.html_url}|${payload.repository.full_name}>*`;
  const eventName = github.context.eventName;
  const success = jobStatus === 'Success';
  const author = `<${payload.sender.html_url}|${payload.sender.login}>`;
  const emoji = success ? ':thumbsup:' : ':thumbsdown:';
  const eventLink = `<${payload.repository.html_url}|${eventName}>`;

  return [
    {
      "type": "section",
      "text": this.getTextBlock(`${repoName}: the result of a ${eventName} by ${author} was: ${emoji}\n Details: ${eventLink}`)
    },
    this.divider
  ];
};

module.exports.getCommitListMessage = payload => {
  if (!payload.commits.length) {
    return 'No new commits were found';
  }

  let message = 'The following commits were pushed:\n';

  payload.commits.map(commit => {
    let sha = this.getShortSha(commit.id);
    let commitMessage = `- ${sha} ${commit.message} by ${commit.author.name}\n`;
    return message += commitMessage;
  });

  return message;
};

module.exports.getPushBlocks = (jobStatus, payload) => {
  console.log('___ module.exports.getPushBlocks', payload);

  const repoName = `*<${payload.repository.html_url}|${payload.repository.full_name}>*`;
  const success = jobStatus === 'Success';
  const emoji = success ? ':thumbsup:' : ':thumbsdown:';
  const sha = this.getShortSha(payload.before);
  const ref = payload.ref;
  const isProd = ref === 'refs/heads/prod';
  const isStaging = ref === 'refs/heads/staging';
  const isDeploy = isStaging || isProd;
  const stage = isProd ? 'prod' : 'staging';
  const branch = ref.split('/').pop();
  const target = isDeploy ? stage : branch;
  const verb = isDeploy ? 'deploy' : 'push';
  const firstLine = `${repoName}: the result of a ${verb} to *${target}* was: ${emoji}. Head is at ${sha}`;
  const message = [firstLine];

  if (isDeploy) {
    message.push(this.getCommitListMessage(payload));
  }

  return [
    {
      "type": "section",
      "text": this.getTextBlock(message.join('\n').trim())
    },
    this.divider
  ];
};

module.exports.getPullRequestBlocks = (jobStatus, payload) => {
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

  return [
    {
      "type": "section",
      "text": this.getTextBlock([firstLine, secondLine, thirdLine].join('\n')),
      "accessory": this.getButton('Execution Details', `${prURL}/checks`),
      "fields": [
        this.getField('Branch', pullRequest.head.ref),
        this.getField('Sha', pullRequest.head.sha.substring(0, 7)),
        this.getField('Changed files', pullRequest.changed_files),
        this.getField('Commits', pullRequest.commits)
      ]
    },
    this.divider
  ];
};

module.exports.formatBlocks = obj => {
  console.log('___ formattedBlocks', obj);
  return JSON.stringify(obj).replace(/"/g, '\\"');
};

module.exports.getBlockBuilder = (eventName, jobStatus, payload) => {
  switch (eventName) {
    case 'pull_request':
      return this.getPullRequestBlocks(jobStatus, payload);
    case 'push':
      return this.getPushBlocks(jobStatus, payload);
    default:
      return this.getFallbackBlocks(jobStatus, payload);
  }
};

module.exports.run = () => {
  try {
    const jobStatus = core.getInput('job-status');
    const payload = github.context.payload;
    const blocks = this.getBlockBuilder(github.context.eventName, jobStatus, payload);
    const formattedBlocks = this.formatBlocks(blocks);

    core.setOutput('blocks', formattedBlocks);
  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  }
};

if (!process.argv.join('').includes('jasmine')) {
  module.exports.run();
}
