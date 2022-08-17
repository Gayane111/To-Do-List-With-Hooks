import { useRef, useState, useCallback} from "react"
import Button from "./Components/Button/Button"
import Input from "./Components/Input/Input"
import List from "./Components/List/List"
import ListItem from "./Components/ListItem/ListItem"
import Text from "./Components/Text/Text"
import Card from "./UI/Card/Card"
import Wrapper from "./UI/Wrapper/Wrapper"
import classes from "./UI/Global.module.css"
import "./App.css"


const App = () => {
 const [userList, setUserList] = useState([
  {
    name: "Ann",
    surname: "Brown",
    age: 32,
    hobby: 'swimming',
    id: 1
  },

  {
    name: "Ben",
    surname: "Smith",
    age: 19,
    hobby: 'football',
    id: 2
  },

  {
    name: "Kate",
    surname: "Williams",
    age: 24,
    hobby: 'cooking',
    id: 3
  },

  {
    name: "David",
    surname: "Tomson",
    age: 38,
    hobby: 'coding',
    id: 4
  },
 ])


const newUserName = useRef('');
const newUserSurname = useRef('');
const newUserAge = useRef('');
const newUserHobby = useRef('');
const [nextUserId, setNextUserId] = useState(5);
const [searchName, setSearchName] = useState('')

const deleteUser = (id) => {
  const newUserList = userList.filter(user => user.id !== id)
  setUserList(newUserList)
}

const checkAge = (item) => {
  return (Number(item.current.value) >= 18 && Number(item.current.value) < 70)
}

const checkInputValue = (inputsArray) => {
  const realInput = inputsArray.filter(el => el.current.value.length >= 2 && el.current.value.length <= 10) 
  return realInput.length === 4
}

const addUser = () => {
  if(checkInputValue([newUserName,newUserName,newUserHobby,newUserAge]) 
    && checkAge(newUserAge)) {
    const newUser = {
    name: newUserName.current.value,
    surname: newUserSurname.current.value,
    age: newUserAge.current.value,
    hobby: newUserHobby.current.value,
    id: nextUserId
  }
    setUserList(userList.concat(newUser));
    setNextUserId(nextUserId + 1)
  }
     return
  }

  const changeNameHandler = (event) => {
    setSearchName(event.target.value)
  }

  const filterByName = useCallback(
    (item) => {
      return item.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
    }, [searchName]
  )

  return (
    <Wrapper>
      <Card className={classes.container}>
      <Card className={classes['new-user-container']}> 
      <Card className={classes.block}>
        <Text>Search user by name</Text>
        <Input placeholder='Search user by name' onChange={changeNameHandler} type='text' />
      </Card>
      </Card>
      <Card className={classes['new-user-container']}> 
      <Card className={classes.block}>
        <Text> New user Name </Text>
        <Input propsRef={newUserName}  placeholder='Write new user name' type='text'/>
      </Card>
      <Card className={classes.block}>
        <Text> New user Surname </Text>
        <Input propsRef={newUserSurname}  placeholder='Write new user surname' type='text'/>
      </Card>
      <Card className={classes.block}>
        <Text> New user age </Text>
        <Input propsRef={newUserAge}  placeholder='Write new user age' type='number'/>
      </Card>
      <Card className={classes.block}>
        <Text> new user hobby </Text>
        <Input propsRef={newUserHobby}  placeholder='Write new user hobby' type='text'/>
      </Card>
        <Button onClick={addUser}> Add user </Button>
      </Card>

      <List className={classes.list} >
        {
          userList.filter(filterByName).map(user => {
            return (
              <ListItem className={classes['list-item']}  key={user.id}>
                <Text> {user.name} </Text>
                <Text> {user.surname} </Text>
                <Text> {user.age} </Text>
                <Text> {user.hobby} </Text>
                <Button onClick={() => deleteUser(user.id)}> delete user </Button>
              </ListItem>
            )
          })
        }
       </List>
       </Card>
    </Wrapper>
  )

}

export default App