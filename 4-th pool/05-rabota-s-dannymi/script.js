// Блок 5. Работа с данными — все задачи на одной странице.

// Задача 1. Подготовка товаров для UI
(function () {
  const products = [
    { title: 'Мышь', price: 1000, category: 'Периферия' },
    { title: 'Монитор', price: 15000, category: 'Техника' },
  ];
  const view = products.map(p => ({
    ...p,
    priceText: `${p.price} ₽`,
    categoryText: `Категория: ${p.category}`,
    caption: `${p.title} — ${p.price} ₽`,
  }));
  const catalog = document.querySelector('#t1-catalog');
  view.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `<span class="product-card__cat">${p.categoryText}</span><div class="product-card__name">${p.title}</div><div class="product-card__price">${p.priceText}</div><div class="product-card__caption">${p.caption}</div>`;
    catalog.append(card);
  });
})();

// Задача 2. Каталог по категориям
(function () {
  const categories = ['Периферия', 'Техника', 'Аксессуары'];
  const products = [
    { title: 'Мышь', price: 1000, category: 'Периферия' },
    { title: 'Клавиатура', price: 3000, category: 'Периферия' },
    { title: 'Монитор', price: 15000, category: 'Техника' },
    { title: 'Ноутбук', price: 70000, category: 'Техника' },
  ];
  const root = document.querySelector('#t2-catalog');
  categories.forEach(category => {
    const items = products.filter(p => p.category === category);
    const section = document.createElement('section');
    section.className = 'category';
    let inner = `<div class="category__title">${category}</div>`;
    if (items.length === 0) {
      inner += `<div class="category__empty">В этой категории пока нет товаров</div>`;
    } else {
      inner += `<div class="category__items">` + items.map(p =>
        `<div class="product-card"><div class="product-card__name">${p.title}</div><div class="product-card__price">${p.price} ₽</div></div>`
      ).join('') + `</div>`;
    }
    section.innerHTML = inner;
    root.append(section);
  });
})();

// Задача 3. Списки пользователей
(function () {
  const users = [
    { id: 1, name: 'Анна', email: 'anna@mail.ru', role: 'admin', active: true },
    { id: 2, name: 'Иван', email: 'ivan@mail.ru', role: 'user', active: false },
    { id: 3, name: 'Олег', email: 'oleg@mail.ru', role: 'admin', active: true },
    { id: 4, name: 'Мария', email: 'maria@mail.ru', role: 'user', active: false },
    { id: 5, name: 'Пётр', email: 'petr@mail.ru', role: 'user', active: true },
  ];
  const activeUsers = users.filter(u => u.active);
  const admins = users.filter(u => u.role === 'admin');
  const emails = users.map(u => u.email);
  const inactiveCount = users.filter(u => !u.active).length;

  function fill(sel, items) {
    document.querySelector(sel).innerHTML = items.map(t => `<li>${t}</li>`).join('');
  }
  fill('#t3-active', activeUsers.map(u => u.name));
  fill('#t3-admins', admins.map(u => u.name));
  fill('#t3-emails', emails);
  document.querySelector('#t3-inactive').textContent = inactiveCount;
})();

// Задача 4. Таблица заказов
(function () {
  const orders = [
    { number: 'A-1001', client: 'Иван Петров', status: 'new', items: [{ price: 1000, count: 2 }, { price: 3000, count: 1 }] },
    { number: 'A-1002', client: 'Анна Смирнова', status: 'done', items: [{ price: 15000, count: 1 }] },
    { number: 'A-1003', client: 'Олег Кузнецов', status: 'cancelled', items: [{ price: 70000, count: 1 }, { price: 5000, count: 2 }] },
  ];
  function getCount(items) { return items.reduce((s, i) => s + i.count, 0); }
  function getSum(items) { return items.reduce((s, i) => s + i.price * i.count, 0); }
  const statusText = { new: 'Новый', done: 'Выполнен', cancelled: 'Отменён' };

  document.querySelector('#t4-tbody').innerHTML = orders.map(o =>
    `<tr><td>${o.number}</td><td>${o.client}</td><td>${getCount(o.items)} шт.</td><td>${getSum(o.items)} ₽</td><td><span class="status status--${o.status}">${statusText[o.status]}</span></td></tr>`
  ).join('');
})();

