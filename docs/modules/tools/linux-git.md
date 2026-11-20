# Linux and Git

<p class="session-meta">60 minutes · Shell commands, pipes, permissions, git init to push, writing a README</p>

## Outcome

You can move around a file system from the terminal, and your Day 1 programs are in a public GitHub repository named `placement-training-2026`. Every later lab is committed there.

## Time-box

| Minutes | Activity |
|---|---|
| 0 to 5 | Hook: "Send me the link to your code." A recruiter asks this. What do you send? |
| 5 to 20 | Linux commands, typed live |
| 20 to 30 | Git: the three areas, and the daily cycle |
| 30 to 55 | Lab: create the repository and push Day 1 |
| 55 to 60 | Debrief: everyone opens their repository page on GitHub |

## Which terminal to use

| Your system | Open |
|---|---|
| Windows | **Git Bash**. It was installed with Git, and it understands every command on this page. Command Prompt and PowerShell do not. |
| macOS | Terminal |
| Linux | Terminal |

## Part 1: Linux commands

### Moving around

```bash
pwd                 # where am I? (print working directory)
ls                  # list files here
ls -la              # long listing, including hidden files
cd Documents        # go into a folder
cd ..               # go up one level
cd ~                # go to your home folder
```

| Symbol | Means |
|---|---|
| `.` | The current folder |
| `..` | The parent folder |
| `~` | Your home folder |
| `/` | The root of the file system, and the separator in a path |

Press ++tab++ to complete a file or folder name. Press ++arrow-up++ to bring back the previous command.

### Creating, copying, moving, deleting

```bash
mkdir practice              # make a folder
cd practice
echo "hello" > notes.txt    # create a file with one line (> overwrites)
echo "world" >> notes.txt   # add a line (>> appends)
cat notes.txt               # print a file

cp notes.txt backup.txt     # copy
mv backup.txt old.txt       # rename (move to a new name)
mkdir archive
mv old.txt archive/         # move into a folder
rm archive/old.txt          # delete a file
```

!!! warning "There is no recycle bin"
    `rm` deletes immediately and permanently. Read the command twice before you press Enter, and never run `rm -rf` on a path you have not checked.

### Searching with grep

`grep` prints the lines of a file that contain a pattern.

```bash
grep "world" notes.txt        # lines containing "world"
grep -i "HELLO" notes.txt     # ignore case
grep -n "hello" notes.txt     # show line numbers
grep -r "def " .              # search every file under the current folder
```

### Pipes

A pipe `|` sends the output of one command into the next. Small commands joined by pipes do big jobs.

```bash
ls | wc -l                          # how many items are in this folder?
cat notes.txt | grep "o" | wc -l    # how many lines contain the letter o?
history | grep "git"                # which git commands have I run?
```

### Permissions with chmod

`ls -l` shows who may do what to each file.

```text
-rwxr-xr--  1 asha  staff  120 Nov 20 10:00 run.sh
 └┬┘└┬┘└┬┘
  │  │  └── others: read
  │  └───── group:  read, execute
  └──────── owner:  read, write, execute
```

Each permission has a number: read is 4, write is 2 and execute is 1. Add them up for each of the three groups.

| Command | Result | Meaning |
|---|---|---|
| `chmod 755 run.sh` | `rwxr-xr-x` | Owner does everything; everyone else can read and run |
| `chmod 644 notes.txt` | `rw-r--r--` | Owner reads and writes; everyone else reads |
| `chmod +x run.sh` | adds `x` | Make a script runnable |

On Windows, Git Bash accepts `chmod` but Windows does not store these permissions, so `ls -l` may not change. Learn the numbers anyway: they are asked in interviews and used on every server.

## Part 2: Git

### What Git is

Git records snapshots of your project, called **commits**. You can return to any snapshot, and you can work on separate lines of development, called **branches**. **GitHub** is a website that hosts a copy of your Git repository, so others can see it.

### The three areas

```text
Working directory  --git add-->  Staging area  --git commit-->  Repository  --git push-->  GitHub
(files you edit)                 (what goes in                  (history on                (history
                                 the next commit)               your laptop)               online)
```

### One-time setup

Tell Git who you are. Use the email of your GitHub account.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

### The daily cycle

```bash
git status                  # what has changed?
git add .                   # stage everything in this folder
git commit -m "Add Day 1 basics programs"
git push                    # send the commits to GitHub
```

Run `git status` before and after every other command until the cycle is automatic.

### Branch and merge

A branch lets you try something without touching the working version on `main`.

