import React, {useState, useEffect} from 'react'
import Header from './layout/Header'
import Todos from './Todos'
import AddTodo from './AddTodo'
import Footer from '../store/containers/Footer'
// import {v4 as uuid} from "uuid"; 

//Khai bao thu vien axios
import axios from 'axios'

// class TodoApp extends React.Component {

//     state = {
//         todos: []
//     };

//     handleCheckboxChange = (id) => {
//         this.setState({
//             todos: this.state.todos.map(todo => {
//                 if(todo.id === id) {
//                     todo.completed = !todo.completed
//                 }
//                 return todo;
//             })
//         })
//     }

//     deleteTodo = (id) => {
//         axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
//         .then(response => this.setState({
//             todos : [
//                 ...this.state.todos.filter(todo => {
//                     return todo.id !== id
//                 })
//             ]
//         }))
        
//     }

//     addTodo = title => {
//         // const newTodo = {
//         //     id: uuid(),
//         //     title: title,
//         //     completed: false
//         // }
//         const todoData = {
//             title: title,
//             completed: false
//         }
//         axios.post("https://jsonplaceholder.typicode.com/todos", todoData)
//         .then(response => {
//             console.log(response.data)
//             this.setState({
//                 todos: [...this.state.todos, response.data]
//             })
//         })
        
//     }

//     componentDidMount() {
//         const config = {
//             params: {
//                 _limit: 10
//             }
//         }
//         //Tao GET request de lay danh sach tren ham render()
//         axios.get("https://jsonplaceholder.typicode.com/todos", config)
//         .then(response => this.setState({ todos : response.data }));
//     }
    

//     render() {

//         return ( 
//             <div className="container">
//                 <Header />
//                 <AddTodo addTodo = {this.addTodo} />
//                 <Todos 
//                     todos={this.state.todos} 
//                     handleChange = {this.handleCheckboxChange}
//                     deleteTodo = {this.deleteTodo}    
//                 />
//             </div>
//         )
//     }
// }

//Functional Component
function TodoApp() {
    const [state, setState] = useState({
        todos : []
    })

    const handleCheckboxChange = (id) => {
        setState({
            todos: state.todos.map(todo => {
                if(todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo;
            })
        })
    }

    const deleteTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => setState({
            todos : [
                ...state.todos.filter(todo => {
                    return todo.id !== id
                })
            ]
        }))
        
    }

    const addTodo = title => {
        const todoData = {
            title: title,
            completed: false
        }
        axios.post("https://jsonplaceholder.typicode.com/todos", todoData)
        .then(response => {
            console.log(response.data)
            setState({
                todos: [...state.todos, response.data]
            })
        })
        
    }

    useEffect(() => {
        const config = {
            params: {
                _limit: 10
            }
        }
        //Tao GET request de lay danh sach tren ham render()
        axios.get("https://jsonplaceholder.typicode.com/todos", config)
        .then(response => setState({ todos : response.data }));
    }, [])

    return ( 
            <div className="container">
                <Header />
                <AddTodo addTodo = {addTodo} />
                <Todos todos={state.todos} 
                    handleChange = {handleCheckboxChange}
                    deleteTodo = {deleteTodo}    
                />
                <Footer/>
            </div>
        )
}

export default TodoApp