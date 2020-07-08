export default function hello(name: string): string {
    return `안녕 ${name}`
}
export function goodbye(name: string): string {
    return `잘가 ${name}`
}
export function birthday(name: string, year: number): object {

    const profile = {
        name: name, age: (new Date().getFullYear() - year)
    }

    return profile

}
export function add(num1: number, num2: number):number {
    return num1 + num2
}






