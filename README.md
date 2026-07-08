# Session-Practice

## Steps to Implement Session in Our Project

### 1. Install the `express-session` package

```bash
npm install express-session
```

### 2. Import and set up the session middleware

`express-session` exports a function. Calling it with a config object returns
a middleware function, which we hook into the app using `app.use()`.

```javascript
const session = require("express-session");

// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false, // set to true in production (requires HTTPS)
    },
  }),
);
```

Once this is set up, Express attaches a `req.session` object to every
request. We can store any data on it — most commonly the logged-in user's ID.

### 3. Store the user ID in the session after signup/login

After a user signs up or logs in successfully, save their ID (never the full
user object, and never the password) into the session:

```javascript
const user = await User.create({ name, email, password });
req.session.user = user._id; // storing the user id into the session object
```

Storing only the ID keeps the session lightweight — fetch full user details
from the DB when needed using this ID.

### 4. Create a middleware to check if the user is logged in

Use this to protect routes like `/dashboard` that should only be accessible
to logged-in users.

```javascript
const isUserLoggedIn = function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login"); // stop execution here
  }
  next(); // user is logged in, continue to the route
};
```

Note the `return` before `res.redirect()` — without it, if any code is ever
added after this block by mistake, Express could try to send a second
response and crash with a `Cannot set headers after they are sent` error.

Apply it to protected routes:

```javascript
app.get("/dashboard", isUserLoggedIn, dashboardController);
```

### 5. Destroy the session and cookie on logout

```javascript
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Problem while logging out!" });
    }
    res.clearCookie("connect.sid"); // clears the session cookie from the browser
    res.json({ message: "Logout successful" });
  });
});
```

Use `POST` for logout, not `GET` — logout changes server state (destroys a
session), so it shouldn't be a plain navigable link that could be triggered
accidentally (e.g., by a browser prefetch or a bot crawling links).

---

## Summary

These are the basic steps to implement sessions in an Express application:

1. Install `express-session`
2. Configure and mount it as middleware
3. Store the user ID in `req.session.user` after signup/login
4. Protect routes with a login-check middleware
5. Destroy the session and clear the cookie on logout

## Further Reading

- [express-session official docs (npm)](https://www.npmjs.com/package/express-session)
- [Express.js official docs](https://expressjs.com/en/resources/middleware/session.html)
- [Sessions explained from scratch (Hindi) - ChatGPT conversation](https://chatgpt.com/share/6a4e0a5a-98ec-83ee-bf38-159d4236d10b)
