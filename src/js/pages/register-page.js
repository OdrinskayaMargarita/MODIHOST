import styleSelect from '../libs/style-select';
import Form from './../components/Form';
import SocialShareKit from '../libs/social-share-kit';

export default () => {
  document.querySelectorAll('.select-menu').forEach(item => {
    styleSelect(item);
  })

  document.querySelector('[data-number-rooms]').addEventListener('input', () => {
    let rooms = document.querySelector('[data-number-rooms]').value;
    if (rooms == '') {}
    else if (rooms < 1) {
      rooms = 1;
      document.querySelector('[data-number-rooms]').value = rooms;
    } else if (rooms > 10000) {
      rooms = 10000;
      document.querySelector('[data-number-rooms]').value = rooms;
    }
    let tokens = rooms * 20000;
    let price = Math.round(tokens * 0.035);
    let operations = Math.round(price / 3 * 200);
    document.querySelector('[data-token-number]').innerHTML = divideLongNumbers(tokens);
    document.querySelector('[data-token-price]').innerHTML = divideLongNumbers(price);
    document.querySelector('[data-hotel-operations]').innerHTML = divideLongNumbers(operations);
    if (rooms > 0) {
      document.querySelectorAll('.register-form__calced').forEach(item => {
        item.classList.add('is-calced')
      })
    } else {
      document.querySelectorAll('.register-form__calced').forEach(item => {
        item.classList.remove('is-calced')
      })
    }
  })

  function divideLongNumbers(number) {
    let num = number.toString().split('');
    const numSpaces = Math.floor((num.length - 1) / 3);
    for (let i = 0; i < numSpaces; i++) {
      num.splice((-3 * (i + 1)) - i, 0, ' ');
    }
    return num.join('');
  }

  document.querySelectorAll('[data-next]').forEach(item => {
    item.addEventListener('click', () => {
      let isValid = true;
      let stepCur = item.closest('.register-form__step');
      stepCur.querySelectorAll('[required]').forEach(item => {
        if (!item.value) {
          item.classList.add('is-invalid');
          isValid = false;
        } else {
          item.classList.remove('is-invalid');
        }
      })
      if (stepCur.querySelectorAll('input[type=email]')) {
        stepCur.querySelectorAll('input[type=email]').forEach(item => {
          let aIndex = item.value.indexOf('@');
          if (aIndex == '-1' || aIndex == 0 || item.value.lastIndexOf('@') == 0) {
            item.classList.add('is-invalid');
            isValid = false;
          } else {
            item.classList.remove('is-invalid');
          }
        })
      }
      if (!isValid) {
        document.querySelector('.form__blank').classList.add('error');
        return
      }

      document.querySelector('.form__blank').classList.remove('error');

      stepCur.classList.remove('is-active');
      stepCur.nextElementSibling.classList.add('is-active');

      let index = +stepCur.dataset.formStep + 1;
      document.querySelectorAll('.register-form__steps-counter')[index].classList.add('is-filled');
    })
  })

  document.querySelectorAll('[data-back]').forEach(item => {
    item.addEventListener('click', () => {
      let stepCur = item.closest('.register-form__step');
      stepCur.classList.remove('is-active');
      stepCur.previousElementSibling.classList.add('is-active');

      let index = stepCur.dataset.formStep;
      document.querySelectorAll('.register-form__steps-counter')[index].classList.remove('is-filled');
    })
  })

  document.querySelector('#checkbox-1').addEventListener('change', () => {
    document.querySelector('#chain-name .form__label').classList.toggle('disabled');
    if (document.querySelector('#chain-name input').hasAttribute('disabled')) {
      document.querySelector('#chain-name input').removeAttribute('disabled')
    } else {
      document.querySelector('#chain-name input').setAttribute('disabled', '')
    }
  })

  let sheet = document.createElement('style'),
      $rangeInput = document.querySelector('.range-input'),
      prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

  document.body.appendChild(sheet);

  let getTrackStyle = function (el) {
    let curVal = el.value,
        style = '';

    for (let i = 0; i < prefs.length; i++) {
      style += '.range-input::-' + prefs[i] + '{background: linear-gradient(to right, #6e6eff 0%, #6e6eff ' + curVal + '%, #181e30 ' + curVal + '%, #181e30 100%)}';
    }

    return style;
  }

  let fillTooltip = function (el) {
    let curVal = el.value;

    document.querySelector('.range-input-label').value = curVal + '%';
  }

  if (!/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    $rangeInput.addEventListener('input', function () {
      sheet.textContent = getTrackStyle(this);
      fillTooltip(this)
    })
  } else {
    $rangeInput.addEventListener('change', function () {
      fillTooltip(this)
    })
  }

  document.querySelector('[data-social-share-popup]').addEventListener('click', () => {
    document.querySelector('[data-social-share-popup] .register-success__social-share').classList.toggle('is-visible');
  })

  let registerForm = new Form({
      $form: document.getElementById('register-form'),
      validation: function() {
        let isValid = false;

        document.querySelectorAll('[name="turnover"]').forEach(item => {
          if (item.checked) {
            isValid = true;
          }
        })

        if (isValid) {
          document.querySelectorAll('[name="turnover"]').forEach(item => {
            item.classList.remove('is-invalid');
          })
        } else {
          document.querySelectorAll('[name="turnover"]').forEach(item => {
            item.classList.add('is-invalid');
          })
        }

        if (document.querySelector('[name="occupancy_rate"]').value > 0) {
          isValid = true;
          document.querySelector('[name="occupancy_rate"]').previousElementSibling.classList.remove('is-invalid');
        } else {
          isValid = false;
          document.querySelector('[name="occupancy_rate"]').previousElementSibling.classList.add('is-invalid');
        }

        return isValid;
      }
  });
  registerForm.init();

}
