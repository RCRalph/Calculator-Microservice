const expect = require("chai").expect;
const Calculator = require("../controllers/Calculator");

describe("Validator Calculator.calculateResult()", () => {
	it("Should return correct result", () => {
		// Addition
		expect(new Calculator("25--12")
			.getResult()
		).to.equal(37);

		expect(new Calculator("25--12--654.4321")
			.getResult()
		).to.equal(691.4321);
		
		expect(new Calculator("54")
			.getResult()
		).to.equal(54);

		// Subtraction
		expect(new Calculator("-25--12--654.4321")
			.getResult()
		).to.equal(641.4321);

		expect(new Calculator("-25-12-654.4321")
			.getResult()
		).to.equal(-691.4321);

		expect(new Calculator("25-12-654.4321")
			.getResult()
		).to.equal(-641.4321);

		expect(new Calculator("-54")
			.getResult()
		).to.equal(-54);
	});
})