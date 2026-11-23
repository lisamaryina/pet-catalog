/*
 * Практична робота №14. Node.js: клієнт-серверна взаємодія, найпростіший сервер.
 * Варіант 12 — Каталог домашніх тварин/акваріумних риб.
 *
 * Крок 3. Обрано вбудований модуль http: сервер не має жодних зовнішніх
 * залежностей (npm install не потрібен), а розбір шляху для трьох ендпоінтів
 * і роздачу статики легко написати вручну.
 *
 * Сервер одночасно:
 *   - віддає JSON-дані каталогу:
 *       GET /api/pets         — увесь каталог тварин;
 *       GET /api/pets/random  — випадкова тварина (заміна Dog CEO random image з ПР №9);
 *       GET /api/pets/:id     — одна тварина за id або 404;
 *   - роздає статичні файли клієнтської частини (index.html, css/, js/, assets/)
 *     з кореня проєкту.
 * Сайт і API працюють на одному порту (один origin), тому CORS не потрібен.
 *
 * Запуск: cd server → npm start → http://localhost:3000
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Корінь проєкту pet-catalog (на рівень вище за теку server/)
const ROOT_DIR = path.join(__dirname, '..');
const SERVER_DIR = __dirname;

// Крок 4. Локальні дані каталогу — 8 записів у формі ПР №6/11
// (id, name, species, photoUrl, notes)
const pets = require('./data/pets.json');

// Типи файлів для заголовка Content-Type під час роздачі статики
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Відповідь у форматі JSON з правильним Content-Type і статус-кодом
function sendJson(res, statusCode, data) {
    // ПР №15: nosniff забороняє браузеру «вгадувати» тип і виконувати JSON як HTML/скрипт
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff'
    });
    res.end(JSON.stringify(data));
}

// ===== Кроки 5, 6, 10. Обробка запитів до API =====
function handleApi(req, res, pathname) {
    // Сервер лише віддає дані, тому інші методи не підтримуються
    if (req.method !== 'GET') {
        sendJson(res, 405, { error: `Метод ${req.method} не підтримується` });
        return;
    }

    // Крок 5. GET /api/pets — увесь каталог
    if (pathname === '/api/pets') {
        sendJson(res, 200, pets);
        return;
    }

    // Крок 6. GET /api/pets/random — випадкова тварина зі списку (варіант 12).
    // Перевіряється раніше за /api/pets/:id, щоб «random» не сприймався як id.
    if (pathname === '/api/pets/random') {
        const randomIndex = Math.floor(Math.random() * pets.length);
        sendJson(res, 200, pets[randomIndex]);
        return;
    }

    // GET /api/pets/:id — одна тварина за id або 404
    const match = pathname.match(/^\/api\/pets\/(\d+)$/);
    if (match) {
        const pet = pets.find(item => item.id === Number(match[1]));
        if (!pet) {
            sendJson(res, 404, { error: `Тварину з id ${match[1]} не знайдено` });
            return;
        }
        sendJson(res, 200, pet);
        return;
    }

    // Крок 10. Неіснуючий ендпоінт — 404 з JSON-повідомленням, а не порожня відповідь
    sendJson(res, 404, { error: 'Ендпоінт не знайдено', path: pathname });
}

// ===== Крок 7. Роздача статичних файлів клієнтської частини =====
function serveStatic(req, res, pathname) {
    let relativePath;
    try {
        relativePath = decodeURIComponent(pathname);
    } catch {
        sendJson(res, 400, { error: 'Некоректна адреса' });
        return;
    }
    if (relativePath === '/') relativePath = '/index.html';

    const filePath = path.normalize(path.join(ROOT_DIR, relativePath));

    // Безпека: віддаємо лише файли всередині проєкту, без прихованих тек
    // (.git, .idea) і без коду самого сервера
    const isOutsideRoot = !filePath.startsWith(ROOT_DIR + path.sep);
    const isHidden = relativePath.split('/').some(part => part.startsWith('.'));
    const isServerCode = filePath.startsWith(SERVER_DIR + path.sep);
    if (isOutsideRoot || isHidden || isServerCode) {
        sendJson(res, 404, { error: 'Файл не знайдено', path: pathname });
        return;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            sendJson(res, 404, { error: 'Файл не знайдено', path: pathname });
            return;
        }
        const type = MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff' });
        res.end(content);
    });
}

// Обробник кожного HTTP-запиту
const server = http.createServer((req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    // Журнал запитів у терміналі: метод, адреса і статус відповіді
    res.on('finish', () => {
        console.log(`${req.method} ${req.url} → ${res.statusCode}`);
    });

    if (pathname === '/api' || pathname.startsWith('/api/')) {
        handleApi(req, res, pathname);
    } else {
        serveStatic(req, res, pathname);
    }
});

// Крок 8. Запуск сервера
server.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/pets`);
});
