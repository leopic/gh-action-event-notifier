'use strict';

const github = require('@actions/github');
const core = require('@actions/core');

const translator = require('../lib/index');

describe('Translator', function () {
  const pullRequestPayload = {
    "action": "opened",
    "number": 2,
    "pull_request": {
      "url": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2",
      "id": 279147437,
      "node_id": "MDExOlB1bGxSZXF1ZXN0Mjc5MTQ3NDM3",
      "html_url": "https://github.com/Codertocat/Hello-World/pull/2",
      "diff_url": "https://github.com/Codertocat/Hello-World/pull/2.diff",
      "patch_url": "https://github.com/Codertocat/Hello-World/pull/2.patch",
      "issue_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/2",
      "number": 2,
      "state": "open",
      "locked": false,
      "title": "Update the README with new information.",
      "user": {
        "login": "Codertocat",
        "id": 21031067,
        "node_id": "MDQ6VXNlcjIxMDMxMDY3",
        "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/Codertocat",
        "html_url": "https://github.com/Codertocat",
        "followers_url": "https://api.github.com/users/Codertocat/followers",
        "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
        "organizations_url": "https://api.github.com/users/Codertocat/orgs",
        "repos_url": "https://api.github.com/users/Codertocat/repos",
        "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/Codertocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "body": "This is a pretty simple change that we need to pull into master.",
      "created_at": "2019-05-15T15:20:33Z",
      "updated_at": "2019-05-15T15:20:33Z",
      "closed_at": null,
      "merged_at": null,
      "merge_commit_sha": null,
      "assignee": null,
      "assignees": [],
      "requested_reviewers": [],
      "requested_teams": [],
      "labels": [],
      "milestone": null,
      "commits_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/commits",
      "review_comments_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/comments",
      "review_comment_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls/comments{/number}",
      "comments_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/2/comments",
      "statuses_url": "https://api.github.com/repos/Codertocat/Hello-World/statuses/ec26c3e57ca3a959ca5aad62de7213c562f8c821",
      "head": {
        "label": "Codertocat:changes",
        "ref": "changes",
        "sha": "ec26c3e57ca3a959ca5aad62de7213c562f8c821",
        "user": {
          "login": "Codertocat",
          "id": 21031067,
          "node_id": "MDQ6VXNlcjIxMDMxMDY3",
          "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/Codertocat",
          "html_url": "https://github.com/Codertocat",
          "followers_url": "https://api.github.com/users/Codertocat/followers",
          "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
          "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
          "organizations_url": "https://api.github.com/users/Codertocat/orgs",
          "repos_url": "https://api.github.com/users/Codertocat/repos",
          "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
          "received_events_url": "https://api.github.com/users/Codertocat/received_events",
          "type": "User",
          "site_admin": false
        },
        "repo": {
          "id": 186853002,
          "node_id": "MDEwOlJlcG9zaXRvcnkxODY4NTMwMDI=",
          "name": "Hello-World",
          "full_name": "Codertocat/Hello-World",
          "private": false,
          "owner": {
            "login": "Codertocat",
            "id": 21031067,
            "node_id": "MDQ6VXNlcjIxMDMxMDY3",
            "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/Codertocat",
            "html_url": "https://github.com/Codertocat",
            "followers_url": "https://api.github.com/users/Codertocat/followers",
            "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
            "organizations_url": "https://api.github.com/users/Codertocat/orgs",
            "repos_url": "https://api.github.com/users/Codertocat/repos",
            "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
            "received_events_url": "https://api.github.com/users/Codertocat/received_events",
            "type": "User",
            "site_admin": false
          },
          "html_url": "https://github.com/Codertocat/Hello-World",
          "description": null,
          "fork": false,
          "url": "https://api.github.com/repos/Codertocat/Hello-World",
          "forks_url": "https://api.github.com/repos/Codertocat/Hello-World/forks",
          "keys_url": "https://api.github.com/repos/Codertocat/Hello-World/keys{/key_id}",
          "collaborators_url": "https://api.github.com/repos/Codertocat/Hello-World/collaborators{/collaborator}",
          "teams_url": "https://api.github.com/repos/Codertocat/Hello-World/teams",
          "hooks_url": "https://api.github.com/repos/Codertocat/Hello-World/hooks",
          "issue_events_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/events{/number}",
          "events_url": "https://api.github.com/repos/Codertocat/Hello-World/events",
          "assignees_url": "https://api.github.com/repos/Codertocat/Hello-World/assignees{/user}",
          "branches_url": "https://api.github.com/repos/Codertocat/Hello-World/branches{/branch}",
          "tags_url": "https://api.github.com/repos/Codertocat/Hello-World/tags",
          "blobs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/blobs{/sha}",
          "git_tags_url": "https://api.github.com/repos/Codertocat/Hello-World/git/tags{/sha}",
          "git_refs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/refs{/sha}",
          "trees_url": "https://api.github.com/repos/Codertocat/Hello-World/git/trees{/sha}",
          "statuses_url": "https://api.github.com/repos/Codertocat/Hello-World/statuses/{sha}",
          "languages_url": "https://api.github.com/repos/Codertocat/Hello-World/languages",
          "stargazers_url": "https://api.github.com/repos/Codertocat/Hello-World/stargazers",
          "contributors_url": "https://api.github.com/repos/Codertocat/Hello-World/contributors",
          "subscribers_url": "https://api.github.com/repos/Codertocat/Hello-World/subscribers",
          "subscription_url": "https://api.github.com/repos/Codertocat/Hello-World/subscription",
          "commits_url": "https://api.github.com/repos/Codertocat/Hello-World/commits{/sha}",
          "git_commits_url": "https://api.github.com/repos/Codertocat/Hello-World/git/commits{/sha}",
          "comments_url": "https://api.github.com/repos/Codertocat/Hello-World/comments{/number}",
          "issue_comment_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/comments{/number}",
          "contents_url": "https://api.github.com/repos/Codertocat/Hello-World/contents/{+path}",
          "compare_url": "https://api.github.com/repos/Codertocat/Hello-World/compare/{base}...{head}",
          "merges_url": "https://api.github.com/repos/Codertocat/Hello-World/merges",
          "archive_url": "https://api.github.com/repos/Codertocat/Hello-World/{archive_format}{/ref}",
          "downloads_url": "https://api.github.com/repos/Codertocat/Hello-World/downloads",
          "issues_url": "https://api.github.com/repos/Codertocat/Hello-World/issues{/number}",
          "pulls_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls{/number}",
          "milestones_url": "https://api.github.com/repos/Codertocat/Hello-World/milestones{/number}",
          "notifications_url": "https://api.github.com/repos/Codertocat/Hello-World/notifications{?since,all,participating}",
          "labels_url": "https://api.github.com/repos/Codertocat/Hello-World/labels{/name}",
          "releases_url": "https://api.github.com/repos/Codertocat/Hello-World/releases{/id}",
          "deployments_url": "https://api.github.com/repos/Codertocat/Hello-World/deployments",
          "created_at": "2019-05-15T15:19:25Z",
          "updated_at": "2019-05-15T15:19:27Z",
          "pushed_at": "2019-05-15T15:20:32Z",
          "git_url": "git://github.com/Codertocat/Hello-World.git",
          "ssh_url": "git@github.com:Codertocat/Hello-World.git",
          "clone_url": "https://github.com/Codertocat/Hello-World.git",
          "svn_url": "https://github.com/Codertocat/Hello-World",
          "homepage": null,
          "size": 0,
          "stargazers_count": 0,
          "watchers_count": 0,
          "language": null,
          "has_issues": true,
          "has_projects": true,
          "has_downloads": true,
          "has_wiki": true,
          "has_pages": true,
          "forks_count": 0,
          "mirror_url": null,
          "archived": false,
          "disabled": false,
          "open_issues_count": 2,
          "license": null,
          "forks": 0,
          "open_issues": 2,
          "watchers": 0,
          "default_branch": "master"
        }
      },
      "base": {
        "label": "Codertocat:master",
        "ref": "master",
        "sha": "f95f852bd8fca8fcc58a9a2d6c842781e32a215e",
        "user": {
          "login": "Codertocat",
          "id": 21031067,
          "node_id": "MDQ6VXNlcjIxMDMxMDY3",
          "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/Codertocat",
          "html_url": "https://github.com/Codertocat",
          "followers_url": "https://api.github.com/users/Codertocat/followers",
          "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
          "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
          "organizations_url": "https://api.github.com/users/Codertocat/orgs",
          "repos_url": "https://api.github.com/users/Codertocat/repos",
          "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
          "received_events_url": "https://api.github.com/users/Codertocat/received_events",
          "type": "User",
          "site_admin": false
        },
        "repo": {
          "id": 186853002,
          "node_id": "MDEwOlJlcG9zaXRvcnkxODY4NTMwMDI=",
          "name": "Hello-World",
          "full_name": "Codertocat/Hello-World",
          "private": false,
          "owner": {
            "login": "Codertocat",
            "id": 21031067,
            "node_id": "MDQ6VXNlcjIxMDMxMDY3",
            "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/Codertocat",
            "html_url": "https://github.com/Codertocat",
            "followers_url": "https://api.github.com/users/Codertocat/followers",
            "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
            "organizations_url": "https://api.github.com/users/Codertocat/orgs",
            "repos_url": "https://api.github.com/users/Codertocat/repos",
            "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
            "received_events_url": "https://api.github.com/users/Codertocat/received_events",
            "type": "User",
            "site_admin": false
          },
          "html_url": "https://github.com/Codertocat/Hello-World",
          "description": null,
          "fork": false,
          "url": "https://api.github.com/repos/Codertocat/Hello-World",
          "forks_url": "https://api.github.com/repos/Codertocat/Hello-World/forks",
          "keys_url": "https://api.github.com/repos/Codertocat/Hello-World/keys{/key_id}",
          "collaborators_url": "https://api.github.com/repos/Codertocat/Hello-World/collaborators{/collaborator}",
          "teams_url": "https://api.github.com/repos/Codertocat/Hello-World/teams",
          "hooks_url": "https://api.github.com/repos/Codertocat/Hello-World/hooks",
          "issue_events_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/events{/number}",
          "events_url": "https://api.github.com/repos/Codertocat/Hello-World/events",
          "assignees_url": "https://api.github.com/repos/Codertocat/Hello-World/assignees{/user}",
          "branches_url": "https://api.github.com/repos/Codertocat/Hello-World/branches{/branch}",
          "tags_url": "https://api.github.com/repos/Codertocat/Hello-World/tags",
          "blobs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/blobs{/sha}",
          "git_tags_url": "https://api.github.com/repos/Codertocat/Hello-World/git/tags{/sha}",
          "git_refs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/refs{/sha}",
          "trees_url": "https://api.github.com/repos/Codertocat/Hello-World/git/trees{/sha}",
          "statuses_url": "https://api.github.com/repos/Codertocat/Hello-World/statuses/{sha}",
          "languages_url": "https://api.github.com/repos/Codertocat/Hello-World/languages",
          "stargazers_url": "https://api.github.com/repos/Codertocat/Hello-World/stargazers",
          "contributors_url": "https://api.github.com/repos/Codertocat/Hello-World/contributors",
          "subscribers_url": "https://api.github.com/repos/Codertocat/Hello-World/subscribers",
          "subscription_url": "https://api.github.com/repos/Codertocat/Hello-World/subscription",
          "commits_url": "https://api.github.com/repos/Codertocat/Hello-World/commits{/sha}",
          "git_commits_url": "https://api.github.com/repos/Codertocat/Hello-World/git/commits{/sha}",
          "comments_url": "https://api.github.com/repos/Codertocat/Hello-World/comments{/number}",
          "issue_comment_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/comments{/number}",
          "contents_url": "https://api.github.com/repos/Codertocat/Hello-World/contents/{+path}",
          "compare_url": "https://api.github.com/repos/Codertocat/Hello-World/compare/{base}...{head}",
          "merges_url": "https://api.github.com/repos/Codertocat/Hello-World/merges",
          "archive_url": "https://api.github.com/repos/Codertocat/Hello-World/{archive_format}{/ref}",
          "downloads_url": "https://api.github.com/repos/Codertocat/Hello-World/downloads",
          "issues_url": "https://api.github.com/repos/Codertocat/Hello-World/issues{/number}",
          "pulls_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls{/number}",
          "milestones_url": "https://api.github.com/repos/Codertocat/Hello-World/milestones{/number}",
          "notifications_url": "https://api.github.com/repos/Codertocat/Hello-World/notifications{?since,all,participating}",
          "labels_url": "https://api.github.com/repos/Codertocat/Hello-World/labels{/name}",
          "releases_url": "https://api.github.com/repos/Codertocat/Hello-World/releases{/id}",
          "deployments_url": "https://api.github.com/repos/Codertocat/Hello-World/deployments",
          "created_at": "2019-05-15T15:19:25Z",
          "updated_at": "2019-05-15T15:19:27Z",
          "pushed_at": "2019-05-15T15:20:32Z",
          "git_url": "git://github.com/Codertocat/Hello-World.git",
          "ssh_url": "git@github.com:Codertocat/Hello-World.git",
          "clone_url": "https://github.com/Codertocat/Hello-World.git",
          "svn_url": "https://github.com/Codertocat/Hello-World",
          "homepage": null,
          "size": 0,
          "stargazers_count": 0,
          "watchers_count": 0,
          "language": null,
          "has_issues": true,
          "has_projects": true,
          "has_downloads": true,
          "has_wiki": true,
          "has_pages": true,
          "forks_count": 0,
          "mirror_url": null,
          "archived": false,
          "disabled": false,
          "open_issues_count": 2,
          "license": null,
          "forks": 0,
          "open_issues": 2,
          "watchers": 0,
          "default_branch": "master"
        }
      },
      "_links": {
        "self": {
          "href": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2"
        },
        "html": {
          "href": "https://github.com/Codertocat/Hello-World/pull/2"
        },
        "issue": {
          "href": "https://api.github.com/repos/Codertocat/Hello-World/issues/2"
        },
        "comments": {
          "href": "https://api.github.com/repos/Codertocat/Hello-World/issues/2/comments"
        },
        "review_comments": {
          "href": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/comments"
        },
        "review_comment": {
          "href": "https://api.github.com/repos/Codertocat/Hello-World/pulls/comments{/number}"
        },
        "commits": {
          "href": "https://api.github.com/repos/Codertocat/Hello-World/pulls/2/commits"
        },
        "statuses": {
          "href": "https://api.github.com/repos/Codertocat/Hello-World/statuses/ec26c3e57ca3a959ca5aad62de7213c562f8c821"
        }
      },
      "author_association": "OWNER",
      "draft": false,
      "merged": false,
      "mergeable": null,
      "rebaseable": null,
      "mergeable_state": "unknown",
      "merged_by": null,
      "comments": 0,
      "review_comments": 0,
      "maintainer_can_modify": false,
      "commits": 1,
      "additions": 1,
      "deletions": 1,
      "changed_files": 1
    },
    "repository": {
      "id": 186853002,
      "node_id": "MDEwOlJlcG9zaXRvcnkxODY4NTMwMDI=",
      "name": "Hello-World",
      "full_name": "Codertocat/Hello-World",
      "private": false,
      "owner": {
        "login": "Codertocat",
        "id": 21031067,
        "node_id": "MDQ6VXNlcjIxMDMxMDY3",
        "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/Codertocat",
        "html_url": "https://github.com/Codertocat",
        "followers_url": "https://api.github.com/users/Codertocat/followers",
        "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
        "organizations_url": "https://api.github.com/users/Codertocat/orgs",
        "repos_url": "https://api.github.com/users/Codertocat/repos",
        "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/Codertocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "html_url": "https://github.com/Codertocat/Hello-World",
      "description": null,
      "fork": false,
      "url": "https://api.github.com/repos/Codertocat/Hello-World",
      "forks_url": "https://api.github.com/repos/Codertocat/Hello-World/forks",
      "keys_url": "https://api.github.com/repos/Codertocat/Hello-World/keys{/key_id}",
      "collaborators_url": "https://api.github.com/repos/Codertocat/Hello-World/collaborators{/collaborator}",
      "teams_url": "https://api.github.com/repos/Codertocat/Hello-World/teams",
      "hooks_url": "https://api.github.com/repos/Codertocat/Hello-World/hooks",
      "issue_events_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/events{/number}",
      "events_url": "https://api.github.com/repos/Codertocat/Hello-World/events",
      "assignees_url": "https://api.github.com/repos/Codertocat/Hello-World/assignees{/user}",
      "branches_url": "https://api.github.com/repos/Codertocat/Hello-World/branches{/branch}",
      "tags_url": "https://api.github.com/repos/Codertocat/Hello-World/tags",
      "blobs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/blobs{/sha}",
      "git_tags_url": "https://api.github.com/repos/Codertocat/Hello-World/git/tags{/sha}",
      "git_refs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/refs{/sha}",
      "trees_url": "https://api.github.com/repos/Codertocat/Hello-World/git/trees{/sha}",
      "statuses_url": "https://api.github.com/repos/Codertocat/Hello-World/statuses/{sha}",
      "languages_url": "https://api.github.com/repos/Codertocat/Hello-World/languages",
      "stargazers_url": "https://api.github.com/repos/Codertocat/Hello-World/stargazers",
      "contributors_url": "https://api.github.com/repos/Codertocat/Hello-World/contributors",
      "subscribers_url": "https://api.github.com/repos/Codertocat/Hello-World/subscribers",
      "subscription_url": "https://api.github.com/repos/Codertocat/Hello-World/subscription",
      "commits_url": "https://api.github.com/repos/Codertocat/Hello-World/commits{/sha}",
      "git_commits_url": "https://api.github.com/repos/Codertocat/Hello-World/git/commits{/sha}",
      "comments_url": "https://api.github.com/repos/Codertocat/Hello-World/comments{/number}",
      "issue_comment_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/comments{/number}",
      "contents_url": "https://api.github.com/repos/Codertocat/Hello-World/contents/{+path}",
      "compare_url": "https://api.github.com/repos/Codertocat/Hello-World/compare/{base}...{head}",
      "merges_url": "https://api.github.com/repos/Codertocat/Hello-World/merges",
      "archive_url": "https://api.github.com/repos/Codertocat/Hello-World/{archive_format}{/ref}",
      "downloads_url": "https://api.github.com/repos/Codertocat/Hello-World/downloads",
      "issues_url": "https://api.github.com/repos/Codertocat/Hello-World/issues{/number}",
      "pulls_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls{/number}",
      "milestones_url": "https://api.github.com/repos/Codertocat/Hello-World/milestones{/number}",
      "notifications_url": "https://api.github.com/repos/Codertocat/Hello-World/notifications{?since,all,participating}",
      "labels_url": "https://api.github.com/repos/Codertocat/Hello-World/labels{/name}",
      "releases_url": "https://api.github.com/repos/Codertocat/Hello-World/releases{/id}",
      "deployments_url": "https://api.github.com/repos/Codertocat/Hello-World/deployments",
      "created_at": "2019-05-15T15:19:25Z",
      "updated_at": "2019-05-15T15:19:27Z",
      "pushed_at": "2019-05-15T15:20:32Z",
      "git_url": "git://github.com/Codertocat/Hello-World.git",
      "ssh_url": "git@github.com:Codertocat/Hello-World.git",
      "clone_url": "https://github.com/Codertocat/Hello-World.git",
      "svn_url": "https://github.com/Codertocat/Hello-World",
      "homepage": null,
      "size": 0,
      "stargazers_count": 0,
      "watchers_count": 0,
      "language": null,
      "has_issues": true,
      "has_projects": true,
      "has_downloads": true,
      "has_wiki": true,
      "has_pages": true,
      "forks_count": 0,
      "mirror_url": null,
      "archived": false,
      "disabled": false,
      "open_issues_count": 2,
      "license": null,
      "forks": 0,
      "open_issues": 2,
      "watchers": 0,
      "default_branch": "master"
    },
    "sender": {
      "login": "Codertocat",
      "id": 21031067,
      "node_id": "MDQ6VXNlcjIxMDMxMDY3",
      "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Codertocat",
      "html_url": "https://github.com/Codertocat",
      "followers_url": "https://api.github.com/users/Codertocat/followers",
      "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
      "organizations_url": "https://api.github.com/users/Codertocat/orgs",
      "repos_url": "https://api.github.com/users/Codertocat/repos",
      "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Codertocat/received_events",
      "type": "User",
      "site_admin": false
    }
  };
  const pushPayload = {
    "ref": "refs/tags/simple-tag",
    "before": "6113728f27ae82c7b1a177c8d03f9e96e0adf246",
    "after": "0000000000000000000000000000000000000000",
    "created": false,
    "deleted": true,
    "forced": false,
    "base_ref": null,
    "compare": "https://github.com/Codertocat/Hello-World/compare/6113728f27ae...000000000000",
    "commits": [],
    "head_commit": null,
    "repository": {
      "id": 186853002,
      "node_id": "MDEwOlJlcG9zaXRvcnkxODY4NTMwMDI=",
      "name": "Hello-World",
      "full_name": "Codertocat/Hello-World",
      "private": false,
      "owner": {
        "name": "Codertocat",
        "email": "21031067+Codertocat@users.noreply.github.com",
        "login": "Codertocat",
        "id": 21031067,
        "node_id": "MDQ6VXNlcjIxMDMxMDY3",
        "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/Codertocat",
        "html_url": "https://github.com/Codertocat",
        "followers_url": "https://api.github.com/users/Codertocat/followers",
        "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
        "organizations_url": "https://api.github.com/users/Codertocat/orgs",
        "repos_url": "https://api.github.com/users/Codertocat/repos",
        "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/Codertocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "html_url": "https://github.com/Codertocat/Hello-World",
      "description": null,
      "fork": false,
      "url": "https://github.com/Codertocat/Hello-World",
      "forks_url": "https://api.github.com/repos/Codertocat/Hello-World/forks",
      "keys_url": "https://api.github.com/repos/Codertocat/Hello-World/keys{/key_id}",
      "collaborators_url": "https://api.github.com/repos/Codertocat/Hello-World/collaborators{/collaborator}",
      "teams_url": "https://api.github.com/repos/Codertocat/Hello-World/teams",
      "hooks_url": "https://api.github.com/repos/Codertocat/Hello-World/hooks",
      "issue_events_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/events{/number}",
      "events_url": "https://api.github.com/repos/Codertocat/Hello-World/events",
      "assignees_url": "https://api.github.com/repos/Codertocat/Hello-World/assignees{/user}",
      "branches_url": "https://api.github.com/repos/Codertocat/Hello-World/branches{/branch}",
      "tags_url": "https://api.github.com/repos/Codertocat/Hello-World/tags",
      "blobs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/blobs{/sha}",
      "git_tags_url": "https://api.github.com/repos/Codertocat/Hello-World/git/tags{/sha}",
      "git_refs_url": "https://api.github.com/repos/Codertocat/Hello-World/git/refs{/sha}",
      "trees_url": "https://api.github.com/repos/Codertocat/Hello-World/git/trees{/sha}",
      "statuses_url": "https://api.github.com/repos/Codertocat/Hello-World/statuses/{sha}",
      "languages_url": "https://api.github.com/repos/Codertocat/Hello-World/languages",
      "stargazers_url": "https://api.github.com/repos/Codertocat/Hello-World/stargazers",
      "contributors_url": "https://api.github.com/repos/Codertocat/Hello-World/contributors",
      "subscribers_url": "https://api.github.com/repos/Codertocat/Hello-World/subscribers",
      "subscription_url": "https://api.github.com/repos/Codertocat/Hello-World/subscription",
      "commits_url": "https://api.github.com/repos/Codertocat/Hello-World/commits{/sha}",
      "git_commits_url": "https://api.github.com/repos/Codertocat/Hello-World/git/commits{/sha}",
      "comments_url": "https://api.github.com/repos/Codertocat/Hello-World/comments{/number}",
      "issue_comment_url": "https://api.github.com/repos/Codertocat/Hello-World/issues/comments{/number}",
      "contents_url": "https://api.github.com/repos/Codertocat/Hello-World/contents/{+path}",
      "compare_url": "https://api.github.com/repos/Codertocat/Hello-World/compare/{base}...{head}",
      "merges_url": "https://api.github.com/repos/Codertocat/Hello-World/merges",
      "archive_url": "https://api.github.com/repos/Codertocat/Hello-World/{archive_format}{/ref}",
      "downloads_url": "https://api.github.com/repos/Codertocat/Hello-World/downloads",
      "issues_url": "https://api.github.com/repos/Codertocat/Hello-World/issues{/number}",
      "pulls_url": "https://api.github.com/repos/Codertocat/Hello-World/pulls{/number}",
      "milestones_url": "https://api.github.com/repos/Codertocat/Hello-World/milestones{/number}",
      "notifications_url": "https://api.github.com/repos/Codertocat/Hello-World/notifications{?since,all,participating}",
      "labels_url": "https://api.github.com/repos/Codertocat/Hello-World/labels{/name}",
      "releases_url": "https://api.github.com/repos/Codertocat/Hello-World/releases{/id}",
      "deployments_url": "https://api.github.com/repos/Codertocat/Hello-World/deployments",
      "created_at": 1557933565,
      "updated_at": "2019-05-15T15:20:41Z",
      "pushed_at": 1557933657,
      "git_url": "git://github.com/Codertocat/Hello-World.git",
      "ssh_url": "git@github.com:Codertocat/Hello-World.git",
      "clone_url": "https://github.com/Codertocat/Hello-World.git",
      "svn_url": "https://github.com/Codertocat/Hello-World",
      "homepage": null,
      "size": 0,
      "stargazers_count": 0,
      "watchers_count": 0,
      "language": "Ruby",
      "has_issues": true,
      "has_projects": true,
      "has_downloads": true,
      "has_wiki": true,
      "has_pages": true,
      "forks_count": 1,
      "mirror_url": null,
      "archived": false,
      "disabled": false,
      "open_issues_count": 2,
      "license": null,
      "forks": 1,
      "open_issues": 2,
      "watchers": 0,
      "default_branch": "master",
      "stargazers": 0,
      "master_branch": "master"
    },
    "pusher": {
      "name": "Codertocat",
      "email": "21031067+Codertocat@users.noreply.github.com"
    },
    "sender": {
      "login": "Codertocat",
      "id": 21031067,
      "node_id": "MDQ6VXNlcjIxMDMxMDY3",
      "avatar_url": "https://avatars1.githubusercontent.com/u/21031067?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/Codertocat",
      "html_url": "https://github.com/Codertocat",
      "followers_url": "https://api.github.com/users/Codertocat/followers",
      "following_url": "https://api.github.com/users/Codertocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/Codertocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/Codertocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/Codertocat/subscriptions",
      "organizations_url": "https://api.github.com/users/Codertocat/orgs",
      "repos_url": "https://api.github.com/users/Codertocat/repos",
      "events_url": "https://api.github.com/users/Codertocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/Codertocat/received_events",
      "type": "User",
      "site_admin": false
    }
  };
  const pushCommit = {
    "id": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
    "message": "Fix all the bugs",
    "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
    "author": {
      "name": "Monalisa Octocat",
      "email": "support@github.com",
    },
    "distinct": true
  };

  describe('formatBlocks', () => {
    it('should prepare a simple object to be consumed by Slack', () => {
      const input = { url: "http://github.com" };

      const expectation = '{\\\"url\\\":\\\"http://github.com\\\"}';
      const output = translator.formatBlocks(input);

      expect(output).toEqual(expectation);
    });
  });

  describe('getBlockBuilder', () => {
    it('should route pull requests to the getPullRequestBlocks', () => {
      spyOn(translator, 'getPullRequestBlocks');
      translator.getBlockBuilder('pull_request');
      expect(translator.getPullRequestBlocks).toHaveBeenCalled();
    });

    it('should route pushes to the getPushBlocks', () => {
      spyOn(translator, 'getPushBlocks');
      translator.getBlockBuilder('push');
      expect(translator.getPushBlocks).toHaveBeenCalled();
    });

    it('should route all other events to getFallbackBlocks', () => {
      spyOn(translator, 'getFallbackBlocks');
      translator.getBlockBuilder('other');
      expect(translator.getFallbackBlocks).toHaveBeenCalled();
    });
  });

  describe('getButton', () => {
    it('should return a button object', () => {
      const output = translator.getButton('Google', 'https://google.com');
      const expectation = {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": 'Google'
        },
        "url": 'https://google.com'
      };

      expect(output).toEqual(expectation);
    });
  });

  describe('getCommitListMessage', () => {
    it('should return an empty string when no commits are found', () => {
      const output = translator.getCommitListMessage({commits: []});

      expect(output).toEqual('No new commits were found');
    });

    it('should return a list of commits when there are commits in the payload', () => {
      const expectation = "The following commits were pushed:\n"
        + "- 6dcb09b Fix all the bugs by Monalisa Octocat\n";

      const output = translator.getCommitListMessage({commits: [pushCommit]});

      expect(output).toEqual(expectation);
    });
  });

  describe('getField', () => {
    it('should return a field object', () => {
      const output = translator.getField('Sha', 'ffee00');
      const expectation = {
        "type": "mrkdwn",
        "text": "*Sha*: ffee00"
      };

      expect(output).toEqual(expectation);
    });
  });

  describe('getTextBlock', () => {
    it('should create an object containing the provided text', () => {
      const input = 'hello world!';

      const expectation = {
        "type": "mrkdwn",
        "text": input
      };
      const output = translator.getTextBlock(input);

      expect(output).toEqual(expectation);
    });
  });

  describe('prepareOutput', () => {
    it('should properly stringify an object and escape quotes', () => {
      const input = {text: "test", list: ["of", "strings"]};
      const output = translator.formatBlocks(input);
      const expectation = "{\\\"text\\\":\\\"test\\\",\\\"list\\\":[\\\"of\\\",\\\"strings\\\"]}";

      expect(output).toEqual(expectation);
    });
  });

  describe('getFallbackBlocks', () => {
    it('should provide a fallback message for non pull request events', () => {
      const oldEventName = github.context.eventName;
      github.context.eventName = 'push';

      const output = translator.getFallbackBlocks('Failure', pushPayload);
      const expectation = [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*<https://github.com/Codertocat/Hello-World|Codertocat/Hello-World>*: the result of a push by" +
              " <https://github.com/Codertocat|Codertocat> was: :thumbsdown:\n Details: <https://github.com/Codertocat/Hello-World|push>"
          }
        },
        {
          "type": "divider"
        }
      ];

      expect(output).toEqual(expectation);

      github.context.eventName = oldEventName;
    });
  });

  describe('getPullRequestBlocks', () => {
    it('should build an object for a pull request event', () => {
      const oldEventName = github.context.eventName;
      github.context.eventName = 'pull_request';

      const output = translator.getPullRequestBlocks('Success', pullRequestPayload);
      const expectation = [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*<https://github.com/Codertocat/Hello-World|Codertocat/Hello-World>*\n" +
              "<https://github.com/Codertocat/Hello-World/pull/2|Update the README with new information. #2> :thumbsup:\n" +
              "<https://github.com/Codertocat|Codertocat> submitted a pull request"
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": 'Execution Details'
            },
            "url": 'https://github.com/Codertocat/Hello-World/pull/2/checks'
          },
          "fields": [
            {
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
      ];

      expect(output).toEqual(expectation);

      github.context.eventName = oldEventName;
    });
  });

  describe('getPushBlocks', () => {
    it('should provide a friendly formatted message for a push event to any branch', () => {
      const oldEventName = github.context.eventName;
      github.context.eventName = 'push';

      const output = translator.getPushBlocks('Failure', pushPayload);
      const expectation = [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*<https://github.com/Codertocat/Hello-World|Codertocat/Hello-World>*: the result of a push to *simple-tag* was: :thumbsdown:. Head is at 6113728"
          }
        },
        {
          "type": "divider"
        }
      ];

      expect(output).toEqual(expectation);

      github.context.eventName = oldEventName;
    });

    it('should provide a friendly formatted message for a push event to a special branch', () => {
      const oldEventName = github.context.eventName;
      const oldTargetRef = pushPayload.ref;
      github.context.eventName = 'push';
      pushPayload.commits = [pushCommit];
      pushPayload.ref = 'refs/heads/prod';

      const output = translator.getPushBlocks('Success', pushPayload);
      const firstLine   = "*<https://github.com/Codertocat/Hello-World|Codertocat/Hello-World>*: the result of a deploy to *prod* was: :thumbsup:. Head is at 6113728\n";
      const secondLine  = "The following commits were pushed:\n";
      const thirdLine   = "- 6dcb09b Fix all the bugs by Monalisa Octocat\n";

      const expectation = [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": [firstLine, secondLine, thirdLine].join('').trim()
          }
        },
        {
          "type": "divider"
        }
      ];

      expect(output).toEqual(expectation);

      github.context.eventName = oldEventName;
      pushPayload.ref = oldTargetRef;
      pushPayload.commits = [];
    });
  });

  describe('run', () => {
    it('should fail without a proper context', () => {
      spyOn(core, 'setFailed');
      spyOn(core, 'setOutput');
      spyOn(console, 'error');

      translator.run();

      expect(core.setFailed).toHaveBeenCalled();
      expect(core.setOutput).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });

    it('should call the appropriate methods in order to create a message', () => {
      spyOn(core, 'getInput');
      spyOn(translator, 'getBlockBuilder').and.callThrough();
      spyOn(translator, 'getFallbackBlocks');
      spyOn(translator, 'formatBlocks');
      spyOn(core, 'setOutput');
      spyOn(core, 'setFailed');

      translator.run();

      expect(core.getInput).toHaveBeenCalled();
      expect(translator.getBlockBuilder).toHaveBeenCalled();
      expect(translator.formatBlocks).toHaveBeenCalled();
      expect(core.setOutput).toHaveBeenCalled();
      expect(core.setFailed).not.toHaveBeenCalled();
    });
  });
});
