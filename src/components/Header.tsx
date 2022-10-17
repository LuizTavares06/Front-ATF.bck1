import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import AssignmentIcon from '@mui/icons-material/Assignment';



export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Grid sx={{padding: 1}} container>
            <Grid item xs={12} sx={{display:'flex', justifyContent:'center'}}>
            <AssignmentIcon sx={{fontSize:40,color:'white'}}/>
                <Typography variant='h4' sx={{color:'white'}}> <b>Bloco de notas</b></Typography>
            </Grid>
            <Grid item xs={12} sx={{display:'flex', justifyContent:'center'}}>
                <Typography sx={{fontSize:20 ,color:'white'}} variant='subtitle1'>Trabalho final módulo IV</Typography>       
            </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}