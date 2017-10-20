


// -----------------------------------------------------------------------------------------------
// Global Variables Defined Here
// -----------------------------------------------------------------------------------------------

var charSelectionCount = 0; // might need this if I add more characters later??

var currentEnemy;
var currentPlayerElement;
var currentPlayer;
var charHealth;
var enemyHealth;
var charAttackPwr;
var enemyAttackPwr;

var userFightMsg = "";

var imgWidth = "150px";
var imgHeight = "200px";


// -----------------------------------------------------------------------------------------------
// character object to hold the name, image, hp and counter attack info for each character in the game
// -----------------------------------------------------------------------------------------------
var charRey = {

	charName: "Rey",
	charDataValue: "Rey",
	charImage: "assets/images/071e0c1c4323f477e6272dab6153ab22.jpg",
	charHP: 100,
	charAttack: 10,
	charCounterAttack: 5,

}

var charLeia = {

	charName: "Princess Leia",
	charDataValue: "Leia",
	charImage: "assets/images/d3dab1e853245b37565836cc185b759f.jpg",
	charHP: 150,
	charAttack: 15,
	charCounterAttack: 10,

}

var charKylo = {

	charName: "Kylo Ren",
	charDataValue: "Kylo",
	charImage: "assets/images/8e7d7c3e88672062e95e32fc06493d1b.jpg",
	charHP: 200,
	charAttack: 20,
	charCounterAttack: 15,

}

