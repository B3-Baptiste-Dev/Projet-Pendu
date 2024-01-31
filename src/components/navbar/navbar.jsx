import {NavLink} from "react-router-dom";
import '../navbar/navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul className="links">
                <li><NavLink className="link" to="/">Accueil</NavLink></li>
                <li><NavLink className="link" to="/play">Jouer</NavLink></li>
                <li><NavLink className="link" to="/statistics">Statistiques</NavLink></li>
            </ul>
        </nav>
    )
};

export default Navbar;
