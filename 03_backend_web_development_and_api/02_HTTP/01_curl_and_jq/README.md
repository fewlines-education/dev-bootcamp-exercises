# Curl and jq

Have you heard about Star Wars?
Well there's an API for it with a whole lot of data: the [SWAPI](https://swapi.dev/).

## Context and Objectives

In this exercise, we want you to get familiar with `curl` and `jq`.

We talked in the course about `curl`: a CLI that can make HTTP request.
`jq` is another CLI that deal with JSON data, it can format and query it.

## Specs

You should test around with the `curl` and `jq` commands in this exercise.
We will only test a few examples of them but get familiar with them anyway 🙂.

In the `src` directory, you will see several `.sh` files.
You can launch them with this command (for instance):

```shell-session
$ bash src/01_test_jq.sh
```

For now, those `.sh` file only contain an `echo` command that you will have to replace with those requirements:

### 01_test_curl.sh

This file should contain a curl call that will display the content of `https://swapi.dev/api/planets/1/`.

Hint: don't forget to place your URL between single quotes when using `curl`.

### 02_test_jq.sh

This file should contain the result of the piping of the previous call (copy it, don't try to import it) and `jq`.
You'll see that `jq` is parsing the JSON that you receive and displaying it to you with indentation and colors.

Hint: you can find the piping operator in the OS and Terminal course.

When testing your call, you'll notice something that is not intended that look like this:

```
 % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   821    0   821    0     0   3040      0 --:--:-- --:--:-- --:--:--  3029
```

This is `curl` telling your its progress because it detects that you are using a pipe.
To not view that, you will need to add the `--silent` option to curl.

### 03_querying_with_jq.sh

`jq` can make a better display but it can also do more than that.
For instance, you can see the content of the key `url` by doing that:

```shell-session
$ curl --silent 'https://swapi.dev/api/planets/1/' | jq '.url'
```

You can test with the different values of the data to see what it does.
Accessing arrays entries looks like in JavaScript: `jq '.array[0]'`.

Your task is to display the value of the first resident of Tatooine (it's an URL).
Don't hesitate to look at who it is 😉.

Hint: beware that the query starts with a dot `.` and should be inside single quotes
