import { useCallback, useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { BsBalloon } from 'react-icons/bs'
import ballon from './assets/ballon.svg'
import close from './assets/close.svg'
import menuHamburger from './assets/menu_hamburger.svg'
import { dynamicsEffects, staticEffects, staticEffectsNames } from './effects';
import { getBalloonEffect, getBalloonQuantity, updateBaloonEffect } from './baloons.service';

function Ballon({ id, color }) {
  return (
    <div className='flex flex-col justify-center items-center cursor-pointer transition bg-white rounded-md shadow-[3.5px_1.7px_2.9px_rgba(0,0,0,0.25)] divide-y-2'>
      <div className='relative py-2 px-12 flex flex-col justify-center items-center'>
        {/* <p className='mb-4'>{id}</p> */}
        <IconContext.Provider value={{ color: color, size: "5rem", className: ` global-class-name drop-shadow-[0_0px_10px_${color}]` }}>
          <div>
            <BsBalloon />
          </div>
        </IconContext.Provider>
      </div>
      <div className='flex flex-col gap-1 pt-8'>
        <p>Nome: <span className='font-medium'>Balão {id}</span></p>
        <p>Status: <span className='font-medium'>Active</span></p>
      </div>
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
  const [baloonEffect, setBaloonEffect] = useState(11);

  useEffect(() => {
    const aux = async () => {
      setBaloonQuantity(await getBalloonQuantity());
      setBaloonEffect(await getBalloonEffect());
    }
    aux();
  }, []);


  const udpateBaloonEffectOnAPI = useCallback(async (effect) => {
    console.log("Enviando: " + effect)
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

      <div className="h-screen grid grid-rows-2 transition mx-28">
        <form action="" className={`grid grid-cols-[42rem_minmax(0rem,_1fr)_0px]  justify-center items-center ${isActive ? 'max-sm:-right-px' : ''} rounded-3xl mt-10 h-3/4	bg-zinc-900 max-sm:fixed max-sm:-right-full max-sm:h-screen transition-all`}>
          <div className='px-16 flex flex-col'>
            <label htmlFor="effects" className='text-white text-5xl font-medium'>Adicione efeitos em todos os balões: </label>
            <select className='mt-8 rounded-md text-center py-3 bg-white text-base font-normal leading-5' id="effects" value={baloonEffect || "1"}
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
            <button type='submit' onClick={(e) => {
              e.preventDefault();
              udpateBaloonEffectOnAPI(baloonEffect);
            }}
              className='text-base text-white font-medium bg-green-700 py-2 px-3 mt-7 rounded-md self-end'>Adicionar</button>
          </div>

          {/* Fake div para o divider */}
          <div className=" flex flex-col rounded-3xl justify-center divide-x-[1px] divide-slate-500 h-full bg-no-repeat bg-cover bg-[top_left_8rem] mix-blend-color-dodge bg-[url('assets/bg-balloons.png')]">
            <div className='text-transparent '></div>
            <div className='text-transparent h-48'></div>
          </div>
        </form>


        <div onClick={handleClickToggleMenu} className={`${isActive ? 'hidden' : null} transition sm:hidden fixed right-10 top-10 cursor-pointer z-10`}><img src={menuHamburger} /></div>
        <div onClick={handleClickToggleMenu} className={`${isActive ? null : 'hidden'} transition sm:hidden fixed right-10 top-10 cursor-pointer invert z-10`}><img src={close} /></div>
        <div className='flex flex-col gap-10 justify-center items-center'>
          <h1 className='flex justify-center items-center gap-2 text-4xl text-gray-800 font-semibold'><BsBalloon />Balões Cadastrados</h1>
          <div className='flex flex-wrap justify-center items-center gap-10'>
            {
              baloonQuantity ? Array(baloonQuantity).fill(true).map((_, i) => <Ballon key={i} id={i + 1} color={staticEffectsNames[baloonEffect.toString()]} />) : <Spinner />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
