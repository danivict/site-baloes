import { useCallback, useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import close from './assets/close.svg'
import Balloon from './components/Balloon'
import { BsBalloon } from 'react-icons/bs'
import ifpbIcon from './assets/ifpbIcon.png'
import menuHamburger from './assets/menu_hamburger.svg'
import { dynamicsEffects, staticEffects, staticEffectsNames } from './effects';
import { getBalloonsInfo, updateBaloonEffect, updateAllBaloonsEffect } from './baloons.service';

function Spinner() {
  return (
    <div className="loader"></div>
  );
}

function App() {
  const [isActive, setIsActive] = useState(false);
  const [baloonEffectSelect, setBaloonEffectSelect] = useState(1);

  const [balloons, setBalloons] = useState([]);





  useEffect(() => {
    const aux = async () => {
      setBalloons(await getBalloonsInfo())
      console.log("Aux aqui")
    }
    aux();
  }, []);


  useEffect(() => {
    const interval = setInterval(async () => {
      setBalloons(await getBalloonsInfo())
    }, 5000)
    return () => clearInterval(interval)
  }, []);

  const updateSingleBalloonEffectOnAPI = useCallback(async (id, effect) => {
    console.log(`Atualizando balao ${id} para efeito ${effect}`)
    const updatedBalloons = await updateBaloonEffect(id, effect);
    console.log(updatedBalloons)
    setBalloons(updatedBalloons);
  }, []);


  const updateAllBalloonsEffectOnAPI = useCallback(async (e) => {
    e.preventDefault();
    const updatedBalloons = await updateAllBaloonsEffect(baloonEffectSelect);
    setBalloons(updatedBalloons);
  }, [baloonEffectSelect]);

  function handleClickToggleMenu() {
    setIsActive(!isActive);
  }

  return (
    <>
      <div className='firework'></div>
      <div className='firework'></div>
      <div className='firework'></div>
      <div className="grid grid-rows-[30rem_minmax(0px,_1fr)_100px] transition mx-28">
        <form action="" //Menu de seleção de efeito baloonEffect.toString()
          className={`grid grid-cols-2  justify-center items-center ${isActive ? 'max-sm:-right-px' : ''} max-xl:grid-cols-1 max-xl:bg-[url('assets/bg-balloons.png')] max-xl:bg-blend-color-dodge rounded-3xl mt-10 h-3/4	bg-zinc-900  transition-all`} onSubmit={updateAllBalloonsEffectOnAPI}>
          <div className='px-16 max-sm:px-6 flex flex-col'>
            <label htmlFor="effects" className='text-white text-5xl max-sm:text-4xl max-xs:text-3xl max-sm:text-center font-medium leading-tight'>Adicione efeitos em todos os balões: </label>
            <select className='mt-8 rounded-md text-center py-3 bg-white text-base font-normal leading-5' id="" value={baloonEffectSelect || "1"}
              onChange={(e) => {
                setBaloonEffectSelect(e.target.value);
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
            <button type='submit' className='text-base text-white font-medium bg-green-700 py-2 px-3 mt-7 rounded-md self-end max-sm:w-full'>Adicionar</button>
          </div>
          {/* Fake div para o divider */}
          <div className=" flex relative flex-col rounded-3xl justify-center divide-x-[1px] divide-slate-500 h-full bg-no-repeat bg-cover bg-[top_left_8rem] mix-blend-color-dodge bg-[url('assets/bg-balloons.png')] bg-no-repeat max-xl:sr-only">
            <div className='text-transparent '></div>
            <div className='text-transparent h-48'></div>
          </div>
        </form>

        {/* <div onClick={handleClickToggleMenu} className={`${isActive ? 'hidden' : null} transition sm:hidden fixed right-10 top-10 cursor-pointer z-10`}><img src={menuHamburger} /></div>
        <div onClick={handleClickToggleMenu} className={`${isActive ? null : 'hidden'} transition sm:hidden fixed right-10 top-10 cursor-pointer invert z-10`}><img src={close} /></div> */}
        <div className='flex flex-col gap-10 justify-center items-center'>
          <h1 className='flex justify-center items-center gap-2 text-4xl text-gray-800 font-semibold max-sm:text-center'><BsBalloon className='max-sm:text-7xl' />Balões Cadastrados</h1>
          <div className='flex flex-wrap justify-center items-center gap-10'>
            {
              balloons.map(x =>
                <Balloon key={x['id']} id={x['id']} effect={x.effect} status={x['status']} battery={x['battery']} updateSingleBalloon={updateSingleBalloonEffectOnAPI} />
              )
            }

          </div>
        </div>
      </div>

    </>
  )
}

export default App
