import "./Message.css";

const Message = ({ msg, type }) => {
    //conforme o tipo da mensagem definine o CSS será aplica
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;