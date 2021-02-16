const expect = require("chai").expect;
const Calculator = require("../controllers/Calculator");

describe("Validator Calculator.calculateResult()", () => {
	it("Should return correct result", () => {
		expect(new Calculator("25--12")
			.getEquationElements()
			.calculateResult()
		).to.equal(37);

		expect(new Calculator("25--12--654.4321")
			.getEquationElements()
			.calculateResult()
		).to.equal(691.4321);
		
		expect(new Calculator("54")
			.getEquationElements()
			.calculateResult()
		).to.equal(54);
	});
})