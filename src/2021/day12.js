
function day12a(input){
    let nodes = new Set();
    let edges = [];

    input.split('\n').forEach(x => {
        let [a, b] = x.split('-');
        nodes.add(a);
        nodes.add(b);
        edges.push([a, b]);
        edges.push([b, a]);
    });

    edges = edges.filter(e => e[1] != 'start' && e[0] != 'end');

    //console.log(edges, nodes);

    let paths = [];
    getPathsFrom('start', edges, [], paths);
    console.log(paths);

    return paths.length;
}

function day12b(input){
    let nodes = new Set();
    let edges = [];

    input.split('\n').forEach(x => {
        let [a, b] = x.split('-');
        nodes.add(a);
        nodes.add(b);
        edges.push([a, b]);
        edges.push([b, a]);
    });

    edges = edges.filter(e => e[1] != 'start' && e[0] != 'end');

    //console.log(edges, nodes);

    let paths = [];
    getPathsFrom('start', edges, [], paths);
    //console.log(paths);

    return paths.length;
}

function isBigCave(node) {
    return node.toUpperCase() == node;
}

function hasVisitedAnySmallCaveTwice(path){
    let smallCaves = path.filter(p=> !isBigCave(p));
    
    let unique = new Set(smallCaves);
    //console.log(smallCaves, unique);
    return smallCaves.length != [...unique].length;
}

function getValidDestinations(node, edges, path){
    return edges.filter(x=> x[0] == node && (isBigCave(x[1]) || !path.some(p => p == x[1]) || !hasVisitedAnySmallCaveTwice(path))).map(e => e[1]);
}
function getValidDestinationsZZZ(node, edges, path){
    return edges.filter(x=> x[0] == node && (isBigCave(x[1]) || path.filter(p => p == x[1]).length < 2)).map(e => e[1]);
}

function getValidDestinationsA(node, edges, path){
    return edges.filter(x=> x[0] == node && (isBigCave(x[1]) || !path.includes(x[1]))).map(e => e[1]);
}
function getPathsFrom(node, edges, path, paths){
    path.push(node);
    if(node == 'end'){
        paths.push(path);
        return;
    }
    getValidDestinations(node, edges, path).forEach(d => {
        //console.log(d, path);
        getPathsFrom(d, edges, path.slice(), paths)
    });
}

const datatest =`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

const data = `xx-end
EG-xx
iy-FP
iy-qc
AB-end
yi-KG
KG-xx
start-LS
qe-FP
qc-AB
yi-start
AB-iy
FP-start
iy-LS
yi-LS
xx-AB
end-KG
iy-KG
qc-KG
FP-xx
LS-qc
FP-yi`;

console.log('--- A ---');
//console.log(day12a(data));

console.log('--- B ---');
console.log(day12b(data));