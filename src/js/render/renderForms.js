import { formInputTemplate } from './templates/formTemplate';

export function renderAuthForm(authtype = 'login') {
  let form = document.createElement('form');
  authForm(authtype, form);

  const submitBtn = document.createElement('button');
  submitBtn.innerText = 'Submit';
  submitBtn.classList.add(
    'btn',
    'btn-secondary',
    'text-white',
    'fs-5',
    'px-4',
    'py-2',
    'mt-3'
  );
  form.append(submitBtn);

  return form;
}
function authForm(authtype, form) {
  if (authtype === 'login') form.append(...loginFormInputs.map(addinput));
  if (authtype === 'register') form.append(...registerFormInputs.map(addinput));
}

function addinput(inputData) {
  let inputContainer = formInputTemplate();

  const input = inputContainer.children[0];
  const label = inputContainer.children[1];

  for (const [key, value] of Object.entries(inputData)) {
    input[key] = value;
  }

  label.for = inputData.name;
  label.innerText = inputData.placeholder;

  return inputContainer;
}

export const loginFormInputs = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    placeholder: 'Email',
    required: true,
  },
  {
    name: 'password',
    id: 'password',
    type: 'password',
    placeholder: 'Password',
    required: true,
  },
];

export const registerFormInputs = [
  {
    name: 'name',
    id: 'name',
    type: 'text',
    placeholder: 'Name',
    required: true,
  },
  ...loginFormInputs,
];
