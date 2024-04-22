function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

function getRandomBool(probability) {
  return Math.random() < probability;
}

export {getRandomArrayElement, getRandomInteger, getRandomBool};
