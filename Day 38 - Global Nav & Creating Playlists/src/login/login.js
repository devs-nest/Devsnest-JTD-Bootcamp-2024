import { ACCESS_TOKEN, BASE_AUTH_URL, END_POINTS, EXPIRES_IN, REFRESH_TOKEN, TOKEN_TYPE } from "../common";
import "../index.css";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
import spotifyLogo from "/Primary_Logo_White_CMYK.svg";

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');


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

    const body = await fetch(`${BASE_AUTH_URL}/${END_POINTS.TOKEN}`, payload);
    return body.json();

}

const saveTokenToLocalStorage = (token) => {

    const { access_token, expires_in, token_type, refresh_token } = token;
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
    const expiry = new Date(Date.now() + (expires_in * 1000));
    localStorage.setItem(EXPIRES_IN, expiry.getTime());
    localStorage.setItem(TOKEN_TYPE, token_type)
}


if (code) {

    const token = await getToken(code);
    if (token) {
        saveTokenToLocalStorage(token);
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
        window.location.href = "/";

    } else {
        throw new Error("Unable to fetch token");
    }
    // save to local storage

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
    const authUrl = new URL(`${BASE_AUTH_URL}/${END_POINTS.AUTH}`)

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
    const loginContainer = document.getElementById("login-container");
    loginContainer.innerHTML = `<article
        class="bg-secondary flex min-w-sm flex-col justify-between gap-4 rounded-md p-4">
        <header class="flex flex-col items-center justify-center gap-2">
      <img src="${spotifyLogo}" class="h-8 w-8" alt="Spotify logo" />
          
          <h1 class="text-xl">Login to Spotify</h1>
        </header>
        <button id="login-button" class="bg-spotify-green rounded-xl p-2">
          Login
        </button>
      </article>`
    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", loginToSpotify)
})