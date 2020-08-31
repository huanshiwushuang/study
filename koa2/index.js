var Koa = require('koa');
var app = new Koa();

app.use(async (ctx, next) => {
    console.log(ctx.request.accepts())
    console.log(ctx.request.acceptsEncodings())
    console.log(ctx.request.acceptsCharsets())
    console.log(ctx.request.acceptsLanguages())
});

app.on('error', (err, ctx) => {
    console.log(err);
    console.log(ctx);
})

app.listen(8080);
