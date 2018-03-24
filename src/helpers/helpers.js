export const Test = i =>{
    let copy = this.state.tasks.slice();
    copy[i].isCompleted = !copy[i].isCompleted;
    this.setState({tasks: copy});
    console.log("tada")
}


// export const Test = () => {
//     alert("tetst")
// }

// export default Test;
