import * as React from 'react';
import Box from '@mui/material/Box';
import SearchBar from '../../components/SearchBar';
import Albums from '../../components/Albums';

export default function Home() {
  return (
    <Box sx={{ paddingTop: '16px', paddingBottom: '50px' }}>
      <SearchBar />
      <Albums />
    </Box>
  );
}
