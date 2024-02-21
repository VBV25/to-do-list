class CreateNewTask {
  constructor(peopleTaskList, newTaskTemplate, newSubtaskTemplate) {
    this.peopleTaskList = peopleTaskList;
    this.newTaskTemplate = newTaskTemplate;
    this.newSubtaskTemplate = newSubtaskTemplate;
  }

  _copyingSubtaskDataObject(taskObject) {
    let subtaskList = [];
    const containerSubtaask = document.querySelector('.subtask-block__subtask-created-container');
    const arrsubtaskNewTask = containerSubtaask.querySelectorAll('.subtask-block__subtask');

    if (arrsubtaskNewTask.length === 0) {
      return;
    }

    arrsubtaskNewTask.forEach((subtask) => {
      let newSubtaskTemplateObject = { ...newSubtaskTemplate };
      const idSubtask = subtask.querySelector('.subtask-block__checkbox').id;
      const checkedSubtask = subtask.querySelector('.subtask-block__checkbox').checked;
      const textSubtask = subtask.querySelector('.subtask-block__text').textContent;
      let presenceSubtaskInArray = subtaskList.find((el) => el.id === idSubtask);

      subtask.dataset.checked = checkedSubtask;
      if (!presenceSubtaskInArray) {
        newSubtaskTemplateObject.id = idSubtask;
        newSubtaskTemplateObject.completed = `${checkedSubtask}`;
        newSubtaskTemplateObject.text = textSubtask;
        subtaskList.push(newSubtaskTemplateObject);
      }
    });
    taskObject.subTasks = subtaskList;
  }

  _validationInput(nameTask, deadline, description) {
    if (nameTask.value.length < 3 || !deadline.value || description.value.length < 3) {
      document.querySelectorAll('.create-new-task__input').forEach((el) => {
        el.classList.add('err-input');
      });
      document.querySelector('.popup__error-text-block').textContent = 'Не менее 3х символов или не корректная дата';
      return false;
    }
    document.querySelector('.popup__error-text-block').textContent = '';
    document.querySelectorAll('.create-new-task__input').forEach((el) => {
      el.classList.remove('err-input');
    });
    return true;
  }

  _fillNewTask(taskObject, columnAddTaskId, titleArr, nameTask, deadline, description) {
    const currentTime = getCurrentTime();
    let idNewTask;

    if (titleArr.length < 6) {
      titleArr.push(deadline);
      titleArr.push(currentTime);
      idNewTask = titleArr.join('-');
    } else {
      let baseId = titleArr.splice(0, 5);
      baseId.push(deadline);
      baseId.push(currentTime);
      idNewTask = baseId.join('-');
    }

    taskObject.id = idNewTask;
    taskObject.list = columnAddTaskId;
    taskObject.title = nameTask.value;
    taskObject.description = description.value;
    taskObject.date = `${deadline}`;
  }

  addContentNewTaskPopup() {
    const popupBlock = document.querySelector('.popup__block-inserting-elements');
    const newTaskContentContainer = `
    <div class="create-new-task">
      <div class="create-new-task__row-group">
        <label for="name-new-task" class="create-new-task__label-input create-new-task__name-task"> Task name*
          <input class="create-new-task__input" id="name-new-task" type="text" name="name-task"  >
        </label>
        <label for="deadline-new-task" class="create-new-task__label-input create-new-task__deadline"> Deadline*
          <input class="create-new-task__input" type="date" name="deadline-new-task" id="deadline-new-task">
        </label>
      </div>
      <label for="description-new-task" class="create-new-task__label-input create-new-task__description"> Task description*
        <textarea class="create-new-task__input" id="description-new-task" name="description-task" placeholder="Enter description task"></textarea>
      </label>   
    </div>`;
    popupBlock.insertAdjacentHTML('afterBegin', newTaskContentContainer);
    addBlockCreateSubtask();
  }

  createNewTask(peopleTaskList, columnAddTaskId) {
    const newTaskTemplateObject = { ...newTaskTemplate };
    const nameNewTaskInput = document.querySelector('#name-new-task');
    const deadlineDateInput = document.querySelector('#deadline-new-task');
    const descriptionNewTaskInput = document.querySelector('#description-new-task');
    let fieldsFilled = false;

    fieldsFilled = this._validationInput(nameNewTaskInput, deadlineDateInput, descriptionNewTaskInput);

    if (fieldsFilled) {
      const titleArr = nameNewTaskInput.value.split(' ');
      const deadlineNewTask = deadlineDateInput.value.split('-').reverse().join('.');
      this._fillNewTask(newTaskTemplateObject, columnAddTaskId, titleArr, nameNewTaskInput, deadlineNewTask, descriptionNewTaskInput);
      this._copyingSubtaskDataObject(newTaskTemplateObject);
      nameNewTaskInput.value = '';
      deadlineDateInput.value = '';
      descriptionNewTaskInput.value = '';


      peopleTaskList.listTasks.push(newTaskTemplateObject);
      addCards(newTaskTemplateObject);
      closeAnClearPopupAfterCreationTask();
      craetePopupNotification("Задача создана!");
      document.querySelector('.popup__btn-container').innerHTML = '';
      //----server---
      //createTaskSERVER(peopleTaskList);
    } else {
      return false;
    }
  }
}
