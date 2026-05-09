//import unsortedPlays from "./ellaplays.json" with { type: "json" };
let selectedPlay = localStorage.getItem("currentPlay");


const titleEl = document.getElementById("title")
const descEl = document.getElementById("title");
const currentDevEl = document.getElementById("title");
const detailsEl = document.getElementById("title");
const historyEl = document.getElementById("title");
const photosEl = document.getElementById("photos")


function createPage(){

  //title etc all go on the right in order
  // title, teaser, descritpion, castSize, status, age, ogDev, devHist, Press

  const title = document.createElement("h2")
  title.innerHTML = selectedPlay.title2;

  const teaser = document.createElement("p")
  teaser.innerHTML = selectedPlay.teaser

  const description = document.createElement("p")
  description.innerHTML = selectedPlay.description

  const castSize = document.createElement("p")
  castSize.innerHTML = selectedPlay.castSize
  
  const ogDev = document.createElement("p");
  ogDev.innerHTML = selectedPlay.ogDev
  
  //HAVE TO CHECK THAT THERES STUFF IN ALMOST EVERY ONE OF THESE LMAO
  const age = document.createElement("p")
  age.innerHTML = selectedPlay.age
  const status = document.createElement("p");
  status.innerHTML = selectedPlay.status;

//IF theres anything in DevHist then you have to do this
  let fullHistory = selectedPlay.devHist


  fullHistory.forEach(event => {
    //div per development event
    const eventEl = document.createElement("div");

    //p to hold the what/where/when
    const infoEl = document.createElement("p")

    //the what
    const what = document.createElement("scan")
    what.innerHTML = event.what
    infoEl.append(what)

    //the where
    const where = document.createElement("scan");
  where.innerHTML = event.where
  infoEl.append(where)

  //the when
    const when = document.createElement("scan")
    when.innerHTML = event.when
    infoEl.append(when)

    //TO ADD - IF DEVTEAM IS LONGER THAN 0 THEN DO THE FOLLOWING
    //unordered list of people
    const people = document.createElement("ul")
    //for each person listed. . . 
    event.devTeam.forEach(teamSupporter => {
      //make a person list item
      const person = document.createElement("li")
      person.innerHTML = teamSupporter;

      //add it to the ul
      people.append(person)
    });

    //add the 2 event specific peices of info to the event element
    eventEl.append(infoEl)
    eventEl.append(people)
  });


}
createPage()
