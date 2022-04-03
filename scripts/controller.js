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
    fetch(requestUrl, {
      method: 'POST',
      body: new URLSearchParams(requestData)
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (data) {
        // TODO success
      })
      .catch(function (err) {
        // TODO error
      });
  }
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