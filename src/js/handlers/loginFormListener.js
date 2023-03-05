import { login } from '../api/auth/login';
import { register } from '../api/auth/register';

export function authFormListener(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const body = Object.fromEntries(data);

    let registerResponse;
    let errMsg;

    if (form.id === 'register') {
      registerResponse = await register(body);
      if (!registerResponse.ok) {
        errMsg = await handleBadResponse(registerResponse);
        return form.append(errMsg);
      }
      delete body.name;
    }

    const response = await login(body);
    response.ok
      ? window.location.replace('/')
      : (errMsg = await handleBadResponse(response));

    if (errMsg) form.append(errMsg);
  });
}

export async function handleBadResponse(response) {
  let errMsg = document.querySelector('#errMsg');
  if (!errMsg) {
    errMsg = document.createElement('p');
    errMsg.id = 'errMsg';
    errMsg.classList.add('text-primary');
  }
  const result = await response.json();
  errMsg.innerText = result.errors[0].message;

  return errMsg;
}
