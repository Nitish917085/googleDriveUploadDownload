import { useEffect, useState } from 'react'
import './App.css'
import { Socket, io } from 'socket.io-client'
import LinearProgressBar from './components/LinearProgressBar'
import CircularProgress from '@mui/joy/CircularProgress';

const baseUrl = import.meta.env.VITE_SERVERURL

let socket: any;

function App() {

  const [link, setLink] = useState<string>("")
  const [socketState, setSocketState] = useState<Socket>(socket)
  const [isProgress, setIsProgress] = useState<boolean>(false)

  const download = async () => {
    setIsProgress(true)
    socket.emit("download", link)
  }

  useEffect(() => {

    socket = io(baseUrl)
    setSocketState(socket)

    socket.on("error", async () => {
      setIsProgress(false)
      alert("Something went wrong, please try again")
    })

    socket.on("sucess", async () => {
      setIsProgress(false)
      alert("Successfully uploaded")
    })

    socket.on("invalidlink", async () => {
      setIsProgress(false)
      alert("Invalid Link or link in private")
    })

  }, [])


  return (
    <>
      <div className='appContainer'>
        <div className='inputContainer'>

          <input className='inputLink' type='text' placeholder='enter google drive link' value={link} onChange={(e) => setLink(e.target.value)} />
          {isProgress ?
            <button className='downloadButton'> <CircularProgress sx={{
              "--CircularProgress-size": "17px",
              "--CircularProgress-trackThickness": "1px",
              "--CircularProgress-progressThickness": "2px"
            }} />
            </button> :
            <button className='downloadButton' onClick={download}>Download</button>}
        </div>

        <div className='progressStatus'>
          <div className='progressBar'>
            Download % :
            <div>
              {socketState && <LinearProgressBar socket={socketState} socketEndPoint="downloadProgress" mode='Downloaded' />}
            </div>
          </div>

          <div className='progressBar'>
            Upload % :
            <div>
              {socketState && <LinearProgressBar socket={socketState} socketEndPoint="uploadProgress" mode='Uploaded' />}
            </div>
          </div>
        </div>

        <a className='googlDriveContainer' href="https://drive.google.com/drive/folders/1rN2u19M0yTJWzIiKRZ3g7CC6N9-3CJxj?usp=sharing" target="_blank" rel="noopener noreferrer">Google Drive <img src='googleDriveIcon.webp' /></a>

      </div>
    </>
  )
}

export default App
