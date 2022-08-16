const ListItem = (props) =>{
   return(
   <li className={props.className}>
      {props.children}
    </li>)
}

export default ListItem