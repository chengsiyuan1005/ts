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

interface newArr {
  [name:number]:string
}

interface Running {
  sport(val: string):string
  happy(val:string):string
  pi:number
  like: newArr
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
  happy (params:string) {
    return 'he likes ' + params
  }
  pi = 3.14
  like = ['write', 'read']
}

let car1 = new Car()

console.log(cel1, cel1.play('iphone4`'))

console.log(car1, car1.play(), car1.sport('to change!!!'), car1.happy('the car---'), car1.pi)


let arr:newArr = ['11', '22']

console.log('枚举--------------------------------------')
enum Direction {
  Up,
  Down,
  Left = 15, // 改变当前index (影响之后)
  Right,
  Front,
  After
}

enum ThreeStatus {
  NotFound = 404,
  NetMiss = 500,
  TokenExpire = 401
}

// Vue3 patchFlags
enum PatchFlags {
  TEXT = 1,                    // 动态文本节点
  CLASS = 1 << 1,              // 动态 class
  STYLE = 1 << 2,              // 动态 style
  PROPS = 1 << 3,              // 动态属性
  FULL_PROPS = 1 << 4,         // 具有动态 key 属性，当 key 改变时，需要进行完整的 diff 比较
  HYDRATE_EVENTS = 1 << 5,     // 具有监听事件的节点
  STABLE_FRAGMENT = 1 << 6,    // 子节点顺序不会被改变的 fragment
  KEYED_FRAGMENT = 1 << 7,     // 带有 key 属或部分子节点有 key 的 fragment
  UNKEYED_FRAGMENT = 1 << 8,   // 子节点没有 key 的 fragment
  NEED_PATCH = 1 << 9,         // 非 props 的比较，比如 ref 或指令
  DYNAMIC_SLOTS = 1 << 10,     // 动态插槽
  DEV_ROOT_FRAGMENT = 1 << 11, // 仅供开发时使用，表示将注释放在模板根级别的片段
  HOISTED = -1,                // 静态节点
  BAIL = -2                    // diff 算法要退出优化模式
}

// 字符串枚举
 enum Bark {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

// 常量枚举 const枚举 仅 可在属性、索引访问表达式、导入声明的右侧、导出分配或类型查询中使用!!
const enum PipLine {
  One = 'One',
  Two = 'Two',
  Three = 'Three'
}


console.log(Direction, Direction[16])

console.log(ThreeStatus, ThreeStatus[401], ThreeStatus['NotFound'])

console.log(PatchFlags)

console.log(Bark)

if (PipLine.Two === 'Two') {
  console.log('this is const enum PipLine second index to Two')
}

console.log('类型推论-----------------------------------')
/**
 * function 返回类型自动
 * Array类型自动
 *  | 联合类型 & 交叉类型
 *  type 类型别名
 *    type 和 interface 区别
 *       1. 相同点: 
 *          都可以定义一个对象或函数 
 *          都允许继承
 *       2. 不同点: 
 *          interface 用来定义对象雷丁, 可以对对象类型进行描述
 *          type是类型别名, 用于各种类型定义别名, 让ts更简洁
 *          interface可以合并重复声明, type不行
 *          一般用类的extends or implements 用 interface
 */

function printAge(num = 18) {
  console.log(num)
  return num
}

interface PrintAge {
  (num: number): number,
  key?: string
}

const printAge111: PrintAge = printAge

console.log(printAge111)

interface MyObj {
  [name:string]:string | number
}

type arrType = number | string | null | MyObj

let arr11:arrType[] = [0, 1, '2222', {key: 1, val: 'this is val'}]

console.log(arr11)

// interface合并重复声明
interface Reply1{
  name: string
}

interface Reply1 {
  age: number
}

const re1: Reply1 = {
  name: 'lily',
  age: 18
}

console.log(re1)

// 字面量常量
type sex1 = 'female' | 'male'

let newSex:sex1 = 'male'

console.log('泛型-------------------------------------')
function print1<T>(arg:T):T {
  return arg
}


const res1:string = print1('123')
const res2 = print1<string>('str222222')

function print2<T, U>(arg1:T, arg2:U):[U, T] {
  return [arg2, arg1]
}

const res3 = print2<string, number>('demo', 112)

console.log(res1, res2)
console.log(res3)




