import React, {Component} from 'react';

class Option extends Component {
    state = {
        stateClass: 'option'
    };
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                stateClass: 'option--after-start'
            });
        }, 1);
    }
    
    render() {
        return (
            <div className={`${this.state.stateClass}`}>
                <p className='option__text'>{this.props.count}. {this.props.optionText}</p>
                <button
                    className='button button--link'
                    onClick={() => {
                        this.setState({
                            stateClass: 'option--before-delete'
                        });
                        
                        setTimeout(() => {
                            this.props.onDeleteOption(this.props.optionText);
                        }, 200);
                    }}
                >
                    Remove
                </button>
            </div>
        );
    }
}

export default Option;