const core = require('@actions/core');
const github = require('@actions/github');

try {
  const slackChannel = core.getInput('slack-channel');

  const payload = JSON.stringify(github.context.payload, undefined, 2);

  console.log(`___ the event payload: ${payload}`);

  const existing = "" +
    "*${{github.repository}}*: the result of a ${{github.event_name}} by ${{github.actor}} was: *${{job.status}}*.\n" +
    "See more <${{github.event.pull_request.html_url}}/checks?check_run_id=${{github.run_id}}|details>." +
    "";

  const data = {
    "channel": `${slackChannel}`,
    "text": `
      👷 Work
      🚧 In
      🏗 Progress
    `
  };

  const stringifiedData = JSON.stringify(data);
  const output = stringifiedData.replace(/"/g, '\\"');

  core.setOutput('message', JSON.stringify(output));
} catch (error) {
  core.setFailed(error.message);
}
