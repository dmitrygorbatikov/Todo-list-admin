import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {deleteSelectedTodo, getTodos} from "../../redux/actions/todos";
import {RootState} from "../../redux/store";
import {Card, Col, Row, Button, Modal} from "react-bootstrap";
import {
    blockUser,
    blockUserDetail,
    deleteUser,
    getUserById,
    unblockUser,
    unblockUserDetail
} from "../../redux/actions/user";
import {Link, useHistory} from "react-router-dom";

export const Todos = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showBlock, setShowBlock] = useState(false);
    const [blocked, setBlocked] = useState(false)

    const handleCloseBlock = () => setShowBlock(false);
    const handleShowBlock = () => setShowBlock(true);

    let urlPath = document.location.pathname
    let pathArray = urlPath.split('/')
    let userIndexAndId = pathArray[pathArray.length-1].split(':')
    console.log(userIndexAndId)
    const userId = parseInt(userIndexAndId[0])
    console.log(userId)
    const index = parseInt(userIndexAndId[1])
    console.log(index)

    const users = useSelector((state: RootState) => state.user.users)


    const getUserDataAndTodos = useCallback(() => {
        dispatch(getUserById(userId))
        dispatch(getTodos(userId))
    }, [])



    useEffect(() => {
        getUserDataAndTodos()
    },[getUserDataAndTodos])

    const todos = useSelector((state:RootState) => state.todo.todos)
    const isLoadingTodos = useSelector((state:RootState) => state.todo.isLoading)
    const isLoadingUser = useSelector((state:RootState) => state.user.isLoading)
    const user = useSelector((state:RootState) => state.user.user)

    if(isLoadingTodos || isLoadingUser){
        return <>Loading...</>
    }

    const clickToBlock = (id: number, index: number) => {
        dispatch(blockUser(id, users, index))
    }

    const clickToUnblock = (id: number, index: number) => {
        dispatch(unblockUser(id, users, index))

    }
    return(
        <>
            <Link to={`/`}><Button variant='secondary'>Back</Button></Link>
            {!isLoadingUser && user &&
                <Card style={{marginTop: '50px'}}>
                    <Card.Header>USER INFO</Card.Header>
                    <Card.Body>
                        <Card.Title>NAME: {user?.name}</Card.Title>
                        <Card.Title>SURNAME: {user?.surname}</Card.Title>
                        <Card.Title>EMAIL: {user?.email}</Card.Title>
                        <Card.Title>REGISTER DATE: {user?.registerDate}</Card.Title>
                        <Card.Title>ROLE: {user?.role}</Card.Title>
                        <Card.Title>BLOCKED: {user?.isBlocked ? 'yes' : 'no'}</Card.Title>
                        <Card.Text>
                            You can block/unblock this user or delete him with his todos
                        </Card.Text>
                        <Button variant={`${user.isBlocked ? 'warning' : 'success'}`} onClick={() => {
                            handleShowBlock()
                            setBlocked(user.isBlocked)

                        }}>{user?.isBlocked ? 'Unblock' : 'Block'}</Button>
                        <Button style={{marginLeft: '100px'}} variant="danger" onClick={handleShow}>Delete</Button>
                    </Card.Body>
                </Card>
            }
            {!isLoadingTodos && todos &&
                <Row style={{marginTop: '50px'}}>

                    {todos.map((todo) => {
                        return (
                            <>
                                <Col xl={3} style={{
                                    margin: '0 auto',
                                    marginTop: 30
                                }}>
                                    <Card style={{ width: '18rem',
                                        margin: '0 auto'
                                    }}>
                                        <Card.Body>
                                            <Card.Title>ID: {todo.id}</Card.Title>

                                            <Card.Title>TITLE: {todo.title}</Card.Title>
                                            <Card.Text>
                                                DESCRIPTION: {todo.description}
                                            </Card.Text>
                                            <Card.Text>
                                                STATUS: {todo.status ? "completed" : "not completed"}
                                            </Card.Text>
                                            <Card.Text>
                                                COMPLETED DATE: {todo.completedDate == " " ? "no date" : todo.completedDate}
                                            </Card.Text>
                                            <Card.Text>
                                                CREATED DATE: {todo.date}
                                            </Card.Text>
                                            <Button variant="danger" onClick={() => {
                                                dispatch(deleteSelectedTodo(todo.id, todos, todos.indexOf(todo)))
                                            }
                                            }>Delete</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </>
                        )
                    })
                    }
                </Row>

            }


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deleting user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure that you to DELETE this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => {
                        dispatch(deleteUser(userId,users, index))
                        handleClose()
                        history.push('/')
                    }}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal show={showBlock} onHide={handleCloseBlock}>
                <Modal.Header closeButton>
                    <Modal.Title>Block user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure that you to BLOCK this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => {
                        if(!blocked && user){
                            dispatch(blockUserDetail(user))
                            dispatch(blockUser(userId, users, index))
                        }
                        else if(blocked && user){
                            dispatch(unblockUserDetail(user))
                            dispatch(unblockUser(userId, users, index))
                        }
                        setShowBlock(false)

                    }}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={handleCloseBlock}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}