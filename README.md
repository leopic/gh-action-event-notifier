![CI](https://github.com/leopic/gh-action-event-slack-parser/workflows/CI/badge.svg)

# GitHub Action Event Slack Block Parser
A GitHub action to parse interesting events into a slack friendly format.

## Usage
```yaml
name: Event Parser

on:
  pull_request:
    branches:
      - master

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - name: Fetching Slack Message
        if: always()
        uses: leopic/gh-action-translator@v1.0.0
        id: parser
        with:
          job-status: ${{ job.status }}

```

## Output example

### Pull Request
```json
[{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "*<https://github.com/Codertocat/Hello-World|Codertocat/Hello-World>*\n<https://github.com/Codertocat/Hello-World/pull/2|Update the README with new information. #2> :thumbsup:\n<https://github.com/Codertocat|Codertocat> submitted a pull request"
		},
		"accessory": {
			"type": "button",
			"text": {
				"type": "plain_text",
				"text": "Execution Details"
			},
			"url": "https://github.com/Codertocat/Hello-World/actions/runs/123"
		},
		"fields": [{
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
]
```

### Push
```json
[{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "A *deploy* was made to *prod* :thumbsup:\nThe following commits were pushed:\n- <https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e|6dcb09b>: Fix all the bugs, Monalisa Octocat"
		},
		"accessory": {
			"type": "button",
			"text": {
				"type": "plain_text",
				"text": "Execution Details"
			},
			"url": "https://github.com/Codertocat/Hello-World/actions/runs/111"
		}
	},
	{
		"type": "divider"
	}
]
```

*Note:* the actual output has all quotes escaped (\").

## Usage example using `Post Slack messages`
You would then take the output from this action into another action, such as
[pullreminders/slack-action](https://github.com/marketplace/actions/post-slack-message) and
feed it into a Slack channel of your choosing. 

```yaml
name: Event Parser

on:
  pull_request:
    branches:
      - master

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - name: Fetching Slack Message
        if: always()
        uses: leopic/gh-action-translator@v1.0.0
        id: parser
        with:
          job-status: ${{ job.status }}
      - name: Notify slack
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }} # Make sure this is defined
        uses: pullreminders/slack-action@master
        with:
          args: '{
            \"channel\": \"YOUR_CHANNEL_ID\",
            \"blocks\": ${{ steps.parser.outputs.blocks }}
          }'
```

### Output examples
![Push to special branch](https://cldup.com/WVCqixwNqa.png)
![Pull request](https://cldup.com/_rHgXb_aus.png)
