import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import ReactPlayer from 'react-player';
import {useParams} from "react-router-dom";
import {useApi} from "../../context/ApiProvider";
import {Contestant} from "../../types/contestant";
import {Button, Card, CardContent, CircularProgress, Grid} from "@mui/material";
import {enqueueSnackbar} from "notistack";
import ShareComponent from "../Share/ShareComponent";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import {useUserStore} from "../../stores/useUserStore";

const ContestOverview: React.FC = () => {
    const { getIp } = useUserStore();
    const api = useApi()
    const params = useParams();
    const id = params.id;
    const [contestant, setContestant] = React.useState<Contestant|undefined>();
    const [hasVoted, setHasVoted] = React.useState(localStorage.getItem(`vote${id}`) !== null);
    const [ip, setIp] = React.useState('');
    const [isVoting, setIsVoting] = React.useState(true);

    useEffect(() => {
        getIp().then(ip => setIp(ip));

        api?.get(`/contestants/${id}`)
            .then(response => {
                setContestant(response.body)
            })
            .catch(error => {
                enqueueSnackbar('Erro ao carregar concorrente!', {variant: 'error'})
                console.error(error)
            })
    }, [id, api, getIp]);

    const handleVote = () => {
        if (isVoting) return;

        setIsVoting(true);
        api?.post(`/contestants/${id}/vote`, {ip: ip})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to vote')
                }
                localStorage.setItem(`vote${id}`, response.body.id);
                setHasVoted(true)
                setIsVoting(false);
                enqueueSnackbar('Voto registado com successo!', {variant: 'success'})
                if (contestant) {
                    setContestant({...contestant, votes: contestant.votes + 1});
                }
            })
            .catch(error => {
                console.error(error)
                setIsVoting(false);
                enqueueSnackbar('Erro ao registar voto!', {variant: 'error'})
            })
    }

    const handleRemoveVote = () => {
        if (isVoting) return;

        const voteId = localStorage.getItem(`vote${id}`)
        if (!voteId) {
            enqueueSnackbar('Voto não encontrado!', {variant: 'error'})
            return
        }

        setIsVoting(true);
        api?.delete(`/contestants/${id}/vote/${voteId}`)
            .then(response => {
                if (!response.ok) {
                    console.error(response)
                    throw new Error('Failed to remove vote')
                }

                localStorage.removeItem(`vote${id}`);
                setHasVoted(false)
                setIsVoting(false)
                enqueueSnackbar('Voto removido com successo!', {variant: 'success'})

                if (contestant) {
                    setContestant({...contestant, votes: contestant.votes - 1});
                }
            })
            .catch(error => {
                console.error(error)
                setIsVoting(false)
                enqueueSnackbar('Erro ao remover voto!', {variant: 'error'})
            })
    }

    return (
        <>
            {contestant === undefined
                ? <Typography>A carregar...</Typography>
                :
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={10}>
                            <Typography variant={'h4'} p={2}>{contestant.name}</Typography>
                            <Card>
                                <CardContent>
                                    <ReactPlayer
                                        url={'/assets/'+contestant.video_url}
                                        controls={true}
                                        width='100%'
                                        height='100%'
                                    />
                                    <Grid container p={1}>
                                        <Grid item xs={12} md={6}>
                                            <ShareComponent />
                                        </Grid>
                                        <Grid item xs={12} md={6} container justifyContent="flex-end">
                                            <Typography variant={'h6'}><b>Gostos</b>: {contestant.votes}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
                                        <Grid item>
                                            {hasVoted ?
                                                <Button onClick={handleRemoveVote} color={"error"} variant={"contained"} sx={{ fontSize: 'large', padding: '10px 20px' }} disabled={isVoting}>
                                                    {isVoting
                                                        ? <>
                                                            <CircularProgress size={24} sx={{ mr: 1 }} />
                                                            A retirar gosto...
                                                        </>
                                                        : <>
                                                            <DeleteIcon sx={{ mr: 1 }} />
                                                            Retirar Gosto
                                                        </>}
                                                </Button>
                                                :
                                                <Button onClick={handleVote} color={"success"} variant={"contained"} sx={{ fontSize: 'large', padding: '10px 20px' }} disabled={isVoting}>
                                                    {isVoting
                                                        ? <>
                                                            <CircularProgress size={24} sx={{ mr: 1 }} />
                                                            A enviar...
                                                        </>
                                                        : <>
                                                            <ThumbUpAltIcon sx={{ mr: 1 }} />
                                                            Gosto
                                                        </>}
                                                </Button>
                                            }
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
            }
        </>
    );
}

export default ContestOverview;