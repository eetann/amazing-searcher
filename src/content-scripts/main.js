import {createApp} from 'vue'
import App from './App.vue'
import '../index.css'

var rhs = document.getElementById('rhs')
var myExtDiv = document.createElement('div')
myExtDiv.id = 'myExtDiv'
rhs.insertBefore(myExtDiv, rhs.firstChild)
createApp(App).mount('#myExtDiv')
