// Блок 2. Функции и циклы — все задачи на одной странице.

// Задача 1. Калькулятор
(function () {
  function add(a, b) { return a + b; }
  function subtract(a, b) { return a - b; }
  function multiply(a, b) { return a * b; }
  function divide(a, b) { return a / b; }
  function calculate(a, b, op) {
    switch (op) {
      case '+': return add(a, b);
      case '-': return subtract(a, b);
      case '*': return multiply(a, b);
      case '/': return divide(a, b);
      default: return null;
    }
  }

  const a = document.querySelector('#t1-a');
  const b = document.querySelector('#t1-b');
  const op = document.querySelector('#t1-op');
  const btn = document.querySelector('#t1-btn');
  const result = document.querySelector('#t1-result');

  btn.addEventListener('click', () => {
    const x = Number(a.value), y = Number(b.value);
    if (a.value.trim() === '' || b.value.trim() === '' || Number.isNaN(x) || Number.isNaN(y)) {
      result.textContent = 'Введите два числа';
      result.className = 'result result--error';
      return;
    }
    if (op.value === '/' && y === 0) {
      result.textContent = 'Ошибка: деление на ноль';
      result.className = 'result result--error';
      return;
    }
    result.textContent = 'Результат: ' + calculate(x, y, op.value);
    result.className = 'result result--success';
  });
})();

// Задача 2. Таблица умножения
(function () {
  const num = document.querySelector('#t2-num');
  const btn = document.querySelector('#t2-btn');
  const rows = document.querySelector('#t2-rows');

  function makeRow(n, i) { return `${n} × ${i} = ${n * i}`; }

  btn.addEventListener('click', () => {
    rows.innerHTML = '';
    const n = Number(num.value);
    if (num.value.trim() === '' || Number.isNaN(n)) {
      const e = document.createElement('div');
      e.className = 'row row--error';
      e.textContent = 'Введите число';
      rows.append(e);
      return;
    }
    for (let i = 1; i <= 10; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      row.textContent = makeRow(n, i);
      rows.append(row);
    }
  });
})();

// Задача 3. Генератор карточек товаров
(function () {
  const products = ['Ноутбук', 'Мышь', 'Клавиатура', 'Монитор'];
  const catalog = document.querySelector('#t3-catalog');

  function createCard(name) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `<div class="product-card__icon">📦</div><div class="product-card__name">${name}</div>`;
    return card;
  }

  for (const name of products) catalog.append(createCard(name));
})();

// Задача 4. Список чисел
(function () {
  const num = document.querySelector('#t4-num');
  const add = document.querySelector('#t4-add');
  const list = document.querySelector('#t4-list');
  const sumEl = document.querySelector('#t4-sum');
  const avgEl = document.querySelector('#t4-avg');
  const numbers = [];

  function getSum(arr) { let s = 0; for (const n of arr) s += n; return s; }
  function getAverage(arr) { return arr.length === 0 ? 0 : getSum(arr) / arr.length; }

  function render() {
    list.innerHTML = '';
    for (const n of numbers) {
      const li = document.createElement('li');
      li.textContent = n;
      list.append(li);
    }
    sumEl.textContent = getSum(numbers);
    avgEl.textContent = getAverage(numbers).toFixed(2);
  }

  add.addEventListener('click', () => {
    if (num.value.trim() === '') return;
    const v = Number(num.value);
    if (Number.isNaN(v)) return;
    numbers.push(v);
    num.value = '';
    render();
  });
})();

// Задача 5. Проверка пароля
(function () {
  const pass = document.querySelector('#t5-pass');
  const btn = document.querySelector('#t5-btn');
  const result = document.querySelector('#t5-result');

  function checkPassword(p) {
    if (p.length < 8) return { ok: false, reason: 'Минимум 8 символов' };
    if (!/[0-9]/.test(p)) return { ok: false, reason: 'Нужна хотя бы одна цифра' };
    if (!/[a-zA-Zа-яА-Я]/.test(p)) return { ok: false, reason: 'Нужна хотя бы одна буква' };
    return { ok: true, reason: '' };
  }

  btn.addEventListener('click', () => {
    const r = checkPassword(pass.value);
    if (r.ok) {
      result.textContent = 'Пароль надёжный';
      result.className = 'result result--success';
    } else {
      result.textContent = 'Слабый пароль: ' + r.reason;
      result.className = 'result result--error';
    }
  });
})();

// Задача 6. Генератор пунктов меню
(function () {
  const menu = ['Главная', 'Каталог', 'О нас', 'Контакты'];
  const nav = document.querySelector('#t6-nav');

  function buildMenu(items) {
    let html = '<ul class="menu">';
    for (const item of items) html += `<li><a class="menu__link" href="#">${item}</a></li>`;
    html += '</ul>';
    return html;
  }

  nav.innerHTML = buildMenu(menu);
})();

// Задача 7. Область видимости
(function () {
  const log = document.querySelector('#t7-log');

  function print(text, type) {
    console.log(text);
    const line = document.createElement('div');
    line.className = 'log__line' + (type ? ' log__line--' + type : '');
    line.textContent = text;
    log.append(line);
  }

  let globalMessage = 'Я глобальная переменная';

  function demo() {
    let localMessage = 'Я локальная переменная';
    print('Внутри функции виден global: ' + globalMessage, 'ok');
    print('Внутри функции виден local:  ' + localMessage, 'ok');
  }

  demo();
  print('Снаружи виден global: ' + globalMessage, 'ok');
  // print(localMessage); // → ReferenceError: localMessage is not defined
  print('Снаружи local недоступен → ReferenceError (см. комментарий в коде)', 'error');
})();
