const Calculator = require("./Calculator");

module.exports = (app) => {
	app.get("/", (req, res) => {
		if (!req.query.input) {
			return res.json({
				message: "Welcome. Get started by reading the README.md file."
			})
		}

		const calc = new Calculator(req.query.input).getResult();

		if (calc) {
			res.json({
				status: 200,
				result: calc
			});
		}
		else {
			res.json({
				status: 422,
				message: "Invalid input"
			});
		}
	})
}