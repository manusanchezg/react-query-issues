import axios from "axios";


 // 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

export const githubAPI = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: "Bearer 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"
    }
})