$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
  // Check and Update Pet Info in HTML when the page loads
  checkAndUpdatePetInfoInHtml();
  
  // When each button is clicked, it will "call" function for that button
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.drip-button').click(clickedDripButton);
  
})

// Pet Info Object
var pet_info = { 
    name: "Hound",
    weight: 5,
    happiness: 5,
    style: 5
}

// Track Stat Limits 
var shownLimitMessages = { 
  weightMin: false, 
  weightMax: false,
  happinessMin: false,
  happinessMax: false,
  styleMin: false,
  styleMax: false
}

// Treat button
function clickedTreatButton() {
  pet_info.happiness += 3; // Increase pet happiness
  pet_info.weight += 1; // Increase pet weight
  
  showNotification("Yummy! Gimme some more?"); 
  checkAndUpdatePetInfoInHtml();
}

// Play Button
function clickedPlayButton() {
  pet_info.happiness += 2; // Increase pet happiness
  pet_info.weight -= 1; // Decrease pet weight
  pet_info.style -= 1; // Decrease pet style

  showNotification("That was so fun! Let's play again some time!"); 
  checkAndUpdatePetInfoInHtml();
}

// Exercise Button 
function clickedExerciseButton() {
  pet_info.happiness -= 2; // Decrease pet happiness
  pet_info.weight -= 1; // Decrease pet weight
  pet_info.style -= 1; // Decrease pet style

  showNotification("Are we finally done...? No more please..."); 
  checkAndUpdatePetInfoInHtml();
}

// Drip Button
function clickedDripButton() {
  pet_info.style += 2; // Increase pet style
  pet_info.happiness += 1; // Increase pet happiness

  showNotification("Aren't I handsome?!"); 
  checkAndUpdatePetInfoInHtml();
}

// Check & Update Pet Info in HTML
function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  checkLimitMessages();
  updateButtonStates();
  updatePetInfoInHtml();
}

// Check Pet Info before updating HTML
function checkWeightAndHappinessBeforeUpdating() {
  // Key values must never go below zero 
  if (pet_info.weight < 0) pet_info.weight = 0;
  if (pet_info.happiness < 0) pet_info.happiness = 0;
  if (pet_info.style < 0) pet_info.style = 0;

  // Cap values 
  if (pet_info.weight > 10) pet_info.weight = 10;
  if (pet_info.happiness > 10) pet_info.happiness = 10;
  if (pet_info.style > 10) pet_info.style = 10;
}

// Check for Stat Limits to ensure special messages 
function checkLimitMessages() {

  // Weight Limits
  if (pet_info.weight === 0) { 
    showNotification("I'm a little hungry...");
    shownLimitMessages.weightMin = true;
  } else {
    shownLimitMessages.weightMin = false;
  }

  if (pet_info.weight === 10) {
    showNotification("Is it just me or do I look rounder than usual?");
    shownLimitMessages.weightMax = true;
  } else { 
    shownLimitMessages.weightMax = false;
  }

  // Happiness Limits
  if (pet_info.happiness === 0) {
    showNotification("I'm so bored. You always make me exercise... Can't we do something fun?");
    shownLimitMessages.happinessMin = true;
  } else {
    shownLimitMessages.happinessMin = false;
  }
/*
  if (pet_info.happiness === 10) {
    showNotification("This is the best day ever!");
    shownLimitMessages.happinessMax = true;
  } else {
    shownLimitMessages.happinessMax = false;
  }
*/
  
  // Style Limits
  if (pet_info.style === 0) {
    showNotification("My clothes are so battered!? You can't even properly appreciate my cuteness!");
    shownLimitMessages.styleMin = true;
  } else {
    shownLimitMessages.styleMin = false;
  }

  if (pet_info.style === 10) {
    showNotification("It is I the drip Master! No other has more drip than me!");
    shownLimitMessages.styleMax = true;
  } else {
    shownLimitMessages.styleMax = false;
  }
}

// Enables or Disables buttons based on current stats 
function updateButtonStates() {
  $('.play-button').prop('disabled', pet_info.weight === 0);
  $('.exercise-button').prop('disabled', pet_info.weight === 0 || pet_info.happiness === 0);
  $('.treat-button').prop('disabled', pet_info.weight === 10);
  $('.drip-button').prop('disabled', pet_info.style === 10);
}
    
// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.style').text(pet_info['style']);
}

// Visual notifications 
function showNotification(message) {
  var $note = $('.notification'); 
  $note.finish(); 

  $('button').prop('disabled', true); // Disable buttons while notification is shown

  $note.text(message).show(); // Show the notification with the message

  $note 
    .delay(2000) // Keep the notification visible for 2 seconds
    .fadeOut(500);
      
    updateButtonStates(); // Update button states after notification is done
}