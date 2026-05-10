//import the plays to make the page
import unsortedPlays from "./ellaplays.json" with { type: "json" };

//get the location of the page 
let checkUrl = window.location.href
//console.log(checkUrl); //log to check
// Source - https://stackoverflow.com/a/4758173
// Posted by Frédéric Hamidi, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-09, License - CC BY-SA 4.0

//shorter url (just the part after the last /)
let shortUrl = checkUrl.substring(checkUrl.lastIndexOf('/') + 1);
//just the play name (url before the .html)
let pageName = shortUrl.split(".")[0];

//console.log(pageName); //log to check

//get the play that matches the page
let thisPlay = unsortedPlays.find((play) => play.title === pageName);

//find all the existing elements on the page
//tbh i probably want it to MAKE all these elements but for now theyre here
const titleEl = document.getElementById("title")
const descEl = document.getElementById("desc");
const detailsEl = document.getElementById("details");
const castEl = document.getElementById("cast-zone")
const photosEl = document.getElementById("photos")

//function to generate page content
function createPage(){

  //title etc all go on the right of the page in order
  // title, teaser, descritpion, castSize, status, age, ogDev, devHist, Press

  //get info div (right col)
  const rightCol = document.getElementById("right-col")

  //title of the play
  const title = document.createElement("h2")
  title.innerHTML = thisPlay.title2;
  title.setAttribute("class", "spec-title")

  //add it to the titleDiv
  titleEl.append(title)

  //teaser for the play description
  const teaser = document.createElement("p")
  teaser.setAttribute("class","spec-teaser")
  teaser.innerHTML = thisPlay.teaser

  //add to the description
  descEl.append(teaser)

  //description of play
  const description = document.createElement("p")
  description.innerHTML = thisPlay.description
    description.setAttribute("class","spec-desc")

    //add it to the description area, under the teaser
  descEl.append(description)

  //cast size line
  const castSize = document.createElement("scan")
  castSize.innerHTML = thisPlay.castSize
    castSize.setAttribute("class", "spec-cast");

    //add it to the existing p
  castEl.append(castSize)
  
  //ONLY add an age section if theres info in the json file
if (thisPlay.age.length>0) {
  const age = document.createElement("scan");
  age.innerHTML = thisPlay.age;
  age.setAttribute("class", "spec-age");

  detailsEl.append(age);
}

//ONLY add a status if theres info on the json file
if (thisPlay.status.length>0) {
    const status = document.createElement("scan");
    status.innerHTML = thisPlay.status;
    status.setAttribute("class", "spec-status");
const statusEl = document.createElement("p");
statusEl.setAttribute("class","status-zone")
statusEl.innerHTML ="Status: "
detailsEl.append(statusEl)

    statusEl.append(status);
}

// original or current development
    const ogDev = document.createElement("p");
    ogDev.innerHTML = thisPlay.ogDev;
    ogDev.setAttribute("class", "spec-ogdev");

    detailsEl.append(ogDev);

    //only add a development history section if there is info in the json file
    let fullHistory = thisPlay.devHist
    if (fullHistory.length>0) {
      //header the the section
      const historyHeader = document.createElement("h2")
      historyHeader.innerHTML = "Past Development"
      historyHeader.setAttribute("class", "spec-header")
      //list to hold the various development events
      const historyEl = document.createElement("ul")
      historyEl.setAttribute("class", "spec-history")
      const historyDiv = document.getElementById("history")
      //add the 2 new elemtns to the page
      historyDiv.append(historyHeader)
      historyDiv.append(historyEl)

      //for each development event...
        fullHistory.forEach((event) => {
          //div per development event
          const eventEl = document.createElement("li");
          eventEl.setAttribute("class", "spec-event");

          //p to hold the what/where/when
          const infoEl = document.createElement("p");
          infoEl.setAttribute("class", "info-line");

          //the what
          const what = document.createElement("scan");
          what.innerHTML = event.what;
          infoEl.append(what);
          what.setAttribute("class", "spec-what");

          //the where
          const where = document.createElement("scan");
          where.innerHTML = event.where;
          infoEl.append(where);
          where.setAttribute("class", "spec-where");

          //the when
          const when = document.createElement("scan");
          when.innerHTML = event.when;
          infoEl.append(when);
          when.setAttribute("class", "spec-when");

          //unordered list of people
          const people = document.createElement("ul");
          people.setAttribute("class", "spec-people");

          //for each team member listed. . .
          event.devTeam.forEach((teamSupporter) => {
            //make a person list item
            const person = document.createElement("li");
            person.innerHTML = teamSupporter;
            person.setAttribute("class", "spec-person");

            //add it to the ul
            people.append(person);
          });

          //add the 2 event specific peices of info to the event element
          eventEl.append(infoEl);
          eventEl.append(people);
          historyEl.append(eventEl);
        });
    }

//IF the json file has prod photos then add those to the page. ELSE just use the cover photo
if (thisPlay.prodPhotos.length>0) {

  //redorder the photos based on file name 
  let orderedPhotos = thisPlay.prodPhotos.sort((a,b) =>  a.path.localeCompare(b.path))
  //console.log(orderedPhotos); //log to check
  
//for each prod photo make an img element with appropriate alt and labels
  orderedPhotos.forEach(photo => {
    //make img
    const prodPic = document.createElement("img")
    prodPic.src = photo.path
    //add alt text
    prodPic.alt = photo.alt
    //make credit label
    const credit = document.createElement("p")
    if (photo.credit.length>0) {
      credit.innerHTML = "Credit: " + photo.credit
      credit.setAttribute("class","pic-credit")
      
    }
    //add to the photo
    //add the right classes to the img
    const classes = "spec-photos prod-pic dir-"+prodPic.kind
    prodPic.setAttribute("class", classes)
    
    //add to photos div
    photosEl.append(prodPic)
    photosEl.append(credit)
  });
} else {
  //as put above, if no prod photos just cover photo
  const coverImg = document.createElement("img");
  coverImg.src = thisPlay.pic;
  coverImg.setAttribute("class", "spec-photos cover-photo");
  console.log(thisPlay.pic);

  photosEl.append(coverImg);
}

//if the json file has press in it add to page
if (thisPlay.press.length>0) {
  const press = thisPlay.press
  const pressDiv = document.createElement("div")
  
  const pressHeader = document.createElement("h2")
      pressHeader.innerHTML = "Press"
      pressHeader.setAttribute("class", "spec-header")
      //list to hold the various press articles
      const pressEl = document.createElement("ul")
      pressEl.setAttribute("class", "spec-history")
      //add the 2 new elemtns to the page
      pressDiv.append(pressHeader)
      pressDiv.append(pressEl)


      //for each development event...
        press.forEach((article) => {
          //div per development event
          const articleEl = document.createElement("li");
          articleEl.setAttribute("class", "spec-event");

          //p to hold the what/where/when
          const infoEl = document.createElement("p");
          infoEl.setAttribute("class", "info-line press-link");
          infoEl.innerHTML = article.linkText
          infoEl.addEventListener("click", (event) => {
             window.open(article.url, "_blank");
          })

          articleEl.append(infoEl)
          pressEl.append(articleEl)

},
rightCol.append(pressDiv)

)}

}
createPage()

