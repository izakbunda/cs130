"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
    electron.contextBridge.exposeInMainWorld("electronAPI", {
      navigateBack: () => electron.ipcRenderer.send("navigate-back")
    });
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
