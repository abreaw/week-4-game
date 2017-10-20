


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
	isPlayer: false,
	isEnemy: false,

}

var charLeia = {

	charName: "Princess Leia",
	charDataValue: "Leia",
	charImage: "assets/images/d3dab1e853245b37565836cc185b759f.jpg",
	charHP: 150,
	charAttack: 15,
	charCounterAttack: 10,
	isPlayer: false,
	isEnemy: false,

}

var charKylo = {

	charName: "Kylo Ren",
	charDataValue: "Kylo",
	charImage: "assets/images/8e7d7c3e88672062e95e32fc06493d1b.jpg",
	charHP: 200,
	charAttack: 20,
	charCounterAttack: 15,
	isPlayer: false,
	isEnemy: false,

}

var charBoba = {

	charName: "Boba Fett",
	charDataValue: "Boba",
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
	console.log("charRey = " + charRey);

	// for (var i = 0; i < charArray.length; i++) {
	// 	createCharView(charArray[i], "char" + (i+1), i);
	// }

	resetGame(true);


});


// -----------------------------------------------------------------------------------------------
// listen for character click in select-character id section
// -----------------------------------------------------------------------------------------------
// $("#select-character").find("div.characters").on("click", function() {
$("#select-character").on("click", ".characters", function() {  //  .characters  // removed to see if this works now
// trying w/ event delegation in place since the new items added to the other divs will need this to run??
// https://learn.jquery.com/events/event-delegation/

	// move that character to the your character section - #your-character


	// currentPlayer = this.value; // not sure why this is not working like it did in the jquery calculator example
	console.log("here ")
	
	// grab the selection made by the user
	currentPlayerElement = $("#" + $(this).attr("id"));
	console.log("currentPlayerElement = " + currentPlayerElement);

	// set the isPlayer to true
	// not sure if this is needed

	// get current character info 
	currentPlayer = getCharInfo($(this).attr("value"));
	console.log("current player object = " + currentPlayer);

	// set hp & attack power variable
	charHealth = currentPlayer.charHP;
	console.log("current health = " + charHealth);
	charAttackPwr = currentPlayer.charAttack;
	console.log("current attack power = " + charAttackPwr);

	// turn off float left 
	// $(currentPlayerElement).css("clear","left"); // not working as thought

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

	console.log($(".current-enemies"));

	charSelectionCount--;


});

