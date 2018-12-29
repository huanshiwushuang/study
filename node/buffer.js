var buffer = new Buffer('==ii1j2i3h1i23h', 'base64');

console.log(buffer);

require('fs').writeFile('logo.png', buffer, function (err) {
    console.log(err);
})