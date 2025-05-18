export const GET_AUDIT_DATA = `
    query {
        user {
            id
            auditRatio
            totalUp
            totalDown
        }
    }
`;

// export const GET_AUDIT_DATA = `
//     query {
//         audits_done: transaction(
//             where: {
//                 type: {_eq: "up"},
//                 amount: {_gt: 0}
//             }
//         ) {
//             id
//             type
//             amount
//             createdAt
//             object {
//                 id
//                 name
//                 type
//             }
//         }
//         audits_received: transaction(
//             where: {
//                 type: {_eq: "down"}
//             }
//         ) {
//             id
//             type
//             amount
//             createdAt
//             object {
//                 id
//                 name
//                 type
//             }
//         }
//     }
// `;