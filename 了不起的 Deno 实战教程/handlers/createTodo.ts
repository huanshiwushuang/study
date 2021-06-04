import { Request, Response, Body  } from 'https://deno.land/x/oak/mod.ts';
import { createTodo } from '../services/todos.ts';

export default async ({ request: req, response: res }: { request: Request, response: Response }) => {
    if (!req.hasBody) {
        res.status = 400;
        return res.body = {
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
        res.status = 422;
        res.body = {
            msg: 'Incorrect todo data. userId and title are required',
        }
        return;
    }

    const todoId = await createTodo({
        userId,
        title,
        completed,
    })

    res.body = {
        msg: `todo created`,
        todoId
    }
}