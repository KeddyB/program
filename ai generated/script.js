const cardsArray = [
    "😀",
    "😂",
    "😍",
    "😎",
    "😇",
    "🥰",
    "😜",
    "🤩",
    "😡",
    "🥵",
    "😱",
    "👻",
  ];
  
  const gameBoard = document.getElementById("game-board");
  
  let firstCard = null;
  let secondCard = null;
  
  cardsArray.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = card;
    cardElement.addEventListener("click", () => {
      if (!firstCard) {
        firstCard = cardElement;
        firstCard.style.backgroundColor = "white";
      } else if (!secondCard) {
        secondCard = cardElement;
        secondCard.style.backgroundColor = "white";
        if (firstCard.textContent === secondCard.textContent) {
          firstCard.removeEventListener("click", flipCard);
          secondCard.removeEventListener("click", flipCard);
          firstCard = null;
          secondCard = null;
        } else {
          setTimeout(() => {
            firstCard.style.backgroundColor = "lightgray";
            secondCard.style.backgroundColor = "lightgray";
            firstCard = null;
            secondCard = null;
          }, 1000);
        }
      }
    });
    gameBoard.appendChild(cardElement);
  });
  