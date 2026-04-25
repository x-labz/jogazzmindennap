"use strict";

const { Y } = window.jmn;
Y.videos = [];

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
    <img width="320px" height="180px" class="responsive-img" src="/thumbs/jv${item.id
  }tn.${item.ext || 'jpg'}">
    ${item.youtube ? "</a>" : ""}`

Y.renderList = () => {
  document.querySelectorAll(".videos .thumb").forEach((item, idx) => {
    item.innerHTML = Y.renderItem(Y.videos[idx]);
  });
};

Y.render = async (items) => {
  console.log("video render");
  Y.videos = items;
  Y.renderList();
};
