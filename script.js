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