/*
 * Практична робота №10
 * Клієнтське програмування з бібліотеками
 * та фреймворками (Vue/React).
 *
 * Варіант №12 — Каталог домашніх тварин.
 *
 * Обрано Vue 3, оскільки він дозволяє
 * реалізувати компонентний підхід та реактивне
 * оновлення інтерфейсу без ручної роботи з DOM.
 *
 * Компонент PetCard отримує дані через props.
 * Локальний стан isFavorite змінюється при
 * натисканні на картку та автоматично
 * оновлює її відображення.
 *
 * Практична робота №11 (варіант 12): дані каталогу зберігаються
 * в IndexedDB (база PetCatalogDB, сховище "pets", keyPath "id").
 * Функції роботи з localStorage та IndexedDB — у блоці «Практикум 11» нижче.
 *
 * Практична робота №12 (варіант 12): Canvas-анімація «рибки, що плавають».
 * Кількість рибок дорівнює кількості записів-рибок у каталозі; рибки рухаються
 * по синусоїді в циклі requestAnimationFrame (блок «Практикум 12» нижче).
 */
console.log('script.js підключено');
// Видалення статичних карток тварин із DOM-дерева
let staticCard = document.querySelector('#pets-list .card');

while (staticCard !== null) {
    staticCard.remove();
    staticCard = document.querySelector('#pets-list .card');
}
// Масив об'єктів каталогу домашніх тварин (варіант 12)
const animals = [
    { name: 'Мурчик', species: 'кіт', ageYears: 1 },
    { name: 'Барсик', species: 'кіт', ageYears: 4 },
    { name: 'Рекс', species: 'собака', ageYears: 5 },
    { name: 'Луна', species: 'собака', ageYears: 0.5 },
    { name: 'Немо', species: 'акваріумна рибка', ageYears: 1 },
    { name: 'Голді', species: 'акваріумна рибка', ageYears: 2 }
];
// Отримання контейнера для динамічного відображення тварин
const listContainer = document.querySelector('#pets-list');

// Функція для динамічного відображення каталогу тварин

// Функція динамічного створення карток тварин

/*
 * Функція renderAnimals() динамічно створює картки тварин.
 * Для кожного об'єкта масиву створюються HTML-елементи,
 * встановлюються атрибути та CSS-класи відповідно до віку.
 * Готові картки додаються до контейнера #pets-list.
 */
function renderAnimals(animalsList, container = listContainer) {
    container.replaceChildren();
    // Шляхи до зображень відповідно до виду тварини
    const animalImages = {
        'кіт': 'assets/img/cat.jpeg',
        'собака': 'assets/img/dog.jpeg',
        'акваріумна рибка': 'assets/img/fish.jpg'
    };

    animalsList.forEach(animal => {

        // Створення картки тварини
        const card = document.createElement('article');
        card.classList.add('card');

        // Створення заголовка з ім'ям тварини
        const title = document.createElement('h3');
        title.textContent = animal.name;

        // Створення абзацу з видом тварини
        const species = document.createElement('p');
        species.textContent = `Вид: ${animal.species}`;

        // Створення зображення тварини
        const image = document.createElement('img');
        // Якщо в об'єкта є власне зображення (наприклад, з API) — використовуємо його
        image.src = animal.image || animalImages[animal.species];
        image.alt = `Фото тварини ${animal.name} (${animal.species})`;

        // Додавання атрибута data-species
        card.dataset.species = animal.species;

        // Додавання умовного класу залежно від віку
        // (лише якщо вік відомий — для даних з API він може бути відсутній)
        if (typeof animal.ageYears === 'number') {
            if (animal.ageYears < 2) {
                card.classList.add('young');
            } else {
                card.classList.add('adult');
            }
        }


        // Формування структури картки
        card.append(title, image, species);

        // Додавання створеної картки до HTML-контейнера
        container.append(card);
    });
}
// Крок 7. Ручний DOM-рендеринг замінено
// компонентом PetCard на Vue 3.
// renderAnimals();
//renderAnimals(animals);

// Отримання елемента для відображення кількості тварин
const petsCount = document.querySelector('#pets-count');

// Динамічне оновлення загальної кількості тварин
petsCount.textContent = `Кількість тварин: ${animals.length}`;

// Вид тварин, який потрібно знайти в каталозі
const selectedSpecies = 'кіт';

