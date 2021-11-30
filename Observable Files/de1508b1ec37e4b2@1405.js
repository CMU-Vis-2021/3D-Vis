// https://observablehq.com/@radames/youtube-player-api@1405
import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# YouTube Player API

The full [Iframe API Reference](https://developers.google.com/youtube/iframe_api_reference)

examples:
~~~js
viewof player = youtubePlayer('8lsB-P8nGSM')
player.player.then(p => p.playVideo())
player.player.then(p => p.seek(100))
player.player.then(p => p.getSphericalProperties())

player.status // dynamic change based on onStateChange
~~~

~~~js
import { youtubePlayer } from "@radames/youtube-player-api"
~~~
`
)});
  main.variable(observer("viewof player")).define("viewof player", ["youtubePlayer"], function(youtubePlayer){return(
youtubePlayer('8lsB-P8nGSM', 10, 15)
)});
  main.variable(observer("player")).define("player", ["Generators", "viewof player"], (G, _) => G.input(_));
  main.variable(observer()).define(["button","player","html"], function(button,player,html)
{
  const play = button('PLAY');
  play.addEventListener('click', () => {
    player.player.then(p => p.playVideo());
  });
  const pause = button('PAUSE');
  pause.addEventListener('click', () => {
    player.player.then(p => p.pauseVideo());
  });
  return html`${play}${pause}`;
}
);
  main.variable(observer("viewof yaw")).define("viewof yaw", ["slider"], function(slider){return(
slider({
  min: 0,
  max: 360,
  step: 1,
  value: 0,
  title: "Yaw"
})
)});
  main.variable(observer("yaw")).define("yaw", ["Generators", "viewof yaw"], (G, _) => G.input(_));
  main.variable(observer("viewof roll")).define("viewof roll", ["slider"], function(slider){return(
slider({
  min: -180,
  max: 180,
  step: 1,
  value: 0,
  title: "Roll"
})
)});
  main.variable(observer("roll")).define("roll", ["Generators", "viewof roll"], (G, _) => G.input(_));
  main.variable(observer("viewof pitch")).define("viewof pitch", ["slider"], function(slider){return(
slider({
  min: -90,
  max: 90,
  step: 1,
  value: 0,
  title: "Pitch"
})
)});
  main.variable(observer("pitch")).define("pitch", ["Generators", "viewof pitch"], (G, _) => G.input(_));
  main.variable(observer("viewof fov")).define("viewof fov", ["slider"], function(slider){return(
slider({
  min: 30,
  max: 120,
  step: 1,
  value: 100,
  title: "FOV"
})
)});
  main.variable(observer("fov")).define("fov", ["Generators", "viewof fov"], (G, _) => G.input(_));
  main.variable(observer()).define(["player"], function(player){return(
player.status
)});
  main.variable(observer()).define(["player"], function(player){return(
player.player.then(p => p.getCurrentTime())
)});
  main.variable(observer()).define(["player","yaw","roll","pitch","fov"], function(player,yaw,roll,pitch,fov){return(
player.player.then(p => p.setSphericalProperties({
  yaw: yaw,
  roll: roll,
  pitch: pitch,
  fov: fov
}))
)});
  main.variable(observer("youtubePlayer")).define("youtubePlayer", ["YT","html"], function(YT,html){return(
function youtubePlayer(videoId, start = null, end = null, cc_lang = null) {
  // return player states given player state code
  const YTPlayerState = value =>
    Object.keys(YT.PlayerState).find(key => YT.PlayerState[key] === value);

  const container = document.createElement('div');
  const el = document.createElement('div');
  container.classList.add('embed-container');
  container.appendChild(el);
  container.appendChild(html`
        <style>
        .embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        </style>`);
  const onPlayerStateChange = async event => {
    let captions;
    try {
      captions = await event.target.getOption('captions', 'tracklist');
    } catch {
      captions = null;
    }
    container.value.status = {
      currentTime: await event.target.getCurrentTime(),
      data: event.data,
      state: YTPlayerState(event.data),
      captions: captions
    };
    container.dispatchEvent(new CustomEvent("input"));
  };

  container.value = {
    videoId: videoId,
    player: new Promise((resolve, reject) => {
      const player = new YT.Player(el, {
        //videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          cc_load_policy: cc_lang ? 1 : 0,
          cc_lang_pref: cc_lang
        },
        events: {
          onReady: () => resolve(player),
          onStateChange: onPlayerStateChange,
          onApiChange: onPlayerStateChange
        }
      });
    }),
    status: { currentTime: null, data: null, state: null, captions: null }
  };
  container.dispatchEvent(new CustomEvent("input"));

  container.value.player.then(p => {
    p.cueVideoById({ videoId: videoId, startSeconds: start, endSeconds: end });
  });

  return container;
}
)});
  main.variable(observer("YT")).define("YT", ["require"], function(require){return(
new Promise(async (resolve, reject) => {
  const YT = await require('https://www.youtube.com/iframe_api').catch(
    () => window['YT']
  );
  YT.ready(() => resolve(YT));
})
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.import("button", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`### contributions 

1. Promise based player https://observablehq.com/@rahulpowar/youtube-player-api
`
)});
  return main;
}
