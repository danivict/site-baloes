import { useEffect, useState } from 'react'
import iconColor from './assets/icon_colorFilter.svg'
import iconEffects from './assets/icon_magicStar.svg'
import ballon from './assets/ballon.svg'
import close from './assets/close.svg'
import menuHamburger from './assets/menu_hamburger.svg'
import { connect, publish, getBaloonQuantity } from './baloons.service';

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

  function handleClickToggleMenu() {
    setIsActive(!isActive);

    // if (!document.body.classList.contains("overflow-y-hidden")) document.body.classList.add("overflow-y-hidden");
    // else document.body.classList.remove("overflow-y-hidden")
    // console.log(document.body.classList);
  }


  useEffect(() => {
    connect();
    getBaloonQuantity(setBaloonQuantity);
  }, [setBaloonQuantity]);

  return (
    <div className="h-screen grid grid-cols-3 max-sm:grid-cols-1 transition">
      <div onClick={handleClickToggleMenu} className={`${isActive ? 'hidden' : null} transition sm:hidden fixed right-10 top-10 cursor-pointer z-10`}><img src={menuHamburger} /></div>
      <div onClick={handleClickToggleMenu} className={`${isActive ? null : 'hidden'} transition sm:hidden fixed right-10 top-10 cursor-pointer invert z-10`}><img src={close} /></div>
      <div className='col-span-2 flex flex-col  gap-10 justify-center items-center'>
        <h1 className='text-3xl max-xs:py-10'>Balões</h1>
        <div className='flex flex-wrap justify-center items-center gap-10'>
          {
            baloonQuantity ?  Array(baloonQuantity).fill(true).map((_, i) => <Ballon key={i} id={i + 1} />) : <Spinner/>
          }
        </div>
      </div>
      <div className={`${isActive ? 'max-sm:right-0' : null} bg-black col-span-1 flex justify-center items-center 
      max-sm:fixed max-sm:-right-60 max-sm:h-screen transition-all`}>
        <ul className='p-10 rounded-md flex flex-col gap-4 justify-center items-center'>
          <li key='Cores'
            className='text-white text-3xl bg-zinc-900 transition cursor-pointer rounded-md py-2 px-3 border border-transparent whitespace-nowrap 
            hover:border-b hover:border-r hover:border-b-white hover:border-r-white'
          >
            {/* //TODO: ao clicar aqui abrir o selecionador de cores e mudar a pre visualizaçao dos baloes */}
            <img className='w-6 inline-block' src={iconColor} />
            Cores
          </li>

          <li key='Efeitos'
            className='text-white text-3xl bg-zinc-900 transition cursor-pointer rounded-md py-2 px-3 border border-transparent whitespace-nowrap 
            hover:border-b hover:border-r hover:border-b-white hover:border-r-white'
            onClick={() => { publish({ message: "OIiiii" }) }}
          >
            {/* //TODO: ao clicar aqui abrir o selecionador de efeitos e mudar a pre visualizaçao dos baloes */}
            <img className='w-6 inline-block' src={iconEffects} />
            Efeitos
          </li>

        </ul>
      </div>
    </div>
  )
}

export default App
