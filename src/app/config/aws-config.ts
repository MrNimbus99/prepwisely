import { Amplify } from 'aws-amplify'

const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-southeast-2_ofPiN6QA7',
      userPoolClientId: 'nn0nnmqdu0vq0tfp2sru24gcn',
      identityPoolId: 'ap-southeast-2:1163d1ca-8c87-495a-9f12-9b606e0516e0',
    }
  }
}

Amplify.configure(awsConfig)

export default awsConfig
