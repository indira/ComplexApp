const User = require("../models/User")

exports.login = function (req, res) {
  let user = new User(req.body)
  //leveraging the promise that we created in the User.js login function
  user
    .login()
    .then(function (result) {
      req.session.user = { username: user.data.username }
      res.send(result)
    })
    .catch(function (e) {
      res.send(e)
    })
}

exports.logout = function () {}

exports.register = function (req, res) {
  let user = new User(req.body)
  user.register()
  if (user.errors.length) {
    res.send(user.errors)
  } else {
    res.send("Congrats, there are no errors.")
  }
}

exports.home = function (req, res) {
  if (req.session.user) {
    res.send("Welcome to the actual application!")
  } else {
    res.render("home-guest")
  }
}
