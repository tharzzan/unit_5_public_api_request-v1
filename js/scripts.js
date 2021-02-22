//#region Select HTML components & define variables ***********
const body = document.querySelector('body')
const searchContainerDiv = document.getElementsByClassName('search-container')
const galleryDiv = document.getElementById('gallery')

let modalEmpIndex
//#endregion

//#region Generate Basic HTML Structure ***********************
// 1. Search Form
searchContainerDiv[0].innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
    </form>
`
const searchInput = document.getElementById('search-input')


// 2. Pop-up Modal
body.insertAdjacentHTML('beforeend',`
    <div id="modal-container" class="modal-container" hidden="true">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div id="modal-info-container" class="modal-info-container">
            </div>
        </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
`)

const modalContainerDiv = document.getElementById('modal-container')
const modalCloseBtn = document.getElementById('modal-close-btn')
const modalInfoContainerDiv = document.getElementById('modal-info-container')
const modalPrevBtn = document.getElementById('modal-prev')
const modalNextBtn = document.getElementById('modal-next')
//#endregion

//#region Fetch Data from https://randomuser.me/ **************
let employeeList = []
let employeeQty = 0

async function fetchData(url) {
    try {
        const response = await fetch(url)
        const json = await response.json()
        return json
    }
    catch (err) {
        throw `${err} (${url})`
    }
}


function generateEmpCard(arr) {
    arr.map(employee => {
        galleryDiv.insertAdjacentHTML('beforeend',`
            <div class="card" id=${employee.email}>
                <div class="card-img-container">
                    <img class="card-img" src=${employee.picture.medium} alt="${employee.name.title} ${employee.name.first} ${employee.name.last} Photo">
                </div>
                <div class="card-info-container">
                    <h3 class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}</p>
                </div>
            </div>
        `)
    })
}


fetchData('https://randomuser.me/api/?results=12&nat=au,gb,nz,us')
    .then((data) => {
        employeeList = data.results
        employeeQty = employeeList.length
    })
    .then(() => generateEmpCard(employeeList))
//#endregion

//#region Helper Function for Event Listener ******************
function generateModal(i) {
    const pic = employeeList[i].picture.large
    const name = `${employeeList[i].name.first} ${employeeList[i].name.last}`
    const email = employeeList[i].email
    const city = employeeList[i].location.city
    const cellNo = formatCellNo(employeeList[i].cell)
    const address = `${employeeList[i].location.street.number} ${employeeList[i].location.street.name}, ${employeeList[i].location.state} ${employeeList[i].location.postcode}`
    const birthday = `Birthday: ${formatBirthday(employeeList[i].dob.date)}`
    
    // show the modal & display its data
    modalContainerDiv.hidden = ''
    modalInfoContainerDiv.innerHTML = `
        <img class="modal-img" src=${pic} alt=${name} Photo>
        <h3 class="modal-name cap">${name}</h3>
        <p class="modal-text">${email}</p>
        <p class="modal-text cap">${city}</p>
        <hr>
        <p class="modal-text">${cellNo}</p>
        <p class="modal-text">${address}</p>
        <p class="modal-text">${birthday}</p>
    `

    // if modalEmpIndex reach the first, or the last index, then hide prev/next button
    switch (modalEmpIndex) {
        case 0:
            modalPrevBtn.style.display = 'none'
            break;
        case employeeQty-1:
            modalNextBtn.style.display = 'none'
            break;
        default:
            modalPrevBtn.style.display = ''
            modalNextBtn.style.display = ''
            break;
    }
}


/**
 * This function will format the string passed to it into phone number format
 * (XXX) XXX-XXXX
 * @param {string} string - phone number to be formatted
 * @returns formatted cell phone number
 */
function formatCellNo(string) {
    // 1. clean the passed argument from whitespaces, "-" , "(", and ")"
    const unwantedChar = /[\s-()]+/g
    const cleanCellNo = string.replace(unwantedChar,'')

    // 2. group and capture its value
    // 3. format the cleanCellNo into desired format
    const phonePattern = /(\d{3})(\d{3})(\d{4})/
    const formattedCellNo = cleanCellNo.replace(phonePattern, '($1) $2-$3 ')

    return formattedCellNo
}


/**
 * This function will format the string passed to it into birthday format
 * MM/DD/YYYY
 * @param {string} string - date value 
 */
function formatBirthday(string) {
    const birthdayPattern = /(\d{4})-(\d{2})-(\d{2})(.*)/
    const formattedBirthday = string.replace(birthdayPattern,'$2/$3/$1')

    return formattedBirthday
}
//#endregion

//#region Event Listener **************************************
galleryDiv.addEventListener('click', (e) => {
    const containerRegex = /^card-.+-container$/
    let employeeCardDiv

    if (containerRegex.test(e.target.className)) {
        employeeCardDiv = e.target.parentNode
    }
    else {
        employeeCardDiv = e.target.parentNode.parentNode
    }

    const employeeEmail = employeeCardDiv.id

    // find the position of the clicked employee in employeeList
    // and then generate modal to show employee's detail
    for (let i = 0; i < employeeQty; i++){
        if (employeeList[i].email === employeeEmail) {
            modalEmpIndex = i
            generateModal(modalEmpIndex)
        }
    }
})


modalCloseBtn.addEventListener('click', () => {
    modalContainerDiv.hidden = 'true'
    modalInfoContainerDiv.innerHTML = ''
})


searchInput.addEventListener('keyup', (e) => {
    // convert userInput into searchRegex so that the search feature becomes very flexible
    // Example: /.*an.+so.*/i --> will match for 'Joanne Simpson', and 'Hannah Wilson'
    const space = /\s/g
    const userInput = e.target.value
    const searchRegex = new RegExp(`.*${userInput.replace(space,'.+')}.*`, 'i')

    const nameOnCards = document.querySelectorAll('h3.card-name')    
    for (let i = 0; i < nameOnCards.length; i++) {
        const cardDiv = nameOnCards[i].parentNode.parentNode
        
        if(searchRegex.test(nameOnCards[i].textContent)) {
            cardDiv.style.display = ''
        }
        else {
            cardDiv.style.display = 'none'
        }
    }
})

modalNextBtn.addEventListener('click', () => {
    modalEmpIndex++
    generateModal(modalEmpIndex)
})

modalPrevBtn.addEventListener('click', () => {
    modalEmpIndex--
    generateModal(modalEmpIndex)
})
//#endregion





