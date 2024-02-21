const leaderboard = document.getElementById('leaderboard');
const addPlayerForm = document.getElementById('addPlayerForm');
const playerNameInput = document.getElementById('playerName');
const playerWinsInput = document.getElementById('playerWins');
const playerDrawsInput = document.getElementById('playerDraws');
const playerLossesInput = document.getElementById('playerLosses');

let players = [];

addPlayerForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const playerName = playerNameInput.value.trim();
  const playerWins = parseInt(playerWinsInput.value);
  const playerDraws = parseInt(playerDrawsInput.value);
  const playerLosses = parseInt(playerLossesInput.value);
  
  const playerMatches = playerWins + playerDraws + playerLosses;
  const playerPoints = (playerWins * 2) + playerDraws;

  const existingPlayerIndex = players.findIndex(player => player.name === playerName);
  if (existingPlayerIndex !== -1) {
    // If player exists, update the existing entry
    players[existingPlayerIndex].wins = playerWins;
    players[existingPlayerIndex].draws = playerDraws;
    players[existingPlayerIndex].losses = playerLosses;
    players[existingPlayerIndex].matches = playerMatches;
    players[existingPlayerIndex].points = playerPoints;
  } else {
    // If player doesn't exist, add a new entry
    const player = {
      name: playerName,
      wins: playerWins,
      draws: playerDraws,
      losses: playerLosses,
      matches: playerMatches,
      points: playerPoints
    };
    players.push(player);
  }

  sortLeaderboard();
  renderLeaderboard();
  
  addPlayerForm.reset();
});

function sortLeaderboard() {
  players.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points; // Sort by points (descending)
    }
    if (a.wins !== b.wins) {
      return b.wins - a.wins; // If points are equal, sort by wins (descending)
    }
    return b.matches - a.matches; // If both points and wins are equal, sort by matches played (descending)
  });
}

function renderLeaderboard() {
  leaderboard.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Player Name</th>
          <th>Wins</th>
          <th>Draws</th>
          <th>Losses</th>
          <th>Matches Played</th>
          <th>Points</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${players.map((player, index) => `
          <tr>
            <td>${player.name}</td>
            <td>${player.wins}</td>
            <td>${player.draws}</td>
            <td>${player.losses}</td>
            <td>${player.matches}</td>
            <td>${player.points}</td>
            <td><button onclick="deletePlayer(${index})">Delete</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function deletePlayer(index) {
  players.splice(index, 1);
  renderLeaderboard();
}
