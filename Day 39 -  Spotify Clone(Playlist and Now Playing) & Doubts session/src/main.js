import { fetchRequest } from "../api";
import { END_POINTS, getItemFromLocalStorage, saveItemToLocalStorage, SECTION } from "./common";
import "./style.css";


const getUserProfile = () => fetchRequest(END_POINTS.USER_PROFILE);
const getFeaturedPlaylist = () => fetchRequest(END_POINTS.FEATURED_PLAYLIST);
const getPartyPlaylist = () => fetchRequest(END_POINTS.PARTY_PLAYLIST);
const getCountryPlaylist = () => fetchRequest(END_POINTS.COUNTRY_PLAYLIST);

const audio = new Audio();

function showUserProfile(userProfile) {
    const { display_name } = userProfile;
    const userProfileButton = document.getElementById("user-profile-button");
    userProfileButton.textContent = display_name.at(0);

}

async function onPlaylistClick(id) {
    history.pushState({ section: SECTION.PLAYLIST }, "", `/playlist/${id}`);
    loadSection(SECTION.PLAYLIST);
    // console.log(id);


}

function loadPlaylistCategories({ message: name, playlists: { items } }) {
    // <article class="flex flex-col gap-4">
    //     <h1 class="text-2xl font-semibold">Featured Charts</h1>
    //     <section



    const playlistContainer = document.createElement("article");
    playlistContainer.className = "flex flex-col gap-4";
    playlistContainer.innerHTML = `<h1 class="text-2xl font-semibold">${name}</h1>
    <section class="grid-overflow-none grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] grid-rows-1 gap-2"></section>`;

    for (let { description, images, id, name } of items) {
        let [image] = images
        const mainContainer = document.createElement("article");
        mainContainer.addEventListener("click", (event) => onPlaylistClick(id))
        mainContainer.id = id;
        mainContainer.className = "overflow-hidden group relative flex cursor-pointer flex-col items-center justify-between gap-2 rounded-md p-2 hover:bg-gray";
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
        playlistContainer.querySelector("section").appendChild(mainContainer);
    }
    const mainView = document.getElementById("main-view");

    mainView.appendChild(playlistContainer);

}

function formatDuration(duration) {
    const min = Math.floor(duration / 60_000);
    const sec = ((duration % 6_000) / 1000).toFixed(0);
    const formattedTime = sec == 60 ?
        min + 1 + ":00" : min + ":" + (sec < 10 ? "0" : "") + sec;
    return formattedTime;
}

function setNowPlayingInfo({ image, id, name, artistNames }) {
    const audioControl = document.getElementById("audio-control");
    const songTitle = document.getElementById("now-playing-song");
    const nowPlayingImage = document.getElementById("now-playing-image");
    const artists = document.getElementById("now-playing-artists");
    const songInfo = document.getElementById("song-info");
    songInfo.classList.remove("invisible");
    nowPlayingImage.src = image.url;
    songTitle.textContent = name;
    artists.textContent = artistNames;
    audioControl.setAttribute("data-track-id", id);
}

function playTrack(event, { image, artistNames, name, duration, previewUrl, id }) {

    if (audio.src === previewUrl) {
        togglePlay();
    } else {

        setNowPlayingInfo({ image, id, name, artistNames })
        audio.src = previewUrl;
        audio.play();
    }

}

