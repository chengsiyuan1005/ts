console.log('this is app')

let var1:boolean = false

let var2:undefined

let str1:string = 'str1111'
let str2:string = `this is ${str1}`

let any1:any = 'this is any'
any1 = false

let noun1:unknown = 'this is unknown'

let try1:string = `${noun1} ${str1}`

let noun2:unknown = 12

function divide(params:unknown) {
  return params / 2 // unknown类型不合法 (但可以运行)
}

console.log(var1, var2, str2, any1, typeof typeof any1, typeof noun1, try1, divide(noun2))

let arr1:number[] = [1, 2, 3]

let arr2: [number, string] = [15, 'like']

arr2.push('fffff', '23232', 1222)

console.log(arr2)




/**
 * 
 * 1 定义函数类型需要定义输入参数类型和输出类型
 *  1.1 输出类型可以忽略, TS能根据返回语句自动退出返回值类型
 *  1.2 函数没有明确返回值, 默认返回void类型
 */

// never 函数没有终点
function fn1(msg: string): never {
  throw new Error(`this is a err ${msg}`)
}

// void 没有返回值
function fn2(msg:unknown): void {
  console.log('console.log fn2 ' + msg)
}

function add1(params1: number, params2: number) {
  return params1 + params2
}

const add2 = (val1: number, val2: number, val3: number) => {
  return val1 + val2 + val3
}




// fn1('wrong')

fn2('打印')

console.log(add1(12, 21), add2(12, 100, 111))