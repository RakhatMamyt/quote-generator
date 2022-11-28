//get all the UI elements
const quoteContainer = document.getElementById('quote-container');
const newQuoteBtn = document.getElementById('new-quote');
const quoteBox = document.getElementById('quote');
const authorBox = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');


// get Quotes from an API asynch/fetch/try/catch
let apiQuotes = [];

//show loading 
function loading(){
  loader.hidden = false;
  quoteContainer.hidden= true;
  console.log('loading')
}
//show complete 
function complete(){
  quoteContainer.hidden=false;
  loader.hidden = true;
  
  console.log('complete')
}
//show new quote
function newQuote(){
  loading();
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];

  //check if the author field is null and if true replace it with the "Unkown";
  if(!quote.author){
    authorBox.textContent = 'Unkown';
  }else {
    authorBox.innerHTML = quote.author; 
  }
  //check the length of the quote to adjust the styling
  if(quote.text.length> 100){
    quoteBox.classList.add('long-quote');
  } else {
    quoteBox.classList.remove('long-quote');
  }
  //Popoulating the UI dynamically, Set Quote Hide the loader
  quoteBox.innerHTML = quote.text +'"';
  complete();
}


//fetching the data
async function getQuotes(){
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try{
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  }
  catch(error) {
    //Catch error here
    console.log(error.message)
  }
  
}


//tweeting the quote
const tweetQuote =()=>{
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteBox.textContent} - ${authorBox.textContent}`;
  window.open(twitterUrl, '_blank')
}
// Event Listener
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// on load

getQuotes();