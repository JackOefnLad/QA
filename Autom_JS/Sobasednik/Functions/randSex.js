const randSex = [this.sex, this.sex2, this.sex3];
export function getRandomElement(randSex) {
  return randSex[Math.floor(Math.random() * randSex.length)];
}
const randomSex = getRandomElement(randSex);
console.log(randomSex);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomNumber(0, 2));
