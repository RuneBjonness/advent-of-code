
function day6a(input){
    console.log(input.length);
    for(let t=0; t<80; t++){
        let offspring = [];
        for(let i=0; i<input.length; i++){
            if(input[i] === 0){
                input[i] = 6;
                offspring.push(8);
            } else {
                input[i]--;
            }
        }
        console.log(input.length, offspring.length);
        input.push(...offspring);
    }
    
    return input.length;
}

function day6b(input){
    fish = [
        0,
        input.filter(x=> x == 1).length,
        input.filter(x=> x == 2).length,
        input.filter(x=> x == 3).length,
        input.filter(x=> x == 4).length,
        input.filter(x=> x == 5).length,
        0,
        0,
        0,
    ];
    console.log(fish)
 
    for(let t=0; t<256; t++){
        const gen1 = fish.shift();
        fish[6] += gen1;
        fish.push(gen1);
    }
    
    return fish.reduce((a,b) => a + b); 
}

const data = [1,1,3,5,3,1,1,4,1,1,5,2,4,3,1,1,3,1,1,5,5,1,3,2,5,4,1,1,5,1,4,2,1,4,2,1,4,4,1,5,1,4,4,1,1,5,1,5,1,5,1,1,1,5,1,2,5,1,1,3,2,2,2,1,4,1,1,2,4,1,3,1,2,1,3,5,2,3,5,1,1,4,3,3,5,1,5,3,1,2,3,4,1,1,5,4,1,3,4,4,1,2,4,4,1,1,3,5,3,1,2,2,5,1,4,1,3,3,3,3,1,1,2,1,5,3,4,5,1,5,2,5,3,2,1,4,2,1,1,1,4,1,2,1,2,2,4,5,5,5,4,1,4,1,4,2,3,2,3,1,1,2,3,1,1,1,5,2,2,5,3,1,4,1,2,1,1,5,3,1,4,5,1,4,2,1,1,5,1,5,4,1,5,5,2,3,1,3,5,1,1,1,1,3,1,1,4,1,5,2,1,1,3,5,1,1,4,2,1,2,5,2,5,1,1,1,2,3,5,5,1,4,3,2,2,3,2,1,1,4,1,3,5,2,3,1,1,5,1,3,5,1,1,5,5,3,1,3,3,1,2,3,1,5,1,3,2,1,3,1,1,2,3,5,3,5,5,4,3,1,5,1,1,2,3,2,2,1,1,2,1,4,1,2,3,3,3,1,3,5];

console.log('--- A ---');
//console.log(day6a(data));

console.log('--- B ---');
console.log(day6b(data));