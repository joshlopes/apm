import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnnouncementIcon from '@mui/icons-material/Announcement';

interface AnnouncementProps {
    message: string;
}

const Announcement: React.FC<AnnouncementProps> = ({ message }) => {
    return (
        <Accordion sx={{ bgcolor: 'info.main', color: 'common.white', boxSizing: 'border-box'}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: 'common.white'}}/>}
            >
                <Typography>
                    <AnnouncementIcon fontSize={"small"} />
                    &nbsp;Comunicação
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {message}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default Announcement;