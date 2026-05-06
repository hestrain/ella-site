//variable to store the currently viewed play
let currentPlay = ""

//array of play objects
const plays = [
    {
        title: "exits",
        description:
            "EXITS DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
    },
    {
        title: "wolf",
        description:
            "WOLF DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
    },
    {
        title: "corps",
        description:
            "CORPS DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
    },
    {
        title: "fireproof",
        description:
            "FIREPROOF DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
    },
    {
        title: "beccablob",
        description:
            "BECCABLOB DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
    },
    {
        title: "caretake",
        description:
            "CARE/TAKE DESCRIPTION Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat officiis nulla iste aspernatur repellendus exercitationem, eius at maiores nisi, perferendis quisquam tempore aliquid voluptatum labore aliquam libero dignissimos ducimus numquam.",
    }
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
    desc = filteredData.description.toString()

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