import { Amplify } from 'aws-amplify'

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-southeast-2_Y7EdgS9Vt',
      userPoolClientId: '745fvfsdutvsmkc1on3o0st0g1',
      identityPoolId: 'ap-southeast-2:f9e6cdb0-2e27-4412-a2ee-3dd6c66a10ab',
    }
  }
}

Amplify.configure(awsConfig)

export default awsConfig
