// Setup server, session and middleware here.

/*
Middlewares
You will have the following middleware functions:

1. This middleware will apply to the root route / (note, a middleware applying to the root route is the same as a middleware that fires for every request) and will do one of the following:
This middleware will log to your console for every request made to the server, with the following information:
Current Timestamp: new Date().toUTCString()
Request Method: req.method
Request Path: req.path
Some string/boolean stating if a member is authenticated
If logged in, the member's status (manager or member)
    There is no precise format you must follow for this. The only requirement is that it logs the data stated above.

     An example would be:

    [Sun, 14 Apr 2019 23:56:06 GMT]: GET / (Non-Authenticated)

    [Sun, 14 Apr 2019 23:56:14 GMT]: POST /signin (Non-Authenticated)

    [Sun, 14 Apr 2019 23:56:19 GMT]: GET /member (Authenticated Manager)

    [Sun, 14 Apr 2019 23:56:44 GMT]: GET / (Authenticated Member)

Then call next

2. This middleware will only be used for the GET /signin route and will do one of the following:
     A. If the member is authenticated AND they have a membershipLevel of manager, the middleware function will redirect them to the /manager route,
     B. If the member is authenticated AND they have a membershipLevel of member, you will redirect them to the /member route.
     C. If the member is NOT authenticated, you will allow them to get through to the GET /signin route. A logged in member should never be able to access the sign in form.

3. This middleware will only be used for the GET /register route and will do one of the following:
     A. If the member is authenticated AND they have a membershipLevel of manager, the middleware function will redirect them to the /manager route,
     B. If the member is authenticated AND they have a membershipLevel of member, you will redirect them to the /member route.
     C. If the member is NOT authenticated, you will allow them to get through to the GET /register route. A logged in member should never be able to access the registration form.

4. This middleware will only be used for the GET /member route and will do one of the following:
     A. If a member is not logged in, you will redirect to the GET /signin route.
     B. If the member is logged in, the middleware will "fall through" to the next route calling the next() callback. (Members with both membershipLevels manager or member should be able to access the /member route, so you simply need to make sure they are authenticated in this middleware.)

5. This middleware will only be used for the GET /manager route and will do one of the following:
    A. If a member is not logged in, you will redirect to the GET /signin route.
    B. If a member is logged in, but they are not a manager, you end the response right in the middleware function and render a HTML error page saying that the member does not have permission to view the page, and the page must issue an HTTP status code of 403. (provide a link to the /member page, since they are logged in, just not a manager)
    C. If the member is logged in AND the member has a membershipLevel of manager, the middleware will "fall through" to the next route calling the next() callback.
 ONLY MEMBERS WITH A MEMBERSHIPLEVEL of manager SHOULD BE ABLE TO ACCESS THE /manager ROUTE!

6. This middleware will only be used for the GET /signout route and will do one of the following:
     If a member is not logged in, you will redirect to the GET /signin route.
     If the member is logged in, the middleware will "fall through" to the next route calling the next() callback.

Using express-session:
Your cookie name MUST be ClubAuthState.

Example:
app.use(session({
  name: 'ClubAuthState',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: false
}));
*/
