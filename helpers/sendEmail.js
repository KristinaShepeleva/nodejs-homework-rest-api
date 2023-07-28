const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "kristinashepe@meta.ua",
        pass: META_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

module.exports = transport;