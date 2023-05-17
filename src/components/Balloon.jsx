import { BsBalloon } from 'react-icons/bs'
import { IconContext } from 'react-icons'
import Modal from 'react-modal'
import close from '../assets/close.svg'
import { useCallback, useEffect, useState } from 'react'
import { dynamicsEffects, staticEffects, staticEffectsNames } from '../effects';
import { memo } from 'react';
Modal.setAppElement("body")

function Balloon({ id, effect, status, battery, updateSingleBalloon }) {
    const [toggleModal, setToggleModal] = useState(false);

    const [baloonEffectSelect, setBaloonEffectSelect] = useState(effect);

    function handleClickToggleModal() {
        setToggleModal(!toggleModal);
    }

    return (
        <>
            <Modal className={`absolute p-8 gap-2 top-10 right-1/2 left-auto bottom-auto translate-x-1/2 translate-y-1/2 rounded shadow-xl border-2 border-${staticEffectsNames[effect]}-00
            bg-white flex flex-row`} isOpen={toggleModal}>
                <div>
                    <IconContext.Provider value={{ color: staticEffectsNames[baloonEffectSelect], size: "5rem", className: `global-class-name drop-shadow-[0_0px_10px_${staticEffectsNames[baloonEffectSelect]}]` }}>
                        <div>
                            <BsBalloon />
                        </div>
                    </IconContext.Provider>
                </div>
                <div>
                    <p>Status: {status}</p>
                    <p>Efeito: {staticEffects[effect]}</p>
                    <p>Bateria: {battery + '%'}</p>
                    <form action="" //Menu de seleção de efeito baloonEffect.toString()
                        className=''>
                        <div className=''>
                            <label htmlFor="" className=''>Escolha um efeito: </label>
                            <select className='bg-white rounded border border-black p-1' id="" value={baloonEffectSelect || "1"}
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
                        <div>
                            <button type='submit' onClick={async (e) => {
                                e.preventDefault();
                                await updateSingleBalloon(id, baloonEffectSelect);
                                handleClickToggleModal();
                            }}
                                className='bg-black text-white px-2 py-1 mt-4 rounded'>Salvar</button>
                        </div>
                    </form>
                </div>

                <img className='absolute -top-3 -right-3 w-10 border border-slate-300 bg-slate-200 p-2 rounded-full
                cursor-pointer' onClick={handleClickToggleModal} src={close} />
            </Modal>



            
            <div onClick={handleClickToggleModal} className='flex flex-col justify-center items-center cursor-pointer p-6 transition rounded-md border border-transparent 
        hover:shadow-lg'>
                <div className='relative flex flex-col justify-center items-center'>
                    <p className='mb-4'>{id}</p>
                    <IconContext.Provider value={{ color: staticEffectsNames[effect], size: "5rem", className: `global-class-name drop-shadow-[0_0px_10px_${staticEffectsNames[effect]}]` }}>
                        <div>
                            <BsBalloon />
                        </div>
                    </IconContext.Provider>
                </div>
                <p className='mt-4'>Status: {status}</p>
            </div>
        </>
    )
}

export default memo(Balloon)