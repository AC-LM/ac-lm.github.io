

> [How can I check if a program exists from a Bash script? - Stack Overflow](https://stackoverflow.com/questions/592620/how-can-i-check-if-a-program-exists-from-a-bash-script)

POSIX compatible:

```
command -v <the_command>
```

Example use:

```
if ! command -v <the_command> &> /dev/null
then
    echo "<the_command> could not be found"
    exit
fi
```

For Bash specific environments:

```
hash <the_command> # For regular commands. Or...
type <the_command> # To check built-ins and keywords
```

## Explanation

Avoid `which`. Not only is it an external process you're launching for doing very little (meaning builtins like `hash`, `type` or `command` are way cheaper), you can also rely on the builtins to actually do what you want, while the effects of external commands can easily vary from system to system.

Why care?

- Many operating systems have a `which` that **doesn't even set an exit status**, meaning the `if which foo` won't even work there and will **always** report that `foo` exists, even if it doesn't (note that some POSIX shells appear to do this for `hash` too).
- Many operating systems make `which` do custom and evil stuff like change the output or even hook into the package manager.

So, don't use `which`. Instead use one of these:

```
$ command -v foo >/dev/null 2>&1 || { echo >&2 "I require foo but it's not installed.  Aborting."; exit 1; }
$ type foo >/dev/null 2>&1 || { echo >&2 "I require foo but it's not installed.  Aborting."; exit 1; }
$ hash foo 2>/dev/null || { echo >&2 "I require foo but it's not installed.  Aborting."; exit 1; }
```

(Minor side-note: some will suggest `2>&-` is the same `2>/dev/null` but shorter – *this is untrue*. `2>&-` closes FD 2 which causes an **error** in the program when it tries to write to stderr, which is very different from successfully writing to it and discarding the output (and dangerous!))

If your hash bang is `/bin/sh` then you should care about what POSIX says. `type` and `hash`'s exit codes aren't terribly well defined by POSIX, and `hash` is seen to exit successfully when the command doesn't exist (haven't seen this with `type` yet). `command`'s exit status is well defined by POSIX, so that one is probably the safest to use.

If your script uses `bash` though, POSIX rules don't really matter anymore and both `type` and `hash` become perfectly safe to use. `type` now has a `-P` to search just the `PATH` and `hash` has the side-effect that the command's location will be hashed (for faster lookup next time you use it), which is usually a good thing since you probably check for its existence in order to actually use it.

As a simple example, here's a function that runs `gdate` if it exists, otherwise `date`:

```
gnudate() {
    if hash gdate 2>/dev/null; then
        gdate "$@"
    else
        date "$@"
    fi
}
```

# Alternative with a complete feature set

You can use [scripts-common](https://gitlab.com/bertrand-benoit/scripts-common) to reach your need.

To check if something is installed, you can do:

```sh
checkBin <the_command> || errorMessage "This tool requires <the_command>. Install it please, and then run this tool again."
```