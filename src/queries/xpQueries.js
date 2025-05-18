export const GET_XP_DATA = `
    query {
        transaction(
            where: {
                type: { _eq: "xp" }
                _and: [
                    { path: { _like: "/bahrain/bh-module%" } }
                    { amount: { _gt: 0 } }
                ]
            }
            order_by: { createdAt: desc }
            
        ) {
            id
            amount
            path
            createdAt
            object {
                id
                name
            }
        }
        transaction_aggregate(
            where: {
                type: { _eq: "xp" }
                _and: [
                    { path: { _like: "/bahrain/bh-module%" } }
                    { amount: { _gt: 0 } }
                ]
            }
        ) {
            aggregate {
                sum {
                    amount
                }
            }
        }
    }
`;

// export const GET_XP_DATA = `
//     query {
//         transaction(
//             where: {
//                 type: { _eq: "xp" }
//                 _and: [
//                     { path: { _like: "/bahrain/bh-module%"} }
//                     { path: { _nlike: "/bahrain/bh-module/checkpoint%"} }
//                     { path: { _nlike: "/bahrain/bh-module/piscine%"} }
//                     { amount: { _gt: 0 } }
//                 ]
//             }
//             order_by: { createdAt: desc }
//             limit: 5
//         ) {
//             amount
//             object {
//                 name
//             }
//         }
//     }
// `;

// // export const GET_XP_DATA = `
// //     query GetXPData {
// //         transaction(
// //             where: {type: {_eq: "xp"}}
// //             order_by: {createdAt: asc}
// //         ) {
// //             amount
// //             createdAt
// //             objectId
// //         }
// //         transaction_aggregate(where: {type: {_eq: "xp"}}) {
// //             aggregate {
// //                 sum {
// //                     amount
// //                 }
// //             }
// //         }
// //     }
// // `;