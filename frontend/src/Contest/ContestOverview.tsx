import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReactPlayer from 'react-player';

declare global {
    interface Window {
        FB: any;
    }
}

const ContestOverview: React.FC = () => {
    const title = "Contest Title"; // Replace with your contest title
    const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with your video URL

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.fbAsyncInit = function() {
                window.FB.init({
                    appId      : '993858867377788',
                    xfbml      : true,
                    version    : 'v19.0',
                });
                window.FB.AppEvents.logPageView();
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s) as HTMLScriptElement;
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode?.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    }, []);

    return (
        <>
            <Box>
                <Typography typography={'h4'}>{title}</Typography>
                <ReactPlayer url={videoUrl}/>
                <div className="fb-like"
                     data-href={window.location.href}
                     data-width=""
                     data-layout="standard"
                     data-action="like"
                     data-size="large"
                     data-share="true"
                >
                </div>
            </Box>
        </>
    );
}

export default ContestOverview;