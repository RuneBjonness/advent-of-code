function day18a(input){
    console.time('run');

    //let sum = input.split('\n').reduce((a,b) => add(a, b));

    let numbers = input.split('\n');
    let sum = numbers[0];
    for(let i=1;i<numbers.length;i++ ){
        sum = add(sum, numbers[i]);
        console.log(sum);
    }
    
    console.timeEnd('run');

    console.log(parsePairs(sum));
    return magnitude(parsePairs(sum));
}

function day18b(input){
    console.time('run');

    //let sum = input.split('\n').reduce((a,b) => add(a, b));

    let numbers = input.split('\n');
    let sums = [];
    for(let i=1;i<numbers.length;i++ ){
        for(let j=0;j<i;j++ ){
            sums.push(add(numbers[j], numbers[i]));
            sums.push(add(numbers[i], numbers[j]));
        }
    }
    let maxMagnitude = 0;
    sums.forEach(s=> {
        let mag = magnitude(parsePairs(s));
        if(mag > maxMagnitude) {
            maxMagnitude = mag;
        }
    });

    console.timeEnd('run');
    return maxMagnitude;
}

function add(a, b){
    return reduce(`[${a},${b}]`);
}

function reduce(a){
    while(true){
        let r = explode(a);
        if(r) {
            a = r; 
            continue;
        }
        r = split(a);
        if(r) {
            a = r; 
            continue;
        }
        return a;
    }
}

function explode(n){
    let lvl = 0;
    for(let i=0; i<n.length; i++){
        if(n[i]=='[') {
            lvl++;
            if(lvl == 5){
                let expIdxEnd = n.indexOf("]", i+1);
                let pair = n.substring(i+1, expIdxEnd).split(',');
                let left = addToLastNumber(n.substring(0, i), pair[0]);
                let right = addToFirstNumber(n.substring(expIdxEnd+1), pair[1]);
                return left + '0' + right;
            }
        }else if(n[i]==']') {
            lvl--;
        }
    }
    return false;
}

function addToLastNumber(s, add){
    let number = '';
    for(let i=s.length-1; i>=0; i--){
        if(Number(s[i]) >= 0) { 
            number = s[i] + number;
        } else if(number.length > 0){
            return s.substring(0, i+1) + (Number(add) + Number(number)) + s.substring(i+1+number.length);
        }
    }
    return s;
}

function addToFirstNumber(s, add){
    let number = '';
    for(let i=0; i<s.length; i++){
        if(Number(s[i]) >= 0) { 
            number = number + s[i];
        } else if(number.length > 0){
            return s.substring(0, i-number.length) + (Number(add) + Number(number)) + s.substring(i);
        }
    }
    return s;
}

function split(n){
    let number = '';
    for(let i=0; i<n.length; i++){
        if(Number(n[i]) >= 0) { 
            number += n[i];
        } else if(number.length > 1){
            let num = Number(number); 
            return n.substring(0, i-number.length) + '[' + Math.floor(num/2) + ',' +  Math.ceil(num/2) + ']' + n.substring(i);
        } else {
            number = '';
        }
    }
    return false;
}

function magnitude(p){
    let l = p.leftVal != null ? p.leftVal : magnitude(p.left);
    let r = p.rightVal != null ? p.rightVal : magnitude(p.right);
    return 3*l + 2*r;
}

function parsePairs(n){
    let p = {};
    let rIdx = 0;
    if(n[1] == '['){
        rIdx = getClosingIndex(n,1) + 1;
        p['left'] = parsePairs(n.substring(1, rIdx));
    } else {
        rIdx = n.indexOf(",");
        p['leftVal'] = Number(n.substring(1, rIdx));
    }
    rIdx++;
    if(n[rIdx] == '['){
        p['right'] = parsePairs(n.substring(rIdx, n.length -1));
    } else {
        p['rightVal'] = Number(n.substring(rIdx, n.length -1));
    }
    return p;
}

