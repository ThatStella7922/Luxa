let genres = [
  ["Games", "games"],
  ["Media", "media"],
];

let games = [
  ["Run", "games/run.swf"],
  ["Run 2", "games/run2.swf"],
  ["Bloxorz", "games/bloxorz.swf"],
];

let media = [
  ["Marisa Stole The Precious Thing", "videos/marisastolethepreciousthing.swf"],
  ["test2", "test2.swf"],
]


function changeGenre (genreItem) {
  const gamesSelector = document.getElementById("gamesSelector");
  const mediaSelector = document.getElementById("mediaSelector");

  switch(genreItem) {
    case "games":
      gamesSelector.classList.remove("hideElement");
      mediaSelector.classList.add("hideElement");
      break;
    case "media":
      gamesSelector.classList.add("hideElement");
      mediaSelector.classList.remove("hideElement");
      break;
  }
}

function mediaSelectionChanged (path, object) {
  console.log("Media selection changed: " + path);
  if (path.endsWith(".swf")) {
    console.log("Media selection is a swf");
    console.log(object[1]);
    document.getElementById("startMediaButton").classList.remove("hideElement");
    document.getElementById("startMediaButton").addEventListener("click", arg => {
      console.log("BUTTON CLICK: starting media: " + path);
      const mediaTitle = encodeURI(object.find(item => item[1] === path)[0]);
      const mediaPath = encodeURI(path);
      console.log("StartMedia:" + mediaPath + " with title: "+ mediaTitle);
      startMedia(path, mediaTitle);
    });
  } else {
    console.log("Media selection is not a swf");
    document.getElementById("startMediaButton").classList.add("hideElement");
  }
}

function populateSelector (selector, item) {
  item.forEach(function (item, index) {
    let option = document.createElement("option");
    option.setAttribute('value', item[1]);
    let optionText = document.createTextNode(item[0]);
    option.appendChild(optionText);
    selector.appendChild(option);
  });
}

function startMedia (mediaSelectionPath, mediaSelectionName) {
  window.location.href = "player.html?swfurl=" + mediaSelectionPath + "&title=" + mediaSelectionName;
}

window.onload = function() {
  const genreSelector = document.getElementById("genreSelector");
  const gamesSelector = document.getElementById("gamesSelector");
  const mediaSelector = document.getElementById("mediaSelector");

  populateSelector(genreSelector, genres);
  populateSelector(gamesSelector, games);
  populateSelector(mediaSelector, media);

  genreSelector.addEventListener("change", newValue => {
    changeGenre(newValue.target.value);
  });

  gamesSelector.addEventListener("change", newValue => {
    mediaSelectionChanged(newValue.target.value, games);
  });

  mediaSelector.addEventListener("change", newValue => {
    mediaSelectionChanged(newValue.target.value, media);
  })
}