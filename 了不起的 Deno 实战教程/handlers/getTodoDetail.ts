import { Response, RouteParams } from 'https://deno.land/x/oak/mod.ts';
import { getTodo } from '../services/todos.ts';

export default async ({ response, params }: { response: Response, params: RouteParams }) => {
    const todoId = params.id;

    if (!todoId) {
        response.status = 400;
        return response.body = `${{
            msg: 'invalid todo id'
        }}`;
    }
    let foundedTodo = await getTodo(todoId);
    if (!foundedTodo) {
        response.status = 404;
        response.body = {
            msg: `Todo with id ${todoId} not found`
        };
    }
}