// Функція знаходить тварин заданого виду,
// виводить інформацію про них та підраховує їх кількість.
function printAnimalsBySpecies(animalsList, species) {
    let foundCount = 0;

    console.log(`Тварини виду "${species}":`);

    for (const animal of animalsList) {
        if (animal.species === species) {
            console.log(`${animal.name} — ${animal.ageYears} р.`);
            foundCount++;
        }
    }

    if (foundCount === 0) {
        console.log('Тварин цього виду не знайдено.');
    }

    console.log(`Знайдено тварин: ${foundCount}`);
}

// Виведення тварин за кожним видом
printAnimalsBySpecies(animals, 'кіт');
printAnimalsBySpecies(animals, 'собака');
printAnimalsBySpecies(animals, 'акваріумна рибка');

// Умовна межа віку для класифікації тварин
const adultAgeYears = 2;

// Функція класифікує тварин за віком на молодих і дорослих
// відповідно до встановленої вікової межі.
function classifyAnimalsByAge(animalsList, thresholdYears) {
    console.log('Класифікація тварин за віком:');

    for (const animal of animalsList) {
        let ageCategory;

        if (animal.ageYears < thresholdYears) {
            ageCategory = 'молода';
        } else {
            ageCategory = 'доросла';
        }

        console.log(
            `${animal.name} (${animal.species}, ${animal.ageYears} р.) — ${ageCategory}`
        );
    }
}

// Виклик функції класифікації тварин
classifyAnimalsByAge(animals, adultAgeYears);

// Стрілкова функція переводить вік тварини
// з років у місяці шляхом множення на 12.
const ageInMonths = years => years * 12;

// Виведення віку всіх тварин у місяцях
console.log('Вік тварин у місяцях:');

for (const animal of animals) {
    console.log(
        `${animal.name} — ${ageInMonths(animal.ageYears)} міс.`
    );
}

/*
 * Отримання HTML-форми та реєстрація обробника submit.
 */

// Отримання форми додавання нової тварини
const addAnimalForm = document.querySelector('#add-animal-form');


/* Крок 8. Додаткова клієнтська валідація віку тварини */

// Отримання поля віку та елемента для повідомлення про помилку
const ageInput = document.querySelector('#animal-age');
const ageError = document.querySelector('#animal-age-error');

// Перевірка віку тварини під час введення.
// Відображення власного повідомлення про помилку,
// якщо вік менший за 0 або більший за 50 років.
ageInput.addEventListener('input', () => {
    const ageYears = Number(ageInput.value);
    let errorMessage = '';

    // Перевірка допустимого діапазону віку
    if (ageInput.value !== '' && ageYears < 0) {
        errorMessage = 'Вік тварини не може бути від’ємним';
    } else if (ageInput.value !== '' && ageYears > 50) {
        errorMessage = 'Вік тварини не може перевищувати 50 років';
    }

    // Встановлення власного повідомлення валідації
    ageInput.setCustomValidity(errorMessage);

    // Відображення помилки під полем віку
    ageError.textContent = errorMessage;
});

/* Крок 4. Зчитування значень полів форми */

// Обробка надсилання форми без перезавантаження сторінки
// Створення нового об'єкта, додавання до масиву,
// оновлення каталогу та очищення форми.
addAnimalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Отримання імені тварини
    const name = document.querySelector('#animal-name').value.trim();

    // Отримання виду тварини
    const species = document.querySelector('#new-animal-species').value;

    // Отримання віку та перетворення на число
    const ageYears = Number(
        document.querySelector('#animal-age').value
    );
    // Створення нового об'єкта тварини
    const newAnimal = {
        name: name,
        species: species,
        ageYears: ageYears
    };

// Додавання об'єкта до масиву animals
    animals.push(newAnimal);

// Повернення фільтра до значення "Усі"
    speciesFilter.value = 'all';

// Оновлення каталогу після додавання тварини
    filterAnimalsBySpecies();

    // Перевірка отриманих значень у консолі
    console.log('Ім’я тварини:', name);
    console.log('Вид тварини:', species);
    console.log('Вік тварини:', ageYears);

    console.log('Додано нову тварину:', newAnimal);
    console.log('Оновлений масив тварин:', animals);
    console.log('Кількість тварин:', animals.length);

    // Очищення форми після успішного додавання тварини
    addAnimalForm.reset();
});

/* Крок 9. Фільтрація каталогу за видом тварини */

// Отримання списку вибору виду тварини
const speciesFilter = document.querySelector('#animal-type');

