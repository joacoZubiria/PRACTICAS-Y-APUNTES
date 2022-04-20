const {google} = require('googleapis');
const nodemailer = require('nodemailer');

const CLIENT_ID = '514262896350-1hadmvoht4uj5nh7jn3ggvtumbbsdva5.apps.googleusercontent.com',
 CLIENT_SECRET = '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',
 REDIRECT_URI = 'https://developers.google.com/oauthplayground',
 REFRESH_TOKEN = '1//04N2EarQUcJb1CgYIARAAGAQSNwF-L9IrFZYKFAfo65_f93z8PqKSNGygTD7MiRinuMTChjUsus-8s-Em5kQLMeDZtnDVYeOLz9s',
 ACCESS_TOKEN = 'ya29.A0ARrdaM82XI5rCs9ujgjDx2LNdjfLT0Z_Qi8HlLlmP7Z5S3ZpIGduxQbEyeTidpKcvTbHvOh44lcWhed8T-yD3RTXmkWVsnCcgMmLUr61ZN2s2AwWCxwzPHCFqdN9ZCZ1q92Pa_3R-9dXB5Z4BvOXLOXXQsOj'
 oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'joaquinzubiriamansilla@gmail.com',
        clientId: CLIENT_ID,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN
    }
});

module.exports = {oAuth2Client, transport};