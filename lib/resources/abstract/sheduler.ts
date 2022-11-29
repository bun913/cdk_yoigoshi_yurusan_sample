import { Construct } from 'constructs';
import { Role } from 'aws-cdk-lib/aws-iam';
import { CfnSchedule } from 'aws-cdk-lib/aws-scheduler';

export abstract class Scheduler {
  protected construct: Construct;
  protected groupName: string;

  constructor() {}
  public abstract createResources(): void;
  protected abstract createIamRole(): Role;
  protected abstract createScheduler(): CfnSchedule;
}
