export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // код с обработкой очистки поля
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const input = action.closest('label').querySelector('input')
            input.value = ''
            const fieldName = action.dataset.field
            state[fieldName] = ''
        }
        // делаем из totalFrom и totalTo (если имеются) массив и сохраняем его с ключом total
        // const filterState = { ...state }; // Создаём копию состояния, чтобы не мутировать исходный state
        // const from = state.totalFrom
        // const to = state.totalTo
        // if (from || to) {
        //     filterState.total = [from ? Number(from) : null, to ? Number(to) : null]
        //     delete filterState.totalFrom
        //     delete filterState.totalTo
        // }
         
        // @todo: #4.5 — отфильтровать данные, используя компаратор
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }
}