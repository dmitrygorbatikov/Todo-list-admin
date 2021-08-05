import {Alert, Button, Col, Form, Row, Toast} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom'
import {loginAdmin} from "../../redux/actions/auth";
import useStyles from "../../App/style";
import {RootState} from "../../redux/store";
import {clearNotification} from "../../redux/actions/notification";
import useStylesIndex from "./styles.login";

export interface AuthData {
    email: string
    password: string
}

export const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email must not be empty')
    const [passwordError, setPasswordError] = useState(
        'Password must not be empty'
    )
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emailChangeHandler = (e: any) => {
        setEmail(e.target.value)
        if (!e.target.value) {
            setEmailError('Email must not be empty')
        } else if (e.target.value) {
            if (!e.target.value.includes('@')) {
                setEmailError('Email must include @')
            } else if (e.target.value.includes('@')) {
                if (
                    e.target.value.substring(0, 1) == '@' ||
                    countSymbols('@', e.target.value) > 1
                ) {
                    setEmailError('Enter valid Email')
                } else {
                    setEmailError('')
                }
            }
        }
    }

    const passwordChangeHandler = (e: any) => {
        setPassword(e.target.value)

        if (!e.target.value) {
            setPasswordError('Password must not be empty')
        } else if (e.target.value) {
            if (e.target.value.length < 6) {
                setPasswordError('Minimum password length 6 characters')
            } else if (e.target.value.length >= 6) {
                setPasswordError('')
            }
        }
    }

    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            default:
                break
        }
    }

    const loginHandler = () => {
        setOpen(true)
        dispatch(
            loginAdmin({
                email,
                password,
            })
        )
    }

    const countSymbols = (symbol: string, str: string) => {
        return str.split('').filter((item) => item == symbol).length
    }

    const classes = useStylesIndex()
    const [open, setOpen] = useState(false)

    const noteClose = () => {
        setOpen(false)
        dispatch(clearNotification())
    }

    const note = useSelector((state: RootState) => state.note.note)


    return(
        <>
            {note &&
                <Toast style={{color: '#fff', background: 'red', margin: '0 auto', marginTop: '50px'}} onClose={() => {
                    noteClose()
                }} show={open} delay={3000} autohide>
                    <Toast.Body>{note}</Toast.Body>
                </Toast>
            }

            <Form style={{maxWidth: '600px', margin: '0 auto', marginTop: '50px', background: '#dbfaff', textAlign: 'center', padding: '50px'}}>
                <Alert variant="primary">
                    Login
                </Alert>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email" placeholder="Enter email"
                        name="email"
                        onChange={(e) => emailChangeHandler(e)}
                        onBlur={(e: any) => blurHandler(e)}
                    />
                    {emailError && emailDirty && (
                        <div style={{ color: 'red' }}>{emailError}</div>
                    )}

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => passwordChangeHandler(e)}
                        onBlur={(e: any) => blurHandler(e)}
                    />
                    {passwordError && passwordDirty && (
                        <div style={{ color: 'red' }}>{passwordError}</div>
                    )}


                </Form.Group>

                <Button variant="primary" onClick={loginHandler} disabled={!formValid}>
                    Sign In
                </Button>
            </Form>
        </>
    )
}