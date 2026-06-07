// Блок 1. Основы — все задачи на одной странице.
// Каждая задача в своём IIFE, чтобы переменные не конфликтовали.

// Задача 1. Кнопка приветствия
(function () {
  const input = document.querySelector('#t1-name');
  const btn = document.querySelector('#t1-btn');
  const result = document.querySelector('#t1-result');

  btn.addEventListener('click', () => {
    const name = input.value.trim();
    if (name === '') {
      result.textContent = 'Введите имя';
      result.className = 'result result--error';
      return;
    }
    result.textContent = `Привет, ${name}!`;
    result.className = 'result result--success';
  });
})();

// Задача 2. Калькулятор скидки
(function () {
  const price = document.querySelector('#t2-price');
  const discount = document.querySelector('#t2-discount');
  const btn = document.querySelector('#t2-btn');
  const result = document.querySelector('#t2-result');

  btn.addEventListener('click', () => {
    const p = Number(price.value);
    const d = Number(discount.value);
    if (price.value.trim() === '' || discount.value.trim() === '' || Number.isNaN(p) || Number.isNaN(d)) {
      result.textContent = 'Ошибка: введите корректные числа';
      result.className = 'result result--error';
      return;
    }
    if (p < 0 || d < 0 || d > 100) {
      result.textContent = 'Ошибка: цена ≥ 0, скидка от 0 до 100';
      result.className = 'result result--error';
      return;
    }
    result.textContent = `Итоговая цена: ${Math.round(p - (p * d) / 100)} ₽`;
    result.className = 'result result--success';
  });
})();

// Задача 3. Проверка возраста
(function () {
  const age = document.querySelector('#t3-age');
  const btn = document.querySelector('#t3-btn');
  const result = document.querySelector('#t3-result');

  btn.addEventListener('click', () => {
    const raw = age.value.trim();
    if (raw === '') {
      result.textContent = 'Введите возраст';
      result.className = 'result result--error';
      return;
    }
    const a = Number(raw);
    if (Number.isNaN(a) || a < 0) {
      result.textContent = 'Возраст должен быть положительным числом';
      result.className = 'result result--error';
      return;
    }
    let message;
    if (a < 18) message = 'Доступ запрещён';
    else if (a < 60) message = 'Доступ разрешён';
    else message = 'Льготная категория';
    result.textContent = message;
    result.className = 'result result--info';
  });
})();

// Задача 4. Проверка формы регистрации
(function () {
  const name = document.querySelector('#t4-name');
  const email = document.querySelector('#t4-email');
  const password = document.querySelector('#t4-password');
  const btn = document.querySelector('#t4-btn');
  const result = document.querySelector('#t4-result');

  btn.addEventListener('click', () => {
    const n = name.value.trim();
    const e = email.value.trim();
    const p = password.value.trim();
    let error = '';
    if (n === '') error = 'Введите имя';
    else if (e === '') error = 'Введите email';
    else if (p === '') error = 'Введите пароль';

    if (error !== '') {
      result.textContent = error;
      result.className = 'result result--error';
      return;
    }
    result.textContent = `Проверка пройдена. Добро пожаловать, ${n}!`;
    result.className = 'result result--success';
  });
})();

// Задача 5. Проверка цены товара
(function () {
  const price = document.querySelector('#t5-price');
  const btn = document.querySelector('#t5-btn');
  const result = document.querySelector('#t5-result');

  btn.addEventListener('click', () => {
    const raw = price.value.trim();
    if (raw === '') {
      result.textContent = 'Введите цену';
      result.className = 'result result--error';
      return;
    }
    const value = Number(raw);
    if (Number.isNaN(value)) {
      result.textContent = 'Цена должна быть числом';
      result.className = 'result result--error';
      return;
    }
    let message;
    if (value < 0) {
      message = 'Ошибка: цена не может быть меньше 0';
      result.className = 'result result--error';
    } else {
      if (value === 0) message = 'Бесплатно';
      else if (value < 1000) message = 'Дешёвый товар';
      else if (value <= 10000) message = 'Обычный товар';
      else message = 'Дорогой товар';
      result.className = 'result result--info';
    }
    result.textContent = message;
  });
})();

// Задача 6. Переключатель состояния
(function () {
  const box = document.querySelector('#t6-box');
  const btn = document.querySelector('#t6-btn');
  let isOn = false;

  btn.addEventListener('click', () => {
    isOn = !isOn;
    if (isOn) {
      box.textContent = 'Включено';
      box.classList.add('box--on');
    } else {
      box.textContent = 'Выключено';
      box.classList.remove('box--on');
    }
  });
})();
