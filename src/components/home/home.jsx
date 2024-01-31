import pendu from '../../../public/pendu.svg'
import '../home/home.css';

const Home = () => {
    return (
        <section className="home">
            <div className="container">
                <h1>Le <span>pendu !</span></h1>
                <p>
                    Le but du jeux est simple : deviner toute les lettres qui doivent composer un mot,
                    avec un nombre limité de tentatives et des thèmes fixés à l'avance.
                    A chaque fois que le joueur devine une lettre, celle-ci est affichée.
                    Dans le cas contraire, le dessin d'un pendu se met à apparaître...
                </p>
                <img src={pendu} />
            </div>
        </section>
    );
};

export default Home;
