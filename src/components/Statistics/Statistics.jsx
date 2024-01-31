import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './Statistics.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function Statistics() {
    const [playerData, setPlayerData] = useState({});
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        const savedPlayerData = JSON.parse(localStorage.getItem('playerData')) || { wins: {}, losses: 0 };

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
    const options = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true
            },
            x: {
                type: 'category'
            }
        }
    };

    return (
        <div className="statistics">
            <h2>Statistiques du <span>Jeu du Pendu</span></h2>

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
                    <Bar data={data} options={options} />
                </div>
            )}
        </div>
    );
}

export default Statistics;
