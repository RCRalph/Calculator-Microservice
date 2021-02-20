class Calculator {
	numberRegex = /^[\d.]+$/;

	constructor(input) {
		this.input = input;

		if (input.length) {
			this.input = this.input.split("--").join("+");	
		}
	}

	validInputCharacters() {
		let bracketCount = [0, 0];
		for (let i = 0; i < this.input.length; i++) {
			if (this.input[i] == "(") {
				bracketCount[0]++;
			}
			else if (this.input[i] == ")") {
				bracketCount[1]++;
			}

			if (bracketCount[1] > bracketCount[0]) {
				return false;
			}
		}

		const regex = /^[\d.\+\-\*\/\^\(\)]+$/;
		return regex.test(this.input) && bracketCount[0] == bracketCount[1];
	}

	getEquationElements(start = 0, end = this.input.length) {
		let retArr = [], element = "";
		for (let i = start; i < end; i++) {
			const elementRegexTest = this.numberRegex.test(element[element.length - 1]),
				inputRegexTest = this.numberRegex.test(this.input[i]);

			if (this.input[i] == "(") {
				if (element.length) {
					retArr.push(element);
					element = "";
				}

				let endBracketIndex = i + 1,
					bracketCount = 1;
				while (endBracketIndex < end && this.input[endBracketIndex] != ")" && bracketCount != 0) {
					if (this.input[endBracketIndex] == "(") {
						bracketCount++;
					}
					else if (this.input[endBracketIndex] == ")") {
						bracketCount--;
					}

					endBracketIndex++;
				}

				retArr.push(this.getEquationElements(i + 1, endBracketIndex));
				i = endBracketIndex;
			}
			else if (i == 0 || elementRegexTest == inputRegexTest) {
				element += this.input[i];
			}
			else {
				retArr.push(element);
				element = this.input[i];
			}
		}

		if (element.length) {
			retArr.push(element);
		}

		for (let i = 1; i < retArr.length; i++) {
			const previousElement = retArr[i - 1];
			if (previousElement[previousElement.length - 1] == "-") {
				retArr[i] = "-" + retArr[i];
				retArr[i - 1] = previousElement.slice(0, previousElement.length - 1);
			}
		}

		if (retArr[0] === "") {
			retArr.splice(0, 1)
		}

		if (start == 0 && end == this.input.length) {
			this.input = (
				retArr.length % 2 &&
				(
					typeof retArr[0] == "object" ||
					typeof retArr[0] == "string" &&
					/^[\d.-]+$/.test(retArr[0])
				)
			) ? retArr : false;
			return this;
		}

		return retArr;		
	}

	calculateResult(arr = this.input) {
		for (let i = 0; i < arr.length; i++) {
			if (typeof arr[i] == "object") {
				arr[i] = this.calculateResult(arr[i]);
			}
		}

		if (isNaN(Number(arr[0]))) {
			return false;
		}

		// Handle exponention
		for (let i = 2; i < arr.length; i += 2) {
			const temp = Number(arr[i]);

			if (isNaN(temp)) {
				return false;
			}

			if (arr[i - 1] == "^") {
				arr[i - 2] = Math.pow(Number(arr[i - 2]), temp);
				arr.splice(i - 1, 2);
				i -= 2;
			}
		}

		// Handle multiplication and division
		for (let i = 2; i < arr.length; i += 2) {
			const temp = Number(arr[i]);

			if (isNaN(temp)) {
				return false;
			}

			switch (arr[i - 1]) {
				case "*":
					arr[i - 2] *= temp;
					arr.splice(i - 1, 2);
					i -= 2;
					break;
				case "/":
					arr[i - 2] /= temp;
					arr.splice(i - 1, 2);
					i -= 2;
					break;					
			}
		}

		let result = Number(arr[0]);
		if (isNaN(result)) {
			return false;
		}

		// Handle addition and subtraction
		for (let i = 2; i < arr.length; i += 2) {
			const temp = Number(arr[i]);

			if (isNaN(temp)) {
				return false;
			}

			switch (arr[i - 1]) {
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