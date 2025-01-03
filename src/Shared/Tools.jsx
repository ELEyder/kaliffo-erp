// Función para permitir solo números al presionar una tecla
export const onlyNumberKey = (event) => {
  // Si la tecla no es un número, Backspace o Delete, bloqueamos el evento
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
    event.preventDefault(); // Bloqueamos la entrada
  }
}

// Función para permitir solo números y un punto decimal al presionar una tecla
export const onlyDecimalKey = (event) => {
  // Comprobamos si el punto decimal ya está presente en el valor
  const isDecimalAllowed = event.key === '.' && !event.target.value.includes('.');
  // Si la tecla no es un número, ni un punto decimal permitido, ni Backspace/Delete, bloqueamos el evento
  if (!/[0-9]/.test(event.key) && !isDecimalAllowed && event.key !== 'Backspace' && event.key !== 'Delete') {
    event.preventDefault(); // Bloqueamos la entrada
  }
}

// Función para permitir solo letras al presionar una tecla
export const onlyLettersKey = (event) => {
  // Permitimos teclas de control como Backspace, Delete o Tab
  const isControlKey = event.key === 'Backspace' || event.key === 'Delete' || event.key === 'Tab';
  // Comprobamos si la tecla es una letra
  const isLetter = /^[a-zA-Z]$/.test(event.key);

  // Si no es una letra ni una tecla de control, bloqueamos el evento
  if (!isLetter && !isControlKey) {
    event.preventDefault(); // Bloqueamos la entrada
  }
};

// Función para permitir solo números en un campo de entrada
export const onlyNumberInput = (event) => {
  const inputValue = event.target.value;
  // Eliminamos todo lo que no sea un número
  const filteredValue = inputValue.replace(/[^0-9]/g, '');

  // Asignamos el valor filtrado al campo de entrada
  event.target.value = filteredValue;
}

// Función para permitir solo números y un punto decimal en un campo de entrada
export const onlyDecimalInput = (event) => {
  const inputValue = event.target.value;
  // Eliminamos todo lo que no sea un número o un punto decimal
  const filteredValue = inputValue.replace(/[^0-9.]/g, '');
  // Contamos cuántos puntos decimales hay
  const decimalCount = (filteredValue.match(/\./g) || []).length;
  
  // Si hay más de un punto decimal, eliminamos los extra
  if (decimalCount > 1) {
    event.target.value = filteredValue.replace(/\.+$/, ''); // Eliminamos puntos adicionales
  } else {
    event.target.value = filteredValue;
  }
}

// Función para permitir solo letras en un campo de entrada
export const onlyLettersInput = (event) => {
  const inputValue = event.target.value;
  // Eliminamos todo lo que no sea una letra
  if (/[^a-zA-Z]/.test(inputValue)) {
    event.target.value = inputValue.replace(/[^a-zA-Z]/g, '');
  }
};

// Función para evitar que se pegue contenido en un campo de entrada
export const preventPaste = (event) => {
  event.preventDefault(); // Bloqueamos la acción de pegar
}
