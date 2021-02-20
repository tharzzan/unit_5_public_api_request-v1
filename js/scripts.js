//#region Selecting HTML components ***************************
const body = document.querySelector('body')
const searchContainerDiv = document.getElementsByClassName('search-container')
const galleryDiv = document.getElementById('gallery')
//#endregion

//#region Generate HTML components ****************************
/**
 * Create HTML Elements
 * @param {string} elementType - The type of element to be created 
 * @param {object} properties - properties of the new element
 * @returns {element}
 */
function createElement(elementType, properties) {
    const element = document.createElement(elementType)

    for (const key in properties) {
        element[key] = properties[key]
    }
    return element
}

/**
 * This function will first call createElement() function to create new child Element.
 * And after that, append that child element to the parent element
 * @param {element} parentEl - parent HTML Element
 * @param {string} childEl  - element type to be created
 * @param {object} childProp - properties of the child element
 * @returns {element}
 */
function appendTo(parentEl, childEl, childProp) {
    const element = createElement(childEl, childProp)
    parentEl.appendChild(element)

    return element
}

const searchForm = appendTo(searchContainerDiv[0], 'form', {
    action: '#',
    method: 'get'
})

// const searchInput = 
appendTo(searchForm, 'input', {
    type: 'search',
    id: 'search-input',
    className: 'search-input',
    placeholder: 'Search ...'
})

// const searchSubmit = 
appendTo(searchForm, 'input', {
    type: 'submit',
    value: '&#x1F50D;',
    id: 'search-submit',
    className: 'search-submit'
})

const cardDiv = appendTo(galleryDiv, 'div', {
    className: 'card'
})

const cardImageDiv = appendTo(cardDiv, 'div', {
    className: 'card-img-container'
})

// const cardImg = 
appendTo(cardImageDiv, 'img', {
    className: 'card-img',
    src: 'https://placehold.it/90x90',
    alt: 'profile picture'
})

const cardInfoDiv = appendTo(cardDiv, 'div', {
    className: 'card-info-container'
})

// const nameH3 = 
appendTo(cardInfoDiv, 'h3', {
    id: 'name',
    className: 'card-name cap',
    textContent: 'first last'
})

// const emailP = 
appendTo(cardInfoDiv, 'p', {
    className: 'card-text',
    textContent: 'email'
})

// const cityP = 
appendTo(cardInfoDiv, 'p', {
    className: 'card-text cap',
    textContent: 'city, state'
})

const modalContainerDiv = appendTo(body, 'div', {
    className: 'modal-container'
})

const modalDiv = appendTo(modalContainerDiv, 'div', {
    className: 'modal'
})

// const modalCloseBtn = 
appendTo(modalDiv, 'button', {
    type: 'button',
    id: 'modal-close-btn',
    className: 'modal-close-btn',
    innerHTML: '<strong>X</strong>'
})

const modalInfoDiv = appendTo(modalDiv, 'div', {
    className: 'modal-info-container'
})

appendTo(modalInfoDiv, 'img', {
    className: 'modal-img',
    src: 'https://placehold.it/125x125',
    alt: 'profile picture'
})

appendTo(modalInfoDiv, 'h3', {
    id: 'name',
    className: 'modal-name cap',
    textContent: 'name'
})

appendTo(modalInfoDiv, 'p', {
    className: 'modal-text',
    textContent: 'email'
})

appendTo(modalInfoDiv, 'p', {
    className: 'modal-text cap',
    textContent: 'city'
})

appendTo(modalInfoDiv, 'hr')

appendTo(modalInfoDiv, 'p', {
    className: 'modal-text',
    textContent: '(555) 555-5555'
})

appendTo(modalInfoDiv, 'p', {
    className: 'modal-text',
    textContent: '123 Portland Ave., Portland, OR 97204'
})

appendTo(modalInfoDiv, 'p', {
    className: 'modal-text',
    textContent: 'Birthday: 10/21/2015'
})

const modalBtnContainerDiv = appendTo(modalContainerDiv, 'div', {
    className: 'modal-btn-container'
})

appendTo(modalBtnContainerDiv, 'button', {
    type: 'button',
    id: 'modal-prev',
    className: 'modal-prev btn',
    textContent: 'Prev'
})

appendTo(modalBtnContainerDiv, 'button', {
    type: 'button',
    id: 'modal-next',
    className: 'modal-next btn',
    textContent: 'Next'
})

//#endregion