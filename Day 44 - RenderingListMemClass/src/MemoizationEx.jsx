import react, { useState, memo } from 'react';


export default function MemoizationEx() {

    console.log("Mem parent is being rendered.")

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    return (
        <div>
            <form action="">
                <fieldset>
                    <input type="text" name="firstName" id="firstName" onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" />
                    <input type="text" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} placeholder="Enter second name"/>
                </fieldset>
            </form>

            <Greeting name={firstName}/>
        </div>
    )
}

const Greeting = memo(({name}) => {
    console.log("Greeting is being rendered at", new Date().toString());
    return <h2>Hello, {name}</h2>
});