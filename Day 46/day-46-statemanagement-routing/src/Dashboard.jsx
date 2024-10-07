import { useLoaderData, useNavigate } from "react-router-dom"

export default function Dashboard() {
    const { contextId } = useLoaderData();

    const navigate = useNavigate();

    function onClickHandler(){
        navigate("/about");
    }
    
    return (
        <>
            <h2>
                This is Dashboard for {contextId}.
            </h2>

            <button onClick={onClickHandler}>Go to About Page</button>
        </>
    )
}

export function dashboardDataLoader({ params }) {
    const contextId = params.contextId;

    return { contextId }
}