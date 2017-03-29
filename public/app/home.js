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
/*============================= EXAMPLE menu==================================== */
class Menu extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={ focused:0 }
        this.clicked = this.clicked.bind(this)
    }

    clicked(index)
    {
        this.setState({focused:index})
    }
    render()
    {
        const self = this;
        return (
            <div>
                <ul>
                    { this.props.items.map(function (m, index) {
                        var style = '';
                        if(self.state.focused == index )
                        {
                            style = 'focused';
                        }
                        return <li className={style} onClick={self.clicked.bind(self, index)}>{m}</li>
                    }) }
                </ul>
                <p>Selected :  { this.props.items[this.state.focused]}</p>
            </div>
        )
    }
}

const items = ['Home', 'Services', 'About', 'Contact us'];
ReactDOM.render(
    <Menu items={ items }/>,
    document.getElementById('root')
)

/*Realtime search*/
class Search extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {searchString : ''}
        this.handChange = this.handChange.bind(this);
    }

    handChange(e)
    {
        this.setState({searchString:e.target.value})
    }

    render()
    {
        var libraries    = this.props.items,
            searchString  = this.state.searchString.trim().toLowerCase();
        if (searchString.length >  0)
        {
            libraries =  libraries.filter(function (l) {
                return l.name.toLowerCase().match(searchString)
            })
        }

        return (
            <div>
                <input type="text"
                       placeholder="SearchHere"
                       value={this.state.searchString}
                       onChange={this.handChange}/>
                <ul>
                    { libraries.map(function (l) {
                        return <li>{l.name} <a href={l.url}>{l.url}</a></li>
                    })}
                </ul>
            </div>
        )
    }
}
var libraries = [
    { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/'},
    { name: 'AngularJS', url: 'https://angularjs.org/'},
    { name: 'jQuery', url: 'http://jquery.com/'},
    { name: 'Prototype', url: 'http://www.prototypejs.org/'},
    { name: 'React', url: 'http://facebook.github.io/react/'},
    { name: 'Ember', url: 'http://emberjs.com/'},
    { name: 'Knockout.js', url: 'http://knockoutjs.com/'},
    { name: 'Dojo', url: 'http://dojotoolkit.org/'},
    { name: 'Mootools', url: 'http://mootools.net/'},
    { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/'},
    { name: 'Lodash', url: 'http://lodash.com/'},
    { name: 'Moment', url: 'http://momentjs.com/'},
    { name: 'Express', url: 'http://expressjs.com/'},
    { name: 'Koa', url: 'http://koajs.com/'},

];
ReactDOM.render(
    <Search items={libraries}/>,
    document.getElementById('comments')
)

/*Order Form*/

class Service extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {active: false}
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler()
    {
        let active = !this.state.active
        this.setState({active:active})
        this.props.addTotal(active ? this.props.price : - this.props.price)
    }

    render()
    {
        return (
            <p className={this.state.active ? 'active' : ''}
                onClick={this.clickHandler}>
                {this.props.name} <b>{this.props.price.toFixed(2)}</b>
            </p>
        )
    }
}

class ServiceChooser extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = { total : 0}
        this.addTotal  = this.addTotal.bind(this)
    }

    addTotal(price)
    {
        this.setState({total: this.state.total + price})
    }

    render()
    {
        var self = this
        var service = this.props.items.map(function (s) {
            return <Service name={s.name} price={s.price} active={s.active} addTotal={self.addTotal}/>
        })
        return (
            <div>
                <h1>Our services</h1>
                <div id="services">
                    {service},
                    <p id="total">Total <b>{this.state.total.toFixed(2)}</b></p>
                </div>
            </div>
        )
    }
}
var services = [
    { name: 'Web Development', price: 300 },
    { name: 'Design', price: 400 },
    { name: 'Integration', price: 250 },
    { name: 'Training', price: 220 }
];

ReactDOM.render(
    <ServiceChooser items={ services } />,
    document.getElementById('order')
);