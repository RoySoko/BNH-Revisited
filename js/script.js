// Bear, Ninja, Hunter — Functions 1 (Revisited)

(() => {
  const CHOICES = ["Bear", "Ninja", "Hunter"];

  // Running totals 
  let playerWins = 0;
  let computerWins = 0;

  // Elements
  const resultsSection = document.getElementById("results");
  const resultBox = document.getElementById("result-box");
  const score = document.getElementById("score");
  const playAgainBtn = document.getElementById("play-again");
  const choiceButtons = document.querySelectorAll(".choice");

  //  choice buttons
  choiceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const playerChoice = btn.dataset.choice;
      const computerChoice = getComputerChoice();
      const outcome = decideWinner(playerChoice, computerChoice);
      updateTotals(outcome);
      renderResults(playerChoice, computerChoice, outcome);
    });
  });

  // Back to initial display
  playAgainBtn.addEventListener("click", showInitial);

  function getComputerChoice() {
    const idx = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[idx];
  }


  // Bear > Hunter, Hunter > Ninja, Ninja > Bear
  function decideWinner(player, computer) {
    if (player === computer) return "tie";

    const winsAgainst = {
      Bear: "Hunter",
      Hunter: "Ninja",
      Ninja: "Bear",
    };

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

    // Centered win counter under the box
    score.textContent = `Your Wins: ${playerWins}   Computer Wins: ${computerWins}`;

    // Show results 
    resultsSection.classList.remove("hidden");
  }

  function showInitial() {
    // Hide results
    resultsSection.classList.add("hidden");
    resultBox.textContent = "";
    score.textContent = "";
  }
})();
