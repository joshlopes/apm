import * as React from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
                <BrowserRouter>
                    <Routes>
                        <Route index element={<ContestTable />} />
                        <Route path="/contest/:id" element={<ContestOverview />} />
                    </Routes>
                </BrowserRouter>
                <Copyright />
            </Box>
        </Container>
    );
}