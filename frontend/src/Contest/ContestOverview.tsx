import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

declare global {
    interface Window {
        FB: any;
    }
}

const ContestOverview = () => {
    const [ReactPlayer, setReactPlayer] = useState<any>(null);
    const title = "Contest Title"; // Replace with your contest title
    const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with your video URL

    useEffect(() => {
        import('react-player').then(({ default: ReactPlayer }) => {
            setReactPlayer(() => ReactPlayer);
        });
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Load the Facebook SDK
            (function(d, s, id) {
                var js: HTMLScriptElement, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s) as HTMLScriptElement; js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0";
                if (fjs.parentNode) {
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, 'script', 'facebook-jssdk'));
        }
    }, []);

    return (
        <Box>
            <Typography typography={'h4'}>{title}</Typography>
        </Box>
    );
}

export default ContestOverview;