import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

export interface ECSServiceConstructProps {
  vpc: ec2.Vpc;
}

export class ECSServiceConstruct extends Construct {
  constructor(scope: Construct, id: string, props: ECSServiceConstructProps) {
    super(scope, id);

    // ECS Cluster
    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc: props.vpc,
    });

    // Task Definition with yeasy/simple-web image
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'SimpleWebTaskDefinition', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    const container = taskDefinition.addContainer('simple-web', {
      image: ecs.ContainerImage.fromRegistry('yeasy/simple-web'),
      logging: new ecs.AwsLogDriver({
        streamPrefix: 'SimpleWebContainer',
      }),
    });

    // Expose port 80 on the container
    container.addPortMappings({
      containerPort: 80,
    });

    // Create a Fargate service using the task definition
    const fargateService = new ecs.FargateService(this, 'SimpleWebService', {
      cluster,
      taskDefinition,
      desiredCount: 1,
    });

    // Create an Application Load Balancer
    const alb = new elbv2.ApplicationLoadBalancer(this, 'MyALB', {
      vpc: props.vpc,
      internetFacing: true,
    });

    // Add a listener to the load balancer
    const listener = alb.addListener('MyListener', {
      port: 80,
      open: true,
    });

    // Add the Fargate service as a target of the listener
    listener.addTargets('FargateServiceTarget', {
      port: 80,
      targets: [fargateService],
    });

    // Output the load balancer's DNS name
    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: alb.loadBalancerDnsName,
    });
  }
}