// Функція фільтрації та оновлення каталогу
function filterAnimalsBySpecies() {

    // Відповідність значень select видам у масиві animals
    const speciesMap = {
        cat: 'кіт',
        dog: 'собака',
        fish: 'акваріумна рибка'
    };

    // Отримання вибраного значення
    const selectedValue = speciesFilter.value;

    // Фільтрація масиву за вибраним видом
    const filteredAnimals = selectedValue === 'all'
        ? animals
        : animals.filter(animal =>
            animal.species === speciesMap[selectedValue]
        );

    // Повторне відображення відфільтрованих тварин
    //renderAnimals(filteredAnimals);

    // Оновлення кількості відображених тварин
    petsCount.textContent =
        `Кількість тварин: ${filteredAnimals.length}`;


}

// Обробка події change при виборі виду тварини
speciesFilter.addEventListener('change', filterAnimalsBySpecies);


/* ===================== Практикум 9 ===================== */
/* Клієнт для відомого API (fetch/AJAX)                    */

// URL ендпоінта Dog CEO API (без ключа)
const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';

// Елементи інтерфейсу для роботи з API
const dogList = document.querySelector('#dog-list');
const dogLoading = document.querySelector('#dog-loading');
const dogError = document.querySelector('#dog-error');
const dogRefreshBtn = document.querySelector('#dog-refresh-btn');

// Показ / приховування стану завантаження
function showLoading(isLoading) {
    dogLoading.hidden = !isLoading;
    dogRefreshBtn.disabled = isLoading;
}

// Виведення зрозумілого повідомлення про помилку
function showError(message) {
    dogError.textContent = message;
    dogError.hidden = false;
}

// Приховування повідомлення про помилку
function hideError() {
    dogError.textContent = '';
    dogError.hidden = true;
}

// Отримання назви породи з URL зображення
// (формат: https://images.dog.ceo/breeds/<порода>/<файл>.jpg)
function getBreedFromUrl(imageUrl) {
    const parts = imageUrl.split('/');
    const breedIndex = parts.indexOf('breeds') + 1;
    const breed = parts[breedIndex] || 'невідома порода';

    return breed.split('-').reverse().join(' ');
}

/*
 * loadData() — асинхронне завантаження випадкового фото собаки.
 * Використаний API: Dog CEO — https://dog.ceo/dog-api/
 * Ендпоінт: GET https://dog.ceo/api/breeds/image/random
 * Відповідь: { "message": "<URL зображення>", "status": "success" }
 */
async function loadData() {
    showLoading(true);
    hideError();

    // Очищення попередньої картки на початку нового запиту
    dogList.replaceChildren();

    try {
        // Виконання HTTP-запиту та очікування відповіді
        const response = await fetch(DOG_API_URL);

        // Перевірка HTTP-статусу (fetch не вважає 404/500 помилкою)
        if (!response.ok) {
            throw new Error(`Сервер відповів кодом ${response.status}`);
        }

        // Розбір тіла відповіді як JSON
        const data = await response.json();
        console.log('Відповідь Dog CEO API:', data);

        // Окрема перевірка поля status: API інколи повертає 200
        // з полем status: 'error'
        if (data.status !== 'success') {
            throw new Error(`API повернув status: ${data.status}`);
        }

        // Зіставлення відповіді API з формою об'єкта тварини
        const apiDog = {
            name: getBreedFromUrl(data.message),
            species: 'собака',
            ageYears: null, // вік невідомий: Dog CEO API його не повертає
            image: data.message
        };

        // Повторне використання функції рендеру з практикуму 7
        //renderAnimals([apiDog], dogList);
    } catch (error) {
        // Зрозуміле повідомлення для користувача
        showError('Не вдалося завантажити фото собаки. Перевірте з’єднання та спробуйте пізніше.');
        // Технічні деталі — для розробника
        console.error('Помилка завантаження даних з Dog CEO API:', error);
    } finally {
        // Приховування стану завантаження за будь-якого результату
        showLoading(false);
    }
}

// Повторний запит за натисканням кнопки «Оновити»
dogRefreshBtn.addEventListener('click', loadData);

// Перше завантаження даних під час відкриття сторінки
loadData();

/* ===================== Практикум 11 ===================== */
/* Локальні сховища даних: localStorage / IndexedDB.         */
/* База "PetCatalogDB", версія 1, сховище "pets", keyPath "id". */

