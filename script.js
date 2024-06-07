document.addEventListener("DOMContentLoaded",()=>{
    const date_ = document.querySelector(".datetodisplay")
    const day_ = document.querySelector(".daytodisplay")
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const time_ = document.querySelector(".timedisplay")
    setInterval(()=>{
        let timeobj = new Date()
        const month = timeobj.getMonth() +1
        date_.innerHTML = "Date :" + month+ "/" +timeobj.getDate() + "/" + timeobj.getFullYear()
        day_.innerHTML = "Day : " + weekday[timeobj.getDay()]
        time_.innerHTML = "Time : " + timeobj.getHours() +":" + timeobj.getMinutes() + ":" + timeobj.getSeconds()
    })
    if (localStorage.length != 0) {
        for(let i=0 ; i< localStorage.length;i++) {
            addnewtaskdiv(localStorage.getItem(localStorage.key(i)),localStorage.key(i))
        }
    }
    else {}
})
const inputfield = document.querySelector(".input")
inputfield.addEventListener("keydown",(event) =>{
    if (event.key == "Enter") {
        add.click();
    }
    else {}
})
const add = document.querySelector("#plus");
add.addEventListener("click",()=>{
    var tasktoadd =document.querySelector("#task")
    if (tasktoadd.value){
        let time = new Date()
        const month = time.getMonth() +1
        var str = "" + month + time.getDate() + time.getFullYear() + time.getHours() + time.getMinutes() + time.getSeconds()
        flag = 1 
        for (let i = 0 ; i <= localStorage.length ; i++) {
            if (localStorage.getItem(localStorage.key(i)) == tasktoadd.value) {
                flag = 1;
                break
            }
            else {
                flag = 0;
            }
        }
        if (flag==0) {
            alert("Task added to list succesfully")
            localStorage.setItem(str,tasktoadd.value)
            addnewtaskdiv(tasktoadd.value,str)
            tasktoadd.value = ""
        }
        else {
            alert("Task is already added.")
        }
    }
    else {
        window.alert("You can not add an empty task.")
    }
})
addnewtaskdiv = (tasktoadd,str) =>{
    const tasklist = document.querySelector(".tasklist")
    const newdiv = document.createElement("div")
    const iconsection = document.createElement("div")
    iconsection.setAttribute("class","iconsectiontask")
    iconsection.setAttribute("id",str+"1")
    const delicon = document.createElement("i")
    const editicon = document.createElement("i")
    editicon.setAttribute("class","fa-solid fa-pen-to-square")
    editicon.setAttribute("id","edit")
    editicon.setAttribute("value",str)
    editicon.setAttribute("onclick","edittask(event)")
    editicon.setAttribute("title","click me to edit this task")
    delicon.setAttribute("class","fa-solid fa-trash")
    delicon.setAttribute("id","delete")
    delicon.setAttribute("value",str)
    delicon.setAttribute("onclick","removetask(event)")
    delicon.setAttribute("title","click me to delete this task")
    newdiv.setAttribute("class","taskdiv")
    newdiv.setAttribute("id",str)
    const text = document.createElement("div")
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.setAttribute("class","checkbox")
    checkbox.setAttribute("id",str)
    checkbox.setAttribute("onclick","wanttoremoveornot(event)")
    text.setAttribute("class","tasktext")
    text.innerHTML = tasktoadd
    text.setAttribute("id",str+"2")
    iconsection.appendChild(editicon)
    iconsection.appendChild(delicon)
    newdiv.appendChild(checkbox)    
    newdiv.appendChild(text)
    newdiv.appendChild(iconsection)
    tasklist.appendChild(newdiv)
}
removetask = (event)=> {
    const txt = event.target
    const tasklist = document.querySelector(".tasklist")
    const attributes = txt.attributes
    if (confirm("Press Ok to complete the delete the task!")){
        // console.log(attributes["value"].value)
        var removetask = document.getElementById(attributes["value"].value)
        tasklist.removeChild(removetask)
        localStorage.removeItem(localStorage.key(localStorage.getItem(attributes["value"].value)))
    }
    else {
        window.alert("You canceled the deleting task")
    }
}

edittask = (event)=>{
    const txt = event.target
    const attributes = txt.attributes
    var edittasktext = prompt("Enter The new task : ")
    flag = 1
    for (let i = 0 ; i <= localStorage.length ; i++) {
        if (localStorage.getItem(localStorage.key(i)) == edittasktext){
            flag = 1
            break
        }
        else {
            flag = 0
        }
    }
    if (flag == 1 ) {
        window.alert("Task is already added.")
        edittask(event)
    }
    else {
        if (edittasktext) {
            var edittask_  =  document.getElementById(attributes["value"].value)
            var edittext = document.getElementById(attributes["value"].value+"2")
            const iconsection = document.getElementById(attributes["value"].value+"1")
            edittext.innerHTML = edittasktext
            edittask_.appendChild(iconsection)
            localStorage.removeItem(attributes["value"].value)
            localStorage.setItem(attributes["value"].value,edittasktext)
        }
        else{
            alert("You can empty an added")
        }
    }
}

wanttoremoveornot = (event)=> {
    const chk = event.target
    const  attr = chk.attributes
    var taskdivtoremoveornot = document.getElementById(attr["id"].value)
    window.alert("It seems Like you have completed the task : "+document.getElementById(attr["id"].value+"2").innerHTML)
    if (confirm("Press ok to remove that task")) {
        const tasklist = document.querySelector(".tasklist")
        tasklist.removeChild(taskdivtoremoveornot)
        localStorage.removeItem(localStorage.key(attr["value"]))
    }
    else{
    }
}
window.onload = () => {
    const str = "rajmistry_01rajmistry_01raj_mistry01"
    const txt = document.getElementById("rotatingtext")
    for (let  i = 0 ; i <str.length ;i++) {
        const span = document.createElement("span")
        span.innerHTML = str[i];
        txt.appendChild(span)
        span.style.transform = `rotate(${10*i}deg)`;
    }
}
const removeall = document.querySelector("#removeall")
removeall.addEventListener("click",()=>{
    const tasklist = document.querySelector(".tasklist")
    if (tasklist.innerHTML) {
        if (confirm("Press Ok! to delete the all added task")) {
            tasklist.innerHTML = "";
            localStorage.clear();
        }
        else {
            window.alert("You cancelled the deleting all added task.")
        }
    }
    else {
        window.alert("There are no task added.")
    }
})
const btn = document.querySelector(".btn")
validateform = (event) =>{
    var email = document.querySelector("#email").value
    var rsp = document.querySelector("#fdkbk").value
    if (email == "" || email == null) {
        window.alert("Email is empty , which can not.")
        event.preventDefault()
        return false
    }   
    else {}
    if (rsp == "" || rsp == null) {
        window,alert("Your feedback is empty , which can not")
        event.preventDefault()
        return false
    }
    else {}
    window.alert("Information Sent succesfully")
}
btn.addEventListener("click",validateform);
