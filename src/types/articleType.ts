// import React, { ReactNode } from 'react'
// import ExercisesType from './exercisesType'

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
	/*export type Content = (
		| Header
		| Paragraph
		| List
		| Note
		| GrammarTable
		| ExercisesType.Exercises
		| CustomComponent
	)[]*/
	export type Content = (Header | Paragraph)[]

	// Заголовок
	export type Header = {
		type: 'header'
		// Тег
		tag: 'h2' | 'h3' | 'h4'
		// Стиль тега
		style: 'h2' | 'h3' | 'h4'
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
	/*export type List = {
		type: 'list'
		// Нумерованный или ненумерованный список?
		listType: 'numbers' | 'dots'
		children: Paragraph[]
	}*/

	export type TextElem = Text | ArrowText

	// Текст. Строковый элемент помещаемый в абзац.
	export type Text = {
		type: 'text'
		// Стиль текста
		color?: 'normal' | 'blue' | 'gold' | 'error' | 'gray'
		// Жирность текста
		weight?: 'normal' | 'bold'
		text: string
	}

	// Текст. Строковый элемент помещаемый в абзац.
	export type ArrowText = {
		type: 'arrow'
	}

	// Заметка. Может включать весь доступный контент: заголовки, абзацы, грамматические таблицы.
	/*export type Note = {
		type: 'note'
		// Стиль заметки
		noteStyle?: 'gray' | 'yellow'
		children: NoteChildren
	}*/
	// export type NoteChildren = (Header | Paragraph | GrammarTable)[]

	// Грамматическая таблица.
	/*export type GrammarTable = {
		type: 'grammarTable'
		// Тип грамматики:
		// personalPronouns — личные местоимения
		// toBePresent — to be в настоящем времени
		// possessivePronouns — притяжательные местоимения
		// presentSimple — Present Simple
		grammarType: 'personalPronouns' | 'toBePresent' | 'possessivePronouns' | 'presentSimple'
	}*/

	// Нестандартный компонент статьи
	/*export type CustomComponent = {
		type: 'customComponent'
		component: ReactNode
	}*/
}

export default ArticleType
