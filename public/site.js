const menuListEl = document.querySelector(".menu-list")
const eventListEl = document.querySelector(".event-list")
const submitMenuItemEl = document.querySelector("#add-menu-item")
const submitEventEl = document.querySelector("#add-event")



/////////////GET EVENTS AND MENU////////////////
//get all menu items
const getMenu = async () => {
    const response = await fetch('/api/v1/menu')
    return await response.json()
}

//get all event items
const getEvents = async () => {
    const response = await fetch('/api/v1/events')
    return await response.json()
}

//add new menu item
const addMenuItem = async (newItemName, newItemDescr, newItemPrice) => {
    fetch('api/v1/menu', {
        method: "POST",
        body: JSON.stringify({
            name: newItemName,
            description: newItemDescr,
            price: newItemPrice
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

const addEventItem = async(newEventName, newEventLocation, newEventDate, newEventTime) => {
    fetch('api/v1/events', {
        method: "POST",
        body: JSON.stringify({
            name: newEventName,
            location: newEventLocation,
            date: newEventDate,
            time: newEventTime
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
}

///////////APPEND EVENTS AND MENU TO PAGE////////
const showMenuList = menu => {
    menu?.forEach(({id, name, description, price, url}) => {
        const menuItem = document.createElement("div")
        menuItem.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <img src=${url} width=150px height=150px></img>
        <h4>$${price}</h4>`

        //console.log(name)
        menuListEl.appendChild(menuItem)
        
    });
}

const showEventList = events => {
    events?.forEach(({id, name, location, date, time}) => {
        const eventItem = document.createElement("div")
        eventItem.innerHTML = `
        <h3>${name}</h3>
        <p>${location}</p>
        <h4>${date} ${time}</h4>`

        eventListEl.appendChild(eventItem)
    })
}
///////////////////////////////////////////////////




//call menu and events on page load
;(async () => {
    const menu = await getMenu()
    const events = await getEvents()
    showMenuList(menu)
    showEventList(events)

})()


submitMenuItemEl.addEventListener('click', () => {
    
    //get element values
    const itemNameInput = document.getElementById('menu-item-name')
    const itemDescrInput = document.getElementById('menu-item-description')
    const itemPriceInput = document.getElementById('menu-item-price')
    const itemNameInputValue = itemNameInput.value;
    const itemDescrInputValue = itemDescrInput.value;
    const itemPriceInputValue = itemPriceInput.value;

    //calll add
    addMenuItem(itemNameInputValue, itemDescrInputValue, itemPriceInputValue)

})

submitEventEl.addEventListener('click', () => {
    //get element values
    const eventNameInput = document.getElementById('event-name')
    const eventLocationInput = document.getElementById('event-location')
    const eventDateInput = document.getElementById('event-date')
    const eventTimeInput = document.getElementById('event-time')

    const eventNameInputValue = eventNameInput.value
    const eventLocationInputValue = eventLocationInput.value
    const eventDateInputValue = eventDateInput.value
    const eventTimeInputValue = eventTimeInput.value

    //call add
    console.log(eventNameInputValue, eventLocationInputValue, eventDateInputValue, eventTimeInputValue)
    addEventItem(eventNameInputValue, eventLocationInputValue, eventDateInputValue, eventTimeInputValue)
})

