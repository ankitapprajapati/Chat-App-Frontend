import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import { useRecoilValue } from 'recoil'
import { wssAtom } from '../wssAtom'

const CreateRoom = () => {
  const wss = useRecoilValue(wssAtom)
  const [inputVal, setInputVal] = useState<string>("")
  const [isCopied, setIsCopied] = useState<Boolean>(false)
  const [RoomId, setRoomId] = useState<string>("")
  const navigate = useNavigate()


  const generateString = () => {
    const characters = "1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const handleCopy = async () => {
    if (inputVal.trim() === "") return;
    try {
      await navigator.clipboard.writeText(inputVal)
      setIsCopied(true)
      setTimeout(() => {
        return setIsCopied(false)
      }, 2000)
    } catch (e) {
      console.log("Failed to copy text: " + e)
    }
  }

  const handleJoin = async () => {
    if (RoomId.trim() === "") return;

    try {
      await wss.send(JSON.stringify({
        "type": "join",
        "payload": {
          "roomId": `${RoomId}`
        }
      }))
      navigate(`/room/${RoomId}`)
    } catch (e) {
      console.log("Unable to join the room : " + e)
    }
  }

  return (
    <div className="bg-second px-20 py-8 rounded-lg">
      <Header />
      <div className="text-fifth">
        <label htmlFor="inputVal" className="text-xl">Enter and Generate Text:</label>
        <div className="flex flex-col items-center mt-4">
          <input
            id="inputVal"
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value)
              setIsCopied(false)
            }}
            placeholder="Generate Room Code"
            className="p-3 w-[300px] rounded-md mt-2 text-center bg-third text-white"
          />
          <br />
          <div className="flex items-center justify-around mt-4 w-[300px]">
            <button
              onClick={() => {
                const randomString = generateString();
                setInputVal(randomString)
                setIsCopied(false)
              }}
              className="px-4 py-2 rounded-lg bg-forth text-white hover:bg-third"
            >
              Generate
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg bg-forth text-white hover:bg-third"
            >
              {isCopied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      <div className="text-fifth mt-8">
        <label htmlFor="inputJoin" className="text-xl">Join room with room code</label>
        <div className="mt-2 flex items-center">
          <input
            type="text"
            id="inputJoin"
            value={RoomId}
            onChange={(e) => {
              setRoomId(e.target.value)
            }}
            className="p-3 w-[200px] rounded-md bg-third text-white text-center mt-2"
          />
          <button
            onClick={handleJoin}
            className="px-4 py-2 rounded-lg bg-forth text-white hover:bg-third ml-2"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateRoom
