/**
 * Created by HUNG on 3/23/2017.
 */
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

