// Used to record how many times a letter can be pressed
var alphabet = ['a','b','c',
				  'd','e','f',
				  'g','h','i',
				  'j','k','l',
				  'm','n','o',
				  'p','q','r',
				  's','t','u',
				  'v','w','x',
				  'y','z'];

// Holds the all the words
var wordBank =['professorplum', 'mrspeacock', 'missscarlett', 'colonelmustard', 'mrswhite', 'mrgreen', 'wadsworth', 'mrboddy'
, 'wrench', 'candlestick', 'leadpipe', 'knife', 'revolver', 'rope'];

// Holds chosenWord
var chosenWord = "";

// Holds letters in word
var lettersInWord = [];

// Holds number of blanks in word
var numBlanks = 0;

// Holds blanks and successful guesses
var blanksAndSuccesses =[];

// Holds wrong guesses
var wrongLetters = [];

// Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 12;
var rightGuessCounter = 0;

// Functions
//----------------------------------------
function reset() {

	// Chooses word randombly from the wordBank
	chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	// Splits the chosen word into individual letters
	lettersInWord = chosenWord.split('');
	// Get the number of blanks
	numBlanks = lettersInWord.length;
	
	// Reset
	//===========================================================
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 12;
	wrongLetters =[];
	blanksAndSuccesses =[];

	test=false;
	startGame();
}

function startGame() {

	// Chooses word randombly from the wordBank
	chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];

	// Splits the chosen word into individual letters
	lettersInWord = chosenWord.split('');
	
	// Get the number of blanks
	numBlanks = lettersInWord.length;
	
	// Reset
	//===========================================================
	rightGuessCounter = 0;
	guessesLeft = 12;
	wrongLetters =[];
	blanksAndSuccesses =[];
	alphabet = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];

	// Populate blanks
	for(var i = 0; i< numBlanks; i++)
	{
		blanksAndSuccesses.push('_');
		document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
	}

	// Changes HTML 
	document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = loseCount;
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;
}

function compareLetters(userKey) {

				// If user key exists in chosen word then perform this function 
				if(chosenWord.indexOf(userKey) > -1)
				{
					for(var i = 0; i < numBlanks; i++)
					{
						// Fills in right index with user key
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							blanksAndSuccesses[i] = userKey;
							document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
						}	
					}
				}

				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;
					
					// Changes HTML
					document.getElementById('numGuesses').innerHTML = guessesLeft;
					document.getElementById('wrongGuesses').innerHTML = wrongLetters;
				}
}

function winLose() {

	// When the number blanks is filled with right letters then you win
	if(rightGuessCounter === numBlanks)
	{
		// Counts wins 
		winCount++;

		// Changes HTML
		document.getElementById('winCounter').innerHTML = winCount;
		alert('You Win');
		reset();
	}

	// When the number of Guesses reaches 0 then you lose
	else if(guessesLeft === 0)
	{
		// Counts losses
		loseCount++;

		// Changes HTML
		document.getElementById('lossCounter').innerHTML = loseCount;
		alert('You Lose');
		reset();
	}
}

// Hangman Game
//-------------------------------------------	
// Start the game
startGame();

document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < alphabet.length; i++)
	{	
		if(letterGuessed === alphabet[i] && test === true)
		{
			var spliceDword = alphabet.splice(i,1);
			compareLetters(letterGuessed);
			winLose();
		}
	}		
		
}