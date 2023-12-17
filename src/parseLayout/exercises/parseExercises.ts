import { nodeNames } from '../../common/nodeNames'
import ExercisesType from '../../types/exercisesType'
import { getEngSentences } from './engSentences'
import { getExerciseRusNote } from './getNote'
import { getRusSentenceText } from './getRusSentence'
import { getSentenceWords } from './getSentenceWords'

/**
 * Получает узел страницы и порядковый номер набора упражнений,
 * который используется для прохождения упражнения при нажатии на кнопку
 * и его нужно превратить в объект данных.
 * @param pageNode — узел страницы
 * @param exerciseIdx — порядковый номер набора упражнений начиная с нуля
 * @param hasOffset — нужно ли делать отступ
 */
function parseExercises(
	pageNode: FrameNode,
	exerciseIdx: number,
	hasOffset: boolean,
): null | ExercisesType.Exercises {
	const exBlockNodes = getExerciseBlockNodes(pageNode, exerciseIdx)
	const exercisesData = convertNodesToDataExercise(pageNode, exBlockNodes)

	return {
		type: 'exercises',
		id: exerciseIdx,
		exercises: exercisesData,
		offset: hasOffset,
	}
}

export default parseExercises

/**
 * Возвращает узлы с упражнениями (упражнение на русском и все варианты с разборами) конкретного набора.
 * @param pageNode — узел страницы
 * @param exerciseIdx — индекс требуемого ряда упражнений
 */
function getExerciseBlockNodes(pageNode: FrameNode, exerciseIdx: number): undefined | FrameNode[] {
	// Перебрать детей страницы и найти страницу упражнений
	const exercisesPageNode = pageNode.children.find((childNode) => {
		return childNode.name === nodeNames.exercisesPage
	})
	if (!exercisesPageNode || exercisesPageNode.type !== 'FRAME') return

	const exercisesRows = exercisesPageNode.children.filter((childNode) => {
		return childNode.name === nodeNames.exercisesRow
	})

	const exercisesRow = exercisesRows[exerciseIdx]
	if (!exercisesRow || exercisesRow.type !== 'FRAME') return

	return exercisesRow.children.filter((childNode) => {
		return childNode.name === nodeNames.exercisesBlock && exercisesPageNode.type === 'FRAME'
	}) as FrameNode[]
}

/**
 * Получает узлы с упражнениями и формирует массив данных для отрисовки упражнений
 * @param pageNode — узел страницы
 * @param exBlockNodes — узлы с упражнениями
 */
function convertNodesToDataExercise(
	pageNode: FrameNode,
	exBlockNodes: FrameNode[] | undefined,
): ExercisesType.Exercise[] {
	if (!exBlockNodes) return []

	return exBlockNodes.map((exerciseBlockNode) => {
		return {
			// Какое-то примечание выше предложения
			note: getExerciseRusNote(exerciseBlockNode),
			// Предложение на русском языке
			rusSentence: getRusSentenceText(exerciseBlockNode),
			// Правильные и неправильные варианты переводов
			engSentences: getEngSentences(pageNode, exerciseBlockNode),
			// Слова этого предложения
			words: getSentenceWords(exerciseBlockNode),
		}
	})
}
