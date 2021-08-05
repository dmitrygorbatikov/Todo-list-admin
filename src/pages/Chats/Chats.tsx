import {Button, Card, ListGroup, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import React from 'react'


export const Chats = () => {
    const history = useHistory()
    return(
        <>
            <svg style={{
                marginTop: '20px',
                marginBottom: '20px',
                cursor: 'pointer'
            }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                 className="bi bi-arrow-90deg-left" viewBox="0 0 16 16" onClick={() => {
                     history.push('/')
            }}>
                <path fill-rule="evenodd"
                      d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
            </svg>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <ListGroup style={{width: '30%'}}>
                    <ListGroup.Item style={{display: 'flex'}}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>

                        </div>
                        <div style={{marginLeft: '20px'}}>Cras justo odio</div>
                    </ListGroup.Item>
                    <ListGroup.Item style={{display: 'flex'}}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>

                        </div>
                        <div style={{marginLeft: '20px'}}>Cras justo odio</div>
                    </ListGroup.Item>                    <ListGroup.Item style={{display: 'flex'}}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                             className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>

                    </div>
                    <div style={{marginLeft: '20px'}}>Cras justo odio</div>
                </ListGroup.Item>
                    <ListGroup.Item style={{display: 'flex'}}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>

                        </div>
                        <div style={{marginLeft: '20px'}}>Cras justo odio</div>
                    </ListGroup.Item>
                    <ListGroup.Item style={{display: 'flex'}}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>

                        </div>
                        <div style={{marginLeft: '20px'}}>Cras justo odio</div>
                    </ListGroup.Item>
                    <ListGroup.Item style={{display: 'flex'}}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>

                        </div>
                        <div style={{marginLeft: '20px'}}>Cras justo odio</div>
                    </ListGroup.Item>
                    <ListGroup.Item style={{display: 'flex'}}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>

                        </div>
                        <div style={{marginLeft: '20px'}}>Cras justo odio</div>
                    </ListGroup.Item>
                    <ListGroup.Item style={{display: 'flex'}}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>

                        </div>
                        <div style={{marginLeft: '20px'}}>Cras justo odio</div>
                    </ListGroup.Item>


                </ListGroup>
                <Card style={{width: '70%', height: '85vh'}}>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>

                    </Card.Body>
                    <Card.Footer>
                        <div style={{display: "flex", justifyContent: 'space-between'}}>
                        <Form.Group className="mb-3" style={{width: '78%'}}>
                            <Form.Control type="text" placeholder="message.." />
                        </Form.Group>
                        <Button variant="primary" style={{width: '18%', height: '38px'}}>Send</Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        </>
    )
}