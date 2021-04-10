# Your first express server

## CONTEXT AND OBJECTIVES

It's finally time to create your first web server!

First (baby steps), you will create a really simple server with just one endpoint.
This endpoint will be `/` and must return `"OK"` with a status code of 200.

## SPECS

```
| Endpoint | HTTP Method | Response Content-Type | Response value |
|----------|-------------|-----------------------|----------------|
| /        | 200         | text/html             | OK             |
```

For tests and architecture purposes the server is split into two files:

- `server.ts` contains your Express application, routes definitions and **MUST** export a variable named `app` that contains your Express Application.
- `index.ts` will import `app` from the `server.ts` file and run the `app.listen`.

⚠️ `server.ts` **MUST NOT** call `app.listen` or the tests won't run correctly. This must be done in ˋindex.tsˋ

You can run your server with `yarn start`.

By default, your server will run on port 3000 but you can change that with a `PORT` environment variable either by running:

```shell-session
$ export PORT=8000
$ yarn start
Server successfully started on http://localhost:8000
```

or

```shell-session
$ PORT=8000 yarn start
Server successfully started on http://localhost:8000
```

> Note: the tests will run on port 3030 and can be launched parallel to your own server or when your server is not launched.
