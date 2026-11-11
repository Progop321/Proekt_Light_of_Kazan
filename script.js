// Начальные настройки (по умолчанию выбрана лампа 60 Вт и 1 час)
let currentPower = 60; 
let currentHours = 1;  
const TARIFF = 6.47; // Официальный тариф Татарстана (город с газовыми плитами)

// Переключение кнопок ламп
function selectBulb(element) {
  document.querySelectorAll('.bulb-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  currentPower = parseFloat(element.getAttribute('data-power'));
  calculate();
}

// Переключение кнопок времени
function selectPeriod(element) {
  document.querySelectorAll('.period-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  currentHours = parseInt(element.getAttribute('data-hours'));
  calculate();
}

// Функция мгновенного подсчета
function calculate() {
  const inputField = document.getElementById('bulb-count');
  if (!inputField) return; // Защита, если поле не нашлось на странице

  const count = parseInt(inputField.value) || 0;

  // Формула: (Ватты * Штуки * Часы) / 1000 = Киловатт-часы
  const totalKwh = (currentPower * count * currentHours) / 1000;
  const totalCost = totalKwh * TARIFF;

  // Вывод в HTML блоки с округлением
  document.getElementById('res-kwh').innerText = totalKwh.toFixed(3);
  document.getElementById('res-cost').innerText = totalCost.toFixed(2);
}

// Автоматический запуск расчета при первой загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
  calculate();
});

/* ============================================================================ */

function toggleCalc() {
  const calc = document.getElementById('energyCalc');
  if (!calc) return;

  // Тогглим класс анимации
  calc.classList.toggle('active');

  // Если калькулятор открылся, обновляем цифры
  if (calc.classList.contains('active')) {
    if (typeof calculate === 'function') calculate();
  }
}



