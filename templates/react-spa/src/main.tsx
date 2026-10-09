import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Link,Route,Routes} from 'react-router-dom';
import {Box,Button,CssBaseline,ThemeProvider,Typography,createTheme} from '@mui/material';
const theme=createTheme();
function HomePage(){return <Box component="main" sx={{p:3}}><Typography variant="h4">Home</Typography><Button component={Link} to="/items">Items</Button></Box>}
function ItemsPage(){return <Box component="main" sx={{p:3}}><Typography variant="h4">Items</Typography><Button component={Link} to="/">Home</Button></Box>}
function NotFoundPage(){return <Box component="main" sx={{p:3}}><Typography variant="h4">Not found</Typography><Button component={Link} to="/">Home</Button></Box>}
function App(){return <ThemeProvider theme={theme}><CssBaseline/><Routes><Route path="/" element={<HomePage/>}/><Route path="/items" element={<ItemsPage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes></ThemeProvider>}
createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);
