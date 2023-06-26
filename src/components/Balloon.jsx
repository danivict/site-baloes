import { BsBalloon, BsWifi, BsWifi1, BsWifi2, BsWifiOff } from 'react-icons/bs'
import { IconContext } from 'react-icons'
import Modal from 'react-modal'
import close from '../assets/close.svg'
import { useCallback, useEffect, useState } from 'react'
import { dynamicsEffects, staticEffects, staticEffectsNames } from '../effects';
import { memo } from 'react';
import { BalloonStatus } from '../assets/mock'
Modal.setAppElement("body")

function Balloon({ id, effect, status, battery, signal, updateSingleBalloon }) {
    const [toggleModal, setToggleModal] = useState(false);

    const [baloonEffectSelect, setBaloonEffectSelect] = useState(effect);

    signal = 0; // somente para testar a intensidade do sinal - linha 42

    function handleClickToggleModal() {
        setToggleModal(!toggleModal);
    }

    return (
        <>
            <Modal className={`absolute divide-x-2 p-8 gap-2 top-10 right-1/2 left-auto bottom-auto translate-x-1/2 translate-y-1/2 rounded-xl shadow-xl border-2 border
            bg-white flex flex-row`} isOpen={toggleModal}>
                <div className='flex items-center justify-center'>
                    <IconContext.Provider value={{ color: staticEffectsNames[baloonEffectSelect], size: "10rem", className: `global-class-name drop-shadow-[0_0px_10px_${staticEffectsNames[baloonEffectSelect]}]` }}>
                        <div>
                            <BsBalloon />
                        </div>
                    </IconContext.Provider>
                </div>
                <div className='pl-8'>

                    <form action="" //Menu de seleção de efeito baloonEffect.toString()
                        className='flex flex-col items-end'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-4xl font-bold mb-2 text-zinc-800'>Balão {id}</h1>
                            <p className='text-xl'>Status: <span className='font-semibold'>{status}</span></p>
                            <p className='text-xl'>Efeito Atual: <span className='font-semibold'>{staticEffects[effect]}</span></p>
                            <p className='text-xl'>Bateria: <span className='font-semibold'>{battery + '%'}</span></p>
                            {/* <BsWifi color='green' /> */}
                            <p className='text-xl'>Intensidade do Sinal: <span className='font-semibold inline-block drop-shadow-2xl'>{signal <= 0 && signal > -33 ? <BsWifi color='green' /> : signal < -33 && signal > -66 ? <BsWifi2 color='gold' /> : signal < -66 ? <BsWifi1 color='red' /> : <BsWifiOff color='black' />}</span></p>
                            <div>
                                <label htmlFor="" className='text-xl'>Escolha um efeito: </label>
                                <select className='bg-zinc-300 rounded border p-1 text-xl shadow' id="" value={baloonEffectSelect || "1"}
                                    onChange={(e) => {
                                        setBaloonEffectSelect(e.target.value)
                                    }}
                                >
                                    <optgroup label="Estático" >
                                        {Object.entries(staticEffects).map(([val, effect]) => (
                                            <option key={val} value={val}>{effect}</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="Dinâmico">
                                        {Object.entries(dynamicsEffects).map(([val, effect]) => (
                                            <option key={val} value={val}>{effect}</option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>

                        </div>
                        <div>
                            <button type='submit' onClick={async (e) => {
                                e.preventDefault();
                                await updateSingleBalloon(id, baloonEffectSelect);
                                handleClickToggleModal();
                            }}
                                className='bg-green-700 text-white text-xl px-2 py-1 mt-4 rounded'>Salvar</button>
                        </div>
                    </form>
                </div>

                <img className='absolute -top-3 -right-3 w-10 border border-slate-300 bg-slate-200 p-2 rounded-full
                cursor-pointer' onClick={handleClickToggleModal} src={close} />
            </Modal>




            <div onClick={handleClickToggleModal}
                title={`MAC: ${id}\nStatus: ${status === 0 ? BalloonStatus.INACTIVE : BalloonStatus.ACTIVE}\nEfeito: ${staticEffects[effect]}\nBateria: ${battery}\nIntensidade do sinal: ${signal + 100}%`}
                className='flex flex-col justify-center items-center p-12 cursor-pointer transition bg-white rounded-lg shadow-[3.5px_1.7px_2.9px_rgba(0,0,0,0.25)] divide-y-2'>
                <div className='relative p-6 flex flex-col justify-center items-center'>
                    {/* <p className='mb-4'>{id}</p> */}
                    <IconContext.Provider value={{ color: staticEffectsNames[effect], size: "8rem", className: `${staticEffectsNames[effect]}` }}>
                        <div>
                            <BsBalloon />
                        </div>
                    </IconContext.Provider>
                </div>
                <div className='flex flex-col gap-1 pt-8 text-lg'>
                    <p>MAC: <span className='font-semibold'>{id}</span></p>
                    <p>Status: <span className='font-semibold'>{status === 0 ? BalloonStatus.INACTIVE : BalloonStatus.ACTIVE}</span></p>
                </div>
            </div>
        </>
    )
}

export default memo(Balloon)