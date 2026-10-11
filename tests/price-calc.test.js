// Тест для чистой функции расчёта диапазона цены калькулятора.
// Запуск: node tests/price-calc.test.js
const assert = require('assert');
const { calcPriceRange, formatNum } = require('../assets/js/price-calc.js');

function run(name, fn) {
  try {
    fn();
    console.log('OK   ' + name);
  } catch (e) {
    console.log('FAIL ' + name + ' — ' + e.message);
    process.exitCode = 1;
  }
}

// Известный пример: basePrice=1000, material=1.0, qty=50 -> total=50000
// low = round(50000*0.9/100)*100 = 45000, high = round(50000*1.1/100)*100 = 55000
run('базовый пример (qty на границе 50)', () => {
  const r = calcPriceRange(1000, 1.0, 50);
  assert.strictEqual(r.low, 45000);
  assert.strictEqual(r.high, 55000);
});

// basePrice=1500, material=1.3, qty=100 -> total=195000
// low = round(195000*0.9/100)*100 = 175500, high = round(195000*1.1/100)*100 = 214500
run('реалистичный пример (material=1.3, qty=100)', () => {
  const r = calcPriceRange(1500, 1.3, 100);
  assert.strictEqual(r.low, 175500);
  assert.strictEqual(r.high, 214500);
});

// Округление: basePrice=333, material=1.0, qty=50 -> total=16650
// low = round(16650*0.9/100)*100 = round(149.85)*100 = 15000
// high = round(16650*1.1/100)*100 = round(183.15)*100 = 18300
run('округление до сотен', () => {
  const r = calcPriceRange(333, 1.0, 50);
  assert.strictEqual(r.low, 15000);
  assert.strictEqual(r.high, 18300);
});

run('formatNum расставляет пробелы по тысячам', () => {
  assert.strictEqual(formatNum(175500), '175 500');
  assert.strictEqual(formatNum(999), '999');
});
