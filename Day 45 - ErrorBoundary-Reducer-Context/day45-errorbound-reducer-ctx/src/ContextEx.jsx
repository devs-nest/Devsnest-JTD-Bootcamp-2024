import { createContext, useContext, useState } from "react";


const UserContext = createContext(null);
const ThemeContext = createContext("dark");

function Foo({ user }) {
    return (
        <>
            <h3>I am Foo.</h3>
            < Bar user={user} />
        </>
    )
}

function Bar() {
    return (
        <>
            <UserContext.Provider value="Jay">
                <h4>I am Bar.</h4>
                <Baz></Baz>
            </UserContext.Provider>
        </>
    )
}

function Baz() {
    const user = useContext(UserContext);
    const theme = useContext(ThemeContext);

    function getStyle() {
        const styleObj = {
            background: "white",
            color: "black"
        }

        if (theme == 'dark') {
            styleObj.background = "black";
            styleObj.color = "white";
        } else {
            styleObj.background = "white";
            styleObj.color = "black"
        }

        return styleObj;
    }
    return (
        <>
            <h4>I am Baz.</h4>
            <h4 style={getStyle()}>Welcome {user}!</h4>
        </>
    )
}

export default function ContextEx() {
    const username = "Subodh";
    const [theme, setTheme] = useState(useContext(ThemeContext));
    return (
        <>
            <UserContext.Provider value={username}>
                <h2>I am Parent Component. User is {username}</h2>
                <ThemeContext.Provider value={theme}>
                    <Foo user={username} />
                </ThemeContext.Provider>
            </UserContext.Provider>

            <button onClick={() => setTheme((prev) => prev == 'light' ? 'dark' : 'light')}>Toggle Theme</button>
        </>
    )
}