// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './play.css';

const maxTries = 6;

function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const Play = () => {
    const [word, setWord] = useState('');
    const [guessed, setGuessed] = useState([]);
    const [tries, setTries] = useState(0);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [winnerName, setWinnerName] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [proposedWord, setProposedWord] = useState('');
    const [lost, setLost] = useState(false);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        fetchWord();
    }, []);

    const fetchWord = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://raw.githubusercontent.com/nmondon/mots-frequents/master/data/frequence.json');
            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status}`);
            }
            const mots = await response.json();
            const randomIndex = Math.floor(Math.random() * mots.length);
            const motObject = mots[randomIndex];
            if (motObject && motObject.label) {
                const randomMot = motObject.label;
                const wordWithoutAccents = removeAccents(randomMot.toUpperCase());
                setWord(wordWithoutAccents);
                setGuessed(Array(wordWithoutAccents.length).fill('_'));
            } else {
                throw new Error('Le mot récupéré est undefined ou non valide');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du mot:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGuess = (letter) => {
        if (gameOver || guessed.includes(letter) || wrongLetters.includes(letter) || lost) return;

        let newGuessed = guessed.slice(); // Créez une copie de l'état 'guessed'

        if (word.includes(letter)) {
            newGuessed = newGuessed.map((l, idx) => word[idx] === letter ? letter : l);
            setGuessed(newGuessed);

            if (newGuessed.join('') === word) {
                setGameOver(true);
                setPoints(points + 2); // +2 points pour trouver le mot uniquement grâce aux lettres
            }
        } else {
            setTries(tries + 1);
            setWrongLetters([...wrongLetters, letter]);

            if (tries + 1 >= maxTries) {
                setLost(true);
                setGameOver(true);
            }
        }
    };


    console.log(word)
    const handleRestart = () => {
        fetchWord();
        setTries(0);
        setWrongLetters([]);
        setGameOver(false);
        setWinnerName('');
        setProposedWord('');
        setLost(false);
    };
    const handleContinueGame = () => {
        fetchWord();
        setTries(0);
        setWrongLetters([]);
        setGameOver(false);
        setProposedWord('');
        setLost(false);
    };

    const handleProposeWord = () => {
        if (proposedWord.toUpperCase() === word) {
            setGuessed(word.split(''));
            setGameOver(true);
            setLost(false);
            const lettersLeft = word.split('').filter(l => !guessed.includes(l)).length;
            setPoints(points + 2 + lettersLeft); // +2 points et +1 pour chaque lettre restante
        } else {
            setPoints(points - 2);
            const newTries = tries + 1;
            setTries(newTries);
            if (newTries >= maxTries) {
                setLost(true);
                setGameOver(true);
            }
        }
    };

    const handleWinnerNameChange = (e) => {
        setWinnerName(e.target.value);
    };

    const handleSaveWinner = () => {
        const savedPlayerData = JSON.parse(localStorage.getItem('playerData')) || {};

        if (winnerName) {
            if (!savedPlayerData[winnerName]) {
                savedPlayerData[winnerName] = { victories: 0, gamesPlayed: 0, losses: 0, points: 0 };
            }

            savedPlayerData[winnerName].gamesPlayed += 1;

            if (!lost) {
                savedPlayerData[winnerName].victories += 1;
                savedPlayerData[winnerName].points = (savedPlayerData[winnerName].points || 0) + points;
            } else {
                savedPlayerData[winnerName].losses += 1;
            }

            localStorage.setItem('playerData', JSON.stringify(savedPlayerData));
            setWinnerName('');
        }

        handleRestart();
    };


    const renderButton = (letter) => (
        <button
            key={letter}
            onClick={() => {
                if (!gameOver && !guessed.includes(letter) && !wrongLetters.includes(letter) && !loading) {
                    handleGuess(letter);
                }
            }}
            disabled={guessed.includes(letter) || wrongLetters.includes(letter) || loading || gameOver}
            className={guessed.includes(letter) || wrongLetters.includes(letter) ? 'guessed' : ''}
        >
            {letter}
        </button>
    );


    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="play">
            <div className="hangman-container">
                <img src={`/${tries}.png`} alt="Hangman" className="hangman-image" />
            </div>
            <div className="word-container">
                {guessed.map((letter, index) => (
                    <span key={index} className="letter">{letter}</span>
                ))}
            </div>
            <div className="letter-buttons">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(renderButton)}
            </div>
            {!gameOver && !lost && (
                <div className="propose-word-container">
                    <input
                        type="text"
                        value={proposedWord}
                        onChange={(e) => setProposedWord(e.target.value)}
                        placeholder="Proposez un mot"
                        className="propose-word-input"
                    />
                    <button onClick={handleProposeWord} className="propose-word-button">
                        Proposer ce mot
                    </button>
                </div>
            )}
            {gameOver && (
                gameOver ? (
                    <div className="propose-container">
                        {lost ? (
                            <div className="lose-message">Perdu! Le mot était {word}</div>
                        ) : (
                            <div className="win-message">Gagné ! Entrez votre nom:</div>
                        )}
                        <input className="propose-word-input" type="text" value={winnerName} onChange={handleWinnerNameChange}/>
                        <button className="propose-word-button" onClick={handleSaveWinner}>Enregistrer</button>
                        <button className="propose-word-button" onClick={handleContinueGame}>Continuer à jouer</button>
                    </div>
                ) : (
                    <div className="lose-message">Perdu ! Le mot était {word} </div>
                )
            )}
            <div className="propose-container">
                {gameOver && <button className="propose-word-button" onClick={handleRestart}>Recommencer</button>}
            </div>
        </div>
    );
}

export default Play;