function getClosingIndex(n, start){
    let lvl = 1;
    for(let i=start+1; i<n.length; i++){
        if(n[i]=='[') {
            lvl++;
        }else if(n[i]==']') {
            lvl--;
            if(lvl === 0){
                return i;
            }            
        }
    }
    return n.length;
}

const data = `[[2,[[1,1],9]],[[0,[3,0]],[[1,6],[4,2]]]]
[[8,[0,5]],[[[9,9],0],[[2,9],2]]]
[[[[6,4],[5,8]],[[0,9],[6,5]]],[[5,1],4]]
[[[9,[2,8]],[[0,2],[8,3]]],[[[5,6],[5,8]],[[4,8],2]]]
[[0,[[0,1],[6,0]]],[[[6,4],1],[8,6]]]
[[[[8,5],6],8],[[[9,1],[0,6]],[4,[2,4]]]]
[7,[[4,3],[8,5]]]
[[8,[1,[3,4]]],[[3,8],[0,1]]]
[[[1,1],[[2,1],[0,3]]],[[7,[1,8]],[[3,8],[5,2]]]]
[[2,[[4,6],[6,2]]],[[0,5],[3,7]]]
[[[[9,8],[4,6]],[7,[9,1]]],[[[8,7],[4,7]],[[6,6],[8,1]]]]
[[[2,[5,1]],[[0,4],3]],[[9,7],[[0,2],0]]]
[[[[5,0],2],5],[[3,[5,8]],[5,[8,9]]]]
[[6,[3,6]],[[[2,7],6],[[6,0],4]]]
[[8,8],7]
[[[[7,9],3],8],[[0,[1,7]],[[3,2],[4,5]]]]
[[[1,1],[7,2]],[3,[4,[6,4]]]]
[[[9,[6,6]],[[4,8],[1,3]]],[[[4,7],8],[[5,2],[3,8]]]]
[[[6,[6,7]],[3,4]],5]
[[[[0,0],2],9],[[[2,1],1],[5,[4,7]]]]
[[[2,[9,8]],[5,8]],[[[3,4],6],[5,0]]]
[[[7,[9,4]],[7,[7,2]]],[[1,[9,6]],1]]
[[[[9,1],1],[4,[2,6]]],3]
[[0,[8,[3,4]]],[8,[9,8]]]
[[[1,6],[6,7]],[[[0,4],1],7]]
[[6,[5,[0,0]]],[7,[[5,4],1]]]
[[2,[[9,5],[9,1]]],[[3,0],4]]
[[[5,7],[[1,0],[3,5]]],[4,[5,[4,0]]]]
[[3,3],[2,2]]
[[[[6,2],[1,7]],[1,7]],[[[6,7],6],9]]
[[[[9,8],[8,8]],[2,1]],[[8,4],8]]
[[[[1,4],1],[2,0]],[4,[[0,5],5]]]
[[[7,[6,0]],[[7,3],1]],9]
[[[[2,4],0],[[6,9],8]],[[3,[0,9]],[[4,4],[5,4]]]]
[[7,3],[0,[2,[7,2]]]]
[[[[8,8],5],9],[[8,6],6]]
[[[[9,5],7],9],0]
[[[1,4],8],[[7,[5,3]],[[6,4],6]]]
[[9,[[9,3],[3,7]]],[[[6,9],1],[[2,3],[4,4]]]]
[[4,[9,2]],[3,4]]
[[1,[[0,9],2]],[1,[1,[8,7]]]]
[[[4,1],8],[9,[9,[2,9]]]]
[[[[7,9],[9,7]],8],[[[3,0],5],[[7,8],[3,1]]]]
[[[[9,4],[9,9]],[[9,5],[8,9]]],[[2,[7,4]],[[4,6],6]]]
[[[[8,7],1],[6,8]],[[4,2],5]]
[7,[3,[3,3]]]
[[[4,9],[0,2]],[[[4,2],9],[[5,8],6]]]
[[[[1,3],1],[[7,5],[4,0]]],[[[6,3],4],[[1,2],8]]]
[[[[3,2],2],[4,7]],[[[5,6],[6,3]],3]]
[[[[4,0],6],[4,2]],[7,5]]
[[[[9,5],[2,0]],[[6,8],[0,9]]],[[[7,4],[3,6]],1]]
[[[4,[9,3]],[[9,4],8]],[[6,[1,2]],2]]
[[[[4,1],[1,1]],[[4,8],9]],[[[1,0],[0,3]],2]]
[[[3,[3,8]],[[0,6],7]],[[2,5],9]]
[[[0,[6,8]],[[2,7],[4,1]]],6]
[[6,3],0]
[[[3,[7,1]],[3,[2,0]]],[[[3,5],9],[[5,2],[7,8]]]]
[[7,8],[1,[[7,1],5]]]
[[[9,[8,9]],2],[9,[[8,8],4]]]
[[[8,[5,8]],[[9,1],[6,0]]],[[[9,1],[4,7]],8]]
[5,[[[4,9],7],[[6,0],[9,0]]]]
[[[[8,8],[6,7]],[[1,0],6]],[[5,[2,8]],[[8,0],[3,7]]]]
[[0,[6,6]],[[0,1],[3,[9,2]]]]
[[1,[0,[8,1]]],[[0,[0,0]],[8,[0,0]]]]
[[[4,[1,4]],[8,[9,5]]],7]
[7,[[[0,0],[4,3]],8]]
[[[9,1],[[7,5],[9,2]]],[5,[9,0]]]
[[[[2,0],9],[8,[3,0]]],[[9,8],[4,[0,7]]]]
[4,[5,[5,[0,3]]]]
[[6,[[6,9],8]],[1,[0,[6,0]]]]
[[7,[4,3]],[[0,6],[[5,2],[6,9]]]]
[[[[7,2],[4,6]],[[5,0],9]],6]
[[[0,1],[0,2]],[0,[5,2]]]
[[[[5,0],[5,4]],[[5,9],[9,9]]],[2,[[3,0],[8,1]]]]
[[[[9,2],[2,9]],[[5,5],2]],[[1,3],[[3,6],[1,8]]]]
[[0,[2,4]],[[[6,9],1],[[7,9],[9,8]]]]
[[[[2,1],1],[7,3]],[4,[[1,2],[2,6]]]]
[[[6,[0,1]],[[6,4],[4,2]]],[1,[[0,0],[9,7]]]]
[[[[9,2],3],[9,8]],[[6,5],[7,[1,7]]]]
[[3,9],7]
[[[6,9],[[0,2],0]],[[[8,6],2],9]]
[[[[2,2],2],[[6,7],7]],[[0,3],9]]
[[[7,[2,7]],3],4]
[[[[1,9],6],[0,7]],[[[2,2],1],2]]
[9,9]
[0,[9,[[4,1],1]]]
[[[[7,6],1],2],[[[6,9],[9,1]],0]]
[[[[4,3],[4,2]],3],[[5,[6,5]],[[2,6],0]]]
[[[0,[5,1]],[6,[1,4]]],[5,[[8,1],3]]]
[6,[9,6]]
[[8,[9,[6,8]]],[[4,9],[[2,4],[7,1]]]]
[[5,[[9,9],[3,3]]],[[[9,8],[5,0]],6]]
[[6,7],1]
[1,[4,[[9,6],0]]]
[[[[9,8],[7,8]],[5,[4,6]]],[[[5,9],6],[[4,6],4]]]
[[[2,7],4],[[[0,3],0],[[7,4],[7,4]]]]
[7,[0,4]]
[1,[3,2]]
[[3,0],8]
[[[3,2],5],8]`;

const data2 = `[[[[4,3],4],4],[7,[[8,4],9]]]
[1,1]`;

console.log('--- A ---');
//console.log(day18a(data));

console.log('--- B ---');
console.log(day18b(data));
