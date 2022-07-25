import * as React from 'react';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import { TRACK_LIST } from '../../lib/queries/TrackList';
import { useQuery } from '@apollo/client';
import MusicPlayer from '../../components/MusicPlayer';
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Detail() {
  const { id } = useParams();
  const [fav, setFav] = React.useState(
    JSON.parse(localStorage.getItem('fav')) || '[]'
  );
  let isFav = fav.indexOf(id) !== -1;

  const { loading, data } = useQuery(TRACK_LIST, {
    variables: {
      id: id,
    },
  });
  if (loading)
    return (
      <Box sx={{ paddingTop: '16px', paddingBottom: '50px' }}>
        <Skeleton variant="text" width="100%" sx={{ marginBottom: '16px' }} />
        {[...Array(10)].map((_, i) => (
          <Skeleton
            variant="rectangular"
            key={i}
            width="100%"
            height={'45vw'}
            sx={{ marginBottom: '16px' }}
          />
        ))}
      </Box>
    );

  const handleFav = (query) => {
    let newFav = [...fav];
    let found = fav.indexOf(query);
    if (found === -1) {
      newFav.push(query);
    } else {
      newFav.splice(found, 1);
    }
    localStorage.setItem('fav', JSON.stringify(newFav));
    setFav(newFav);
  };

  return (
    <Box sx={{ paddingTop: '16px', paddingBottom: '50px' }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {data.album.name}
        <IconButton
          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
          aria-label={isFav ? 'add to favorite' : 'remove from favorite'}
          onClick={() => handleFav(id)}
        >
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Typography>
      {data.album.tracks.map((item) => {
        return (
          <MusicPlayer
            key={item.id}
            title={item.name}
            artist={data.album.name}
            src={data.album.image}
            preview_url={item.preview_url}
          />
        );
      })}
    </Box>
  );
}
