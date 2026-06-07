// Блок 6. DOM — все задачи на одной странице.

// Задача 1. Изменение текста
(function () {
  const title = document.querySelector('#t1-title');
  const btn = document.querySelector('#t1-btn');
  btn.addEventListener('click', () => {
    if (title) title.textContent = 'Текст заголовка изменён через JS';
  });
})();

// Задача 2. Изменение стилей через класс
(function () {
  const card = document.querySelector('#t2-card');
  const btn = document.querySelector('#t2-btn');
  btn.addEventListener('click', () => card.classList.toggle('is-active'));
})();

// Задача 3. Создание элементов списка
(function () {
  const input = document.querySelector('#t3-text');
  const add = document.querySelector('#t3-add');
  const list = document.querySelector('#t3-list');
  add.addEventListener('click', () => {
    const text = input.value.trim();
    if (text === '') return;
    const li = document.createElement('li');
    li.textContent = text;
    list.append(li);
    input.value = '';
    input.focus();
  });
})();

// Задача 4. Удаление элементов
(function () {
  const input = document.querySelector('#t4-text');
  const add = document.querySelector('#t4-add');
  const list = document.querySelector('#t4-list');

  function createTask(text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    const del = document.createElement('button');
    del.className = 'del';
    del.textContent = '×';
    del.addEventListener('click', () => li.remove());
    li.append(span, del);
    return li;
  }

  add.addEventListener('click', () => {
    const text = input.value.trim();
    if (text === '') return;
    list.append(createTask(text));
    input.value = '';
  });

  ['Купить продукты', 'Позвонить в банк', 'Сделать домашку'].forEach(t => list.append(createTask(t)));
})();

// Задача 5. Генерация каталога
(function () {
  const products = [
    { title: 'Ноутбук', price: 70000, icon: '💻' }, { title: 'Мышь', price: 1000, icon: '🖱️' },
    { title: 'Клавиатура', price: 3000, icon: '⌨️' }, { title: 'Монитор', price: 15000, icon: '🖥️' },
  ];
  const catalog = document.querySelector('#t5-catalog');
  const btn = document.querySelector('#t5-render');

  function createCard(p) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `<div class="product-card__icon">${p.icon}</div><div class="product-card__name">${p.title}</div><div class="product-card__price">${p.price} ₽</div>`;
    return card;
  }
  function render() {
    catalog.innerHTML = '';
    products.forEach(p => catalog.append(createCard(p)));
  }
  btn.addEventListener('click', render);
  render();
})();

// Задача 6. Модальное окно
(function () {
  const open = document.querySelector('#t6-open');
  const close = document.querySelector('#t6-close');
  const overlay = document.querySelector('#t6-overlay');

  const openModal = () => overlay.classList.add('is-open');
  const closeModal = () => overlay.classList.remove('is-open');

  open.addEventListener('click', openModal);
  close.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

// Задача 7. Таблица через DOM
(function () {
  const users = [
    { name: 'Анна', email: 'anna@mail.ru', role: 'Админ' },
    { name: 'Иван', email: 'ivan@mail.ru', role: 'Менеджер' },
    { name: 'Олег', email: 'oleg@mail.ru', role: 'Клиент' },
  ];
  const tbody = document.querySelector('#t7-tbody');

  function render(data) {
    tbody.innerHTML = '';
    data.forEach(u => {
      const tr = document.createElement('tr');
      const name = document.createElement('td'); name.textContent = u.name;
      const email = document.createElement('td'); email.textContent = u.email;
      const role = document.createElement('td'); role.textContent = u.role;
      tr.append(name, email, role);
      tbody.append(tr);
    });
  }
  render(users);
})();
