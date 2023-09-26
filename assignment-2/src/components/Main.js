import './../App.css';
import React, {} from 'react';

class Main extends React.Component {
    constructor() {
        super();
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeAuthor = this.onChangeAuthor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        let data = localStorage.getItem("bookStores");
        this.state = {
            bookStores: data ? JSON.parse(data) : [],
            name: '',
            author: '',
            topic: '',
            nameDelete: '',
            idDelete: '',
            dialogAdd: false,
            dialogDelete: false
        }
    }

    showDialogAddBookStore = () => {
        this.setState({
            dialogAdd: true
        });
    }

    showDialogDeleteBookStore = (bookStoreId, nameDelete) => {
        this.setState({
            dialogDelete: true,
            idDelete: bookStoreId,
            nameDelete: nameDelete
        });
    }

    deleteBookStore = (deleteBookStoreId) => {
        let index = this.getIndexBookStoreById(deleteBookStoreId);
        this.state.bookStores.splice(index, 1);
        this.setState({
            bookStores: this.state.bookStores
        })
        this.setStorage()
    }

    getIndexBookStoreById = (bookStoreId) => {
        let index = null;
        this.state.bookStores.find((bookStoreItem, bookStoreIndex) => {
            if (bookStoreItem.id === bookStoreId) {
                index = bookStoreIndex;
            }
        });
        return index;
    }

    setStorage = () => {
        localStorage.setItem("bookStores", JSON.stringify(this.state.bookStores));
    }

    closeDialog = () => {
        this.setState({
            dialogAdd: false
        });
    }

    closeDialogDelete = () => {
        this.setState({
            dialogDelete: false
        })
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        })
    }

    onChangeAuthor(event) {
        this.setState({
            author: event.target.value
        })
    }

    handleChange(event) {
        this.setState({
            topic: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.state.bookStores.push({
            id: Date.now(),
            name: this.state.name,
            author: this.state.author,
            topic: this.state.topic
        });
        this.setState({
            bookStores: this.state.bookStores
        })
        this.setStorage()
        this.setState({
            name: '',
            author: '',
        })
    }

    render() {
        return (
            <div>
                <main>
                    <div className="box-search">
                        <div>
                            <input type="text" className="input-keyword" id="search" placeholder="Search" />
                            <button className="btn-add" id="btn-add" onClick={this.showDialogAddBookStore}><i className="fa fa-plus" aria-hidden="true"></i> Add Book</button>
                        </div>
                    </div>
                    <div className="box-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Author</th>
                                    <th>Topic</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="bookstore">
                                {
                                    this.state.bookStores.map((bookStore, index) => (
                                    <tr>
                                        <td>{bookStore.id}</td>
                                        <td>{bookStore.name}</td>
                                        <td>{bookStore.author}</td>
                                        <td><a onClick={() => this.showDialogDeleteBookStore(bookStore.id, bookStore.name)}>Delete</a></td>
                                    </tr>     
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </main>

                <div className={this.state.dialogAdd ? 'box-dialog' : 'box-dialog box-dialog_hide'} id="dialog-add">
                    <div className={this.state.dialogAdd ? 'dialog dialog-hide' : ''}>
                        <div className="dialog-header">
                            <h3>Add Book</h3>
                            <a href="#" className="btn-hide-dialog" onClick={this.closeDialog}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </a>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="dialog-content">
                                <div>
                                    <label>Name</label>
                                    <input type="text" value={this.state.name} onChange={this.onChangeName}/>
                                </div>
                                <div>
                                    <label>Author</label>
                                    <input type="text" value={this.state.author} onChange={this.onChangeAuthor}/>
                                </div>
                                <div>
                                    <label>Topic</label>
                                    <select value={this.state.topic} onChange={this.handleChange}>
                                        <option value="Programing">Programing</option>
                                        <option value="Database">Database</option>
                                        <option value="DevOps">DevOps</option>
                                    </select>
                                </div>
                            </div>
                            <div className="dialog-footer">
                                <input type="submit" value="Create"/>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={this.state.dialogDelete ? 'box-dialog' : 'box-dialog box-dialog_hide'}>
                    <div className={this.state.dialogDelete ? 'dialog dialog-hide' : ''}>
                        <div className="dialog-header">
                            <h3>Delete Box</h3>
                            <a href="#" className="btn-hide-dialog" onClick={() => this.closeDialogDelete}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className="dialog-content" id="dialog-content">
                            Do you want to delete this {this.state.nameDelete} book?
                        </div>
                        <div className="dialog-footer dialog-footer--delete">
                            <a href="#" onClick={() => this.deleteBookStore(this.state.idDelete)}>Delete</a>
                            <a href="#" onClick={() => this.closeDialogDelete}>Cancel</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
