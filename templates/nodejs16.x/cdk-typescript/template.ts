import {
    aws_lambda as lambda,
    Duration,
  } from "aws-cdk-lib";

  const myFunction = new lambda.Function(this, "MyFunction", {
    runtime: lambda.Runtime.NODEJS_16_X,
    timeout: Duration.seconds(3),
    code: lambda.Code.fromAsset("projectName/function"),
    handler: "app.lambdaHandler",
    
  });