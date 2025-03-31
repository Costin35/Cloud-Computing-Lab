import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './styles.css';

const Nav = () => {
    const [search, setSearch] = useState("");
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;
    
        try {
          const res = await fetch(`http://localhost:5108/api/Users/username/${search}`, {
            credentials: "include",
          });
          if (!res.ok) throw new Error("User not found");
          const userData = await res.json();
          navigate(`/profile/${userData.id}`);
          setSearch("");
        } catch (err) {
          console.error(err.message);
        }
      };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    return(
        <nav className="Nav">
            <form className="searchForm" onSubmit={handleSearchSubmit}>
                <input 
                    id="search"
                    type="text"
                    placeholder="Search Users"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to={(user && user.user) ? "/home" : "/login"}>Home</Link></li>
                <li><Link to={(user && user.user) ? `/profile/${user.user.id}` : "/login"}>Profile</Link></li>
                <li><Link to={(user && user.user) ? "/post" : "/login"}>New Post</Link></li>
                <li><Link to={(user && user.user) ? "/jokes" : "/login"}>Jokes</Link></li>
                <li><Link to={(user && user.user) ? "/quotes" : "/login"}>Quotes</Link></li>
                <li><Link onClick={handleLogout}>Logout</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;