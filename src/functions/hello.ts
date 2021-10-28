export const handle = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hi challenge ignite serverless' }),
    headers: { 'Content-Type': 'application/json' },
  };
};