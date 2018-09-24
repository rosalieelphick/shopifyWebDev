import React, { Component } from 'react';

class Results extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    handleAdd = (e) => {
        let index = e.target.id;
        this.props.handleAdd(index);
    }

    handleChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        }, () => {
            if (this.state.searchQuery.length === 0) {
                this.props.clearFields();
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.search(this.state.searchQuery);
    }

    render() {
        return (

            <section className="results">

                <div className="wrapper">
            
                    <form action="" className="searchForm">
                        <input type="text" className="search" onChange={(e) => {this.handleChange(e)}}/>
                        <input type="submit" className="submit" value="search" onClick={(e) => {this.handleSubmit(e)}}/>
                    </form>

                    <div className="headings">
                        <div className="name">
                            <p>Name</p>
                        </div>
                        <div className="language">
                            <p>Language</p>
                        </div>
                        <div className="tag">
                            <p>Latest tag</p>
                        </div>
                        <div className="addPlaceholder">
                        </div>
                    </div>

                    {this.props.results ?
                        <div id="resultContainer">
                            {this.props.results.map((result) => {
                                return (
                                    <div className="resultStats" key={this.props.results.indexOf(result)}> 

                                        <div className="resultName">
                                            <a href={result.url} target="_blank">{result.name}</a>
                                        </div>

                                        <div className="resultLanguage">
                                            <p>{result.language}</p>
                                        </div>

                                        <div className="resultTag">
                                            <p>{result.tag}</p>
                                        </div>

                                        {result.added ? null :
                                        <button id={this.props.results.indexOf(result)} onClick={(e) => {this.handleAdd(e)}}>
                                            Add
                                        </button>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                        
                    : null } 
                </div>
            </section>
            
        );
    }
};

export default Results;