import {createApp} from 'vue'
import App from './App.vue'
import '../index.css'

let dest = document.getElementById('rcnt');
let forCoord = document.getElementById('center_col')
let style = window.getComputedStyle(forCoord)
let amzSchRootMx = 10
let width = parseInt(style.marginLeft) + parseInt(style.width)
let amzSchRoot = document.createElement('div')
amzSchRoot.id = 'amzSchRoot'
amzSchRoot.style.position = 'relative'
amzSchRoot.style.marginLeft = `${width + amzSchRootMx}px`
amzSchRoot.style.zIndex = '999'

dest.insertAdjacentElement('afterbegin', amzSchRoot)
createApp(App).mount('#amzSchRoot')
