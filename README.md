Welcome to the repository. Have a good day.

# Setup
To setup the app, run `npm install`, set the variables inside `.env` and run `npm start`.

## Variables inside `.env`
1. `APP_PORT` - the port at which the app will listen.

# Usage
To use this microservice, send a `GET` request to the home directory of the app and specify parameters:
- input: The string to calculate.

# Example
Call `http://localhost:3000/?input=-252--(48-25)^2*420.125/53` will output: 
```json
{
	"status": 200,
	"result": 3941.323113207547
}
```

**Warning:** Operations like `2(5+3)` aren't allowed. Please use `2*(5+3)` instead.

# Operators
| Operation | Sign |
| :---: | :---: |
| Addition | -- |
| Subtraction | - |
| Multiplication | * |
| Division | / |
| Exponention | ^ |
| Calculate first | () |