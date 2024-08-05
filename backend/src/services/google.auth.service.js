const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const GoogleAuth = async () => {

    const oauth2Client = new OAuth2({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.CALLBACK_URL,
    })

    return oauth2Client;
}

const GenerateURL = async (state) => {
    const scopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']

    const OAuth2Client = await GoogleAuth();

    const authorizationUrl = OAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true,
        prompt: 'consent',
    })

    return authorizationUrl;
}

module.exports = {
    GoogleAuth,
    GenerateURL
};