/**
 * My TypeScript Library
 */

export interface Person {
  name: string;
  age: number;
}

/**
 * 挨拶のメッセージを返す関数
 * @param name 挨拶する相手の名前
 * @returns 挨拶メッセージ
 */
export function addAge(person: Person): Person {
  return { ...person, age: person.age + 1 };
}

/**
 * 数値を合計する関数
 * ES2016では ** 演算子（累乗）が使えます
 * @param base ベースとなる数値
 * @param exponent 累乗の指数
 * @returns 計算結果
 */
export function power(base: number, exponent: number): number {
  return base ** exponent; // ES2016の機能
}

// 名前空間でライブラリを構造化することもできます
export namespace Utils {
  export function formatDate(date: Date): string {
    return date.toISOString();
  }
}
