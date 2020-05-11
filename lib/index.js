'use strict';

const core = require('@actions/core');
const github = require('@actions/github');

const blockBuilder = require('./block-builder');

module.exports.run = () => {
  try {
    const jobStatus = core.getInput('job-status');
    const runId = core.getInput('run-id');
    const payload = github.context.payload;

    if (!jobStatus) {
      throw new Error('Job status missing');
    }

    if (!runId) {
      throw new Error('Run ID missing');
    }

    if (!payload) {
      throw new Error('No payload available');
    }

    const blocks = blockBuilder.getBlockBuilder(github.context.eventName, jobStatus, payload, runId);
    const formattedBlocks = blockBuilder.formatBlocks(blocks);

    core.setOutput('blocks', formattedBlocks);
  } catch (error) {
    core.setFailed(error.message);
  }
};

if (!process.argv.join('').includes('jasmine')) {
  module.exports.run();
}
