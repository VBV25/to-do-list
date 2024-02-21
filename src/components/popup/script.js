function closePopup() {
  const popup = document.querySelector('.popup');
  const closePopup = document.querySelector('.popup__btn-close');
  const popupContainerInputs = popup.querySelector('.popup__block-inserting-elements');

  closePopup.addEventListener('click', () => {
    popupContainerInputs.innerHTML = '';
    popupContainerInputs.className = 'popup__block-inserting-elements';
    popup.classList.remove('popup_active');
    popup.querySelector('.popup__btn-container').innerHTML = ''
  });
}

function openPopupCreateNewCard(event) {
  event.preventDefault();
  const popup = document.querySelector('.popup');
  const buttonCreateContainer = popup.querySelector('.popup__btn-container');
  const createBtnPopupHTML = `
    <button class="popup__btn-create" type="button">Create</button>
    <div class="popup__error-text-block"></div>`;
  buttonCreateContainer.insertAdjacentHTML('afterBegin', createBtnPopupHTML);

  const elementOnClick = event.target.closest('div');
  const popupBtnBase = document.querySelector('.popup__btn-create');
  const thisColumn = event.target.closest('.list-column__container');

  if (elementOnClick.classList.contains('list-column__btn-add')) {
    document.querySelector('.popup').classList.add('popup_active', 'popup-create-new-task');
    newTaskCreate.addContentNewTaskPopup();

    popupBtnBase.addEventListener('click', () => {
      event.preventDefault();
      if (popup.classList.contains('popup-create-new-task')) {
        newTaskCreate.createNewTask(peopleTaskList, thisColumn.id);
      }
    });
  }
}

function createPopup() {
  const popupHTML = `
    <section class="popup">
      <div class="popup__content">
        <div class="popup__btn-close">Exit</div>
        <div class="popup__title-row">
          <div class="popup__title">Create new task</div>
          <div class="popup__description">Fill in all fields marked *</div>
        </div>
        <div class="popup__block-inserting-elements"></div>
        <div class="popup__btn-container"></div>
      </div>
    </section>`;
  document.querySelector('body').insertAdjacentHTML('afterBegin', popupHTML);

  closePopup();
}


