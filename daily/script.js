import {exerciseOptions} from './options.js';

var activities = ["exercise", 'bass', "espanol"];
var espanolOptions = ["read", "write a story", "play w textbook", "vocab cards"]
var bassOptions = ["major scales", "minor scales", "pentatonic scales", "video"]
//exerciseOptions = ["10 desk pushup", "20 curls", "1 min bridge", "https://www.youtube.com/embed/-T9K1HI63GU"]
var encouragements = ["proud of you :)", "you've got this :)", "have a great day ☀️", "high five!"]

var element = document.getElementById("exerciseBtn");
element.onclick  = () => open("exercise");
element = document.getElementById("bassBtn");
element.onclick  = () => open("bass");
element = document.getElementById("espanolBtn");
element.onclick  = () => open("espanol");

var open = function open(which) {
  for (let i = 0; i < activities.length; i++) {
    let activity = activities[i];
    if (which != activity) {
      let other = document.getElementById(activity + "Btn");
      other.style.transition = "opacity 2s linear 0s";
      other.className = "invisible btn";
    }
  } 
  element = document.getElementById(which + "Btn");
  element.style.transition = "transform 1s ease 0s";
  element.style.transform = "translateY(-100px)";
  element.onclick  = () => close(which);

  var list = document.getElementById("list");
  var options = window[which + "Options"]
  var rndI = Math.floor(Math.random() * options.length)
  var option = options[rndI]
  if (option.startsWith('http')) {
    list.innerHTML = '<iframe src="' + option +'" allowfullscreen></iframe>'
  } else {
    list.innerHTML = option
  }
  list.style.transition = "opacity 2s linear 0s";
  list.className = "list visible"
  rndI = Math.floor(Math.random() * encouragements.length)
  var encouragement = document.getElementById("encouragements");
  encouragement.innerHTML = encouragements[rndI]
  encouragement.style.transition = "opacity 2s linear 0s";
  encouragement.className = "encouragement visible"
}

function close(which) {
  for (let i = 0; i < activities.length; i++) {
    var activity = activities[i];
    if (which != activity) {
      var other = document.getElementById(activity + "Btn")
      other.style.transition = "opacity 2s linear 0s";
      other.className = "btn visible"
    }
  } 
  var element = document.getElementById(which + "Btn");
  element.style.transition = "transform 1s ease 0s";
  element.style.transform = "translateY(0px)"
  element.onclick = () => open(which);

  var list = document.getElementById("list");
  list.style.transition = "opacity 2s linear 0s";
  list.className = "invisible list"

  var encouragement = document.getElementById("encouragements");
  encouragement.style.transition = "opacity 2s linear 0s";
  encouragement.className = "invisible encouragement"
}