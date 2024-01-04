import { makeLogger } from 'ts-loader/dist/logger'
import ArticleType from '../../types/articleType'
import { isObjectsEqual } from '../../utils/object'
import Config from '../config'

export function parseText(paragraphNode: TextNode): ArticleType.TextElem[] {
	const outputObjArr: ArticleType.TextElem[] = []

	// const paragraphText = paragraphNode.characters.replace(/\s*→\s*/, '→')

	for (let i = 0; i < paragraphNode.characters.length; i++) {
		if (paragraphNode.characters[i] === '→') {
			outputObjArr.push({
				type: 'arrow',
			})

			continue
		}

		const style = paragraphNode.getRangeTextStyleId(i, i + 1)

		// Check if there's a style applicable to that character
		if (style !== figma.mixed && paragraphNode.getRangeFills(i, i + 1)) {
			// Get the fills for this character range
			const fills = paragraphNode.getRangeFills(i, i + 1)
			const weight = paragraphNode.getRangeFontWeight(i, i + 1) as number

			// @ts-ignore
			const color = fills[0].color
			const colorName = getColorName(color)
			const weightName = getWeightName(weight)

			// Если массив пустой или последним элементом стрелка, то считать,
			// что последнего текстового элемента нет и нужно добавлять новый, а не изменять старый
			let lastObj: undefined | ArticleType.TextElem = outputObjArr[outputObjArr.length - 1]
			if (lastObj && lastObj.type === 'arrow') {
				lastObj = undefined
			}

			if (!lastObj || lastObj.color !== colorName || lastObj.weight !== weightName) {
				outputObjArr.push({
					type: 'text',
					color: colorName,
					weight: weightName,
					text: paragraphNode.characters[i],
				})
			} else {
				lastObj.text += paragraphNode.characters[i]
			}
		}
	}

	// Удаление пробельных в конце текста до знака стрелки и в начале текста в тексте после знака стрелки
	for (let i = 0; i < outputObjArr.length; i++) {
		const prevTextObj = outputObjArr[i - 1]
		const currentTextObj = outputObjArr[i]
		const nextTextObj = outputObjArr[i + 1]

		if (currentTextObj.type !== 'text') continue

		if (prevTextObj && prevTextObj.type === 'arrow') {
			currentTextObj.text = currentTextObj.text.replace(/^\s+/, '')
		}
		if (nextTextObj && nextTextObj.type === 'arrow') {
			currentTextObj.text = currentTextObj.text.replace(/\s+$/, '')
		}
	}

	return outputObjArr
}

type ColorObj = {
	r: number
	g: number
	b: number
}

function getColorName(colorObj: ColorObj): ArticleType.TextColor {
	const color = {
		r: Math.round(colorObj.r * 255),
		g: Math.round(colorObj.g * 255),
		b: Math.round(colorObj.b * 255),
	}

	if (isObjectsEqual(color, Config.colors.black)) {
		return 'black'
	} else if (isObjectsEqual(color, Config.colors.blue)) {
		return 'blue'
	} else if (isObjectsEqual(color, Config.colors.gold)) {
		return 'gold'
	} else if (isObjectsEqual(color, Config.colors.error)) {
		return 'error'
	} else {
		return 'gray'
	}
}

function getWeightName(weight: number) {
	return weight < 500 ? 'normal' : 'bold'
}
