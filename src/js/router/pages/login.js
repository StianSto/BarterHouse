import { authFormListener } from '../../handlers/loginFormListener';
import { renderAuthForm } from '../../render/renderForms';

const url = window.location.search;
const params = new URLSearchParams(url);

export function auth(authtype = params.get('form')) {
  const form = renderAuthForm(authtype);

  const h1 = document.createElement('h1');
  h1.classList.add('text-center', 'mt-4', 'fs-3', 'fw-light');

  const container = document.querySelector('#formContainer');
  const link = document.createElement('a');

  if (authtype === 'login') {
    link.innerText = 'Don´t have an account?';
    link.href = '/auth/?form=register';
    h1.innerText = 'Log In';
  } else {
    link.innerText = 'Already have an account?';
    link.href = '/auth/?form=login';
    h1.innerText = 'Register';
  }
  form.prepend(h1);
  authFormListener(form);

  container.replaceChildren(form);
  container.append(link);
}
