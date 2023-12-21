import { makeLogger } from 'ts-loader/dist/logger'
import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import ExercisesType from '../../types/exercisesType'
import parseArticleContent from '../content/parseArticleContent'

/**
 * Получает узел упражнения и возвращает массив английских вариантов предложений с анализом.
 * @param pageNode — узел страницы
 * @param exerciseBlockNode — узел упражнения (русское предложение и варианты переводов с разбором)
 */
export function getEngSentences(
	pageNode: FrameNode,
	exerciseBlockNode: FrameNode,
): ExercisesType.EngSentence[] {
	// Получение узла с английским предложением и анализом
	const exerciseAnalysisNode = exerciseBlockNode.children.filter((childNode) => {
		return childNode.name === nodeNames.exerciseAnalysis
	})
	if (!exerciseAnalysisNode) return []

	const engSentences: ExercisesType.EngSentence[] = []

	exerciseAnalysisNode.forEach((analysisNode) => {
		const engSentence = getEngSentence(pageNode, analysisNode as FrameNode)
		if (engSentence) {
			engSentences.push(engSentence)
		}
	})

	return engSentences
}

function getEngSentence(
	pageNode: FrameNode,
	analysisNodeRoot: FrameNode,
): void | ExercisesType.EngSentence {
	// Получение узла с английским предложением
	const exerciseEngNode = analysisNodeRoot.children.find((childNode) => {
		return childNode.name === nodeNames.exerciseEng
	})
	if (!exerciseEngNode || exerciseEngNode.type !== 'TEXT') {
		return
	}

	const exerciseEngText = exerciseEngNode.characters

	// Получение узла с анализом английского предложения
	const analysisNode = analysisNodeRoot.children.find((childNode) => {
		return childNode.name === nodeNames.exerciseAnalysisContent
	})

	let analysis: undefined | ArticleType.Content = undefined
	if (analysisNode && analysisNode.type === 'FRAME') {
		analysis = parseArticleContent(pageNode, analysisNode.children)
	}

	return {
		engSentence: exerciseEngText,
		isCorrect: isCorrectExercise(exerciseEngNode),
		analysis,
	}
}

function isCorrectExercise(exerciseEngNode: SceneNode) {
	if (exerciseEngNode.type !== 'TEXT') {
		return false
	}

	// @ts-ignore
	const { color } = exerciseEngNode.fills[0]

	return (
		Math.round(color.r * 255) === 0 &&
		Math.round(color.g * 255) === 129 &&
		Math.round(color.b * 255) === 0
	)
}
