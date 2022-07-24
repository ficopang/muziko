import { gql } from '@apollo/client';

export const TRACK_LIST = gql`
  query DetailAlbum($id: String!) {
    album(id: $id) {
      id
      name
      image
    }
  }
`;
