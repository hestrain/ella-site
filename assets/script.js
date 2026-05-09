//import json array of play objects
//(1)fireproof, (2)wolf, (3)corps, (97)care/take, (98)becca & the blob, (99)exits

import unsortedPlays from "./ellaplays.json" with { type: "json" };
let selectedPlay = ""
localStorage.setItem("currentPlay", selectedPlay)

//console.log(unsortedPlays);


//make part of the page where the plays go
const playsDiv = document.getElementById("playbox");
console.log(playsDiv);

//function that generates the HTML for the plays
function populatePlays() {
  //sort the plays by the order#
  const plays = unsortedPlays.sort((a, b) => a.order - b.order);

  //for each play in the array....
  plays.forEach((play) => {
    //log the title of the play
    console.log(play.title + "'s card is being made");

    //create the card element
    const playCard = document.createElement("div");
    playCard.setAttribute("class", "play");
    playCard.setAttribute("id", play.title)

    //title element
    const playTitle = document.createElement("h4");
    playTitle.innerHTML = play.title2;
    //cover div element
    const coverDiv = document.createElement("div");
    coverDiv.setAttribute("class", "cover");
    //cover image element
    const coverImg = document.createElement("img");
    coverImg.setAttribute("class", "sample-img smaller-img");
    coverImg.setAttribute("class", play.title);
    coverImg.setAttribute("src", play.pic);

    //description box
    const descDiv = document.createElement("div");
    descDiv.style.visibility = "hidden";
    descDiv.setAttribute("class", "desc-div");

    //description teaser element IF THERE IS ONE!!!!
    if (play.teaser.length > 0) {
      const teaser = document.createElement("p");
      teaser.setAttribute("class", "teaser")
      teaser.innerHTML = play.teaser;
      descDiv.append(teaser);

    }
    //description p element
    const descP = document.createElement("p")
    descP.setAttribute("class", "play-desc");
    descP.innerHTML = play.description;

    //more details button 
    const fullDeets = document.createElement("button")
    fullDeets.setAttribute("class", "detail-btn")
    fullDeets.innerHTML = ("More Info")
    fullDeets.style.visibility = "hidden";
    
    //if clicked takes them to another webpage
    fullDeets.addEventListener("click", (event) => {
      //location.href("/" + play.title);
      console.log("clicked to go to " +play.title2+ "'s page");
      selectedPlay = play;
      console.log(selectedPlay).title2;
      localStorage.setItem("currentPlay", selectedPlay);
    })


    //adds all the elements together onto the playcard, and then to the playsDiv
    playCard.append(playTitle);
    playCard.append(coverDiv);
    coverDiv.append(coverImg);
    descDiv.append(descP)
    playCard.append(fullDeets)
    playCard.append(descDiv);
    playsDiv.append(playCard);
    descDiv.style.visibility = "hidden";

    //give playcard the event listener to trigger the description showing when mouse is on card
    playCard.addEventListener("mouseenter", (event) => {
      //image opacity to 0 so you cna read desc
      coverImg.style.opacity = "0%";
      //shows the desc text
      descDiv.style.visibility = "visible";
      fullDeets.style.visibility = "visible"
      //log to check
      console.log("hovered on " + play.title2);
    });

    //when the mouse leaves the playCard
    playCard.addEventListener("mouseleave", (event) => {
      //bring the opacity back up
      coverImg.style.opacity = "100%";
      //hide the desc
      descDiv.style.visibility = "hidden";
      fullDeets.style.visibility = "hidden"
      //log to check
      console.log("mouse left " + play.title2);
    });
  });
}

//calls the function
populatePlays();
