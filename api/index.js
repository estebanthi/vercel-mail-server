const app = require('express')();
const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

import cors from "cors";
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.get('/api', (req, res) => {
  res.end("Hello World!");
});

app.options('/api', cors());

app.post('/api',  cors(), async (req, res) => {

  const body = req.body;

  if (!body) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  const { to, subject, text } = body;
  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
  };

  console.log('Sending email:', mailOptions);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'An error occurred while sending the email.' });
  }
});

module.exports = app;