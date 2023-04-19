// vpc-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface VPCStackProps extends cdk.StackProps {
  readonly vpcName: string;
}

export class VPCStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props: VPCStackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, props.vpcName, {
      maxAzs: 2,
    });

    new cdk.CfnOutput(this, 'VPCId', {
      value: this.vpc.vpcId,
    });
  }
}
