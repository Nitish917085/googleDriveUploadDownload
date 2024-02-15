# googleDriveUploadDownload


This project consists of two main parts: the client, which is a React.js project, and the server, which is a Node.js project.

## Server

To set up and run the server:

1. Navigate to the server directory.
2. Install the dependencies using `npm install`.
3. Set the environment variable (you will need to provide this).

    `CLIENT_ID = 'abc'`
    `CLIENT_SECRET = 'yggunhfrtgy8nj'`
    `REDIRECT_URL = 'https://developers.google.com/oauthplayground'`
    `REFERSH_TOKEN = 'dfghjyu6yjkl'`

4. The server requires some API keys(mensioned in environment variables) from Google Cloud. For security reasons, these are not provided in the repository.   You will need to obtain and provide these yourself.
5. You also need to pass the cors domain (you will need to provide this).
6. Run the server. `npm run dev`

## Client

To set up and run the client:

1. Navigate to the client directory.
2. Install the dependencies using `npm install`.  
3. Set the base URL environment variable (you will need to provide this).
    `VITE_SERVERURL = 'http://127.0.0.1:5000'`
4. Run the client.`npm run dev`

I have provided google drive link on website , you can access the uploaded videos.
