const { google } = require('googleapis');
require("dotenv").config()

const CLIENT_ID: string = process.env.CLIENT_ID as string
const CLIENT_SECRET: string = process.env.CLIENT_SECRET as string
const REDIRECT_URL = process.env.REDIRECT_URL as string
const REFERSH_TOKEN = process.env.REFERSH_TOKEN as string


const googleDriveConfig = () => {

    const googleOAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URL
    )

    googleOAuth2Client.setCredentials({ refresh_token: REFERSH_TOKEN })

    // Initialize Google Drive API
    const drive = google.drive({
        version: 'v3',
        auth: googleOAuth2Client
    });

    return drive;
}

export { googleDriveConfig }