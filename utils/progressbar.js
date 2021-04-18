function progress(percent, emoji) {
    var range1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var range2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    var range3 = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    var range4 = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
    var range5 = [41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
    var range6 = [51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
    var range7 = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70];
    var range8 = [71, 72, 73, 74, 75, 76, 77, 78, 79, 80];
    var range9 = [81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
    var range10 = [91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

    var progress1 = `${emoji}---------`
    var progress2 = `-${emoji}--------`
    var progress3 = `--${emoji}-------`
    var progress4 = `---${emoji}------`
    var progress5 = `----${emoji}-----`
    var progress6 = `-----${emoji}----`
    var progress7 = `------${emoji}---`
    var progress8 = `-------${emoji}--`
    var progress9 = `--------${emoji}-`
    var progress10 = `---------${emoji}`


    if (range1.includes(percent)) {
        console.log('1')
        return progress1;
    }

    if (range2.includes(percent)) {
        console.log('2')
        return progress2;
    }

    if (range3.includes(percent)) {
        console.log('3')
        return progress3;
    }

    if (range4.includes(percent)) {
        console.log('4')
        return progress4;
    }

    if (range5.includes(percent)) {
        console.log('5')
        return progress5;
    }

    if (range6.includes(percent)) {
        console.log('6')
        return progress6;
    }

    if (range7.includes(percent)) {
        console.log('7')
        return progress7;
    }

    if (range8.includes(percent)) {
        console.log('8')
        return progress8;
    }

    if (range9.includes(percent)) {
        console.log('9')
        return progress9;
    }

    if (range10.includes(percent)) {
        console.log('10')
        return progress10;
    }

}

module.exports.progress = progress;