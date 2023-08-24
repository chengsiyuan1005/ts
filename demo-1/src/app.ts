console.log('this is app')

console.log('类型----------------------------------------')

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

console.log('函数类型----------------------------------')

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

// ? 可选参数 
// 默认参数 若默认参数没有在最后, 则需要传入undefined来获取默认值
const add2 = (val1: number = 111, val2: number, val3 ?: number) => {
  if (val3) {
    val1 = val1 + val3
  }
  return val1 + val2
}

// 将add2赋给add3, add4
const add3:(x: number, y: number, z?: number) => number = add2

const add4 = add2

// 不同参数类型用any
const add5 = (x:any, y:any) => {
  return x + y
}

// 不同参数个数
const add6 = (...arg:any) => {
  return '多个参数: ' + arg[0] + arg[1]
}
function add7(...arg:any) {
  return '多个参数: ' + arg
}


// fn1('wrong')

fn2('打印')

console.log(add1(12, 21), add2(undefined, 111),add2(100, 100, 100), add2(100, 100))

console.log(add3(1, 2, 3), add4(100, 100, 100))

console.log(add5(100, '111'), add5(100, 100))

console.log(add6(1, 2, 3, 4), add7(1, 1, 1, 1))


console.log('interface---------------------------------------')

/**
 * interface 用来定义对象类型(描述对象形状)
 */

interface Person {
  readonly id:number, // 只读
  name: string,
  age: number,
  sex?: string,
}

// 声明属性必须要全用 ? 可选除外
const p1:Person = {
  id: 1,
  name: 'lily',
  age: 18,
  sex: 'female'
}

p1.age = 188

const p2:Person = {
  id: 2,
  name: 'Andy',
  age: 33
}

interface Isum {
  (x: number, y: number):number,
}

const addFun:Isum = (num1, num2) => {
  return num1 + num2
}

interface LikeArray {
  [propName:string]:string, // 定义类数组(对象)
}

const likeArr1:LikeArray = {
  val: 'sss',
  key: 'ffff'
}

interface SameArray {
  [key:number]:string
}

const sameArr1:SameArray = ['hi', 'are', 'u', 'ok']

interface FunWithProps {
  (x:number): string,
  fnName: string,
  arr:[key:any]
  secondArr?:[key:any]
}

const fn: FunWithProps = (x) => {
  let str:string = x + ' to string'
  return str
}

fn.fnName = 'hi'

fn.arr = [1]
fn.arr.push('kky', 'third')




console.log(p1, p2)

console.log(addFun(11, 11))

console.log(likeArr1, sameArr1)

console.log(fn(111), fn.fnName, fn.arr)

console.log('class---------------------------------')
class Person1 {
  constructor(name: string) {
    this.name = name
    this.info = 'person person person'
    this.description = 'var description ' + Person1.drink
    this.hobby = 'eat!!!!!'
  }
  name: string
  info:string
  private description:string
  protected hobby:string
  // static 静态属性, 类上的常量, 实例不能访问
  static drink:string = 'drinking water'
  speak () {
    return `${this.name} is speaking`
  }
  public run = () => {
    return 'this is public run'
  }
}

const per1 = new Person1('lin')

class Student extends Person1 {
  constructor(name: string, grade: string){
    super(name)
    this.grade = grade
  }
  grade:string
  study() {
    return `${this.name} needs sty`
  }
  // 多态 (speak中name转为当前class中的name)
  speak (): string {
    return `Student ${super.speak()}`
  }
  // 父类protect属性子类可以访问
  stuHobby() {
    return `stu like ${this.hobby}`
  }
}

let st1 = new Student('lily', 'Best')

/**
 * 抽象类
 *  1. 抽象类不允许被实例化
 *  2. 抽象类中抽象方法必须被子类实现
 *  3. 抽象方法必须定义在抽象类中
 */
abstract class Animal {
  constructor(name:string) {
    this.name = name
  }
  name:string
  abstract sayHi():string
  abstract panel:string
}



class Dog extends Animal {
  constructor(name:string) {
    super(name)
    this.panel = 'this is dog key'
  }
  sayHi (): string {
    return this.name + ' say bark'
  }
  panel: string
}


let dog1 = new Dog('kity')

class Cat extends Animal {
  constructor(name:string) {
    super(name)
  }
  sayHi (): string {
    return this.name + ' say miao miao'
  }
  panel: string = 'this is cat miao'
}

let cat1 = new Cat('Mimi')

// this
// 父类型和子类型上的方法都可随意调用 保持了父类和子类之间接口调用的连贯性
class StudyStep {
  step1() {
    console.log('step1 this')
    return this
  }
  step2() {
    console.log('step2 this')
    return this
  }
}

class MyStudyStep extends StudyStep {
  next() {
    console.log('first')
    return this
  }
}

const m1 = new MyStudyStep()




console.log(per1, per1.speak(), per1, Person1.drink)

console.log(st1, st1.study(), st1.speak(), st1.run(), st1.info, st1.stuHobby())

console.log(dog1, dog1.sayHi(), dog1.panel)

console.log(cat1, cat1.sayHi(), cat1.panel)

console.log(m1.step1().next().step1().step1().next())


console.log('interface & class ---------------------------------')

interface MusicInterface {
  play(val: string):string
}

interface Running {
  sport(val: string):string
}

class CellPhone implements MusicInterface {
  play (arg:string): string {
    return `${arg} will play music`
  }
}

let cel1 = new CellPhone()

class Car implements MusicInterface, Running {
  play() {
    return 'car will sing'
  }
  sport (val: string): string {
    return 'every car have sport module ' + val
  }
}

let car1 = new Car()

console.log(cel1, cel1.play('iphone4`'))

console.log(car1, car1.play(), car1.sport('to change!!!'))





