const socket = io();

let output = document.getElementById('output');
let actions = document.getElementById('actions');

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');

btn.addEventListener('click', ()=>{
   // output.innerHTML += `${username.value}: ${message.value}</br>`;
    message.focus();
    socket.emit('chat:message',{
        username: username.value,
        message: message.value,
    })
    message.value = "";
})

message.addEventListener('keypress', (e)=>{

    socket.emit('chat:typing', username.value)

    if(e.keyCode == 13 && !e.shiftKey){
        e.preventDefault();
     //   output.innerHTML += `${username.value}: ${message.value}</br>`;
     message.focus();
     socket.emit('chat:message',{
         username: username.value,
         message: message.value,
     })
     message.value = "";
    }

    
});

socket.on('chat:message',(data)=>{
    actions.textContent = "";
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

socket.on('chat:typing', (data)=>{
        actions.innerHTML = `<p><em>${data} is typing a message...</em></p>`
})


    


