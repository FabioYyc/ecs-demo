import { App } from 'aws-cdk-lib';
import { EcsDemoStack } from '../lib/ecs-demo-stack';

const app = new App();

new EcsDemoStack(app, 'EcsDemoStack');

app.synth();