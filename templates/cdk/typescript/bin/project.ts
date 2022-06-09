#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { MyStack } from "../lib/stack";

const app = new cdk.App();

const stackName = "STACK_NAME";
  new MyStack(
    app,
    stackName + "Stack"
  );

