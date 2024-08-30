// async await

const usersURL = "https://jsonplaceholder.typicode.com/users";
const postsURL = "https://jsonplaceholder.typicode.com/posts";


function fetchUsers() {
    return fetch(usersURL)
        .then(resp => resp.json())
}

function fetchPosts() {
    return fetch(postsURL)
        .then((resp) => resp.json());
}


// fetchUsers()
//     .then((data) => {
//         const usersData = data;
//         console.log(usersData);
//         fetchPosts();
//     })
//     .then()



// async await
async function fetchWithAsync() {
    try {

        const users = await fetchUsers();   // fulfilled : true, rejected: false.
        console.log(users);
        const posts = await fetchPosts();
        console.log(posts);
    } catch () {

    }
}

fetchWithAsync();