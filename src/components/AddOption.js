import React from "react";

export default class AddOption extends React.Component {
    state = {
        error: undefined
    };
    
    handleAddOption = (e) => {
        e.preventDefault();
        
        const optionField = e.target.elements.option;
        
        optionField.focus();
        
        const option = optionField.value.trim();
        const error = this.props.onAddOption(option);
        
        this.setState(() => ({ error }));
        
        optionField.value = '';
    };
    
    render() {
        return (
            <div>
                {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
                <form className='add-option' onSubmit={this.handleAddOption} autoComplete="off">
                    <input className='add-option__input' type="text" name="option" />
                    <button className='button'>Add Option</button>
                </form>
            </div>
        );
    }
}