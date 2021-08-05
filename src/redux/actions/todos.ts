import TodoService from '../../services/todos.services'
import {
    ADD_TODO_LINK,
    ADD_TODO_LINK_SUCCESS,
    CLEAR_TODOS,
    CREATE_TODO_REQUEST,
    DELETE_TODO_REQUEST,
    GET_TODO_BY_ID_REQUEST,
    GET_TODO_BY_ID_SUCCESS,
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS,
    UPDATE_TODO_REQUEST,
} from './types/todos'
import { ITodo } from '../reducers/todos'
import { Dispatch } from 'redux'

export const getTodosRequest = (todo: ITodo) => {
    return {
        type: GET_TODOS_REQUEST,
        payload: todo,
    }
}

export const clearTodos = () => {
    return {
        type: CLEAR_TODOS,
    }
}

export const deleteUserTodo = (todos: ITodo[], index: number) => {
    todos.splice(index, 1)

    return {
        type: DELETE_TODO_REQUEST,
        payload: todos,
    }
}

export const getTodosSuccess = () => {
    return {
        type: GET_TODOS_SUCCESS,
    }
}

export const getTodos = (id: number) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await TodoService.getTodosById(id)
            if (res.error) {
                throw new Error(res.error)
            }
            dispatch(getTodosRequest(res.data))
            dispatch(getTodosSuccess())
        } catch (e) {}
    }
}

export const deleteSelectedTodo = (
    id: number,
    todos: ITodo[],
    index: number
) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await TodoService.DeleteUserTodo(id)
            if (res.error) {
                throw new Error(res.error)
            }
            dispatch(deleteUserTodo(todos, index))
            dispatch(getTodosSuccess())
        } catch (e) {}
    }
}