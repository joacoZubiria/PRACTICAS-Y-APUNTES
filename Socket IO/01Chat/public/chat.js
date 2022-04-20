(function(d,io){

    const socket = io(),
     $chat = d.querySelector('.chat-container'),
     $form = d.getElementById('chat-form');
   
    d.addEventListener('submit', e => {
        if(e.target === $form){
            e.preventDefault();
            socket.emit('new message', { message : $form.message.value });
            console.log($form.message.value)
            $form.message.value = null;
        }
     });
    
    socket.on('new user', data => alert(data.message));
    socket.on('user says', data =>{
        $chat.insertAdjacentHTML('afterbegin', `<li>${data.message}</li>`);  
    })
    socket.on('chau', data => alert(data.message)) 
})(document, io);