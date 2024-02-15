const { googleDriveConfig } = require("../config/config");

//extract id of gdrive link
function extractFileId(url: string) {
    const match = url.match(/file\/d\/(.*?)\//);
    return match ? match[1] : null;
}

export const downloadSocket = async (socket: any, io: any) => {

    socket.on('download', async (driveLink: any) => {
        try {
            //gdrive configurations
            const drive = googleDriveConfig()       
            const fileId = extractFileId(driveLink)

            //if fileid is null emits invalidlink event
            if (!fileId) return socket.emit("invalidlink")

            let downloadProgress = 0;

            try {

                const { data: { size: fileSizeInBytes, name: fileName, mimeType: mimeType } } = await drive.files.get({ fileId: fileId, fields: 'size, name, mimeType' });

                const download = await drive.files.get(
                    { fileId: fileId, alt: 'media' },
                    { responseType: 'stream' }
                );

                // track the progress of download file from gdrive
                download.data.on('data', (chunk: any) => {
                    downloadProgress += chunk.length;
                    let progress = (downloadProgress / fileSizeInBytes) * 100
                    socket.emit('downloadProgress', progress)
                });

                // upload to my google drive
                const upload = await drive.files.create(
                    {
                        requestBody: {
                            name: fileName,
                            mimeType: mimeType,
                            parents: ['1rN2u19M0yTJWzIiKRZ3g7CC6N9-3CJxj']
                        },
                        media: {
                            body: download.data
                        }
                    },
                    {
                        // track the progress of upload file to my gdrive
                        onUploadProgress: (evt: any) => {
                            const progress = (evt.bytesRead / fileSizeInBytes) * 100;
                            socket.emit("uploadProgress", progress)
                        }
                    }
                );

                socket.emit("sucess", upload.data)
                return
            } catch (err) {
                console.log(err)
                socket.emit("invalidlink")
                return
            }
        }
        catch (err) {
            console.log(err)
            socket.emit("error")
            return
        }
    })
}

