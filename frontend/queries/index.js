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

export const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY($searchTerm: String!){
        items(where:{
            OR:[
                {title_contains: $searchTerm},
                {description_contains: $searchTerm}
            ]
        }){
            id
            image
            title
        }
    }
`;

export const USER_ORDERS_QUERY = gql`
    query USER_ORDERS_QUERY{
        orders(orderBy: createdAt_DESC){
            id
            total
            createdAt
            items{
                id
                title
                price
                description
                quantity
                image
            }
        }
    }
`;

export const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!){
        order(id: $id){
            id
            charge
            total
            createdAt
            user{
                id
            }
            items{
                id
                title
                description
                price
                image
                quantity
            }
        }
    }
`;
