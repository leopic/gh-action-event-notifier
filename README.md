![CI](https://github.com/leopic/gh-action-event-slack-parser/workflows/CI/badge.svg)

# GitHub Action Event Slack Notifier
Translates GitHub's events into human readable messages in Slack.

## Setup
To use this GitHub Action you'll first need to create a Slack App and install it to your workspace.

### Creating a Slack App
1. **Create a Slack App**. Go to [Slack's developer site](https://api.slack.com/apps) then click "Create an app".
Name the app "GitHub Action" (you can change this later) and make sure your team's Slack workspace is selected under
"Development Slack Workspace".
2. **Add a Bot user**. Browse to the "Bot users" page listed in the sidebar. Name your bot "GitHub Action" (you can
change this later) and leave the other default settings as-is.
3. **Set an icon for your bot.** Browse to the "Basic information" page listed in the sidebar. Scroll down to the
section titled "Display information" to set an icon.
4. **Install your app to your workspace.** At the top of the "Basic information" page you can find a section titled
"Install your app to your workspace". Click on it, then use the button to complete the installation.

## Usage example

To use this GitHub Action, you'll need to set the following inputs:
- `slackbot-token` to get your Slack bot token, browse to the "OAuth & Permissions" page listed in Slack and copy the
 "Bot User OAuth Access Token" beginning in `xoxb-`.
- `slack-conversation-id` read below
- `github-token` needed to authenticate to GitHub's API
- `run-id` a unique number for each workflow run within a repository, you'll get this
- `job-status` the current status of the job.

Here is how this looks inside a workflow:
```yaml
name: GitHub Event Notifier

on:
  pull_request:
    branches:
      - master

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - name: Notify Slack
        if: always()
        uses: leopic/gh-action-event-notifier@v1.0.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          job-status: ${{ job.status }}
          run-id: ${{ github.run_id }}
          slack-conversation-id: ${{ secrets.SLACK_CHANNEL_ID }}
          slackbot-token: ${{ secrets.SLACK_BOT_TOKEN }}

```

### Slack Conversation ID

A Slack Conversation ID (channel ID) can be:
- The ID of a channel
- The ID of a private group, or user you would like to post a
- The ID of a user that will receive your messages
 
Your bot can message any user in your Slack workspace but needs to be invited into channels and private groups before
it can post to them.

If you open Slack in your web browser, you can find channel IDs at the end of the URL when viewing channels and private
groups. _Note that this doesn't work for direct messages._

```
https://myworkspace.slack.com/messages/CHANNEL_ID/
```

You can also find channel IDs using the Slack API. Get a list of channels that your bot is a member of via Slack's
[users.conversations](https://api.slack.com/methods/users.conversations) endpoint. Get user IDs for direct messages
using Slack's [users.lookupByEmail](https://api.slack.com/methods/users.lookupByEmail) endpoint.

If the channel is private, you'll need to install the App in that channel.

### Output examples
![Push to special branch](https://cldup.com/WVCqixwNqa.png)
![Pull request](https://cldup.com/_rHgXb_aus.png)

#### Special thanks
- [Post Slack messages](https://github.com/marketplace/actions/post-slack-message) for the
 inspiration and borrowed instructions
