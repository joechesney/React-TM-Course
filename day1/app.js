function ActiveFriendsList (props){
  // never ever use the index as the key in a map method call
  // also below, the line with map is auto-returning (ES6 style)
  // so normally there would be curly braces there
  return(
    <ul>
      {props.list.map((name)=>(
        <li key={name}>
          <span>{name}</span>
          <button onClick={()=> props.onRemoveFriend(name)}>Remove</button>
        </li>
      ))}
    </ul>
  )
}
function InactiveFriendsList (props){
  return(
    <ul>
      {props.list.map((name)=>(
        <li key={name}>
          <span>{name}</span>
          <button onClick={()=> props.onRemoveFriend(name)}>Remove</button>
        </li>
      ))}
    </ul>
  )
}
class App extends React.Component {
  constructor(props){
    super(props); // must always be called at the top of constructor

    this.state = {
      friends: [
        {name: "Jordan",
          active: true,
        },
        { name: "McKenzie",
          active: false,
        },
        {name: "Jake",
          active: true,
        }
      ],
      input: '',
    }
    // functions must be bound to the state component
    // the 'this' keyword, when a function is invoked, is referencing
    // what is to the left of the dot, which in the case of
    // handleRemoveFriend, is props on line 10ish in the button
    // the ".bind(this)" method binds 'this' to this component, called 'App'
    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
  }

  handleAddFriend(){
    this.setState((currentState)=>{
      return {
        friends: currentState.friends.concat([currentState.input]),
        input: '',
      }
    })
  }

  handleRemoveFriend(name) {
    // currentState is a default parameter of this.setState??
    // changing this.state doesnt tell React to re-render the virtualDOM
    // only using this.setState will tell it to re-render the virtualDOM
    this.setState((currentState)=>{
      return {
        friends: currentState.friends.filter((friend)=>friend.name !== name)
      }
    })
  }


  updateInput(e) {
    const value = e.target.value;
    // if we dont care about the previous state, then we can return
    // an object to setState, but if we do care about the previou version
    // of state, then we must return a function
    // Here, we return an object bc the input field should be cleared
    // before each addFriend so the previous state of the input doesnt matter
    // Above, in the handleRemoveFriend function, we need to return a
    // function bc we need to pass in currentState, so that we can then
    // update state
    this.setState({
      input: value
    })
  }

  render() {
    return (
      <div>
        <input type="text"
          placeholder="new friend"
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button onClick={this.handleAddFriend}>Submit</button>
        <FriendsList
        list={this.state.friends}
        onRemoveFriend={this.handleRemoveFriend}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);