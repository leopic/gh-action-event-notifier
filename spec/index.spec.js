'use strict';

let github = require('@actions/github');
let core = require('@actions/core');

const pullRequestPayload = require('./support/stubs/pull-request-payload.json');
const pushPayload = require('./support/stubs/push-payload.json');
const pushCommit = require('./support/stubs/push-commit.json');

const translator = require('../lib/index');
const blockBuilder = require('../lib/block-builder');

describe('Translator', function () {
  describe('run', () => {
    it('should fail without a proper context', () => {
      const oldContext = github.context.payload;
      github.context.payload = {};

      spyOn(core, 'getInput');
      spyOn(core, 'setFailed');
      spyOn(core, 'setOutput');

      translator.run();

      expect(core.getInput).toHaveBeenCalled();
      expect(core.setFailed).toHaveBeenCalled();
      expect(core.setOutput).not.toHaveBeenCalled();

      github.context.payload = oldContext;
    });

    it('should call the appropriate methods in order to create a message', () => {
      spyOn(core, 'getInput').and.returnValues('Success', '123');
      spyOn(blockBuilder, 'getBlockBuilder').and.callThrough();
      spyOn(blockBuilder, 'getFallbackBlocks');
      spyOn(blockBuilder, 'formatBlocks');
      spyOn(core, 'setOutput');
      spyOn(core, 'setFailed');

      translator.run();

      expect(core.getInput).toHaveBeenCalled();
      expect(blockBuilder.getBlockBuilder).toHaveBeenCalled();
      expect(blockBuilder.formatBlocks).toHaveBeenCalled();
      expect(core.setOutput).toHaveBeenCalled();
      expect(core.setFailed).not.toHaveBeenCalled();
    });
  });
});
