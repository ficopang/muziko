import { gql } from '@apollo/client';

export const SEARCH_ARTIST = gql`
  query DetailAlbum($name: String!) {
    artist(name: $name) {
      id
      name
      image
      albums {
        id
        name
        image
      }
    }
  }
`;
