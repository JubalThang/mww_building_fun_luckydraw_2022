
import InputsModel from './InputsModel'
import hearBeat from '../assets/audio/heartbeat.mp3'
import fireworkAudio from '../assets/audio/fireworks.mp3'
import cheerAudio from '../assets/audio/cheer.mp3'
import noWinnerAudio from '../assets/audio/nowinner.mp3'
import churchlogo from '../assets/images/churchlogo.png'
import { useLuckyContext } from '../Context/Context'
import { useState } from 'react'

export const MainPage = () => {
    const [loading, setLoading] = useState(false)
    const [isFireworksShoot, setisFireworksShoot] = useState(false)
    const [winner, setWinner] = useState('')
    const heartBeat = new Audio(hearBeat)
    const [fireworks] = useState(new Audio(fireworkAudio))
    const [cheering] = useState(new Audio(cheerAudio))
    const [noWinner] = useState(new Audio(noWinnerAudio))
    const [ticketToSearch, setTicketToSearch] = useState('')
    const { selectedPrize, handleCurrentPrizeSelect, tickets, selectedPrizes, setSelectedPrizes, handleAddWinner } = useLuckyContext()

    function onSubmitDraw(e) {
        e.preventDefault()
        setLoading(true)
        setTimeout(handleSearchingWinner, 1000)
        heartBeat.play()
    }

    function searchTheWinner(t) {
        return t.ticket_number.match(ticketToSearch)
    }

    function handleSearchingWinner() {
        let prizeWinner = tickets.find(searchTheWinner)
        prizeWinner ? setWinner(prizeWinner) : setWinner({ "user": "" })
        setLoading(false)
        console.log("prize Winner form Main Page :", winner)
        heartBeat.pause()
        if (prizeWinner) {
            handleAddWinner(prizeWinner)
            fireworks.play()
            cheering.play()
            setisFireworksShoot(true)
        } else {
            noWinner.play()
            setisFireworksShoot(false)
            // setSelectedPrizes(selectedPrizes.filter(p => p !== selectedPrize))
        }
        // setisFireworksShoot(true)
    }
    function reload() {
        // window.location.reload()
        setLoading(false)
        setWinner('')
        setisFireworksShoot(false)
        handleCurrentPrizeSelect('')
        fireworks.pause()
        fireworks.currentTime = 0
        cheering.pause()
        cheering.currentTime = 0
        noWinner.pause()
        noWinner.currentTime = 0
    }
    return (
        <div className='w-full flex-1 h-full relative flex'>
            {/* <div className="flex flex-col justify-evenly h-full -z-10"> */}

            <div className="p-5 w-full">
                <div className="flex flex-col">
                    <img src={churchlogo} alt="logo" className='w-32 h-auto' />
                    <h1 className='text-4xl font-bold text-primary -mt-9 ml-6' onClick={() => console.log("click")}>MWC Building Fund 2022</h1>
                </div>
                {
                    selectedPrize && <div className=' mt-10 max-w-max mx-auto border-2 rounded-md border-primary'> <h1 className='text-center text-primary p-3 text-4xl font-semibold'>Draw a Winner for <span className='text-5xl text-amber-700'> {selectedPrize}!</span></h1> </div>
                }
            </div>
            <InputsModel isFireworksShoot={isFireworksShoot} winner={winner} loading={loading} onSubmitDraw={onSubmitDraw} reload={reload} setTicketToSearch={setTicketToSearch} />
        </div>
    )
}