```bash
git branch                  # list branches; * marks the current one
git switch -c add-readme    # create a branch and move to it
# ...edit files, git add, git commit...
git switch main             # go back to main
git merge add-readme        # bring the branch's commits into main
git branch -d add-readme    # delete the branch once it is merged
```

### Writing a good commit message

| Weak | Better |
|---|---|
| `update` | `Add prime check and FizzBuzz` |
| `changes` | `Fix off-by-one in factorial loop` |
| `day 2` | `Add Day 2 hashing solutions` |

Start with a verb, and say what the commit does.

## Lab: create `placement-training-2026`

### Step 1. Arrange your Day 1 work

Go to the folder that holds your `day1` folder. If your programs are loose in some other folder, create this structure and move them in.

```bash
mkdir placement-training-2026
mv day1 placement-training-2026/
cd placement-training-2026
ls day1
```

You should see your programs from the three Python sessions, plus `students.csv`.

### Step 2. Write a README

Create `README.md` in VS Code, in the `placement-training-2026` folder. A README is the first thing a visitor to your repository sees.

```markdown
# Placement Training 2026

My solutions from the M.Tech placement readiness training.

| Folder | Contents |
|---|---|
| day1 | Python basics, data structures, functions, files and OOP |
| day2 | DSA I: arrays, hashing, two pointers, binary search, stacks, linked lists |
| day3 | DSA II: recursion, trees, graphs, dynamic programming |

## How to run

    python day1/fizzbuzz.py
```

### Step 3. Make the first commit

```bash
git init
git status
git add .
git status
git commit -m "Add Day 1 Python programs"
git log --oneline
```

The first `git status` lists your files as untracked. The second lists them as changes to be committed. `git log` shows one commit.

### Step 4. Practise a branch and a merge

```bash
git switch -c improve-readme
```

Add one line about yourself to `README.md` and save it. Then:

```bash
git add README.md
git commit -m "Add author line to README"
git switch main
git merge improve-readme
git branch -d improve-readme
git log --oneline
```

`git log` now shows two commits on `main`.

### Step 5. Push to GitHub

1. On [github.com](https://github.com/), click **New repository**.
2. Name it `placement-training-2026`. Choose **Public**.
3. Do **not** tick "Add a README file". You already have one.
4. Click **Create repository**. GitHub shows a page with commands. Run the two below, with your own username.

```bash
git remote add origin https://github.com/YOUR-USERNAME/placement-training-2026.git
git push -u origin main
```

The first push asks you to sign in. A browser window opens: sign in to GitHub there and approve. Your GitHub account password typed into the terminal does not work.

### Step 6. Check

Open `https://github.com/YOUR-USERNAME/placement-training-2026` in a browser. You should see the `day1` folder, your README displayed under the file list, and "2 commits".

!!! success "From now on"
    After every session, and after every evening practice, run the daily cycle: `git add .`, `git commit -m "..."`, `git push`. Daily lab submissions are 30% of your score, and they are counted from this repository.

## Common mistakes

| What you see | Cause | Fix |
|---|---|---|
| `fatal: not a git repository` | You are in the wrong folder | `cd` into `placement-training-2026`, then check with `pwd` |
| `Author identity unknown` | The one-time setup was skipped | Run the two `git config --global` commands |
| `nothing to commit, working tree clean` | The file was not saved, or it is already committed | Save in VS Code, then `git status` |
| `error: src refspec main does not match any` | You have no commit yet, or the branch is named `master` | Commit first. If `git branch` shows `master`, run `git branch -M main`. |
| `remote origin already exists` | `git remote add` was run twice | `git remote set-url origin <url>` |
| `Updates were rejected` on push | GitHub has commits you do not have, usually a README created on the website | `git pull --rebase origin main`, then push again |
| `Authentication failed` | You typed your account password | Sign in through the browser window, or use a personal access token |
| `git init` run in your home folder | Git starts tracking your whole computer | Delete the `.git` folder there, with the trainer's help |

## Interview questions

1. What is the difference between Git and GitHub?
2. What is the difference between `git add` and `git commit`? What is the staging area for?
3. What is the difference between `git pull` and `git fetch`?
4. What is a merge conflict? How do you resolve one?
5. What is the difference between `git merge` and `git rebase`?
6. What does `chmod 755` mean?
7. What is the difference between an absolute path and a relative path?
8. How would you find every line containing "error" in a log file, and count them?
9. What is a `.gitignore` file? Name two things that belong in it.

## Commit

This session is the commit. Your repository on GitHub is the evidence for Day 1.
