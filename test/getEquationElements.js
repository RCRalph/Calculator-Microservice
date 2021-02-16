const expect = require("chai").expect;
const Calculator = require("../controllers/Calculator");

describe("Validator Calculator.getEquationElements()", () => {
	it("Should return proper array", () => {
		expect(new Calculator("25--12")
			.getEquationElements()
			.input
		).to.have.same.members(["25", "+", "12"]);

		expect(new Calculator("25--12--654.4321")
			.getEquationElements()
			.input
		).to.have.same.members(["25", "+", "12", "+", "654.4321"]);

		expect(new Calculator("54")
			.getEquationElements()
			.input
		).to.have.same.members(["54"]);
	});

	it("Should return false for invalid array", () => {
		expect(new Calculator("--25--12")
			.getEquationElements()
			.input)
		.to.be.false;

		expect(new Calculator("--25--12--")
			.getEquationElements()
			.input)
		.to.be.false;

		expect(new Calculator("25--12--")
			.getEquationElements()
			.input)
		.to.be.false;
	});
})