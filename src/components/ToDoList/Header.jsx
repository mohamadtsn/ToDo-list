import React, {Component} from 'react';
import headerLogo from '../../assets/images/todo-list-logo.webp'

class Header extends Component {
    render() {
        return (
            <div className="d-flex justify-content-start align-content-center pt-3 pb-2">
                <div className='me-auto'>
                    <img className='ms-4' src={headerLogo} alt="Check" width="60" />
                    <h2 className="my-3">{this.props.title}</h2>
                </div>
                <div className='align-self-end pe-3'>
                    <button onClick={this.props.modalHandler} className='btn btn-dark'><i className='fad fa-plus fa-lg'/> Add Task</button>
                </div>
            </div>
        );
    }
}

export default Header;
