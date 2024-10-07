import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div>
            <h2>Oops! The page is not found.</h2>
            <p>Sorry, unexpected error occured.</p>
            <p>
                <pre>
                    <i>
                        {error.statusText || error.message}
                    </i>
                </pre>
            </p>
        </div>
    )
}