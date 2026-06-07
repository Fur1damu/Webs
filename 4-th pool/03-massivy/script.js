// Блок 3. Массивы — все задачи на одной странице.

// Задача 1. Каталог товаров из массива
(function () {
  const products = [
    { title: 'Ноутбук', price: 70000 }, { title: 'Мышь', price: 1000 },
    { title: 'Клавиатура', price: 3000 }, { title: 'Монитор', price: 15000 },
  ];
  const catalog = document.querySelector('#t1-catalog');
  const btn = document.querySelector('#t1-render');

  function createCard(p) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `<div class="product-card__name">${p.title}</div><div class="product-card__price">${p.price} ₽</div>`;
    return card;
  }
  function render() {
    catalog.innerHTML = '';
    products.forEach(p => catalog.append(createCard(p)));
  }
  btn.addEventListener('click', render);
  render();
})();

// Задача 2. Фильтрация товаров по названию
(function () {
  const products = [
    { title: 'Ноутбук', price: 70000 }, { title: 'Мышь', price: 1000 },
    { title: 'Клавиатура', price: 3000 }, { title: 'Монитор', price: 15000 },
    { title: 'Наушники', price: 5000 },
  ];
  const query = document.querySelector('#t2-query');
  const btn = document.querySelector('#t2-btn');
  const catalog = document.querySelector('#t2-catalog');

  function createCard(p) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `<div class="product-card__name">${p.title}</div><div class="product-card__price">${p.price} ₽</div>`;
    return card;
  }
  function search() {
    const q = query.value.trim().toLowerCase();
    const found = products.filter(p => p.title.toLowerCase().includes(q));
    catalog.innerHTML = '';
    if (found.length === 0) {
      catalog.innerHTML = '<div class="empty">Ничего не найдено</div>';
      return;
    }
    found.forEach(p => catalog.append(createCard(p)));
  }
  btn.addEventListener('click', search);
  search();
})();

// Задача 3. Поиск пользователя по id
(function () {
  const users = [{ id: 1, name: 'Анна' }, { id: 2, name: 'Иван' }, { id: 3, name: 'Олег' }];
  const idEl = document.querySelector('#t3-id');
  const btn = document.querySelector('#t3-btn');
  const result = document.querySelector('#t3-result');

  btn.addEventListener('click', () => {
    const id = Number(idEl.value);
    if (idEl.value.trim() === '' || Number.isNaN(id)) {
      result.textContent = 'Введите id числом';
      result.className = 'result result--error';
      return;
    }
    const user = users.find(u => u.id === id);
    if (user) {
      result.textContent = 'Найден пользователь: ' + user.name;
      result.className = 'result result--success';
    } else {
      result.textContent = 'Пользователь не найден';
      result.className = 'result result--error';
    }
  });
})();

// Задача 4. Преобразование цен
(function () {
  const prices = [500, 1200, 3000, 700];
  const discounted = prices.map(p => p * 0.9);
  const labels = prices.map(p => `Цена товара: ${p} ₽`);

  const dEl = document.querySelector('#t4-discounted');
  const lEl = document.querySelector('#t4-labels');

  discounted.forEach(p => { const li = document.createElement('li'); li.textContent = p + ' ₽'; dEl.append(li); });
  labels.forEach(t => { const li = document.createElement('li'); li.textContent = t; lEl.append(li); });
})();

// Задача 5. Список задач
(function () {
  const tasks = [
    { id: 1, title: 'Сделать HTML', completed: true },
    { id: 2, title: 'Сделать CSS', completed: false },
    { id: 3, title: 'Сделать JS', completed: false },
  ];
  const list = document.querySelector('#t5-list');
  const tabs = document.querySelectorAll('#task-5 .tab');

  function render(items) {
    list.innerHTML = '';
    items.forEach(t => {
      const li = document.createElement('li');
      if (t.completed) li.classList.add('done');
      li.innerHTML = `<span>${t.title}</span><span class="status">${t.completed ? '✅' : '⬜'}</span>`;
      list.append(li);
    });
  }
  function getTasks(filter) {
    if (filter === 'done') return tasks.filter(t => t.completed);
    if (filter === 'active') return tasks.filter(t => !t.completed);
    return tasks;
  }
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('tab--active'));
    tab.classList.add('tab--active');
    render(getTasks(tab.dataset.filter));
  }));
  render(tasks);
})();

// Задача 6. Корзина
(function () {
  const cart = [
    { title: 'Мышь', price: 1000, count: 2 },
    { title: 'Клавиатура', price: 3000, count: 1 },
    { title: 'Монитор', price: 15000, count: 1 },
  ];
  const cartEl = document.querySelector('#t6-cart');
  const totalsEl = document.querySelector('#t6-totals');

  function getSum(items) { let s = 0; for (const i of items) s += i.price * i.count; return s; }
  function getCount(items) { let c = 0; for (const i of items) c += i.count; return c; }
  function getMostExpensive(items) { let m = items[0]; for (const i of items) if (i.price > m.price) m = i; return m; }

  cart.forEach(i => {
    const li = document.createElement('li');
    li.innerHTML = `<div><div class="cart__title">${i.title}</div><div class="cart__meta">${i.price} ₽ × ${i.count}</div></div><div class="cart__sum">${i.price * i.count} ₽</div>`;
    cartEl.append(li);
  });
  const exp = getMostExpensive(cart);
  totalsEl.innerHTML =
    `<div class="totals__row"><span>Всего товаров</span><b>${getCount(cart)} шт.</b></div>` +
    `<div class="totals__row"><span>Самый дорогой</span><b>${exp.title}</b></div>` +
    `<div class="totals__row totals__row--total"><span>Итого</span><b>${getSum(cart)} ₽</b></div>`;
})();

// Задача 7. Простая сортировка
(function () {
  const products = [
    { title: 'Мышь', price: 1000 }, { title: 'Монитор', price: 15000 },
    { title: 'Клавиатура', price: 3000 }, { title: 'Ноутбук', price: 70000 },
  ];
  const list = document.querySelector('#t7-list');
  const buttons = document.querySelectorAll('#task-7 [data-sort]');

  function render(items) {
    list.innerHTML = '';
    items.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${p.title}</span><b>${p.price} ₽</b>`;
      list.append(li);
    });
  }
  function sortByPrice(items, dir) {
    const copy = [...items];
    if (dir === 'asc') copy.sort((a, b) => a.price - b.price);
    if (dir === 'desc') copy.sort((a, b) => b.price - a.price);
    return copy;
  }
  buttons.forEach(b => b.addEventListener('click', () => {
    const s = b.dataset.sort;
    render(s === 'default' ? products : sortByPrice(products, s));
  }));
  render(products);
})();