// ===== Крок 1. Модель даних =====
// Один запис про тварину:
// {
//   id:       number — унікальний ідентифікатор (keyPath в IndexedDB),
//   name:     string — ім'я тварини,
//   species:  string — вид (кіт / собака / акваріумна рибка ...),
//   photoUrl: string — посилання на фото (URL-рядок або шлях до файлу),
//   notes:    string — довільні нотатки
// }
const DEFAULT_PETS = [
    { id: 1, name: 'Мурчик', species: 'кіт',              photoUrl: 'assets/img/cat.jpeg',  notes: '1 рік, дуже грайливий' },
    { id: 2, name: 'Барсик', species: 'кіт',              photoUrl: 'assets/img/cat.jpeg',  notes: '4 роки, любить спати' },
    { id: 3, name: 'Рекс',   species: 'собака',           photoUrl: 'assets/img/dog.jpeg',  notes: '5 років, охороняє двір' },
    { id: 4, name: 'Луна',   species: 'собака',           photoUrl: 'assets/img/dog.jpeg',  notes: 'пів року, цуценя' },
    { id: 5, name: 'Немо',   species: 'акваріумна рибка', photoUrl: 'assets/img/fish.jpg',  notes: 'риба-клоун' },
    { id: 6, name: 'Голді',  species: 'акваріумна рибка', photoUrl: 'assets/img/fish.jpg',  notes: 'золота рибка' }
];

// Перемикач етапів роботи:
//   false — етап 1 (кроки 2–4): дані зберігаються лише в localStorage;
//   true  — етап 2 (кроки 5–11): основне сховище IndexedDB + міграція.
const USE_INDEXEDDB = true;

// ===== Крок 2. localStorage =====
const LS_KEY = 'petCatalogItems';
const LS_MIGRATED_KEY = 'petCatalogMigrated';

// Записує масив тварин у localStorage.
// localStorage зберігає лише рядки, тому масив перетворюється на JSON.
function saveToLocalStorage(items) {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
}

// Читає масив тварин із localStorage.
// JSON.parse загорнуто в try/catch: пошкоджені дані не «валять» застосунок.
function loadFromLocalStorage() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error('Пошкоджені дані в localStorage:', error);
        return [];
    }
}

// ===== Крок 5. Схема IndexedDB =====
const DB_NAME = 'PetCatalogDB';  // назва бази
const DB_VERSION = 1;            // версія схеми
const STORE_NAME = 'pets';       // object store (аналог таблиці), keyPath: 'id'

