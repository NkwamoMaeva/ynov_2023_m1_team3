const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorsHandling');
const config = require('./config');
const routes = require('./routes');
const mail = require('nodemailer');

const app = express();

// Configuration de Nodemailer
const transporter = mail.createTransport({
    host: 'smtp.gmail.com',  // Serveur SMTP de Gmail
    port: 587,
    secure: false,  
    auth: {
        user: 'mystoreynov@gmail.com',  
        pass: 'bkdjfkdfzuagoadl', 
    },
    logger: true,
    debug: true,
});

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// cors
app.use(
    cors(
        {
            origin: "*",
        },
    ),
);

//access to public folder
app.use(express.static(__dirname + '/public'));

// initial route
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to app-store-api application.' });
});

// Nouvelle route pour l'envoi d'e-mail
app.post('/api/send-email', async (req, res) => {
    try {
        console.log(req.body);

        const { to, subject, text } = req.body;

        if (!to || !subject || !text) {
            return res.status(400).send('Les champs to, subject et text sont requis.');
        }

        const mailOptions = {
            from: 'mystoreynov@gmail.com', 
            to: to,
            subject: subject,
            text: text,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('E-mail envoyé: %s', result.messageId);

        res.status(200).send('E-mail envoyé avec succès!');
    } catch (error) {
        console.log('Erreur lors de l\'envoi de l\'e-mail', error);
        res.status(500).send('Erreur lors de l\'envoi de l\'e-mail');
    }
});

// api routes prefix
app.use(
    '/api',
    routes,
);

// error handling
app.use(errorHandler);

// run server
app.listen(config.port, () => {
    console.log('server launch');
});

module.exports = app;
