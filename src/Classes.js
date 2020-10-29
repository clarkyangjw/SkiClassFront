
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
//import { withRouter, useHistory, Redirect  } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap'
import { withRouter } from 'react-router'

class Classes extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            currentPage: 1,
            isLoaded: false,
        }
        
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        // this.clickHandler = this.clickHandler.bind(this);
    }

    // clickHandler(num){
    //     console.log("asdasd");
    //     return(
    //     <Redirect push to={`/class/${num}`} />
    //     )
    // }

    getData(page) {
        const APIstring = "http://localhost:8080/api";
        return new Promise((resolove, reject) => {
            fetch(`${APIstring}/classes?page=${page}&perPage=10`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    resolove(data);

                })
        });
    }

    componentDidMount() {
        this.getData(this.state.currentPage).then((data) => {
            this.setState({
                classes: data
            })
        })
    }

    previousPage() {
        if (this.state.currentPage > 1) {
            this.getData(this.state.currentPage - 1)
                .then(data => {
                    this.setState((state, props) => {
                        return {
                            classes: data,
                            currentPage: state.currentPage - 1
                        }
                    })
                })
        }
    }

    nextPage() {
        this.getData(this.state.currentPage + 1)
            .then(data => {
                this.setState((state, props) => {
                    return {
                        classes: data,
                        currentPage: state.currentPage + 1
                    }
                })
            })

    }


    render() {
        if (this.state.classes.length > 0) {
            return (
                <div>
                    <h3>Feel free to create a account and add a class to you account! </h3>
                    <p>This is a project website. No payment needed. Thanks!</p>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Instructor</th>
                                <th>Class Level</th>
                                <th>Class Type</th>
                                <th>Avaliable Site</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.classes.map(cla => (
                                // <tr key={cla._id} onClick={()=>{this.props.history.push(`/class/${cla._id}`)}}></tr>
                                <tr key={cla._id} onClick={()=>{this.props.history.push(`/class/${cla._id}`)}}>
                                    <td>{cla.classLocation}</td>
                                    <td>{new Date(cla.classDate).toLocaleDateString()}</td>
                                    <td>{cla.classTime}</td>
                                    <td>{cla.instructorName}</td>
                                    <td>{cla.classLevel}</td>
                                    <td>{cla.classType}</td>
                                    <td>{(cla.classCap - cla.RegistedNumber)>0? (cla.classCap - cla.RegistedNumber) : "Full" }</td>
                                    {/* <td>{cla.classCap - cla.RegistedNumber}</td> */}
                                    <td> {(cla.Price === 0 || isNaN(cla.Price)) ? "Free" : `$ ${cla.Price}` }</td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={this.previousPage} />
                        <Pagination.Item>{this.state.currentPage}</Pagination.Item>
                        <Pagination.Next onClick={this.nextPage} />
                    </Pagination>

                </div>
            );
        }
        else {
            return (
                
                <div>
                    <p>
                        A cat may look at a king (^o^).
                    </p>
                <Pagination>
                        <Pagination.Prev onClick={this.previousPage} />
                        <Pagination.Item>{this.state.currentPage}</Pagination.Item>
                        {/* <Pagination.Next onClick={this.nextPage} /> */}
                    </Pagination>
                </div>


            );
        }

    }
}

Classes.propTypes = {

};

export default withRouter(Classes);