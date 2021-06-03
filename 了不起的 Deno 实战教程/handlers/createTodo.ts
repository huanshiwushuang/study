import { Request, Response  } from 'https://deno.land/x/oak/mod.ts';
import { createTodo } from '../services/todos.ts';

export default async ({ request: req, response: res }: { request: Request, response: Response }) => {
    if (!req.hasBody) {
        response.status = 400;
        return response.body = {
            msg: 'Invalid todo data'
        }
    }

    const {
        value: {
            userId,
            title,
            completed = false,
        }
    } = req.body();

    if (!userId || !title) {
        response.status = 422;
        response.body = {
            msg: 'Incorrect todo data. userId and title are required',
        }
        return;
    }

    const todoId = await createTodo({
        userId,
        title,
        completed,
    })

    response.body = {
        msg: `todo created`,
        todoId
    }
}