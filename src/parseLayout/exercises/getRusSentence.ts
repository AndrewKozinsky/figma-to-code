import { nodeNames } from '../../common/nodeNames'

/**
 * Получает узел упражнения и возвращает русское предложение.
 * @param exerciseBlockNode — узел упражнения (русское предложение и варианты переводов с разбором)
 */
export function getRusSentenceText(exerciseBlockNode: FrameNode) {
	const exerciseRusNode = exerciseBlockNode.children.find((childNode) => {
		return childNode.name === nodeNames.exerciseRus
	})

	return exerciseRusNode && exerciseRusNode.type === 'TEXT' ? exerciseRusNode.characters : ''
}
