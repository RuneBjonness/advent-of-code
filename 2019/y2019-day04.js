
function day4a(input){
    let count = 0;

    for(let n=input[0]; n<=input[1]; n++){
        if(isValid(n)){
            count++;
        }
    }
    
    return count;
}

function day4b(input) {
    let count = 0;

    for(let n=input[0]; n<=input[1]; n++){
        if(isValidB(n)){
            count++;
        }
    }
    
    return count;}

function isValid(n){
    let digits = n.toString().split('');
    let hasDouble = false;
    for(let i=1; i<digits.length; i++){
        if(digits[i] < digits[i-1]) { 
            return false;
        }
        if(digits[i] == digits[i-1]) { 
            hasDouble = true;
        }
    }
    return hasDouble;
}

function isValidB(n){
    let digits = n.toString().split('');
    let hasDouble = false;
    for(let i=1; i<digits.length; i++){
        if(digits[i] < digits[i-1]) { 
            return false;
        }
        if((i-2 < 0 || digits[i] != digits[i-2]) && digits[i] == digits[i-1] && (i+1 == digits.length || digits[i] != digits[i+1])) { 
            hasDouble = true;
        }
    }
    return hasDouble;
}

data = [152085,670283];

console.log('--- A ---');
console.log(day4a(data));

console.log('--- B ---');
console.log(day4b(data));