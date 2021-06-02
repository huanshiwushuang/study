const env = Deno.env.toObject();


export default {
    APP_HOST: env.APP_HOST || '127.0.0.1',
    APP_PORT: env.APP_POST || 3000,
    DB_PATH: env.DB_PATH || './db/todos.json',
}