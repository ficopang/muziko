import { Box, Skeleton, Typography } from '@mui/material';
import { TRACK_LIST } from '../../lib/queries/TrackList';
import { useQuery } from '@apollo/client';
import MusicPlayer from '../../components/MusicPlayer';
import { useParams } from 'react-router-dom';

export default function Detail() {
  const { id } = useParams();

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

  return (
    <Box sx={{ paddingTop: '16px', paddingBottom: '50px' }}>
      <Typography variant="h5" sx={{ marginBottom: '16px' }}>
        {data.album.name}
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
