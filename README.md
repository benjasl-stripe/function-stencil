# Welcome to function-stencil 👋
> A quickstart AWS Lambda function code generator. Downloads a template function code file, test harness file, sample SAM definition and appropriate file structure.

## Install

```sh
npm install function-stencil
```

## Usage

```sh
function-stencil init
```

### 1. Choose the function runtime
```sh
? What runtime do you need? (Use arrow keys)
❯ nodejs14.x 
  nodejs12.x 
```

### 2. Provide a function name
```sh
Whats the function name? MyFunctionName
```
### 3. Function code and file system is generated

```sh
MyFunctionName
 ┗ function
 ┃ ┣ events
 ┃ ┃ ┗ event.json
 ┃ ┣ app.js
 ┃ ┣ env.json
 ┃ ┣ harness.js
 ┃ ┗ package.json
```
### 4. AWS SAM snippet is generated, drop this into the resource block of your SAM template.yaml
```yaml    
  MyFunctionName:
    Type: AWS::Serverless::Function 
    Properties:
      CodeUri: MyFunctionName/function/
      Handler: app.lambdaHandler
      Runtime: nodejs14.x
      Timeout: 3 
````


## Testing

Test your function locally by running  `harness.js` from the *function* directory:

```sh
> node harness.js
{ statusCode: 200, body: '{"message":"hello world"}' }
localTest: 7.998ms
```

## Author

👤 **Benjamin Smith**

* Website: [https://github.com/bls20AWS/function-stencil](https://github.com/bls20AWS/function-stencil)
* Twitter: [@benjamin\_l\_S](https://twitter.com/benjamin\_l\_S)
* Github: [@bls20AWS](https://github.com/bls20AWS)

## Show your support

Give a ⭐️ if this project helped you!
