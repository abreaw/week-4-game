


// -----------------------------------------------------------------------------------------------
// Global Variables Defined Here
// -----------------------------------------------------------------------------------------------

var charSelectionCount = 4; // might need this if I add more characters later??

var currentEnemy;
var currentPlayer;
var charHealth;
var enemyHealth;

var imgWidth = "150px";
var imgHeight = "200px";


// -----------------------------------------------------------------------------------------------
// character object to hold the name, image, hp and counter attack info for each character in the game
// -----------------------------------------------------------------------------------------------
var charRey = {

	charName: "Rey",
	charImage: "assets/images/071e0c1c4323f477e6272dab6153ab22.jpg",
	charHP: 100,
	charAttack: 10,
	charCounterAttack: 5,
	isPlayer: false,
	isEnemy: false,

}

var charLeia = {

	charName: "Princess Leia",
	charImage: "assets/images/d3dab1e853245b37565836cc185b759f.jpg",
	charHP: 150,
	charAttack: 15,
	charCounterAttack: 10,
	isPlayer: false,
	isEnemy: false,

}

var charKylo = {

	charName: "Kylo Ren",
	charImage: "assets/images/8e7d7c3e88672062e95e32fc06493d1b.jpg",
	charHP: 200,
	charAttack: 20,
	charCounterAttack: 15,
	isPlayer: false,
	isEnemy: false,

}

var charBoba = {

	charName: "Boba Fett",
	charImage: "assets/images/a1ba8daac41c385e79fc5315b1679ca1.jpg",
	charHP: 80,
	charAttack: 5,
	charCounterAttack: 3,
	isPlayer: false,
	isEnemy: false,

}

// character object array
var charArray = [charRey, charLeia, charKylo, charBoba];

// elements created to hold the character objects info
// might need this to hold all the elements created for the character items (or can use jQuery to select / find them)
var charElementArray = [];

// create an object that sets up the possible user messages displayed during the game
var userMessages = {
    // types of messages w/ values
    chooseChar: "Click to select your character.",
    chooseEnemy: "Click an enemy to battle.",
    youLost: "So sorry you didn't guess it right this time.",
    youWon: "Yay! You won!",

    // check to see if userMessages object methods working properly
    displayAllMsgs: function() {
    	console.log("userMessages loaded");
    	console.log(this.chooseChar);
    	console.log(this.chooseEnemy);
    	console.log(this.youLost);
    	console.log(this.youWon);
    },
};



// -----------------------------------------------------------------------------------------------
// JavaScript function that wraps everything
// -----------------------------------------------------------------------------------------------
$(document).ready(function() {


	// create characters on page
	console.log("charRey = " + charRey);

	// for (var i = 0; i < charArray.length; i++) {
	// 	createCharView(charArray[i], "char" + (i+1), i);
	// }

	resetGame(true);

	


});


// -----------------------------------------------------------------------------------------------
// listen for character click
// -----------------------------------------------------------------------------------------------
$(".characters").on("click", function() {

	// move that character to the your character section - #your-character
	// console.log($(this.id));
	// currentPlayer = $(this.id);
	// console.log(currentPlayer);

	// currentPlayer = $(this).attr("id");
	// console.log(currentPlayer);

	currentPlayer = $(this).attr("class", "char-name").text();
	console.log(currentPlayer);

	// set the isPlayer to true
	// move the rest of the characters to the Enemies section
	// change the user message to show the user to select their first enemy to battle - userMessages.chooseEnemy



});


// -----------------------------------------------------------------------------------------------
// listen for attack button click 
// -----------------------------------------------------------------------------------------------
$("#attack").on("click", function() {


});



// -----------------------------------------------------------------------------------------------
// Functions Defined Here
// -----------------------------------------------------------------------------------------------


// create the view of the character on the page
function createCharView (char, divArea, arrayIndex) {

	console.log("char = " + char.charName + ", " + char.charImage + ", " + char.charHP + ", " + char.charAttack + ", " + char.charCounterAttack);
	console.log("divArea = " + divArea);

	// create element inside the divArea
	
	// create name tag
	var pName = $("<p>");
	pName.addClass("char-name");
	pName.text(char.charName);
	pName.appendTo("#" + divArea);

	// create image
	var imgTag = $("<img>");
	imgTag.addClass("char-image");
	imgTag.attr("src", char.charImage);
	imgTag.attr("width", imgWidth);
	imgTag.attr("height", imgHeight);
	// imgTag.text(char.charImage);
	imgTag.appendTo("#" + divArea);

	// create healthpoints view
	var pHP = $("<p>");
	pHP.addClass("char-hp");
	pHP.text(char.charHP);
	pHP.appendTo("#" + divArea);

}

// function to reset the game
function resetGame (newLoad) {

	if (!newLoad) {
		// empty opponent id
		// empty select-defender id
		// disable attack button
		// empty your-character id
		// reset isPlayer & isEnemy back to false (if this is needed)
	}


	$("#user-msgs").text(userMessages.chooseChar);

	// run createCharView function for all characters
	for (var i = 0; i < charArray.length; i++) {
		createCharView(charArray[i], "char" + (i+1), i);
	}


}




// -----------------------------------------------------------------------------------------------
// 
// -----------------------------------------------------------------------------------------------