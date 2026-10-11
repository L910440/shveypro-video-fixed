// Чистая логика расчёта диапазона цены — без DOM, вынесена из calculatePrice()
// в index.html для тестируемости. Поведение не меняется.
function calcPriceRange(basePrice, material, qty) {
  var total = basePrice * material * qty;
  return {
    low: Math.round(total * 0.9 / 100) * 100,
    high: Math.round(total * 1.1 / 100) * 100,
  };
}

function formatNum(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calcPriceRange, formatNum };
}
