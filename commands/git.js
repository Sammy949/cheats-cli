// Comprehensive Git CLI Cheatsheet with detailed explanations
// This is the first module of Helpsheet - more command categories coming soon!
const topics = {
  "Init & Clone": [
    { cmd: "git init", desc: "Initialises a new Git repository" },
    {
      cmd: "git init --bare",
      desc: "Creates a bare repository (no working directory)",
    },
    {
      cmd: "git clone <url>",
      desc: "Clones a remote repo to your local machine",
    },
    {
      cmd: "git clone <url> <directory>",
      desc: "Clones repo into a specific directory",
    },
    {
      cmd: "git clone --depth 1 <url>",
      desc: "Shallow clone with only the latest commit",
    },
    {
      cmd: "git clone --branch <branch> <url>",
      desc: "Clones a specific branch",
    },
    {
      cmd: "git clone --recursive <url>",
      desc: "Clones repo with all submodules",
    },
  ],

  "Status & Information": [
    { cmd: "git status", desc: "Shows changed files and staging status" },
    { cmd: "git status -s", desc: "Shows status in short format" },
    {
      cmd: "git status --porcelain",
      desc: "Shows status in machine-readable format",
    },
    { cmd: "git log", desc: "Shows commit history" },
    { cmd: "git log --oneline", desc: "Shows condensed commit history" },
    {
      cmd: "git log --graph --oneline --all",
      desc: "Shows visual branch history",
    },
    { cmd: "git log -p", desc: "Shows commit history with diffs" },
    {
      cmd: 'git log --since="2 weeks ago"',
      desc: "Shows commits from last 2 weeks",
    },
    {
      cmd: 'git log --author="username"',
      desc: "Shows commits by specific author",
    },
    { cmd: "git show <commit>", desc: "Shows details of a specific commit" },
    { cmd: "git diff", desc: "Shows unstaged changes" },
    { cmd: "git diff --staged", desc: "Shows staged changes" },
    { cmd: "git diff HEAD~1", desc: "Shows changes since last commit" },
    { cmd: "git blame <file>", desc: "Shows who changed each line in a file" },
  ],

  "Staging & Commit": [
    { cmd: "git add .", desc: "Stages all changes in the directory" },
    { cmd: "git add <file>", desc: "Stages a specific file" },
    { cmd: "git add -A", desc: "Stages all changes including deletions" },
    { cmd: "git add -u", desc: "Stages only modified and deleted files" },
    { cmd: "git add -p", desc: "Interactively stage parts of files" },
    { cmd: "git reset <file>", desc: "Unstages a file" },
    { cmd: "git reset", desc: "Unstages all files" },
    {
      cmd: 'git commit -m "message"',
      desc: "Commits staged changes with a message",
    },
    {
      cmd: 'git commit -am "message"',
      desc: "Stages and commits all tracked files",
    },
    { cmd: "git commit --amend", desc: "Modifies the last commit" },
    {
      cmd: "git commit --amend --no-edit",
      desc: "Adds staged changes to last commit",
    },
    {
      cmd: 'git commit --allow-empty -m "message"',
      desc: "Creates empty commit",
    },
  ],

  "Push & Pull": [
    { cmd: "git push", desc: "Pushes local commits to remote repository" },
    {
      cmd: "git push origin <branch>",
      desc: "Pushes specific branch to origin",
    },
    {
      cmd: "git push -u origin <branch>",
      desc: "Pushes and sets upstream tracking",
    },
    { cmd: "git push --all", desc: "Pushes all branches to remote" },
    { cmd: "git push --tags", desc: "Pushes all tags to remote" },
    {
      cmd: "git pull",
      desc: "Fetches and merges changes from remote to local",
    },
    { cmd: "git pull --rebase", desc: "Pulls and rebases instead of merging" },
    {
      cmd: "git pull origin <branch>",
      desc: "Pulls specific branch from origin",
    },
    { cmd: "git fetch", desc: "Downloads changes without merging" },
    { cmd: "git fetch --all", desc: "Fetches from all remotes" },
    {
      cmd: "git fetch --prune",
      desc: "Removes deleted branches from remote tracking",
    },
  ],

  "Branching & Merging": [
    { cmd: "git branch", desc: "Lists local branches" },
    { cmd: "git branch -a", desc: "Lists all branches (local and remote)" },
    { cmd: "git branch -r", desc: "Lists remote branches" },
    { cmd: "git branch <branch>", desc: "Creates a new branch" },
    { cmd: "git checkout <branch>", desc: "Switches to a branch" },
    {
      cmd: "git checkout -b <branch>",
      desc: "Creates and switches to a new branch",
    },
    {
      cmd: "git checkout -b <branch> origin/<branch>",
      desc: "Creates local branch from remote",
    },
    { cmd: "git switch <branch>", desc: "Switches to a branch (newer syntax)" },
    {
      cmd: "git switch -c <branch>",
      desc: "Creates and switches to new branch",
    },
    {
      cmd: "git merge <branch>",
      desc: "Merges a branch into your current one",
    },
    { cmd: "git merge --no-ff <branch>", desc: "Merges with a merge commit" },
    {
      cmd: "git merge --squash <branch>",
      desc: "Squashes branch commits into one",
    },
    { cmd: "git rebase <branch>", desc: "Rebases current branch onto another" },
    {
      cmd: "git rebase -i HEAD~3",
      desc: "Interactive rebase of last 3 commits",
    },
  ],

  "Remote & Config": [
    { cmd: "git remote -v", desc: "Lists the current remotes" },
    { cmd: "git remote add <name> <url>", desc: "Adds a new remote" },
    { cmd: "git remote remove <name>", desc: "Removes a remote" },
    { cmd: "git remote rename <old> <new>", desc: "Renames a remote" },
    { cmd: "git remote set-url origin <url>", desc: "Changes remote URL" },
    { cmd: "git config --list", desc: "Displays all Git config settings" },
    {
      cmd: 'git config --global user.name "Name"',
      desc: "Sets your global Git username",
    },
    {
      cmd: 'git config --global user.email "email@example.com"',
      desc: "Sets your global Git email",
    },
    {
      cmd: "git config --global init.defaultBranch main",
      desc: "Sets default branch name",
    },
    {
      cmd: "git config --global core.editor vim",
      desc: "Sets default text editor",
    },
    {
      cmd: "git config --global alias.st status",
      desc: "Creates alias 'st' for status",
    },
  ],

  Stashing: [
    { cmd: "git stash", desc: "Temporarily saves uncommitted changes" },
    {
      cmd: 'git stash push -m "message"',
      desc: "Stashes with a descriptive message",
    },
    { cmd: "git stash list", desc: "Lists all stashes" },
    { cmd: "git stash pop", desc: "Applies and removes the latest stash" },
    { cmd: "git stash apply", desc: "Applies stash without removing it" },
    { cmd: "git stash apply stash@{2}", desc: "Applies a specific stash" },
    { cmd: "git stash drop", desc: "Deletes the latest stash" },
    { cmd: "git stash clear", desc: "Deletes all stashes" },
    { cmd: "git stash show -p", desc: "Shows stash contents as diff" },
  ],

  Tags: [
    { cmd: "git tag", desc: "Lists all tags" },
    { cmd: "git tag <tagname>", desc: "Creates a lightweight tag" },
    {
      cmd: 'git tag -a <tagname> -m "message"',
      desc: "Creates an annotated tag",
    },
    { cmd: "git tag -d <tagname>", desc: "Deletes a local tag" },
    { cmd: "git push origin <tagname>", desc: "Pushes a tag to remote" },
    { cmd: "git push origin --tags", desc: "Pushes all tags to remote" },
    { cmd: "git push origin --delete <tagname>", desc: "Deletes a remote tag" },
    { cmd: "git checkout <tagname>", desc: "Checks out a specific tag" },
  ],

  "Undoing Changes": [
    {
      cmd: "git checkout -- <file>",
      desc: "Discards changes in working directory",
    },
    {
      cmd: "git restore <file>",
      desc: "Restores file to last committed state",
    },
    { cmd: "git restore --staged <file>", desc: "Unstages a file" },
    { cmd: "git reset HEAD~1", desc: "Undoes last commit, keeps changes" },
    {
      cmd: "git reset --soft HEAD~1",
      desc: "Undoes commit, keeps changes staged",
    },
    {
      cmd: "git reset --hard HEAD~1",
      desc: "Reverts to previous commit & discards changes",
    },
    {
      cmd: "git revert <commit>",
      desc: "Creates new commit that undoes changes",
    },
    {
      cmd: "git revert --no-commit <commit>",
      desc: "Reverts without auto-committing",
    },
    { cmd: "git reflog", desc: "Shows history of HEAD changes" },
    { cmd: "git reset --hard <commit>", desc: "Resets to specific commit" },
  ],

  "Search & Find": [
    { cmd: 'git grep "pattern"', desc: "Searches for text in tracked files" },
    { cmd: 'git grep -n "pattern"', desc: "Searches with line numbers" },
    { cmd: 'git log --grep="pattern"', desc: "Searches commit messages" },
    {
      cmd: 'git log -S "text"',
      desc: "Searches for commits that add/remove text",
    },
    {
      cmd: "git log --follow <file>",
      desc: "Shows history of a file including renames",
    },
    { cmd: "git bisect start", desc: "Starts binary search for bug" },
    {
      cmd: "git bisect good <commit>",
      desc: "Marks commit as good during bisect",
    },
    {
      cmd: "git bisect bad <commit>",
      desc: "Marks commit as bad during bisect",
    },
  ],

  "Sync & Prune": [
    {
      cmd: "git fetch --prune",
      desc: "Removes deleted branches from remote tracking",
    },
    {
      cmd: "git remote prune origin",
      desc: "Removes all stale remote-tracking branches",
    },
    { cmd: "git gc", desc: "Cleans up and optimizes repository" },
    {
      cmd: "git gc --aggressive",
      desc: "More thorough cleanup and optimization",
    },
    { cmd: "git fsck", desc: "Verifies repository integrity" },
    {
      cmd: "git remote update --prune",
      desc: "Updates all remotes and prunes",
    },
  ],

  "Delete & Cleanup": [
    { cmd: "git branch -d <branch>", desc: "Deletes a branch (safe)" },
    { cmd: "git branch -D <branch>", desc: "Forces deletion of a branch" },
    { cmd: "git push origin --delete <branch>", desc: "Deletes remote branch" },
    { cmd: "git clean -n", desc: "Shows what would be deleted (dry run)" },
    { cmd: "git clean -f", desc: "Deletes untracked files" },
    { cmd: "git clean -fd", desc: "Deletes untracked files & folders" },
    { cmd: "git clean -fx", desc: "Deletes untracked and ignored files" },
    { cmd: "git rm <file>", desc: "Removes file from working tree and index" },
    { cmd: "git rm --cached <file>", desc: "Removes file from index only" },
  ],

  Submodules: [
    { cmd: "git submodule add <url> <path>", desc: "Adds a submodule" },
    { cmd: "git submodule init", desc: "Initializes submodules" },
    {
      cmd: "git submodule update",
      desc: "Updates submodules to recorded commits",
    },
    {
      cmd: "git submodule update --init --recursive",
      desc: "Initializes and updates all submodules",
    },
    {
      cmd: "git submodule foreach git pull origin main",
      desc: "Pulls latest changes in all submodules",
    },
    { cmd: "git submodule status", desc: "Shows status of submodules" },
  ],

  "GitHub CLI (gh)": [
    { cmd: "gh auth login", desc: "Authenticate the GitHub CLI" },
    { cmd: "gh auth status", desc: "Shows authentication status" },
    { cmd: "gh repo create", desc: "Creates a new repository" },
    { cmd: "gh repo clone user/repo", desc: "Clones a repo via GitHub CLI" },
    { cmd: "gh repo fork", desc: "Forks the current repository" },
    {
      cmd: "gh pr create --fill",
      desc: "Creates a PR with prefilled title/body",
    },
    { cmd: "gh pr list", desc: "Lists pull requests" },
    {
      cmd: "gh pr checkout <number>",
      desc: "Checks out a pull request locally",
    },
    { cmd: "gh pr merge <number>", desc: "Merges a pull request" },
    { cmd: "gh issue create", desc: "Creates a new issue" },
    { cmd: "gh issue list", desc: "Lists issues" },
    {
      cmd: "gh workflow run <workflow>",
      desc: "Triggers a GitHub Actions workflow",
    },
  ],

  "CI/CD & Automation": [
    { cmd: "npm test", desc: "Runs your test suite" },
    { cmd: "npm run lint", desc: "Runs your linter" },
    { cmd: "npm run build", desc: "Builds your project" },
    {
      cmd: 'git config user.name "CI Bot"',
      desc: "Sets Git username in CI pipelines",
    },
    {
      cmd: 'git config user.email "ci@example.com"',
      desc: "Sets Git email in CI pipelines",
    },
    {
      cmd: 'git add . && git commit -m "[skip ci] Update"',
      desc: "Commits with CI skip directive",
    },
    {
      cmd: 'git tag -a v1.0.0 -m "Release v1.0.0"',
      desc: "Creates release tag",
    },
    { cmd: "git push origin v1.0.0", desc: "Pushes release tag" },
  ],

  "Advanced Operations": [
    {
      cmd: "git cherry-pick <commit>",
      desc: "Applies a commit to current branch",
    },
    {
      cmd: "git cherry-pick -n <commit>",
      desc: "Cherry-picks without committing",
    },
    {
      cmd: "git format-patch -1 <commit>",
      desc: "Creates patch file from commit",
    },
    { cmd: "git apply <patch>", desc: "Applies a patch file" },
    {
      cmd: "git archive --format=zip HEAD > archive.zip",
      desc: "Creates archive of current state",
    },
    {
      cmd: "git worktree add <path> <branch>",
      desc: "Creates additional working tree",
    },
    { cmd: "git worktree list", desc: "Lists all working trees" },
    { cmd: "git worktree remove <path>", desc: "Removes a working tree" },
  ],

  "Hooks & Automation": [
    { cmd: "ls .git/hooks/", desc: "Lists available Git hooks" },
    {
      cmd: "chmod +x .git/hooks/pre-commit",
      desc: "Makes pre-commit hook executable",
    },
    {
      cmd: "git config core.hooksPath <path>",
      desc: "Sets custom hooks directory",
    },
    {
      cmd: "git config --global init.templatedir <path>",
      desc: "Sets template directory for new repos",
    },
  ],

  "Danger Zone ⚠️": [
    {
      cmd: "git reset --hard HEAD~1",
      desc: "Reverts to previous commit & discards changes",
    },
    {
      cmd: "git push --force",
      desc: "Force-pushes your changes (overwrites history!)",
    },
    {
      cmd: "git push --force-with-lease",
      desc: "Safer force push (checks for updates)",
    },
    { cmd: "git clean -fd", desc: "Deletes untracked files/folders" },
    {
      cmd: "git filter-branch --tree-filter 'rm -f passwords.txt' HEAD",
      desc: "Removes file from entire history",
    },
    {
      cmd: "git rebase --onto <newbase> <oldbase> <branch>",
      desc: "Advanced rebasing",
    },
    {
      cmd: "git reflog expire --expire=now --all",
      desc: "Expires all reflog entries",
    },
    { cmd: "git gc --prune=now", desc: "Aggressive garbage collection" },
  ],
};

// Module metadata and exports
const gitModule = {
  name: "Git",
  description: "Version control system commands and workflows",
  icon: "📚",
  topics: topics,
  // Function to get available categories
  getCategories: () => Object.keys(topics),
  // Function to get commands for a specific category
  getCommands: (category) => topics[category] || [],
  // Function to search commands
  searchCommands: (query) => {
    const results = [];
    Object.entries(topics).forEach(([category, commands]) => {
      commands.forEach(command => {
        if (command.cmd.toLowerCase().includes(query.toLowerCase()) || 
            command.desc.toLowerCase().includes(query.toLowerCase())) {
          results.push({ ...command, category });
        }
      });
    });
    return results;
  }
};

module.exports = gitModule;
