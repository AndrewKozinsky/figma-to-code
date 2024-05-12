import { nodeNames } from '../../common/nodeNames'
import ExercisesType from '../../types/exercisesType'

type WordObjType = {
	note?: string
	wordsStr: string
}
/**
 * Получает узел упражнения и возвращает массив слов для заучивания.
 * @param exerciseBlockNode — узел упражнения (русское предложение и варианты переводов с разбором)
 */
export function getSentenceWords(exerciseBlockNode: FrameNode): ExercisesType.Word[] {
	let exerciseWordsNode: undefined | FrameNode

	exerciseBlockNode.children.forEach((childNode) => {
		if (
			childNode.name === nodeNames.exerciseWords &&
			childNode.type == 'FRAME' &&
			childNode.visible
		) {
			exerciseWordsNode = childNode
		}
	})

	if (!exerciseWordsNode) return []

	const wordsArr: WordObjType[] = []

	for (let i = 0; i < exerciseWordsNode.children.length; i++) {
		const currentNode = exerciseWordsNode.children[i]
		const nextNode = exerciseWordsNode.children[i + 1]

		// Если есть заметка, то значит дальше идёт строка со словом
		if (
			currentNode.name === nodeNames.exerciseWordNote &&
			currentNode.type === 'TEXT' &&
			currentNode.visible &&
			nextNode.name === nodeNames.exerciseWordText &&
			nextNode.type === 'TEXT'
		) {
			wordsArr.push({
				note: currentNode.characters,
				wordsStr: nextNode.characters,
			})

			i++
		}
		// Если заметки нет, а только строка со словом
		else if (currentNode.name === nodeNames.exerciseWordText && currentNode.type === 'TEXT') {
			wordsArr.push({
				wordsStr: currentNode.characters,
			})
		}
	}

	return wordsArr.map((wordObj) => {
		return getWordObj(wordObj)
	})
}

function getWordObj(WordObj: WordObjType): ExercisesType.Word {
	// Разрубить строку счастливый → happy → ˈhæpɪ на три части
	const wordsArr = WordObj.wordsStr.split(/\s*→\s*/)

	return {
		note: WordObj.note,
		rusWord: wordsArr[0],
		engWord: wordsArr[1],
		transcription: wordsArr[2],
	}
}
