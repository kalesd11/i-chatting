 const socket = io("http://localhost:5000")

 const form = document.getElementById('messageForm')
 const messageInput = document.getElementById("messageInp")
 const messageContainer = document.querySelector('.container')

 const append = (message,position)=>{
   const messageElement = document.createElement("div")
   messageElement.innerText = message;
   messageElement.classList.add(position)
   messageContainer.append(messageElement)
 }
 const username = prompt("Enter Your Name")

 socket.emit("new-user-joined",username)

 socket.on("user-joined",name=>{
    if(name){
      append(`${name} : Joined the Chat`,"center")
    }
    else{
      append(`Unknown : Joined the Chat`,"center")
    }
 })

 socket.on("receive",data=>{
  append(`${data.user} : ${data.message}`,'left')
 })

 socket.on("left", user=>{
    if(user){
      append(`${user} : left the chat!!`,'center')
    }
 })

 form.addEventListener("submit",(e)=>{
  e.preventDefault()
  const message = messageInput.value
  append(`You : ${message}`,'right')
  socket.emit("send",message)
  messageInput.value = ''
 })