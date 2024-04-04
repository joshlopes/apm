import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import {Grid, Stack, useMediaQuery, useTheme} from '@mui/material';

export default function ButtonAppBar() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const logoHeight = isSmallScreen ? 60 : 75;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: '#fff' }}>
                <Container>
                    <Toolbar sx={{ flexWrap: 'wrap' }}>
                        <Grid container justifyContent="center" alignItems="center" paddingTop={1}>
                            <Grid item xs={12} sm={6}>
                                <Link to="/">
                                    <img src="/apm_logo_site.png" alt="Logo" height={logoHeight}/>
                                    <img src="/dim_apm_logo.png" alt="Logo" height={logoHeight}/>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack direction={"row"}>
                                    <Link to="/category/A"><Button color="inherit">Categoria A</Button></Link>
                                    <Link to="/category/B"><Button color="inherit">Categoria B</Button></Link>
                                    <Link to="/category/C"><Button color="inherit">Categoria C</Button></Link>
                                    <Link to="/category/D"><Button color="inherit">Categoria D</Button></Link>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}