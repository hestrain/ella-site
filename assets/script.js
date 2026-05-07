//variable to store the currently viewed play
let currentPlay = ""

//array of play objects
//(1)fireproof, (2)wolf, (3)corps, (4)care/take, (5)becca & the blob, (6)exits
const unsortedPlays = [
    {
        title: "exits",
        title2: "Exits",
        order: 6,
        description:
            "EXITS DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
        pic: "./assets/photos/exits.jpg",
    },
    {
        title: "wolf",
        title2: "Wolf",
        order: 2,
        description:
            "WOLF DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
        pic: "./assets/photos/Wolf2.jpg",
    },
    {
        title: "corps",
        title2: "Corps",
        order: 3,
        description:
            "CORPS DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
        pic: "./assets/photos/corps.jpg",
    },
    {
        title: "fireproof",
        title2: "Fireproof",
        order: 1,
        description:
            "FIREPROOF DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
        pic: "./assets/photos/fireproof.jpg",
    },
    {
        title: "beccablob",
        title2: "Becca and the Blob",
        order: 5,
        description:
            "BECCABLOB DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
        pic: "./assets/photos/beccablob.jpg",
    },
    {
        title: "caretake",
        title2: "Care/Take",
        order: 4,
        description:
            "CARE/TAKE DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
        pic: "./assets/photos/caretake.jpg",
    },
];

//function to show the play description when the cover is hovered over. x is from onmouseenter event
function showDesc(x) {
    //console.log(x); // this was logging the div to mkae sure it was the right place

    //gets the title of the play from the play-id
    const playId = x.getAttribute("play-id");

    //logs the play name for checking
    console.log("hovered on " + playId);

    //declare description variable
    let desc = ""

    //filter through plays array to find the right play to take the description from
    const filteredData = plays.find(
        (play) => play.title === playId,

    );

    //log t check filteredData (appears as an array tho)
    //console.log(filteredData),

    //set description variable to the play desription (and converts that to string)
    desc = filteredData.description.toString();
    ;
    //sets currentPlay to the right element (so that we can hide it easier in the next function)
    currentPlay = document.getElementById(playId + "-desc");

    //change the descirption element to the description we got from filtreedData
    currentPlay.innerHTML = desc;


    //adds a new class
    currentPlay.className += " open-desc"

}

//function to hide the description when mouse leaves
function hideDesc() {

    //clear the description 
    currentPlay.innerHTML = "";
    // reset the class names
    currentPlay.className = "play-desc";

    //log when this action is complete
    console.log("gone");
}
const playsDiv = document.getElementById("playbox")
console.log(playsDiv);

function myFunction() {

const plays = unsortedPlays.sort((a, b) => a.order - b.order);

    plays.forEach(play => {
        //log the title of the play
        console.log(play.title + "'s card is being made");

        //create the card element
        const playCard = document.createElement("div")
        playCard.setAttribute("class", "play")
        //title element
        const playTitle = document.createElement("h4")
        playTitle.innerHTML = play.title2
        //cover div element
        const coverDiv = document.createElement("div")
        coverDiv.setAttribute("class", "cover")
        //.onmouseenter("showDesc(this)").onmouseleave("hideDesc()").addAttribute("play-id", title)
        //cover image element
        const coverImg = document.createElement("img")
        coverImg.setAttribute("class", "sample-img smaller-img")
        coverImg.setAttribute("class", play.title);
        coverImg.setAttribute("src", play.pic);

        //description element (nothing in it rn)
        const descDiv = document.createElement("div")
        descDiv.setAttribute("class", "play-desc-desc")
        descDiv.innerHTML = play.description

        //adds all the elements together onto the playcard, and then to the playsDiv
        playCard.appendChild(playTitle);
        playCard.appendChild(coverDiv)
        coverDiv.appendChild(coverImg)
        playCard.appendChild(descDiv)
        playsDiv.append(playCard);


        //give playcard the event listener to trigger the description showing
        playCard.addEventListener("mouseenter", (event) => {
            // currently mouseover makes text purple
            event.target.style.color = "purple";
            playCard.append(descDiv)
            coverImg.style.opacity = "0%"

        })
        playCard.addEventListener("mouseleave", (event) => {
            // and mouseleave makes text red
            event.target.style.color = "red";
            playCard.removeChild(descDiv)
                        coverImg.style.opacity = "100%";

        }
        )

        //testing picture retrieval
        // const testImg = document.createElement("img")
        // testImg.setAttribute("class", play.title)
        // testImg.setAttribute("src", play.pic)
        // testImg.setAttribute("style", "width:200px")

        // playsDiv.append(testImg)

    });
}

myFunction();