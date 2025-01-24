import { useEffect, useRef } from "react";
import Header from "./Header";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { wssAtom } from "../wssAtom";
import { messageAtom } from "../messageAtom";
import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
  const navigate = useNavigate()
  const wss = useRecoilValue(wssAtom); // WebSocket instance from Recoil
  const messages = useRecoilValue(messageAtom)
  const setMessages = useSetRecoilState(messageAtom)

  useEffect( ()=>{
    const isPageRefresh = sessionStorage.getItem('pageRefreshed')
    if( isPageRefresh ) {
      navigate(`/`)
    }
    sessionStorage.setItem('pageRefreshed','true')

    return ()=>{
      sessionStorage.removeItem('pageRefreshed')
    }
  },[navigate])

  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input field

  const handleSendMessage = () => {
    const message = inputRef.current?.value?.trim(); // Trim whitespace
    if (message && wss) {
      // Add the client's message to the chat
      setMessages((prevMessages) => [...prevMessages, ["client", message]]);

      // Send message to the server
      wss.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message,
          },
        })
      );

      // Clear the input field
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-second w-[70%] mt-12 text-2xl rounded-lg p-2 h-[90%]">
      <Header />
      <div className=" flex flex-col w-[80%] bg-second   h-[80%] mt-4 rounded-md pt-5 overflow-auto">
        {messages.map((m, index) => (
          <div key={index} className="clearfix mb-2">
            <span
              className={`${
                m[0] === "server"
                  ? "float-left ml-8 bg-forth"
                  : "float-right mr-8 bg-third"
              } text-lg px-4 py-2 rounded-xl text-fifth`}
            >
              {m[1]}
            </span>
          </div>
        ))}
      </div>
      <div className="w-[60%] bg-second h-[3%] mt-4 rounded-xl px-2 flex items-center">
        <input
          ref={inputRef}
          id="message"
          className="flex-1 bg-third text-white text-center w-[90%] rounded-l-xl px-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="text-center bg-forth text-white w-[10%] rounded-r-xl hover:bg-fifth"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