// ===== Крок 6. Відкриття бази =====
// Повертає Promise з об'єктом бази. onupgradeneeded викликається лише тоді,
// коли бази ще немає або її версія нижча за DB_VERSION — тільки тут
// створюється object store.
function openDB() {
    return new Promise((resolve, reject) => {
        if (!('indexedDB' in window)) {
            reject(new Error('IndexedDB не підтримується цим браузером'));
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// ===== Крок 7. CRUD-функції =====

// Перетворює реактивний об'єкт Vue (Proxy) на звичайний об'єкт:
// IndexedDB не може зберегти Proxy (виникає DataCloneError).
function toPlainPet(pet) {
    return {
        id: pet.id,
        name: pet.name,
        species: pet.species,
        photoUrl: pet.photoUrl || '',
        notes: pet.notes || ''
    };
}

// CREATE: додає запис. put() створює новий запис
// або перезаписує наявний із тим самим id (add() кинув би помилку).
async function addItem(item) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(toPlainPet(item));
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// UPDATE: оновлює наявний запис — той самий put() з тим самим id.
async function updateItem(item) {
    return addItem(item);
}

// READ: повертає масив усіх тварин (впорядкований за ключем id).
async function getAllItems() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const request = tx.objectStore(STORE_NAME).getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// DELETE: видаляє запис за ключем id.
async function deleteItem(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// ===== Крок 8. Одноразова міграція localStorage → IndexedDB =====
// Якщо store порожній, а в localStorage є дані — переносимо їх через addItem.
// Прапорець petCatalogMigrated=true не дає повторювати міграцію.
async function migrateFromLocalStorage() {
    if (localStorage.getItem(LS_MIGRATED_KEY) === 'true') {
        console.log('Міграція вже виконувалась раніше — пропускаємо.');
        return;
    }

    const dbItems = await getAllItems();
    if (dbItems.length === 0) {
        const lsItems = loadFromLocalStorage();

        if (lsItems.length > 0) {
            for (const item of lsItems) {
                await addItem(item);
            }
            console.log(`Міграція: перенесено ${lsItems.length} записів із localStorage в IndexedDB.`);
        } else {
            // Даних немає ніде (перший запуск) — заповнюємо стартовим масивом
            for (const item of DEFAULT_PETS) {
                await addItem(item);
            }
            console.log('localStorage порожній — IndexedDB заповнено стартовими даними.');
        }
    }

    localStorage.setItem(LS_MIGRATED_KEY, 'true');
}

/* ===================== Практикум 12 ===================== */
/* Анімація на Canvas: «рибки, що плавають» (варіант 12).   */
/* Кожна рибка відповідає запису каталогу з видом «рибка»   */
/* (масив animals з IndexedDB, ПР №11), тому кількість       */
/* рибок змінюється разом із даними застосунку.             */

// Крок 1. Обрано технологію Canvas: кількість рухомих об'єктів
// заздалегідь невідома (залежить від даних), а рух по синусоїді
// потребує перерахунку координат у кожному кадрі.

const MAX_FISH = 30;   // обмеження, щоб анімація не «гальмувала» при великому каталозі

// У акваріумі плавають лише записи, вид яких містить слово «риб»
// («акваріумна рибка», «риба-клоун» тощо); коти й собаки лишаються в каталозі
function isFishRecord(animal) {
    return /риб/i.test(animal.species);
}

// Колір рибки обчислюється з імені (завжди однаковий для однієї рибки)
function colorFromName(name) {
    let hash = 0;
    for (const char of name) {
        hash = (hash * 31 + char.charCodeAt(0)) % 360;
    }
    return `hsl(${hash}, 75%, 60%)`;
}

class Aquarium {
    // Крок 3. Отримання 2D-контексту з <canvas> (розмір задано атрибутами width/height)
    constructor(canvas, onStatusChange) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        this.fishes = [];          // по одній рибці на кожен запис каталогу
        this.bubbles = this.createBubbles(14);
        this.time = 0;             // час анімації в секундах (для синусоїди)
        this.lastTime = 0;
        this.frameId = null;       // id кадру для cancelAnimationFrame

        this.pausedByUser = false; // кнопка «Пауза/Старт»
        this.isVisible = true;     // чи видно canvas на екрані
        this.onStatusChange = onStatusChange;

        this.fps = 0;
        this.fpsFrames = 0;
        this.fpsTime = 0;

        this.frame = this.frame.bind(this);

        // Крок 8. Зупинка анімації, коли акваріум поза екраном
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                this.isVisible = entries[0].isIntersecting;
                this.updateRunning();
            }, { threshold: 0.1 });
            this.observer.observe(canvas);
        }

        // Крок 8. Зупинка анімації, коли вкладка браузера неактивна
        this.onVisibilityChange = () => this.updateRunning();
        document.addEventListener('visibilitychange', this.onVisibilityChange);

        // Крок 7. Взаємодія мишею: клік по рибці «лякає» її
        this.onClick = (event) => this.scareFishAt(event);
        canvas.addEventListener('click', this.onClick);
    }

    // ===== Крок 4. Відображення стану на основі даних каталогу =====
    // Синхронізує рибок із записами каталогу виду «рибка»:
    // новий запис — нова рибка, видалений запис — рибка плавно зникає.
    sync(animalsList) {
        const fishRecords = animalsList.filter(isFishRecord);
        const ids = new Set(fishRecords.map(animal => animal.id));

        // Рибки видалених записів позначаються як такі, що зникають
        for (const fish of this.fishes) {
            if (!ids.has(fish.id)) {
                fish.leaving = true;
            }
        }

        // Для нових записів створюються нові рибки
        const existing = new Set(this.fishes.map(fish => fish.id));
        for (const animal of fishRecords.slice(0, MAX_FISH)) {
            if (!existing.has(animal.id)) {
                this.fishes.push(this.createFish(animal, this.fishes.length));
            }
        }

        console.log(`Акваріум: рибок — ${Math.min(fishRecords.length, MAX_FISH)} (записів-рибок у каталозі: ${fishRecords.length} з ${animalsList.length})`);

        // Якщо анімація на паузі — перемальовуємо один статичний кадр
        if (this.frameId === null) {
            this.draw();
        }
    }

    // Створення рибки з параметрами руху по синусоїді.
    // index рівномірно «розкладає» рибок по акваріуму (крок золотого перетину),
    // щоб вони не злипалися в одному місці.
    createFish(animal, index) {
        const size = 14 + Math.random() * 8;
        const spreadY = (index * 0.618) % 1;
        const spreadX = (index * 0.382 + 0.15) % 1;
        return {
            id: animal.id,
            name: animal.name,
            color: colorFromName(animal.name),
            size: size,
            x: spreadX * this.width,
            baseY: 80 + spreadY * (this.height - 140),        // середня лінія синусоїди (нижче підпису)
            y: 0,
            amplitude: 8 + Math.random() * 18,                 // амплітуда коливань
            frequency: 1 + Math.random() * 1.5,                // частота коливань (рад/с)
            phase: Math.random() * Math.PI * 2,                // початкова фаза
            speed: 30 + Math.random() * 40,                    // швидкість (пікселів/с)
            direction: Math.random() < 0.5 ? -1 : 1,           // напрям руху
            boost: 0,                                          // прискорення після кліку
            scale: 0,                                          // поява «з нуля»
            alpha: 1,
            leaving: false
        };
    }

    createBubbles(count) {
        return Array.from({ length: count }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            r: 1.5 + Math.random() * 3,
            speed: 15 + Math.random() * 25
        }));
    }

    // ===== Крок 5. Цикл анімації через requestAnimationFrame =====
    frame(now) {
        // Час між кадрами в секундах (обмежено, щоб після паузи не було «стрибка»)
        const dt = Math.min((now - this.lastTime) / 1000, 0.05);
        this.lastTime = now;

        this.update(dt);   // 1) оновлення стану
        this.draw();       // 2) clearRect + перемальовування кадру
        this.countFps(dt);

        this.frameId = requestAnimationFrame(this.frame);
    }

    // Оновлення координат: рух по x і синусоїда по y
    update(dt) {
        this.time += dt;

        for (const fish of this.fishes) {
            fish.boost = Math.max(0, fish.boost - dt * 60);
            fish.x += (fish.speed + fish.boost) * fish.direction * dt;
            fish.y = fish.baseY + fish.amplitude * Math.sin(this.time * fish.frequency + fish.phase);

            // Рибка, що виплила за край, з'являється з протилежного боку
            const margin = fish.size * 3;
            if (fish.x > this.width + margin) fish.x = -margin;
            if (fish.x < -margin) fish.x = this.width + margin;

            fish.scale = Math.min(1, fish.scale + dt * 1.5);
            if (fish.leaving) {
                fish.alpha -= dt * 1.5;
            }
        }

        // Повністю зниклі рибки видаляються з масиву
        this.fishes = this.fishes.filter(fish => fish.alpha > 0);

        for (const bubble of this.bubbles) {
            bubble.y -= bubble.speed * dt;
            if (bubble.y < -5) {
                bubble.y = this.height + 5;
                bubble.x = Math.random() * this.width;
            }
        }
    }

    // Малювання одного кадру
    draw() {
        const ctx = this.ctx;

        // clearRect обов'язковий: інакше кадри накладаються один на одного
        ctx.clearRect(0, 0, this.width, this.height);

        // Вода
        const water = ctx.createLinearGradient(0, 0, 0, this.height);
        water.addColorStop(0, '#7fd3f7');
        water.addColorStop(1, '#1f6fa8');
        ctx.fillStyle = water;
        ctx.fillRect(0, 0, this.width, this.height);

        // Пісок на дні
        ctx.fillStyle = '#e8d29a';
        ctx.fillRect(0, this.height - 18, this.width, 18);

        // Бульбашки
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        for (const bubble of this.bubbles) {
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Рибки
        for (const fish of this.fishes) {
            this.drawFish(fish);
        }

        // Підпис стану на самому canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.fillRect(8, 8, 190, 24);
        ctx.fillStyle = '#ffffff';
        ctx.font = '13px system-ui, sans-serif';
        ctx.textAlign = 'left';
        const alive = this.fishes.filter(fish => !fish.leaving).length;
        ctx.fillText(`Рибок: ${alive}   FPS: ${this.frameId === null ? '—' : this.fps}`, 16, 25);

        if (alive === 0) {
            ctx.textAlign = 'center';
            ctx.font = '16px system-ui, sans-serif';
            ctx.fillText('Акваріум порожній — додайте рибку в каталог', this.width / 2, this.height / 2);
        }
    }

    drawFish(fish) {
        const ctx = this.ctx;
        const s = fish.size;

        // Нахил рибки за напрямом руху по синусоїді
        const vy = fish.amplitude * fish.frequency * Math.cos(this.time * fish.frequency + fish.phase);
        const tilt = Math.atan2(vy, fish.speed + fish.boost) * 0.6;

        // save/restore — щоб translate/rotate/scale не впливали на наступні фігури
        ctx.save();
        ctx.globalAlpha = Math.max(0, fish.alpha);
        ctx.translate(fish.x, fish.y);
        ctx.rotate(tilt * fish.direction);
        ctx.scale(fish.direction * fish.scale, fish.scale);

        // Хвіст
        ctx.fillStyle = fish.color;
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.lineTo(-s * 1.6, -s * 0.6);
        ctx.lineTo(-s * 1.6, s * 0.6);
        ctx.closePath();
        ctx.fill();

        // Тіло
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Око
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(s * 0.45, -s * 0.15, s * 0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#222222';
        ctx.beginPath();
        ctx.arc(s * 0.5, -s * 0.15, s * 0.09, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Ім'я рибки над нею (без дзеркального відображення)
        ctx.save();
        ctx.globalAlpha = Math.max(0, fish.alpha) * fish.scale;
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(fish.name, fish.x, fish.y - s - 4);
        ctx.restore();
    }

    countFps(dt) {
        this.fpsFrames++;
        this.fpsTime += dt;
        if (this.fpsTime >= 0.5) {
            this.fps = Math.round(this.fpsFrames / this.fpsTime);
            this.fpsFrames = 0;
            this.fpsTime = 0;
        }
    }

    // Крок 7. Клік по рибці: вона розвертається й пришвидшується
    scareFishAt(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) * (this.width / rect.width);
        const y = (event.clientY - rect.top) * (this.height / rect.height);

        const fish = this.fishes.find(f => Math.hypot(f.x - x, f.y - y) < f.size * 1.5);
        if (fish) {
            fish.direction *= -1;
            fish.boost = 160;
            console.log(`Рибку «${fish.name}» налякано`);
        }
    }

    // ===== Крок 7–8. Керування запуском і зупинкою =====
    setPaused(paused) {
        this.pausedByUser = paused;
        this.updateRunning();
    }

    updateRunning() {
        let reason = '';
        if (this.pausedByUser) reason = 'на паузі';
        else if (document.hidden) reason = 'зупинена (вкладка неактивна)';
        else if (!this.isVisible) reason = 'зупинена (акваріум поза екраном)';

        if (reason === '' && this.frameId === null) {
            this.lastTime = performance.now();
            this.frameId = requestAnimationFrame(this.frame);
            console.log('Анімацію акваріума запущено');
        } else if (reason !== '' && this.frameId !== null) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
            this.draw();
            console.log(`Анімація акваріума: ${reason} — cancelAnimationFrame`);
        }

        if (this.onStatusChange) {
            this.onStatusChange(reason === '' ? 'працює' : reason, this.pausedByUser);
        }
    }

    // Повне завершення: зупинка циклу та зняття обробників
    destroy() {
        if (this.frameId !== null) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
        if (this.observer) this.observer.disconnect();
        document.removeEventListener('visibilitychange', this.onVisibilityChange);
        this.canvas.removeEventListener('click', this.onClick);
    }
}

