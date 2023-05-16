import { useCallback, useEffect, useState } from 'react'
import {IconContext} from 'react-icons'
import {BsBalloon} from 'react-icons/bs'
import ballon from './assets/ballon.svg'
import close from './assets/close.svg'
import menuHamburger from './assets/menu_hamburger.svg'
import { dynamicsEffects, staticEffects, staticEffectsNames } from './effects';
import { getBalloonEffect, getBalloonQuantity, updateBaloonEffect } from './baloons.service';

function Ballon({ id, color }) {
  return (
    <div className='flex flex-col justify-center items-center cursor-pointer p-6 transition rounded-md border border-transparent 
    hover:shadow-lg'>
      <div className='relative flex flex-col justify-center items-center'>
        <p className='mb-4'>{id}</p>
        <IconContext.Provider value={{ color: color, size: "5rem", className: `global-class-name drop-shadow-[0_0px_10px_${color}]` }}>
          <div>
            <BsBalloon/>
          </div>
        </IconContext.Provider>
      </div>
      <p className='mt-4'>Status </p>
    </div>
  )
}
function Spinner() {
  return (
    <div className="loader"></div>
  );
}

function App() {
  const [isActive, setIsActive] = useState(false);
  const [baloonQuantity, setBaloonQuantity] = useState(4);
  const [baloonEffect, setBaloonEffect] = useState(1);

  useEffect(() => {
    const aux = async () => {
      setBaloonQuantity(await getBalloonQuantity());
      setBaloonEffect(await getBalloonEffect());
    }
    aux();
  }, []);


  const udpateBaloonEffectOnAPI = useCallback(async (effect) => {
    console.log("Enviando: "+ effect)
    await updateBaloonEffect(effect);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    });
    setBaloonEffect(await getBalloonEffect());
  }, [setBaloonEffect]);

  function handleClickToggleMenu() {
    setIsActive(!isActive);
  }

  return (
    <>

      <div className="h-screen grid grid-cols-3 max-sm:grid-cols-1 transition">
        <div onClick={handleClickToggleMenu} className={`${isActive ? 'hidden' : null} transition sm:hidden fixed right-10 top-10 cursor-pointer z-10`}><img src={menuHamburger} /></div>
        <div onClick={handleClickToggleMenu} className={`${isActive ? null : 'hidden'} transition sm:hidden fixed right-10 top-10 cursor-pointer invert z-10`}><img src={close} /></div>
        <div className='col-span-2 flex flex-col  gap-10 justify-center items-center'>
          <h1 className='text-3xl max-xs:py-10'>Balões</h1>
          <div className='flex flex-wrap justify-center items-center gap-10'> 
            {
              baloonQuantity ? Array(baloonQuantity).fill(true).map((_, i) => <Ballon key={i} id={i + 1} color={ staticEffectsNames[baloonEffect.toString()] } />) : <Spinner />
            }
          </div>
        </div>
        <div className={`${isActive ? 'max-sm:-right-px' : ''} bg-black col-span-1 flex justify-center items-start 
      max-sm:fixed max-sm:-right-full max-sm:h-screen transition-all`}>


          <form action="" //Menu de seleção de efeito baloonEffect.toString()
            className='flex flex-col justify-center items-center'>
            <div className='mt-6 px-6 max-sm:mt-28'>
              <label htmlFor="cars" className='text-white'>Escolha um efeito: </label>
              <select className='bg-white' id="cars" value={baloonEffect || "1"}
                onChange={(e) => {
                  setBaloonEffect(e.target.value)
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
              <button type='submit' onClick={(e) => {
                e.preventDefault();
                udpateBaloonEffectOnAPI(baloonEffect);
              }}
                className='bg-white px-2 py-1 mt-4 rounded'>Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
