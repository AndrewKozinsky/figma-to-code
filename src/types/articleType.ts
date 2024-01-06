import ExercisesType from './exercisesType'

namespace ArticleType {
	// Данные статьи
	export type Article = {
		meta: ArticleMeta
		// Содержимое статьи
		content: Content
	}

	// Метаданные статьи
	export type ArticleMeta = {
		// Порядковый номер статьи
		number: number
		// Название статьи в адресной строке ('toBe')
		slug: string
		// Название статьи ('Глагол to be из данных')
		articleName: string
		// Описание статьи
		articleDescription: string
		// Платная статья?
		isPaid: boolean
		// Статья опубликована?
		isPublished: boolean
	}

	// Содержимое статьи
	export type Content = (
		| Header
		| Paragraph
		| List
		| Note
		| CustomComponent
		| ExercisesType.Exercises
		| Faq
		| Grid
	)[]

	// Заголовок
	export type Header = {
		type: 'header'
		// Тег
		tag: HeaderTag
		// Стиль тега
		style: HeaderStyle
		// Текст заголовка
		text: string
	}
	export type HeaderTag = 'h2' | 'h3' | 'h4'
	export type HeaderStyle = 'h2' | 'h3' | 'h4'

	// Абзац. Включает в себя строковые элементы.
	export type Paragraph = {
		type: 'paragraph'
		// Должен ли быть отступ от верхнего элемента
		offset?: boolean
		// Размер текста
		textSize?: ParagraphSize
		children: TextElem[]
	}
	export type ParagraphSize = 'small' | 'normal' | 'big' | 'giant'

	// Список. Включает в себя блочные элементы.
	export type List = {
		type: 'list'
		// Нумерованный или ненумерованный список?
		listType: 'numbers' | 'dots'
		children: Paragraph[]
	}

	export type TextElem = Text | ArrowText

	// Текст. Строковый элемент помещаемый в абзац.
	export type Text = {
		type: 'text'
		// Стиль текста
		color?: TextColor
		// Жирность текста
		weight?: 'normal' | 'bold'
		text: string
	}
	export type TextColor = 'black' | 'blue' | 'gold' | 'error' | 'gray'

	// Текст. Строковый элемент помещаемый в абзац.
	export type ArrowText = {
		type: 'arrow'
	}

	// Заметка. Может включать весь доступный контент: заголовки, абзацы, грамматические таблицы.
	export type Note = {
		type: 'note'
		// Стиль заметки
		noteStyle?: 'gray' | 'yellow'
		children: Content
	}

	// Нестандартный компонент статьи
	export type CustomComponent = {
		type: 'customComponent'
		component: any // На самом деле ReactNode
	}

	// Вопросы и ответы.
	export type Faq = {
		type: 'faq'
		items: FaqItem[]
	}
	export type FaqItem = {
		question: { type: 'ReactNode'; value: Content }
		answer: { type: 'ReactNode'; value: Content }
	}

	// Сетка с горизонтальными колонками.
	export type Grid = {
		type: 'grid'
		// Должен ли быть отступ от верхнего элемента
		offset?: boolean
		cells: Content[]
	}
}

export default ArticleType
