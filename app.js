const messagesEl = document.getElementById('messages');
const form = document.getElementById('sendForm');
const messageInput = document.getElementById('messageInput');
const usernameInput = document.getElementById('username');

async function fetchMessages() {
    try {
        const res = await fetch('/messages');
        const data = await res.json();
        messagesEl.innerHTML = '';
        data.messages.forEach(m => {
            const div = document.createElement('div');
            div.textContent = `${m.username}: ${m.message}`;
            messagesEl.appendChild(div);
        });
        messagesEl.scrollTop = messagesEl.scrollHeight;
    } catch(e) {
        console.error('Failed to fetch messages', e);
    }
}

// Send message
form.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = messageInput.value.trim();
    if(!msg) return;
    await fetch('/send', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: usernameInput.value, message: msg})
    });
    messageInput.value = '';
    fetchMessages();
});

// Poll messages every 1s
setInterval(fetchMessages, 1000);
fetchMessages();
