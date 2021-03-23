const controller = require("../controllers/appliance.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/applianceRegistration/:username', controller.applianceRegistration);

    app.get('/nearbyAppliances/:username/:zipcode', controller.getNearbyAppliances);

    app.get('/myAppliances/:username', controller.getAppliances);

    app.get('/applianceDetails/:username/:appliance_name', controller.applianceDetails);
};