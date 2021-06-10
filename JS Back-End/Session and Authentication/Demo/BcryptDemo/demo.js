const bcrypt = require("bcrypt");

const saltRounds = 10;
const myPlaintextPassword = "pass1";
const anotherPlaintextPassword = "pass2";

async function gen() {
  const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
  console.log(hash);
}

async function comp(hash) {
  const check1 = await bcrypt.compare(myPlaintextPassword, hash);
  console.log("Comparing", myPlaintextPassword, "=>", check1);

  const check2 = await bcrypt.compare(anotherPlaintextPassword, hash);
  console.log("Comparing", anotherPlaintextPassword, "=>", check2);
}

gen();

comp("$2b$10$NybsICPh3YBC5qV7xkSzWe/rZ814Rvoo5mdTHNyQKtoVaoXueZ6cm");
