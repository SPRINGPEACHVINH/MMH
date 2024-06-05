const UserRouter = require('./UserRouter');
const MailRouter = require('./MailRouter');

const routes = (app) => {
    app.use("/api/user", UserRouter);
    app.use("/api/mail", MailRouter);
}

module.exports = routes;