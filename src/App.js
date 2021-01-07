import React, {Component} from 'react';
import {Button, Container, Input, Label, Row} from 'reactstrap';
import './App.css';
import Table from "reactstrap/es/Table";

const API_URL = "http://exercises-backend.rdx777.usermd.net:12401/";
// const API_URL = "http://localhost:8080/";

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            orderIterative: '',
            orderRecursive: '',
            max: '',
            size: '',
            fibonacciCheck: '',
            fibonacciIterative: '',
            fibonacciRecursive: '',
            sieve: [],
            arrayMap: ''
        };
        this.handleChangeOnFibonacciCheck = this.handleChangeOnFibonacciCheck.bind(this);
        this.handleChangeOnGetFibonacciIterative = this.handleChangeOnGetFibonacciIterative.bind(this);
        this.handleChangeOnGetFibonacciRecursive = this.handleChangeOnGetFibonacciRecursive.bind(this);
        this.handleChangeOnGetSieve = this.handleChangeOnGetSieve.bind(this);
        this.handleChangeOnGetArrayMap = this.handleChangeOnGetArrayMap.bind(this);
        this.handleFibonacciCheck = this.handleFibonacciCheck.bind(this);
        this.getFibonacciIterative = this.getFibonacciIterative.bind(this);
        this.getFibonacciRecursive = this.getFibonacciRecursive.bind(this);
        this.getSieve = this.getSieve.bind(this);
        this.getArrayMap = this.getArrayMap.bind(this);
    }
    
    handleChangeOnFibonacciCheck(event) {
        let number = event.target.value;
        if (isNaN(number)) {
            alert("Provided value is not a number.");
            number = 7; // result -> NO
        }
        if (number > 1000000000 || number < 0) {
            alert("Provided number for check is too big.");
            number = 7; // result -> NO
        }
        // unnecessary value check (server-side app generates exception -> no boolean result
        this.setState({number: number});
    }
    
    async handleFibonacciCheck(event) {
        event.preventDefault();
        const {number} = this.state;
        await fetch(API_URL + 'api/fibonacci/check/' + number)
            .then(response => response.json())
            .then(data => this.setState({fibonacciCheck: data}));
    }
    
    handleChangeOnGetFibonacciIterative(event) {
        let orderIterative = event.target.value;
        if (isNaN(orderIterative)) {
            alert("Provided value is not a number. Number in order set to 0.");
            orderIterative = 0;
        }
        if (orderIterative > 50 || orderIterative < 0) {
            alert("Provided number is out of supported range. Number in order set to 0.");
            orderIterative = 0;
        }
        this.setState({orderIterative: orderIterative});
    }
    
    async getFibonacciIterative(event) {
        event.preventDefault();
        const {orderIterative} = this.state;
        await fetch(API_URL + 'api/fibonacci/get/iterative/' + orderIterative)
            .then(response => response.json())
            .then(data => this.setState({fibonacciIterative: data}));
    }
    
    handleChangeOnGetFibonacciRecursive(event) {
        let orderRecursive = event.target.value;
        if (isNaN(orderRecursive)) {
            alert("Provided value is not a number. Number in order set to 0.");
            orderRecursive = 0;
        }
        if (orderRecursive > 40 || orderRecursive < 0) {
            alert("Provided number is out of supported range. Number in order set to 0.");
            orderRecursive = 0;
        }
        this.setState({orderRecursive: orderRecursive});
    }
    
    async getFibonacciRecursive(event) {
        event.preventDefault();
        const {orderRecursive} = this.state;
        await fetch(API_URL + 'api/fibonacci/get/recursive/' + orderRecursive)
            .then(response => response.json())
            .then(data => this.setState({fibonacciRecursive: data}));
    }
    
    handleChangeOnGetSieve(event) {
        let max = event.target.value;
        if (isNaN(max)) {
            alert("Provided value is not a number. Max. number set to 10.");
            max = 10;
        }
        if (max > 10000 || max < 0 ) {
            alert("Provided number is out of supported range. Max. number set to 10.");
            max = 10;
        }
        this.setState({max: max});
    }
    
    async getSieve(event) {
        event.preventDefault();
        const {max} = this.state;
        await fetch(API_URL + 'api/sieve/' + max)
            .then(response => response.json())
            .then(data => this.setState({sieve: data}));
    }
    
    handleChangeOnGetArrayMap(event) {
        let size = event.target.value;
        if (isNaN(size)) {
            alert("Provided value is not a number. Max. size set to 10.");
            size = 10;
        }
        if (size > 1000 || size < 0) {
            alert("Provided number is out of supported range. Max. size set to 10.");
            size = 10;
        }
        this.setState({size: size});
    }
    
    async getArrayMap(event) {
        event.preventDefault();
        const {size} = this.state;
        await fetch(API_URL + 'api/sort/' + size)
            .then(response => response.json())
            .then(data => this.setState({arrayMap: data}));
    }
    
    render() {
        const {fibonacciCheck, fibonacciIterative, fibonacciRecursive, sieve, arrayMap} = this.state;
        
        var fibonacciCheckResult = 'N/A';
        if (fibonacciCheck === true) {
            fibonacciCheckResult = "YES"
        }
        if (fibonacciCheck === false) {
            fibonacciCheckResult = 'NO'
        }
        
        const sieveResult = sieve.map((s) => <label>{s}  </label>);
        
        const map = new Map(Object.entries(arrayMap));
        var keysArray = new Array(5);
        var valuesArray = new Array(5);
        var i = 1;
        
        map.forEach((value, key) => {
            keysArray[i] = key.toString();
            valuesArray[i] = value.toString();
            i++;
        });
        
        const methodNames = ['Unsorted array', 'Bubble sort', 'Collections sort (Java class)', 'Merge sort', 'Quick sort', 'Selection sort'];
        i = 1;
        const resultOfArrayMap = keysArray.map((k) => {
            const keyString = keysArray[i].toString();
            const valueString = valuesArray[i].toString();
            const methodName = methodNames[i-1];
            i++;
            console.log(keyString + " " + valueString);
            return <tr>
                <td>{methodName}</td>
                <td>{keyString}</td>
                <td>{valueString}</td>
            </tr>;
        });
        
        return (
            <div>
                <Container fluid name="Header" className="mb-2 justify-content-end">
                    <Label style={{margin: '30px 0 0 0'}}>
                        <a target="_blank" rel="noreferrer" href="https://github.com/rdx7777/exercises-backend">
                            <h1>
                                Java exercises
                            </h1>
                        </a>
                    </Label>
                </Container>
                <Container fluid name="Fibonacci Check" className="mb-4">
                    <Row>
                        <Label
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}>
                            Is Fibonacci number? Input a number for check (supported range: 0 - 1,000,000,000):
                        </Label>
                        <Input
                            className="col-md-1"
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}
                            type="text"
                            onChange={this.handleChangeOnFibonacciCheck}
                        />
                        <Button
                            style={{whiteSpace: 'nowrap', margin: '10px 0 0 15px', alignSelf: 'center'}}
                            color="primary"
                            onClick={this.handleFibonacciCheck}>
                            Check
                        </Button>
                        <Label
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}>
                            <span>Check result:  </span>
                            <span>{fibonacciCheckResult}</span>
                        </Label>
                    </Row>
                </Container>
                <Container fluid name="Get Fibonacci Iterative" className="mb-4">
                    <Row>
                        <Label
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}>
                            Get Fibonacci number in order using iterative method (supported range: 0 - 50)
                        </Label>
                        <Input
                            className="col-md-1"
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}
                            type="text"
                            onChange={this.handleChangeOnGetFibonacciIterative}
                        />
                        <Button
                            style={{whiteSpace: 'nowrap', margin: '10px 0 0 15px', alignSelf: 'center'}}
                            color="primary"
                            onClick={this.getFibonacciIterative}>
                            Get
                        </Button>
                        <Label
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}>
                            <span>Result:  </span>
                            <span>{fibonacciIterative}</span>
                        </Label>
                    </Row>
                </Container>
                <Container fluid name="Get Fibonacci Recursive" className="mb-4">
                    <Row>
                        <Label
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}>
                            Get Fibonacci number in order using recursive method (supported range: 0 - 40)
                        </Label>
                        <Input
                            className="col-md-1"
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}
                            type="text"
                            onChange={this.handleChangeOnGetFibonacciRecursive}
                        />
                        <Button
                            style={{whiteSpace: 'nowrap', margin: '10px 0 0 15px', alignSelf: 'center'}}
                            color="primary"
                            onClick={this.getFibonacciRecursive}>
                            Get
                        </Button>
                        <Label
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}>
                            <span>Result:  </span>
                            <span>{fibonacciRecursive}</span>
                        </Label>
                    </Row>
                </Container>
                <Container fluid name="Get Sieve of Eratosthenes" className="mb-4">
                    <Row>
                        <Label
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}>
                            Sieve of Eratosthenes for max. number (supported range: 0 - 10,000)
                        </Label>
                        <Input
                            className="col-md-1"
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}
                            type="text"
                            onChange={this.handleChangeOnGetSieve}
                        />
                        <Button
                            style={{whiteSpace: 'nowrap', margin: '10px 0 0 15px', alignSelf: 'center'}}
                            color="primary"
                            onClick={this.getSieve}>
                            Check
                        </Button>
                    </Row>
                    <Row>
                        <Label style={{margin: '10px 0 0 15px', alignSelf: 'center'}}>
                            Result:  {sieveResult}
                        </Label>
                    </Row>
                </Container>
                <Container fluid name="Get sorted arrays" className="mb-4">
                    <Row>
                        <Label style={{margin: '10px 0 0 15px', alignSelf: 'center'}}>
                            Results of sorting methods for array of max. size (supported range: 0 - 1,000)
                        </Label>
                        <Input
                            className="col-md-1"
                            style={{margin: '10px 0 0 15px', alignSelf: 'center'}}
                            type="text"
                            onChange={this.handleChangeOnGetArrayMap}
                        />
                        <Button
                            style={{whiteSpace: 'nowrap', margin: '10px 0 0 15px', alignSelf: 'center'}}
                            color="primary"
                            onClick={this.getArrayMap}>
                            Get
                        </Button>
                    </Row>
                    <Row>
                        <Table>
                            <thead>
                            <tr>
                                <th>sorting method</th>
                                <th>sorting time (ns)</th>
                                <th>sorting result</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resultOfArrayMap}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;