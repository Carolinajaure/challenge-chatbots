import React, { useState , useEffect } from 'react';
import axios from 'axios';
import icon from '../icons/sushi.png'; // Asegúrate de colocar la ruta correcta al archivo de ícono

function ChatBotInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const resetState = async () => {
      try {
        await axios.post('http://localhost:3001/api/reset');
      } catch (error) {
        console.error('Error al reiniciar el estado:', error);
      }
    };
    resetState();
  }, []);

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/chat');
        setMessages([{ text: response.data.reply, sender: 'bot' }]);
      } catch (error) {
        console.error('Error al obtener el mensaje de bienvenida:', error);
      }
    };
  
    fetchWelcomeMessage(); // Llama a la función para cargar el mensaje de bienvenida
  }, []);
  

  const handleSend = async () => {
    if (!input.trim()) return;

    // Agregar el mensaje del usuario al estado
    setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);

    try {
      // Enviar el mensaje al backend
      
      const response = await axios.post('http://localhost:3001/api/chat', { message: input.replace(/\n/g, '<br>') });

      // Agregar la respuesta del bot al estado
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.reply, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Hubo un error. Por favor, intenta nuevamente.', sender: 'bot' },
      ]);
    }

    // Limpiar el campo de entrada
    setInput('');
  };

  return (
    <div className="chatbot-interface">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === 'bot' ? (
              <div className="bot-message">
                <img src={icon} alt="Bot" className="bot-icon" />
                {/* Usa dangerouslySetInnerHTML para procesar HTML como <br> */}
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ) : (
              <span>{msg.text}</span>
            )}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

export default ChatBotInterface;
