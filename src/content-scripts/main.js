import {createApp} from 'vue';
import App from './App.vue';
import '../index.css';

// make space for this extension
let amzSchRoot = document.createElement('div');
amzSchRoot.id = 'amzSchRoot';

// set padding
let amzSchRootPx = 10;
amzSchRoot.style.paddingLeft = `${amzSchRootPx}px`;
amzSchRoot.style.paddingRight = `${amzSchRootPx}px`;

// calculate value to set marginLeft
let forCoord = document.getElementById('center_col');
let style = window.getComputedStyle(forCoord);
let width = parseInt(style.marginLeft) + parseInt(style.width);

// set margin
let amzSchRootMx = 50;
amzSchRoot.style.position = 'relative';
amzSchRoot.style.marginLeft = `${width + amzSchRootMx}px`;
amzSchRoot.style.marginRight = `${amzSchRootMx}px`;


let rhs = document.getElementById('rhs');
if (rhs) {
  rhs.insertAdjacentElement('beforebegin', amzSchRoot);
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
  document.getElementById('rcnt').insertAdjacentElement('afterbegin', amzSchDummy);
}


// mount elements of this extension
createApp(App).mount('#amzSchRoot');
