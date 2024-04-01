import * as React from 'react';
import { Paper, Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ContestTable = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Sample data for each category
    const rowsA = [
        { id: 'A1', name: 'Joao', age: 25 },
        { id: 'A2', name: 'Luis', age: 30 },
        { id: 'A3', name: 'Duarte', age: 35 },
    ];
    const rowsB = [
        { id: 'B1', name: 'Mateus', age: 25 },
        { id: 'B2', name: 'Maria', age: 30 },
        { id: 'B3', name: 'Marlene', age: 35 },
    ];
    const rowsC = [
        { id: 'C1', name: 'Ricardo', age: 25 },
        { id: 'C2', name: 'Afonso', age: 30 },
        { id: 'C3', name: 'Miguel', age: 35 },
    ];
    const rowsD = [
        { id: 'D1', name: 'Catarina', age: 25 },
        { id: 'D2', name: 'Edmundo', age: 30 },
        { id: 'D3', name: 'Tiago', age: 35 },
    ];
    // Add similar data for categories B, C and D

    const createTable = (rows: any) => (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.age}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Paper sx={{ bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="Category A" />
                <Tab label="Category B" />
                <Tab label="Category C" />
                <Tab label="Category D" />
            </Tabs>
            <TabPanel value={value} index={0}>
                {createTable(rowsA)} {/* Table for Category A */}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {createTable(rowsB)} {/* Table for Category A */}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {createTable(rowsC)} {/* Table for Category A */}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {createTable(rowsD)} {/* Table for Category A */}
            </TabPanel>
            {/* Add similar TabPanels for categories B, C and D */}
        </Paper>
    );
};

export default ContestTable;