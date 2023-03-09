const express = require("express")
const router = express.Router()
const userController = require("./controllers/userController")

router.get("/", userController.home)
router.post("/register", userController.register)
/*
First add the POST request to the form which is /login in home-guest.ejs
Step:1: setting the route to match the (/login url) the login in route.js file.
Step:2: In the userController.js file create the function login
Step:3: Using the user model from (User.js) create an object user in the userController.js file
Step:4:  Pass the form data as req.body to the user object.
          let user = new User(req.body)
          user.login()
Step:5: Create the login function in the use model in the User.js file
          User.prototype.login = function(){
            this.cleanUp()
            usersCollection.findOne({username:this.data.username})
          }
Step:6: 
*/
router.post("/login", userController.login)

module.exports = router
