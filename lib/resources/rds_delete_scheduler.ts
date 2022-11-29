import { Role } from 'aws-cdk-lib/aws-iam';
import { CfnSchedule } from 'aws-cdk-lib/aws-scheduler';
import { Construct } from 'constructs';
import { Scheduler } from './abstract/sheduler';

export class RdsScheduler extends Scheduler {
  protected construct: Construct;
  protected groupName: string;

  constructor(construct: Construct, groupName: string) {
    super();
    this.construct = construct;
    this.groupName = groupName;
  }

  public createResources(): void {}
  protected createIamRole() {
    return new Role(this.construct, 'hoge', {});
  }
  protected createScheduler() {
    return new CfnSchedule(this.construct, 'hoge', {});
  }
}
