import { ImageList, ImageListItem, ListSubheader } from '@mui/material';
import Album from '../../components/Album';
import * as React from 'react';

export default function Favorites() {
  const fav = JSON.parse(localStorage.getItem('fav'));

  return (
    <ImageList sx={{ width: '100%' }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div" sx={{ padding: '0' }}>
          Favorites
        </ListSubheader>
      </ImageListItem>
      {fav
        ? fav.map((item, i) => {
            if (i === 0) return null;
            if (i === 1) return null;
            return <Album key={item} id={item}></Album>;
          })
        : ''}
    </ImageList>
  );
}
