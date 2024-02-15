
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';

interface ILinearProgressBar {
    socket: Socket;
    socketEndPoint: string;
    mode: string
}

const LinearProgressBar: React.FC<ILinearProgressBar> = (props) => {

    const { socket, socketEndPoint, mode } = props;

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        socket.on(socketEndPoint, async (data: any) => {
            setProgress(parseFloat(data))
        })
    }, [])

    return (
        <div style={{ width: "100%" }}>
            <LinearProgress
                determinate
                variant="outlined"
                color="neutral"
                size="sm"
                thickness={32}
                value={progress}
                sx={{
                    '--LinearProgress-radius': '0px',
                    '--LinearProgress-progressThickness': '24px',
                    boxShadow: 'sm',
                    borderColor: 'neutral.500',
                }}
            >
                <Typography
                    level="body-xs"
                    fontWeight="xl"
                    textColor="lightgreen"
                    sx={{ mixBlendMode: 'difference' }}
                >
                    {mode}… {`${Math.round(progress)}%`}
                </Typography>
            </LinearProgress>
        </div>
    );
};

export default LinearProgressBar

