import gql from 'graphql-tag';
import { perPage } from '../config';

export const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($first: Int = ${perPage}, $skip: Int = 0){
        items(first: $first, skip: $skip){
            id
            title
            price
            description
            image
            largeImage
            user{
                id
            }
        }
    }
`;

export const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID){
        item(where: {id: $id}){
            id
            title
            description
            largeImage
            price
            user{
                id
            }
        }
    }
`;

export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY{
        itemsConnection{
            aggregate{
                count
            }
        }
    }
`;

export const ALL_USERS_QUERY = gql`
    query ALL_USERS_QUERY{
        users{
            id
            name
            email
            permissions
        }
    }
`;

export const CURRENT_USER_QUERY = gql`
    query {
        me{
            id
            email
            name
            permissions
            cart{
                id
                quantity
                item{
                    id
                    price
                    image
                    title
                    description
                }
            }
        }
    }
`;

export const LOCAL_STATE_QUERY = gql`
    query{
        cartOpen @client
    }
`;