// Екземпляр акваріума (поза реактивним станом Vue, щоб не обгортати його в Proxy)
let aquarium = null;

/* ===================== Практикум 10–11 ===================== */
/* Vue 3 + збереження даних у localStorage / IndexedDB.          */
/* Функції роботи зі сховищами — у блоці «Практикум 11» вище.  */

// Компонент картки тварини (ПР №10; у ПР №11 додано фото, нотатки й видалення)
const PetCard = {
    props: {
        id:       { type: Number, required: true },
        name:     { type: String, required: true },
        species:  { type: String, required: true },
        photoUrl: { type: String, default: '' },
        notes:    { type: String, default: '' }
    },
    emits: ['delete'],

    data() {
        return {
            isFavorite: false,  // локальний стан картки (ПР №10)
            imgFailed: false    // фото не завантажилось — показуємо заглушку
        };
    },

    methods: {
        toggleFavorite() {
            this.isFavorite = !this.isFavorite;
        }
    },

    template: `
        <article
            class="pet-card"
            @click="toggleFavorite"
            :class="{ 'favorite': isFavorite }"
        >
            <img v-if="photoUrl && !imgFailed" :src="photoUrl" :alt="name"
                 class="pet-photo" @error="imgFailed = true">
            <div v-else class="pet-photo pet-photo-empty">🐾</div>

            <h3>{{ name }}</h3>
            <p>Вид: {{ species }}</p>
            <p v-if="notes">Нотатки: {{ notes }}</p>

            <p v-if="isFavorite">❤️ Обране</p>
            <p v-else>🤍 Натисніть, щоб додати до обраного</p>

            <!-- .stop — щоб клік по кнопці не перемикав «обране» -->
            <button type="button" class="delete-btn" @click.stop="$emit('delete', id)">
                🗑 Видалити
            </button>
        </article>
    `
};

