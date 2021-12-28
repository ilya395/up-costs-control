const nodemailer = require("nodemailer");
const { EMAIL_LOGIN, EMAIL_PASSWORD, ERROR, SUCCESS } = require("../../../constants");

class EmailSendler {
  constructor() {
    this.instance = null;
  }

  async create() {
    this.instance = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_LOGIN,
        pass: EMAIL_PASSWORD,
      },
    })
  }

  async go(data) {
    const { email, subject, text, template } = data;
    let result = await this.instance.sendMail({
      from: `"Sendler" <${EMAIL_LOGIN}>`,
      to: email,
      subject: subject,
      text: text,
      html: template,
      attachments: [],
    });
    if (result) {
      return {status: SUCCESS, message: "Send Ok!"}
    } else {
      return {status: ERROR, message: "Can't Send :("}
    }
  }

  async send(data) {
    if (this.instance) {
      return await this.go(data);
    } else {
      await this.create();
      return await this.go(data);
    }
  }
}

module.exports = new EmailSendler();