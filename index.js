const express = require('express');
const bodyparser = require('body-parser');
const port = process.env.PORT || 9900;
const app = express();
const nodemailer = require("nodemailer");


const cors = require('cors')
app.use(bodyparser.json());
app.use(bodyparser.text());
app.use(cors());

app.get('/messages', (req, res) => {
    res.send('hello');
})

app.post('/messages', cors(), async(req, res) => {
    var obj = JSON.parse(req.body);
    var question = obj.question;
    var message = obj.message;
    var email = obj.email;
    console.log(JSON.parse(req.body));
    console.log("q : " + question);
    console.log("e : " + email);
    console.log("m : " + message);
    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "XXXX",
            port: 26,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'contact@getintohome.store', // generated ethereal user
                pass: 'XXXX', // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'contact@getintohome.store', // sender address
            to: "mobarakaziz9@gmail.com", // list of receivers
            subject: "about : " + question + "", // Subject line
            text: "from " + email + "\n" + "Message : " + message + "", // plain text body
            //html: "<b>Hello world?</b>", // html body
        }, );

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


        res.json({ status: 'OK' });
    } catch {
        res.json({ status: "error" });
    }
});


app.listen(port, () => {
    console.log(port);
})