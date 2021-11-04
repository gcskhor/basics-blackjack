var makeDeck = function () {
  var deck = [];

  var suits = ["diamonds", "clubs", "hearts", "spades"];
  var suitsIndex = 0;

  while (suitsIndex < suits.length) {
    var currentSuit = suits[suitsIndex];

    var rankIndex = 1;

    while (rankIndex <= 13) {
      //convert special card name cases to names - e.g ace, king, queen
      var currentName = String(rankIndex);
      if (rankIndex == 1) {
        currentName = "Ace";
      } else if (rankIndex == 11) {
        currentName = "Jack";
      } else if (rankIndex == 12) {
        currentName = "Queen";
      } else if (rankIndex == 13) {
        currentName = "King";
      }

      var cardValue = rankIndex;
      if (rankIndex == 11 || rankIndex == 12 || rankIndex == 13) {
        cardValue = 10;
      }

      var card = {
        suit: currentSuit,
        rank: rankIndex,
        value: cardValue,
        name: currentName,
      };
      deck.push(card);

      rankIndex += 1;
    }

    suitsIndex += 1;
  }
  return deck;
};

// generate random numbers for the deck shuffle function
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
//Shuffle the cards in the deck array.
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

//game mode
var gameMode = "FIRST_DEAL";
var playerTurn = 1;

//place all hands into an array. Dealer's hand is [0], player 1 is [1], player 2 is [2], etc.
var numberOfPlayers = 1; //## later add mode to change number of players ##
var handArray = [];
var createPlayerHands = function () {
  var playerIndex = 0;
  while (playerIndex <= numberOfPlayers) {
    handArray.push([]);
    playerIndex = playerIndex + 1;
  }
};

//player's initial cards
var playerHand = [];
//the value of player's hand
var playerHandValue = 0;

//dealer's hand
var dealerHand = [];
var dealerHandValue = 0;

//global variables for checking conditions
var checkBlackJack = false;
var checkBust = false;
var checkLow = false;

//calculates the value of the player's hand
var calcHandValue = function (arrayIndex) {
  //reset playerHandValue to 0 so that it resets before adding on to the global variable
  var handValue = 0;
  handIndex = 0;
  while (handIndex < handArray[arrayIndex].length) {
    handValue += handArray[arrayIndex][handIndex].value;
    handIndex += 1;
  }
  return handValue;
};

//CHECKING FUNCTIONS
//function to determine if the player has a blackjack (playerHand == 21);
var determineIfBlackJack = function (arrayIndex) {
  if (calcHandValue(arrayIndex) == 21) {
    return true;
  } else {
    return false;
  }
};
//function to determine if player has gone bust (playerHand > 21)
var determineIfBust = function (arrayIndex) {
  if (calcHandValue(arrayIndex) > 21) {
    console.log("a");
    return true;
  } else {
    console.log("b");
    return false;
  }
};
//function to determine if the player hand value is low and if the player should hit (playerHand < 12)
var determineIfLow = function (arrayIndex) {
  if (calcHandValue(arrayIndex) < 12) {
    console.log(" low");
    return true;
  } else {
    console.log("not low");
    return false;
  }
};

var displayPlayerHand = function (handIndex) {
  var index = 0;

  if (handIndex == 0) {
    var playerHandDisplay = "Dealer's hand: <br>";
  } else {
    var playerHandDisplay = `Player ${playerTurn}'s hand:<br>`;
  }

  while (index < handArray[handIndex].length) {
    playerHandDisplay += `${handArray[handIndex][index].name} of ${handArray[handIndex][index].suit}<br>`;
    index += 1;
  }
  playerHandDisplay += `<br> The hand totals up to ${calcHandValue(
    handIndex
  )}. <br><br>`;
  return playerHandDisplay;
};

var firstDeal = function (input) {
  //[0] is dealer
  hit(0);
  hit(0);
  // [1] is player 1.
  hit(playerTurn);
  hit(playerTurn);

  // playerHand.push(deck.pop());
  // playerHand.push(deck.pop());

  calcHandValue(playerTurn);

  var statementFirstDeal = displayPlayerHand(playerTurn);

  if (checkBlackJack == true) {
    statementFirstDeal += `21 Blackjack! Let's see what the dealer got.`;
    gameMode = "DEALER_DRAWS";
  } else {
    statementFirstDeal += `Hit (h) or Stand (s)?<br><br>`;
  }
  gameMode = "PLAYER_HIT_STAND";
  return statementFirstDeal;
};

var playerHit = function () {
  playerHand.push(deck.pop());
};

var hit = function (arrayIndex) {
  handArray[arrayIndex].push(deck.pop());
};

var playerHitStand = function (input) {
  var statementPlayerHitStand =
    "Please enter either hit (h) or stand (s) to proceed.";
  if (input == "hit" || input == "h") {
    statementPlayerHitStand = "";
    hit(playerTurn);
    if (determineIfBust(playerTurn) == true) {
      gameMode = "PLAYER_OUT";
      statementPlayerHitStand =
        displayPlayerHand(playerTurn) +
        ` You have gone BUST!!!! you lose.<br><br>`;
    } else {
      statementPlayerHitStand =
        displayPlayerHand(playerTurn) + `Hit (h) or Stand (s)?<br><br>`;
    }
  } else if (input == "stand" || input == "s") {
    statementPlayerHitStand = "";
    gameMode = "DEALER_DRAWS";
    statementPlayerHitStand =
      displayPlayerHand(playerTurn) +
      `You have chosen to stand.<br><br>Click the button to see the dealer's move. <br><br>`;
  }
  return statementPlayerHitStand;
};

var dealerDraws = function (input) {
  var statementDealerDraws = `Dealer's turn... <br><br> ${displayPlayerHand(
    0
  )}`;

  //dealer hits if his hand value is less than
  if (calcHandValue(0) < 13) {
    hit(0);
    statementDealerDraws += `Dealer hits and draws ${
      handArray[0][handArray[0].length - 1].name
    } of ${handArray[0][handArray[0].length - 1].suit}. <br><br>`; //get last element in the array
  } else {
    gameMode = "GAME_RESULT";
  }

  if (calcHandValue(0) > 21) {
    statementDealerDraws += `Dealer goes bust! <br><br>`;
  }
  return statementDealerDraws;
};

//functions to be called before the game starts.
shuffleCards(deck);
createPlayerHands();

var main = function (input) {
  if (gameMode == "FIRST_DEAL") {
    return firstDeal(input);
  } else if (gameMode == "PLAYER_HIT_STAND") {
    return playerHitStand(input);
  } else if (gameMode == "DEALER_DRAWS") {
    return dealerDraws(input);
  } else if (gameMode == "PLAYER_OUT") {
    return playerOut();
  }
};
