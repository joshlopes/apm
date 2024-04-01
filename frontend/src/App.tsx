import * as React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ContestTable from "./Contest/ContestTable";
import ContestOverview from "./Contest/ContestOverview";
import {Link} from "@mui/material";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.apm.pt/">
                APM
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

export default function App() {
    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    Concurso de votação
                </Typography>
                <ContestOverview />
                <Copyright />
            </Box>
        </Container>
    );
}