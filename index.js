const core = require('@actions/core');
const github = require('@actions/github');

const getFallbackBlocks = (jobStatus, payload) => {
  const success = jobStatus === 'Success';
  const eventName = github.context.eventName.replace('_', ' ');
  const eventLink = `<${payload.repository.html_url}|${eventName}>`;
  const author = `<${payload.sender.html_url}|${payload.sender.login}>`;
  const repoName = `*<${payload.repository.html_url}|${payload.repository.full_name}>*`;
  const emoji = success ? ':thumbsup:' : ':thumbsdown:';

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

const getPullRequestBlocks = (jobStatus, runId, payload) => {
  const success = jobStatus === 'Success';
  const pullRequest = payload.pull_request;

  const repoName = `*<${payload.repository.html_url}|${payload.repository.full_name}>*`;
  const firstLine = `${repoName}`;

  const emoji = success ? ':thumbsup:' : ':thumbsdown:';
  const pullRequestLink = `<${pullRequest.html_url}|${pullRequest.title} #${pullRequest.number}>`;
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
      "accessory": getButton('Execution Details', `${pullRequest.html_url}/runs/${runId}`),
      "fields": [
        getField('Branch', pullRequest.head.ref),
        getField('Sha', pullRequest.head.sha),
        getField('Changed files', pullRequest.changed_files),
        getField('Commits', pullRequest.head.commits)
      ]
    },
    divider
  ];
};

try {
  const jobStatus = core.getInput('job-status');
  const runId = core.getInput('run-id');
  const payload = github.context.payload;
  const isPR = github.context.eventName === 'pull_request';
  const blocks = isPR ? getPullRequestBlocks(jobStatus, runId, payload) : getFallbackBlocks(jobStatus, payload);

  core.setOutput('blocks', JSON.stringify(blocks));
} catch (error) {
  core.setFailed(error.message);
}

