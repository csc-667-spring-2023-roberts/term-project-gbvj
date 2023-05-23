const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../db/users");

const router = express.Router();

const SALT_ROUNDS = 10;

router.get("/signUp", (_request, response) => {
  response.render("signUp", { title: "Jrob's Term Project" });
});

// This code is used to register a new user.
// The user will enter a username, email, and password.
// The password will be hashed and salted.
// The username and email will be checked to see if they already exist in the database.
// If they do exist, an error will be returned and the user will be asked to try again.
// If they do not exist, the new user will be added to the database, and the user will be redirected to the home page.

router.post("/signUp", async (request, response) => {
  const { username, email, password } = request.body;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  try {
    const {
      idUserName,
      emailUserName,
      password: hashedPasswordUserName,
    } = await Users.findByUsername(username);
    const {
      idEmail,
      emailEmail,
      password: hashedPasswordEmail,
    } = await Users.findByEmail(username);
    const userId = await Users.create(username, email, hash);
    request.session.user = userId;

    console.log(`userId: ${userId}`); // prints the id of the newly created user
    response.redirect("/");
  } catch (error) {
    console.log({ error });
    response.render("signup", {
      title: "Jrob's Term Project",
      username,
      email,
      error: "An error occurred. Please try again.",
    });
  }
});

router.get("/login", (_request, response) => {
  response.render("login", { title: "Uno Game (Login)" });
});

router.post("/login", async (request, response) => {
  const { username, password } = request.body;

  try {
    const {
      id,
      email,
      password: hashedPassword,
    } = await Users.findByUsername(username);

    // Compare the provided password with the hashed password in the database
    bcrypt
      .compare(password, hashedPassword.trim())
      .then((isValidUser) => {
        if (isValidUser) {
          request.session.regenerate(function (err) {
            if (err) next(err);

            // store user information in session, typically a user id
            request.session.user = {
              id,
              username,
              email,
            };

            // save the session before redirection to ensure page
            // load does not happen before session is saved
            request.session.save(function (err) {
              if (err) return next(err);
              response.redirect("/");
            });
          });
        } else {
          console.log("Invalid username or password");
          // If the passwords did not match, render the login page again with an error message
          response.render("login", {
            title: "Uno Game (Login)",
            username,
            error: "Invalid username or password.",
          });
        }
      })
      .catch((error) => {
        // Catch any errors that occurred while comparing the passwords
        console.log({ error });
        response.render("login", {
          title: "Uno Game (Login)",
          username,
          error: "An error occurred. Please try again.",
        });
      });
  } catch (error) {
    // Catch any errors that occurred while trying to find the user
    console.log({ error });
    response.render("login", {
      title: "Uno Game (Login)",
      username,
      error: "An error occurred. Please try again.",
    });
  }
});

router.get("/logout", (request, response) => {
  request.session.destroy((error) => {
    console.log({ error });
  });

  response.redirect("/");
});

module.exports = router;
