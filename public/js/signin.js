const signinHandlerForm = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signin').value.trim();
  const password = document.querySelector('#password-signin').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/signin', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const signupHandlerButton = async () => {
document.location.replace('/signup');
};

document
.querySelector('.signinForm')
.addEventListener('submit', signinHandlerForm);

document
.querySelector('#btn-signup')
.addEventListener('submit', signupHandlerButton);