import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

export default function MusicPlayer(props) {
  const [paused, setPaused] = React.useState(true);
  const [audio] = React.useState(new Audio(String(props.preview_url)));

  audio.addEventListener(
    'ended',
    function () {
      setPaused(true);
    },
    false
  );

  React.useEffect(() => {
    // console.log(paused, '- Has changed');
    if (!paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [paused, audio]);

  return (
    <Card sx={{ display: 'flex', marginBottom: '12px' }}>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {props.title} {props.preview_url ? '' : '(No preview)'}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.artist}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: 1,
            pb: 1,
          }}
        >
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ height: 38, width: 38, fontSize: '3rem' }}
              />
            ) : (
              <PauseRounded sx={{ height: 38, width: 38, fontSize: '3rem' }} />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={props.src}
        alt={props.title}
      />
    </Card>
  );
}
