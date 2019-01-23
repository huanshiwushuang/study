var a = 1;
console.time();
while (true) {
    if (a > 7*1000/25) {
        break;
    }
    press(567,1264, 1);
    press(567,1254, 1);
    press(567,1234, 1);
    a++;
}
console.timeEnd();
