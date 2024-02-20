import React from "react";
import { NavLink } from "react-router-dom";
import useSound from "use-sound";
import soundPlay from "../../assets/sounds/shark.mp3";
import '../navbar/navbar.css';

const Navbar = () => {
    const [play] = useSound(soundPlay);

    const SoundButton = () => {
        const handleClick = () => {
            play();
        };

        return (
            <NavLink className="link" to="/play" onClick={handleClick}>
                Jouer
            </NavLink>
        );
    };

    return (
        <nav>
            <ul className="links">
                <li><NavLink className="link" to="/">Accueil</NavLink></li>
                <li><SoundButton /></li>
                <li><NavLink className="link" to="/statistics">Statistiques</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
