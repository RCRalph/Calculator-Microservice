const expect = require("chai").expect;
const Calculator = require("../controllers/Calculator");

describe("Validator Calculator.validInputCharacters()", () => {
	it("Should return false for empty input", () => {
		expect(new Calculator("").validInputCharacters()).to.be.false;
	});

	it("Should return true for valid string", () => {
		expect(new Calculator("0123456789.--").validInputCharacters()).to.be.true;
		expect(new Calculator("25--12").validInputCharacters()).to.be.true;
		expect(new Calculator("5--2").validInputCharacters()).to.be.true;
		expect(new Calculator("532--2--425--21321--44").validInputCharacters()).to.be.true;
	});

	it("Should return false for invalid string", () => {
		expect(new Calculator("543--k2--321").validInputCharacters()).to.be.false;
		expect(new Calculator("x--2").validInputCharacters()).to.be.false;
		expect(new Calculator("5--2x").validInputCharacters()).to.be.false;
		expect(new Calculator("5--#--4").validInputCharacters()).to.be.false;
	});
})