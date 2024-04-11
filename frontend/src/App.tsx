import * as React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ContestOverview from "./components/Contest/ContestOverview";
import {Grid, Link} from "@mui/material";
import Feed from "./components/Contest/Feed";
import ButtonAppBar from "./StickBar";
import Announcement from "./components/Share/Announcement";

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
            <BrowserRouter>
                <Box sx={{ bgcolor: 'background.default', pb: 2 }}>
                    <ButtonAppBar />
                    <Container>
                        <Box sx={{ my: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Announcement>
                                        <>
                                            <Typography paragraph={true}>
                                                O concurso “Brincando com a Matemática” foi alvo de dois tipos de manipulação que afetaram alguns vídeos:
                                            </Typography>
                                            <Typography>
                                                1 - eliminação de votos de alguns candidatos;
                                            </Typography>
                                            <Typography paragraph={true}>
                                                2 - votação em massa no mesmo vídeo (SPAM);
                                            </Typography>
                                            <Typography paragraph={true}>
                                                Desde que tal foi detetado, a partir da tarde do dia 06 de abril, a APM procurou de imediato resolver a situação. Apesar de não ter sido possível reverter o impacto do primeiro tipo de manipulação, foi possível impedir que o mesmo continuasse. Em relação ao segundo tipo de manipulação, os votos fraudulentos têm desde então sido removidos periodicamente, criando oscilações no número de votos que aparece no vídeo. Para evitar estas oscilações, passaremos a atualizar o número total de votos apenas após terem sido manualmente validados (controlo de SPAM). Desta forma, ao votar num vídeo, não verá a atualização instantânea do número de votos.
                                            </Typography>
                                            <Typography paragraph={true}>
                                                Estes comportamentos lamentáveis e eticamente incorretos, num concurso criado para valorizar o trabalho de crianças e jovens, no âmbito da Matemática, não nos impedirão de cumprir a nossa missão e garantir uma votação justa.
                                            </Typography>
                                            <Typography paragraph={true}>
                                                Eventuais questões/dúvidas devem ser comunicadas através do email do concurso: <a href="mailto:dim314@apm.pt" target="_blank" style={{"color": "#fff"}}>dim314@apm.pt</a>
                                            </Typography>
                                        </>
                                    </Announcement>
                                </Grid>
                            </Grid>
                            <Routes>
                                <Route index element={<Feed />} />
                                <Route path="/category" element={<Feed />} />
                                <Route path="/category/:category" element={<Feed />} />
                                <Route path="/show/:id" element={<ContestOverview />} />
                            </Routes>
                        </Box>
                    </Container>
                </Box>
                <Box>
                    <Copyright />
                </Box>
            </BrowserRouter>
        </>
    );
}