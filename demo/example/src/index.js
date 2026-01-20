/** @flow */

import add from "./addition.js";
import shadowCSS from "./assets/shadow.css";
// $FlowFixMe[cannot-resolve-module]
import shadowDOM from "./assets/template.html";
import playButton from "./assets/yt-play-icon.svg"

console.log(shadowCSS, shadowDOM, playButton, add(1, 2, 3));