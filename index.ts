// const assertion
const arr = [0, '', false]
type Arr = typeof arr // [number, string, false]
const tup = [0, '', false] as const
type Tup = typeof tup // [0, '', false]

type User = {
  uuid: string;
  name: string;
  bio: string | undefined;
  age: number;
  isDelete: boolean;
}
type UserProperties = keyof User // 'uuid' | 'name' | 'age' | 'bio' | 'isDelete'
const userProps: UserProperties = 'uuid';
// UserPropertiesからUserを復元
type RestoreFromProperties = {[k in UserProperties]: User[k]}



// 制約
type Constraints<T extends string> = T; // Tはstringと互換性のある型で無くてはいけない
const constraintsValue: Constraints<string> = '';



// 条件にあった型を抽出する
type _TypeFilter<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}
type _filteredProperties = _TypeFilter<User, string>
// {
//   uuid: 'uuid',
//   name: 'name',
//   bio: 'bio',
//   age: never,
//   isDelete: never
// }
type TypeFilter<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]
// 最後の[keyof T]で"T[K] extends U ? K : never"の値（プロパティ名が抽出されている）が
// "keyof T"に含まれているかを判断している
type filteredProperties = TypeFilter<User, string> // 'uuid' | 'name' | 'bio'

type StringPropertyNames = TypeFilter<User, string>
type NumberPropertiyNames = TypeFilter<User, number> // 'age'
type BooleanPropertyNames = TypeFilter<User, boolean> // 'isDelete'

// Pick: 最初のGenericsに指定したObject型から次にGenericsに指定したプロパティを抽出したObject型を作る
type picked = Pick<User, 'uuid'>
// {
//   uuid: string;
// }

type StringProperties = Pick<User, StringPropertyNames>
type NumberProperties = Pick<User, NumberPropertiyNames>
type BooleanProperties = Pick<User, BooleanPropertyNames>



// 関数
const func = (bool: boolean) => String(bool);
type FuncType = typeof func // (bool: boolean) => string

// 型の抽出 infer
type Return<T> = T extends (...args: any[]) => infer U ? U : never; // "T extends (...args: any[]) => infer U"までが一つ
type FuncReturnType = Return<typeof func> // string
// 引数の型の抽出
type ArgType<T> = T extends (arg: infer U, ...args: any[]) => any ? U : never;
type FuncArgType = ArgType<typeof func> // boolean



// Utility Types
// Readonly: Object型の全てのプロパティをreadonlyにした新しいObject型を生成する
type ReadOnlyUser = Readonly<User>

// Partial: Object型の全てのプロパティをoptionalにした新しいObject型を生成する
type PartialUser = Partial<User>

// Requied: Object型の全てのプロパティからoptionalを全て取り除いた新しいObject型を生成する
type RequiredUser = Required<PartialUser>

// Record: 最初に指定したプロパティ名で新しいObject型を生成する
type UserRecord = Record<'user', User>
type TestRecord = Record<'key', string>

// Pick: 最初のGenericsに指定したObject型から次にGenericsに指定したプロパティを抽出したObject型を作る
type PickedUser = Pick<User, 'bio'>

// Omit: 指定したプロパティ名を消して新たなObject型を生成する
type OmittedUser = Omit<User, 'age'>

// Exclude<T, U>: T型からUと互換性のある型を消して新たな型を生成する
type X = Exclude<string | undefined, undefined> // string
type Y = Exclude<(() => void) | string, Function> // string

