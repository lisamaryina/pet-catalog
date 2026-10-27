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
function renderAnimals(animalsList) {
    listContainer.replaceChildren();
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
        image.src = animalImages[animal.species];
        image.alt = `Фото тварини ${animal.name} (${animal.species})`;

        // Додавання атрибута data-species
        card.dataset.species = animal.species;

        // Додавання умовного класу залежно від віку
        if (animal.ageYears < 2) {
            card.classList.add('young');
        } else {
            card.classList.add('adult');
        }


        // Формування структури картки
        card.append(title, image, species);

        // Додавання створеної картки до HTML-контейнера
        listContainer.append(card);
    });
}
// Автоматичне відображення всіх тварин під час завантаження сторінки
renderAnimals(animals);

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
    renderAnimals(filteredAnimals);

    // Оновлення кількості відображених тварин
    petsCount.textContent =
        `Кількість тварин: ${filteredAnimals.length}`;


}

// Обробка події change при виборі виду тварини
speciesFilter.addEventListener('change', filterAnimalsBySpecies);



