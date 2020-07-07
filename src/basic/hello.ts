export default function hello(name: string): string {
    return `안녕 ${name}`
}
export function goodbye(name: string): string {
    return `잘가 ${name}`
}
export function birthday(name: string, year: number): string {

    const profile = {
        name: name, age: (new Date().getFullYear() - year)
    }

    return `이름:  ${profile.name}, 나이: ${profile.age}`

}
export function add(num1: number, num2: number):number {
    return num1 + num2
}






