class Calculator {
	numberRegex = /^[\d.]+$/;

	constructor(input) {
		this.input = input;

		if (input.length) {
			this.input = this.input.split("--").join("+");	
		}
	}

	validInputCharacters() {
		const regex = /^[\d.\+\-\*\/\^]+$/;
		return regex.test(this.input);
	}

	getEquationElements() {
		let retArr = [], element = "";
		for (let i = 0; i < this.input.length; i++) {
			const elementRegexTest = this.numberRegex.test(element[element.length - 1]),
				inputRegexTest = this.numberRegex.test(this.input[i]);

			if (i == 0 || elementRegexTest == inputRegexTest) {
				element += this.input[i];
			}
			else {
				retArr.push(element);
				element = this.input[i];
			}
		}
		retArr.push(element);

		for (let i = 1; i < retArr.length; i++) {
			if (retArr[i - 1][retArr[i - 1].length - 1] == "-") {
				retArr[i] = "-" + retArr[i];
				retArr[i - 1] = retArr[i - 1].slice(0, retArr[i - 1].length - 1);
			}
		}

		if (retArr[0] == "") {
			retArr.splice(0, 1)
		}

		this.input = ((/^[\d.-]+$/.test(retArr[0]) && retArr.length % 2) ? retArr : false);
		return this;
	}

	calculateResult() {
		if (isNaN(Number(this.input[0]))) {
			return false;
		}

		// Handle exponention
		for (let i = 2; i < this.input.length; i += 2) {
			const temp = Number(this.input[i]);

			if (isNaN(temp)) {
				return false;
			}

			if (this.input[i - 1] == "^") {
				this.input[i - 2] = Math.pow(Number(this.input[i - 2]), temp);
				this.input.splice(i - 1, 2);
				i -= 2;
			}
		}

		// Handle multiplication and division
		for (let i = 2; i < this.input.length; i += 2) {
			const temp = Number(this.input[i]);

			if (isNaN(temp)) {
				return false;
			}

			switch (this.input[i - 1]) {
				case "*":
					this.input[i - 2] *= temp;
					this.input.splice(i - 1, 2);
					i -= 2;
					break;
				case "/":
					this.input[i - 2] /= temp;
					this.input.splice(i - 1, 2);
					i -= 2;
					break;					
			}
		}

		let result = Number(this.input[0]);
		if (isNaN(result)) {
			return false;
		}

		// Handle addition and subtraction
		for (let i = 2; i < this.input.length; i += 2) {
			const temp = Number(this.input[i]);

			if (isNaN(temp)) {
				return false;
			}

			switch (this.input[i - 1]) {
				case "+":
				case "":
					result += temp;
					break;
				case "-":
					result -= temp;
					break;
				default:
					return false;
			}
		}

		return result;
	}

	getResult() {
		if (!this.validInputCharacters() || !this.getEquationElements()) {
			return false;
		}

		return this.calculateResult();
	}
}

module.exports = Calculator;