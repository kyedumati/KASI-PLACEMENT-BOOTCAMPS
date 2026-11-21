---
lesson: true
category: "Developer Tools · Day 1"
---

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

```text title="Syntax"
cd FOLDER
ls [OPTIONS] [FOLDER]
```

Words in capitals are placeholders: you replace them with your own value. Anything in square brackets is optional. Every syntax line on this page follows that rule.

```bash
pwd                 # where am I? (print working directory)
ls                  # list files here
ls -la              # long listing, including hidden files
cd Documents        # go into a folder
cd ..               # go up one level
cd ~                # go to your home folder
```

A session for a user named `asha`, whose home folder holds `Documents` and `Downloads`. Lines that start with `$` are what she typed. The other lines are what the terminal printed.

``` { .text .output }
$ pwd
/home/asha
$ ls
Documents
Downloads
$ cd Documents
$ pwd
/home/asha/Documents
$ cd ..
$ pwd
/home/asha
```

In Git Bash on Windows the home folder looks like `/c/Users/asha`. On macOS it is `/Users/asha`.

| Symbol | Means |
|---|---|
| `.` | The current folder |
| `..` | The parent folder |
| `~` | Your home folder |
| `/` | The root of the file system, and the separator in a path |

Press ++tab++ to complete a file or folder name. Press ++arrow-up++ to bring back the previous command.

### Creating, copying, moving, deleting

```text title="Syntax"
mkdir FOLDER
cp SOURCE DESTINATION
mv SOURCE DESTINATION
rm FILE
echo "TEXT" > FILE
```

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

Most commands print nothing when they succeed. Silence means it worked. Only `cat` has something to show here, and an `ls` at the end confirms what is left:

``` { .text .output }
$ cat notes.txt
hello
world
$ ls
archive
notes.txt
```

!!! warning "There is no recycle bin"
    `rm` deletes immediately and permanently. Read the command twice before you press Enter, and never run `rm -rf` on a path you have not checked.

### Searching with grep

`grep` prints the lines of a file that contain a pattern.

```text title="Syntax"
grep [OPTIONS] "PATTERN" FILE
```

```bash
grep "world" notes.txt        # lines containing "world"
grep -i "HELLO" notes.txt     # ignore case
grep -n "hello" notes.txt     # show line numbers
grep -r "hello" .             # search every file under the current folder
```

``` { .text .output }
$ grep "world" notes.txt
world
$ grep -i "HELLO" notes.txt
hello
$ grep -n "hello" notes.txt
1:hello
$ grep -r "hello" .
./notes.txt:hello
```

### Pipes

A pipe `|` sends the output of one command into the next. Small commands joined by pipes do big jobs.

```text title="Syntax"
COMMAND-1 | COMMAND-2 | COMMAND-3
```

```bash
ls | wc -l                          # how many items are in this folder?
cat notes.txt | grep "o" | wc -l    # how many lines contain the letter o?
history | grep "git"                # which git commands have I run?
```

``` { .text .output }
$ ls | wc -l
2
$ cat notes.txt | grep "o" | wc -l
2
```

The folder holds `archive` and `notes.txt`, so the first count is 2. Both lines of `notes.txt` contain an `o`, so the second is 2 as well. The `history` line prints your own past commands, so its output is different for everyone.

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

```text title="Syntax"
chmod MODE FILE
```

Before and after, on a two-line script:

``` { .text .output }
$ ls -l run.sh
-rw-r--r--  1 asha  staff  27 Nov 23 10:00 run.sh
$ ./run.sh
bash: ./run.sh: Permission denied
$ chmod 755 run.sh
$ ls -l run.sh
-rwxr-xr-x  1 asha  staff  27 Nov 23 10:00 run.sh
$ ./run.sh
running
```

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

```text title="Syntax"
git config --global SETTING "VALUE"
```

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

These print nothing. Check what was saved:

``` { .text .output }
$ git config --global user.name
Asha Verma
$ git config --global user.email
asha@example.com
```

### The daily cycle

```text title="Syntax"
git add FILE-OR-FOLDER
git commit -m "MESSAGE"
```

```bash
git status                  # what has changed?
git add .                   # stage everything in this folder
git commit -m "Add Day 1 basics programs"
git push                    # send the commits to GitHub
```

What the cycle prints when one file, `day1/prime.py`, has been edited. The seven-character code such as `3f9c2ab` is the commit's id, and yours will be different.

``` { .text .output }
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   day1/prime.py

no changes added to commit (use "git add" and/or "git commit -a")
$ git add .
$ git commit -m "Test divisors only up to the square root"
[main 3f9c2ab] Test divisors only up to the square root
 1 file changed, 2 insertions(+), 1 deletion(-)
$ git status
On branch main
nothing to commit, working tree clean
```

Run `git status` before and after every other command until the cycle is automatic.

### Branch and merge

A branch lets you try something without touching the working version on `main`.

```text title="Syntax"
git switch -c NEW-BRANCH
git switch BRANCH
git merge BRANCH
git branch -d BRANCH
```

```bash
git branch                  # list branches; * marks the current one
git switch -c add-readme    # create a branch and move to it
# ...edit files, git add, git commit...
git switch main             # go back to main
git merge add-readme        # bring the branch's commits into main
git branch -d add-readme    # delete the branch once it is merged
```

Step 4 of the lab runs these commands and shows what each one prints.

### Writing a good commit message

| Weak | Better |
|---|---|
| `update` | `Add prime check and FizzBuzz` |
| `changes` | `Fix off-by-one in factorial loop` |
| `day 2` | `Add Day 2 hashing solutions` |

