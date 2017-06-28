var nodemailer = require('nodemailer');

exports.mailtouser = function(entity) {
	var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ndtnguyen9596@gmail.com',
            pass: 'Greengar9596'
            }
        });

    var mailOptions = {
        from: 'ndtnguyen9596@gmail.com',
        to: entity.email,
        subject: entity.subject,
        html: entity.htmltext
        };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });

}


