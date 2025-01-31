
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ChatRoom from './components/ChatRoom'
import CreateRoom from './components/CreateRoom'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { wssAtom } from './wssAtom'
import { messageAtom } from './messageAtom'

  function App() {
    const setWs = useSetRecoilState(wssAtom)
    const setMessages = useSetRecoilState(messageAtom)
  
    useEffect( ()=>{
      try{
        const wss = new WebSocket("https://chat-app-server-g0pd.onrender.com");
        
        wss.onopen = ()=>{
          console.log("connected to server")
          setWs(wss)
        }

        wss.onmessage = (event)=>{
          setMessages((prevMessages) => [...prevMessages, ["server", event.data]]);
        }

        wss.onclose = ()=>{
          console.log("connection is closed");
          setWs(undefined)
        }

        wss.onerror = (e)=>{
          console.log("websocket error: ", e)
        }
        // cleanup
        return ()=>{
          wss.close()
        }
      }
      catch(e){
        console.log("server die")
      }

    },[])
    
    

  return(
    <>
      <div className='bg-first h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/' element={<CreateRoom/>}/>
          <Route path='/room/:roomId' element={<ChatRoom/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
