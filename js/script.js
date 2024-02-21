const { ipcRenderer } = require('electron');

//const cardTaskTemplate = document.querySelector('#card-task-template')
//const listToDo = document.querySelector('#to-do');
//const listInProgress = document.querySelector('#in-progress');
//const listDone = document.querySelector('#done');
//const mainTaskHeaderDate = document.querySelector('.main-task-header__date-text')

async function getData() {
  try {
    let response = await fetch('./data/test-list-task.json');
    let global_store = await response.json();
    if (!global_store.listTasks) {
      return;
    }
    return global_store;
  } catch (err) {
    console.log(err);
  }
}

//--------

async function renderingMainSection(getDataFn, currentDate) {
  try {
    peopleTaskList = await getDataFn;

    if (!peopleTaskList) {
      return;
    }
    newTaskCreate = new CreateNewTask(peopleTaskList, newTaskTemplate, newSubtaskTemplate);
    addCards(peopleTaskList.listTasks);
    fillMainHeader(peopleTaskList);
    draggEndDropCard();
    displayNumberTasks();
  } catch (err) {
    console.log(err);
  }
}

//---------

document.addEventListener('DOMContentLoaded', function () {
  const mainBlock = document.querySelector('.main-task');
  const navigationMenueSection = document.querySelector('.navigation-menu');

  createPopup();
  getCurrentDate();
  createNavMenu(navigationMenueSection);
  renderingMainSection(getData(), currentDate);
  createMainHeader(mainBlock, currentDate);
  createContainerTaskListColumns(mainBlock);

  mainBlock.addEventListener('click', (event) => {
    openPopupCreateNewCard(event)
  });

});



//------------------------------

window.addEventListener('resize', () => {
  calculateTaskProgress();
});

//-------IPC----ОТВЕТЫ-----

//получаем ответ от мейн процесса
ipcRenderer.on('response-create-task', (event, args) => {
  craetePopupNotification(args);
});
