import React, { Component } from 'react';

// class Welcome extends Component {
//     constructor() {
//         super()
//         this.state = {
//             message: "Yas Queen",
//             count: 0
//         }
//         this.changeMessage = this.changeMessage.bind(this);
//     }

//     changeMessage() {
//         if (this.state.message == "Yas Queen!") {
//             this.setState({
//                 message: "Toggled!"
//             })
//         } else {
//             this.setState({
//                 message: "Yas Queen!"
//             })
//         }
//         this.setState(prevState => ({
//             count: prevState.count + 1
//         }))
//         count2 += count2
//     }

//     render() {
//         return (
//             <div>
//                 <h1>{this.props.name}: {this.state.message}! ~ {this.state.count} {count2}</h1>
//                 <button onClick={this.changeMessage}>Toggle</button>
//             </div>
//         )
//     }
// }

class Folder extends Component {
    constructor() {
        super()
        this.state = {
            objects: ["1", "2", "3"],
            expanded: false
        }
        this.toggleExpansion = this.toggleExpansion.bind(this)
    }
    addObject(obj){

    }
    toggleExpansion() {
        this.setState({
            expanded: !this.state.expanded
        })
    }
    getList() {
        if (this.state.expanded) {
            let container = document.createElement('div');
            for(let i=0; i < this.state.objects.length; i++) {
                let object = document.createElement('h2');
                object.textContent = 'Number ${i}'
                container.appendChild(object)
                return container
            }
        } else {
            return <div></div>
        }
    }
    render() {
        let container = document.createElement('div')
        container.appendChild((
            <div>
                <button onClick={this.toggleExpansion}>{String(this.state.expanded)}</button>
            </div>
        ))
        container.appendChild(this.getList())
        return container;
    }
}


export default Folder;