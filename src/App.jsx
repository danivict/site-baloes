import { useCallback, useEffect, useState } from 'react'
import ballon from './assets/ballon.svg'
import close from './assets/close.svg'
import menuHamburger from './assets/menu_hamburger.svg'
import { connect, getBaloonQuantity, getBaloonEffect, publishBaloonEffect } from './baloons.service';
import { dynamicsEffects, staticEffects } from './effects';

function Ballon({ id }) {
  return (
    <div className='flex flex-col justify-center items-center cursor-pointer p-6 transition rounded-md border border-transparent 
    hover:border-b hover:border-r hover:border-b-black hover:border-r-black'>
      <div className='relative flex justify-center items-center'>
        <img src={ballon} />
        <p className='absolute'>{id}</p>
      </div>
      <p className='mt-4'>Status</p>
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
  const [baloonQuantity, setBaloonQuantity] = useState(null);
  const [baloonEffect, setBaloonEffect] = useState(null);


  function handleClickToggleMenu() {
    setIsActive(!isActive);

    // if (!document.body.classList.contains("overflow-y-hidden")) document.body.classList.add("overflow-y-hidden");
    // else document.body.classList.remove("overflow-y-hidden")
    // console.log(document.body.classList);
  }

  useEffect(()=>{
    connect();
  },[]);


  useEffect(() => {
    getBaloonQuantity(setBaloonQuantity);
  }, [setBaloonQuantity]);

  useEffect(()=>{
    getBaloonEffect(setBaloonEffect);
    if (!baloonEffect) {
      publishBaloonEffect("1");
    }
  }, [setBaloonEffect, baloonEffect]);


  return (
    <>

      <div className="h-screen grid grid-cols-3 max-sm:grid-cols-1 transition">
        <div onClick={handleClickToggleMenu} className={`${isActive ? 'hidden' : null} transition sm:hidden fixed right-10 top-10 cursor-pointer z-10`}><img src={menuHamburger} /></div>
        <div onClick={handleClickToggleMenu} className={`${isActive ? null : 'hidden'} transition sm:hidden fixed right-10 top-10 cursor-pointer invert z-10`}><img src={close} /></div>
        <div className='col-span-2 flex flex-col  gap-10 justify-center items-center'>
          <h1 className='text-3xl max-xs:py-10'>Balões</h1>
          <div className='flex flex-wrap justify-center items-center gap-10'>
            {
              baloonQuantity ? Array(baloonQuantity).fill(true).map((_, i) => <Ballon key={i} id={i + 1} />) : <Spinner />
            }
          </div>
        </div>
        <div className={`${isActive ? 'max-sm:-right-px' : ''} bg-black col-span-1 flex justify-center items-start 
      max-sm:fixed max-sm:-right-full max-sm:h-screen transition-all`}>

          <form action="" //Menu de seleção de efeito
            className='flex flex-col justify-center items-center'>
            <div className='mt-6 px-6 max-sm:mt-28'>
              <label htmlFor="cars" className='text-white'>Escolha um efeito: </label>
              <select className='bg-white' id="cars" value={baloonEffect || "1"}>
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
                publishBaloonEffect(e.target.value);
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
