import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {
    blockUser,
    deleteUser,
    fetchingSuccessUsers,
    fetchingUsers,
    getAllUsers,
    getAllUsersRequest,
    getAllUsersSuccess, unblockUser, updateUser
} from "../../redux/actions/user";
import {Button, Col, Form, InputGroup, Modal, Row, Table, Toast} from "react-bootstrap";
import user, {IUser} from "../../redux/reducers/user";
import {Link} from "react-router-dom";

export interface UserData {
    name: string
    surname: string
}


export const Index = () => {
    const dispatch = useDispatch()
    const [take, setTake] = useState(20)
    const [skip, setSkip] = useState(0)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [updateUserModalData, setUpdateUserModalData] = useState({
        id: 1,
        index: 1
    })
    dispatch(fetchingUsers())
    // const fetching = useSelector((state:RootState) => state.user.isFetching)
    const getUsers = useCallback(() => {
        dispatch(getAllUsers(take, skip, users))
        dispatch(fetchingSuccessUsers())

    }, [])

    useEffect(() => {
        getUsers()
    }, [getUsers])

    // useEffect(() => {
    //     if(fetching){
    //         getUsers()
    //         setTake(prevState => prevState + 20)
    //         setSkip(prevState => prevState + 20)
    //         console.log(fetching)
    //     }
    // }, [fetching, getUsers])


    // useEffect(() => {
    //     document.addEventListener('scroll', scrollHandler)
    //         return function (){
    //             document.removeEventListener('scroll', scrollHandler)
    //         }
    // },[])

    // const scrollHandler = (e: any) => {
    //     if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100){
    //         dispatch(fetchingUsers())
    //         console.log(fetching)
    //     }
    // }
    const users = useSelector((state: RootState) => state.user.users)
    const isLoading = useSelector((state: RootState) => state.user.isLoading)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(true);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(false)
        }
        else if(form.checkValidity()){
            setValidated(true)
            setShow(false)
            let userData = {
                name, surname
            }
            dispatch(updateUser(userData, updateUserModalData.id, users, updateUserModalData.index))
        }

    };

    const clickToBlock = (id: number, index: number) => {
        dispatch(blockUser(id, users, index))
    }

    const clickToUnblock = (id: number, index: number) => {
        dispatch(unblockUser(id, users, index))

    }




    return(
        <>
            {/*<Row style={{marginTop: '30px'}}>*/}
            {/*    <Col xl={3}>*/}
            {/*        <Form.Select aria-label="Default select example" style={{width: '100%'}}>*/}
            {/*            <option value="1">Id</option>*/}
            {/*            <option value="2" selected>Email</option>*/}
            {/*            <option value="3">Name/Surname</option>*/}
            {/*        </Form.Select>*/}
            {/*    </Col>*/}
            {/*    <Col xl={6}>*/}
            {/*        <Form.Group className="mb-3" controlId="formBasicEmail">*/}
            {/*            <Form.Control type="email" placeholder="Enter email" />*/}

            {/*        </Form.Group>*/}
            {/*    </Col>*/}
            {/*    <Col xl={3}>*/}
            {/*        <Button style={{width: '100%'}}>Search</Button>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {users && !isLoading &&
            <Table striped bordered hover variant="light" style={{textAlign: 'center'}} >
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name/Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Block/Unblock</th>
                    <th>Detail</th>
                    <th>Update</th>
                    <th>Delete</th>

                </tr>
                </thead>
                {
                    users.map((user, index) => {
                        if(user.role == 'user') {
                            return (

                                <tbody>

                                <tr>
                                    <td>{++index}</td>
                                    <td>{user.name} {user.surname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td><Button variant={`${user.isBlocked ? 'danger' : 'success'}`} onClick={() => {
                                        if(user.isBlocked){
                                            clickToUnblock(user.id, users.indexOf(user))
                                        }
                                        else if(!user.isBlocked){
                                            clickToBlock(user.id, users.indexOf(user))
                                        }
                                    }}>{user.isBlocked ? 'Unblock' : 'Block'}</Button></td>
                                    <td>
                                        <Link style={{
                                            textDecoration: 'none',
                                            color: '#fff'
                                            }} to={`/user-todos/${user.id}:${users.indexOf(user)}`}>
                                        <Button variant="info">
                                            Detail
                                        </Button>
                                        </Link>
                                    </td>
                                    <th><Button variant="warning" onClick={() => {
                                        handleShow()
                                        setName(user.name)
                                        setSurname(user.surname)
                                        setUpdateUserModalData({
                                            ...updateUserModalData,
                                            id: user.id,
                                            index: users.indexOf(user)
                                        })
                                    }
                                    }>Update</Button></th>
                                    <th><Button variant="danger" onClick={() => {
                                        dispatch(deleteUser(user.id, users, users.indexOf(user)))
                                    }
                                    }>Delete</Button></th>

                                </tr>

                                </tbody>
                            )
                        }
                    })
                }
            </Table>

            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update user name and surname</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Name"
                                    defaultValue={name}
                                    name="name"
                                    onChange={(event) => setName(event.target.value)}

                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Surname"
                                    defaultValue={surname}
                                    name="surname"
                                    onChange={(event) => setSurname(event.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        <Form.Group style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                            <Button  variant="danger" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="success">
                                Save Changes
                            </Button>
                    </Form.Group>

                </Form>
                </Modal.Body>

            </Modal>

        </>
    )
}