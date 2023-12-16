export function isObjectsEqual(obj1: Object, obj2: Object) {
	for (const key in obj1) {
		// @ts-ignore
		if (obj1[key] !== obj2[key]) {
			return false
		}
	}
	for (const key in obj2) {
		// @ts-ignore
		if (obj2[key] !== obj1[key]) {
			return false
		}
	}

	return true
}
