const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/signup",
        [
            verifySignUp.checkDuplicateEmailOrUsername
        ],
        controller.signup
    );

    app.post("/login", controller.login);

    app.post("/appliance-registration", controller.applianceRegistration);

    //UPDATE AN EXISTING USER PROFILE
    //app.put("/edit-profile")

    //DELETES A USER
    //app.post("/user/{userId}")
};