import React, {Component} from 'react';
import Header from "./Header";
import Body from "./Body";
import todos from "../../mocks/todos";
import CreateTaskForm from "./CreateTaskForm";
import Swal from "sweetalert2";

type Task = {
    member: string,
    task: string,
    priority: ['high', 'low', 'middle'],
    status: ['finished', 'unfinished']
}

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.handleFinishTask = this.handleConfirmFinishTask.bind(this)
        this.handleRemoveTask = this.handleConfirmRemoveTask.bind(this)
        this.handleCreateTask = this.handleCreateTask.bind(this)
    }

    state = {
        taskList: todos,
        isOpenModal: false
    }

    openModal = () => {
        this.setState((state) => {
            return {
                ...state,
                isOpenModal: true
            }
        })
    }

    closeModal = () => {
        this.setState((state) => {
            return {
                ...state,
                isOpenModal: false
            }
        })
    }

    handleConfirmFinishTask = (id , number) => {
        Swal.fire({
            title: 'Confirmation',
            html: `Is your Task really <b class="badge bg-success">done</b> with number <b class="badge bg-dark">${number}</b> ?`,
            icon: 'question',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true
        }).then(r => r.value && this.handleFinishedTask(id))
    }

    handleConfirmRemoveTask = (id , number) => {
        Swal.fire({
            title: 'Confirmation',
            html: `Is your Task really <b class="badge bg-danger">remove</b> with number <b class="badge bg-dark">${number}</b> ?`,
            icon: 'question',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true
        }).then(r => r.value && this.handleRemovedTask(id))
    }

    handleFinishedTask(id) {
        const newTaskList = this.state.taskList.map(task => {
            if (task.id === id) {
                task.status = 'finished'
            }
            return task;
        })
        this.setState(state => {
            return {
                ...state,
                taskList: newTaskList
            }
        })
        Swal.fire({
            title: 'Task Finished!',
            html: `<b>Congratulations!</b> Task Finished successfully.`,
            icon: 'success',
            confirmButtonText: 'Ok',
        })
    }

    handleRemovedTask(id) {
        const newTaskList = this.state.taskList.filter(task => {
            return task.id !== id;
        })
        this.setState(state => {
            return {
                ...state,
                taskList: newTaskList
            }
        })
        Swal.fire({
            title: 'Task Removed!',
            html: `<b>Done!</b> Task Removed successfully.`,
            icon: 'success',
            confirmButtonText: 'Ok',
        })
    }

    handleCreateTask(taskData: Task) {
        const lastTaskList = this.state.taskList[this.state.taskList.length - 1]
        const newTask = {
            ...taskData,
            id: (lastTaskList?.id || 0) + 1
        }
        this.setState(state => {
            return {
                ...state,
                taskList: [
                    ...state.taskList,
                    newTask
                ]
            }
        })
    }

    render() {
        return (
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100" style={{maxWidth: '920px'}}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-12 col-xl-10">
                            <div className="card mask-custom">
                                <div className="card-body p-4 text-white">
                                    <Header modalHandler={this.openModal} title="ToDo App" />
                                    <Body handleFinished={this.handleFinishTask} handleRemove={this.handleRemoveTask} taskList={this.state.taskList} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CreateTaskForm createTaskHandler={this.handleCreateTask} show={this.state.isOpenModal} onHide={this.closeModal} />
            </section>
        );
    }
}

export default ToDoList;
