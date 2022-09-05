"use strict";

var player;
let idx = 0;

const { Y, videoList } = window.jmn;
Y.videos = videoList;

Y.checkItem = () => {
  if (player && player.destroy) {
    player.destroy();
  }
  if (idx < Y.videos.length) {
    Y.videos[idx].lastDuration = null;
    const videoId = Y.videos[idx].youtube;
    player = new YT.Player("player", {
      height: "80",
      width: "100",
      videoId,
      events: {
        onReady: onPlayerReady,
      },
    });
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
  setTimeout(() => Y.checkItem(), 0); // important!!!
}

function onPlayerReady(event) {
  const d = event.target.getDuration();
  console.info("READY", event.target, d);

  Y.videos[idx].duration = d;
  Y.renderList();

  idx++;

  setTimeout(() => Y.checkItem(), 0); // important!!!
}

Y.openModal = () => {
  document.querySelector(".modal").classList.add("open");
};

Y.closeModal = () => {
  document.querySelector(".modal").classList.remove("open");
};

Y.renderItem = (item) => `${
  item.youtube
    ? `<a target="_blank" href="https://www.youtube.com/watch?v=${item.youtube}">`
    : ""
}
    <img width="320px" height="180px" class="responsive-img" src="thumbs/jv${
      item.id
    }tn.jpg">
    ${item.youtube ? "</a>" : ""}
    ${
      item.duration === 0
        ? '<div class="cover" onClick="Y.openModal()"></div><i class="icon-lock locked"></i>'
        : ""
    }
    ${
      item.duration === undefined
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

Y.render = () => {
  console.log("video render");
  setTimeout(() => Y.checkItem(), 0); // important!!!
  Y.renderList(true);
};
