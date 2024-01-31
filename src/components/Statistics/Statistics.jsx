import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './Statistics.css';

function Statistics() {
    const [playerData, setPlayerData] = useState({});
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        const savedPlayerData = {
            'Alice': { victories: 3, gamesPlayed: 10, losses: 2 },
            'Bob': { victories: 2, gamesPlayed: 8, losses: 1 },
            'Charlie': { victories: 5, gamesPlayed: 15, losses: 5 }
        };

        setPlayerData(savedPlayerData);
    }, []);

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);
    };

    const data = selectedPlayer ? {
        labels: ['Victoires', 'Parties Jouées', 'Défaites'],
        datasets: [
            {
                label: `Statistiques de ${selectedPlayer}`,
                data: Object.values(playerData[selectedPlayer]),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    } : {};

    return (
        <div className="statistics">
            <h2>Statistiques du Jeu du Pendu</h2>

            <div className="winners-section">
                <h3>Joueurs</h3>
                <ul>
                    {Object.keys(playerData).sort().map((player, index) => (
                        <li key={index} onClick={() => handlePlayerClick(player)}>
                            {player}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedPlayer && (
                <div className="player-graph-section">
                    <h3>Statistiques de {selectedPlayer}</h3>
                    <Bar data={data} />
                </div>
            )}
        </div>
    );
}

export default Statistics;
