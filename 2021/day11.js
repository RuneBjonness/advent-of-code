
function day11a(input){
    let octopuses = input.split('\n');
    octopuses.forEach((r, i) => octopuses[i] = r.split('').map(n=> Number(n)));

    let flashCount = 0;

    for(let i=0; i<100; i++){
        octopuses = octopuses.map(r => r.map(c => ++c));
        flashCount += step(octopuses);
        octopuses = octopuses.map(r => r.map(c => c > 9 ? 0 : c));
        console.log('step ', i, flashCount, octopuses[0]);
    }

    return flashCount;
}

function day11b(input){
    let octopuses = input.split('\n');
    octopuses.forEach((r, i) => octopuses[i] = r.split('').map(n=> Number(n)));

    let stepCount = 0;

    while(true){
        let flashCount = 0;
        octopuses = octopuses.map(r => r.map(c => ++c));
        flashCount += step(octopuses);
        //octopuses = octopuses.map(r => r.map(c => c > 9 ? 0 : c));
        stepCount++;
        if(flashCount == 100) {
            return stepCount;
        }
    }

    //return flashCount;
}


function step(m){
    let newFlashes = getFlashingPoints(m);
    let flashCount = newFlashes.length;
    if(flashCount == 0){
        return flashCount;
    }

    newFlashes.forEach(p => { 
        m[p[0]][p[1]] = 0;
    });

    newFlashes.forEach(p => {
        incrementNeighbours(m, p[0], p[1]);
        flashCount += step(m);
    });

    return flashCount;
}

function getFlashingPoints(m){
    let p = [];
    for(let r=0; r<m.length; r++){
        for(let c=0; c<m[r].length; c++){
            if(m[r][c] == 10){
                p.push([r, c]);
            }
        }
    }
    return p;
}

function incrementNeighbours(m, r, c){
    if(c > 0){
        increment(m, r, c-1);
    }
    if(c+1 < m[r].length){
        increment(m, r, c+1);
    }
    if(r > 0){
        increment(m, r-1,c);
        if(c > 0){
            increment(m,r-1,c-1);
        }
        if(c+1 < m[r].length){
            increment(m,r-1,c+1);
        }
    }
    if(r + 1 < m.length){
        increment(m,r+1,c);
        if(c > 0){
            increment(m,r+1,c-1);
        }
        if(c+1 < m[r].length){
            increment(m,r+1,c+1);
        }
    }
}

function increment(m, r, c){
    if(m[r][c] > 0) {
        m[r][c]++;
    }
}


const data = `4525436417
1851242553
5421435521
8431325447
4517438332
3521262111
3331541734
4351836641
2753881442
7717616863`;

console.log('--- A ---');
//console.log(day11a(data));

console.log('--- B ---');
console.log(day11b(data));