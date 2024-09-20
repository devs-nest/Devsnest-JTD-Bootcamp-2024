import { fetchRequest } from "../api";
import { END_POINTS } from "./common";
import "./style.css";


const getUserProfile = () => fetchRequest(END_POINTS.USER_PROFILE);
const getFeaturedPlaylist = () => fetchRequest(END_POINTS.FEATURED_PLAYLIST);
const getPartyPlaylist = () => fetchRequest(END_POINTS.PARTY_PLAYLIST);
const getCountryPlaylist = () => fetchRequest(END_POINTS.COUNTRY_PLAYLIST);

function showUserProfile(userProfile) {
    const { display_name } = userProfile;
    const userProfileButton = document.getElementById("user-profile-button");
    userProfileButton.textContent = display_name.at(0);

}

async function loadPlaylist(id) {
    console.log(id);
    const playListInfo = await fetchRequest(`${END_POINTS.PLAYLIST}/${id}`)
    console.log(playListInfo);

}

function createPlaylist({ playlists: { items } }, containerId) {
    // <article
    //     class="group relative flex cursor-pointer flex-col items-center justify-between gap-2 rounded-md p-2 hover:bg-gray"
    // >

    // </article>
    const playlistContainer = document.getElementById(containerId);
    playlistContainer.innerHTML = "";

    for (let { description, images, id, name } of items) {
        let [image] = images
        const mainContainer = document.createElement("article");
        mainContainer.addEventListener("click", (event) => loadPlaylist(id))
        mainContainer.id = id;
        mainContainer.className = "group relative flex cursor-pointer flex-col items-center justify-between gap-2 rounded-md p-2 hover:bg-gray";
        mainContainer.innerHTML = `<img
            class="h-full w-full rounded-sm"
            src="${image.url}"
            alt="${name}"
        />
        <section>
            <p class="line-clamp-2 text-sm text-subdued">
             ${description}
            </p>
        </section>
        <button
            class="absolute bottom-6 right-6 grid size-12 place-items-center rounded-full bg-spotify-green opacity-0 transition-all delay-300 ease-linear group-hover:bottom-12 group-hover:opacity-100"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 fill-black"
            >
                <path
                    fill-rule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>`
        playlistContainer.appendChild(mainContainer);
    }

}


document.addEventListener("DOMContentLoaded", async () => {
    const userProfile = await getUserProfile();
    showUserProfile(userProfile)

    const featuredPlaylist = await getFeaturedPlaylist()
    console.log(featuredPlaylist);

    const partyPlaylist = await getPartyPlaylist();
    console.log(partyPlaylist);

    const countryPlayList = await getCountryPlaylist();

    createPlaylist(featuredPlaylist, "featured-playlist")
    createPlaylist(partyPlaylist, "party-playlist")
    createPlaylist(countryPlayList, "country-playlist")



})