import { useCallback, useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import close from './assets/close.svg'
import Balloon from './components/Balloon'
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
  const [balloons, setBalloons] = useState([]);

  const [baloonEffectSelect, setBaloonEffectSelect] = useState(1);
  useEffect(() => {
    const aux = async () => {
      setBalloons(await getBalloonsInfo())
      //setBaloonQuantity(await getBalloonQuantity());
    }
    aux();
  }, []);

  const updateSingleBalloonEffectOnAPI = useCallback(async (id, effect) => {
    console.log(`Atualizando balao ${id} para efeito ${effect}`)
    const updatedBalloons = await updateBaloonEffect(id, effect);
    console.log(updatedBalloons)
    setBalloons(updatedBalloons);
  }, [setBalloons]);

  const udpateBaloonEffectOnAPI = async () => {
    console.log("Enviando: " + baloonEffectSelect)
    const updatedBalloons = await updateAllBaloonsEffect(baloonEffectSelect);
    console.log(updatedBalloons)

    setBalloons(updatedBalloons);
  };

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
              balloons.map(x => <Balloon key={x['id']} id={x['id']} effect={x.effect} status={x['status']} battery={x['battery']} updateSingleBalloon={updateSingleBalloonEffectOnAPI} />)
            }
          </div>
        </div>
        <div className={`${isActive ? 'max-sm:-right-px' : ''} bg-black col-span-1 flex justify-center items-start 
      max-sm:fixed max-sm:-right-full max-sm:h-screen transition-all`}>


          <form action="" //Menu de seleção de efeito baloonEffect.toString()
            className='flex flex-col justify-center items-center'>
            <div className='mt-6 px-6 max-sm:mt-28'>
              <p className='text-white'>Todos os balões:</p>
              <label htmlFor="" className='text-white'>Escolha um efeito: </label>
              <select className='bg-white' id="" value={baloonEffectSelect || "1"}
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
            </div>
            <div>
              <button type='submit' onClick={(e) => {
                e.preventDefault();
                udpateBaloonEffectOnAPI();
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
