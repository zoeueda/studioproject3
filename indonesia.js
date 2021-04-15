
var Airtable = require("airtable");

var base = new Airtable({ apiKey: "keytFRucD479soDkz" }).base(
  "appVmk1cjhpQOcPfm"
);

base("lays").select({
  view: "Indonesia"
}).eachPage(gotPageOfChips, gotAllChips);

var chips = [];

function gotPageOfChips(records, fetchNextPage) { 
console.log("gotPageOfChips()");
console.log("There are "+records.length+" items in records");

chips.push(...records);
fetchNextPage();

}

function gotAllChips(err) {
  console.log("gotAllData()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  showData();

}

function showData() {
  console.log("showData()");


  // find the container
  const chipsContainer = document.querySelector("#container");

  // loop through all the people listed in the Airtable data. Inside is the code we are applying for EACH person in the list of people.
  chips.forEach((chip) => {
    // Print out what a single person's data looks like by printing out its fields
    console.log("SHOWING THE CHIPS")
    console.log(chip.fields);


/** CREATE CONTAINER */

    const chipContainer = document.createElement("div");
    chipContainer.classList.add("chipContainer");
    document.querySelector(".container").append(chipContainer)


    /*******************
    ADD THE IMAGE
    *******************/

    const chipImg = document.createElement("img");
    chipImg.src = chip.fields.image[0].url;
    chipContainer.appendChild(chipImg);


    /*******************
    ADD THE DESCRIPTION
    *******************/

    const chipDescription = document.createElement("p");
    chipDescription.innerText = chip.fields.description;
    chipContainer.appendChild(chipDescription);

    //get tag field from airtable
    //add each tag to a cchip container

    // var chipTag = chip.fields.tag;
    // chipTag.forEach(function(tag) {
    //   chipContianer.classList.add(tag)
    // })
 let flavorsList = chip.fields.flavors;

    flavorsList.forEach(function(flavor){
      const flavorElement = document.createElement("span");
      flavorElement.classList.add("flavorTag");
      flavorElement.innerText = flavor;
      chipContainer.appendChild(flavorElement);
      chipContainer.appendChild(flavorElement);
      console.log(flavor)
      chipContainer.classList.add(flavor);

    });
    
    //add event listener to our filter 


    var filterSpicy = document.querySelector("#spicy");
     filterSpicy.addEventListener("click", function(){

      if (chipContainer.classList.contains("spicy")) {
        chipContainer.style.display = "block"; 
      } else {
        chipContainer.style.display = "none";
      }

     });

       var filterSweet = document.querySelector("#sweet");
     filterSweet.addEventListener("click", function(){

      if (chipContainer.classList.contains("sweet")) {
        chipContainer.style.display = "block"; 
      } else {
        chipContainer.style.display = "none";
      }

     });


       var filterTangy = document.querySelector("#tangy");
     filterTangy.addEventListener("click", function(){

      if (chipContainer.classList.contains("tangy")) {
        chipContainer.style.display = "block"; 
      } else {
        chipContainer.style.display = "none";
      }

     });

        var filterBarbeque = document.querySelector("#barbeque");
     filterBarbeque.addEventListener("click", function(){

      if (chipContainer.classList.contains("barbeque")) {
        chipContainer.style.display = "block"; 
      } else {
        chipContainer.style.display = "none";
      }

     });

  });

}
