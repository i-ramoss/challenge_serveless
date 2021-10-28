import { v4 as uuidV4 } from 'uuid';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { document } from '../utils/dynamodbClient';

interface ICreateTodo {
  title: string;
  deadline: Date;
}

export const handle: APIGatewayProxyHandler = async event => {
  const { id } = event.pathParameters;

  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  const todo_id = uuidV4();

  await document.put({ 
    TableName: 'users_todos', 
    Item: { id: todo_id, user_id: id, title, done: false, deadline: new Date(deadline) } 
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ 
      message: 'Todo created successfully!',
      todo: { id: todo_id, user_id: id, title, done: false, deadline }
    }),
    headers: { 'Content-Type': 'application/json' }
  }
}