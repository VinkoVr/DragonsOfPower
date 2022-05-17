const data = [];
const url = "https://www.dnd5eapi.co/api/races/";

let races = [];
let race = {};
let traits = [];
async function getData() {
  try {
    const receiveData = await fetch(url);
    const dataReceived = await receiveData.json();
    const result = dataReceived.results;
    result.forEach((element) => {
      races.push(element.name);
    });

    let reorganize = await function () {};

    reorganize();
  } catch (err) {
    console.log(err + " Something went wrong");
  }
}
getData();

function observing() {
  let input1 = "";

  function raceInput() {
    let raceName = document.querySelector(".raceName");
    raceName.addEventListener("keyup", function (e) {
      return (input1 = e.target.value);
    });
  }

  raceInput();

  let button = document.querySelector(".btnRaces");
  button.addEventListener("click", function () {
    let unhide = document.querySelector(".racesList").classList.toggle("hide");
    // let showArrow = document
    //   .querySelector(".icon-right")
    //   .classList.toggle("hide");
    // let showArrow2 = document
    //   .querySelector(".icon-right")
    //   .classList.add("icon-right--animate");
    for (let i = 0; i < races.length; i++) {
      document.getElementById(`${i + 1}`).textContent = `${races[i]}`;
      document
        .getElementById(`${i + 1}`)
        .addEventListener("click", function () {
          let name = races[i];

          let grabUrl = url + `${name.toLowerCase()}`;
          let oops = document
            .querySelector(".desc__list")
            .classList.remove("hide");
          let oops2 = document
            .querySelector(".desc__img")
            .classList.add("remove");
          async function convert() {
            let data = await fetch(grabUrl);
            let toJson = await data.json();

            let setRaceName = (document.querySelector(".name").textContent =
              toJson.name);
            let setAlignment = (document.querySelector(
              ".raceAlignment"
            ).textContent = "Alignment: " + toJson.alignment);
            let setRaceLanguage = (document.querySelector(
              ".raceLanguage"
            ).textContent = "Language: " + toJson.language_desc);
            let setRaceAge = (document.querySelector(".raceAge").textContent =
              "Age: " + toJson.age);
            let setRaceSize = (document.querySelector(".raceSize").textContent =
              "Size: " + toJson.size_description);

            for (const iterator of toJson.traits) {
              traits.push(iterator.name);
            }

            let setRaceTraits = (document.querySelector(
              ".raceTraits"
            ).textContent = "Traits: " + traits);
            traits = [];
          }

          convert();
        });
    }
  });

  function select() {
    let select = document
      .querySelector(".btn2")
      .addEventListener("click", function () {
        let setUrl = url + input1.toLowerCase();
        async function convert() {
          try {
            let data = await fetch(setUrl);

            if (data.status !== 200) {
              console.log("Woops. Something is not right here.");
              let oops = document
                .querySelector(".desc__list")
                .classList.add("hide");
              let oops2 = (document.querySelector(
                ".raceName__label"
              ).textContent =
                "Oops, please make sure to type in the correct name.");
              let oops3 = document
                .querySelector(".raceName")
                .classList.toggle("woopsy");

              setTimeout(() => {
                let oops3 = document
                  .querySelector(".raceName")
                  .classList.toggle("woopsy");
              }, 1000);
            } else {
              let oops = document
                .querySelector(".raceName")
                .classList.remove("woopsy");
              let toJson = await data.json();
              document.querySelector(".raceName__label").textContent =
                "Success";
              setTimeout(() => {
                document.querySelector(".raceName__label").textContent =
                  "Search for specific Race";
                document.querySelector(".raceName").classList.toggle("woopsy2");
              }, 1000);
              document.querySelector(".raceName").classList.toggle("woopsy2");
              let oops2 = document
                .querySelector(".desc__list")
                .classList.remove("hide");
              let oops3 = document
                .querySelector(".desc__img")
                .classList.add("remove");
              let setRaceName = (document.querySelector(".name").textContent =
                toJson.name);
              let setAlignment = (document.querySelector(
                ".raceAlignment"
              ).textContent = "Alignment: " + toJson.alignment);
              let setRaceLanguage = (document.querySelector(
                ".raceLanguage"
              ).textContent = "Language: " + toJson.language_desc);
              let setRaceAge = (document.querySelector(".raceAge").textContent =
                "Age: " + toJson.age);
              let setRaceSize = (document.querySelector(
                ".raceSize"
              ).textContent = "Size: " + toJson.size_description);

              for (const iterator of toJson.traits) {
                traits.push(iterator.name);
              }

              let setRaceTraits = (document.querySelector(
                ".raceTraits"
              ).textContent = "Traits: " + traits);
            }
          } catch (err) {
            console.log("Something is not right." + err);
          }
        }
        convert();
      });
  }
  select();
}
observing();
export { getData, observing };
