// FONT
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Home from './pages/Home/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Favorites from './pages/Favorites/Favorites';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Detail from './pages/Detail/Detail';
import { Container, CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  const [value, setValue] = React.useState(0);
  const client = new ApolloClient({
    uri: 'https://spotify-graphql.up.railway.app/query',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <React.Fragment>
            <CssBaseline />
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/:name" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </Container>
          </React.Fragment>

          <Box
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction
                label="Explore"
                icon={<ExploreIcon />}
                to="/"
                component={Link}
              />
              <BottomNavigationAction
                label="Favorites"
                icon={<FavoriteIcon />}
                to="/favorites"
                component={Link}
              />
            </BottomNavigation>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}
