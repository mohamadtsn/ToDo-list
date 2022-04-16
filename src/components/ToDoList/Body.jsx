import * as React from 'react';
import Item from "./Item";
import {Alert, Col, Row} from "react-bootstrap";

const taskList = function (props) {
    return props.taskList.map((task, inx) => {
        return (
            <Item
                number={inx + 1}
                key={task.id}
                id={task.id}
                priority={task.priority}
                member={task.member}
                task={task.task}
                status={task.status}
                handleFinished={props.handleFinished}
                handleRemove={props.handleRemove}
            />
        )
    })
};

export default function Body(props) {
    return (
        <>
            <table className="table text-white mb-0">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Member</th>
                    <th scope="col">Task</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {taskList(props)}
                </tbody>
            </table>
            {props.taskList.length === 0 &&
                <Row className='m-2'>
                    <Col className='col-12'>
                        <Alert variant='info' className='text-center'>
                            There is nothing to do right now!
                        </Alert>
                    </Col>
                </Row>
            }
        </>
    );
}
