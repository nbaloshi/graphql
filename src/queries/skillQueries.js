export const GET_SKILLS = `
    query {
        transaction(
            where: {
                type: {
                    _in: [
                        "skill_go",
                        "skill_prog",
                        "skill_front-end",
                        "skill_js",
                        "skill_back-end",
                        "skill_html"
                    ]
                }
            }
        ) {
            amount
            type
        }
    }
`;