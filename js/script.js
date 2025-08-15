(() => {
  const CHOICES = ["Bear", "Ninja", "Hunter"];
  let playerWins = 0;
  let computerWins = 0;

  const resultsSection = document.getElementById("results");
  const resultBox = document.getElementById("result-box");
  const score = document.getElementById("score");
  const playAgainBtn = document.getElementById("play-again");
  const choiceButtons = document.querySelectorAll(".choice");

  choiceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const playerChoice = btn.dataset.choice;
      const computerChoice = getComputerChoice();
      const outcome = decideWinner(playerChoice, computerChoice);
      updateTotals(outcome);
      renderResults(playerChoice, computerChoice, outcome);
    });
  });

  playAgainBtn.addEventListener("click", showInitial);

  function getComputerChoice() {
    const idx = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[idx];
  }

  function decideWinner(player, computer) {
    if (player === computer) return "tie";
    const winsAgainst = { Bear: "Hunter", Hunter: "Ninja", Ninja: "Bear" };
    return winsAgainst[player] === computer ? "player" : "computer";
  }

  function updateTotals(outcome) {
    if (outcome === "player") playerWins += 1;
    else if (outcome === "computer") computerWins += 1;
  }

  function renderResults(player, computer, outcome) {
    const outcomeText =
      outcome === "player" ? "You win!" :
      outcome === "computer" ? "The computer wins!" :
      "It's a tie!";

    resultBox.innerHTML = `
      <div>You chose ${player}.</div>
      <div>The computer chose ${computer}.</div>
      <div>${outcomeText}</div>
    `;

    score.innerHTML = `
      <div>Your Wins: ${playerWins}</div>
      <div>Computer Wins: ${computerWins}</div>
    `;

    resultsSection.classList.remove("hidden");
  }

  function showInitial() {
    resultsSection.classList.add("hidden");
    resultBox.textContent = "";
    score.textContent = "";
  }
})();
