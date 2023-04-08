/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const { app } = require("electron");
const { ipcRenderer } = require("electron");

var isDragActive = false;
var isDrag = false;
let pressHoldEvent = new CustomEvent("pressHold");
var counter = 0;
var isDoubleClick = false;
var doubleClickThreshold = 50; //ms
var lastClick = 0;

const titlebar_exit_btn = document.getElementById("titlebar_exit");
const titlebar_min_btn = document.getElementById("titlebar_min");
const titlebar_max_btn = document.getElementById("titlebar_max");
const titlebar_drag_sw = document.getElementById("titlebar_drag_sw");
const titlebar_drag = document.getElementById("titlebar_drag");


const titlebar_main = document.getElementById("titlebar");

titlebar_exit_btn.addEventListener("click", () => {
  ipcRenderer.invoke("app_close");
});

titlebar_drag_sw.addEventListener("click", dragSwitch, false);

titlebar_min_btn.addEventListener("click", () => {
  ipcRenderer.invoke("app_min");
});

titlebar_max_btn.addEventListener("click", () => {
  ipcRenderer.invoke("app_max");
});

titlebar_main.addEventListener("dblclick", () => {
  ipcRenderer.invoke("app_max_db");
});
/*
  const window = BrowserWindow.getFocusedWindow();
  if(window.isMaximized){
    app.document.getElementsByTagName('body')[0].style = "border-radius: 0px;";
  
  }else{
    app.document.getElementsByTagName('body')[0].style = "border-radius: 5px;";
  
  }*/

// Make the DIV element draggable:

function dragSwitch() {
  if (isDragActive) {
    isDragActive = false;
    titlebar_drag_sw.classList.toggle("titlebar_btn_sw_active");
    titlebar_drag.classList.toggle("titlebar_drag");
    titlebar_main.classList.add("notdrag");

    titlebar_main.classList.remove("candrag");
  } else {
  ipcRenderer.invoke("test");

    isDragActive = true;
    titlebar_drag_sw.classList.toggle("titlebar_btn_sw_active");
    titlebar_drag.classList.toggle("titlebar_drag");
    titlebar_main.classList.add("candrag");
    titlebar_main.classList.remove("notdrag");


  }
  console.log(isDragActive);
}


function timer(f) {
  f = 0;
  counter++;
  if (counter >= f) {
   
    clearInterval(interval);
  }
}

