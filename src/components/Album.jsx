import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ALBUM } from '../lib/queries/Album';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

export default function Album(props) {
  const [fav, setFav] = React.useState(
    JSON.parse(localStorage.getItem('fav')) || '[]'
  );

  let navigate = useNavigate();

  const { loading, data } = useQuery(ALBUM, {
    variables: {
      id: props.id || '',
    },
  });
  if (loading)
    return (
      <ImageListItem key={props.id}>
        <Skeleton variant="rectangular" width="100%" height={'45vw'} />
      </ImageListItem>
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

  let isFav = fav.indexOf(data.album.id) !== -1;

  return (
    <ImageListItem key={data.album.id}>
      <img
        src={`${data.album.image}`}
        srcSet={`${data.album.image}`}
        alt={data.album.name}
        loading="lazy"
        onClick={() => {
          navigate(`/detail/${data.album.id}`);
        }}
      />
      <ImageListItemBar
        title={data.album.name}
        actionIcon={
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label={isFav ? 'add to favorite' : 'remove from favorite'}
            onClick={() => handleFav(data.album.id)}
          >
            {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        }
      />
    </ImageListItem>
  );
}
