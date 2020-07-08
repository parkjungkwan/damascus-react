export default function operator() {
    console.log(`--- 1. 산술연산자 ----`)
    console.log(`10 ** 3 = ${10 ** 3}`)
    console.log(`--- 2. 부정연산자 ---`)
    console.log(`!"hello" = ${!"hello"}, !!"hello" = ${!!"hello"}`)
    console.log(`!0 = ${!0}, !!0 = ${!!0}, !1= ${!1}, !2 = ${!2}`)
    console.log(`!true = ${!true}, !!true = ${!!true}`)
}
export function destructure() {
    console.log(`--- 1. 객체 구조분해 ----`)
    let {a, b, ...c} = {a: 10, b: 20, c: 30, d: 40}
    console.log(`${a}`)
    console.log(`${b}`)
    console.log(`${c}`)
    console.log(`--- 2. 배열 구조분해 ----`)
    let numbers = ["a", "b", "c", "d", "e"]
    let [num1, num2] = numbers
    console.log(`[num1, num2] ==> ${num1}, ${num2}`)

    let [,, num3, num4,] = numbers
    console.log(`[,, num3, num4] ==> ${num3}, ${num4}`)
    // 디스트럭처링을 이용한 변수 값 교체
    console.log(`**[num4, num3] = [num3, num4] 에서 num4 에러 발생`)
    //[num4, num3] = [num3, num4]
    console.log(`[num4, num3] = [num3, num4] ==>  ${num3}, ${num4}`)
    console.log(`[,, num3, num4] ==> ${num3}, ${num4}`)
    console.log(`--- 3. 함수 배열 구조분해 ----`)
    function fn([a, b]: [number, string]){
        console.log(`함수배열 내부 ${a}`)
        console.log(`함수배열 내부 ${b}`)
    }
    fn([100, "Hello"])
    console.log(`--- 4. 함수 객체 구조분해 ----`)
    console.log(`--- 5. 사용자 타입 객체 구조분해 ----`)
}
export function spread() {
    console.log(`--- 1. 스프레드 연산자 ----`)
}