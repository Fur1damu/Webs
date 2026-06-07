// Блок 4. Объекты — все задачи на одной странице.

// Задача 1. Объект пользователя
(function () {
  const user = { id: 1, name: 'Алексей', age: 25, email: 'alex@example.com', role: 'student' };
  document.querySelector('#t1-profile').innerHTML = `
    <div class="profile">
      <div class="profile__avatar">${user.name[0]}</div>
      <div class="profile__name">${user.name}</div>
      <div class="profile__role">${user.role}</div>
      <ul class="profile__list">
        <li><span>ID</span><span>${user.id}</span></li>
        <li><span>Возраст</span><span>${user.age}</span></li>
        <li><span>Email</span><span>${user.email}</span></li>
      </ul>
    </div>`;
})();

// Задача 2. Вложенный объект товара
(function () {
  const product = {
    title: 'Ноутбук', price: 70000,
    specs: { cpu: 'Intel Core i5', ram: '16 GB', storage: '512 GB SSD' },
  };
  document.querySelector('#t2-product').innerHTML = `
    <div class="product">
      <div class="product__icon">💻</div>
      <div class="product__title">${product.title}</div>
      <div class="product__price">${product.price} ₽</div>
      <div class="product__specs-title">Характеристики</div>
      <ul class="product__specs">
        <li><span>Процессор</span><span>${product.specs.cpu}</span></li>
        <li><span>Память</span><span>${product.specs.ram}</span></li>
        <li><span>Накопитель</span><span>${product.specs.storage}</span></li>
      </ul>
    </div>`;
})();

// Задача 3. Массив объектов пользователей
(function () {
  const users = [
    { id: 1, name: 'Анна', email: 'anna@mail.ru', role: 'Админ', active: true },
    { id: 2, name: 'Иван', email: 'ivan@mail.ru', role: 'Менеджер', active: false },
    { id: 3, name: 'Олег', email: 'oleg@mail.ru', role: 'Клиент', active: true },
    { id: 4, name: 'Мария', email: 'maria@mail.ru', role: 'Клиент', active: false },
  ];
  const container = document.querySelector('#t3-users');
  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';
    const badgeClass = user.active ? 'badge--active' : 'badge--inactive';
    const badgeText = user.active ? 'Активен' : 'Неактивен';
    card.innerHTML = `
      <div class="user-card__name">${user.name}</div>
      <div class="user-card__email">${user.email}</div>
      <span class="user-card__role">${user.role}</span>
      <span class="badge ${badgeClass}">${badgeText}</span>`;
    container.append(card);
  });
})();

// Задача 4. Деструктуризация
(function () {
  const user = { id: 1, name: 'Алексей', email: 'alex@example.com', role: 'student' };
  // достаём свойства через деструктуризацию
  const { name, email, role } = user;
  // старый способ: user.name, user.email, user.role
  document.querySelector('#t4-info').innerHTML = `
    <li><span>Имя</span><span>${name}</span></li>
    <li><span>Email</span><span>${email}</span></li>
    <li><span>Роль</span><span>${role}</span></li>`;
})();

// Задача 5. Шаблонные строки
(function () {
  const product = {
    title: 'Беспроводные наушники', price: 5990, category: 'Аудио',
    description: 'Активное шумоподавление и до 30 часов работы.',
  };
  function createCard(p) {
    return `
      <div class="promo">
        <span class="promo__cat">${p.category}</span>
        <h3 class="promo__title">${p.title}</h3>
        <div class="promo__price">${p.price} ₽</div>
        <p class="promo__desc">${p.description}</p>
        <button class="btn">В корзину</button>
      </div>`;
  }
  document.querySelector('#t5-card').innerHTML = createCard(product);
})();

// Задача 6. Объект заказа
(function () {
  const order = {
    number: 'A-1001', date: '2026-05-31',
    client: { name: 'Иван Петров', email: 'ivan@example.com' },
    items: [
      { title: 'Мышь', price: 1000, count: 2 },
      { title: 'Клавиатура', price: 3000, count: 1 },
    ],
  };
  function getTotal(items) { let t = 0; for (const i of items) t += i.price * i.count; return t; }

  const rows = order.items.map(i =>
    `<tr><td>${i.title}</td><td>${i.count}</td><td>${i.price} ₽</td><td>${i.price * i.count} ₽</td></tr>`
  ).join('');

  document.querySelector('#t6-order').innerHTML = `
    <div class="order__head">
      <div class="order__number">Заказ ${order.number}</div>
      <div class="order__date">${order.date}</div>
    </div>
    <div class="order__client"><b>${order.client.name}</b>${order.client.email}</div>
    <table>
      <thead><tr><th>Товар</th><th>Кол-во</th><th>Цена</th><th>Сумма</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="order__total">Итого: ${getTotal(order.items)} ₽</div>`;
})();
