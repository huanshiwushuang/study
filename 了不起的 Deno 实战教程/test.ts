import { Application } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();

// Logger
app.use(async (ctx, next) => {
    await next();

    const time = ctx.response.headers.get('X-Response-Time');

    console.log(`${ctx.request.method}-${ctx.request.url}-->${time}`);
})

// Timing
app.use(async (ctx, next) => {
    const startTime = Date.now();
    await next();
    ctx.response.headers.set('X-Response-Time', `${Date.now() - startTime}ms`);
})
// body
app.use(async (ctx, next) => {
    ctx.response.body = '123';
})

await app.listen({
    port: 8080
})
console.info('监听端口在 8080');