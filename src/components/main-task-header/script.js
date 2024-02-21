function createMainHeader(mainBlock, currentDate) {

  const taskHeader = document.createElement('div');
  taskHeader.classList.add('main-task__header', 'main-task-header');
  mainBlock.appendChild(taskHeader);

  addMainHeader(currentDate);
};

function addMainHeader(currentDate) {
  const mainTaskHeaderContainer = document.querySelector('.main-task__header');
  const titleMainHeaderHTML = `
    <h1 class="main-task-header__title">Welcome</h1>`;
  const menuMainHeaderHTML = `
  <div class="main-task-header__info-block">
    <div class="main-task-header__search">
      <img src="./src/components/main-task-header/assets/search.svg" alt="Поиск">
    </div>
    <div class="main-task-header__notifications">
      <img src="./src/components/main-task-header/assets/notifications.svg" alt="Оповещения">
    </div>
    <div class="main-task-header__date">
      <img src="./src/components/main-task-header/assets/date.svg" alt="Дата">
      <p class="main-task-header__date-text">${formattingDate(currentDate)}</p>
    </div>
    <div class="main-task-header__account">
      <img class="main-task-header__account-img" src="./src/components/main-task-header/assets/account.png" alt="Фото пользовтеля">
    </div>
  </div>`;
  const instrumentButtonsHTML = `
    <div class="main-task-header__instruments-group">
        <div class="main-task-header__filter">Filter</div>
        <div class="main-task-header__sort">Sort</div>
    </div>`;

  mainTaskHeaderContainer.insertAdjacentHTML("beforeEnd", titleMainHeaderHTML);
  mainTaskHeaderContainer.insertAdjacentHTML("beforeEnd", instrumentButtonsHTML);
  mainTaskHeaderContainer.insertAdjacentHTML("beforeEnd", menuMainHeaderHTML);
}

function fillMainHeader(objJson) {
  document.querySelector('.main-task-header__title').innerText = `Welcome ${objJson?.peopleName}`
  document.querySelector('.main-task-header__account-img').src = `./src/assets/${objJson?.peoplePhoto}`
}