const calculadora = require("../models/calculadora");

test("espero que 1 seja 1", () => {
  expect(calculadora.somar(1, 1)).toBe(2);
});

test("espero que 2*2 seja 4", () => {
  expect(calculadora.multiplicar(2, 2)).toBe(4);
});
