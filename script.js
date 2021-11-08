var deck = [];

var makeDeck = function () {
  deck = [];

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

//memes
var myImage = "";

//game mode
https: var gameMode = "NUMBER_OF_PLAYERS";
var playerTurn = 1;

//place all hands into an array. Dealer's hand is [0], player 1 is [1], player 2 is [2], etc.
var numberOfPlayers = 0; //## later add mode to change number of players ##
var handArray = [];
var createPlayerHands = function () {
  var playerIndex = 0;
  while (playerIndex <= numberOfPlayers) {
    handArray.push([]);
    playerIndex = playerIndex + 1;
  }
};

//checks to see if there are
var bustCounter = function () {
  var bustCountIndex = 1;
  var bustedHands = 0;
  while (bustCountIndex <= numberOfPlayers) {
    if (calcHandValue(bustCountIndex) > 21) {
      bustedHands += 1;
    }
    bustCountIndex += 1;
  }
  return bustedHands;
};

//checks for the number of Aces in a hand.
var aceCounter = function (handIndex) {
  var numberOfAces = 0;
  var aceChecker = 0;
  while (aceChecker < handArray[handIndex].length) {
    if (handArray[handIndex][aceChecker].rank == 1) {
      numberOfAces += 1;
    }
    aceChecker += 1;
  }
  return numberOfAces;
};

var calcHandValueBasic = function (arrayIndex) {
  //reset playerHandValue to 0 so that it resets before adding on to the global variable
  var handValue = 0;
  handIndex = 0;
  while (handIndex < handArray[arrayIndex].length) {
    handValue += handArray[arrayIndex][handIndex].value;
    handIndex += 1;
  }
  return handValue;
};

//calculates the value of the player's hand
var calcHandValue = function (arrayIndex) {
  //reset playerHandValue to 0 so that it resets before adding on to the global variable
  var handValue = 0;
  handIndex = 0;
  //add variable Ace.
  //first Ace counts as 11 unless it busts the hand.
  while (handIndex < handArray[arrayIndex].length) {
    handValue += handArray[arrayIndex][handIndex].value;
    handIndex += 1;
  }
  //if variable ace conditions are met, add 10 to score (1+10 ==11)
  if (aceCounter(arrayIndex) >= 1 && calcHandValueBasic(arrayIndex) <= 11) {
    handValue += 10;
  }
  return handValue;
};

//determines the value of the lowest hand so that the dealer can try to beat it;
// doesn't need to determine which hand that is.
var lowestHandValue = function () {
  var handScores = [];
  var index = 1;
  while (index <= numberOfPlayers) {
    handScores.push(calcHandValue(index));
    index += 1;
  }
  //sort array in ascending order
  handScores.sort(function (a, b) {
    return a - b;
  });
  return handScores[0];
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
    return true;
  } else {
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
  //handIndex refers to the index of the relevant hand in the varriable 'handArray'
  var index = 0;

  if (handIndex == 0) {
    var playerHandDisplay = `Dealers hand: <br>`;
  } else {
    var playerHandDisplay = `Player ${playerTurn}'s hand<br>`;
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

var howManyPlayers = function (input) {
  myImage = '<img src="https://c.tenor.com/4k6A05gkZ2MAAAAM/doge-coin.gif"/>';

  statementHowManyPlayers =
    "How many players will be playing in this game? (1-4)<br><br>" + myImage;
  numberOfPlayers = input;
  if (numberOfPlayers >= 1 && numberOfPlayers <= 4) {
    numberOfPlayers = input;
    gameMode = "FIRST_DEAL";
    statementHowManyPlayers = `You have decided on ${numberOfPlayers} players. Nice! <br><br>Player 1, click the button.`;
  }
  return statementHowManyPlayers;
};

var firstDeal = function (input) {
  //[0] is dealer, [1] is player 1, [2] is player 2 etc.
  hit(playerTurn);
  hit(playerTurn);

  var imageWot =
    '<img src="https://c.tenor.com/WDC0uCWW_8kAAAAM/doge-loop.gif"/>';
  var statementFirstDeal = displayPlayerHand(playerTurn);

  if (calcHandValue(playerTurn) == 21) {
    statementFirstDeal += `21 Blackjack! Click the button to continue.`;
    if (playerTurn == numberOfPlayers) {
      gameMode = "DEALER_DRAWS";
      return statementFirstDeal;
    }
    if (playerTurn < numberOfPlayers) {
      gameMode = "FIRST_DEAL";
      playerTurn += 1;
      return statementFirstDeal;
    }
  } else {
    statementFirstDeal += `Hit (h) or Stand (s)?<br><br>` + imageWot;
  }
  gameMode = "PLAYER_HIT_STAND";
  return statementFirstDeal;
};

var hit = function (arrayIndex) {
  handArray[arrayIndex].push(deck.pop());
};

var playerHitStand = function (input) {
  myImage =
    '<img src ="https://c.tenor.com/DMWqIb2Rdp4AAAAj/bonk-cheems.gif"/>';
  var statementPlayerHitStand =
    "Please enter either hit (h) or stand (s) to proceed.<br><br>" + myImage;
  //player HITS
  if (input == "hit" || input == "h") {
    statementPlayerHitStand = "";
    hit(playerTurn);
    if (determineIfBust(playerTurn) == true) {
      var myBustImage =
        '<img src ="https://c.tenor.com/VuaozB5F-g0AAAAM/sad-sad-arizion.gif"/>';
      statementPlayerHitStand =
        displayPlayerHand(playerTurn) + `BUST!!!!<br><br>` + myBustImage;

      gameMode = "FIRST_DEAL";
      //if last player, change game mode
      if (playerTurn == numberOfPlayers) {
        gameMode = "DEALER_DRAWS";
      }
      //if last player, change game mode
      if (playerTurn < numberOfPlayers) {
        playerTurn += 1;
      }
    }
    //
    else if (determineIfBust(playerTurn) == false) {
      statementPlayerHitStand =
        displayPlayerHand(playerTurn) + `Hit (h) or Stand (s)?<br><br>`;

      if (calcHandValue(playerTurn) == 21) {
        var myBlackjackImage =
          '<img src ="https://c.tenor.com/-9Gb0lDJbzQAAAAM/dogecoin-notkdk3.gif"/>';
        statementPlayerHitStand =
          displayPlayerHand(playerTurn) +
          `BLACKJACK! <br> Click the button to continue. <br><br>` +
          myBlackjackImage;

        if (playerTurn == numberOfPlayers) {
          gameMode = "DEALER_DRAWS";
        }
        if (playerTurn < numberOfPlayers) {
          playerTurn += 1;
          gameMode = "FIRST_DEAL";
        }
        return statementPlayerHitStand;
      }
    }
  }
  //player STANDS
  else if (input == "stand" || input == "s") {
    statementPlayerHitStand = "";
    var standImage =
      '<img src="https://c.tenor.com/HS69Dl_aljwAAAAj/pet-the-peepo-doge.gif"/>';
    if (playerTurn == numberOfPlayers) {
      gameMode = "DEALER_DRAWS";
      statementPlayerHitStand =
        displayPlayerHand(playerTurn) +
        `You have chosen to stand.<br><br>Click the button to see the dealer's move. <br><br>${standImage}`;
    } else if (playerTurn < numberOfPlayers) {
      statementPlayerHitStand =
        displayPlayerHand(playerTurn) +
        `You have chosen to stand.<br><br>Player ${
          playerTurn + 1
        }, click the button. <br><br>${standImage}`;
      playerTurn += 1;
      gameMode = "FIRST_DEAL";
    }
  }
  return statementPlayerHitStand;
};

var dealerDraws = function (input) {
  if (handArray[0].length == 0) {
    hit(0);
    hit(0);
  }

  var statementDealerDraws = `Dealer's turn... <br><br> ${displayPlayerHand(
    0
  )}`;

  //dealer hits if his hand value is less than X or his hand value is less than the lowest player's hand value
  //dealer always attempts to beat the weakest hand.
  // if there are >1 players already bust, dealer will stand when his hand value is <19

  //if there are no busts, dealer takes greater risk
  if (bustCounter() == 0) {
    while (
      calcHandValue(0) < 15 ||
      (determineIfBust(0) == false && calcHandValue(0) < lowestHandValue())
    ) {
      hit(0);
      statementDealerDraws += `Dealer hits and draws ${
        handArray[0][handArray[0].length - 1].name
      } of ${
        handArray[0][handArray[0].length - 1].suit
      }.<br>The hand now adds up to ${calcHandValue(0)}. <br><br>`; //get last element in the array
    }
  }
  // if there are some busts, dealer stops when his hand value is lower. (Dealer always beats at least 1 player)
  else if (bustCounter() > 1) {
    while (calcHandValue(0) < 13) {
      hit(0);
      statementDealerDraws += `Dealer hits and draws ${
        handArray[0][handArray[0].length - 1].name
      } of ${
        handArray[0][handArray[0].length - 1].suit
      }.<br>The hand now adds up to ${calcHandValue(0)}. <br><br>`; //get last element in the array
    }
  }
  gameMode = "GAME_RESULT";
  if (calcHandValue(0) > 21) {
    statementDealerDraws += `Dealer goes bust! <br><br>`;
  }
  return statementDealerDraws;
};

//PROBLEM: undefined when dealer goes bust
var gameResult = function (input) {
  var winImage =
    '<img src="https://c.tenor.com/KwNKtS5KFjkAAAAM/doge-dogecoin.gif"/>';
  var loseImage =
    '<img src="https://c.tenor.com/9Qj7BES0hGcAAAAM/tears-sad.gif"/>';
  var drawImage =
    '<img src="https://c.tenor.com/KLXs9rkAM2YAAAAM/dog-smiling.gif"/>';
  var winImage2 =
    '<img src="https://c.tenor.com/sTFc7j1xRJ0AAAAM/doge-dancing-doge.gif"/>';
  var loseImage2 =
    '<img src="https://c.tenor.com/AEeVoflw4wAAAAAj/ree-dog.gif"/>';
  var drawImage2 =
    '<img src="https://c.tenor.com/5GuiADwo8YAAAAAM/doge-walking-doge-bread.gif"/>';

  var gameResultStatement = `The dealer's hand has a value of ${calcHandValue(
    0
  )}<br><br>`;

  // if dealer [0] goes bust
  if (determineIfBust(0) == true) {
    var resultIndex = 1;
    while (resultIndex <= numberOfPlayers) {
      gameResultStatement += `Player ${resultIndex}'s hand has a value of ${calcHandValue(
        resultIndex
      )}.<br>`;
      //if player also goes bust, DRAW.
      if (determineIfBust(resultIndex) == true) {
        gameResultStatement += `Player ${resultIndex} also went bust and DRAWS with the dealer! Everybodu sucks :( <br> ${drawImage2} <br><br>`;
      }

      //if player does not go bust, player WINS
      if (determineIfBust(resultIndex) == false) {
        gameResultStatement += `Player ${resultIndex} WINS! Low hanging fruit bro. <br> ${winImage2} <br><br>`;
      }
      resultIndex += 1;
    }
  }

  // if dealer does not go bust
  else if (determineIfBust(0) == false) {
    var resultIndex = 1;
    while (resultIndex <= numberOfPlayers) {
      gameResultStatement += `Player ${resultIndex}'s hand has a value of ${calcHandValue(
        resultIndex
      )}.<br>`;
      //determine if the player loses to the dealer.
      if (
        determineIfBust(resultIndex) == true ||
        calcHandValue(0) > calcHandValue(resultIndex)
      ) {
        gameResultStatement +=
          `Player ${resultIndex} LOSES! You got owned hard by the dealer, sucka!<br>` +
          loseImage +
          `<br><br>`;
      }

      //determine if the player beats the dealer.
      else if (calcHandValue(0) < calcHandValue(resultIndex)) {
        gameResultStatement +=
          `Player ${resultIndex} WINS! Comeback is real<br>` +
          winImage +
          `<br><br>`;
      }

      //determine if it's a draw
      else {
        gameResultStatement +=
          `Player ${resultIndex} DRAWS with the dealer. Lame stuff<br>` +
          drawImage +
          `<br><br>`;
      }
      resultIndex += 1;
    }
  }
  gameResultStatement += `<br><br>Click the button to restart the game.`;
  gameMode = "FIRST_DEAL";
  playerTurn = 1;
  return gameResultStatement;
};

var main = function (input) {
  if (gameMode == "NUMBER_OF_PLAYERS") {
    return howManyPlayers(input);
  } else if (gameMode == "FIRST_DEAL") {
    if (playerTurn == 1) {
      //functions to be called before the game starts.
      makeDeck();
      shuffleCards(deck);
      handArray = [];
      createPlayerHands();
    }
    return firstDeal();
  } else if (gameMode == "PLAYER_HIT_STAND") {
    return playerHitStand(input);
  } else if (gameMode == "DEALER_DRAWS") {
    return dealerDraws();
  } else if (gameMode == "GAME_RESULT") {
    return gameResult();
  }
};
