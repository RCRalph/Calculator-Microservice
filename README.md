Welcome to the repository. Have a good day.

# Setup
To setup the app, run `npm install`, set the variables inside `.env` and run `npm start`.

## Variables inside `.env`
1. `APP_PORT` - the port at which the app will listen.

# Usage
To use this microservice, send a `GET` request to the home directory of the app and specify parameters:
- input: The string to calculate.

# Example
Call `http://localhost:3000/?input=-252--48--420.125` will output: 
```json
{
	"status": 200,
	"result": 216.125
}
```

# Operators
| Operation | Sign |
| :---: | :---: |
| Addition | -- |
| Subtraction | - |
| Multiplication | * |
| Division | / |
| Exponention | ^ |