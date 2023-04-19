import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import { VPCStack } from "./vpc-stack";
import { ECSServiceStack } from "./ecs-service-stack";

export class EcsDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC Stack
    const vpcStack = new VPCStack(this, 'VPCStack', {
        vpcName: 'ecs-demo-vpc',
      });

    // ECS Service Stack
    new ECSServiceStack(this, "MyECSServiceStack", {
      vpc: vpcStack.vpc,
    });
  }
}
