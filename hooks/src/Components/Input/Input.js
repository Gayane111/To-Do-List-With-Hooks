const Input = (props) => {
    return(
        <input 
        ref={props.propsRef}
        onChange = {props.onChange}
        placeholder = {props.placeholder}
        className = {props.className}
        type={props.type}
        />
    )
}

export default Input
