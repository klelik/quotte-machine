import React, { useState, useEffect } from "react";
import "./App.scss";
import COLOR_ARRAY from "./colorArray";
import { FaTwitter,FaQuoteLeft } from "react-icons/fa";

let quoteDB =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState(
    "Too  of us are not living our dreams because we are living our fears."
  );
  const [author, setAuthor] = useState("Klement");
  // const [randomNumber,setRandomNumber] =useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [randomColor, setRandomColor] = useState("#3AA7A3");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
    console.log(parsedJSON);
  };

  useEffect(() => {
    fetchQuotes(quoteDB);
  }, []);

  const getRandomQuote = () => {
    let rand = Math.floor(quotesArray.length * Math.random());
    // setRandomNumber(rand)
    setRandomColor(COLOR_ARRAY[rand]);
    setQuote(quotesArray[rand].quote);
    setAuthor(quotesArray[rand].author);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: randomColor }}>
        <div id="quote-box" style={{ color: randomColor }}>
          {/*<h1>Random number: {randomNumber}</h1> */}
          <p id="text">
            <i id="quote-symb">
              <FaQuoteLeft />
            </i>

            {quote}
          </p>

          <p id="author">- {author}</p>

          <div className="buttons">
            <a
              className="buttonEffect"
              id="tweet-quote"
              style={{ backgroundColor: randomColor }}
              href={encodeURI(
                `https://twitter.com/intent/tweet?text=${quote}-${author}&hashtags=quote`
              )}
            >
              <FaTwitter />
            </a>
            <button
              className="buttonEffect"
              id="new-quote"
              style={{ backgroundColor: randomColor }}
              onClick={() => getRandomQuote()}
            >
              Generate New Quote
            </button>
          </div>
        </div>
        <p>Made with 🤍 by Klement</p>
      </header>
    </div>
  );
}

export default App;
