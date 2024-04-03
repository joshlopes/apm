import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: '#fff' }}>
                <Container>
                    <Toolbar sx={{ flexWrap: 'wrap' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link href="/">
                            <img src="/apm_logo_site.png" alt="Logo" height={75}/>
                        </Link>
                        <nav>
                            <Link href="/category/A"><Button color="inherit">Categoria A</Button></Link>
                            <Link href="/category/B"><Button color="inherit">Categoria B</Button></Link>
                            <Link href="/category/C"><Button color="inherit">Categoria C</Button></Link>
                            <Link href="/category/D"><Button color="inherit">Categoria D</Button></Link>
                        </nav>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}