import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Link,Route,Routes} from 'react-router-dom';
import {Box,Button,CssBaseline,ThemeProvider,Typography,createTheme} from '@mui/material';
const theme=createTheme();
function HomePage(){return <Box component="main" sx={{p:3}}><Typography variant="h4">首页</Typography><Button component={Link} to="/items">查看列表</Button></Box>}
function ItemsPage(){return <Box component="main" sx={{p:3}}><Typography variant="h4">列表</Typography><Button component={Link} to="/">返回首页</Button></Box>}
function NotFoundPage(){return <Box component="main" sx={{p:3}}><Typography variant="h4">页面不存在</Typography><Button component={Link} to="/">返回首页</Button></Box>}
function App(){return <ThemeProvider theme={theme}><CssBaseline/><Routes><Route path="/" element={<HomePage/>}/><Route path="/items" element={<ItemsPage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes></ThemeProvider>}
createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);
