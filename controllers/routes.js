const Calculator = require("./Calculator");

module.exports = (app) => {
	app.get("/", (req, res) => {
		if (!req.query.input) {
			return res.status(204).json({
				message: "Welcome. Get started by reading the README.md file."
			})
		}

		new Promise((resolve) => {
			resolve(new Calculator(req.query.input).getResult());
		})
			.then(value => {
				if (value !== false) {
					res.status(200).json({
						input: req.query.input,
						result: value
					})
				}
				else {
					res.status(422).json({
						input: req.query.input,
						message: "Invalid input"
					});
				}
			})
			.catch(err => {
				console.error(err);
				res.status(500).json({
					message: "Server error"
				})
			});
	})
}