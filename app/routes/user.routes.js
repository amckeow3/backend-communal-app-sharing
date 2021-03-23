const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/main", controller.allAccess);

  app.get("/homepage", [authJwt.verifyToken], controller.userHome);

  app.get("/user/:username", controller.getUser);

  app.delete("/user/:username", controller.deleteUser);

  app.put("/updateEmail/:username", controller.updateEmail);
  app.put("/updateFirstName/:username", controller.updateFirstName);
  app.put("/updateLastName/:username", controller.updateLastName);
  app.put("/updateZipcode/:username", controller.updateZipcode);
  app.put("/updateAddress/:username", controller.updateAddress);
  app.put("/updatePhone/:username", controller.updatePhone);
}