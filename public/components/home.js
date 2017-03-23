var Coding = React.createClass({
    getInfo : function() {
        alert(this.props.children);
    },
    render: function ()
    {
        return (
            <div>
                <ul className="orange" class="nav navbar-stacked">
                    <li>
                        <a>{ this.props.cateName }
                        </a>
                        <button onClick={this.getInfo}>Thong tin</button>
                        <Address />
                    </li>
                </ul>
            </div>
        );
    }
});

var Address = React.createClass({
    render:function ()
    {
        return (
            <div>
                <h3>Programming react from facebook</h3>
            </div>
        )
    }
});

function formatName(user) {
    return user.firstName + ' - ' + user.lastName;
}

const user = {
    firstName :  'Nguyen',
    lastName : 'Hungokata',
    avatarUrl : '1234'
};

// const element = (
//     <h1>
//         Hello { formatName(user) }!
//     </h1>
// );

const sourceImg = <img src={ user.avatarUrl }></img>

ReactDOM.render(
    <div>
        <Coding cateName="Trang tru">Trang tru</Coding>
        <Coding cateName="San pham">San pham</Coding>
        <Coding cateName="Gioi thieu">Gioi thieu</Coding>
        <Coding cateName="Lien he"></Coding>
        <Address />
    </div>,
    document.getElementById("root")
);

class Clock extends React.Component
{
    render()
    {
        return (
            <div>
                <h3>Hello, .. kitty</h3>
                <h4>
                    Its is { this.props.date.toLocaleTimeString() }
                </h4>
            </div>
        );
    }
}

function tick()
{
    ReactDOM.render(
        <Clock date={ new Date() }/>,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);

function Welcome(props)
{
    return <h1>Hello, { props.name }</h1>
}

const elementWelcome = <Welcome name="hungokata" />

function App() {
    return (
       <div>
           <Welcome name="Hung"/>
           <Welcome name="Name"/>
           <Welcome name="Hoang"/>
       </div>
    ) ;
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


function formatDate(date)
{
    return date.toLocaleDateString();
}

function Avatar(props)
{
    return (
        <img className="Avatar"
             src={props.user.avatarUrl}
             alt={props.user.name}
        />
    );
}

function UserInfo(props)
{
    return (
        <div className="UserInfo">
            <Avatar user={ props.user }/>
            <div className="UserInfo-name">
                { props.user.name }
            </div>
        </div>
    );
}

function Comment(props)
{
    return (
        <div className="Comment">
            <UserInfo user={ props.author }/>
            <div className="Comment-text">
                { props.text }
            </div>
            <div className="Comment-date">
                { formatDate(props.date)}
            </div>
        </div>
    );
}


// Làm component nho comment
const comment =
{
    date : new Date(),
    text :'I hope you enjoy learning react!',
    author :
    {
        name : 'Hello kitty',
        avatarUrl : 'http://placekitten.com/g/64/64'
    }
};

ReactDOM.render(
    <Comment
        date = { comment.date }
        text = { comment.text }
        author = { comment.author }
    />,
    document.getElementById('comments')
);

