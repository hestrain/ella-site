import unsortedPlays from "./ellaplays.json" with { type: "json" };

let checkUrl = window.location.href
console.log(checkUrl);
// Source - https://stackoverflow.com/a/4758173
// Posted by Frédéric Hamidi, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-09, License - CC BY-SA 4.0

let shortUrl = checkUrl.substring(checkUrl.lastIndexOf('/') + 1);

let pageName = shortUrl.split(".")[0];

console.log(pageName);

let thisPlay = unsortedPlays.find((play) => play.title === pageName);

const titleEl = document.getElementById("title")
const descEl = document.getElementById("desc");
const detailsEl = document.getElementById("details");
const castEl = document.getElementById("cast-zone")
const photosEl = document.getElementById("photos")


function createPage(){

  //title etc all go on the right in order
  // title, teaser, descritpion, castSize, status, age, ogDev, devHist, Press

  const title = document.createElement("h2")
  title.innerHTML = thisPlay.title2;
  title.setAttribute("class", "spec-title")

  titleEl.append(title)

  const teaser = document.createElement("p")
  teaser.setAttribute("class","spec-teaser")
  teaser.innerHTML = thisPlay.teaser

  descEl.append(teaser)

  const description = document.createElement("p")
  description.innerHTML = thisPlay.description
    description.setAttribute("class","spec-desc")

  descEl.append(description)

  const castSize = document.createElement("scan")
  castSize.innerHTML = thisPlay.castSize
    castSize.setAttribute("class", "spec-cast");

  castEl.append(castSize)
  
if (thisPlay.age.length>0) {
  const age = document.createElement("scan");
  age.innerHTML = thisPlay.age;
  age.setAttribute("class", "spec-age");

  detailsEl.append(age);
}

if (thisPlay.status.length>0) {
    const status = document.createElement("scan");
    status.innerHTML = thisPlay.status;
    status.setAttribute("class", "spec-status");
const statusEl = document.createElement("p");
statusEl.setAttribute("class","status-zone")
statusEl.innerHTML ="Status: "
descEl.append(statusEl)

    statusEl.append(status);
}
    const ogDev = document.createElement("p");
    ogDev.innerHTML = thisPlay.ogDev;
    ogDev.setAttribute("class", "spec-ogdev");

    detailsEl.append(ogDev);

    let fullHistory = thisPlay.devHist
    if (fullHistory.length>0) {
      const historyHeader = document.createElement("h2")
      historyHeader.innerHTML = "Past Development"
      historyHeader.setAttribute("class", "spec-header")
      const historyEl = document.createElement("ul")
      historyEl.setAttribute("class", "spec-history")
      const historyDiv = document.getElementById("history")

      historyDiv.append(historyHeader)
      historyDiv.append(historyEl)

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

          //for each person listed. . .
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
//IF theres anything in DevHist then you have to do this




if (thisPlay.prodPhotos.length>0) {

  let orderedPhotos = thisPlay.prodPhotos.sort((a,b) =>  a.path.localeCompare(b.path))
  console.log(orderedPhotos);
  

  orderedPhotos.forEach(photo => {
    const prodPic = document.createElement("img")
    prodPic.src = photo.path
    prodPic.alt = photo.alt
    const credit = document.createElement("label")
    credit.innerHTML = photo.credit
    credit.setAttribute("class","pic-credit")
    prodPic.append(credit)
    const classes = "spec-photos prod-pic dir-"+prodPic.kind
    prodPic.setAttribute("class", classes)

    photosEl.append(prodPic)
  });
} else {
  const coverImg = document.createElement("img");
  coverImg.src = thisPlay.pic;
  coverImg.setAttribute("class", "spec-photos cover-photo");
  console.log(thisPlay.pic);

  photosEl.append(coverImg);
}


}
createPage()

