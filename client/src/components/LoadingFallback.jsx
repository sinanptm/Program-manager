import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
    <Typography variant="body1" style={{ marginLeft: '10px' }}>Loading...</Typography>
  </div>
);

export default LoadingFallback;
