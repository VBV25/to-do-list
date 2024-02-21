let currentDate;
let peopleTaskList;
let newTaskCreate;

const newSubtaskTemplate = {
  id: '',
  completed: '',
  text: '',
};
const newTaskTemplate = {
  id: '',
  title: '',
  description: '',
  list: 'to-do',
  date: '',
  subTasks: [],
  totalTasks: '',
  tasksCompleted: '',
};

const monthList = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

function search() {
  const result = taskList.find((el) => el.id === '1' && el.list === 'done');
}

function getCurrentTime() {
  const data = new Date();
  const hour = data.getHours();
  const minutes = data.getMinutes();
  const seconds = data.getSeconds();
  return `${hour}:${minutes}:${seconds}`;
}

function getCurrentDateNumber() {
  const currentDateNew = new Date();
  const dd = currentDateNew.getDate();
  const mm = currentDateNew.getMonth() + 1;
  const yy = currentDateNew.getFullYear();
  return `${dd}.${mm}.${yy}`;
}

function getCurrentDate() {
  const currentDateNew = new Date();
  const dd = currentDateNew.getDate();
  const mm = currentDateNew.getMonth() + 1;
  const yy = currentDateNew.getFullYear();
  let mounthText;

  for (let key in monthList) {
    if (Number(key) === mm) {
      mounthText = monthList[key];
    }
  }
  return (currentDate = `${dd}.${mm}.${yy}`);
}

function formattingDate(date) {
  const dateNumberArr = date.split('.');
  for (let key in monthList) {
    if (Number(key) === Number(dateNumberArr[1])) {
      dateNumberArr.splice(1, 1, monthList[key]);
    }
  }
  return dateNumberArr.join(' ');
}

function detectionActivCheckboxSubtask() {
  if (element.completed === 'true') {
    return checked;
  }
}

function animationCheckNotifications() {
  const container = document.querySelector('.allert-server-window__animation');
  const checkmark = container.querySelector('svg');
  const className = 'animate';

  if (!checkmark.classList.contains(className)) {
    checkmark.classList.add(className);
    setTimeout(function () {
      checkmark.classList.remove(className);
    }, 1700);
  }
}

function closeAnClearPopupAfterCreationTask() {
  const popup = document.querySelector('.popup');
  const cleaningСontainer = popup.querySelector('.popup__block-inserting-elements');

  popup.classList = 'popup';
  cleaningСontainer.innerHTML = '';
}

function outputtingResponsesFromServer(args) {
  const allertServerWindow = document.createElement('div');
  allertServerWindow.classList.add('allert-server-window__container');
  allertServerWindow.innerHTML = `
    <div class="allert-server-window__message">${args}</div>
    <div class="allert-server-window__animation">
      <svg viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#3da35a" fill="transparent"/>
      </svg>
    </div>`;
  document.querySelector('.allert-server-window').appendChild(allertServerWindow);
}

function craetePopupNotification(args) {
  const allert = document.querySelector('.allert-server-window');

  allert.classList.add('allert-server-window_active');
  outputtingResponsesFromServer(args);
  animationCheckNotifications();

  let timerActivAlert = setTimeout(() => {
    allert.classList.remove('allert-server-window_active');
    allert.innerHTML = '';
    clearTimeout(timerActivAlert);
    timerActivAlert = null;
  }, 2000);
}

//--------------------SERVER------------------------------------------------
function createTaskSERVER(peopleTaskList) {
  const jsonObj = JSON.stringify(peopleTaskList);
  ipcRenderer.send('create-task', jsonObj);
}
//---------------------------------------------------------------------------

