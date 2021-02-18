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

		// Multiplication
		expect(new Calculator("-25*12*654.4321")
			.getResult()
		).to.equal(-196329.63);

		expect(new Calculator("25*12")
			.getResult()
		).to.equal(300);

		expect(new Calculator("25*-12")
			.getResult()
		).to.equal(-300);

		// Division
		expect(new Calculator("-25/5")
			.getResult()
		).to.equal(-5);

		expect(new Calculator("25*5/5")
			.getResult()
		).to.equal(25);

		expect(new Calculator("25/-12.5")
			.getResult()
		).to.equal(-2);

		// Exponention
		expect(new Calculator("-25^5")
			.getResult()
		).to.equal(Math.pow(-25, 5));

		expect(new Calculator("25^5/25")
			.getResult()
		).to.equal(Math.pow(25, 5) / 25);

		expect(new Calculator("25/5^2")
			.getResult()
		).to.equal(1);

		expect(new Calculator("25^-12.5")
			.getResult()
		).to.equal(Math.pow(25, -12.5));

		// Brackets
		expect(new Calculator("(-25/12)^45")
			.getResult()
		).to.equal(Math.pow(-25 / 12, 45));

		// Mixed
		expect(new Calculator("2--2*2")
			.getResult()
		).to.equal(6);

		expect(new Calculator("25^0-1")
			.getResult()
		).to.equal(0);

		expect(new Calculator("-252--(48-25)^2*420.125/53")
			.getResult()
		).to.equal(-252 + (Math.pow(48-25, 2) * 420.125 / 53))
	});
})