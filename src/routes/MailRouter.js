const express = require("express");
const router = express.Router();

const MailController = require("../controllers/MailController");

router.post('/send', MailController.sendMail)
router.get('/verify/:email/:token', MailController.verifyMail)

module.exports = router;