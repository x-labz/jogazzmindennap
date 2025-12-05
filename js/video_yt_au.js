"use strict";

var player;
let idx = 0;

const { Y } = window.jmn;
Y.videos = [];

// Promise that resolves when YouTube IFrame API is ready
let resolveYouTubeApiReady;
const youtubeApiReady = new Promise((resolve) => {
  resolveYouTubeApiReady = resolve;
});

function onPlayerReady(event) {
  const d = event?.target?.getDuration() || 0;
  console.info("READY", event?.target, d);

  Y.videos[idx].duration = d;
  Y.renderList();

  idx++;

  setTimeout(() => Y.checkItem(), 0); // important!!!
}

Y.checkItem = () => {
  if (player && player.destroy) {
    player.destroy();
  }
  if (idx < Y.videos.length) {
    Y.videos[idx].lastDuration = null;
    const videoId = Y.videos[idx].youtube;
    try {
      player = new YT.Player("player", {
        height: "80",
        width: "100",
        videoId,
        events: {
          onReady: onPlayerReady,
        },
      });
    } catch (e) {
      console.error("YT PLAYER ERROR", e, videoId);
      onPlayerReady()
    }
  } else {
    player = new YT.Player("player", {});
    console.log("DONE", Y.videos, player);
  }
};

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  console.info("onYouTubeIframeAPIReady");
  resolveYouTubeApiReady(); // Resolve the promise
  setTimeout(() => Y.checkItem(), 0); // important!!!
}



Y.openModal = () => {
  document.querySelector(".modal").classList.add("open");
};

Y.closeModal = () => {
  document.querySelector(".modal").classList.remove("open");
};

Y.renderItem = (item) => `${item.youtube
  ? `<a target="_blank" href="https://www.youtube.com/watch?v=${item.youtube}">`
  : ""
  }
    <img width="320px" height="180px" class="responsive-img" src="thumbs/jv${item.id
  }tn.${item.ext || 'jpg'}">
    ${item.youtube ? "</a>" : ""}
    ${item.duration === 0
    ? '<div class="cover" onClick="Y.openModal()"></div><i class="icon-lock locked"></i>'
    : ""
  }
    ${item.duration === undefined
    ? '<div class="cover active"><div class="lds-dual-ring"></div></div>'
    : ""
  }`;

Y.renderList = (forced) => {
  document.querySelectorAll(".videos .thumb").forEach((item, idx) => {
    if (Y.videos[idx].duration !== Y.videos[idx].lastDuration || forced) {
      console.log("item", idx);
      item.innerHTML = Y.renderItem(Y.videos[idx]);

      Y.videos[idx].lastDuration = Y.videos[idx].duration;
    }
  });
};

Y.render = async (items) => {
  console.log("video render");
  Y.videos = items;

  // Wait for YouTube API to be ready before rendering
  await youtubeApiReady;

  Y.checkItem()
  Y.renderList(true);
};
