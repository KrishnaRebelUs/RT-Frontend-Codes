import { Grid, Stack } from '@mui/material';
import React from 'react'
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from '../components/pages/Breadcrumb';
import Header from '../components/pages/Header';
import ShortageLogTable from '../components/pages/ShortageLogTable';


const ShortageLog = () => {
  return (
        <PageContainer  title="">
			<Grid container spacing={3}>
		      <Grid item xs={12}>
                <Breadcrumb titles={['Shortage Claim', 'Itemized Shortage Dipute Log']} />
              </Grid>		
			  <Grid item xs={12}>
				<Header title='Itemized Shortage Dipute Log'/>
			  </Grid>
			  <Grid item xs={12}>
			   <ShortageLogTable />
			  </Grid>
			</Grid>
	    </PageContainer>
  )
}

export default ShortageLog;
