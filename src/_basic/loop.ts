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
    let sum:number =0
    let i:number =0
    while (i<=100){
        sum+=i
        i++
    }
    console.log(`while 1부터 100까지 합: ${sum}`)
}
function doWhileLoop() {
    console.log(`------ 1. doWhileLoop ---------`)
    let count: number = 0
    let sum:number =0
    do{
        count++
        sum+=count
    }while(count != 100)
    console.log(`doWhile 1부터 100까지 합: ${sum}`)
}
function forLoop(){
    console.log(`------ 2. forLoop ---------`)

    let sum:number=0
    for (let i=0;i<=100;i++){
        sum+=i
    }
    console.log(`for 1부터 100까지 합: ${sum}`)
}
function forInArrayLoop(){
    console.log(`------ 3. forInArray ---------`)
    let arr = ["a","b","c","d"]
    for(let i in arr){
        console.log(i, arr[i])
    }
}
function forInObjectLoop(){
    console.log(`------ 4. forInObjectLoop ---------`)
    let fruits = {"a":"apple","b":"banana","c":"cherry"}
    for(let i in fruits){
        console.log(i, fruits[i])
    }
}
function forOfArrayLoop() {
    console.log(`------ 5. forOfArrayLoop ---------`)
    for(const i of [1,2,3]){
        console.log(i)
    }
}
function forOfMapLoop() {
    console.log(`------ 6. forOfMapLoop ---------`)
    let map = new Map([["a", 1],["b", 2]])
    map.set("a", 3)
    for(let i of map){
        console.log(i)
    }
}
function forOfSetLoop() {
    console.log(`------ 7. forOfSetLoop ---------`)
    let set = new Set(["a","b","c","d","a","b","c"])
    for(let i of set){
        console.log(i)
    }
}
function forOfStringLoop() {
    console.log(`------ 8. forOfStringLoop ---------`)
    for(let i of "Hello"){
        console.log(i)
    }
}
function symbolIterator() {
    console.log(`------ 9. symbolIterator ---------`)
    let arr = [1,2]
    let obj = arr[Symbol.iterator]()
    console.log(`1. ${typeof obj}`)
    console.log(`2. ${obj.next()}`)
    console.log(`3. ${obj.next()}`)
    console.log(`4. ${obj.next()}`)

}