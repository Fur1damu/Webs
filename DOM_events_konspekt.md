# DOM-события в JavaScript — Конспект

---

## 1. Основы DOM-событий

Событие — сигнал от браузера о том, что что-то произошло: клик, ввод, загрузка страницы и т.д.  
Обработчик (listener) — функция, вызываемая при наступлении события.

Три способа назначить обработчик:

```js
el.onclick = fn;                        // свойство (только 1 обработчик)
<button onclick="fn()">                 // HTML-атрибут (не рекомендуется)
el.addEventListener("click", fn);       // рекомендуемый способ
```

---

## 2. addEventListener()

```js
element.addEventListener(type, handler, options)
```

- `type` — имя события: `"click"`, `"input"` и т.д.
- `handler` — функция-обработчик
- `options` — объект `{ once, capture, passive }` или булево `capture`

```js
btn.addEventListener("click", handleClick);
btn.addEventListener("click", handleClick, { once: true });
```

- `once: true` — обработчик сработает один раз и автоматически удалится
- `passive: true` — нельзя вызвать `preventDefault` (оптимизация для scroll)

---

## 3. Объект Event

При наступлении события браузер создаёт объект `Event` и передаёт его в обработчик.

```js
el.addEventListener("click", function(event) {
  console.log(event.type);       // "click"
  console.log(event.target);     // элемент-источник
  console.log(event.timeStamp);  // время события (мс)
});
```

Полезные свойства:

- `event.type` — тип события
- `event.target` — элемент, на котором произошло событие
- `event.currentTarget` — элемент, на котором висит обработчик
- `event.bubbles` — всплывает ли событие
- `event.cancelable` — можно ли отменить действие по умолчанию

---

## 4. target / currentTarget

```js
document.querySelector("ul").addEventListener("click", (e) => {
  console.log(e.target);         // <li> — куда кликнули
  console.log(e.currentTarget);  // <ul> — где обработчик
});
```

- `target` — источник события
- `currentTarget` — всегда элемент с назначенным обработчиком
- Внутри обычной функции `this === currentTarget`

---

## 5. События мыши: click, mouseenter, mouseleave

```js
el.addEventListener("click", (e) => { /* e.clientX, e.clientY */ });
el.addEventListener("mouseenter", () => el.classList.add("hover"));
el.addEventListener("mouseleave", () => el.classList.remove("hover"));
```

- `click` — одиночный клик (после `mousedown` → `mouseup`)
- `mouseenter` / `mouseleave` — **не всплывают**, срабатывают только на сам элемент
- `mouseover` / `mouseout` — всплывают, срабатывают при входе в дочерние элементы

---

## 6. Формы: input, change, submit

`input` — срабатывает при каждом изменении значения поля:

```js
field.addEventListener("input", (e) => console.log(e.target.value));
```

`change` — срабатывает после потери фокуса или выбора из списка:

```js
select.addEventListener("change", (e) => console.log(e.target.value));
```

`submit` — на форме при отправке:

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();              // отменить перезагрузку страницы
  const data = new FormData(e.target);
});
```

---

## 7. preventDefault() и stopPropagation()

`preventDefault()` — отменяет действие браузера по умолчанию:

```js
link.addEventListener("click", (e) => e.preventDefault()); // не переходить
form.addEventListener("submit", (e) => e.preventDefault()); // не отправлять
```

`stopPropagation()` — останавливает всплытие события вверх по DOM:

```js
child.addEventListener("click", (e) => {
  e.stopPropagation(); // родительский обработчик не сработает
});
```

> `stopImmediatePropagation()` — останавливает также другие обработчики на этом же элементе

---

## 8. Клавиатурные события: keydown, focus, blur

```js
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter")  submit();
  if (e.key === "Escape") close();
  console.log(e.code);  // "KeyA", "ArrowLeft" и т.д.
});
```

`focus` / `blur` — фокус на элементе (не всплывают):

```js
input.addEventListener("focus", () => input.classList.add("active"));
input.addEventListener("blur",  () => validate(input.value));
```

> `focusin` / `focusout` — аналоги, но всплывают

---

## 9. Всплытие событий (bubbling)

После срабатывания обработчика на `target` событие поднимается вверх по DOM:

```
document → html → body → div → button   (всплытие)
```

- Большинство событий всплывают: `click`, `input`, `keydown`...
- Не всплывают: `focus`, `blur`, `mouseenter`, `mouseleave`, `load`
- Остановить: `e.stopPropagation()`

**Три фазы:**
1. **Capture** (погружение) — сверху вниз
2. **Target** — на целевом элементе
3. **Bubble** (всплытие) — снизу вверх

---

## 10. Делегирование событий

Один обработчик на родителе вместо обработчиков на каждом дочернем элементе:

```js
document.querySelector("ul").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  console.log(li.dataset.id);
});
```

- Меньше памяти — один обработчик вместо N
- Работает для динамически добавленных элементов
- `closest(selector)` — поднимается по DOM и ищет ближайший подходящий предок

---

## 11. data-* атрибуты

Хранение произвольных данных прямо в HTML:

```html
<button data-action="delete" data-id="42">Удалить</button>
```

```js
btn.dataset.action;  // "delete"
btn.dataset.id;      // "42"

