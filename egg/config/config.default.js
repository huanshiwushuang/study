module.exports = {
    keys: 'www.imooc.com',
    view: {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.html': 'nunjucks'
        }
    },
    middleware: [
        'robot'
    ],
    news: {
        pageSize: 5,
        serverUrl: 'https://hacker-news.firebaseio.com/v0',
    },
    robot: {
        ua: [
            /Baiduspider/i,
        ]
    }
}