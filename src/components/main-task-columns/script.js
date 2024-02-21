function createContainerTaskListColumns(mainBlock) {

  const containerTaskListColumns = document.createElement('div');
  containerTaskListColumns.classList.add('main-task__list-column', 'list-column');
  mainBlock.appendChild(containerTaskListColumns);

  addTaskListColumns()
}

function addTaskListColumns() {
  const listNameColumn = ['To Do', 'In progress', 'Done'];
  listNameColumn.forEach(el => {
    const idColumns = el.toLowerCase().split(' ').join('-');
    const navigationMenuButtonHTML = `
       <div class="list-column__container" id="${idColumns}">
        <div class="list-column__header">
          <div class="list-column__title">${el} (<span>4</span>)</div>
          <div class="list-column__btn-add"><span>+</span>Add new task</div>
        </div>
        <div class="list-column__body"></div>
      </div>`;

    document.querySelector('.main-task__list-column').insertAdjacentHTML("beforeend", navigationMenuButtonHTML);
  });
}

function displayNumberTasks() {
  const columnsTasks = document.querySelectorAll('.list-column__body');
  columnsTasks.forEach(el => {
    const titleColumns = el.parentNode.querySelector('span');
    const quantityCards = el.children.length;
    titleColumns.innerText = quantityCards
  })
}