list.addEventListener("click", (e) => {
  const { action, id } = e.target.dataset;
  if (action === "delete") deleteItem(id);
});
```

---

## 12. DOMContentLoaded

Срабатывает когда DOM построен, не дожидаясь картинок и стилей:

```js
document.addEventListener("DOMContentLoaded", () => {
  init(); // DOM готов, можно работать с элементами
});
```

- `DOMContentLoaded` — DOM готов (раньше)
- `window load` — все ресурсы загружены (позже)
- Скрипты с `defer` выполняются до `DOMContentLoaded`

---

## 13. Debounce для input

Откладывает выполнение функции до тех пор, пока не прекратится ввод:

```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

input.addEventListener("input", debounce((e) => {
  search(e.target.value); // запрос раз в 300 мс
}, 300));
```

> `throttle` — в отличие от debounce, вызывает функцию не реже чем раз в N мс

---

## 14. removeEventListener()

```js
function handleClick(e) { console.log("clicked"); }

btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick); // удалить
```

- Функция должна быть **той же ссылкой** (не анонимной!)
- Параметры `capture`/`options` должны совпадать
- Альтернатива: `{ once: true }` в `addEventListener`

Современный подход через `AbortController`:

```js
const ac = new AbortController();
el.addEventListener("click", fn, { signal: ac.signal });
ac.abort(); // удаляет обработчик
```

---

## 15. async/await в обработчиках

```js
btn.addEventListener("click", async (e) => {
  btn.disabled = true;
  try {
    const data = await fetchData();
    render(data);
  } catch (err) {
    showError(err.message);
  } finally {
    btn.disabled = false;
  }
});
```

> Ошибки в async-обработчиках нужно обрабатывать через `try/catch`

---

## 16. Обработка динамически созданных элементов

Элементы, добавленные после инициализации, не получат обработчики при прямой навеске.  
Решение — делегирование:

```js
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".dynamic-btn")) {
    handleDynamicClick(e.target);
  }
});

// Позже добавляем элемент — обработчик уже работает:
document.body.insertAdjacentHTML("beforeend",
  '<button class="dynamic-btn">Новая кнопка</button>');
```

---

## 17. Валидация форм через события

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const errors = validate(form);
  if (errors.length) { showErrors(errors); return; }
  submitForm(new FormData(form));
});

input.addEventListener("blur", () => {
  if (!input.value.includes("@"))
    showError(input, "Некорректный email");
});
```

- HTML5 атрибуты: `required`, `minlength`, `pattern`, `type="email"`
- `input.checkValidity()` — встроенная проверка
- `setCustomValidity(msg)` — своя ошибка для нативного пузыря

---

## 18. Scroll events

```js
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("sticky", y > 100);
});
```

Современная альтернатива — `IntersectionObserver`:

```js
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e =>
    e.target.classList.toggle("visible", e.isIntersecting)
  );
});
obs.observe(document.querySelector(".lazy-block"));
```

> Для scroll всегда используйте `debounce` или `{ passive: true }`

---

## 19. this и стрелочные функции в обработчиках

Обычная функция — `this` указывает на элемент с обработчиком:

```js
btn.addEventListener("click", function() {
  this.classList.add("active"); // this === btn
});
```

Стрелочная функция — `this` берётся из внешнего контекста:

```js
class Component {
  init() {
    this.el.addEventListener("click", (e) => {
      this.handleClick(e); // this === Component
    });
  }
}
```

- Стрелочная функция удобна в классах — сохраняет `this` компонента
- Обычная функция нужна если важен `this === currentTarget`
- `bind(this)` — альтернатива стрелочной функции

---

## Быстрый справочник

| Метод / Свойство         | Описание                        | Пример                              |
|--------------------------|---------------------------------|-------------------------------------|
| `addEventListener()`     | Добавить обработчик             | `el.addEventListener('click', fn)`  |
| `removeEventListener()`  | Удалить обработчик              | `el.removeEventListener('click', fn)` |
| `e.preventDefault()`     | Отменить действие браузера      | `e.preventDefault()`                |
| `e.stopPropagation()`    | Остановить всплытие             | `e.stopPropagation()`               |
| `e.target`               | Источник события                | `e.target.value`                    |
| `e.currentTarget`        | Элемент с обработчиком          | `e.currentTarget.id`                |
| `closest(sel)`           | Ближайший подходящий предок     | `e.target.closest('li')`            |
| `dataset.*`              | Данные из HTML-атрибутов        | `el.dataset.id`                     |
| `DOMContentLoaded`       | DOM готов                       | `document.addEventListener(...)`    |
| `debounce(fn, ms)`       | Отложить вызов                  | `debounce(search, 300)`             |
