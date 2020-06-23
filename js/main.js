'use strict';
var TOTAL_OFFERS = 8;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
var map__pins = document.querySelector('.map__pins');
var map_card_popup = document.querySelector('.map__card popup')
var map = document.querySelector('.map');

// функция получения массива случайных неповторяющихся значений на основе массива донора
function arrayFrom(target, length) {
  var result = [];
  var max = Math.min(target.length, length);
  for (var i = 0; i < max; i++) {
    var index = randomInteger(i, max - 1);
    var tmp = target[index];
    target[index] = target[i];
    target[i] = tmp;
    result.push(tmp);
  }
  return result;
}

// функция для определения случайных координат
function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.round(rand);
}
//функция создания объекта
function createOfferObject (i) {
  var coords = {
    y: randomInteger(130, 630),
    x: randomInteger(0, 1200)
  };
  var offerFeatures =arrayFrom(FEATURES)
  var offer = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: 'заголовок предложения',
      address: coords.x + ' , ' + coords.y,
      price: randomInteger(0, 50000),
      type: arrayFrom(TYPE),
      rooms: randomInteger(1, 5),
      guests: randomInteger(1, 5),
      checkin: arrayFrom(TIME),
      checkout: arrayFrom(TIME),
      features: arrayFrom(FEATURES),
      photos: arrayFrom(PHOTOS),
    },
    location: coords
  };
  return offer;
};

function getArr () {
  var addArr = [];
  for (var j = 0; j < TOTAL_OFFERS; j++) {
  addArr[j] = createOfferObject(j);
 };
 return addArr;
};

/*На основе данных, созданных в первом пункте, создайте DOM-элементы,
соответствующие меткам на карте, и заполните их данными из массива.
Итоговую разметку метки .map__pin можно взять из шаблона #pin.*/
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin')
function createPin(data) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = data.location.x + 'px';
  pinElement.style.top = data.location.y + 'px';
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;

  return pinElement;
};



/*Отрисуйте сгенерированные DOM-элементы в блок .map__pins.
 Для вставки элементов используйте DocumentFragment.
*/
 function renderPins () {
  var fragment = document.createDocumentFragment();
  getArr().forEach(function (el) {
    fragment.appendChild(createPin(el));
  });
  map__pins.appendChild(fragment);
}
renderPins()

function init() {
  renderPins();
  map.classList.remove('.map--faded');
}
init();

