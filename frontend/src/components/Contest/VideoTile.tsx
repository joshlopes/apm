import React from "react";
import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Contestant} from "../../types/contestant";
import { Link } from "react-router-dom";

interface VideoTileProp {
    contestant: Contestant
}

const VideoTile: React.FC<VideoTileProp> = ({contestant}) => {
    return (
        <Card>
            <Link to={`/show/${contestant.id}`}>
                <CardContent>
                    <CardMedia
                        component="img"
                        height="140"
                        image={'/assets/'+contestant.thumbnail_url}
                        alt={contestant.name}
                    />
                    <Typography variant="h6" noWrap>
                        {contestant.name}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    )
}

export default VideoTile;