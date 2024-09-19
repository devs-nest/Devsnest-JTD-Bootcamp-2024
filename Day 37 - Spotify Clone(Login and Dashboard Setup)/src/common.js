const BASE_AUTH_URL = "https://accounts.spotify.com";
const BASE_API = "https://api.spotify.com/v1";

const ACCESS_TOKEN = "access_token";
const EXPIRES_IN = "expires_in";
const TOKEN_TYPE = "token_type";
const REFRESH_TOKEN = "refresh_token";

const END_POINTS = {
    AUTH: "authorize",
    TOKEN: "api/token",
    FEATURED_PLAYLIST: "browse/featured-playlists",
    USER_PROFILE: "me"
}

function logout() {
    localStorage.clear();
    window.location.href = "/login/index.html";
}

export { BASE_API, BASE_AUTH_URL, END_POINTS, ACCESS_TOKEN, EXPIRES_IN, REFRESH_TOKEN, TOKEN_TYPE, logout }