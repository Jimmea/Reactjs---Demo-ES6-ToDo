class GetListItem extends React.Component 
{
    constructor(props) 
    {
        super(props)
        this.state =
        {
            onEdit   :false,
            valueDay :  this.props.day
        }
        this.handleDeleteDay        = this.handleDeleteDay.bind(this);
        this.handleEditDay          = this.handleEditDay.bind(this);
        this.handleSaveDay          = this.handleSaveDay.bind(this);
        this.handleChangeDay        = this.handleChangeDay.bind(this);
        this.handleCancelUpdate     = this.handleCancelUpdate.bind(this);
    }

    showLog()
    {
        console.log(123);
    }

    handleCancelUpdate()
    {
        this.setState({ onEdit : false })
    }

    handleChangeDay(e)
    {
        this.setState({ valueDay : e.target.value })
    }

    handleEditDay()
    {
        this.setState({ onEdit : true })
    }

    handleSaveDay() 
    {
        const that = this
        const data = { id:this.props.index, value: this.state.valueDay};
        $.post('/updateTodo', data, function (reponse)
        {
            that.setState({ onEdit : false })
            that.props.onUpdate(reponse)
        })
    }

    handleDeleteDay() 
    {
        const that = this;
        $.post('/deleteTodo', {id:this.props.index}, function (reponse)
        {
            that.props.onDelete(reponse)
        })
    }

    render() 
    {
        const edit = this.state.onEdit
        let button = null
        return(
            (edit) ?
            (<li className="list-group-item">
                <input class="form-control"
                       onChange={ this.handleChangeDay }
                       defaultValue={ this.state.valueDay }/>
                <div className="pull-right">
                    <button onClick={this.handleCancelUpdate }
                            className="btn-danger btn-xs">
                        Hủy
                    </button>
                    <button onClick={this.handleSaveDay }
                            className="btn-success btn-xs">
                        Save
                    </button>
                </div>
            </li>) :
            (<li className="list-group-item">
                { this.props.day }
                <div className="pull-right">
                    <button onClick={this.handleDeleteDay }
                            className="btn-danger btn-xs">
                        Xóa
                    </button>
                    <button onClick={this.handleEditDay }
                            className="btn-success btn-xs">
                        Sửa
                    </button>
                </div>
            </li>)
        )
    }
}


class ShowListDay extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.getListItem = this.getListItem.bind(this)
    }

    getListItem()
    {
        this.getListItem.showLog()
    }

    render()
    {
        const listDays = this.props.days
        const listItems = listDays.map((day, index) => {
                return <GetListItem onUpdate={ this.props.onUpdate }
                             onDelete={this.props.onDelete }
                             index={index}
                             ref={(listItem)=>{this.getListItem=listItem}}
                             day={day}/>
                })
        return (
            <ul className="list-group">
                { listItems }
            </ul>
        )
    }
}

class FormAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = { day : '' }
        this.handleAddDay    = this.handleAddDay.bind(this)
        this.handleChangeDay = this.handleChangeDay.bind(this)
    }

    handleAddDay(e) {
        let day  = this.state.day;
        var that = this;
        $.post('/addTodo', {day:day}, function (reponse) {
            that.props.onSubmitInput(reponse)
        })
        e.preventDefault()
    }

    handleChangeDay(e) {
        this.setState({ day: e.target.value })
    }

    render() {
        return (
            <form onSubmit={this.handleAddDay} className="form-horizotal">
                <div className="form-group">
                    <label>Nhập ngày</label>
                    <input
                        className="form-control"
                        value={ this.state.value }
                        onChange={this.handleChangeDay}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-info">
                        Send
                    </button>
                </div>
            </form>
        )
    }
}

class AppTodo extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            days : []
        }
        this.handleCallBack = this.handleCallBack.bind(this)
    }

    componentDidMount() {
       var that = this;
       $.post('/getTodo', function (reponse) 
       {
           that.setState({days:reponse})
       })
    }

    handleCallBack(reponse) 
    {
        this.setState({
            days : reponse
        })
    }

    render()
    {
        const days = this.state.days;
        return (
            <div className="div-item row col-md-5">
                <FormAdd onSubmitInput={ this.handleCallBack }/>
                <ShowListDay onUpdate={ this.handleCallBack }
                             onDelete={ this.handleCallBack }
                             days={ days }/>
            </div>
        )
    }
}

const container = document.getElementById('container')
ReactDOM.render(
    <AppTodo />,
    container
)