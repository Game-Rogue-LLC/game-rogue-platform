import axios from 'axios'

export default async function handler(req, res) {
    const { data } = await axios.get(`https://${process.env.NEXT_PUBLIC_CHALLONGE_USER_NAME}:${process.env.NEXT_PUBLIC_CHALLONGE_API_KEY}@api.challonge.com/v1/tournaments.json`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    res.status(200).json(data)
}
