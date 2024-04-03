import * as React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ContestOverview from "./components/Contest/ContestOverview";
import {Link} from "@mui/material";
import Feed from "./components/Contest/Feed";
import ButtonAppBar from "./StickBar";

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
        <>
            <Box sx={{ bgcolor: 'background.default', pb: 2 }}>
                <ButtonAppBar />
                <Container>
                    <Box sx={{ my: 4 }}>
                        <BrowserRouter>
                            <Routes>
                                <Route index element={<Feed />} />
                                <Route path="/category/:category" element={<Feed />} />
                                <Route path="/show/:id" element={<ContestOverview />} />
                            </Routes>
                        </BrowserRouter>
                    </Box>
                </Container>
            </Box>
            <Box>
                <Copyright />
            </Box>
        </>
    );
}