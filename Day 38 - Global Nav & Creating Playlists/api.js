import { ACCESS_TOKEN, BASE_API, EXPIRES_IN, logout, TOKEN_TYPE } from "./src/common";


// const playlist = await fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
//     method: 'GET',
//     headers: {
//         'Authorization': `Bearer ${token.access_token}`
//     },
// })

// console.log(await playlist.json());

const getAccessToken = () => {

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const expiry = localStorage.getItem(EXPIRES_IN);
    const tokenType = localStorage.getItem(TOKEN_TYPE);
    if (Date.now() < expiry) {
        return { accessToken, tokenType }
    } else {
        logout();
    }
}

export const fetchRequest = async (endPoint, method = "GET") => {
    const { accessToken, tokenType } = getAccessToken();
    const url = `${BASE_API}/${endPoint}`;
    const result = await fetch(url, {
        headers: {
            'Authorization': `${tokenType} ${accessToken}`
        },
        method
    });
    return result.json();
}
