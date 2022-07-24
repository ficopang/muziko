import { Box, Typography } from '@mui/material';
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
  if (loading) return <h1>Loading</h1>;
  // if (!loading) console.log(data);

  return (
    <Box sx={{ paddingTop: '16px', paddingBottom: '50px' }}>
      <Typography variant="h5">{data.album.name}</Typography>
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
