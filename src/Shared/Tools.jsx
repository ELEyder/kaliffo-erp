export const onlyNumberKey = (event) => {
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
    event.preventDefault();
  }
}

export const onlyDecimalKey = (event) => {
  const isDecimalAllowed = event.key === '.' && !event.target.value.includes('.');
  if (!/[0-9]/.test(event.key) &&
    !isDecimalAllowed &&
    event.key !== 'Backspace' &&
    event.key !== 'Delete') {
    event.preventDefault();
  }
}

export const onlyLettersKey = (event) => {
  const isControlKey = event.key === 'Backspace' || event.key === 'Delete' || event.key === 'Tab';
  
  const isLetter = /^[a-zA-Z]$/.test(event.key);

  if (!isLetter && !isControlKey) {
    event.preventDefault();
  }
};

export const onlyNumberInput = (event) => {
  const inputValue = event.target.value;
  const filteredValue = inputValue.replace(/[^0-9]/g, '');

  event.target.value = filteredValue;
  }

export const onlyDecimalInput = (event) => {
  const inputValue = event.target.value;
  const filteredValue = inputValue.replace(/[^0-9.]/g, '');
  const decimalCount = (filteredValue.match(/\./g) || []).length;
  
  if (decimalCount > 1) {
    event.target.value = filteredValue.replace(/\.+$/, ''); 
  } else {
    event.target.value = filteredValue;
  }
}

export const onlyLettersInput = (event) => {
  const inputValue = event.target.value;
    if (/[^a-zA-Z]/.test(inputValue)) {
      event.target.value = inputValue.replace(/[^a-zA-Z]/g, '');
    }
};

export const preventPaste = (event) => {
  event.preventDefault();
}