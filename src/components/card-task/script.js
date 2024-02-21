function calculateTaskProgress() {
  const cardsArr = document.querySelectorAll('.card-task');
  cardsArr.forEach((el) => {
    const sliderProgress = el.querySelector('.card-task__progress-slider');
    const lineProgressWidth = el.querySelector('.card-task__progress-line').offsetWidth;
    const tasksCompleted = el.querySelector('.first-value').textContent;
    const totalTasks = el.querySelector('.second-value').textContent;
    const completionPercentage = (tasksCompleted * 100) / totalTasks;
    const widthSliderProgressMath = (completionPercentage * lineProgressWidth) / 100;
    sliderProgress.style.width = widthSliderProgressMath + 'px';
  });
}

function determiningNumberSubtasks(element) {
  element.totalTasks = element.subTasks.length;
  element.tasksCompleted = element.subTasks.filter((subtask) => subtask.completed === 'true').length;
}

function getDeadlineRelevanceClass(cardDate) {
  const currentDate = new Date();
  const deadline = new Date(cardDate);
  const timeDiff = deadline.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff <= 7) {
    return 'overdue-deadlines';
  }
  if (daysDiff <= 14) {
    return 'burning-deadlines';
  }
  return 'acceptable-deadlines';
}

function draggEndDropCard() {
  const columsTaskList = document.querySelectorAll('.list-column__container');
  const tasks = document.querySelectorAll('.card-task');

  tasks.forEach((el) => {
    el.addEventListener('dragstart', () => {
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
    });
  });

  columsTaskList.forEach((column) => {
    column.addEventListener('dragover', (e) => {
      e.preventDefault();
      displayNumberTasks();
      const draggable = document.querySelector('.dragging');
      column.querySelector('.list-column__body').appendChild(draggable);
      draggable.dataset.list = column.id;
    });
  });
}

function createCards(el) {
  const dateCard = formattingDate(el.date);
  let classDateDeadline = getDeadlineRelevanceClass(dateCard);
  const cardsContainer = document.querySelector(`#${el.list} .list-column__body`);
  const cardTaskHTML = `
    <div class="card-task" data-id="${el.id}" data-list="${el.list}" draggable = "true" >
      <div class="card-task__container">
        <div class="card-task__btn-delete">
          X
        </div>  
        <div class="card-task__progress-text-group">
          <h2 class="card-task__title">${el.title}</h2>
          <p class="card-task__description">${el.description}</p>
        </div>  
        <div class="card-task__progress-info-group">
          <div class="card-task__progress-info">
            <div class="card-task__progress-btn">
              <img src="./src/components/card-task/assets/progress-list-Icon.svg" alt="Комментарии"> Progress
            </div>
            <div class="card-task__progress-status">
              <span class="first-value">${el.tasksCompleted}</span>/<span class="second-value">${el.totalTasks}</span>
            </div>
          </div>
          <div class="card-task__progress-line">
            <div class="card-task__progress-slider"></div>
          </div>
        </div>  
        <div class="card-task__footer-card">
          <div class="card-task__date ${classDateDeadline}">${dateCard}</div>
          <div class="card-task__comments">
            <img src="./src/components/card-task/assets/comments-icon.svg" alt="Комментарии">
            <p>0</p>
          </div>
        </div>
      </div>
    </div>`;
  cardsContainer.insertAdjacentHTML('beforeend', cardTaskHTML);
  draggEndDropCard();
  calculateTaskProgress();
}

function addCards(elementList) {
  if (elementList.length > 1) {
    elementList.forEach((el) => {
      determiningNumberSubtasks(el);
      createCards(el);
    });
  } else {
    determiningNumberSubtasks(elementList);
    createCards(elementList);
  }
  calculateTaskProgress();
}

//function openBigCardTask(e) {

//  if (e.target.closest('.card-task__btn-menu')) {
//    let openCard = e.target.closest('.card-task')
//    console.log(openCard);
//  }

//}

//document.addEventListener('click', (e) => {
//  openBigCardTask(e)
//})
