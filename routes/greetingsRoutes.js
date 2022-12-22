const greetings = require("../controllers/greetingsController.js")

module.exports = (app) => {
    app.route('/greetings')
                .get(greetings.getAll)
                .post(greetings.create)
    app.route('/widgets/:id')
                .get(greetings.getById)
                .put(greetings.update)
                .delete(greetings.delete)
}