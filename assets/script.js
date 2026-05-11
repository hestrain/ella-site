//import json array of play objects
//(1)fireproof, (2)wolf, (3)corps, (97)care/take, (98)becca & the blob, (99)exits

import unsortedPlays from "./ellaplays.json" with { type: "json" };
import contacts from "./contact.json" with { type: "json" };
//console.log(contact);

let selectedPlay = ""
localStorage.setItem("currentPlay", selectedPlay)

//console.log(unsortedPlays);


//make part of the page where the plays go
const playsDiv = document.getElementById("playbox");
//console.log(playsDiv);

function makeContacts() {
  const contactSection = document.getElementById("contactInfo")
  console.log("making contacts");

  const socials = document.createElement("div");
  socials.setAttribute("class", "socials-box");


  contacts.forEach(contact => {

    //console.log(contact);


    //email
    if (contact.title === "email") {

      const emailButton = document.createElement("a")
      emailButton.innerHTML = contact.linktext
      emailButton.setAttribute("class", "email")
      emailButton.href = contact.url

      contactSection.append(emailButton);
    }
    //socials
    else if (contact.title != "footer") {
      
      const oneSocial = document.createElement("div")
      oneSocial.setAttribute("class", "a-social")
      //console.log(contact.title);

      const icon = document.createElement("img")
      const icona = document.createElement("a")
      icon.src = contact.icon
      // icon.setAttribute("src", contact.icon)
      icon.alt = contact.title
      icon.setAttribute("class", "social-icon")
      icona.href = contact.url
      icona.append(icon)

      oneSocial.append(icona)
      socials.append(oneSocial)
    }

    contactSection.append(socials)

  });

    //------FOOTEEERRRR-------------

  let footerObj = contacts.find((contact) => contact.title === "footer");


  const footerEl = document.getElementById("footer-info")
  const ellaCopy = document.createElement("p")
  ellaCopy.setAttribute("class", "ella")
  ellaCopy.innerHTML = "Copyright " + footerObj.footerName + " " + footerObj.year
  const heatherCred = document.createElement("div")
  heatherCred.setAttribute("class", "heather")
  heatherCred.innerHTML = "Website by "
  const heatherAHref = document.createElement("a")
  heatherAHref.innerHTML = footerObj.developer
  heatherAHref.href = footerObj.devLink

  heatherCred.append(heatherAHref)
  footerEl.append(ellaCopy)
  footerEl.append(heatherCred)
}

makeContacts()

//function that generates the HTML for the plays
function populatePlays() {
  //sort the plays by the order#
  const plays = unsortedPlays.sort((a, b) => a.order - b.order);
  console.log("making plays");

  //for each play in the array....
  plays.forEach((play) => {
    //log the title of the play
    //console.log(play.title + "'s card is being made");

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

    //if clicked takes them to the plays detailed page
    fullDeets.addEventListener("click", (event) => {
      const pageRef = "pages/" + play.title + ".html"
      window.location.href = pageRef;
      console.log("clicked to go to " + play.title2 + "'s page");

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
      //console.log("hovered on " + play.title2);
    });

    //when the mouse leaves the playCard
    playCard.addEventListener("mouseleave", (event) => {
      //bring the opacity back up
      coverImg.style.opacity = "100%";
      //hide the desc
      descDiv.style.visibility = "hidden";
      fullDeets.style.visibility = "hidden"
      //log to check
      //console.log("mouse left " + play.title2);
    });
  });
}


//calls the function
populatePlays();
