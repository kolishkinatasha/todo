import React from 'react';

class SearchPanel extends React.Component {

    state = {
        term: ''
    };

    onSearchChange = (e) => {
        const term = e.target.value; //текущее значение инпута
        this.setState({term});
        this.props.onSearchChange(term); //вызов эвентлистенер который передаст арр
    };

    render() {
        const searchText = 'Type here to search'

        return <input type="text"
            className="form-control search-input"
            placeholder={searchText}
            value={this.state.term}
            onChange={this.onSearchChange}/>;
    };    
};

export default SearchPanel;