import {NavLink} from "react-router-dom";
import '../navbar/navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul className="links">
                <li><NavLink className="link" to="/">Home</NavLink></li>
                <li><NavLink className="link" to="/play">Play</NavLink></li>
                <li><NavLink className="link" to="/statistics">Statistics</NavLink></li>
            </ul>
        </nav>
    )
};

export default Navbar;
