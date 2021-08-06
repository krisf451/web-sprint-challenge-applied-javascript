import axios from "axios";

const Card = article => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  //create the elements
  const card = document.createElement("div");
  const headline = document.createElement("div");
  const author = document.createElement("div");
  const imgCont = document.createElement("div");
  const cardImg = document.createElement("img");
  const authorName = document.createElement("span");
  //add classes
  card.classList.add("card");
  headline.classList.add("headline");
  author.classList.add("author");
  imgCont.classList.add("img-container");
  // append properly
  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(imgCont);
  author.appendChild(authorName);
  imgCont.appendChild(cardImg);
  //add content
  headline.textContent = article.headline;
  cardImg.src = article.authorPhoto;
  authorName.textContent = article.authorName;
  //click event on the card
  card.addEventListener("click", e => {
    console.log(article.headline);
    e.stopPropagation();
  });
  return card;
};

const cardAppender = selector => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios
    .get("http://localhost:5000/api/articles")
    .then(res => {
      console.log("Response:", res.data.articles);
      let objData = res.data.articles;
      //figure out a way to loop through an object full of arrays, and then loop through each subject in the array and append it to the dom
      for (let key in objData) {
        let subjectsArr = objData[key];
        for (let i in subjectsArr) {
          document.querySelector(selector).appendChild(Card(subjectsArr[i]));
        }
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export { Card, cardAppender };
