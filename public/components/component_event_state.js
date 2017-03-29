class Clock extends React.Component
{
    constructor(props)
    {
        super(props);
        // this.state = { date:new Date() };

        this.state = {
            currentTime : this.props.time,
            comments : []
        }
    }

    // tick ()
    // {
    //     this.setState({
    //         date : new Date()
    //     });
    // }
    //
    // componentDidMount()
    // {
    //     fetchPosts().then(response =>
    //     {
    //         this.setState({
    //             posts: response.posts
    //         });
    //     });
    //
    //     fetchComments().then(response =>
    //     {
    //        this.setState({
    //             comments: response.comments
    //        });
    //     });
    //
    //     this.timeID = setInterval(
    //         () => this.tick(),
    //         1000
    //     );
    // }
    //
    // componentWillUnmount()
    // {
    //     clearInterval(this.timeID);
    // }

    render()
    {
        return (
            <div>
                <h1>Hellow world</h1>
                <h2>{ this.state.currentTime }</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <div>
        <Clock time="6"/>
        <Clock time="8"/>
    </div>,
    document.getElementById('comments')
);

const styleButton = {
    backgroundColor : 'red',
    fontSize : '20',
};

class Toggle extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { isToggleOn: true };
        this.handleClick = this.handleClicke.bind(this);
    }

    handleClicke()
    {
        this.setState (preState=> ( {
            isToggleOn: !preState.isToggleOn
        }));
    }

    render()
    {
        return (
            <ul>
                {this.props.list.map(function(listValue)
                {
                    return <li>{listValue}</li>;
                })}
            </ul>
        )
    }
}

ReactDOM.render(
    <Toggle list={[1,2,3,4,5]}/>,
    document.getElementById('root')
);


function LogoutButton(props)
{
    return (
        <button onClick={ props.onClick }>
            Loggout
        </button>
    );
}

function LoginButton(props)
{
    return (
        <button onClick={ props.onClick }>
            Loggin
        </button>
    );
}

function UserGreeting(props)
{
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props)
{
    return <h1>Please sign up.</h1>;
}

function Greeting(props)
{
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn)
    {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

class LoggingButton extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn : false };
    }

    handleLoginClick()
    {
        this.setState({ isLoggedIn : true });
    }

    handleLogoutClick()
    {
        this.setState({ isLoggedIn : false });
    }

    render()
    {
        const isLoggedIn = this.state.isLoggedIn;
        let button =  null;
        if (isLoggedIn)
        {
            button = <LogoutButton onClick={ this.handleLogoutClick }/>
        }else
        {
            button = <LoginButton onClick={ this.handleLoginClick }/>
        }
        return (
           <div>
               <Greeting isLoggedIn={ isLoggedIn }/>
               { button}
                the user <b> { isLoggedIn ? 'Currently' : 'not' } </b> logged in
           </div>
        );
    }
}

ReactDOM.render(
    <LoggingButton />,
    document.getElementById('comments')
);


