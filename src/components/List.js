import React, { Component } from 'react';

class List extends Component {

    handleRemove = (e) => {
        let index = e.target.id;
        this.props.handleRemove(index);
    }

    render() {
        return (

            <section className="list">

                <div className="wrapper">

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

                    {this.props.favorites ?

                    <div>
                        {this.props.favorites.map((result) => {
                            return (
                                <div className="resultStats" key={this.props.favorites.indexOf(result)}>

                                    <div className="resultName">
                                        <a href={result.url} target="_blank">{result.name}</a>
                                    </div>

                                    <div className="resultLanguage">
                                        <p>{result.language}</p>
                                    </div>

                                    <div className="resultTag">
                                        <p>{result.tag}</p>
                                    </div>

                                    {result.added ? 
                                        <button id={this.props.favorites.indexOf(result)} onClick={(e) => { this.handleRemove(e) }}>
                                            Remove
                                        </button>

                                        : null
                                    }
                                </div>
                            )
                        })}
                    </div>
                    
                
                    : null}

                </div>

            </section>

            
        );
    }
};

export default List;