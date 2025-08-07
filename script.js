    const colors = {
        GREEN: 'green',
        BLUE: 'blue',
        RED: 'red',
        YELLOW: 'yellow',
        PURPLE: 'pink',
    }

    const model = {
        notes: [],
        showOnlyFavorites: false,
        addNote(title, description, color) {
            const note = {
                // 1. создадим новую заметку
                id: new Date().getTime(),
                title: title,
                description: description,
                color: color || colors.YELLOW,
                isFavorite: false,
            };
            // 2. добавим заметку в начало списка
            this.notes.unshift(note)
                // 3. обновим view
            view.renderNotes(this.notes)
            view.renderNotesCount()
            view.showMessage("Заметка добавлена", 'success')
        },

        addFavorite(noteId) {
            const note = this.notes.find(note => {
                return note.id === noteId
            })
            if (note) {
                note.isFavorite = !note.isFavorite
            }
            view.renderNotes(this.notes)
        },
        deleteNote(noteId) {
            this.notes = this.notes.filter(note => note.id !== noteId)
            view.showMessage("Заметка удалена", 'message-error');
            view.renderNotes(this.notes)
            view.renderNotesCount()
        },
        showFavorites() {
            this.showOnlyFavorites = !this.showOnlyFavorites
            this.updateNotesView()
        },
        updateNotesView() {
            // 1. рендерит список заметок (вызывает метод view.renderNotes)
            // 2. рендерит количество заметок (вызывает метод view.renderNotesCount)
            const notesToShow = this.showOnlyFavorites ? this.notes.filter(note => note.isFavorite) : this.notes; //filter создает новый массив, где true
            view.renderNotes(notesToShow);
            view.renderNotesCount()
        },
    }

    const view = {
        init() {
            this.renderNotes(model.notes)
            model.updateNotesView()


            //элементы формы
            const inputOne = document.querySelector('.input-one')
            const inputTwo = document.querySelector('.input-two')
            const btn = document.querySelector('.btn')


            // Добавляем обработчик события на кнопку
            btn.addEventListener('click', function(event) {
                event.preventDefault()
                const title = inputOne.value.trim()
                const description = inputTwo.value.trim()

                const activeColor = document.querySelector('.circle.is_active');
                const color = activeColor ? activeColor.id : colors.YELLOW;

                if (title && description && title.length < 50) {
                    controller.addNote(title, description, color);
                    inputOne.value = '';
                    inputTwo.value = '';
                }
                if (title.length > 50) {
                    view.showMessage("Максимальная длина заголовка - 50 символов!", 'message-error')
                }
                if (!description) {
                    view.showMessage("Введите описание заметки!", 'message-error')
                }
                if (!title) {
                    view.showMessage("Введите заголовок заметки!", 'message-error')
                }
            })

            //color note
            const colorsCircle = document.querySelectorAll('.circle')
            colorsCircle.forEach(circle => {
                circle.addEventListener('click', function() {
                    // Сначала удаляем класс у всех элементов
                    colorsCircle.forEach(c => c.classList.remove('is_active'));

                    // Затем добавляем только текущему
                    this.classList.add('is_active');
                });
            });

            //обработчики кликов на кнопки удаления и избранного

            //favorite
            const notesList = document.querySelector(".notes-list")
            notesList.addEventListener('click', function(event) {
                if (event.target.classList.contains('heart')) {
                    const noteElement = event.target.closest('.note');
                    const noteId = +noteElement.dataset.id
                    controller.addFavorite(noteId)
                }
            })

            //delete
            notesList.addEventListener('click', function(event) {
                if (event.target.classList.contains('trash')) {
                    const noteElement = event.target.closest('.note');
                    const noteId = +noteElement.dataset.id
                    controller.deleteNote(noteId)
                }
            })

            //checkbox
            const filterBox = document.querySelector('.filter-box')
            filterBox.addEventListener('change', function() {
                controller.showFavorites()
            })
        },
        showMessage(text, type = 'success') {
            const messagesBox = document.getElementById('messages-box');
            const message = document.createElement('div');
            message.className = 'message';
            message.textContent = text;

            //класс в зависимости от типа
            message.classList.add(type === 'success' ? 'message-success' : 'message-error');
            messagesBox.appendChild(message);

            setTimeout(() =>
                message.remove(),
                3000);
        },
        renderNotesCount() {
            const quantity = document.querySelector('.count')
            quantity.textContent = model.notes.length
        },
        renderNotes(notes) {
            // находим контейнер для заметок и рендерим заметки в него
            const notesList = document.querySelector(".notes-list")
            let notesHTML = ''
                //             for (let i = 0; i < notes.length; i++) {
                //                 const note = notes[i]

            //                 notesHTML += `
            //                  <div class="note" data-id="${note.id}">
            //        <div class="note-title ${note.color}">${note.title}
            //            <img class="heart" src="img/${note.isFavorite ? 'heart-active' : 'heart-inactive'}.svg" alt="">
            //            <img class="trash" src="img/trash.svg" alt="">
            //        </div>
            //        <div class="card_descr">${note.description}</div>
            //    </div>`
            //             }

            notes.forEach((note) => {
                notesHTML += `
                 <div class="note" data-id="${note.id}">
       <div class="note-title ${note.color}">${note.title}
<img class="heart" src="img/${note.isFavorite ? 'heart-active' : 'heart-inactive'}.svg" alt="">
           <img class="trash" src="img/trash.svg" alt="">
       </div>
       <div class="card_descr">${note.description}</div>
   </div>`

            })

            notesList.innerHTML = notesHTML

            //рендерим заметки в контейнер (если заметок нет, отображаем соответствующий текст)
            if (notes.length) {
                const text = document.querySelector('.content')
                text.style.display = 'none'

                const checkbox = document.querySelector('.filter-box')
                checkbox.style.display = 'flex'
            } else {
                const text = document.querySelector('.content')
                text.style.display = 'block'

                const checkbox = document.querySelector('.filter-box')
                checkbox.style.display = 'none'
            }
        },
    }

    const controller = {
        addNote(title, description, color) {
            model.addNote(title, description, color)
        },
        addFavorite(noteId) {
            model.addFavorite(noteId)
        },
        deleteNote(noteId) {
            model.deleteNote(noteId)

        },
        showFavorites() {
            model.showFavorites()
        },
    }


    view.init()
