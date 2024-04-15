import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import ReactPlayer from 'react-player';
import {useParams} from "react-router-dom";
import {useApi} from "../../context/ApiProvider";
import {Contestant} from "../../types/contestant";
import {Button, Card, CardContent, CircularProgress, Grid, Stack, Tooltip} from "@mui/material";
import {enqueueSnackbar} from "notistack";
import ShareComponent from "../Share/ShareComponent";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import DeleteIcon from '@mui/icons-material/Delete';

const ContestOverview: React.FC = () => {
    const api = useApi()
    const params = useParams();
    const id = params.id;
    const [contestant, setContestant] = React.useState<Contestant|undefined>();
    const [hasVoted, setHasVoted] = React.useState(localStorage.getItem(`vote${id}`) !== null);
    const [isVoting, setIsVoting] = React.useState(false);

    useEffect(() => {
        api?.get(`/contestants/${id}`)
            .then(response => {
                setContestant(response.body)
            })
            .catch(error => {
                enqueueSnackbar('Erro ao carregar concorrente!', {variant: 'error'})
                console.error(error)
            })
    }, [id, api]);

    const handleVote = () => {
        if (isVoting) return;

        setIsVoting(true);
        api?.post(`/contestants/${id}/vote`, {})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to vote')
                }
                localStorage.setItem(`vote${id}`, response.body.id);
                setHasVoted(true)
                setIsVoting(false);
                enqueueSnackbar('Gosto registado para validação, obrigado!', {variant: 'success'})
            })
            .catch(error => {
                console.error(error)
                setIsVoting(false);
                enqueueSnackbar('Erro ao registar gosto!', {variant: 'error'})
            })
    }

    const handleRemoveVote = () => {
        if (isVoting) return;

        const voteId = localStorage.getItem(`vote${id}`)
        if (!voteId) {
            enqueueSnackbar('Gosto não encontrado!', {variant: 'error'})
            return
        }

        setIsVoting(true);
        api?.post(`/contestants/${id}/vote/${voteId}/delete`, {})
            .then(response => {
                if (!response.ok) {
                    console.error(response)
                    throw new Error('Failed to remove vote')
                }

                localStorage.removeItem(`vote${id}`);
                setHasVoted(false)
                setIsVoting(false)
                enqueueSnackbar('Gosto removido com successo!', {variant: 'success'})
            })
            .catch(error => {
                console.error(error)
                setIsVoting(false)
                enqueueSnackbar('Erro ao remover gosto!', {variant: 'error'})
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
                                        <Grid item xs={6}>
                                            <ShareComponent />
                                        </Grid>
                                        <Grid item xs={6} container justifyContent="flex-end" textAlign={"right"}>
                                            <Grid item xs={12} md={6} container justifyContent="flex-end">
                                                <Tooltip
                                                    title={"Os gostos são verificados periodicamente, depois de validados manualmente."}>
                                                    <Stack>
                                                        <Typography variant={'h6'}><VerifiedIcon /><b>Gostos</b>: {contestant.verified_votes}</Typography>
                                                        <Typography variant={'subtitle2'}>(Actualizado: {new Date(contestant?.updated_at).toLocaleString('pt-PT').replace(', ', ' ')})</Typography>
                                                    </Stack>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
                                        <Grid item>
                                            {contestant && contestant.has_ended
                                                ? <Typography variant={'h6'} color={"error"}>Votação terminada!</Typography>
                                                : hasVoted
                                                    ? <Button onClick={handleRemoveVote} color={"error"} variant={"contained"} sx={{ fontSize: 'large', padding: '10px 20px' }} disabled={isVoting}>
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
                                                    : <Button onClick={handleVote} color={"success"} variant={"contained"} sx={{ fontSize: 'large', padding: '10px 20px' }} disabled={isVoting}>
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