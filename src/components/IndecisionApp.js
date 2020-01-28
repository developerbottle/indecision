import React from 'react';

import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };
    
    onDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };
    
    onDeleteOption = (option) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((nextOption) => nextOption !== option)
        }));
    };
    
    onPick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        
        this.setState(() => ({ selectedOption: option }));
    };
    
    onAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.includes(option)) {
            return 'This option already exists';
        }
        
        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    };
    
    onClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    };
    
    componentDidMount() {
        try {
            const optionsJSON = localStorage.getItem('options');
            
            if (optionsJSON) {
                this.setState(() => ({ options: JSON.parse(optionsJSON) }));
            }
        } catch (e) {
        
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            localStorage.setItem('options', JSON.stringify(this.state.options));
        }
    }
    
    componentWillUnmount() {
        console.log('Destroy');
        alert('Destroy');
    }
    
    render() {
        const subtitle = 'Put your life in the hands of a computer';
        
        return (
            <div>
                <Header subtitle={subtitle} />
                
                <div className="container">
                    <Action hasOptions={this.state.options.length > 0} onPick={this.onPick} />
                    
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            onDeleteOptions={this.onDeleteOptions}
                            onDeleteOption={this.onDeleteOption}
                        />
    
                        <AddOption onAddOption={this.onAddOption} />
                    </div>
                </div>
                
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    onClearSelectedOption={this.onClearSelectedOption}
                />
            </div>
        );
    }
}