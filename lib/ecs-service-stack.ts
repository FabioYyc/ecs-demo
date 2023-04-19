// ecs-service-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

export interface ECSServiceStackProps extends cdk.StackProps {
  readonly vpc: ec2.IVpc;
}

export class ECSServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ECSServiceStackProps) {
    super(scope, id, props);

    // Create an ECS cluster in the provided VPC
    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: props.vpc,
    });

    // Create the Fargate service using the provided VPC and the simple Node.js app
    // new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
    //   cluster,
    //   cpu: 256,
    //   desiredCount: 1,
    //   taskImageOptions: {
    //     image: ecs.ContainerImage.fromRegistry('your-repo/your-image:latest'),
    //   },
    //   memoryLimitMiB: 512,
    //   publicLoadBalancer: true,
    // });
  }
}
