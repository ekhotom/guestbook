# Guestbook

Node.js, express and ejs practice

Routes "/", "/guestbook" and "/delete" (and "/newmessage")

Head, footer and navi partials included on the pages

User may see guestbook posts made by other users and has a chance to leave a message themselves. If left completely empty, prompts error message but even filling one will send an incomplete push(). Ideally the "country" choice would suggest countries based on characters in the input so far.

Guestbook messages are located and read from a local .json file.

Guestbook message .json file's "country" is compared to another .json file that has names and flags of every nation in the world
so that urls with the flags can be used. The .json file is from restcountries.eu, so ideally the site would make a call to the
REST API instead of a local .json file.

User can delete guestbook messages/posts from the "/delete" route by choosing the message id.
