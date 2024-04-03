import React from "react";
import {Card, CardContent, CardMedia, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Contestant} from "../../types/contestant";
import ReactPlayer from "react-player";

interface VideoTileProp {
    contestant: Contestant
}

const VideoTile: React.FC<VideoTileProp> = ({contestant}) => {
    return (
        <Card>
            <CardContent>
                <ReactPlayer
                    url={'/assets/'+contestant.video_url}
                    width='100%'
                    height='100%'
                />
                <Typography variant="h6" noWrap>
                    <Link href={`/show/${contestant.id}`}>{contestant.name}</Link>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default VideoTile;