import { nodeNames } from '../../common/nodeNames'

/**
 * Получает узел упражнения и возвращает примечание к русскому предложению.
 * @param exerciseBlockNode — узел упражнения (русское предложение и варианты переводов с разбором)
 */
export function getExerciseRusNote(exerciseBlockNode: FrameNode) {
	if (!exerciseBlockNode.visible) return

	const exerciseRusNoteNode = exerciseBlockNode.children.find((childNode) => {
		return childNode.name === nodeNames.exerciseRusNote
	})

	return exerciseRusNoteNode && exerciseRusNoteNode.type === 'TEXT'
		? exerciseRusNoteNode.characters
		: undefined
}
