
const addButton = document.querySelectorAll('.id')

for (let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener('click', () => {

        document.querySelector('#id').value = addButton[i].value
    })
}


const deleteButton = document.querySelectorAll('.delete')

for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', () => {
        document.querySelector('#delete').value = addButton[i].value
    })
}



