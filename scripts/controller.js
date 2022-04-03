var requestUrl = 'https://script.google.com/macros/s/AKfycbzx_nMtMfe5nf9z3RdKYkjNvEpjRvQ_822nLOavFcBxeDBMrlJHCVyDQp2JqY4zknL3-A/exec';

var form = document.getElementById('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  var formData = new FormData(form);

  var requestData = prepareRequestData({
    name: formData.get('name'),
    surname: formData.get('surname'),
    accept: formData.get('accept'),
    redWine: formData.get('redWine'),
    whiteWine: formData.get('whiteWine'),
    champagne: formData.get('champagne'),
    vodka: formData.get('vodka'),
    whiskey: formData.get('whiskey'),
    cognac: formData.get('cognac'),
    softDrinks: formData.get('softDrinks')
  });

  if (validationData(requestData)) {
    document.getElementsByClassName('form-submit-button-text')[0].style.display = 'none';
    document.getElementsByClassName('lds-ring')[0].style.display = 'inline-block';

    fetch(requestUrl, {
      method: 'POST',
      body: new URLSearchParams(requestData),
    })
      .then(function () {
        openModal('Принято!', 'Приходить <br> AG LOFT “Веранда” <br> Варшавское ш., 33 с. 3 <br> 23 июля 2022 к 18:00');
        disableScroll();

        document.getElementsByClassName('form-submit-button-text')[0].style.display = 'block';
        document.getElementsByClassName('lds-ring')[0].style.display = 'none';
      })
      .catch(function (err) {
        openModal('Ошибка!', 'Попробуйте позже');
        document.getElementsByClassName('form-submit-button-text')[0].style.display = 'block';
        document.getElementsByClassName('lds-ring')[0].style.display = 'none';
      });
  }
}

function openModal(title, text) {
  var modal = document.getElementsByClassName('modal')[0];
  modal.style.opacity = '1';
  modal.style.zIndex = '100';

  var modalContent = document.getElementsByClassName('modal-content')[0];

  modalContent.children[0].innerHTML = title;
  modalContent.children[1].innerHTML = text;

  modalContent.style.transitionDuration = 1 + 's';
  modalContent.classList.add('animation-finish');

  var modalButton = document.getElementsByClassName('modal-button')[0];
  modalButton.addEventListener('click', function () {
    modalContent.classList.remove('animation-finish');
    modal.style.opacity = '0';
    modal.style.zIndex = '-1';

    formReset();

    enableScroll();
  })
}

function prepareRequestData(data) {
  var newData = {};
  for (var key in data) {
    if (!data[key]) {
      continue;
    }

    if (data[key] === 'on') {
      newData[key] = 'true';
      continue;
    }

    newData[key] = data[key];
  }

  return newData;
}

function validationData(requestData) {
  var isError = false;
  var focus = false;

  var error = {
    name: !requestData.hasOwnProperty('name'),
    surname: !requestData.hasOwnProperty('surname'),
    accept: !requestData.hasOwnProperty('accept')
  }

  var inputs = document.getElementsByTagName('input');

  for (var key in error) {
    if (error[key]) {
      isError = true;

      var foundInputs = findInput(inputs, key);

      if (!focus) {
        foundInputs[0].focus();
        focus = true;
      }

      if (key === 'accept') {
        foundInputs.forEach(function (field) {
          field.parentElement.children[0].classList.add('form-error');
        })
      } else {
        foundInputs[0].classList.add('form-error');
      }
    }
  }

  return !isError;
}

function findInput(inputs, nameValue) {
  var result = [];
  for (var input of inputs) {
    if (input.getAttribute('name') === nameValue) {
      result.push(input);
    }
  }
  return result;
}

var textFields = document.getElementsByClassName('form-text-field');
for (var textField of textFields) {
  textField.addEventListener('blur', handleBlurTextField)
}

function handleBlurTextField(e) {
  if (!e.target.value) {
    e.target.classList.add('form-error');
  } else {
    e.target.classList.remove('form-error');
  }
}

var radios = document.getElementsByClassName('form-radio-input');
for (var radio of radios) {
  radio.addEventListener('click', handleChangeAccept);
}

function handleChangeAccept(e) {
  for (var ele of document.getElementsByClassName('form-radio-button-outer')) {
    ele.classList.remove('form-error');
  }

  var buttons = document.getElementsByClassName('form-radio-checked');
  if (buttons.length) {
    buttons[0].classList.remove('form-radio-checked');
  }

  e.target.parentElement.children[0].classList.add('form-radio-checked');
}

var checkboxes = document.getElementsByClassName('form-checkbox-input');
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('click', handleChangeBooze);
}

function handleChangeBooze(event) {
  if (event.target.checked) {
    event.target.parentElement.children[0].classList.add('form-checkbox-checked');
  } else {
    event.target.parentElement.children[0].classList.remove('form-checkbox-checked');
  }
}

function formReset() {
  form.reset();

  var rs = document.getElementsByClassName('form-radio-checked');
  var cs = document.getElementsByClassName('form-checkbox-checked');
  for (var r of rs) {
    r.classList.remove('form-radio-checked');
  }
  for (var c of cs) {
    c.classList.remove('form-checkbox-checked');
  }

  window.scroll(0, 0);
}

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
    get: function () {
      supportsPassive = true;
    }
  }));
} catch (e) {
}

var wheelOpt = supportsPassive ? {passive: false} : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}