// listen for enemy character to be selected
// $("#char* .current-enemies").on("click", function() {
$("#select-defender").on("click", ".current-enemies", function() {
// $("#select-defender").find("div.current-enemies").on("click", function() {
	console.log('theres')

	userFightMsg = "";
	$("#fight-info").html(userFightMsg);

	// grab the selection made by the user
	currentEnemyElement = $("#" + $(this).attr("id"));
	console.log("currentEnemyElement = " + currentEnemyElement);

	// get current opponent info
	currentEnemy = getCharInfo($(this).attr("value"));
	console.log("current player object = " + currentEnemy);

	// set hp & counter attack power variables
	enemyHealth = currentEnemy.charHP;
	console.log("current health = " + enemyHealth);
	enemyAttackPwr = currentEnemy.charCounterAttack;
	console.log("current attack power = " + enemyAttackPwr);
	

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

	console.log("attack 1st view");
	console.log("charHealth = " + charHealth);
	console.log("enemyHealth = " + enemyHealth);
	console.log("charAttackPwr = " + charAttackPwr);
	console.log("enemyAttackPwr = " + enemyAttackPwr);

	// check to see if current chars hp > 0
	// if (charHealth > 0) {
	// if (isAlive(charHealth)) {

		// check to see if current opponents hp > 0
		// if (enemyHealth > 0) {
		// if (isAlive(enemyHealth)) {

			console.log("attack opponent here");
			// attack opponent -- decrement opponent's hp by current character's attack power
			enemyHealth = enemyHealth - charAttackPwr;
			console.log("enemyHealth = " + enemyHealth);

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
					// delete opponent character 
					// console.log("enemy dead going to remove currentEnemyElement" + currentEnemyElement);
					// currentEnemyElement.remove();

					// disable attack button 
					// display user msg to select another opponent
					// wait for another char to be selected
				// no more opponents then
					// game won function called
					console.log("going to call userWon function now " + charSelectionCount);
				
					userWon();

					// enable reset button for new game to be loaded
				}

			}

			console.log("counter attack player here");
			// counter attack -- decrement current character's hp by current opponent's counter attack power
			charHealth = charHealth - enemyAttackPwr;
			console.log("charHealth = " + charHealth);

			if (!isAlive(charHealth)) {

				console.log("going to call userLost function now " + charSelectionCount);
				// game lost function called
				userLost();

				userFightMsg = currentEnemy.charName + " defeated " + currentPlayer.charName + "."
				$("#fight-info").html(userFightMsg);

				// disable attack button
				$("#attack").prop('disabled', true);

				// enable reset button for new game to be loaded
			}
			else if (isAlive(enemyHealth) && isAlive(charHealth)) {

				userFightMsg += currentEnemy.charName + " counter-attacked " + currentPlayer.charName + " causing damage of " + enemyAttackPwr + " HP.";
				$("#fight-info").html(userFightMsg);

				// double attack power for current player
				charAttackPwr += charAttackPwr;

				// update health points info for current char
				updateCharHPView(currentPlayerElement, charHealth);

			}

			// display attack info to user
			// userFightMsg = currentPlayer.charName + " attacked " + currentEnemy.charName + " causing damage of " + charAttackPwr + " HP.";
			// userFightMsg += "<br>";
			// userFightMsg += currentEnemy.charName + " counter-attacked " + currentPlayer.charName + " causing damage of " + enemyAttackPwr + " HP.";

			// $("#fight-info").text(userFightMsg);
			// $("#fight-info").html(userFightMsg);
			// $("#fight-info").text(currentEnemy.charName + " counter-attacked " + currentPlayer.charName + " causing damage of " + enemyAttackPwr + " HP.");

			// // double attack power for current player
			// charAttackPwr += charAttackPwr;

			// // update health points info for current char
			// updateCharHPView(currentPlayerElement, charHealth);

			// if (isAlive(enemyHealth)) {

			// 	// update health points info for current enemy - 
			// 	updateCharHPView(currentEnemyElement, enemyHealth);

			// }
			// else {

			// 	// tell user they defeated the enemy and to choose another enemy
			// 	userFightMsg = currentPlayer.charName + " defeated " + currentEnemy.charName + "."
			// 	$("#fight-info").html(userFightMsg);

			// 	// change the user message to show the user to select their first enemy to battle - userMessages.chooseEnemy
			// 	// tell user to select a character
			// 	$("#user-msgs").text(userMessages.chooseEnemy);

			// 	// disable attack button
			// 	$("#attack").prop('disabled', true);

			// 	// delete opponent character 
			// 	console.log("enemy dead going to remove currentEnemyElement" + currentEnemyElement);
			// 	currentEnemyElement.remove();

			// 	// check to see if any opponents left
			// 	if (charSelectionCount <= 0) {
			// 		// delete opponent character 
			// 		// console.log("enemy dead going to remove currentEnemyElement" + currentEnemyElement);
			// 		// currentEnemyElement.remove();

			// 		// disable attack button 
			// 		// display user msg to select another opponent
			// 		// wait for another char to be selected
			// 	// no more opponents then
			// 		// game won function called
			// 		console.log("going to call userWon function now " + charSelectionCount);
				
			// 		userWon();

			// 		// enable reset button for new game to be loaded
			// 	}

			// }

		// }
		// else {
			// if enemy dead

				// console.log("charSelectionCount = " + charSelectionCount);
				

				// // check to see if any opponents left
				// if (charSelectionCount <= 0) {
				// 	// delete opponent character 
				// 	// console.log("enemy dead going to remove currentEnemyElement" + currentEnemyElement);
				// 	// currentEnemyElement.remove();

				// 	// disable attack button 
				// 	// display user msg to select another opponent
				// 	// wait for another char to be selected
				// // no more opponents then
				// 	// game won function called
				// 	console.log("going to call userWon function now " + charSelectionCount);
				
				// 	userWon();

				// 	// enable reset button for new game to be loaded
				// }
		// }
	// } 
	// else {
	// else if current char dead
	// if (!isAlive(charHealth)) {

	// 	console.log("going to call userLost function now " + charSelectionCount);
	// 	// game lost function called
	// 	userLost();

	// 	// disable attack button
	// 	$("#attack").prop('disabled', true);

	// 	// enable reset button for new game to be loaded
	// }

});

