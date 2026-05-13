//import the plays to make the page
import unsortedPlays from "./ellaplays.json" with { type: "json" };
import contacts from "./contact.json" with { type: "json" };


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


//find the main div (called columns)
const deetsPage = document.getElementById("detail-page-div")



//function to generate page content
function createPage() {
  //title etc all go on the right of the page in order
  // title, teaser, descritpion, castSize, status, age, ogDev, devHist, Press

  //make photo div (left col)
  const leftCol = document.createElement("div");
  leftCol.setAttribute("id", "left-col");
  leftCol.setAttribute("class", "project-left");
  //add to page
  deetsPage.append(leftCol);

  //make info div (right col)
  const rightCol = document.createElement("div");
  rightCol.setAttribute("id", "right-col");
  rightCol.setAttribute("class", "project-right");

  //add to page
  deetsPage.append(rightCol);

  //make title div
  const titleEl = document.createElement("div");
  titleEl.setAttribute("class", "spec-title");
  rightCol.append(titleEl);

  //------------TITLE-------------------

  const title = document.createElement("h2");
  title.innerHTML = thisPlay.title2;
  title.setAttribute("class", "spec-title");

  //add it to the titleDiv
  titleEl.append(title);

  //------------DESCRIPTION-------------------
  const descEl = document.createElement("div");
  descEl.setAttribute("class", "spec-desc-el");
  rightCol.append(descEl);

  //teaser for the play description
  const teaser = document.createElement("p");
  teaser.setAttribute("class", "spec-teaser");
  teaser.innerHTML = thisPlay.teaser;

  //add to the description
  descEl.append(teaser);

  //description of play
  const description = document.createElement("p");
  description.innerHTML = thisPlay.description;
  description.setAttribute("class", "spec-desc");

  //add it to the description area, under the teaser
  descEl.append(description);

  //------------MORE DETAILS-------------------
  const detailsEl = document.createElement("div");
  detailsEl.setAttribute("class", "spec-details");
  rightCol.append(detailsEl);

  //------------DETAILS HEADER-------------------
  const detailsH = document.createElement("h4");
  detailsH.setAttribute("class", "spec-header");
  detailsH.innerHTML = "More Information";
  detailsEl.append(detailsH);

  //------------AGE-------------------

  //ONLY add an age section if theres info in the json file
  if (thisPlay.age.length > 0) {
    const age = document.createElement("p");
    age.innerHTML = thisPlay.age;
    age.setAttribute("class", "spec-age ques");

    detailsEl.append(age);
  }

  //------------STATUS-------------------

  //ONLY add a status if theres info on the json file
  if (thisPlay.status.length > 0) {
    const status = document.createElement("scan");
    status.innerHTML = thisPlay.status;
    const statusEl = document.createElement("p");
    statusEl.setAttribute("class", "status-zone spec-status");
    statusEl.innerHTML = "Status: ";
    detailsEl.append(statusEl);

    statusEl.append(status);
  }

  //------------CAST SIZE-------------------

  //cast size line
  const castEl = document.createElement("p");
  castEl.setAttribute("class", "spec-cast ques");
  castEl.setAttribute("id", "cast-zone");
  detailsEl.append(castEl);
  castEl.innerHTML = "Cast Size: ";

  const castSize = document.createElement("scan");
  castSize.innerHTML = thisPlay.castSize;

  //add it to the existing p
  castEl.append(castSize);

  //------------ORIGINAL DEVELOPMENT-------------------

  // original or current development
  const ogDev = document.createElement("p");
  ogDev.innerHTML = thisPlay.ogDev;
  ogDev.setAttribute("class", "spec-ogdev");

  detailsEl.append(ogDev);

  //------------DEVELOPMENT HISTORY-------------------

  //only add a development history section if there is info in the json file
  let fullHistory = thisPlay.devHist;
  if (fullHistory.length > 0) {
    //------------DEV HIST HEADER-------------------

    //header the the section
    const historyHeader = document.createElement("h4");
    historyHeader.innerHTML = "Past Development";
    historyHeader.setAttribute("class", "spec-header");

    //------------DEV EVENT UNORDERED LIST-------------------
    //list to hold the various development events
    const historyEl = document.createElement("ul");
    historyEl.setAttribute("class", "spec-history");
    const historyDiv = document.createElement("div");
    historyDiv.setAttribute("class", "history");
    rightCol.append(historyDiv);
    //add the 2 new elemtns to the page
    historyDiv.append(historyHeader);
    historyDiv.append(historyEl);

    //for each development event...
    fullHistory.forEach((event) => {
      //div per development event
      //------------EVENT ELEMENT-------------------

      const eventEl = document.createElement("li");
      eventEl.setAttribute("class", "spec-event");

      //p to hold the what/where/when (ALL IN 1 ROW TOGETHER)
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

  //------------PHOTO COLUMN-------------------

  //make photo column first (SOMETHING will go in it)
  const photosEl = document.createElement("div");
  photosEl.setAttribute("class", "photo-col");
  leftCol.append(photosEl);

  //------------PROD PHOTOS-------------------

  //IF the json file has prod photos then add those to the page. ELSE just use the cover photo
  if (thisPlay.prodPhotos.length > 0) {
    //redorder the photos based on file name
    let orderedPhotos = thisPlay.prodPhotos.sort((a, b) =>
      a.path.localeCompare(b.path),
    );

    //for each prod photo make an img element with appropriate alt and labels
    orderedPhotos.forEach((photo) => {
      //make img
      const prodPic = document.createElement("img");
      prodPic.src = photo.path;
      //add alt text
      prodPic.alt = photo.alt;
      //make credit label
      const credit = document.createElement("p");
      if (photo.credit.length > 0) {
        credit.innerHTML = "Credit: " + photo.credit;
        credit.setAttribute("class", "pic-credit");
      }
      //add to the photo
      //add the right classes to the img
      const classes = "spec-photos sample-img prod-pic dir-" + prodPic.kind;
      prodPic.setAttribute("class", classes);

      //add to photos div
      photosEl.append(prodPic);
      photosEl.append(credit);
    });
  } else {
    //------------COVER PHOTO-------------------

    //as put above, if no prod photos just cover photo
    const coverImg = document.createElement("img");
    coverImg.src = thisPlay.pic;
    coverImg.setAttribute("class", "spec-photos cover-photo prod-pic");
    // console.log(thisPlay.pic);

    photosEl.append(coverImg);
  }

  //------------PRESS-------------------

  //if the json file has press in it add to page
  if (thisPlay.press.length > 0) {
    const press = thisPlay.press;
    const pressDiv = document.createElement("div");

    const pressHeader = document.createElement("h4");
    pressHeader.innerHTML = "Press";
    pressHeader.setAttribute("class", "spec-header");
    //list to hold the various press articles
    const pressEl = document.createElement("ul");
    pressEl.setAttribute("class", "spec-history");
    //add the 2 new elemtns to the page
    pressDiv.append(pressHeader);
    pressDiv.append(pressEl);

    //for each article...
    press.forEach((article) => {
      //div per article
      const articleEl = document.createElement("li");
      articleEl.setAttribute("class", "spec-event");

      //p to hold the what/where/when
      const infoEl = document.createElement("p");
      infoEl.setAttribute("class", "info-line press-link");
      infoEl.innerHTML = article.linkText;
      infoEl.addEventListener("click", (event) => {
        window.open(article.url, "_blank");
      });

      articleEl.append(infoEl);
      pressEl.append(articleEl);
    }, rightCol.append(pressDiv));
  }

  const spacerElR = document.createElement("div")
  spacerElR.setAttribute("class", "spec-spacer")
  rightCol.append(spacerElR)

   const spacerElL = document.createElement("div");
   spacerElL.setAttribute("class", "spec-spacer");
   leftCol.append(spacerElL);

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
createPage()

