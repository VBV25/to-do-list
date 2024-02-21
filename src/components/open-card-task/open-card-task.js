const bigCardTaskOpened = document.querySelector('.big-card-task__container')
const addSubtaskOpenCard = document.querySelector('.menue-open-card__new-subtask-btn');
const windowCreateSubtask = document.querySelector('.big-card-task__create-subtask');
const closeWindowCreateSubtask = document.querySelector('.close-subtask-btn-form');
const textareaNewSubtask = document.querySelector('#subtask-text');
const createBtnSubtaskOpenCard = document.querySelector('.create-subtask-btn-form')
const subtaskTemplate = document.querySelector('#subtaskTemplate');
const listSubtask = document.querySelector('.big-card-task__subtask-list');

const bigCard = document.querySelector('.big-card-task');









addSubtaskOpenCard.addEventListener('click', () => {
  windowCreateSubtask.classList.add('create-subtask_active')
})

closeWindowCreateSubtask.addEventListener('click', () => {
  windowCreateSubtask.classList.remove('create-subtask_active');
  textareaNewSubtask.value = '';
})

bigCardTaskOpened.addEventListener('click', (e) => {
  removeSubtaskOpenCard(e)
})

createBtnSubtaskOpenCard.addEventListener('click', () => {
  createSubtaskOpenCard(subtaskTemplate)
})



