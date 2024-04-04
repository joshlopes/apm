import React, {useEffect} from "react";
import {useApi} from "../../context/ApiProvider";
import {Grid} from "@mui/material";
import {Contestant} from "../../types/contestant";
import VideoTile from "./VideoTile";
import Typography from "@mui/material/Typography";
import {enqueueSnackbar} from "notistack";
import {useParams} from "react-router-dom";

const Feed: React.FC = () => {
    const category = useParams()['category']
    const api = useApi()
    const [contestants, setContestants] = React.useState<Contestant[]>([]);

    useEffect(() => {
        api?.get(`/contestants${category ? `/?category=${category}`:  ''}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch contestants')
                }

                setContestants(response.body.results ?? [])
            })
            .catch(error => {
                enqueueSnackbar('Failed to fetch contestants', {variant: 'error'})
                setContestants([])
                console.error(error)
            })
    }, [api, category]);

    return (
        <>
            <Typography typography={'h4'} p={2}>{ category ? `Categoria ${category}` : `Participantes`}</Typography>
            <Grid container spacing={3}>
                {contestants.map((contestant) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={contestant.id}>
                        <VideoTile contestant={contestant}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Feed;