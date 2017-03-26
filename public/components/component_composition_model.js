const numbers    = [1,2,3,4,5];
function ListItem(props) {
    return (
        <li>{  props.value }</li>
    );
}
function NumberListItem(props)
{
    const numbers = props.numbers;
    const listItems = numbers.map((number, index) =>
        <ListItem key={ number.toString() } value={ number }/>
    );
    return (
        <ul>
            { listItems }
        </ul>
    );
}

// ReactDOM.render(
//     <NumberListItem numbers={ numbers }/>,
//     document.getElementById('comments')
// );

function Blog(props) {
    const sidebar = (
        <ul>
            { props.posts.map((post) =>
                <li key={ post.id }>{ post.title } </li>
            )}
        </ul>
    );

    const content = props.posts.map((post) =>
        <div key={ post.id }>
            <h3>{ post.title }</h3>
            <h3>{ post.content }</h3>
        </div>
    );

    return (
        <div>
            { sidebar },
            { content }
        </div>
    );
}

// Viet thu mot cai demo
const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
    <Blog posts={ posts }/>,
    document.getElementById('root')
);

// Cho form
class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={ this.state.value } onChange={ this.handleChange }/>
                </label>
                <label>
                    Pick your favorite La Croix flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <FlavorForm/>,
    document.getElementById('root')
);

/*=================================================================================*/
// Lam form check nhiet do
function BoilingVerdict(props) {
    if (props.celsius >= 100)
    {
        return <p> The water would boild </p>;
    }
    return <p>The water would not boil.</p>;
}


const scaleNames = {
    c : 'Celsius',
    f : 'Fahrenheit'
};

class Calculator extends React.Component
{
    render() {
        return (
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        );
    }
}


class TemperatureInput extends React.Component
{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }

    handleChange(e) {
        this.setState({temperature: e.target.value});
    }

    render()
    {
        const temperature   = this.state.temperature;
        const scale         = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={ temperature } onChange={ this.handleChange }/>
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}


ReactDOM.render(
    <form action="">
        <Calculator />
    </form>,
    document.getElementById('root')
);
/*===============================================================================*/
function FancyBorder(props)
{
    return (
        <div className={ 'FancyBorder fancyBorder -' + props.color }>
            { props.children }
        </div>
    );
}

function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">{ props.title }</h1>
            <p className="Dialog-message">
                { props.message }
            </p>
            { props.children }
        </FancyBorder>
    );
}

function WelcomeDialog() {
    return (
        <Dialog title="Welcome" message="Thank you for visitting our spacecraft !"/>
    );
}

class SignUpDialog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { login:'' };
        this.handleChange   = this.handleChange.bind(this);
        this.handleSignUp   = this.handleSignUp .bind(this);
    }

    handleChange(e)
    {
        this.setState({ login: e.target.value });
    }

    handleSignUp()
    {
        alert(`Welcome aboard, ${this.state.login}!`);
    }

    render()
    {
        return (
            <Dialog title="Mars Exploration Program" message="How should we refer to you?">
                <input value={ this.state.login } onChange={ this.handleChange }/>
                <button onClick={ this.handleSignUp }>Signup</button>
            </Dialog>
        )
    }
}

ReactDOM.render(
    <SignUpDialog />,
    document.getElementById('root')
);

/*===============================================================================*/
function SplitPane(props)
{
    return (
        <div className="SplitPane">
            <div className="SplitPanel-left">
                { props.left }
            </div>
            <div className="SplitPanel-right">
                { props.right }
            </div>
        </div>
    );
}

const styleContact = {
    background : 'pink',
    height: 300,
    width : 200,
    float: 'left'
}

const styleChat = {
    background : 'red',
    height: 300,
    width : 500,
    float: 'left'
}

function Contact() {
    return <div style={ styleContact } className="Contacts" />;
}
function Chat() {
    return <div style={ styleChat } className="Chat" />;
}

function App()
{
    return (
        <SplitPane left={ <Contact /> } right={ <Chat /> }/>
    );
}

// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );
