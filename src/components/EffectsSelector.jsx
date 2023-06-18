// import { useCallback, useEffect, useState } from 'react'
// import { IconContext } from 'react-icons'
// import { dynamicsEffects, staticEffects, staticEffectsNames } from '../effects';
// import { balloons } from '../assets/mock'
// // import { getBalloonEffect, getBalloonQuantity, updateBaloonEffect } from './baloons.service';


// function EffectsSelector({ currentColor, funcToUpBalloon }) {
//     // console.log(currentColor);
//     const [baloonEffect, setBaloonEffect] = useState(currentColor);
//     const [baloonEffectFake, setBaloonEffectFake] = useState(currentColor);

//     return (
//         <div>
//             <form action="" //Menu de seleção de efeito baloonEffect.toString()
//                 className=''>
//                 <div className=''>
//                     <label htmlFor="" className=''>Escolha um efeito: </label>
//                     <select className='bg-white rounded border border-black p-1' id="" value={baloonEffectFake || "1"}
//                         onChange={(e) => {
//                             setBaloonEffectFake(e.target.value)
//                         }}
//                     >
//                         <optgroup label="Estático" >
//                             {Object.entries(staticEffects).map(([val, effect]) => (
//                                 <option key={val} value={val}>{effect}</option>
//                             ))}
//                         </optgroup>
//                         <optgroup label="Dinâmico">
//                             {Object.entries(dynamicsEffects).map(([val, effect]) => (
//                                 <option key={val} value={val}>{effect}</option>
//                             ))}
//                         </optgroup>
//                     </select>
//                 </div>
//                 <div>
//                     <button type='submit' onClick={(e) => {
//                         e.preventDefault();
//                         setBaloonEffect(baloonEffectFake);
//                         funcToUpBalloon(baloonEffectFake);
//                     }}
//                         className='bg-black text-white px-2 py-1 mt-4 rounded'>Salvar</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default EffectsSelector