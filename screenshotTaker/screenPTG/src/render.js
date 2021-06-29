const { desktopCapturer, shell } = require("electron");
const { screen } = require("electron").remote;
const dateFormat = require("date-format");
const fs = require("fs");
const os = require("os");
const path = require("path");
var setIntervalID;

// const displayScreenshot = document.querySelector('displayScreenshot')
const imageTag = document.getElementById("scrshot");
const screenshot = document.getElementById("takeScreenshot");
const stop = document.getElementById("stoptakingScreenshot");
const screenshotMsg = document.getElementById("screenshot-path");

function getImageName() {
  let date = new Date();
  var name = dateFormat.asString("ddMMyyyyhhmmssSSS", date);
  // console.log(name);
  return name;
}

stop.addEventListener("click", (event) => {
  clearInterval(setIntervalID);
  stop.disabled = true;
});

function takeScreenshot() {
  console.log("Taking screen shot");
  screenshotMsg.textContent = "Gathering screens...";
  const thumbSize = determineScreenShotSize();
  getImageSources(thumbSize).then((sources) => {
    sources.forEach((source) => {
      if (source.name === "Entire Screen" || source.name === "Screen 1") {
        const screenshotPath = path.join(os.tmpdir(), getImageName() + ".png");
        // const screenshotPath = path.join(os.tmpdir(), "screenshot.png")
        fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (error) => {
          if (error) return console.log(error);

          //To open the image in image viewer
          // shell.openExternal(`file://${screenshotPath}`)

          const message = `Saved screenshot to: ${screenshotPath}`;
          imageTag.src = screenshotPath;
          screenshotMsg.textContent = message;
        });
      }
    });
  });
}

screenshot.addEventListener("click", (event) => {
  takeScreenshot();
  stop.disabled = false;
  setIntervalID = setInterval(function () {
    takeScreenshot();
  }, 30000);
});

async function getImageSources(thumbSize) {
  const inputSources = await desktopCapturer.getSources({
    thumbnailSize: thumbSize,
    types: ["window", "screen"],
  });
  return inputSources;
}

function determineScreenShotSize() {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const maxDimension = Math.max(screenSize.width, screenSize.height);
  return {
    width: maxDimension * window.devicePixelRatio,
    height: maxDimension * window.devicePixelRatio,
  };
}
