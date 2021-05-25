const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById('wpm-score')

let typingTimer;
let doneTypingInterval = 2500

quoteInputElement.addEventListener('keyup', ()=>{
  clearTimeout(typingTimer)
  if (quoteInputElement.value){
    typingTimer = setTimeout(doneTyping, doneTypingInterval)
  }
})

function doneTyping(){
  wpmElement.innerText = '0'
}


quoteInputElement.addEventListener("input",  () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  const wordCount = Math.floor((arrayValue.length)/5)
  const wordsPerMinute = Math.round((wordCount/getTimerTime())*60)

 

  
 
  
  if(isFinite(wordsPerMinute) ){
  wpmElement.innerText = wordsPerMinute
    
  }


  //   when true calls next quote
  let nextQuote = true;

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    // if character isn't typed text is black
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      nextQuote = false;
      //   if character typed matches character in quote above text is green
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
      //if character type doesn't match character in quote above text is red
    } else if (character !== characterSpan.innerText) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      //    goes to next quote when you've typed the same number of characters
    } else if (arrayValue.length === arrayQuote.length) {

    
      nextQuote = true;
     
    
    }

  });
  
 


  if (nextQuote) renderNewQuote();

});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

const renderNewQuote= async()=> {
  const quote = await getRandomQuote();

  quoteDisplayElement.innerText = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");

    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}
// Initializing start time
let startTime;

function startTimer() {
  timerElement.innerText = 0;

  //the date string of the start time
  startTime = new Date();
  // every second we're setting the timerelement text with the result of the get timer Time function
  setInterval(() => {
    timerElement.innerText = getTimerTime();
   
  }, 1000);
}
//  this takes the current time and subtracts it from the start time (results in seconds elapsed since start time)/ 1000 gives seconds
//this is more accurate than just using set interval

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}




renderNewQuote();

// To do: clear WPM when user hasn't typed for 5 seconds