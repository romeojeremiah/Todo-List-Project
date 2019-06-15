//add an eventListener to the from
const form = document.querySelector('#itemForm'); // select form
const itemInput = document.querySelector('#itemInput'); // select input box from form
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');
const clearButton = document.querySelector('#clear-list');

let todoItems = [];

const handleItem = function(item){

    const completeItem = document.querySelector('.complete-item');
    const editItem = document.querySelector('.edit-item');
    const deleteItem= document.querySelector('.delete-item');

    completeItem.addEventListener('click', function(){
        console.log(this);
        this.classList.toggle('completed');
    });

    deleteItem.addEventListener('click', function(){
        console.log(this);
        removeItem(item);
        if (todoItems.length === 0){
            todoItems = [];
            setLocalStorage(todoItems);

        } else {
            setLocalStorage(todoItems);
        }
        
        getList(todoItems);
    })


}

const removeItem = function(item){
    console.log(item);
    const removeIndex = (todoItems.indexOf(item));
    console.log(removeIndex);
    todoItems.splice(removeIndex, 1);
}

const getList = function(todoItems){
    itemList.innerHTML = '';

        todoItems.forEach(function(item){
            const p = document.createElement('p');

            p.innerHTML = `<div class="item my-3"><h5 class="item-name text-capitalize">${item}</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>`
            itemList.appendChild(p);  
            debugger;
            
        });
}

const getLocalStorage = function(){

    const storage = localStorage.getItem('todoItems');
    if (storage === 'undefined' || storage === null){
        todoItems = [];
    } else {
        todoItems = JSON.parse(storage);
        getList(todoItems);
    }
}

const setLocalStorage = function(todoItems){
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

// get local storage from page
getLocalStorage();

//add an item to the List, including to local storage
form.addEventListener('submit', function(e){ 
    e.preventDefault();
    const itemName = itemInput.value;
    
    if (itemName.length === 0){
        feedback.innerHTML = 'Please Enter Valid Value';
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(
            function(){
                feedback.classList.remove('showItem');
                }, 3000);
    } else {
        todoItems.push(itemName);
        setLocalStorage(todoItems);
        handleItem(itemName);

        getList(todoItems);
    }
    
    

    itemInput.value = '';

    });

    //clear all items from the list
clearButton.addEventListener('click', function(){
    todoItems = [];
    localStorage.clear();
    getList(todoItems);
})



  

