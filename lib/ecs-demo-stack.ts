import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import { VpcConstruct } from "./vpc";
import { ECSServiceConstruct } from "./ecs-service";

export class EcsDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC Stack
    const vpcConstruct = new VpcConstruct(this, 'MyVPCConstruct');

    // ECS Service Construct
    const ecsServiceConstruct = new ECSServiceConstruct(this, 'MyECSServiceConstruct', {
      vpc: vpcConstruct.vpc,
    });
  }
}
