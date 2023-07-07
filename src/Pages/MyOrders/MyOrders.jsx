import * as React from 'react';

import { IconButton, Toolbar, Typography ,Box, Divider} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tabulation from './Tabulation';


export default function Orders() {
  return (
    <>
    
    <Toolbar >
  <Typography variant='h5'>Orders</Typography>
  
</Toolbar>

<Divider />

<div style={{"marginTop" : "20px"}}></div>
<Tabulation />
<div style={{"marginTop" : "20px"}}></div>
    
    
    </>
  );
}