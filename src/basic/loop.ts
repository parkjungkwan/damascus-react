export default function loop() {
    whileLoop() // 0 es5
    doWhileLoop() // 1 es5
    forLoop() // 2 es5
    forInArrayLoop() // 3
    forInObjectLoop() // 4
    forOfArrayLoop() //5
    forOfMapLoop() // 6
    forOfSetLoop()  // 7
    forOfStringLoop() // 8
    symbolIterator() // 9

}
function whileLoop() {
    console.log(`------ 0. while-loop ---------`)

    console.log(`1부터 100까지 합: `)
}
function doWhileLoop() {
    console.log(`------ 1. doWhileLoop ---------`)
    let count: number = 0
    do{
        // 직접 처리
    }while(count != 100)
    console.log(`1부터 100까지 합: `)
}
function forLoop(){
    console.log(`------ 2. doWhileLoop ---------`)

    console.log(`1부터 100까지 합: `)
}
function forInArrayLoop(){

}
function forInObjectLoop(){

}
function forOfArrayLoop() {

}
function forOfMapLoop() {

}
function forOfSetLoop() {

}
function forOfStringLoop() {

}
function symbolIterator() {

}