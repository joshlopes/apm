import React from 'react';
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    EmailShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon,
    EmailIcon,
} from 'react-share';
import {Grid, IconButton} from '@mui/material';
import {enqueueSnackbar} from "notistack";
import FileCopyOutlinedIcon from '@mui/icons-material/Link';

const CopyLinkButton = () => {
    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                enqueueSnackbar('Link copiado!', {variant: 'success'})
            })
            .catch(() => {
                enqueueSnackbar('Falhou ao copiar o link!', {variant: 'error'})
            });
    }

    return (
        <IconButton onClick={handleCopy} size={"small"}>
            <FileCopyOutlinedIcon fontSize="medium" />
        </IconButton>
    );
}

const ShareComponent = () => {
    const url = 'https://your-website.com'; // Replace with the URL you want to share

    return (
        <Grid container spacing={2}>
            <Grid item>
                <FacebookShareButton url={url}>
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
            </Grid>

            <Grid item>
                <WhatsappShareButton url={url}>
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
            </Grid>

            <Grid item>
                <TwitterShareButton url={url}>
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
            </Grid>

            <Grid item>
                <EmailShareButton url={url}>
                    <EmailIcon size={32} round={true} />
                </EmailShareButton>
            </Grid>

            <Grid item>
                <CopyLinkButton />
            </Grid>
        </Grid>
    );
}

export default ShareComponent;