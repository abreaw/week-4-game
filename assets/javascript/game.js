


// -----------------------------------------------------------------------------------------------
// Global Variables Defined Here
// -----------------------------------------------------------------------------------------------

var charSelectionCount = 4; // might need this if I add more characters later??

var currentEnemy;
var currentPlayer;
var charHealth;
var enemyHealth;
var charAttackPwr;
var enemyAttackPwr;

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
// listen for character click in select-character id section
// -----------------------------------------------------------------------------------------------
// $("#select-character").find("div.characters").on("click", function() {
$("#select-character").on("click", ".characters", function() {  //  .characters  // removed to see if this works now
// trying w/ event delegation in place since the new items added to the other divs will need this to run??
// https://learn.jquery.com/events/event-delegation/

	// move that character to the your character section - #your-character


	// currentPlayer = this.value; // not sure why this is not working like it did in the jquery calculator example
	console.log("here ")
	console.log(this)
	currentPlayer = $(this).attr("value");
	console.log("currentPlayer = " + currentPlayer);

	var currentPlayerID = $(this).attr("id");
	console.log("currentPlayerID = " + currentPlayerID);

	// grab the selection made by the user
	var currentPlayerElement = $("#" + $(this).attr("id"));
	console.log("currentPlayerElement = " + currentPlayerElement);


	// set the isPlayer to true
	// not sure if this is needed

	// get current character info 
	// set hp & attack power variable
	

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



});

// listen for enemy character to be selected
// $("#char* .current-enemies").on("click", function() {
$("#select-defender").on("click", ".current-enemies", function() {
// $("#select-defender").find("div.current-enemies").on("click", function() {
	console.log('theres')
	// grab the selection made by the user
	var currentEnemyElement = $("#" + $(this).attr("id"));
	console.log("currentEnemyElement = " + currentEnemyElement);

	// get current opponent info
	// set hp & counter attack power variables


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

});

// -----------------------------------------------------------------------------------------------
// listen for attack button click 
// -----------------------------------------------------------------------------------------------
$("#attack").on("click", function() {

	// check to see if current chars hp > 0
		// check to see if current opponents hp > 0
			// attack opponent -- decrement opponent's hp by current character's attack power
			// counter attack -- decrement current character's hp by current opponent's counter attack power
			// double current character's attack power
			// display attack info to user
			// update health points info for current char
			// update health points info for current enemy
		// if enemy dead
			// check to see if any opponents left
				// delete opponent character 
				// disable attack button 
				// display user msg to select another opponent
				// wait for another char to be selected
			// no more opponents then
				// game won function called
				// enable reset button for new game to be loaded
	// else if current char dead
		// game lost function called
		// disable attack button
		// enable reset button for new game to be loaded

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

}

// check chars hp
function isCharDead (charObject) {


}

// get char object
function getCharInfo () {


}

// function to reset the game
function resetGame (newLoad) {

	if (!newLoad) {
		// empty opponent id
		// empty select-defender id
		// empty your-character id
		// reset isPlayer & isEnemy back to false (if this is needed)
	}

	// disable attack button
	$("#attack").prop('disabled', true);

	// tell user to select a character
	$("#user-msgs").text(userMessages.chooseChar);

	// run createCharView function for all characters
	for (var i = 0; i < charArray.length; i++) {
		createCharView(charArray[i], "char" + (i+1), i);
	}


}




// -----------------------------------------------------------------------------------------------
// 
// -----------------------------------------------------------------------------------------------