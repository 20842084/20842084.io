const gamerow = document.querySelector(".gamerow");// ul 
let level = Number(sessionStorage.getItem("level") || 0); 

let time = null;
let timer = document.querySelector('header .timer');
let sec =  sessionStorage.getItem("sec")||20;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}

function endgame(){
    alert("Игра окончена\nПройдено: " + level +" уровней");
        clearInterval(time);// обнуление всего далее
        sessionStorage.clear();
        level = 0;
        sec = 20;
        time = null;
        game();
}

function game () {
    while (gamerow.firstChild) //чистим Ul
        gamerow.removeChild(gamerow.firstChild);

    let w = 600 / (level + 1)-2;//размер стороны квадрата  -2 от border
    let r = getRandomInt(0, 155);//цвета
    let g = getRandomInt(0, 155);
    let b = getRandomInt(0, 155);
    let n = (level + 1) ** 2;//кол-во квадратов
    let sqrsize = `width: ${w}px; height: ${w}px;`; //размеры квадратов
    let randsqr = getRandomInt(0, n - 1);//рандомный квадрат

    for (let i = 0; i < n; i++) {// для каждого квадрата
        let square = document.createElement('li'); // создали квадрат
        

        if (i == randsqr) {// для рандомной ячейки
            square.style = sqrsize + `background-color: rgb( ${r + 100 / level}, ${g + 100 / level}, ${b + 100 / level}); `;
            square.onclick = function () { 
                level++;
                sessionStorage.setItem('level', level.toString());
                if (time == null) {
                    time = setInterval(() => {//работа с временем
                        sec--;
                        timer.innerHTML = 'Время: ' + sec + ' сек';
                        if (sec === 0) { //обработка конца времени
                            endgame();
                        }
                    }, 1000);
                }
                game();
            };
        } 
        else {
            square.style = `background-color: rgb(${r}, ${g}, ${b});` + sqrsize;
            square.onclick = function () { 
                endgame();
            };
        }
        document.querySelector('.level').innerHTML = 'Уровень ' + level; // пишем уровень
        if (level == 0) // для не первой игры 
            timer.innerHTML = 'Время: ' + sec + ' сек';

        gamerow.append(square);
    }
}

game();
