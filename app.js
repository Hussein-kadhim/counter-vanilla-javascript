// @ts-check
// Set initial count
let count = 0;

// select value and buttons
const value = document.getElementById('value');
const btns = document.querySelectorAll('.btn');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const buttonContainer = document.querySelector('.button-container');

const createElement = (element, text, id) => {
  const el = document.createElement(element);
  el.textContent = text;
  el.setAttribute('id', id);
  buttonContainer.appendChild(el);
};

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const styles = e.currentTarget.classList;
    switch (styles.contains('btn')) {
      case styles.contains('decrease'):
        count = parseInt(localStorage.getItem('count'));
        count--;
        if (count < 0) {
          value.style.color = 'red';
        }
        break;
      case styles.contains('increase'):
        count = parseInt(localStorage.getItem('count'));
        if (count == 10) {
          return;
        } else {
          count++;
        }
        value.style.color = 'green';
        break;
      default:
        count = 0;
        value.style.color = '#222';
        break;
    }

    if (count < 0) {
      decreaseBtn.setAttribute('disabled', 'true');

      createElement(
        'p',
        'Sorry, we do not allow use negative numbers',
        'decreaseBtnText'
      );
    } else if (count >= 0) {
      decreaseBtn.removeAttribute('disabled');
      const textHelper = document.getElementById('decreaseBtnText');
      if (textHelper) {
        textHelper.remove();
      }
    }

    if (count >= 10) {
      createElement('p', 'This is the max number', 'increaseBtnText');
    } else if (count <= 10) {
      increaseBtn.removeAttribute('disabled');
      const divHelper = document.getElementById('increaseBtnText');
      if (divHelper) {
        divHelper.remove();
      }
    }

    localStorage.setItem('count', count.toString());
    const localStorageCount = localStorage.getItem('count');

    value.textContent = localStorageCount;
  });
});

value.textContent = localStorage.getItem('count');

if (parseInt(value.textContent) > 0) {
  value.style.color = 'green';

  if (parseInt(value.textContent) == 10) {
    createElement('p', 'This is the max number', 'increaseBtnText');
  }
} else if (parseInt(value.textContent) < 0) {
  value.style.color = 'red';
  createElement(
    'p',
    'Sorry, we do not allow use negative numbers',
    'decreaseBtnText'
  );
  decreaseBtn.setAttribute('disabled', 'true');
}
