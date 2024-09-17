import "../index.css";
const CLIENT_ID = "9e0bbea20075475083b6af5e647fcdc7";

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

const tokenEndpoint = "https://accounts.spotify.com/api/token"
const redirectUrl = 'http://localhost:3000/login/index.html';

const getToken = async code => {

    // stored in the previous step
    let codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUrl,
            code_verifier: codeVerifier,
        }),
    }

    const body = await fetch(tokenEndpoint, payload);
    return body.json();

}


if (code) {

    const token = await getToken(code);
    // save to local storage

    const playlist = await fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.access_token}`
        },
    })

    console.log(await playlist.json());


    const url = new URL(window.location.href);
    url.searchParams.delete("code");
    // window.location.href = "/dashboard/index.html";

}

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}


const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}


async function loginToSpotify() {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const scope = 'user-read-private user-read-email';
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    // generated in the previous step
    window.localStorage.setItem('code_verifier', codeVerifier);

    const params = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUrl,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();


}

document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", loginToSpotify)
})