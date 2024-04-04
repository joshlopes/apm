import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: '#fff' }}>
                <Container>
                    <Toolbar sx={{ flexWrap: 'wrap' }}>
                        <Link to="/">
                            <img src="/apm_logo_site.png" alt="Logo" height={75}/>
                            <img src="/dim_apm_logo.png" alt="Logo" height={70}/>
                        </Link>
                        <nav>
                            <Link to="/category/A"><Button color="inherit">Categoria A</Button></Link>
                            <Link to="/category/B"><Button color="inherit">Categoria B</Button></Link>
                            <Link to="/category/C"><Button color="inherit">Categoria C</Button></Link>
                            <Link to="/category/D"><Button color="inherit">Categoria D</Button></Link>
                        </nav>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}