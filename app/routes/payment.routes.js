const controller = require("../controllers/payment.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/newPaymentMethod/:username', controller.newPayment);

    app.get('/myPaymentMethods/:username', controller.getPaymentMethods);

    app.get('/paymentMethodDetails/:username/:card_no', controller.paymentMethodDetails);
};