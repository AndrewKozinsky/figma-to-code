import { nodeNames } from '../../common/nodeNames'

/**
 * Получает узел упражнения и возвращает примечание к русскому предложению.
 * @param exerciseBlockNode — узел упражнения (русское предложение и варианты переводов с разбором)
 */
export function getExerciseRusNote(exerciseBlockNode: FrameNode) {
	const exerciseRusNoteNode = exerciseBlockNode.children.find((childNode) => {
		return childNode.name === nodeNames.exerciseRusNote && childNode.visible
	})

	return exerciseRusNoteNode && exerciseRusNoteNode.type === 'TEXT'
		? exerciseRusNoteNode.characters
		: undefined
}
