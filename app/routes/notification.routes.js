const controller = require("../controllers/notification.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/newNotification/:username', controller.newNotification);
    app.get('/notifications/:username', controller.getNotifications);
};