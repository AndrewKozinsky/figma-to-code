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
	// Получение узлов с вариантами перевода на английский и анализом
	const analysisNodes = exerciseBlockNode.children.filter((childNode) => {
		return childNode.name === nodeNames.exerciseAnalysis && childNode.visible
	})

	const engSentences: ExercisesType.EngSentence[] = []

	analysisNodes.forEach((analysisNode) => {
		// Строковый массив похожих переводов к которым подходит один и тот же анализ
		const engSentence = getEngSentence(pageNode, analysisNode as FrameNode)

		if (engSentence) {
			engSentences.push(engSentence)
		}
	})

	return engSentences
}

/**
 * Разбор узла с похожими переводами на английский и одного анализа подходящих под них
 * @param pageNode — ссылка на страницу
 * @param analysisNodeRoot — узел переводов и анализа вариантов
 */
function getEngSentence(
	pageNode: FrameNode,
	analysisNodeRoot: FrameNode,
): void | ExercisesType.EngSentence {
	const { engSentenceTexts, isCorrect } = getAnalysisEngTranslateVariants(analysisNodeRoot)

	// Получение узла с анализом английского предложения
	const analysisNode = analysisNodeRoot.children.find((childNode) => {
		return childNode.name === nodeNames.exerciseAnalysisContent
	})

	let analysis: undefined | ArticleType.Content = undefined
	if (analysisNode && analysisNode.type === 'FRAME' && analysisNode.visible) {
		analysis = parseArticleContent(pageNode, analysisNode.children)
	}

	return {
		engSentences: engSentenceTexts,
		isCorrect,
		analysis,
	}
}

function getAnalysisEngTranslateVariants(analysisNodeRoot: FrameNode) {
	// Получение фрейма с вариантами английского предложения
	const exerciseEngVariantsFrame = analysisNodeRoot.children.find((childNode) => {
		return childNode.name === nodeNames.exerciseEngVariants
	})

	if (!exerciseEngVariantsFrame || exerciseEngVariantsFrame.type !== 'FRAME') {
		return {
			engSentenceTexts: [],
			isCorrect: false,
		}
	}

	const engSentencesNodes = exerciseEngVariantsFrame.children.filter((textNode) => {
		return textNode.type === 'TEXT' && textNode.name === nodeNames.exerciseEng
	}) as TextNode[]

	const engSentenceTexts = engSentencesNodes.map((engTextNode) => {
		return engTextNode.characters
	})

	return {
		engSentenceTexts,
		isCorrect: isCorrectExercise(engSentencesNodes),
	}
}

function isCorrectExercise(exerciseEngNodes: SceneNode[]) {
	if (!exerciseEngNodes.length) return false
	const exerciseEngNode = exerciseEngNodes[0]

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
