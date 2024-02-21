function addBlockCreateSubtask() {
  const containerBlockCreateSubtask = document.querySelector('.create-new-task');
  const createSubtaskHTML = `
    <div class="create-subtask">
      <label for="subtask-create-text" class="create-subtask__label-input"> New subtask
        <textarea id="subtask-create-text" name="subtask-create-text" class="create-subtask__text-input" placeholder="Enter text subtask"></textarea>
      </label>
      <div class="create-subtask__btn create-subtask-btn-form">Create</div>
      <div class="create-subtask__btn close-subtask-btn-form">Close</div>
    </div>
    <div class="subtask-block__subtask-created-container"></div>`;
  containerBlockCreateSubtask.insertAdjacentHTML('beforeEnd', createSubtaskHTML);
  const createNewSubtask = containerBlockCreateSubtask.querySelector('.create-subtask-btn-form');
  const closeNewSubtaskForm = containerBlockCreateSubtask.querySelector('.close-subtask-btn-form');
  removeSubtask();
  createNewSubtask.addEventListener('click', () => {
    createSubtask(fillSubtaskObject());
  });
}

function displayCreatedSubtask(element) {
  const addSubtaskContainer = document.querySelector('.subtask-block__subtask-created-container');
  const newSubtaskHTML = `
    <div class="subtask-block__subtask" data-number='${element.numberBlock}' data-checked='${element.completed}'>
      <input id="${element.id}" type="checkbox" name="agreement" class="subtask-block__checkbox">
      <label for="${element.id}" class="subtask-block__checkbox-label">
        <span class="subtask-block__text">${element.text}</span>
      </label>
      <div class="subtask-block__btn-remove-task">X</div>
    </div>`;
  addSubtaskContainer.insertAdjacentHTML('beforeEnd', newSubtaskHTML);
}

//---------------------------------------------------------------------------------------------

function removeSubtask() {
  const subtaskContainer = document.querySelector('.subtask-block__subtask-created-container');

  subtaskContainer.addEventListener('click', (event) => {
    const elementClick = event.target;

    if (elementClick.classList.contains('subtask-block__btn-remove-task')) {
      const subtask = event.target.closest('.subtask-block__subtask');

      console.log(subtask);
      console.log(subtaskContainer);
      subtaskContainer.removeChild(subtask);
    } else {
      return;
    }
  });
}

function fillSubtaskObject() {
  const popupWindowContainer = document.querySelector('.popup__content');
  const subtaskList = document.querySelector('.subtask-block__subtask-created-container');
  const sibtaskText = popupWindowContainer.querySelector('#subtask-create-text').value;
  let idSubtask;
  let numberSubtask;

  if (!subtaskList.lastElementChild) {
    numberSubtask = 1;
  } else {
    numberSubtask = Number(subtaskList.lastElementChild.dataset.number) + 1;
  }

  idSubtask = `${numberSubtask}-subtask-${getCurrentDateNumber()}-${getCurrentTime()}`;
  return {
    id: idSubtask,
    completed: 'false',
    text: sibtaskText,
    numberBlock: numberSubtask,
  };
}

function createSubtask(element) {
  const sibtaskText = document.querySelector('#subtask-create-text');
  const btnCreateSubtask = document.querySelector('.create-subtask-btn-form');
  if (sibtaskText.value.length < 3) {
    sibtaskText.classList.add('err-input');
    sibtaskText.placeholder = 'Не менее 3х символов';
  } else {
    sibtaskText.classList.remove('err-input');
    sibtaskText.classList.add('confirmed-input');
    btnCreateSubtask.classList.add('confirmed-input-btn');
    sibtaskText.value = '';
    sibtaskText.placeholder = 'Успешно';

    displayCreatedSubtask(element);

    setTimeout(() => {
      sibtaskText.classList.remove('confirmed-input');
      btnCreateSubtask.classList.remove('confirmed-input-btn');
      sibtaskText.placeholder = 'Enter text subtask';
    }, 1000);
  }
}
