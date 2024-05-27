// import axios from 'axios'
// import { config } from 'dotenv'

// config()

// export const getOautGoogleToken = async (code: string) => {
//       const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_AUTHORIZED_REDIRECT_URI } = process.env
//       const body = {
//             code,
//             client_id: GOOGLE_CLIENT_ID,
//             client_secret: GOOGLE_CLIENT_SECRET,
//             redirect_uri: GOOGLE_AUTHORIZED_REDIRECT_URI,
//             grant_type: 'authorization_code'
//       }

//       const { data } = await axios.post('https://oauth2.googleapis.com/token', body, {
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//       })

//       return data
// }

// export const getGoogleUser = async ({ id_token, access_token }: { id_token: string; access_token: string }) => {
//       const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
//             params: { access_token, alt: 'json' },
//             headers: { Authorization: `Bearer ${id_token}` }
//       })
//       console.log('data', data)
//       return data
// }

// const getOauthWithGoogle = () => {
//       const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_AUTHORIZED_REDIRECT_URI } = import.meta.env
//       const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
//       const options = {
//             redirect_uri: VITE_GOOGLE_AUTHORIZED_REDIRECT_URI,
//             client_id: VITE_GOOGLE_CLIENT_ID,
//             access_type: 'offline',
//             response_type: 'code',
//             prompt: 'consent',
//             scope: [
//                   'https://www.googleapis.com/auth/userinfo.profile',
//                   'https://www.googleapis.com/auth/userinfo.email'
//             ].join(' ')
//       }
//       const qs = new URLSearchParams(options)
//       return `${rootUrl}?${qs.toString()}`
// }

// export default getOauthWithGoogle
