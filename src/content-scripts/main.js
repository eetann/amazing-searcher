import {createApp} from 'vue';
import App from './App.vue';
import '../index.css';

let dest = document.getElementById('rcnt');
let forCoord = document.getElementById('center_col');
let style = window.getComputedStyle(forCoord);
let amzSchRootMx = 10;
let width = parseInt(style.marginLeft) + parseInt(style.width);
let amzSchDummy = document.createElement('div');
amzSchDummy.id = 'amzSchDummy';
amzSchDummy.style.height = 0;
let searchForm = document.getElementById('searchform');
style = window.getComputedStyle(searchForm);
amzSchDummy.style.zIndex = style.zIndex - 1;
let amzSchRoot = document.createElement('div');
amzSchRoot.id = 'amzSchRoot';
amzSchRoot.style.position = 'relative';
amzSchRoot.style.marginLeft = `${width + amzSchRootMx}px`;

amzSchDummy.appendChild(amzSchRoot);
dest.insertAdjacentElement('afterbegin', amzSchDummy);
createApp(App).mount('#amzSchRoot');
