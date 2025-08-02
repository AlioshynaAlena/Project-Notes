const MOCK_NOTES = [{
            id: 1,
            title: 'Работа с формами',
            content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
            color: colors.YELLOW,
            isFavorite: false,
        },
        // ...
    ]
    //словарь цветов
const colors = {
    GREEN: 'green',
    BLUE: 'blue',
    RED: 'red',
    YELLOW: 'yellow',
    PURPLE: 'purple',
}

const model = {
    notes: MOCK_NOTES,
}
const view = {
    renderNotes(notes) {
        // your code here
        // находим контейнер для заметок и рендерим заметки в него (если заметок нет, отображаем соответствующий текст)
        // также здесь можно будет повесить обработчики кликов на кнопки удаления и избранного
    }
}
