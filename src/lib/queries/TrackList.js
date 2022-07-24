import { gql } from '@apollo/client';

export const TRACK_LIST = gql`
  query AlbumTrack($id: String!) {
    album(id: $id) {
      id
      name
      image
      tracks {
        id
        name
        preview_url
      }
    }
  }
`;
