import { Grid, Stack } from '@mui/material';
import React from 'react'
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from '../components/pages/Breadcrumb';
import Header from '../components/pages/Header';
import ShortageClaimTable from '../components/pages/ShortageClaimTable';
import ShortageLogTable from '../components/pages/ShortageLogTable';


const ShortageClaimFinding = () => {
  return (
        <PageContainer  title="">
			<Grid container spacing={3}>
		      <Grid item xs={12}>
                <Breadcrumb titles={['Shortage Claim', 'Shortage Claim Finding']} />
              </Grid>		
			  <Grid item xs={12}>
				<Header title='Shortage Claim Finding'/>
			  </Grid>
			  <Grid item xs={12}>
			    <ShortageClaimTable />
			  </Grid>
			</Grid>
	    </PageContainer>
  )
}

export default ShortageClaimFinding;
