export const GET_USER_INFO = `
    query GetUserInfo {
        user {
            id
            login
            firstName
            lastName
        }
    }
`;