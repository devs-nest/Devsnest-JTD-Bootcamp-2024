import { fetchRequest } from "../api";
import { END_POINTS } from "./common";
import "./style.css";


const getUserProfile = () => fetchRequest(END_POINTS.USER_PROFILE);

function showUserProfile(userProfile) {
    const { display_name } = userProfile;
    const userProfileButton = document.getElementById("user-profile-button");
    userProfileButton.textContent = display_name.at(0);

}

document.addEventListener("DOMContentLoaded", async () => {
    const userProfile = await getUserProfile();
    showUserProfile(userProfile)


})