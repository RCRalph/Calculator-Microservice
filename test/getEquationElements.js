const expect = require("chai").expect;
const Calculator = require("../controllers/Calculator");

describe("Validator Calculator.getEquationElements()", () => {
	it("Should return proper array", () => {
		// Addition
		expect(new Calculator("25--12")
			.getEquationElements()
			.input
		).to.eql(["25", "+", "12"]);

		expect(new Calculator("25--12--654.4321")
			.getEquationElements()
			.input
		).to.eql(["25", "+", "12", "+", "654.4321"]);

		expect(new Calculator("54")
			.getEquationElements()
			.input
		).to.eql(["54"]);

		// Subtraction
		expect(new Calculator("25-12")
			.getEquationElements()
			.input
		).to.eql(["25", "" , "-12"]);

		expect(new Calculator("25---12")
			.getEquationElements()
			.input
		).to.eql(["25", "+", "-12"])

		expect(new Calculator("-25-12--654.4321")
			.getEquationElements()
			.input
		).to.eql(["-25", "", "-12", "+", "654.4321"]);

		// Multiplication
		expect(new Calculator("25*12")
			.getEquationElements()
			.input
		).to.eql(["25", "*" , "12"]);

		expect(new Calculator("25*-12")
			.getEquationElements()
			.input
		).to.eql(["25", "*", "-12"])

		expect(new Calculator("-25*12--654.4321")
			.getEquationElements()
			.input
		).to.eql(["-25", "*", "12", "+", "654.4321"]);

		// Division
		expect(new Calculator("25/12")
			.getEquationElements()
			.input
		).to.eql(["25", "/" , "12"]);

		expect(new Calculator("25/-12")
			.getEquationElements()
			.input
		).to.eql(["25", "/", "-12"])

		expect(new Calculator("-25/12*-654.4321")
			.getEquationElements()
			.input
		).to.eql(["-25", "/", "12", "*", "-654.4321"]);

		// Exponention
		expect(new Calculator("25^12")
			.getEquationElements()
			.input
		).to.eql(["25", "^" , "12"]);

		expect(new Calculator("25^-12")
			.getEquationElements()
			.input
		).to.eql(["25", "^", "-12"])

		expect(new Calculator("-25/12^-654.4321")
			.getEquationElements()
			.input
		).to.eql(["-25", "/", "12", "^", "-654.4321"]);

		// Bracets
		expect(new Calculator("(-25/12)^-654.4321")
			.getEquationElements()
			.input
		).to.eql([["-25", "/", "12"], "^", "-654.4321"]);

		// Mixed
		expect(new Calculator("-252--(48-25)^2*420.125/53")
			.getEquationElements()
			.input
		).to.eql(["-252", "+", ["48", "", "-25"], "^", "2", "*", "420.125", "/", "53"])

		expect(new Calculator("(123--456)/(44.1234-4)")
			.getEquationElements()
			.input
		).to.eql([["123", "+", "456"], "/", ["44.1234", "", "-4"]]);
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