export type GraphQLAuthMode = 'API_KEY' | 'AWS_IAM' | 'AMAZON_COGNITO_USER_POOLS' | 'OPENID_CONNECT';

declare module 'aws-exports' {
  const awsmobile: {
    API: {
      GraphQL: {
        endpoint: string;
        region: string;
        defaultAuthMode: GraphQLAuthMode;
        apiKey: string;
      };
    };
  };
  export default awsmobile;
}
