const Calculator = require("./Calculator");

module.exports = (app) => {
	app.get("/", (req, res) => {
		if (!req.query.input) {
			return res.json({
				status: 204,
				message: "Welcome. Get started by reading the README.md file."
			})
		}

		new Promise((resolve) => {
			resolve(new Calculator(req.query.input).getResult());
		})
			.then(value => {
				if (value !== false) {
					res.json({
						status: 200,
						input: req.query.input,
						result: value
					})
				}
				else {
					res.json({
						status: 422,
						input: req.query.input,
						message: "Invalid input"
					});
				}
			})
			.catch(err => {
				console.error(err);
				res.json({
					status: 500,
					message: "Server error"
				})
			});
	})
}