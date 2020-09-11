const filterByType = (type, ...values) => values.filter(value => typeof value === type), // Создание функции которая принимает тип данных и массив данных и возвращает данные соответствующего типа

	hideAllResponseBlocks = () => { // Создание функции которая скрывает все блоки с класом dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // создание массива из псевдомассива блоков с классом dialog__response-block
		responseBlocksArray.forEach(block => block.style.display = 'none'); // Переборка массива которая скрывает все блоки путем установки значение display: none в css стилях
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // Создание функции которая принимает селектор блока, текст сообщения и селектор строки
		hideAllResponseBlocks(); // Вызов функции hideAllResponseBlocks
		document.querySelector(blockSelector).style.display = 'block'; // Отображение блока по переданному селектору путем установки значение display: block в css стилях
		if (spanSelector) { // Проверка есле передан селектор строки то в эту строку записываем переданное сообщение 
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //Создаем функцию демонстрация ошибки которая принимает текст сообщения и вызывает функцию showResponseBlock в которую передает класс блока dialog__response-block_error, текст сообщения и id строки #error

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //Создаем функцию демонстрация результата которая принимает текст сообщения и вызывает функцию showResponseBlock в которую передает класс блока dialog__response-block_ok, текст сообщения и id строки #ok

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //Создаем функцию демонстрация отсутствие результата которая вызывает функцию showResponseBlock в которую передает класс блока dialog__response-block_no-results

	tryFilterByType = (type, values) => { // Создание функции фильтрации по типу данных, которая принимет тип данных и значение 
		try { //Создаем конструкцию перехвата ошибок
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // Объявление переменной valuesArray в которую присваиваем преобразование массива после выполнения функции filterByType, в которую переданы тип данных и значения, и преобразует в строку где каждый элемент массива записан через запятую
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`; // Объявление переменной alertMsg в которую присвоенн результат если значение с таким типом данных существуют или сообщение о том что значений такого типа данных нет 
			showResults(alertMsg); // Вызов функции showResults в которую передается текст сообщения alertMsg
		} catch (e) {
			showError(`Ошибка: ${e}`); // Вызов функции showError в которую переданно сообщение 'Ошибка: «текст ошибки»', если в try возникла ошибка
		}
	};

const filterButton = document.querySelector('#filter-btn'); //Объявление переменной содержащая кнопку с id #filter-btn

filterButton.addEventListener('click', e => { // Установка на кнопку filterButton слушателя событий по клику на кнопку и вызывающий callback функцию в которую передан event 
	const typeInput = document.querySelector('#type'); //Объявляем переменную которая содержит выподающее меню c id #type
	const dataInput = document.querySelector('#data'); ////Объявляем переменную которая содержит поле ввода c id #data

	if (dataInput.value === '') { //Проверяем значение в поле ввода dataInput на пустую строку если условие выполняется то:
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //Вызов подсказки с текстом Поле не должно быть пустым!
		showNoResults(); // Вызов функции showNoResults
	} else { //Если не выполняется то:
		dataInput.setCustomValidity(''); //Удаляем поздсказку
		e.preventDefault(); // Отменяем стандартное поведение браузера
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //закускаем функцию tryFilterByType в которую передаем значенеи выбранного типа данных typeInput и введенной строки в поле dataInput
	}
});

