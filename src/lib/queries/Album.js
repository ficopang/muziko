import { gql } from '@apollo/client';

export const ALBUM = gql`
  query DetailAlbum($id: String!) {
    album(id: $id) {
      id
      name
      image
    }
  }
`;