// -----------------------------------------------------------------------------------------------
// listen for reset button click 
// -----------------------------------------------------------------------------------------------
$("#reset").on("click", function() {

	resetGame(false);

});


// -----------------------------------------------------------------------------------------------
// Functions Defined Here
// -----------------------------------------------------------------------------------------------


// create the view of the character on the page
function createCharView (char, divArea, arrayIndex) {

	console.log("char = " + char.charName + ", " + char.charDataValue + ", " + char.charImage + ", " + char.charHP + ", " + char.charAttack + ", " + char.charCounterAttack);
	console.log("divArea = " + divArea);

	// create element inside the divArea
	// var newDiv = $("<div>");
	// newDiv.attr("value", char.charDataValue);
	// console.log("new Div Value = " + char.charDataValue);
	// newDiv.appendTo("#" + divArea);

	$("#" + divArea).attr("value", char.charDataValue);

	// create name tag
	var pName = $("<p>");
	pName.addClass("char-name");
	pName.text(char.charName);
	pName.appendTo("#" + divArea);
	// pName.appendTo(newDiv);

	// create image
	var imgTag = $("<img>");
	imgTag.addClass("char-image");
	imgTag.attr("src", char.charImage);
	imgTag.attr("width", imgWidth);
	imgTag.attr("height", imgHeight);
	imgTag.attr("value", char.charDataValue);
	console.log("imgTag value = " + imgTag.attr("value"));
	// imgTag.text(char.charImage);
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

	// declare variable to hold index of object in the charArray
	// var indexNum;

	// console.log("getCharInfo selectedValue = " + selectedValue);

	// check to see if any of the objects in the charArray have the selectedValue
	for (var i = 0; i < charArray.length; i++) {

		// console.log("checking for datavalue = " + charArray[i].charDataValue);

		// is the selectedValue in the current arrary object?
		if (charArray[i].charDataValue === selectedValue) {

			// console.log("data value found = " + i);
			return charArray[i];
		}
	}
	
	// indexNum = charArray.indexOf(selectedValue);
	// console.log("indexNum of Char Array = " + indexNum);
	// if (charArray.indexOf(selectedValue))

}

// update the user view of the characters health points
function updateCharHPView (updateElement, hp) {

	// console.log("updateCharHPView function called");
	// console.log("updateElement = " + updateElement);
	// console.log("hp = " + hp);

	// // var tempElement = $(updateElement + " p.charHP").html();
	// // var tempElement = $(updateElement).find("p.charHP").text();
	// // var tempElement = $(document.getElementById(updateElement)).html();
	// var tempElement = $(updateElement).html();

	// console.log(tempElement);
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
	console.log("you are dead going to remove currentPlayerElement" + currentPlayerElement);
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

		// empty opponent id

		// empty select-defender id
		
		// empty your-character id
		currentPlayerElement.remove();

		// add divs back for chars to be recreated
		// createCharDivs();

		// hide reset button
		$("#reset").css("visibility", "hidden");

		// reset isPlayer & isEnemy back to false (if this is needed)
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