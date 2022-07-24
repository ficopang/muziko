import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { SEARCH_ARTIST } from '../lib/queries/SearchArtist';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';

export default function Albums(props) {
  const [fav, setFav] = React.useState(
    JSON.parse(localStorage.getItem('fav')) || '[]'
  );

  const { name } = useParams();
  let navigate = useNavigate();

  const { loading, data } = useQuery(SEARCH_ARTIST, {
    variables: {
      name: name || 'Tulus',
    },
  });
  if (loading)
    return (
      <ImageList sx={{ width: '100%' }}>
        {[...Array(10)].map((_, i) => (
          <ImageListItem key={i}>
            <Skeleton
              variant="rectangular"
              key={i}
              width="100%"
              height={'45vw'}
            />
          </ImageListItem>
        ))}
      </ImageList>
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
    <ImageList sx={{ width: '100%' }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div" sx={{ padding: '0' }}>
          Artist: {data.artist.name}
        </ListSubheader>
      </ImageListItem>
      {data.artist.albums.map((item) => {
        let isFav = fav.indexOf(item.id) !== -1;
        return (
          <ImageListItem key={item.id}>
            <img
              src={`${item.image}`}
              srcSet={`${item.image}`}
              alt={item.title}
              width={'100%'}
              height={'100%'}
              onClick={() => {
                navigate(`/detail/${item.id}`);
              }}
            />
            <ImageListItemBar
              title={item.name}
              subtitle={data.artist.name}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={
                    isFav ? 'add to favorite' : 'remove from favorite'
                  }
                  onClick={() => handleFav(item.id)}
                >
                  {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              }
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
