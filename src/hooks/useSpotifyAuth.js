import { useEffect, useState } from 'react';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// console.log('CLIENT_ID:', CLIENT_ID);
// console.log('CLIENT_SECRET:', CLIENT_SECRET);
// console.log('REFRESH_TOKEN:', REFRESH_TOKEN);

export const useSpotifyAuth = () =>{
    const [token, setToken] = useState(null);

    useEffect(() => {

        if (!token) {
            getAccessToken().then((data) => {
                setToken(data.access_token);
            })
            .catch((error) => {
                console.error('Error fetching Spotify access token:', error);
            });
        }
    }, []);

    const getAccessToken = async () => {
        const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', REFRESH_TOKEN);

        const response = await fetch(TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString()
        });

        return response.json();
        // const data = await response.json();
        // console.log('Spotify token endpoint response:', data);
        // if (!response.ok) {
        //     throw new Error(data.error_description || 'Failed to fetch access token');
        // }
        // return data;
    };
    
    return { token };
}