// Объект хранения состояния игры
let gameState = {
    score: 0,
    upgrades: []
};

const UPGRADES = [
    { name: 'Автоклик', cost: 10 },
    { name: 'Двойной клик', cost: 20 }
];

// Обновление счёта игрока
function updateScore() {
    document.getElementById('scoreDisplay').innerText = `Счёт: ${gameState.score}`;
}

// Функция обработки клика
document.getElementById('clickButton').addEventListener('click', () => {
    gameState.score++;
    updateScore();
});

// Создание списка улучшений
UPGRADES.forEach((upgrade, idx) => {
    const li = document.createElement('li');
    li.className = 'upgrade-item';
    li.innerHTML = `${upgrade.name}: Стоимость - ${upgrade.cost}`;
    li.addEventListener('click', () => buyUpgrade(idx));
    document.getElementById('upgradesList').appendChild(li);
});

// Покупка улучшения
function buyUpgrade(index) {
    if (gameState.score >= UPGRADES[index].cost) {
        gameState.score -= UPGRADES[index].cost;
        gameState.upgrades.push(UPGRADES[index]);
        console.log(`Куплено улучшение: ${UPGRADES[index].name}`);
        updateScore();
    } else {
        alert("Недостаточно очков!");
    }
}

// Сохраняем состояние игры локально
function saveProgress() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
    alert("Прогресс успешно сохранён");
}

// Загружаем сохранённое состояние игры
function loadProgress() {
    const savedData = localStorage.getItem('gameState');
    if (savedData) {
        gameState = JSON.parse(savedData);
        updateScore(); // Обновляем счётчик
        alert("Прогресс загружен");
    } else {
        alert("Нет сохранённого прогресса");
    }
}

// Автоматический старт загрузки прогресса при открытии
window.onload = function() {
    loadProgress();
};