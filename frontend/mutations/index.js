import gql from 'graphql-tag';

export const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!, $passwordConfirm: String!){
        signup(email: $email, name: $name, password: $password, passwordConfirm: $passwordConfirm){
            id
            email
            name
        }
    }
`;

export const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!){
        signin(email: $email, password: $password){
            id
            email
            name
        }
    }
`;

export const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION{
        signout{
            message
        }
    }
`;

export const UPDATE_USER_MUTATION = gql`
    mutation UPDATE_USER_MUTATION($id: ID!, $name: String, $logo: String){
        updateUser(id: $id, name: $name, logo: $logo){
            id
        }
    }
`;

export const DELETE_USER_MUTATION = gql`
    mutation DELETE_USER_MUTATION($id: ID!){
        deleteUser(id: $id)  {
            id
        }
    }
`;

export const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!, $reset: String!){
        requestReset(email: $email, reset: $reset){
            message
        }
    }
`;

export const RESET_PASSWORD_MUTATION = gql`
    mutation RESET_PASSWORD_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!){
        resetPassword(resetToken: $resetToken, password:$password, confirmPassword:$confirmPassword){
            id
            email
            name
        }
    }
`;

export const RESET_EMAIL_MUTATION = gql`
    mutation RESET_EMAIL_MUTATION($resetToken: String!, $email: String!, $confirmEmail: String!){
        resetEmail(resetToken:$resetToken, email: $email, confirmEmail: $confirmEmail){
            id
        }
    }
`;

export const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!){
        updatePermissions(permissions: $permissions, userId: $userId){
            id
            permissions
            name
            email
        }
    }
`;

export const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: [String]
        $largeImage: [String]){
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

export const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $image: [String!]!
        $largeImage: [String!]!
        $price: Int){
        updateItem(
            id: $id
            title: $title
            description: $description
            image: $image
            largeImage: $largeImage
            price: $price
        ){
            id
            title
            description
            price
            image
            largeImage
        }
    }
`;

export const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

export const ADD_TO_CART_MUTATION = gql`
    mutation ADD_TO_CART_MUTATION($id: ID!){
        addToCart(id: $id){
            id
            quantity
        }
    }
`;

export const REMOVE_FROM_CART_MUTATION = gql`
    mutation REMOVE_FROM_CART_MUTATION($id: ID!){
        removeFromCart(id: $id){
            id
        }
    }
`;

export const TOGGLE_CART_MUTATION = gql`
    mutation{
        toggleCart @client
    }
`;

export const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER_MUTATION($token: String!){
        createOrder(token: $token){
            id
            charge
            total
            items{
                id
                title
            }
        }
    }
`;