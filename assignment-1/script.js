let bookStores = getStorage();
let deleteBookStoreId = null;

function filterBookStore(keyword) {
    let items = bookStores.filter((bookStore) => {
        return bookStore.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });
    innerHTMLById('bookstore', getContentRow(items));
}

function addBookStore() {
    let name = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    let topic = document.getElementById('topic').value;
    bookStores.push({
        id: Date.now(),
        name: name,
        author: author,
        topic: topic
    });
    clearStorage();
    setStorage();
    clearFormBookStore();
    renderTable();
    hideDialogAddBookStore();
}

function deleteBookStore(index) {
    bookStores.splice(index, 1);
    clearStorage();
    setStorage();
    renderTable();
    hideDialogAddBookStore();
}

function showDialogAddBookStore() {
    let button = document.getElementById('btn-add');
    button.addEventListener('click', function () {
        document.querySelector('.box-dialog').style.display = 'flex';
        document.querySelector('.dialog').style.display = 'block';
    })
}

function hideDialogAddBookStore() {
    let boxBoxDialog = document.getElementsByClassName('box-dialog');
    for (let i= 0; i < boxBoxDialog.length; i++) {
        boxBoxDialog[i].style.display = 'none';
    }

    let boxDialog = document.getElementsByClassName('dialog');
    for (let i=0; i < boxDialog.length; i++) {
        boxDialog[i].style.display = 'none';
    }
}

function eventHideDialogAddBookStore() {
    let btnHideDialog = document.querySelectorAll('.btn-hide-dialog');
    for (let i=0; i < btnHideDialog.length; i++) {
        btnHideDialog[i].addEventListener('click', function () {
            hideDialogAddBookStore();
        });
    }
}

function eventAddBookStore() {
    let button = document.getElementById('add_bookstore');
    clearFormBookStore();
    button.addEventListener('click', function () {
        addBookStore();
    })
}

function clearFormBookStore() {
    document.getElementById('name').value = "";
    document.getElementById('author').value = "";
}

function getIndexBookStoreById(bookStoreId) {
    let index = null;
    bookStores.find((bookStoreItem, bookStoreIndex) => {
        if (bookStoreItem.id === bookStoreId) {
            index = bookStoreIndex;
        }
    });
    return index;
}

function showDialogConfirmDelete(bookStoreId) {
    deleteBookStoreId = bookStoreId;
    console.log(deleteBookStoreId);
    document.getElementById('box-delete').style.display = 'flex';
    document.getElementById('box-delete-main').style.display = 'block';

    let content = ``;
    bookStores.find((bookStore) => {
        if (bookStore.id === bookStoreId) {
            content = `Do you want to delete this ${bookStore.name} book?`;
        }
    });

    innerHTMLById('dialog-content', content);
}





function searchBookStore() {
    document.getElementById("search").addEventListener("keypress", function(e) {
        filterBookStore(e.target.value);
    });
}

function setStorage() {
    const storageBookStores = JSON.stringify(bookStores)
    localStorage.setItem("bookStores", storageBookStores);
}

function getStorage() {
    let data = localStorage.getItem("bookStores");
    return data ? JSON.parse(data) : [];
}

function clearStorage() {
    localStorage.clear();
}

function cancelBookstore() {
    document.getElementById('cancel_bookstore').addEventListener('click', function () {
        hideDialogAddBookStore();
    });
}

function deleteBookstore() {
    document.getElementById('delete_bookstore').addEventListener('click', function () {
        let index = getIndexBookStoreById(deleteBookStoreId);
        deleteBookStore(index);
        clearStorage();
        setStorage();
    });
}

function renderTable() {
    innerHTMLById('bookstore', getContentRow(bookStores))
}

function getContentRow(bookStores) {
    let html = '';
    if (bookStores.length > 0) {
        bookStores.forEach((bookStore, index) => {
            html += `<tr>
                <td>${bookStore.name}</td>
                <td>${bookStore.author}</td>
                <td>${bookStore.topic}</td>
                <td style="text-align: center"><a class="label-delete" href="#" onclick="showDialogConfirmDelete(${bookStore.id})"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></td>
            </tr>`
        });
    } else {
        html = `<tr><td colspan="4" style="text-align: center">Not data</td></tr>`;
    }

    return html;
}

function innerHTMLById(elementId, html) {
    document.getElementById(elementId).innerHTML = html;
}

renderTable();
eventAddBookStore();
showDialogAddBookStore();
eventHideDialogAddBookStore();
cancelBookstore();
deleteBookstore();
searchBookStore();