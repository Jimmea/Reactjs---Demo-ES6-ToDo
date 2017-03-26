/**
 * Created by HUNG on 3/26/2017.
 */
/**
 * Created by HUNG on 3/26/2017.
 */
const MyComponents = {
    DatePicker: function DatePicker(props)
    {
        return <div>Imagine a { props.color } datepicker here</div>
    }
}

function BlueDatePicker()
{
    return  <MyComponents.DatePicker color="blue"/>;
}

function Repeat(props)
{
    let items = [];
    for(let i=0; i< props.numTimes; i ++)
    {
        items.push(props.children(i));
    }
    return <div>{items}</div>;
}

function ListOfTenThings() {
    return (
        <Repeat numTimes={10}>
            {(index) => <div key={index}>this is item {index} in the list</div> }
        </Repeat>
    );
}

ReactDOM.render(
    <ListOfTenThings />,
    document.getElementById('container'),
);