import { Duration, StackProps,
  aws_logs as logs,
  aws_lambda as lambda,
  RemovalPolicy,
  Stack,
  CfnOutput} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const myFunction = new lambda.Function(this, "MyFunction", {
      runtime: MY_RUNTIME,
      memorySize: 128,
      functionName : 'MY_FUNCTION_NAME',
      timeout: Duration.seconds(30),
      code: lambda.Code.fromAsset("function"),
      handler: "index.handler",
    });


    new logs.LogGroup(
      this,
      "MyFunctionLogs",
      {
        logGroupName: "/aws/lambda/" + myFunction.functionName,
        removalPolicy: RemovalPolicy.DESTROY,
        retention: logs.RetentionDays.ONE_MONTH,
      }
    );

    new CfnOutput(this, "FunctionName", {
      value : myFunction.functionName,
      description : 'Function name'
    });

  }
}
