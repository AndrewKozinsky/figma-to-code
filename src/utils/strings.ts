export function snakeToCamel(str: string) {
	return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
}

/**
 * Функция возвращает слово в зависимости от числа, которое стоит до него
 * @param {Number} number — число
 * @param {String} one — слово стоящее после числа 1
 * @param {String} two — слово стоящее после числа 2, 3 и 4
 * @param {String} five — слово стоящее после числа 5 и далее
 */
export function getRusNounByNumber(number: number, one: string, two: string, five: string) {
	let n = Math.abs(number)
	n %= 100
	if (n >= 5 && n <= 20) {
		return five
	}
	n %= 10
	if (n === 1) {
		return one
	}
	if (n >= 2 && n <= 4) {
		return two
	}
	return five
}
