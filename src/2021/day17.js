const targetMinX = 70;
const targetMaxX = 125;
const targetMinY = -159;
const targetMaxY = -121;

function day17a(){
    console.time('run');

    let maxYpos = Number.NEGATIVE_INFINITY;
    let y=0;
    while(y < 200){
        for(let x=12; x<16; x++){
            let top = launch(x, y);
            if(top > maxYpos){
                console.log(x, y, top);
                maxYpos = top;
                break;
            }
        }
        y++;
    }
    console.timeEnd('run');
    return maxYpos;
}

function day17b(){
    console.time('run');
    let hits=0;
    for(let x=12; x<=targetMaxX; x++){
        for(let y=targetMinY; y<=158; y++){
            if(hit(x,y)){
                console.log(x, y);
                hits++;
            }
        }
    }
    console.timeEnd('run');
    return hits;
}
function hit(x,y) {
    return launch(x, y) > Number.NEGATIVE_INFINITY;
}

function launch(x, y){
    let posx = 0;
    let posy = 0;
    let maxY = 0;

    while(true){
        posx += x;
        posy += y;
        if(posy > maxY){
            maxY = posy;
        }

        if(posx >= targetMinX && posx <= targetMaxX && posy >= targetMinY && posy <= targetMaxY){
            return maxY;
        }
        if(posx > targetMaxX || posy < targetMinY){
            return Number.NEGATIVE_INFINITY;
        }

        if(x < 0){
            x++;
        } else if(x > 0){
            x--;
        }
        y--;
    }

}

function triangular(n){
    return n*(n+1)/2;
}
console.log('--- A ---');
//console.log(day17a());

console.log('--- B ---');
console.log(day17b());
