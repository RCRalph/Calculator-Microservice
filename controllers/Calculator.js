class Calculator {
	numberRegex = /^[\d.]+$/;

	constructor(input) {
		this.input = input;

		if (input.length) {
			this.input = this.input.split("--").join("+");	
		}
	}

	validInputCharacters() {
		const regex = /^[\d+.]+$/;
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
		this.input = ((this.numberRegex.test(retArr[0]) && retArr.length % 2) ? retArr : false);
		return this;
	}

	calculateResult(arr = this.input) {
		let result = Number(arr[0]);

		if (isNaN(result)) {
			return false;
		}

		for (let i = 2; i < arr.length; i += 2) {
			const temp = Number(arr[i]);

			if (isNaN(temp)) {
				return false;
			}

			if (arr[i - 1] == "+") {
				result += temp;
			}
		}

		return result;
	}

	getResult() {
		if (!this.validInputCharacters()) {
			return false;
		}

		if (!this.getEquationElements()) {
			return false;
		}

		return this.calculateResult();
	}
}

module.exports = Calculator;