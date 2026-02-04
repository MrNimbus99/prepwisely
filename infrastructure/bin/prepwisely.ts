#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PrepWiselyStack } from '../lib/prepwisely-stack';

const app = new cdk.App();

new PrepWiselyStack(app, 'PrepWiselyStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'PrepWisely AWS Certification Prep Platform Infrastructure',
  tags: {
    Project: 'PrepWisely',
    Environment: 'Production',
    Owner: 'PrepWisely Team'
  }
});
