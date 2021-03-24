const controller = require("../controllers/item.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/itemRegistration/:username', controller.itemRegistration);

    app.get('/nearbyItems/:username/:zipcode', controller.getNearbyItems);

    app.get('/myItems/:username', controller.getItems);

    app.get('/itemDetails/:username/:item_name', controller.itemDetails);
};