var charBoba = {

	charName: "Boba Fett",
	charDataValue: "Boba",
	charImage: "assets/images/a1ba8daac41c385e79fc5315b1679ca1.jpg",
	charHP: 80,
	charAttack: 5,
	charCounterAttack: 3,

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
    attackEnemy: "Click the 'Attack' button to battle.",
    youLost: "You have been defeated! Pick wisely next time you must!",
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
// JavaScript function that executes on load of page
// -----------------------------------------------------------------------------------------------
$(document).ready(function() {


	// create characters on page
	resetGame(true);


});


// -----------------------------------------------------------------------------------------------
// listen for character click in select-character id section
// -----------------------------------------------------------------------------------------------
$("#select-character").on("click", ".characters", function() {  
// trying w/ event delegation in place since the new items added to the other divs will need this to run
// https://learn.jquery.com/events/event-delegation/

	// move that character to the your character section - #your-character

	// grab the selection made by the user
	currentPlayerElement = $("#" + $(this).attr("id"));
	
	// get current character info 
	currentPlayer = getCharInfo($(this).attr("value"));
	
	// set hp & attack power variable
	charHealth = currentPlayer.charHP;
	charAttackPwr = currentPlayer.charAttack;
	
	// remove alignment property on the currentPlayer Element
	$(currentPlayerElement).removeClass("align-characters");

	// add current-char class to change background & font color
	$(currentPlayerElement).addClass("current-char");

	// move current character to the #your-character section
	$("#your-character").append(currentPlayerElement);

	// move the rest of the characters to the Enemies section
	$("#select-defender").append($("#select-character .characters"));

	// add current-enemies class to rest of characters that are now enemies
	$("#select-defender .characters").addClass("current-enemies");

	// turn off float left on other sections below
	$("#fight-section").css("clear","left"); // not working as thought

	// change the user message to show the user to select their first enemy to battle - userMessages.chooseEnemy
	// tell user to select a character
	$("#user-msgs").text(userMessages.chooseEnemy);

	charSelectionCount--;

});


// listen for enemy character to be selected
$("#select-defender").on("click", ".current-enemies", function() {

	userFightMsg = "";
	$("#fight-info").html(userFightMsg);

	// grab the selection made by the user
	currentEnemyElement = $("#" + $(this).attr("id"));

	// get current opponent info
	currentEnemy = getCharInfo($(this).attr("value"));

	// set hp & counter attack power variables
	enemyHealth = currentEnemy.charHP;
	enemyAttackPwr = currentEnemy.charCounterAttack;
	

	// remove alignment property on the currentEnemyElement Element
	$(currentEnemyElement).removeClass("align-characters");

	// move current character to the #yopponent section
	$("#opponent").append(currentEnemyElement);

	// add current-opponent class to change background, border & font color
	$(currentEnemyElement).addClass("current-opponent");

	// enable attack button
	$("#attack").prop('disabled', false);

	// change the user message to show the user to attack their first enemy selected - userMessages.attackEnemy
	// tell user to click the attack button
	$("#user-msgs").text(userMessages.attackEnemy);

	charSelectionCount--;

});

// -----------------------------------------------------------------------------------------------
// listen for attack button click 
// -----------------------------------------------------------------------------------------------
$("#attack").on("click", function() {

	// check to see if current chars hp > 0

	// attack opponent -- decrement opponent's hp by current character's attack power
	enemyHealth = enemyHealth - charAttackPwr;
	console.log("enemyHealth = " + enemyHealth);

	// check to see if current opponents hp > 0
	if (isAlive(enemyHealth)) {

		// update health points info for current enemy - 
		updateCharHPView(currentEnemyElement, enemyHealth);

		// display attack info to user
		userFightMsg = currentPlayer.charName + " attacked " + currentEnemy.charName + " causing damage of " + charAttackPwr + " HP.";
		userFightMsg += "<br>";
		$("#fight-info").html(userFightMsg);

	}
	else {

		// tell user they defeated the enemy and to choose another enemy
		userFightMsg = currentPlayer.charName + " defeated " + currentEnemy.charName + "."
		$("#fight-info").html(userFightMsg);

		// change the user message to show the user to select their first enemy to battle - userMessages.chooseEnemy
		// tell user to select a character
		$("#user-msgs").text(userMessages.chooseEnemy);

		// disable attack button
		$("#attack").prop('disabled', true);

		// delete opponent character 
		console.log("enemy dead going to remove currentEnemyElement" + currentEnemyElement);
		currentEnemyElement.remove();

		// check to see if any opponents left
		if (charSelectionCount <= 0) {
			
			// no more opponents then
			// game won function called
			userWon();

		}

	}


	// counter attack -- decrement current character's hp by current opponent's counter attack power
	charHealth = charHealth - enemyAttackPwr;

	if (!isAlive(charHealth)) {

		// game lost function called
		userLost();

		// display attack info to user
		userFightMsg = currentEnemy.charName + " defeated " + currentPlayer.charName + "."
		$("#fight-info").html(userFightMsg);

		// disable attack button
		$("#attack").prop('disabled', true);

	}
	else if (isAlive(enemyHealth) && isAlive(charHealth)) {

		// display attack info to user
		userFightMsg += currentEnemy.charName + " counter-attacked " + currentPlayer.charName + " causing damage of " + enemyAttackPwr + " HP.";
		$("#fight-info").html(userFightMsg);

		// double attack power for current player
		charAttackPwr += charAttackPwr;

		// update health points info for current char
		updateCharHPView(currentPlayerElement, charHealth);

	}

});

// -----------------------------------------------------------------------------------------------
// listen for reset button click 
// -----------------------------------------------------------------------------------------------
$("#reset").on("click", function() {

	// reset variables and characters
	resetGame(false);

});


// -----------------------------------------------------------------------------------------------
// Functions Defined Here
// -----------------------------------------------------------------------------------------------


// create the view of the character on the page
function createCharView (char, divArea, arrayIndex) {

	$("#" + divArea).attr("value", char.charDataValue);

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
	imgTag.attr("value", char.charDataValue);
	imgTag.appendTo("#" + divArea);

	// create healthpoints view
	var pHP = $("<p>");
	pHP.addClass("char-hp");
	pHP.text(char.charHP);
	pHP.appendTo("#" + divArea);

	charSelectionCount++;

}

// create new divs for chars to be shown in #select-char ara
function createCharDivs (charNum) {

	var charDiv = $("<div>");
	charDiv.addClass("characters align-characters");
	charDiv.attr("id", "char" + charNum);

	charDiv.appendTo("#select-character");
}

// get char object
function getCharInfo (selectedValue) {

	// check to see if any of the objects in the charArray have the selectedValue
	for (var i = 0; i < charArray.length; i++) {

		// is the selectedValue in the current arrary object?
		if (charArray[i].charDataValue === selectedValue) {

			return charArray[i];
		}
	}
	
}

// update the user view of the characters health points
function updateCharHPView (updateElement, hp) {

	// find element to update then display the new healthpts
 	$(updateElement.find(".char-hp")).text(hp);

}

function isAlive (hp) {

	if (hp > 0) {

		return true;
	}
	else {

		return false;
	}
}

function userWon () {

	// display won message
	$("#user-msgs").text(userMessages.youWon);
	// show reset button
	$("#reset").css("visibility", "visible");
}

function userLost () {

	// display won message
	$("#user-msgs").text(userMessages.youLost);

	// delete opponent character 
	currentPlayerElement.remove();

	//delete any remaining characters in the #select-defender div
	$("#select-defender").empty();
	
	// show reset button
	$("#reset").css("visibility", "visible");

}

// function to reset the game
function resetGame (newLoad) {

	if (!newLoad) {
		// reset global variables
		charSelectionCount = 0;

		userFightMsg = "";
		$("#fight-info").html(userFightMsg);

		// empty your-character id
		currentPlayerElement.remove();

		// hide reset button
		$("#reset").css("visibility", "hidden");

	}

	// disable attack button
	$("#attack").prop('disabled', true);

	// tell user to select a character
	$("#user-msgs").text(userMessages.chooseChar);

	// run createCharView function for all characters
	for (var i = 0; i < charArray.length; i++) {
		createCharDivs(i);
		createCharView(charArray[i], "char" + (i), i);
	}

}


// -----------------------------------------------------------------------------------------------
// 
// -----------------------------------------------------------------------------------------------