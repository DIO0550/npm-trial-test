"use strict";
/**
 * My TypeScript Library
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
exports.addAge = addAge;
exports.power = power;
/**
 * 挨拶のメッセージを返す関数
 * @param name 挨拶する相手の名前
 * @returns 挨拶メッセージ
 */
function addAge(person) {
    return Object.assign(Object.assign({}, person), { age: person.age + 1 });
}
/**
 * 数値を合計する関数
 * ES2016では ** 演算子（累乗）が使えます
 * @param base ベースとなる数値
 * @param exponent 累乗の指数
 * @returns 計算結果
 */
function power(base, exponent) {
    return base ** exponent; // ES2016の機能
}
// 名前空間でライブラリを構造化することもできます
var Utils;
(function (Utils) {
    function formatDate(date) {
        return date.toISOString();
    }
    Utils.formatDate = formatDate;
})(Utils || (exports.Utils = Utils = {}));
