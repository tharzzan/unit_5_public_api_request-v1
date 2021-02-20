//#region Selecting HTML components ***************************
const body = document.querySelector('body')
const searchContainerDiv = document.getElementsByClassName('search-container')
const galleryDiv = document.getElementById('gallery')
//#endregion

//#region Generate Search Form ********************************
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


searchContainerDiv[0].innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`
//#endregion


//#region Fetch Data from https://randomuser.me/ **************

const userData = fetch('https://randomuser.me/api/?results=12')
                    .then((response) => response.json())
                    .then((data) => generateEmpCard(data.results))


function generateEmpCard(arr) {
    arr.map(employee => {
        const cardDiv = appendTo(galleryDiv, 'div', {
            className: 'card'
        })

        const cardImageDiv = appendTo(cardDiv, 'div', {
            className: 'card-img-container'
        })

        appendTo(cardImageDiv, 'img', {
            className: 'card-img',
            src: employee.picture.medium,
            alt: `${employee.name.title} ${employee.name.first} ${employee.name.last}`
        })

        const cardInfoDiv = appendTo(cardDiv, 'div', {
            className: 'card-info-container'
        })

        appendTo(cardInfoDiv, 'h3', {
            id: 'name',
            className: 'card-name cap',
            textContent: `${employee.name.first} ${employee.name.last}`
        })

        appendTo(cardInfoDiv, 'p', {
            className: 'card-text',
            textContent: `${employee.email}`
        })

        appendTo(cardInfoDiv, 'p', {
            className: 'card-text cap',
            textContent: `${employee.location.city} ${employee.location.state}`
        })
    })
}








// -------------------- ini semua perlu di buat secara dynamic


// const modalContainerDiv = appendTo(body, 'div', {
//     className: 'modal-container'
// })

// const modalDiv = appendTo(modalContainerDiv, 'div', {
//     className: 'modal'
// })

// // const modalCloseBtn = 
// appendTo(modalDiv, 'button', {
//     type: 'button',
//     id: 'modal-close-btn',
//     className: 'modal-close-btn',
//     innerHTML: '<strong>X</strong>'
// })

// const modalInfoDiv = appendTo(modalDiv, 'div', {
//     className: 'modal-info-container'
// })

// appendTo(modalInfoDiv, 'img', {
//     className: 'modal-img',
//     src: 'https://placehold.it/125x125',
//     alt: 'profile picture'
// })

// appendTo(modalInfoDiv, 'h3', {
//     id: 'name',
//     className: 'modal-name cap',
//     textContent: 'name'
// })

// appendTo(modalInfoDiv, 'p', {
//     className: 'modal-text',
//     textContent: 'email'
// })

// appendTo(modalInfoDiv, 'p', {
//     className: 'modal-text cap',
//     textContent: 'city'
// })

// appendTo(modalInfoDiv, 'hr')

// appendTo(modalInfoDiv, 'p', {
//     className: 'modal-text',
//     textContent: '(555) 555-5555'
// })

// appendTo(modalInfoDiv, 'p', {
//     className: 'modal-text',
//     textContent: '123 Portland Ave., Portland, OR 97204'
// })

// appendTo(modalInfoDiv, 'p', {
//     className: 'modal-text',
//     textContent: 'Birthday: 10/21/2015'
// })

// const modalBtnContainerDiv = appendTo(modalContainerDiv, 'div', {
//     className: 'modal-btn-container'
// })

// appendTo(modalBtnContainerDiv, 'button', {
//     type: 'button',
//     id: 'modal-prev',
//     className: 'modal-prev btn',
//     textContent: 'Prev'
// })

// appendTo(modalBtnContainerDiv, 'button', {
//     type: 'button',
//     id: 'modal-next',
//     className: 'modal-next btn',
//     textContent: 'Next'
// })

