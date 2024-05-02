import ArticleType from './articleType'

namespace ExercisesType {
	export type Exercises = {
		type: 'exercises'
		id: number
		exercises: Exercise[]
		// Должен ли быть отступ от верхнего элемента
		offset?: boolean
	}

	export type Exercise = {
		// Какое-то примечание выше предложения
		note?: string
		// Предложение на русском языке
		rusSentence: string
		// Правильные и неправильные варианты переводов
		engSentences: EngSentence[]
		// Слова этого предложения
		words?: Word[]
	}

	// Перевод предложения на английская
	export type EngSentence = {
		// Текст похожих предложений на английском
		engSentences: string[]
		// Правильное?
		isCorrect: boolean
		// Разбор предложения
		analysis?: ArticleType.Content
	}

	// Слово из предложения
	export type Word = {
		note?: string
		rusWord: string
		engWord: string
		transcription?: string
	}
}

export default ExercisesType
