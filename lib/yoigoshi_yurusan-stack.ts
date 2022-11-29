import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RdsScheduler } from './resources/rds_delete_scheduler';

export class YoigoshiYurusanStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const rdsScheduler = new RdsScheduler(this);
    rdsScheduler.createResources();
  }
}