function loadPlaylistTracks({ tracks }) {
    const trackSection = document.querySelector("#tracks");
    let trackNo = 1;
    const loadedTracks = [];
    for (let trackItem of tracks.items.filter(item => item.track.preview_url)) {
        let { id, artists, name, album, duration_ms: duration, preview_url: previewUrl } = trackItem.track;

        let track = document.createElement("section");
        track.id = id;
        track.className = "cursor-pointer hover:bg-gray track p-1 grid grid-cols-[50px_1fr_1fr_50px] gap-4 items-center justify-items-start gap-4 rounded-md";
        let image = album.images.find(img => img.height === 64);
        let artistNames = Array.from(artists, artist => artist.name).join(", ");
        track.innerHTML = `
        <p class="relative w-full flex items-center justify-center justify-self-center">
        <span class="track-no">${trackNo++}</span>
        </p>
            <section class="grid grid-cols-[auto_1fr] place-items-center gap-2" >
                <img class="size-10 rounded-sm" src=${image.url} alt=${name} />
                <article class="flex flex-col items-start justify-start">
                    <h2 class="line-clamp-1 song-title">${name}</h2>
                    <p class="text-subdued text-xs line-clamp-1">${artistNames}</p>
                </article>
            </section>
            <p class="text-sm">${album.name}</p>
            <p class="text-sm">${formatDuration(duration)}</p>
        `;
        const playButton = document.createElement("button");
        playButton.id = `play-track-${id}`;
        playButton.className = "play w-full absolute left-0 text-lg invisible material-symbols-outlined";
        playButton.textContent = "play_arrow";
        playButton.addEventListener("click", (event) => playTrack(event, { image, artistNames, name, duration, previewUrl, id }))
        track.querySelector("p").appendChild(playButton);

        trackSection.appendChild(track);

        loadedTracks.push({ id, artists, name, album, duration, previewUrl, artistNames, image });

    }
    saveItemToLocalStorage("loadedTracks", loadedTracks);
}

async function fillContentForPlaylist(playlistId) {
    const playListInfo = await fetchRequest(`${END_POINTS.PLAYLIST}/${playlistId}`)
    console.log(playListInfo);
    const { name, images, description, tracks } = playListInfo;
    const mainView = document.getElementById("main-view");
    mainView.innerHTML = `
        <article
          id="cover-content"
          class="-m-2 grid grid-cols-[auto_1fr] grid-rows-[200px] gap-4 bg-gradient-to-b from-gray to-secondary p-4"
        >
          <img
            class="size-40 self-end rounded-md object-contain"
            src="${images[0].url}"
            loading="lazy"
            alt="${name} cover image"
          />
          <section class="flex flex-col gap-2">
            <h2 class="text-8xl font-bold" id="playlist-name">${name}</h2>
            <p class="text-sm text-subdued" id="playlist-description">
              ${description}
            </p>
            <ul
              id="playlist-details"
              class="flex list-disc items-center gap-4 text-subdued"
            >
              <li class="list-none">
                <section class="flex gap-2 text-white">
                  <img
                    class="size-6 object-contain"
                    src="/spotify_green.png"
                    alt="Spotify logo green"
                    loading="lazy"
                  />
                  <p>Spotify</p>
                </section>
              </li>
              <li>${tracks.items.length} songs</li>
            </ul>
          </section>
        </article>
        <section id="page-content" class="mt-24 -mx-2">
            <header id="playlist-header" class="mx-8 border-subdued border-b-[.5px] z-10">
            <nav class="py-2">
                <ul class="grid grid-cols-[50px_1fr_1fr_50px] gap-4">
                    <li class="justify-self-center">#</li>
                    <li>Title</li>
                    <li>Album</li>
                    <li class="material-symbols-outlined">schedule</li>
                </ul>
            </nav>
            </section>
            <section id="tracks" class="px-8 mt-4">
        </section
    `
    loadPlaylistTracks(playListInfo)
}

async function loadSection(section) {
    const mainView = document.getElementById("main-view");

    mainView.innerHTML = "";
    if (section === SECTION.DASHBOARD) {

        const allPlaylists = await Promise.all([getFeaturedPlaylist(), getPartyPlaylist(), getCountryPlaylist()])

        for (let playlist of allPlaylists) {
            loadPlaylistCategories(playlist);
        }

    } else if (section === SECTION.PLAYLIST) {
        const playlistId = location.pathname.split("/")[2];
        fillContentForPlaylist(playlistId);
    }

}
function onAudioMetadataLoaded() {
    const totalSongDuration = document.getElementById("total-song-duration");
    totalSongDuration.textContent = `0:${audio.duration.toFixed(0)}`
}

