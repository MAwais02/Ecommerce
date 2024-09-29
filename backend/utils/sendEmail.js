const nodemailer = require("nodemailer");


const sendEmail = async (options) => {
    const transpoter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        service : process.env.SERVICE,
        auth : {
            user : process.env.MAIL,
            pass : "lotg eltb gsnp lgey",
        }
    })

    const mailOptions = {
        from : process.env.MAIL,
        to :options.email,
        subject : options.subject,
        text : options.message,
    }

    await transpoter.sendMail(mailOptions);
}

module.exports = sendEmail;