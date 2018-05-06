function ActiveFriendsList (props){
  // never ever use the index as the key in a map method call
  // also below, the line with 'map' is auto-returning (ES6 style)
  // so normally there would be curly braces there
  return(
    <div>
      <h2>Active Friends</h2>
      <ul>
        {props.list.map((friend)=>(
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={()=> props.deactivateFriend(friend)}>Deactivate</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
function InactiveFriendsList (props){
  return(
    <div>
      <h2>Inactive Friends</h2>
      <ul>
        {props.list.map((friend)=>(
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={()=> props.activateFriend(friend)}>Activate</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
class App extends React.Component {
  constructor(props){
    super(props); // must always be called at the top of constructor

    this.state = {
      friends: [{name: "Jordan", active: true,},
        { name: "McKenzie",
          active: false,
        },
        {name: "Jake",
          active: true,
        }
      ],
      input: '',
    }
    /* functions must be bound to the state component
     the 'this' keyword, when a function is invoked, is referencing
     what is to the left of the dot, which in the case of
     handleRemoveFriend, is props on line 10ish in the button
     the ".bind(this)" method binds 'this' to this component, called 'App' */
    this.handleClearAll = this.handleClearAll.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.handleAddNewFriend = this.handleAddNewFriend.bind(this);
    this.handleActivateFriend = this.handleActivateFriend.bind(this);
    this.handleDeactivateFriend = this.handleDeactivateFriend.bind(this);
  }

  handleActivateFriend(friend) {
    this.setState((currentState)=>{
      // let newFriendsList = currentState.friends.map(one=>friend == one? friend=friend : one.active = true )
      return {
        friends: currentState.friends.map(one=>friend == one? {name: one.name, active: true }: one),
      }
    })
  }
  handleDeactivateFriend(friend) {
    this.setState((currentState)=>{
      // let newFriendsList = currentState.friends.map(one=>friend == one? friend=friend : one.active = true )
      return {
        friends: currentState.friends.map(one=>friend == one? {name: one.name, active: false }: one),
      }
    })
  }

  handleAddNewFriend(){
    this.setState((currentState)=>{
      return {
        friends: currentState.friends.concat([{name: currentState.input, active: true}]),
        input: '',
      }
    })
  }

  handleClearAll(name) {
    // currentState is a default parameter of this.setState??
    // changing this.state doesnt tell React to re-render the virtualDOM
    // only using this.setState will tell it to re-render the virtualDOM
    this.setState((currentState)=>{
      return {
        friends: []
      }
    })
  }

  updateInput(e) {
    const value = e.target.value;
    /* if we dont care about the previous state, then we can return
     an object to setState, but if we do care about the previou version
     of state, then we must return a function
     Here, we return an object bc the input field should be cleared
     before each addFriend so the previous state of the input doesnt matter
     Above, in the handleRemoveFriend function, we need to return a
     function bc we need to pass in currentState, so that we can then
     update state */
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
        <button onClick={this.handleAddNewFriend}>Submit</button>
        <button onClick={this.handleClearAll}>Clear All</button>
        <ActiveFriendsList
        list={this.state.friends.filter((friend)=>friend.active==true)}
        deactivateFriend={this.handleDeactivateFriend}
        />
        <InactiveFriendsList
        list={this.state.friends.filter((friend)=>friend.active==false)}
        activateFriend={this.handleActivateFriend}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);