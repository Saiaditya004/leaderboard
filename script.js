const leaderboard = document.getElementById('leaderboard');
const addPlayerForm = document.getElementById('addPlayerForm');
const playerNameInput = document.getElementById('playerName');
const playerWinsInput = document.getElementById('playerWins');
const playerDrawsInput = document.getElementById('playerDraws');
const playerLossesInput = document.getElementById('playerLosses');

let players = [];

addPlayerForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const playerName = playerNameInput.value;
  const playerWins = parseInt(playerWinsInput.value);
  const playerDraws = parseInt(playerDrawsInput.value);
  const playerLosses = parseInt(playerLossesInput.value);
  
  const playerPoints = (playerWins * 2) + playerDraws;

  const player = {
    name: playerName,
    wins: playerWins,
    draws: playerDraws,
    losses: playerLosses,
    points: playerPoints
  };

  players.push(player);

  renderLeaderboard();
  
  addPlayerForm.reset();
});

function renderLeaderboard() {
  leaderboard.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Player Name</th>
          <th>Wins</th>
          <th>Draws</th>
          <th>Losses</th>
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