const mockPayload = {
  "action": "synchronize",
  "after": "d4e87de297de0cc0cbfba4086c4d2dac0babbf5e",
  "before": "b45303de24a63a1f8d4dc6304c0952aca1b55438",
  "number": 63,
  "organization": {
    "avatar_url": "https://avatars1.githubusercontent.com/u/8427696?v=4",
    "description": "",
    "events_url": "https://api.github.com/orgs/connectsense/events",
    "hooks_url": "https://api.github.com/orgs/connectsense/hooks",
    "id": 8427696,
    "issues_url": "https://api.github.com/orgs/connectsense/issues",
    "login": "connectsense",
    "members_url": "https://api.github.com/orgs/connectsense/members{/member}",
    "node_id": "MDEyOk9yZ2FuaXphdGlvbjg0Mjc2OTY=",
    "public_members_url": "https://api.github.com/orgs/connectsense/public_members{/member}",
    "repos_url": "https://api.github.com/orgs/connectsense/repos",
    "url": "https://api.github.com/orgs/connectsense"
  },
  "pull_request": {
    "_links": {
      "comments": {
        "href": "https://api.github.com/repos/connectsense/connectsense-cord/issues/63/comments"
      },
      "commits": {
        "href": "https://api.github.com/repos/connectsense/connectsense-cord/pulls/63/commits"
      },
      "html": {
        "href": "https://github.com/connectsense/connectsense-cord/pull/63"
      },
      "issue": {
        "href": "https://api.github.com/repos/connectsense/connectsense-cord/issues/63"
      },
      "review_comment": {
        "href": "https://api.github.com/repos/connectsense/connectsense-cord/pulls/comments{/number}"
      },
      "review_comments": {
        "href": "https://api.github.com/repos/connectsense/connectsense-cord/pulls/63/comments"
      },
      "self": {
        "href": "https://api.github.com/repos/connectsense/connectsense-cord/pulls/63"
      },
      "statuses": {
        "href": "https://api.github.com/repos/connectsense/connectsense-cord/statuses/d4e87de297de0cc0cbfba4086c4d2dac0babbf5e"
      }
    },
    "additions": 54,
    "assignee": null,
    "assignees": [],
    "author_association": "CONTRIBUTOR",
    "base": {
      "label": "connectsense:master",
      "ref": "master",
      "repo": {
        "archive_url": "https://api.github.com/repos/connectsense/connectsense-cord/{archive_format}{/ref}",
        "archived": false,
        "assignees_url": "https://api.github.com/repos/connectsense/connectsense-cord/assignees{/user}",
        "blobs_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/blobs{/sha}",
        "branches_url": "https://api.github.com/repos/connectsense/connectsense-cord/branches{/branch}",
        "clone_url": "https://github.com/connectsense/connectsense-cord.git",
        "collaborators_url": "https://api.github.com/repos/connectsense/connectsense-cord/collaborators{/collaborator}",
        "comments_url": "https://api.github.com/repos/connectsense/connectsense-cord/comments{/number}",
        "commits_url": "https://api.github.com/repos/connectsense/connectsense-cord/commits{/sha}",
        "compare_url": "https://api.github.com/repos/connectsense/connectsense-cord/compare/{base}...{head}",
        "contents_url": "https://api.github.com/repos/connectsense/connectsense-cord/contents/{+path}",
        "contributors_url": "https://api.github.com/repos/connectsense/connectsense-cord/contributors",
        "created_at": "2019-11-18T21:56:31Z",
        "default_branch": "gh-actions",
        "deployments_url": "https://api.github.com/repos/connectsense/connectsense-cord/deployments",
        "description": null,
        "disabled": false,
        "downloads_url": "https://api.github.com/repos/connectsense/connectsense-cord/downloads",
        "events_url": "https://api.github.com/repos/connectsense/connectsense-cord/events",
        "fork": false,
        "forks": 0,
        "forks_count": 0,
        "forks_url": "https://api.github.com/repos/connectsense/connectsense-cord/forks",
        "full_name": "connectsense/connectsense-cord",
        "git_commits_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/commits{/sha}",
        "git_refs_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/refs{/sha}",
        "git_tags_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/tags{/sha}",
        "git_url": "git://github.com/connectsense/connectsense-cord.git",
        "has_downloads": true,
        "has_issues": true,
        "has_pages": false,
        "has_projects": true,
        "has_wiki": true,
        "homepage": null,
        "hooks_url": "https://api.github.com/repos/connectsense/connectsense-cord/hooks",
        "html_url": "https://github.com/connectsense/connectsense-cord",
        "id": 222552416,
        "issue_comment_url": "https://api.github.com/repos/connectsense/connectsense-cord/issues/comments{/number}",
        "issue_events_url": "https://api.github.com/repos/connectsense/connectsense-cord/issues/events{/number}",
        "issues_url": "https://api.github.com/repos/connectsense/connectsense-cord/issues{/number}",
        "keys_url": "https://api.github.com/repos/connectsense/connectsense-cord/keys{/key_id}",
        "labels_url": "https://api.github.com/repos/connectsense/connectsense-cord/labels{/name}",
        "language": "TypeScript",
        "languages_url": "https://api.github.com/repos/connectsense/connectsense-cord/languages",
        "license": null,
        "merges_url": "https://api.github.com/repos/connectsense/connectsense-cord/merges",
        "milestones_url": "https://api.github.com/repos/connectsense/connectsense-cord/milestones{/number}",
        "mirror_url": null,
        "name": "connectsense-cord",
        "node_id": "MDEwOlJlcG9zaXRvcnkyMjI1NTI0MTY=",
        "notifications_url": "https://api.github.com/repos/connectsense/connectsense-cord/notifications{?since,all,participating}",
        "open_issues": 4,
        "open_issues_count": 4,
        "owner": {
          "avatar_url": "https://avatars1.githubusercontent.com/u/8427696?v=4",
          "events_url": "https://api.github.com/users/connectsense/events{/privacy}",
          "followers_url": "https://api.github.com/users/connectsense/followers",
          "following_url": "https://api.github.com/users/connectsense/following{/other_user}",
          "gists_url": "https://api.github.com/users/connectsense/gists{/gist_id}",
          "gravatar_id": "",
          "html_url": "https://github.com/connectsense",
          "id": 8427696,
          "login": "connectsense",
          "node_id": "MDEyOk9yZ2FuaXphdGlvbjg0Mjc2OTY=",
          "organizations_url": "https://api.github.com/users/connectsense/orgs",
          "received_events_url": "https://api.github.com/users/connectsense/received_events",
          "repos_url": "https://api.github.com/users/connectsense/repos",
          "site_admin": false,
          "starred_url": "https://api.github.com/users/connectsense/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/connectsense/subscriptions",
          "type": "Organization",
          "url": "https://api.github.com/users/connectsense"
        },
        "private": true,
        "pulls_url": "https://api.github.com/repos/connectsense/connectsense-cord/pulls{/number}",
        "pushed_at": "2020-02-27T21:54:38Z",
        "releases_url": "https://api.github.com/repos/connectsense/connectsense-cord/releases{/id}",
        "size": 381,
        "ssh_url": "git@github.com:connectsense/connectsense-cord.git",
        "stargazers_count": 0,
        "stargazers_url": "https://api.github.com/repos/connectsense/connectsense-cord/stargazers",
        "statuses_url": "https://api.github.com/repos/connectsense/connectsense-cord/statuses/{sha}",
        "subscribers_url": "https://api.github.com/repos/connectsense/connectsense-cord/subscribers",
        "subscription_url": "https://api.github.com/repos/connectsense/connectsense-cord/subscription",
        "svn_url": "https://github.com/connectsense/connectsense-cord",
        "tags_url": "https://api.github.com/repos/connectsense/connectsense-cord/tags",
        "teams_url": "https://api.github.com/repos/connectsense/connectsense-cord/teams",
        "trees_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/trees{/sha}",
        "updated_at": "2020-02-27T21:52:35Z",
        "url": "https://api.github.com/repos/connectsense/connectsense-cord",
        "watchers": 0,
        "watchers_count": 0
      },
      "sha": "8f1a1edbe3f93c7ff1495dac05712e2f324d70bd",
      "user": {
        "avatar_url": "https://avatars1.githubusercontent.com/u/8427696?v=4",
        "events_url": "https://api.github.com/users/connectsense/events{/privacy}",
        "followers_url": "https://api.github.com/users/connectsense/followers",
        "following_url": "https://api.github.com/users/connectsense/following{/other_user}",
        "gists_url": "https://api.github.com/users/connectsense/gists{/gist_id}",
        "gravatar_id": "",
        "html_url": "https://github.com/connectsense",
        "id": 8427696,
        "login": "connectsense",
        "node_id": "MDEyOk9yZ2FuaXphdGlvbjg0Mjc2OTY=",
        "organizations_url": "https://api.github.com/users/connectsense/orgs",
        "received_events_url": "https://api.github.com/users/connectsense/received_events",
        "repos_url": "https://api.github.com/users/connectsense/repos",
        "site_admin": false,
        "starred_url": "https://api.github.com/users/connectsense/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/connectsense/subscriptions",
        "type": "Organization",
        "url": "https://api.github.com/users/connectsense"
      }
    },
    "body": "Don't review",
    "changed_files": 1,
    "closed_at": null,
    "comments": 0,
    "comments_url": "https://api.github.com/repos/connectsense/connectsense-cord/issues/63/comments",
    "commits": 20,
    "commits_url": "https://api.github.com/repos/connectsense/connectsense-cord/pulls/63/commits",
    "created_at": "2020-02-27T19:35:07Z",
    "deletions": 0,
    "diff_url": "https://github.com/connectsense/connectsense-cord/pull/63.diff",
    "draft": false,
    "head": {
      "label": "connectsense:gh-actions",
      "ref": "gh-actions",
      "repo": {
        "archive_url": "https://api.github.com/repos/connectsense/connectsense-cord/{archive_format}{/ref}",
        "archived": false,
        "assignees_url": "https://api.github.com/repos/connectsense/connectsense-cord/assignees{/user}",
        "blobs_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/blobs{/sha}",
        "branches_url": "https://api.github.com/repos/connectsense/connectsense-cord/branches{/branch}",
        "clone_url": "https://github.com/connectsense/connectsense-cord.git",
        "collaborators_url": "https://api.github.com/repos/connectsense/connectsense-cord/collaborators{/collaborator}",
        "comments_url": "https://api.github.com/repos/connectsense/connectsense-cord/comments{/number}",
        "commits_url": "https://api.github.com/repos/connectsense/connectsense-cord/commits{/sha}",
        "compare_url": "https://api.github.com/repos/connectsense/connectsense-cord/compare/{base}...{head}",
        "contents_url": "https://api.github.com/repos/connectsense/connectsense-cord/contents/{+path}",
        "contributors_url": "https://api.github.com/repos/connectsense/connectsense-cord/contributors",
        "created_at": "2019-11-18T21:56:31Z",
        "default_branch": "gh-actions",
        "deployments_url": "https://api.github.com/repos/connectsense/connectsense-cord/deployments",
        "description": null,
        "disabled": false,
        "downloads_url": "https://api.github.com/repos/connectsense/connectsense-cord/downloads",
        "events_url": "https://api.github.com/repos/connectsense/connectsense-cord/events",
        "fork": false,
        "forks": 0,
        "forks_count": 0,
        "forks_url": "https://api.github.com/repos/connectsense/connectsense-cord/forks",
        "full_name": "connectsense/connectsense-cord",
        "git_commits_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/commits{/sha}",
        "git_refs_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/refs{/sha}",
        "git_tags_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/tags{/sha}",
        "git_url": "git://github.com/connectsense/connectsense-cord.git",
        "has_downloads": true,
        "has_issues": true,
        "has_pages": false,
        "has_projects": true,
        "has_wiki": true,
        "homepage": null,
        "hooks_url": "https://api.github.com/repos/connectsense/connectsense-cord/hooks",
        "html_url": "https://github.com/connectsense/connectsense-cord",
        "id": 222552416,
        "issue_comment_url": "https://api.github.com/repos/connectsense/connectsense-cord/issues/comments{/number}",
        "issue_events_url": "https://api.github.com/repos/connectsense/connectsense-cord/issues/events{/number}",
        "issues_url": "https://api.github.com/repos/connectsense/connectsense-cord/issues{/number}",
        "keys_url": "https://api.github.com/repos/connectsense/connectsense-cord/keys{/key_id}",
        "labels_url": "https://api.github.com/repos/connectsense/connectsense-cord/labels{/name}",
        "language": "TypeScript",
        "languages_url": "https://api.github.com/repos/connectsense/connectsense-cord/languages",
        "license": null,
        "merges_url": "https://api.github.com/repos/connectsense/connectsense-cord/merges",
        "milestones_url": "https://api.github.com/repos/connectsense/connectsense-cord/milestones{/number}",
        "mirror_url": null,
        "name": "connectsense-cord",
        "node_id": "MDEwOlJlcG9zaXRvcnkyMjI1NTI0MTY=",
        "notifications_url": "https://api.github.com/repos/connectsense/connectsense-cord/notifications{?since,all,participating}",
        "open_issues": 4,
        "open_issues_count": 4,
        "owner": {
          "avatar_url": "https://avatars1.githubusercontent.com/u/8427696?v=4",
          "events_url": "https://api.github.com/users/connectsense/events{/privacy}",
          "followers_url": "https://api.github.com/users/connectsense/followers",
          "following_url": "https://api.github.com/users/connectsense/following{/other_user}",
          "gists_url": "https://api.github.com/users/connectsense/gists{/gist_id}",
          "gravatar_id": "",
          "html_url": "https://github.com/connectsense",
          "id": 8427696,
          "login": "connectsense",
          "node_id": "MDEyOk9yZ2FuaXphdGlvbjg0Mjc2OTY=",
          "organizations_url": "https://api.github.com/users/connectsense/orgs",
          "received_events_url": "https://api.github.com/users/connectsense/received_events",
          "repos_url": "https://api.github.com/users/connectsense/repos",
          "site_admin": false,
          "starred_url": "https://api.github.com/users/connectsense/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/connectsense/subscriptions",
          "type": "Organization",
          "url": "https://api.github.com/users/connectsense"
        },
        "private": true,
        "pulls_url": "https://api.github.com/repos/connectsense/connectsense-cord/pulls{/number}",
        "pushed_at": "2020-02-27T21:54:38Z",
        "releases_url": "https://api.github.com/repos/connectsense/connectsense-cord/releases{/id}",
        "size": 381,
        "ssh_url": "git@github.com:connectsense/connectsense-cord.git",
        "stargazers_count": 0,
        "stargazers_url": "https://api.github.com/repos/connectsense/connectsense-cord/stargazers",
        "statuses_url": "https://api.github.com/repos/connectsense/connectsense-cord/statuses/{sha}",
        "subscribers_url": "https://api.github.com/repos/connectsense/connectsense-cord/subscribers",
        "subscription_url": "https://api.github.com/repos/connectsense/connectsense-cord/subscription",
        "svn_url": "https://github.com/connectsense/connectsense-cord",
        "tags_url": "https://api.github.com/repos/connectsense/connectsense-cord/tags",
        "teams_url": "https://api.github.com/repos/connectsense/connectsense-cord/teams",
        "trees_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/trees{/sha}",
        "updated_at": "2020-02-27T21:52:35Z",
        "url": "https://api.github.com/repos/connectsense/connectsense-cord",
        "watchers": 0,
        "watchers_count": 0
      },
      "sha": "d4e87de297de0cc0cbfba4086c4d2dac0babbf5e",
      "user": {
        "avatar_url": "https://avatars1.githubusercontent.com/u/8427696?v=4",
        "events_url": "https://api.github.com/users/connectsense/events{/privacy}",
        "followers_url": "https://api.github.com/users/connectsense/followers",
        "following_url": "https://api.github.com/users/connectsense/following{/other_user}",
        "gists_url": "https://api.github.com/users/connectsense/gists{/gist_id}",
        "gravatar_id": "",
        "html_url": "https://github.com/connectsense",
        "id": 8427696,
        "login": "connectsense",
        "node_id": "MDEyOk9yZ2FuaXphdGlvbjg0Mjc2OTY=",
        "organizations_url": "https://api.github.com/users/connectsense/orgs",
        "received_events_url": "https://api.github.com/users/connectsense/received_events",
        "repos_url": "https://api.github.com/users/connectsense/repos",
        "site_admin": false,
        "starred_url": "https://api.github.com/users/connectsense/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/connectsense/subscriptions",
        "type": "Organization",
        "url": "https://api.github.com/users/connectsense"
      }
    },
    "html_url": "https://github.com/connectsense/connectsense-cord/pull/63",
    "id": 381033223,
    "issue_url": "https://api.github.com/repos/connectsense/connectsense-cord/issues/63",
    "labels": [],
    "locked": false,
    "maintainer_can_modify": false,
    "merge_commit_sha": "3967439b25c86d85eb069a9292809578c5b3e290",
    "mergeable": null,
    "mergeable_state": "unknown",
    "merged": false,
    "merged_at": null,
    "merged_by": null,
    "milestone": null,
    "node_id": "MDExOlB1bGxSZXF1ZXN0MzgxMDMzMjIz",
    "number": 63,
    "patch_url": "https://github.com/connectsense/connectsense-cord/pull/63.patch",
    "rebaseable": null,
    "requested_reviewers": [],
    "requested_teams": [],
    "review_comment_url": "https://api.github.com/repos/connectsense/connectsense-cord/pulls/comments{/number}",
    "review_comments": 0,
    "review_comments_url": "https://api.github.com/repos/connectsense/connectsense-cord/pulls/63/comments",
    "state": "open",
    "statuses_url": "https://api.github.com/repos/connectsense/connectsense-cord/statuses/d4e87de297de0cc0cbfba4086c4d2dac0babbf5e",
    "title": "WIP",
    "updated_at": "2020-02-27T21:54:39Z",
    "url": "https://api.github.com/repos/connectsense/connectsense-cord/pulls/63",
    "user": {
      "avatar_url": "https://avatars2.githubusercontent.com/u/117184?v=4",
      "events_url": "https://api.github.com/users/leopic/events{/privacy}",
      "followers_url": "https://api.github.com/users/leopic/followers",
      "following_url": "https://api.github.com/users/leopic/following{/other_user}",
      "gists_url": "https://api.github.com/users/leopic/gists{/gist_id}",
      "gravatar_id": "",
      "html_url": "https://github.com/leopic",
      "id": 117184,
      "login": "leopic",
      "node_id": "MDQ6VXNlcjExNzE4NA==",
      "organizations_url": "https://api.github.com/users/leopic/orgs",
      "received_events_url": "https://api.github.com/users/leopic/received_events",
      "repos_url": "https://api.github.com/users/leopic/repos",
      "site_admin": false,
      "starred_url": "https://api.github.com/users/leopic/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/leopic/subscriptions",
      "type": "User",
      "url": "https://api.github.com/users/leopic"
    }
  },
  "repository": {
    "archive_url": "https://api.github.com/repos/connectsense/connectsense-cord/{archive_format}{/ref}",
    "archived": false,
    "assignees_url": "https://api.github.com/repos/connectsense/connectsense-cord/assignees{/user}",
    "blobs_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/blobs{/sha}",
    "branches_url": "https://api.github.com/repos/connectsense/connectsense-cord/branches{/branch}",
    "clone_url": "https://github.com/connectsense/connectsense-cord.git",
    "collaborators_url": "https://api.github.com/repos/connectsense/connectsense-cord/collaborators{/collaborator}",
    "comments_url": "https://api.github.com/repos/connectsense/connectsense-cord/comments{/number}",
    "commits_url": "https://api.github.com/repos/connectsense/connectsense-cord/commits{/sha}",
    "compare_url": "https://api.github.com/repos/connectsense/connectsense-cord/compare/{base}...{head}",
    "contents_url": "https://api.github.com/repos/connectsense/connectsense-cord/contents/{+path}",
    "contributors_url": "https://api.github.com/repos/connectsense/connectsense-cord/contributors",
    "created_at": "2019-11-18T21:56:31Z",
    "default_branch": "gh-actions",
    "deployments_url": "https://api.github.com/repos/connectsense/connectsense-cord/deployments",
    "description": null,
    "disabled": false,
    "downloads_url": "https://api.github.com/repos/connectsense/connectsense-cord/downloads",
    "events_url": "https://api.github.com/repos/connectsense/connectsense-cord/events",
    "fork": false,
    "forks": 0,
    "forks_count": 0,
    "forks_url": "https://api.github.com/repos/connectsense/connectsense-cord/forks",
    "full_name": "connectsense/connectsense-cord",
    "git_commits_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/commits{/sha}",
    "git_refs_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/refs{/sha}",
    "git_tags_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/tags{/sha}",
    "git_url": "git://github.com/connectsense/connectsense-cord.git",
    "has_downloads": true,
    "has_issues": true,
    "has_pages": false,
    "has_projects": true,
    "has_wiki": true,
    "homepage": null,
    "hooks_url": "https://api.github.com/repos/connectsense/connectsense-cord/hooks",
    "html_url": "https://github.com/connectsense/connectsense-cord",
    "id": 222552416,
    "issue_comment_url": "https://api.github.com/repos/connectsense/connectsense-cord/issues/comments{/number}",
    "issue_events_url": "https://api.github.com/repos/connectsense/connectsense-cord/issues/events{/number}",
    "issues_url": "https://api.github.com/repos/connectsense/connectsense-cord/issues{/number}",
    "keys_url": "https://api.github.com/repos/connectsense/connectsense-cord/keys{/key_id}",
    "labels_url": "https://api.github.com/repos/connectsense/connectsense-cord/labels{/name}",
    "language": "TypeScript",
    "languages_url": "https://api.github.com/repos/connectsense/connectsense-cord/languages",
    "license": null,
    "merges_url": "https://api.github.com/repos/connectsense/connectsense-cord/merges",
    "milestones_url": "https://api.github.com/repos/connectsense/connectsense-cord/milestones{/number}",
    "mirror_url": null,
    "name": "connectsense-cord",
    "node_id": "MDEwOlJlcG9zaXRvcnkyMjI1NTI0MTY=",
    "notifications_url": "https://api.github.com/repos/connectsense/connectsense-cord/notifications{?since,all,participating}",
    "open_issues": 4,
    "open_issues_count": 4,
    "owner": {
      "avatar_url": "https://avatars1.githubusercontent.com/u/8427696?v=4",
      "events_url": "https://api.github.com/users/connectsense/events{/privacy}",
      "followers_url": "https://api.github.com/users/connectsense/followers",
      "following_url": "https://api.github.com/users/connectsense/following{/other_user}",
      "gists_url": "https://api.github.com/users/connectsense/gists{/gist_id}",
      "gravatar_id": "",
      "html_url": "https://github.com/connectsense",
      "id": 8427696,
      "login": "connectsense",
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjg0Mjc2OTY=",
      "organizations_url": "https://api.github.com/users/connectsense/orgs",
      "received_events_url": "https://api.github.com/users/connectsense/received_events",
      "repos_url": "https://api.github.com/users/connectsense/repos",
      "site_admin": false,
      "starred_url": "https://api.github.com/users/connectsense/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/connectsense/subscriptions",
      "type": "Organization",
      "url": "https://api.github.com/users/connectsense"
    },
    "private": true,
    "pulls_url": "https://api.github.com/repos/connectsense/connectsense-cord/pulls{/number}",
    "pushed_at": "2020-02-27T21:54:38Z",
    "releases_url": "https://api.github.com/repos/connectsense/connectsense-cord/releases{/id}",
    "size": 381,
    "ssh_url": "git@github.com:connectsense/connectsense-cord.git",
    "stargazers_count": 0,
    "stargazers_url": "https://api.github.com/repos/connectsense/connectsense-cord/stargazers",
    "statuses_url": "https://api.github.com/repos/connectsense/connectsense-cord/statuses/{sha}",
    "subscribers_url": "https://api.github.com/repos/connectsense/connectsense-cord/subscribers",
    "subscription_url": "https://api.github.com/repos/connectsense/connectsense-cord/subscription",
    "svn_url": "https://github.com/connectsense/connectsense-cord",
    "tags_url": "https://api.github.com/repos/connectsense/connectsense-cord/tags",
    "teams_url": "https://api.github.com/repos/connectsense/connectsense-cord/teams",
    "trees_url": "https://api.github.com/repos/connectsense/connectsense-cord/git/trees{/sha}",
    "updated_at": "2020-02-27T21:52:35Z",
    "url": "https://api.github.com/repos/connectsense/connectsense-cord",
    "watchers": 0,
    "watchers_count": 0
  },
  "sender": {
    "avatar_url": "https://avatars2.githubusercontent.com/u/117184?v=4",
    "events_url": "https://api.github.com/users/leopic/events{/privacy}",
    "followers_url": "https://api.github.com/users/leopic/followers",
    "following_url": "https://api.github.com/users/leopic/following{/other_user}",
    "gists_url": "https://api.github.com/users/leopic/gists{/gist_id}",
    "gravatar_id": "",
    "html_url": "https://github.com/leopic",
    "id": 117184,
    "login": "leopic",
    "node_id": "MDQ6VXNlcjExNzE4NA==",
    "organizations_url": "https://api.github.com/users/leopic/orgs",
    "received_events_url": "https://api.github.com/users/leopic/received_events",
    "repos_url": "https://api.github.com/users/leopic/repos",
    "site_admin": false,
    "starred_url": "https://api.github.com/users/leopic/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/leopic/subscriptions",
    "type": "User",
    "url": "https://api.github.com/users/leopic"
  }
};