// Задача 5. Фильтрация и сортировка каталога
(function () {
  const products = [
    { title: 'Мышь', price: 1000, category: 'Периферия' },
    { title: 'Клавиатура', price: 3000, category: 'Периферия' },
    { title: 'Монитор', price: 15000, category: 'Техника' },
    { title: 'Ноутбук', price: 70000, category: 'Техника' },
    { title: 'Чехол', price: 800, category: 'Аксессуары' },
  ];
  const search = document.querySelector('#t5-search');
  const category = document.querySelector('#t5-category');
  const sort = document.querySelector('#t5-sort');
  const catalog = document.querySelector('#t5-catalog');

  function filterProducts(items, query, cat) {
    return items.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) &&
      (cat === 'all' || p.category === cat)
    );
  }
  function sortProducts(items, dir) {
    const copy = [...items];
    if (dir === 'asc') copy.sort((a, b) => a.price - b.price);
    if (dir === 'desc') copy.sort((a, b) => b.price - a.price);
    return copy;
  }
  function render() {
    let result = filterProducts(products, search.value, category.value);
    result = sortProducts(result, sort.value);
    if (result.length === 0) { catalog.innerHTML = '<div class="empty">Ничего не найдено</div>'; return; }
    catalog.innerHTML = result.map(p =>
      `<div class="product-card"><span class="product-card__cat">${p.category}</span><div class="product-card__name">${p.title}</div><div class="product-card__price">${p.price} ₽</div></div>`
    ).join('');
  }

  [...new Set(products.map(p => p.category))].forEach(cat => {
    const option = document.createElement('option');
    option.value = cat; option.textContent = cat;
    category.append(option);
  });

  search.addEventListener('input', render);
  category.addEventListener('change', render);
  sort.addEventListener('change', render);
  render();
})();

// Задача 6. Чистые функции
(function () {
  function filterByCategory(products, category) { return products.filter(p => p.category === category); }
  function searchProducts(products, query) { const q = query.toLowerCase(); return products.filter(p => p.title.toLowerCase().includes(q)); }
  function sortByPrice(products, dir) { return [...products].sort((a, b) => dir === 'asc' ? a.price - b.price : b.price - a.price); }
  function formatProducts(products) { return products.map(p => ({ ...p, priceText: `${p.price} ₽` })); }

  const products = [
    { title: 'Мышь', price: 1000, category: 'Периферия' },
    { title: 'Клавиатура', price: 3000, category: 'Периферия' },
    { title: 'Монитор', price: 15000, category: 'Техника' },
    { title: 'Ноутбук', price: 70000, category: 'Техника' },
  ];
  function showChips(sel, items) {
    document.querySelector(sel).innerHTML = items.map(p =>
      `<span class="chip">${p.title} — ${p.priceText || p.price + ' ₽'}</span>`
    ).join('');
  }
  showChips('#t6-demo1', filterByCategory(products, 'Периферия'));
  showChips('#t6-demo2', searchProducts(products, 'мон'));
  showChips('#t6-demo3', sortByPrice(products, 'asc'));
  showChips('#t6-demo4', formatProducts(products));
  console.log('Оригинал не изменился:', products);
})();

// Задача 7. Подготовка сырых данных для карточек
(function () {
  const rawProducts = [
    { name: 'mouse', price: 1000, available: true },
    { name: 'keyboard', price: 3000, available: false },
    { name: 'monitor', price: 15000, available: true },
  ];
  function capitalize(text) { return text.charAt(0).toUpperCase() + text.slice(1); }
  const view = rawProducts.map(p => ({
    name: capitalize(p.name),
    priceText: `${p.price} ₽`,
    stockText: p.available ? 'В наличии' : 'Нет в наличии',
    stockClass: p.available ? 'stock--in' : 'stock--out',
  }));
  document.querySelector('#t7-catalog').innerHTML = view.map(p =>
    `<div class="product-card"><div class="product-card__name">${p.name}</div><div class="product-card__price">${p.priceText}</div><span class="stock ${p.stockClass}">${p.stockText}</span></div>`
  ).join('');
})();
