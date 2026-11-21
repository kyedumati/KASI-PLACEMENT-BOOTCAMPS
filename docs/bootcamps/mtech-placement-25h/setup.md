# Before Day 1: setup checklist

Finish this list before you come to class. The Day 1 setup slot is 30 minutes, which is enough to check installs but not to download them.

## Install

- [ ] **Python 3.10 or newer** from [python.org](https://www.python.org/downloads/). On Windows, tick **Add python.exe to PATH** in the installer.
- [ ] **VS Code** from [code.visualstudio.com](https://code.visualstudio.com/), with the **Python** extension by Microsoft.
- [ ] **Git** from [git-scm.com](https://git-scm.com/downloads).
- [ ] **Jupyter**: in VS Code, install the **Jupyter** extension by Microsoft. Then install the notebook package with the command in the check below. You need it from the afternoon of Day 3.

## Accounts

- [ ] [GitHub](https://github.com/)
- [ ] [LeetCode](https://leetcode.com/)
- [ ] [HackerRank](https://www.hackerrank.com/)
- [ ] A Google account, for Colab on Day 4

## Check that it works

Open a terminal (Command Prompt or PowerShell on Windows, Terminal on macOS and Linux) and run these two commands.

=== "Windows"

    ```text
    python --version
    git --version
    ```

=== "macOS / Linux"

    ```text
    python3 --version
    git --version
    ```

Each should print a version number. If you see "command not found" or "is not recognized", the install is not on your PATH. Reinstall, and tell the trainer at the start of Day 1.

Then save this as `hello.py` and run it:

```python
print("Setup works")
```

=== "Windows"

    ```text
    python hello.py
    ```

=== "macOS / Linux"

    ```text
    python3 hello.py
    ```

Last, install Jupyter and check it:

=== "Windows"

    ```text
    python -m pip install notebook
    python -m notebook --version
    ```

=== "macOS / Linux"

    ```text
    python3 -m pip install notebook
    python3 -m notebook --version
    ```

The second command should print a version number.

## Bring

- Your laptop and charger
- A notebook and pen. You will trace code on paper every day.
