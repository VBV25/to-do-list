const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1250,
    height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
      //__dirname --- полный путь к проекту
      preload: path.join(__dirname, 'data', 'preload.js'),
    },
  });

  //ЗАПУСК DevTools
  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slaches: true,
    })
  );

  //закрытие окна
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  //--------
  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  });
}

//----------------запуск---------------------
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

//-----------закрытие приложения------------------
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

///===========================ФУНКЦИИ===========================================
const localTaskList = path.join(__dirname, 'data', 'test-list-task.json');

function writeFile(event, args) {
  fs.writeFile(localTaskList, args, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Задача создана');
    }
  });
  event.reply('response-create-task', 'Задача создана');
}

function fileHandler() {
  fs.open(localTaskList, 'r+', (err) => {
    if (err) throw err;
    console.log('File created');
  });
}

fileHandler();

ipcMain.on('create-task', (event, args) => {
  writeFile(event, args);
});

//--------------------------------------------------------------------------

//const localPeoplesList = path.join(__dirname, 'data', 'list-task.json')

//async function requestuUserList(event) {
//  try {
//    let response = await fetch('https://reqres.in/api/users');
//    let peoplesList = await response.json();

//    fs.writeFileSync(localPeoplesList, JSON.stringify(peoplesList), 'utf8')
//    event.reply('response', (peoplesList))
//  }

//  catch (error) {
//    if (error.message === 'fetch failed') {
//      const localPeoplesListJson = JSON.parse(fs.readFileSync(localPeoplesList, 'utf-8'));
//      localPeoplesListJson.support = 'local';
//      event.reply('response', (localPeoplesListJson))

//      console.log('Error: Internet connection or URL is not valid. Reading data from list.json...');
//    } else {
//      console.error('Error:', error.message);
//    }
//  }
//}
