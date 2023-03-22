import axios from "axios";


 // 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

export const githubAPI = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: "Bearer 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"
    }
})