function updateIconsForPlayMode(selectedTrackId) {
    const playButton = document.querySelector("#play");
    playButton.querySelector("span").textContent = "pause_circle";
    const playButtonFromTracks = document.querySelector(`#play-track-${selectedTrackId}`);
    if (playButtonFromTracks) {
        playButtonFromTracks.textContent = "pause";
    }
}

function updateIconsForPauseMode(selectedTrackId) {
    const playButton = document.querySelector("#play");
    playButton.querySelector("span").textContent = "play_circle";
    const playButtonFromTracks = document.querySelector(`#play-track-${selectedTrackId}`);
    if (playButtonFromTracks) {
        playButtonFromTracks.textContent = "play_arrow";
    }
}

function togglePlay() {
    if (audio.src) {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
}

function findCurrentTrack() {
    const audioControl = document.getElementById("audio-control");
    const trackId = audioControl.getAttribute("data-track-id");
    if (trackId) {
        const loadedTracks = getItemFromLocalStorage("loadedTracks");
        const currentTrackIndex = loadedTracks?.findIndex(track => track.id === trackId);
        return { currentTrackIndex, tracks: loadedTracks };
    }
}

function playPrevTrack() {
    const { currentTrackIndex = -1, tracks = null } = findCurrentTrack();
    if (currentTrackIndex > 0) {
        const prevTrack = tracks[currentTrackIndex - 1];
        playTrack(null, prevTrack);
    }
}

function playNextTrack() {
    const { currentTrackIndex = -1, tracks = null } = findCurrentTrack();
    if (currentTrackIndex > -1 && currentTrackIndex < tracks?.length - 1) {
        const currentTrack = tracks[currentTrackIndex + 1];
        playTrack(null, currentTrack);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const volumne = document.getElementById("volume");
    const playButton = document.getElementById("play");
    const nextTrack = document.getElementById("next");
    const prevTrack = document.getElementById("prev");
    const songDurationCompleted = document.querySelector("#song-duration-completed");
    const songProgress = document.querySelector("#progress");
    const timeline = document.querySelector("#timeline")
    const audioControl = document.querySelector("#audio-control");


    let progressInterval;

    const userProfile = await getUserProfile();
    showUserProfile(userProfile)

    history.pushState({ section: SECTION.DASHBOARD }, "", "");

    loadSection(SECTION.DASHBOARD);


    playButton.addEventListener("click", togglePlay);
    audio.addEventListener("loadedmetadata", onAudioMetadataLoaded)
    audio.addEventListener("play", () => {
        const selectedTrackId = audioControl.getAttribute("data-track-id");
        const tracks = document.querySelector("#tracks");
        const playingTrack = tracks?.querySelector("section.playing");
        const selectedTrack = tracks?.querySelector(`[id="${selectedTrackId}"]`);

        if (playingTrack?.id !== selectedTrackId?.id) {
            playingTrack?.classList.remove("playing");
        }
        selectedTrack?.classList.add("playing");
        progressInterval = setInterval(() => {
            if (audio.paused) {
                return
            } else {
                songDurationCompleted.textContent = `0:${audio.currentTime < 10 ? "0" + audio.currentTime.toFixed(0) : audio.currentTime.toFixed(0)}`;
                songProgress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
            }
        }, 100);
        updateIconsForPlayMode(selectedTrackId);
    })

    audio.addEventListener("pause", () => {
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        const selectedTrackId = audioControl.getAttribute("data-track-id");
        updateIconsForPauseMode(selectedTrackId);
    })

    volumne.addEventListener("change", () => {
        audio.volume = volumne.value / 100;
    })

    timeline.addEventListener("click", (event) => {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek = (event.offsetX / parseInt(timelineWidth)) * audio.duration;
        audio.currentTime = timeToSeek;
        songProgress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;

    }, false)

    nextTrack.addEventListener("click", playNextTrack);
    prevTrack.addEventListener("click", playPrevTrack);

    window.addEventListener("popstate", (event) => {
        console.log(event);
        loadSection(event.state.section);

    })




})