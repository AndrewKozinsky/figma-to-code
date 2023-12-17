import { nodeNames } from '../../common/nodeNames'
import ExercisesType from '../../types/exercisesType'

/**
 * Получает узел упражнения и возвращает массив слов для заучивания.
 * @param exerciseBlockNode — узел упражнения (русское предложение и варианты переводов с разбором)
 */
export function getSentenceWords(exerciseBlockNode: FrameNode): ExercisesType.Word[] {
	const wordsSubsequenceNodes = exerciseBlockNode.children.filter((node) => {
		return node.name === nodeNames.exerciseWords && node.type === 'TEXT'
	})

	return wordsSubsequenceNodes.map((wordsNode) => {
		const wordsStr = wordsNode.type === 'TEXT' ? wordsNode.characters : ''

		return getWordObj(wordsStr)
	})
}

function getWordObj(wordsStr: string): ExercisesType.Word {
	// Разрубить строку счастливый → happy → ˈhæpɪ на три части
	const wordsArr = wordsStr.split(/\s*→\s*/)

	return {
		note: 'note',
		rusWord: wordsArr[0],
		engWord: wordsArr[1],
		transcription: wordsArr[2],
	}
}
