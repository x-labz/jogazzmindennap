'use strict';

// var player;
// let idx = 0;

// Y.checkItem = () => {
//     if (player && player.destroy) {
//         player.destroy();
//     }
//     if (idx < Y.videos.length) {
//         const videoId = Y.videos[idx].youtube;
//         player = new YT.Player('player', {
//             height: '80',
//             width: '100',
//             videoId,
//             events: {
//                 'onReady': onPlayerReady
//             }
//         });
//     }
//     else {
//         player = new YT.Player('player', {});
//         console.log('DONE', Y.videos, player)
//     }
//     Y.renderList()
// }

// 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

// function onYouTubeIframeAPIReady() {
//     console.info('start');
//     setTimeout(() => Y.checkItem(), 0); // important!!!
// }

// 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//     const d = event.target.getDuration();
//     console.info('READY', event.target, d);

//     Y.videos[idx].duration = d;
//     idx++;

//     setTimeout(() => Y.checkItem(), 0); // important!!!
// }

Y.openModal = () => {
    document.querySelector('.modal').classList.add('open');
}

Y.closeModal = () => {
    document.querySelector('.modal').classList.remove('open');
}

// Y.renderItem = (item) => `${item.youtube ? `<a target="_blank" href="https://www.youtube.com/watch?v=${item.youtube}">` : ''}<img width="320px" height="180px" class="responsive-img" src="thumbs/jv${item.id}tn.jpg">${item.youtube ? '</a>' : ''}
//     ${item.duration === 0 ? '<div class="cover" onClick="Y.openModal()"><i class="icon-lock locked"></></div>' : ''}
//     ${item.duration === undefined ? '<div class="cover"><div class="lds-dual-ring"></div></div>' : ''}`

Y.renderItem = (item) => `${item.youtube ? `<a target="_blank" href="https://www.youtube.com/watch?v=${item.youtube}">` : ''}
<img width="320px" height="180px" class="responsive-img" src="/thumbs/jv${item.id}tn.${item.ext || 'jpg'}">${item.youtube ? '</a>' : ''}
    ${!item.youtube ? '<div class="cover" onClick="Y.openModal()"><i class="icon-lock locked"></></div>' : ''}`


Y.renderList = () => {
    document.querySelectorAll('.videos .thumb').forEach((item, idx) => {
        item.innerHTML = Y.renderItem(Y.videos[idx])
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("YOGA", Y.videos.map(v => v.duration))
    Y.renderList()
});


