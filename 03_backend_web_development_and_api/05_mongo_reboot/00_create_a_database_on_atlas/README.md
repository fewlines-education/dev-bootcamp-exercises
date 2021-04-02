# CREATE A DATABASE ON ATLAS

## CONTEXT AND OBJECTIVES

We just need to be sure that everything is good for the Atlas connection.

## SPECS

Yesterday we made you create a database on MongoDB Atlas and you had an URL that look like this:

```
mongodb+srv://<your-username>:<your-password>@cluster0.djg4e.mongodb.net/
```

To be sure everything is still working, please do the following:

- 1️⃣ Create a `.env_vars` file or copy the file from yesterday.
- 2️⃣ **BE EXTRA SURE** that it is added to your `.gitignore` file to avoid revealing your password on Github on a push.
- 3️⃣ add the database url in the `.env_vars` file:

  ```bash
  export MONGODB_DATABASE_URL='mongodb+srv://<your-username>:<your-password>@<cluster-name>.djg4e.mongodb.net/'
  ```

  > Change the placeholders with your own credentials.

- 4️⃣ source your file:

  ```bash
  source .env_vars
  ```

Now it's time to check with `yarn test`!

Launch the tests only once and pass to the next exercise, we will come see you if there is a problem.
