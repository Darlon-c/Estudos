const language = "sdubaobroasuyeobnlbnvyas";
const vogal = ["a", "e", "i", "o", "u"];
let count = 0;

for (let i = 0; i < language.length; i++) {
  if (vogal.includes(language[i])) {
    count++;
  }
}
console.log(count);