Start with a verb, and say what the commit does.

## In real projects

The same commands, in a working developer's day. The trainer opens the session with one of these; read the rest after class.

| What you learn here | Where it is used in real work |
|---|---|
| `cd`, `ls`, `cat` | Servers have no desktop. You log in over SSH and the terminal is all there is. |
| `grep` and pipes | A site is failing at 2 a.m. You search a 2 GB log file for `ERROR` and count what you find. |
| `chmod` | A deploy script will not run until it is executable. An SSH key is refused until only its owner can read it (`chmod 600`). |
| `git commit` | Every change in a company's code has an author, a time and a message. "Who changed this, and why?" has an answer. |
| Branch and merge | Each feature is built on its own branch and merged after a teammate reviews it in a pull request. |
| `git push` | A push often triggers automatic tests and a deployment. This site is rebuilt and published by a push. |

### Example: what went wrong on the server?

Save these six lines as `app.log`. They are the kind of lines a web application writes while it runs.

```text title="app.log"
2026-11-23 10:01:12 INFO  login user=asha
2026-11-23 10:01:40 ERROR payment timeout order=4411
2026-11-23 10:02:05 INFO  login user=ravi
2026-11-23 10:02:31 ERROR database connection refused
2026-11-23 10:03:02 WARN  slow response 2300ms
2026-11-23 10:03:44 ERROR payment timeout order=4415
```

```bash
grep "ERROR" app.log                       # show every error
grep -c "ERROR" app.log                    # count them
grep "ERROR" app.log | grep -c "payment"   # how many are about payments?
tail -n 2 app.log                          # the two most recent lines
```

``` { .text .output }
$ grep "ERROR" app.log
2026-11-23 10:01:40 ERROR payment timeout order=4411
2026-11-23 10:02:31 ERROR database connection refused
2026-11-23 10:03:44 ERROR payment timeout order=4415
$ grep -c "ERROR" app.log
3
$ grep "ERROR" app.log | grep -c "payment"
2
$ tail -n 2 app.log
2026-11-23 10:03:02 WARN  slow response 2300ms
2026-11-23 10:03:44 ERROR payment timeout order=4415
```

Two of the three errors are payment timeouts. That is the first thing you would tell your team.

## Lab: create `placement-training-2026`

### Step 1. Arrange your Day 1 work

Go to the folder that holds your `day1` folder. If your programs are loose in some other folder, create this structure and move them in.

```bash
mkdir placement-training-2026
mv day1 placement-training-2026/
cd placement-training-2026
ls day1
```

``` { .text .output }
$ ls day1
char_frequency.py
even_odd.py
factorial.py
fizzbuzz.py
largest.py
palindrome.py
prime.py
remove_duplicates.py
reverse_number.py
second_largest.py
student_records.py
students.csv
sum_digits.py
word_count.py
```

Your file names may differ. What matters is that the thirteen programs and the CSV are there.

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

``` { .text .output }
$ git init
Initialized empty Git repository in /home/asha/placement-training-2026/.git/
$ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README.md
	day1/

nothing added to commit but untracked files present (use "git add" to track)
$ git add .
$ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   README.md
	new file:   day1/char_frequency.py
	new file:   day1/even_odd.py
	...12 more lines, one for each file...

$ git commit -m "Add Day 1 Python programs"
[main (root-commit) e7da4b0] Add Day 1 Python programs
 15 files changed, 17 insertions(+)
 create mode 100644 README.md
 create mode 100644 day1/char_frequency.py
 ...13 more lines, one for each file...
$ git log --oneline
e7da4b0 Add Day 1 Python programs
```

Your commit id and your count of insertions will be different.

The first `git status` lists your files as untracked. The second lists them as changes to be committed. `git log` shows one commit.

### Step 4. Practise a branch and a merge

```bash
git switch -c improve-readme
```

``` { .text .output }
$ git switch -c improve-readme
Switched to a new branch 'improve-readme'
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

``` { .text .output }
$ git add README.md
$ git commit -m "Add author line to README"
[improve-readme c34a823] Add author line to README
 1 file changed, 1 insertion(+)
$ git switch main
Switched to branch 'main'
$ git merge improve-readme
Updating e7da4b0..c34a823
Fast-forward
 README.md | 1 +
 1 file changed, 1 insertion(+)
$ git branch -d improve-readme
Deleted branch improve-readme (was c34a823).
$ git log --oneline
c34a823 Add author line to README
e7da4b0 Add Day 1 Python programs
```

"Fast-forward" means `main` had no new commits of its own, so Git simply moved `main` forward to the branch's latest commit.

`git log` now shows two commits on `main`.

### Step 5. Push to GitHub

1. On [github.com](https://github.com/), click **New repository**.
2. Name it `placement-training-2026`. Choose **Public**.
3. Do **not** tick "Add a README file". You already have one.
4. Click **Create repository**. GitHub shows a page with commands. Run the two below, with your own username.

```text title="Syntax"
git remote add NAME URL
git push -u NAME BRANCH
```

```bash
git remote add origin https://github.com/YOUR-USERNAME/placement-training-2026.git
git push -u origin main
```

A successful push ends like this. The counts and ids will be your own.

``` { .text .output }
$ git push -u origin main
Enumerating objects: 21, done.
Counting objects: 100% (21/21), done.
Writing objects: 100% (21/21), 2.31 KiB | 2.31 MiB/s, done.
Total 21 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/YOUR-USERNAME/placement-training-2026.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
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
