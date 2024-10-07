import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
    const contextId = 100;
    return <>
        <div className='layout'>
            <header className="header">
                <nav>
                    <ul>
                        <li>
                            <Link to={"/"}>Home </Link></li>
                        <li>
                            <Link to={`/dashboard/${contextId}`}>Dashboard</Link></li>
                        <li>
                            <Link to={"/about"}>About</Link></li>
                    </ul>
                </nav>
            </header>
            <main className='content'>
                {/* we are going to display the routes here. */}
                This is Main Content.
                <Outlet></Outlet>
            </main>

            <footer className='footer'>This is footer.</footer>
        </div>
    </>
}