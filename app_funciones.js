function manejarClick(valor) {
  const resultado = document.getElementById('resultado');
  const actual = resultado.value;

  if (valor === 'C') {
    resultado.value = '0';
    return;
  }

  if (valor === '←') {
    if (actual.length <= 1) {
      resultado.value = '0';
    } else {
      resultado.value = actual.slice(0, -1);
    }
    return;
  }

  const operadores = ['+', '-', '*', '/'];

  if (valor === '%') {
    try {
      const num = parseFloat(actual);
      if (isNaN(num)) throw new Error('Valor inválido');
      resultado.value = String(num / 100);
    } catch (e) {
      resultado.value = 'Error';
    }
    return;
  }

  if (valor === '=') {
    try {
      const expresion = actual.replace(/×/g, '*').replace(/÷/g, '/');
      if (expresion.includes('/0')) throw new Error('División por cero');
      const res = eval(expresion);
      if (res === undefined || res === null || isNaN(res)) throw new Error('Inválido');
      resultado.value = String(res);
      setTimeout(function () {
        resultado.value = '0';
      }, 3000);
    } catch (e) {
      resultado.value = 'Error';
      setTimeout(function () {
        resultado.value = '0';
      }, 2000);
    }
    return;
  }

  if (operadores.includes(valor)) {
    if (actual === '0' || actual === '') {
      alert('El formato usado no es válido!');
      return;
    }
    const ultimoCaracter = actual[actual.length - 1];
    if (operadores.includes(ultimoCaracter)) {
      resultado.value = actual.slice(0, -1) + valor;
    } else {
      resultado.value = actual + valor;
    }
    return;
  }

  if (valor === '.') {
    const partes = actual.split(/[\+\-\*\/]/);
    const ultimaParte = partes[partes.length - 1];
    if (ultimaParte.includes('.')) return;
    if (actual === '0') {
      resultado.value = '0.';
    } else {
      resultado.value = actual + '.';
    }
    return;
  }

  if (actual === '0') {
    resultado.value = valor;
  } else {
    resultado.value = actual + valor;
  }
}