// Кореневий застосунок Vue
const petCatalogApp = Vue.createApp({
    components: { PetCard },

    data() {
        return {
            animals: [],
            form: { name: '', species: '', photoUrl: '', notes: '' },
            formError: '',
            dbError: '',
            storageMode: USE_INDEXEDDB ? 'indexeddb' : 'localStorage',
            loading: true,
            aquariumStatus: 'запуск...',   // ПР №12: стан анімації для користувача
            aquariumPaused: false
        };
    },

    mounted() {
        // ПР №12. Створення акваріума на <canvas ref="aquarium">
        aquarium = new Aquarium(this.$refs.aquarium, (status, paused) => {
            this.aquariumStatus = status;
            this.aquariumPaused = paused;
        });
        aquarium.updateRunning();

        this.init();
    },

    // ПР №12. Крок 6. Анімація реагує на зміну даних: після додавання
    // чи видалення рибки в каталозі кількість рибок оновлюється автоматично
    watch: {
        animals: {
            handler(list) {
                if (aquarium) aquarium.sync(list);
            },
            deep: true
        }
    },

    // ПР №12. Крок 8. Коректне завершення анімації
    beforeUnmount() {
        if (aquarium) aquarium.destroy();
    },

    methods: {
        // ПР №12. Крок 7. Кнопка «Пауза/Старт» для анімації акваріума
        toggleAquarium() {
            aquarium.setPaused(!aquarium.pausedByUser);
        },

        // Запуск застосунку: завантаження даних зі сховища
        async init() {
            // Етап 1 (кроки 2–4): працюємо лише з localStorage
            if (this.storageMode === 'localStorage') {
                const saved = loadFromLocalStorage();
                this.animals = saved.length > 0 ? saved : DEFAULT_PETS.slice();
                saveToLocalStorage(this.animals);
                this.loading = false;
                return;
            }

            // Етап 2: міграція → читання з IndexedDB
            try {
                await migrateFromLocalStorage();
                await this.reloadAnimals();
            } catch (error) {
                // Крок 11. Обробка помилки відкриття бази
                console.error('Помилка IndexedDB:', error);
                this.dbError = 'Не вдалося відкрити базу даних IndexedDB (можливо, увімкнено ' +
                               'режим приватного перегляду). Каталог працює, але зміни тимчасово ' +
                               'зберігаються в localStorage.';
                this.storageMode = 'localStorage';
                const saved = loadFromLocalStorage();
                this.animals = saved.length > 0 ? saved : DEFAULT_PETS.slice();
            } finally {
                this.loading = false;
            }
        },

        // Крок 9. Джерело даних для рендеру списку — результат getAllItems()
        async reloadAnimals() {
            this.animals = await getAllItems();
        },

        // Сценарій варіанта 12: додавання нової тварини з фото (URL-рядок)
        async addPet() {
            if (!this.form.name || !this.form.species) {
                this.formError = "Заповніть поля «Ім'я» та «Вид».";
                return;
            }
            this.formError = '';

            const newPet = {
                id: Date.now(),
                name: this.form.name,
                species: this.form.species,
                photoUrl: this.form.photoUrl,
                notes: this.form.notes
            };

            try {
                if (this.storageMode === 'indexeddb') {
                    await addItem(newPet);
                    await this.reloadAnimals();       // оновлюємо список із бази
                } else {
                    this.animals.push(newPet);
                    saveToLocalStorage(this.animals); // Крок 3. Збереження після додавання
                }
                console.log('Додано тварину:', newPet);
                this.form = { name: '', species: '', photoUrl: '', notes: '' };
            } catch (error) {
                console.error('Помилка збереження:', error);
                this.dbError = 'Не вдалося зберегти тварину. Спробуйте ще раз.';
            }
        },

        // Сценарій варіанта 12: видалення запису про тварину
        async deletePet(id) {
            if (!confirm('Видалити запис про тварину?')) return;

            try {
                if (this.storageMode === 'indexeddb') {
                    await deleteItem(id);
                    await this.reloadAnimals();       // оновлюємо список із бази
                } else {
                    this.animals = this.animals.filter(animal => animal.id !== id);
                    saveToLocalStorage(this.animals); // Крок 3. Збереження після видалення
                }
                console.log('Видалено тварину з id =', id);
            } catch (error) {
                console.error('Помилка видалення:', error);
                this.dbError = 'Не вдалося видалити запис. Спробуйте ще раз.';
            }
        }
    }
});

petCatalogApp.mount("#app");
