import {createApp} from 'vue';
import App from './App.vue';
import '../index.css';
const nowURL = new URL(document.location);
const paramTbm = nowURL.searchParams.get("tbm");
if ([null, "", "vid", "nws"].includes(paramTbm)) {
  // make space for this extension
  let amzSchRoot = document.createElement('div');
  amzSchRoot.id = 'amzSchRoot';
  amzSchRoot.style.position = 'relative';
  amzSchRoot.style.width = '350px';

  // set padding
  let amzSchRootPx = 8;
  amzSchRoot.style.paddingRight = `${amzSchRootPx}px`;

  // calculate value to set marginLeft
  let amzSchRootMlsp = 60;
  let style = window.getComputedStyle(document.getElementById('center_col'));
  let amzSchRoolMl = parseInt(style.marginLeft) + parseInt(style.width) + amzSchRootMlsp;

  // set margin
  amzSchRoot.style.marginLeft = `${amzSchRoolMl}px`;


  let rhs = document.getElementById('rhs');
  if (rhs) {
    // let rhsStyle = window.getComputedStyle(rhs);
    amzSchRoot.style.marginLeft = 0;
    rhs.insertAdjacentElement('afterbegin', amzSchRoot);
  } else {
    // make dummy div for position adjustment
    let amzSchDummy = document.createElement('div');
    amzSchDummy.id = 'amzSchDummy';
    // set height to prevent element that id=main from shifting
    amzSchDummy.style.height = 0;

    // set zIndex to display space for this extension deeper than element that id=searchform
    let searchform = document.getElementById('searchform');
    let style = window.getComputedStyle(searchform);
    amzSchDummy.style.zIndex = style.zIndex - 1;

    // mount dummy div for position adjustment
    amzSchDummy.appendChild(amzSchRoot);
    document.getElementById('rcnt').lastElementChild.insertAdjacentElement('beforebegin', amzSchDummy);
  }

  // mount elements of this extension
  createApp(App, {nowURL: nowURL, paramTbm: paramTbm}).mount('#amzSchRoot');
}
