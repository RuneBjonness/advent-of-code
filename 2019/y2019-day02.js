
function day2a(input){
    //console.log(runIntcode([1,1,1,4,99,5,6,0,99]));
    input[1] = 12;
    input[2] = 2;
    let output = runIntcode(input);
    return output[0];
}

function day2b(input) {
    for(let i=0; i<100; i++){
        for(let j=0; j<100; j++){
            let mem = input.slice();
            mem[1] = i;
            mem[2] = j;
            let output = runIntcode(mem);
            if(output[0] === 19690720) {
                return 100 * i + j;
            }
        }
    
    }
    return 0;
}

function runIntcode(input){
    let i = 0;

    while(input[i] !== 99){
        if(input[i] == 1) {
            input[input[i+3]] = input[input[i+1]] + input[input[i+2]];
        } else if(input[i] == 2) {
            input[input[i+3]] = input[input[i+1]] * input[input[i+2]];
        }
        i += 4;
    }

    return input;
}

data = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,19,6,23,1,23,6,27,1,13,27,31,2,13,31,35,1,5,35,39,2,39,13,43,1,10,43,47,2,13,47,51,1,6,51,55,2,55,13,59,1,59,10,63,1,63,10,67,2,10,67,71,1,6,71,75,1,10,75,79,1,79,9,83,2,83,6,87,2,87,9,91,1,5,91,95,1,6,95,99,1,99,9,103,2,10,103,107,1,107,6,111,2,9,111,115,1,5,115,119,1,10,119,123,1,2,123,127,1,127,6,0,99,2,14,0,0];

console.log('--- A ---');
//console.log(day2a(data));

console.log('--- B ---');
console.log(day2b(data));