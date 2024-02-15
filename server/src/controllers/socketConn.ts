const { googleDriveConfig } = require("../config/config");

function extractFileId(url: string) {
    const match = url.match(/file\/d\/(.*?)\//);
    return match ? match[1] : null;
}

export const downloadSocket = async (socket: any, io: any) => {

    socket.on('download', async (driveLink: any) => {
        try {
            const drive = googleDriveConfig()
            const fileId = extractFileId(driveLink)

            if (!fileId) return socket.emit("invalidlink")

            let downloadProgress = 0;

            try {

                const { data: { size: fileSizeInBytes, name: fileName, mimeType: mimeType } } = await drive.files.get({ fileId: fileId, fields: 'size, name, mimeType' });

                const download = await drive.files.get(
                    { fileId: fileId, alt: 'media' },
                    { responseType: 'stream' }
                );

                download.data.on('data', (chunk: any) => {
                    downloadProgress += chunk.length;
                    let progress = (downloadProgress / fileSizeInBytes) * 100
                    socket.emit('downloadProgress', progress)
                });

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

