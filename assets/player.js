function setStatus(status) {
    switch(findGetParameter("debug")) {
        case "full":
            document.getElementById("statusheading").innerHTML = status;
            console.log(status);
            break;
        case "minimal":
            console.log(status);
            break;
    }
}
    

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function setupRuffle(swfurl) {
    return new Promise((resolve, reject) => {
        setStatus("[setupRuffle:Init] Setting up Ruffle...");
        window.RufflePlayer = window.RufflePlayer || {};
        window.addEventListener("load", (event) => {
            const ruffle = window.RufflePlayer.newest();
            const player = ruffle.createPlayer();
            player.classList.add("flash");
            const container = document.getElementById("flashcontainer");
            container.appendChild(player);
            setStatus("[setupRuffle:Ruffle] Loading SWF file...");
            player.load(swfurl);
            setStatus("[setupRuffle:Ruffle] Ruffle setup complete, returning to setupPlayer.");
            resolve();
        });
    })    
}

async function setupPlayer() {
    setStatus("[setupPlayer:Init] Setting up player...");
    var title = findGetParameter("title");
    if (title == null) {
        setStatus("ErrorIn[setupPlayer:Init] No title provided!");
    } else {
        document.getElementById("playertitle").innerHTML = findGetParameter("title");
    }
    var swfurl = findGetParameter("swfurl");
    if (swfurl == null) {
        setStatus("ErrorIn[setupPlayer:Init] No SWF URL provided!");
        showNoMediaNotice();
        return;
    } else {
        setStatus("[setupPlayer:Init] Got SWF URL: " + swfurl);
        if (swfurl.startsWith("http://") || swfurl.startsWith("https://")) {
            setStatus("ErrorIn[setupPlayer:Init] URL appears to be a remote URL, this is not allowed for security reasons!");
            return;
        }
    }
    const result = await setupRuffle(swfurl);
    setStatus("[setupPlayer:HTML] Checking if we can use fullscreen...");
    document.getElementById("fullscreenbutton").style.display = "block";
    if (document.fullscreenEnabled) {
        setStatus("[setupPlayer:HTML] Native fullscreen is supported!");
        
    } else {
        setStatus("[setupPlayer:HTML] Native fullscreen is not supported, will use div resizing!");
    }
    setStatus("[setupPlayer:Init] Done!");
    setTimeout(setStatus, 2000, "");
}

function enterFullscreen() {
    if (document.fullscreenEnabled) {
        document.getElementById("flashcontainer").requestFullscreen();
    } else {
        document.getElementById("flashcontainer").classList.add("divMehFullscreen");
        document.getElementsByTagName("footer")[0].style.display = "none";
        document.getElementsByTagName("body")[0].classList.add("noScroll");
    }
}

function showNoMediaNotice() {
    document.getElementById("nomedianoticep").style.display = "block";
    document.getElementById("flashcontainer").style.display = "none";
    document.getElementById("togglecontrolsbutton").style.display = "none";

}

function toggleControlsVisibility() {
    if (document.getElementById("controlscontainer").style.display == "grid") {
        document.getElementById("controlscontainer").style.display = "none";
        document.getElementById("togglecontrolsbutton").innerHTML = "Show Controls";
        return;
    } else {
        document.getElementById("controlscontainer").style.display = "grid";
        document.getElementById("togglecontrolsbutton").innerHTML = "Hide Controls";
    }
}
function addControlButtonHandler(buttonElement, button) {
    processButton = function(){
        controlButtonDown(button);
        document.onpointerup = function(){
            controlButtonUp(button);
        }
    }
    buttonElement.onpointerdown = processButton;
}
function controlButtonDown(button) {
    const player = document.getElementsByClassName("flash")[0];
    setStatus("[controlButtonDown] Button down: " + button); //debug info
    let pointerEvent = new PointerEvent("pointerdown");
    player.dispatchEvent(pointerEvent);
    switch(button) {
        case "up":
            player.dispatchEvent(new KeyboardEvent('keydown', {key: "ArrowUp",code: "ArrowUp",keyCode: 38,bubbles: true}));
            break;
        case "down":
            player.dispatchEvent(new KeyboardEvent('keydown', {key: "ArrowDown",code: "ArrowDown",keyCode: 40,bubbles: true}));
            break;
        case "left":
            player.dispatchEvent(new KeyboardEvent('keydown', {key: "ArrowLeft",code: "ArrowLeft",keyCode: 37,bubbles: true}));
            break;
        case "right":
            player.dispatchEvent(new KeyboardEvent('keydown', {key: "ArrowRight",code: "ArrowRight",keyCode: 39,bubbles: true}));
            break;
    }
}
function controlButtonUp(button) {
    const player = document.getElementsByClassName("flash")[0];
    setStatus("[controlButtonUp] Button up: " + button); //debug info
    let pointerEvent = new PointerEvent("pointerdown");
    player.dispatchEvent(pointerEvent);
    switch(button) {
        case "up":
            player.dispatchEvent(new KeyboardEvent('keyup', {key: "ArrowUp",code: "ArrowUp",keyCode: 38,bubbles: true}));
            break;
        case "down":
            player.dispatchEvent(new KeyboardEvent('keyup', {key: "ArrowDown",code: "ArrowDown",keyCode: 40,bubbles: true}));
            break;
        case "left":
            player.dispatchEvent(new KeyboardEvent('keyup', {key: "ArrowLeft",code: "ArrowLeft",keyCode: 37,bubbles: true}));
            break;
        case "right":
            player.dispatchEvent(new KeyboardEvent('keyup', {key: "ArrowRight",code: "ArrowRight",keyCode: 39,bubbles: true}));
            break;
    }
}

window.onload = function() {
    addControlButtonHandler(document.getElementById('controlsleftbutton'), "left");
    addControlButtonHandler(document.getElementById('controlsupbutton'), "up");
    addControlButtonHandler(document.getElementById('controlsrightbutton'), "right");
    addControlButtonHandler(document.getElementById('controlsdownbutton'), "down");
}