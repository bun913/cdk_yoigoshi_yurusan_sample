import {
  Policy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { CfnSchedule } from 'aws-cdk-lib/aws-scheduler';
import { Construct } from 'constructs';
import { Scheduler } from './abstract/sheduler';

export class RdsScheduler extends Scheduler {
  protected construct: Construct;

  constructor(construct: Construct) {
    super();
    this.construct = construct;
  }

  public createResources(): void {
    const attacheRole = this.createIamRole();
    const scheduler = this.createScheduler(attacheRole.roleArn);
  }
  protected createIamRole() {
    const role = new Role(this.construct, 'RdsDeleteScheduleRole', {
      assumedBy: new ServicePrincipal('scheduler.amazonaws.com'),
    });
    const rdsDeletePolicy = new Policy(
      this.construct,
      'RdsDeleteSchedulePolicy',
      {
        statements: [
          new PolicyStatement({
            actions: ['rds:DeleteDBInstance'],
            resources: ['*'],
          }),
        ],
        roles: [role],
      }
    );
    return role;
  }
  protected createScheduler(roleArn: string) {
    const schedule = new CfnSchedule(
      this.construct,
      'Delete All RDS Instance at night',
      {
        flexibleTimeWindow: {
          mode: 'OFF',
        },
        scheduleExpression: 'cron(* 3 * * ? *)',
        target: {
          arn: 'arn:aws:scheduler:::aws-sdk:rds:deleteDBInstance',
          roleArn: roleArn,
          input: '{ "DbInstanceIdentifier": "*" }',
          retryPolicy: {
            maximumEventAgeInSeconds: 60,
            maximumRetryAttempts: 0,
          },
        },
        description: 'Delete All RDS Instance at night',
        name: 'delete-all-rds-instance-at-midnight',
        scheduleExpressionTimezone: 'Asia/Tokyo',
        state: 'ENABLED',
      }
    );
    return schedule;
  }
}
