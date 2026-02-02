/** @flow */

import add from "./addition.js";
import playButton from "./assets/yt-play-icon.svg";
import shadowCSS from "./assets/shadow.css";
// $FlowFixMe[cannot-resolve-module]
import shadowDOM from "./assets/template.html";

console.log(shadowCSS, shadowDOM, playButton, add(1, 2, 3));