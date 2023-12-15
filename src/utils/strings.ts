export function snakeToCamel(str: string) {
	return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
}
