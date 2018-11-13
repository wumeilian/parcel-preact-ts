import { h, render, Component } from 'preact';

class Clock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: Date.now()
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                time: Date.now()
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let time = new Date(this.state.time).toLocaleTimeString();
        return <span>{time}</span>
    }
}

render(<Clock />, document.getElementById('clock'));
