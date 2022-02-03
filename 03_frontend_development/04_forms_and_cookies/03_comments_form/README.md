# Comments Form

## CONTEXT AND OBJECTIVES

Let's try to add a form in a Game show page.

We want to add the feature of comments so that anyone can share their opinion on a game.

## SPECS

You can run `yarn populate-db` to reset your database (and remove the previously added comments).

On a page `/games/:game_slug`, display the comments for the current game or `No comments yet, add your own` if there are none.

On the same page, display a form with a Name input and a Comment `textarea`.

Your form should post comments in the route `/games/:game_slug/comments`.

You can use the `gameModel.addComment` method to add a comment to a game (look into how it's done 😉 while you're at it).

Once you added the comment, your route should redirect to the Game's page.

HINT: Beware that your `input`s have a `name` attribute.

HINT: Maybe look into `nl2br` in the `nunjucks` documentation.
