
function day14a(input, template){
    let rules = [];
    input.split('\n').forEach(r => {
        rules.push(r.split(' -> '));
    });

    let counter = { A: 0, B: 0, C: 0,D: 0,E: 0,F: 0,G: 0,H: 0,I: 0,J: 0,K: 0,L: 0,M: 0,N: 0,O: 0,P: 0,Q: 0,R: 0,S: 0,T: 0,U: 0,V: 0,W: 0,X: 0,Y: 0,Z: 0};
    template.split('').forEach(s=> counter[s]++);
    
    for(let i=0; i<template.length-1; i++){
        count(template[i]+template[i+1], rules, counter, 10);
        //console.log(counter);
    }
    //console.log(counter);
    let counterArr = Object.values(counter).filter(c => c > 0);
    let min = Math.min(...counterArr);
    let max = Math.max(...counterArr);
    console.log(min, max);

    return max - min;
}

function day14b(input, template){
    let rules = [];
    input.split('\n').forEach(r => {
        rules.push(r.split(' -> '));
    });

    currentPairs = {};
    rules.forEach(r=> currentPairs[r[0]] = { B: 0, C: 0,F: 0,H: 0,K: 0,N: 0,O: 0,P: 0,S: 0,V: 0});
    totalPairs = {};
    rules.forEach(r=> totalPairs[r[0]] = { B: 0, C: 0,F: 0,H: 0,K: 0,N: 0,O: 0,P: 0,S: 0,V: 0});
    
    for(let i=0; i<40; i++){
        rules.forEach(r => totalPairs[r[0]] = countB(r[0], rules, currentPairs));
        Object.entries(totalPairs).forEach(([key, value]) => currentPairs[key] = {...value});
    }
    console.log(totalPairs);

    let counter = { B: 0, C: 0,F: 0,H: 0,K: 0,N: 0,O: 0,P: 0,S: 0,V: 0};
    template.split('').forEach(s=> counter[s]++);
    for(let i=0; i<template.length-1; i++){
        Object.entries(totalPairs[template[i]+template[i+1]]).forEach(([key, value]) => counter[key] += value);
    }
    console.log(counter);
    let counterArr = Object.values(counter);
    let min = Math.min(...counterArr);
    let max = Math.max(...counterArr);
    console.log(min, max);

    return max - min;
}

function countB(pair, rules, pairCounters){
    let res = { B: 0, C: 0,F: 0,H: 0,K: 0,N: 0,O: 0,P: 0,S: 0,V: 0};
    let insert = rules.find(r=> r[0] == pair)[1];
    res[insert]++;
    Object.entries(pairCounters[pair[0] + insert]).forEach(([key, value]) => res[key] += value);
    Object.entries(pairCounters[insert + pair[1]]).forEach(([key, value]) => res[key] += value);

    return res;
}


function count(pair, rules, counter, steps){
    if(steps == 0){
        return;
    }
    
    let insert = rules.find(r=> r[0] == pair)[1];
    counter[insert]++;
    count(pair[0] + insert, rules, counter, steps-1);
    count(insert + pair[1], rules, counter, steps-1);
}

const datatest =``;
const data = `FV -> H
SB -> P
NV -> S
BS -> K
KB -> V
HB -> H
NB -> N
VB -> P
CN -> C
CF -> N
OF -> P
FO -> K
OC -> F
BN -> V
PO -> O
OS -> B
KH -> N
BB -> C
PV -> K
ON -> K
NF -> H
BV -> K
SN -> N
PB -> S
PK -> F
PF -> S
BP -> K
SP -> K
NN -> K
FP -> N
NK -> N
SF -> P
HS -> C
OH -> C
FS -> H
VH -> N
CO -> P
VP -> H
FF -> N
KP -> B
BH -> B
PP -> F
SS -> P
CV -> S
HO -> P
PN -> K
SO -> O
NO -> O
NH -> V
HH -> F
KK -> C
VO -> B
KS -> B
SV -> O
OP -> S
VK -> H
KF -> O
CP -> H
SH -> H
NC -> S
KC -> O
CK -> H
CH -> B
KO -> O
OV -> P
VF -> V
HN -> P
FH -> P
BC -> V
HV -> N
BO -> V
PH -> P
NP -> F
FN -> F
FK -> P
SC -> C
KN -> S
NS -> S
OK -> S
HK -> O
PC -> O
BK -> O
OO -> P
BF -> N
SK -> V
VS -> B
HP -> H
VC -> V
KV -> P
FC -> H
HC -> O
HF -> S
CB -> H
CC -> B
PS -> C
OB -> B
CS -> S
VV -> S
VN -> H
FB -> N`;

console.log('--- A ---');
//console.log(day14a(data, 'KHSNHFKVVSVPSCVHBHNP'));

console.log('--- B ---');
console.log(day14b(data, 'KHSNHFKVVSVPSCVHBHNP'));