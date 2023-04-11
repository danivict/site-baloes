import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import iconColor from './assets/icon_colorFilter.svg'
import iconEffects from './assets/icon_magicStar.svg'

function Ballon({ id }) {
  return (
    <div className='relative flex justify-center items-center'>
      <img src={reactLogo} />
      <p className='absolute'>{id}</p>
    </div>
  )
}

function App() {
  const itensMenu = ['Cores', 'Efeitos'];
  const images = [iconColor, iconEffects]

  return (
    <div className="h-screen grid grid-cols-3">
      <div className='col-span-2 flex flex-col gap-10 justify-center items-center'>
        <h1 className='text-3xl'>Balões</h1>
        <div className='flex gap-6'>
          <Ballon id={1} />
          <Ballon id={2} />
          <Ballon id={3} />
          <Ballon id={4} />
        </div>
      </div>
      <div className='bg-black col-span-1 flex justify-center items-center'>
        <ul className='p-10 rounded-md flex flex-col gap-4 justify-center items-center'>
          {itensMenu.map((item, i) => {
            return <li key={item}
              className='text-white text-3xl bg-zinc-900 transition cursor-pointer rounded-md py-2 px-3 border border-transparent 
            hover:border-b hover:border-r hover:border-b-white hover:border-r-white'>
              {<img className='w-6 inline-block' src={images[i]} />} {item}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
