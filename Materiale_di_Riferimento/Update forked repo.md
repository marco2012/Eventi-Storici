### 1. Clone your fork:

    git clone https://github.com/YOUR-USERNAME/YOUR-FORKED-REPO.git

### 2. Add remote from original repository in your forked repository:

    cd into cloned fork-repo
    git remote add upstream https://github.com/ORIGINAL-DEV-USERNAME/REPO-YOU-FORKED-FROM.git
    git fetch upstream

### 3. Updating your fork from original repo to keep up with their changes:

    git pull upstream master
