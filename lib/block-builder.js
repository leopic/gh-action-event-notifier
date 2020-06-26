'use strict';

module.exports.getTextBlock = ({text}) => {
  return {
    "type": "mrkdwn",
    "text": text
  }
};

module.exports.divider = {
  "type": "divider"
};

module.exports.getShortSha = ({sha}) => {
  return sha.substring(0, 7);
};

module.exports.getField = ({head, body}) => {
  return {
    "type": "mrkdwn",
    "text": `*${head}*: ${body}`
  }
};

module.exports.getButton = ({title, url}) => {
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": title
    },
    "url": url
  };
};

module.exports.getFallbackBlocks = ({jobStatus, payload, eventName}) => {
  const repoName = `*<${payload.repository.html_url}|${payload.repository.full_name}>*`;
  const success = jobStatus.toLowerCase() === 'success';
  const author = `<${payload.sender.html_url}|${payload.sender.login}>`;
  const emoji = success ? ':thumbsup:' : ':thumbsdown:';
  const eventLink = `<${payload.repository.html_url}|${eventName}>`;

  return [
    {
      "type": "section",
      "text": this.getTextBlock({text: `${repoName}: the result of a ${eventName} by ${author} was: ${emoji}\n Details: ${eventLink}`})
    },
    this.divider
  ];
};

module.exports.getCommitListMessage = ({commits}) => {
  if (!commits || !commits.length) {
    return 'No new commits were found';
  }

  let message = 'The following commits were pushed:\n';

  commits.map(commit => {
    let commitMessage = `- <${commit.url}|${this.getShortSha({sha: commit.id})}>: ${commit.message}, ${commit.author.name}\n`;
    return message += commitMessage;
  });

  return message;
};

module.exports.getPushBlocks = ({jobStatus, payload, runId}) => {
  const repoName = `*<${payload.repository.html_url}|${payload.repository.full_name}>*`;
  const success = jobStatus.toLowerCase() === 'success';
  const emoji = success ? ':thumbsup:' : ':thumbsdown:';
  const ref = payload.ref;
  const isProd = ref === 'refs/heads/prod';
  const isStaging = ref === 'refs/heads/staging';
  const isDeploy = isStaging || isProd;
  const stage = isProd ? 'prod' : 'staging';
  const branch = ref.split('/').pop();
  const target = isDeploy ? stage : branch;
  const verb = isDeploy ? 'deploy' : 'push';
  const firstLine = `${repoName}`;
  const secondLine = success ? `A *${verb}* was made to *${target}* ${emoji}` : `A *${verb}* to *${target}* failed ${emoji}`;
  const message = [firstLine, secondLine];
  const url = `${payload.repository.html_url}/actions/runs/${runId}`;

  if (isDeploy && success) {
    message.push(this.getCommitListMessage({commits: payload.commits}));
  }

  return [
    {
      "type": "section",
      "text": this.getTextBlock({text: message.join('\n').trim()}),
      "accessory": this.getButton({title: 'Execution Details', url})
    },
    this.divider
  ];
};

module.exports.getPullRequestBlocks = ({jobStatus, payload, runId}) => {
  const success = jobStatus.toLowerCase() === 'success';
  const pullRequest = payload.pull_request;

  const repoName = `*<${payload.repository.html_url}|${payload.repository.full_name}>*`;
  const firstLine = `${repoName}`;

  const emoji = success ? ':thumbsup:' : ':thumbsdown:';
  const prURL = pullRequest.html_url;
  const pullRequestLink = `<${prURL}|${pullRequest.title} #${pullRequest.number}>`;
  const secondLine = `${pullRequestLink} ${emoji}`;

  const author = `<${payload.sender.html_url}|${payload.sender.login}>`;
  const thirdLine = `${author} submitted a pull request`;
  const runURL = `${payload.repository.html_url}/actions/runs/${runId}`;

  return [
    {
      "type": "section",
      "text": this.getTextBlock({text: [firstLine, secondLine, thirdLine].join('\n')}),
      "accessory": this.getButton({title: 'Execution Details', url: `${runURL}`}),
      "fields": [
        this.getField({head: 'Branch', body: pullRequest.head.ref}),
        this.getField({head: 'Sha', body: pullRequest.head.sha.substring(0, 7)}),
        this.getField({head: 'Changed files', body: pullRequest.changed_files}),
        this.getField({head: 'Commits', body: pullRequest.commits})
      ]
    },
    this.divider
  ];
};

module.exports.buildBlocksFor = ({eventName, jobStatus, payload, runId}) => {
  switch (eventName) {
    case 'pull_request':
      return this.getPullRequestBlocks({jobStatus, payload, runId});
    case 'push':
      return this.getPushBlocks({jobStatus, payload, runId});
    default:
      return this.getFallbackBlocks({eventName, jobStatus, payload, runId});
  }
};
