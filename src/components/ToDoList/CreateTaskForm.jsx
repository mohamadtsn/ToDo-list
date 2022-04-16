import React, {Component} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import Swal from "sweetalert2";

class CreateTaskForm extends Component {

    instanceTaskData = {
        member: '',
        task: '',
        priority: false,
        status: 'unfinished',
    }

    state = {
        taskInfo: {
            member: '',
            task: '',
            priority: false,
            status: 'unfinished',
        },
        isValidatedForm: false
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false || !this.state.taskInfo.priority) {
            this.setState((state) => {
                return {
                    ...state,
                    isValidatedForm: true
                }
            })
            Swal.fire({
                title: 'An error occurred',
                text: 'Oops! fix the errors that occurred',
                icon: 'error',
            })
            return null
        }
        this.props.createTaskHandler(this.state.taskInfo)
        this.setState({
            taskInfo: this.instanceTaskData,
            isValidatedForm: false
        })
        Swal.fire({
            title: 'Task created!',
            text: 'Great, Task created successfully !',
            icon: 'success',
        }).then(r => r.value && this.props.onHide())
    }

    handleMemberChange = (e) => {
        this.setState(state => {
            return {
                ...state,
                taskInfo: {
                    ...state.taskInfo,
                    member: e.target.value,
                }
            }
        })
    }

    handleDescriptionChange = (e) => {
        this.setState(state => {
            return {
                ...state,
                taskInfo: {
                    ...state.taskInfo,
                    task: e.target.value
                }
            }
        })
    }

    handlePriorityChange = (e) => {
        this.setState(state => {
            return {
                ...state,
                taskInfo: {
                    ...state.taskInfo,
                    priority: e.target.value
                }
            }
        })
    }

    handleModalOnClose = (e) => {
        this.setState((state) => {
            return {
                ...state,
                isValidatedForm: false
            }
        })
        this.props.onHide()
    }

    render() {
        return (
            <Modal
                show={this.props.show} onHide={this.handleModalOnClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Create new task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={this.state.isValidatedForm}
                        id='form-create-task'
                        onSubmit={this.handleSubmitForm}
                    >
                        <Row>
                            <Col className='col-12'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Full name Member:</Form.Label>
                                    <Form.Control
                                        onChange={this.handleMemberChange}
                                        value={this.state.taskInfo.member}
                                        type="text"
                                        placeholder="Enter full name"
                                        required
                                    />
                                    {
                                        !this.state.isValidatedForm &&
                                        <Form.Text className="text-muted">
                                            please the enter full name member.
                                        </Form.Text>
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        Enter full member name is required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col className='col-12'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control required onChange={this.handleDescriptionChange} value={this.state.taskInfo.task} as='textarea' placeholder="Enter description" />
                                    {
                                        !this.state.isValidatedForm &&
                                        <Form.Text className="text-muted">
                                            please the enter task description.
                                        </Form.Text>
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        Enter "task description" is required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col className='col-12'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Priority:</Form.Label>
                                    <Form.Select required onChange={this.handlePriorityChange} value={this.state.taskInfo.priority} aria-label="Default select example">
                                        <option value=''>Choose a Priority...</option>
                                        <option value="high">High</option>
                                        <option value="middle">Middle</option>
                                        <option value="low">Low</option>
                                    </Form.Select>
                                    {
                                        !this.state.isValidatedForm &&
                                        <Form.Text className="text-muted">
                                            please the select priority for task.
                                        </Form.Text>
                                    }
                                    <Form.Control.Feedback type="invalid">
                                        Choose a priority for task is required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' type='button' onClick={this.handleModalOnClose}>Close</Button>
                    <Button form='form-create-task' variant='success' type='submit'>Create Task</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    /*render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create new task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">

                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label htmlFor="inputMemberName" className="form-label">FullName Member:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputMemberName"
                                            placeholder="please the enter full name member..." />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="floatingTextarea2">Task Desc:</label>
                                    <textarea
                                        className="form-control"
                                        placeholder="please the enter task description..."
                                        id="floatingTextarea2"
                                        style={{height: '100px'}} />
                                </div>
                            </div>
                            <Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Create task</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }*/
}

export default CreateTaskForm;
