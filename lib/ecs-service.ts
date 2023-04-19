import { Construct } from "constructs";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export interface ECSServiceConstructProps {
  vpc: ec2.Vpc;
}

export class ECSServiceConstruct extends Construct {
  constructor(scope: Construct, id: string, props: ECSServiceConstructProps) {
    super(scope, id);

    // ECS Cluster
    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: props.vpc,
    });

    // Task Definition with nginx image
    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      "NginxTaskDefinition",
      {
        memoryLimitMiB: 512,
        cpu: 256,
      }
    );

    const container = taskDefinition.addContainer("nginx", {
      image: ecs.ContainerImage.fromRegistry("stacksimplify/nginxapp1:latest"),
      logging: new ecs.AwsLogDriver({
        streamPrefix: "NginxContainer",
      }),
    });

    // Expose port 80 on the container
    container.addPortMappings({
      containerPort: 80,
    });

    const securityGroup = new ec2.SecurityGroup(this, 'NginxServiceSecurityGroup', {
      vpc: props.vpc,
      allowAllOutbound: true,
    });

    // Allow incoming traffic to the Nginx container on port 80
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow incoming HTTP traffic');


    // Create a Fargate service using the task definition
    const fargateService = new ecs.FargateService(this, "NginxService", {
      cluster,
      taskDefinition,
      desiredCount: 2,
      assignPublicIp: true,
      securityGroups: [securityGroup],
    });
  }
}
