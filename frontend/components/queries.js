import { gql } from 'apollo-boost';

export const CREATE_ITEM_MUTATION = gql`
    mutation createItem(
    $title: String!
    description: String!
    price: Int!
    image: String
    largeImage: String){
    createItem(
    title: $title
    description: $description
    price: $price
    image: $image
    largeImage: $largeImage
    ){
    id
    }
    }
`;