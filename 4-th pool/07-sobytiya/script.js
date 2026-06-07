// Блок 7. События — все задачи на одной странице.

// Задача 1. Кнопка счётчика
(function () {
  const counter = document.querySelector('#t1-counter');
  const btn = document.querySelector('#t1-btn');
  let count = 0;
  btn.addEventListener('click', () => { count++; counter.textContent = count; });
})();

// Задача 2. Live input
(function () {
  const input = document.querySelector('#t2-input');
  const output = document.querySelector('#t2-output');
  input.addEventListener('input', () => {
    const v = input.value.trim();
    if (v === '') {
      output.textContent = 'Здесь появится текст';
      output.classList.add('is-empty');
    } else {
      output.textContent = v;
      output.classList.remove('is-empty');
    }
  });
})();

// Задача 3. Форма регистрации (submit + preventDefault)
(function () {
  const form = document.querySelector('#t3-form');
  const name = document.querySelector('#t3-name');
  const email = document.querySelector('#t3-email');
  const password = document.querySelector('#t3-password');
  const result = document.querySelector('#t3-result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const n = name.value.trim(), em = email.value.trim(), p = password.value.trim();
    let error = '';
    if (n === '') error = 'Введите имя';
    else if (em === '') error = 'Введите email';
    else if (!em.includes('@')) error = 'Email должен содержать @';
    else if (p.length < 6) error = 'Пароль минимум 6 символов';

    if (error !== '') {
      result.textContent = error;
      result.className = 'result result--error';
      return;
    }
    result.innerHTML = `Регистрация успешна!<br>Имя: ${n}<br>Email: ${em}`;
    result.className = 'result result--success';
    form.reset();
  });
})();

// Задача 4. TODO список
(function () {
  const input = document.querySelector('#t4-text');
  const add = document.querySelector('#t4-add');
  const list = document.querySelector('#t4-list');
  const totalEl = document.querySelector('#t4-total');
  const doneEl = document.querySelector('#t4-done');
  let tasks = [
    { id: 1, title: 'Сделать HTML', done: true },
    { id: 2, title: 'Сделать CSS', done: false },
  ];

  function render() {
    list.innerHTML = tasks.map(t =>
      `<li class="${t.done ? 'done' : ''}" data-id="${t.id}"><span class="text">${t.title}</span><button class="del">×</button></li>`
    ).join('');
    totalEl.textContent = tasks.length;
    doneEl.textContent = tasks.filter(t => t.done).length;
  }

  add.addEventListener('click', () => {
    const title = input.value.trim();
    if (title === '') return;
    tasks.push({ id: Date.now(), title, done: false });
    input.value = '';
    render();
  });

  list.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = Number(li.dataset.id);
    if (e.target.classList.contains('del')) {
      tasks = tasks.filter(t => t.id !== id);
    } else {
      const t = tasks.find(t => t.id === id);
      if (t) t.done = !t.done;
    }
    render();
  });

  render();
})();

// Задача 5. Делегирование событий
(function () {
  const products = [
    { id: 1, title: 'Мышь', price: 1000 }, { id: 2, title: 'Клавиатура', price: 3000 },
    { id: 3, title: 'Монитор', price: 15000 }, { id: 4, title: 'Ноутбук', price: 70000 },
  ];
  const catalog = document.querySelector('#t5-catalog');
  const message = document.querySelector('#t5-message');

  catalog.innerHTML = products.map(p =>
    `<div class="dcard" data-id="${p.id}"><div class="dcard__name">${p.title}</div><div class="dcard__price">${p.price} ₽</div><div class="dcard__actions"><button class="btn-add">В корзину</button><button class="btn-del">×</button></div></div>`
  ).join('');

  catalog.addEventListener('click', e => {
    const card = e.target.closest('.dcard');
    if (!card) return;
    const id = Number(card.dataset.id);
    const product = products.find(p => p.id === id);
    if (e.target.classList.contains('btn-del')) card.remove();
    else if (e.target.classList.contains('btn-add')) message.textContent = 'Добавлено в корзину: ' + product.title;
  });
})();

// Задача 6. Фильтр каталога
(function () {
  const products = [
    { title: 'Мышь', price: 1000, category: 'Периферия' },
    { title: 'Клавиатура', price: 3000, category: 'Периферия' },
    { title: 'Монитор', price: 15000, category: 'Техника' },
    { title: 'Ноутбук', price: 70000, category: 'Техника' },
    { title: 'Чехол', price: 800, category: 'Аксессуары' },
  ];
  const search = document.querySelector('#t6-search');
  const category = document.querySelector('#t6-category');
  const sort = document.querySelector('#t6-sort');
  const catalog = document.querySelector('#t6-catalog');

  function apply() {
    let result = products.filter(p =>
      p.title.toLowerCase().includes(search.value.toLowerCase()) &&
      (category.value === 'all' || p.category === category.value)
    );
    if (sort.value === 'asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort.value === 'desc') result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }
  function render() {
    const result = apply();
    if (result.length === 0) { catalog.innerHTML = '<div class="empty">Ничего не найдено</div>'; return; }
    catalog.innerHTML = result.map(p =>
      `<div class="product-card"><div class="product-card__cat">${p.category}</div><div class="product-card__name">${p.title}</div><div class="product-card__price">${p.price} ₽</div></div>`
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

// Задача 7. Корзина с событиями
(function () {
  const products = [
    { id: 1, title: 'Мышь', price: 1000 }, { id: 2, title: 'Клавиатура', price: 3000 },
    { id: 3, title: 'Монитор', price: 15000 }, { id: 4, title: 'Ноутбук', price: 70000 },
  ];
  const cart = [];
  const catalogEl = document.querySelector('#t7-catalog');
  const cartEl = document.querySelector('#t7-cart');
  const totalEl = document.querySelector('#t7-total');

  catalogEl.innerHTML = products.map(p =>
    `<div class="mini-card"><div class="mini-card__name">${p.title}</div><div class="mini-card__price">${p.price} ₽</div><button class="mini-card__btn" data-id="${p.id}">В корзину</button></div>`
  ).join('');

  function getTotal() { return cart.reduce((s, i) => s + i.price * i.count, 0); }

  function renderCart() {
    if (cart.length === 0) {
      cartEl.innerHTML = '<div class="cart-empty">Корзина пуста</div>';
    } else {
      cartEl.innerHTML = cart.map(i =>
        `<li><div class="ci"><b>${i.title}</b><span class="ci__count">${i.price} ₽ × ${i.count}</span></div><button class="cart-del" data-id="${i.id}">×</button></li>`
      ).join('');
    }
    totalEl.textContent = 'Итого: ' + getTotal() + ' ₽';
  }

  catalogEl.addEventListener('click', e => {
    const btn = e.target.closest('.mini-card__btn');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const product = products.find(p => p.id === id);
    const inCart = cart.find(i => i.id === id);
    if (inCart) inCart.count++;
    else cart.push({ ...product, count: 1 });
    renderCart();
  });

  cartEl.addEventListener('click', e => {
    const btn = e.target.closest('.cart-del');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const index = cart.findIndex(i => i.id === id);
    if (index !== -1) cart.splice(index, 1);
    renderCart();
  });

  renderCart();
})();
