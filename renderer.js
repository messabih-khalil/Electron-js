const { ipcRenderer } = require("electron");

const sendInChannel = data => {
  ipcRenderer.send("channel1", data);
};

// get input data
const inputData = document.getElementById("inputData");

document.getElementById("btn").addEventListener("click", e => {
  //   sendInChannel(inputData.value);
  // invoke ipc

  ipcRenderer.invoke("proccess1", inputData.value).then(result => {
    inputData.value = result;
  });
});

// ipcRenderer.on("mail-box", (e, data) => {
//   inputData.value = data;
// });
