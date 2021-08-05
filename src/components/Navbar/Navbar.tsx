import {Container, Nav, Navbar} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../redux/actions/auth";


export const Navibar = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logoutUser())
        history.push('/login')
    }
    return(
        <Navbar bg="light" variant="light" style={{border: '1px color #333'}}>
            <Container>
                <Navbar.Brand style={{float: 'right', cursor: 'pointer'}} className="right" onClick={() => {
                    history.push('/chats')
                }}>Chats</Navbar.Brand>
                <Nav className="right">
                    <Nav.Link onClick={logoutHandler}>LOGOUT</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}