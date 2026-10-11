console.log('script.js підключено');

// Масив об'єктів каталогу домашніх тварин (варіант 12)
const animals = [
    { name: 'Мурчик', species: 'кіт', ageYears: 1 },
    { name: 'Барсик', species: 'кіт', ageYears: 4 },
    { name: 'Рекс', species: 'собака', ageYears: 5 },
    { name: 'Луна', species: 'собака', ageYears: 0.5 },
    { name: 'Немо', species: 'акваріумна рибка', ageYears: 1 },
    { name: 'Голді', species: 'акваріумна рибка', ageYears: 2 }
];

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