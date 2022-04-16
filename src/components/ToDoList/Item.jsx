import React, {FC} from 'react';
import MemberAvatar from '../../assets/images/member-avatar2.png'
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";

type Props = {
    id: Number,
    priority: String,
    member: String,
    task: String,
    status: String,
    handleFinished: Function,
    handleRemove: Function,
};

const priorities = [
    {
        title: 'High Priority',
        type: 'high',
        state: 'danger'
    },
    {
        title: 'Low Priority',
        type: 'low',
        state: 'success'
    },
    {
        title: 'Middle Priority',
        type: 'middle',
        state: 'warning'
    }
]

const initPriority = (priorityTask) => {
    const priority = priorities.find(priority => {
        return priority.type === priorityTask
    })
    return (
        <span className={`badge bg-${priority.state}`}>
            {priority.title}
        </span>
    )
}

const Item: FC = (props: Props) => {
    return (
        <tr className="fw-normal">
            <td className="align-middle">
                <span>{props.number}</span>
            </td>
            <th>
                <img
                    src={MemberAvatar}
                    alt={`avatar ${props.id}`}
                    style={{width: '45px', height: 'auto'}} />
                <span className="ms-2">{props.member}</span>
            </th>
            <td className="align-middle">
                <span>{props.task}</span>
            </td>
            <td className="align-middle">
                <h6 className="mb-0">
                    {initPriority(props.priority)}
                </h6>
            </td>
            <td className="align-middle">
                {
                    props.status === 'finished' ?
                        <OverlayTrigger
                            placement='top'
                            overlay= {
                                <Tooltip id={`tooltip-finished-${props.id}`}>Finished</Tooltip>
                            }>
                            <span className="btn btn-sm btn-primary me-2">
                                <i className="fad fa-check-circle fa-lg" />
                            </span>
                        </OverlayTrigger> :
                        <OverlayTrigger
                            placement='top'
                            overlay= {
                                <Tooltip id={`tooltip-finish-${props.id}`}>Finish</Tooltip>
                            }>
                            <Button variant='success' size='sm' onClick={props.handleFinished.bind(null, props.id, props.number)} className="me-2">
                                <i className="fad fa-check fa-lg" />
                            </Button>
                        </OverlayTrigger>
                }
                <OverlayTrigger
                    placement='top'
                    overlay= {
                        <Tooltip id={`tooltip-remove-${props.id}`}>Remove</Tooltip>
                    }>
                    <Button
                        variant='danger'
                        size='sm'
                        onClick={props.handleRemove.bind(null, props.id, props.number)}>
                        <i className="fad fa-trash-alt fa-lg" />
                    </Button>
                </OverlayTrigger>
            </td>
        </tr>
    );
};

export default Item
