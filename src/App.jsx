import React, {Component} from 'react';
import './assets/css/app.css';
import MainSection from "./components/Main/MainSection";
import ToDoList from "./components/ToDoList/ToDoList";

class App extends Component {

    render() {
        return (
            <MainSection>

                <ToDoList />
            </MainSection>
        );
    }
}

export default App;
