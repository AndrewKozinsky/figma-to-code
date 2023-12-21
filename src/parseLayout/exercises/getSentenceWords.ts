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
	const wordsArr: WordObjType[] = []

	exerciseBlockNode.children.forEach((node) => {
		const wordsObj: WordObjType = {
			note: undefined,
			wordsStr: '',
		}

		if (node.name === nodeNames.exerciseWordNote && node.type === 'TEXT') {
			wordsObj.note = node.characters
		}
		if (node.name === nodeNames.exerciseWords && node.type === 'TEXT') {
			wordsObj.wordsStr = node.characters
		}
	})

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
