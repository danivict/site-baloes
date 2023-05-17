
import axios from 'axios';
import { getBalloons, setBalloons } from './assets/mock';

export async function getBalloonsInfo() {
    // const url = `${import.meta.env.VITE_BACKEND_URL}/balloons`

    // const { data } = await axios.get(url)
    return getBalloons()
}

export async function updateBaloonEffect(id, effect) {
    // const url = `${import.meta.env.VITE_BACKEND_URL}/balloons/${id}/effect`
    // await axios.put(url, effect, {
    // headers: {
    // 'Content-Type': 'text/plain'
    // }
    // })
    console.log(getBalloonsInfo())

    setBalloons(
        getBalloons().map((b) => {
            if (b.id == id) {
                return { ...b, effect: parseInt(effect) }
            }
            return b
        })
    )
    return getBalloons()
}


export async function updateAllBaloonsEffect(effect) {
    // const url = `${import.meta.env.VITE_BACKEND_URL}/balloons/${id}/effect`
    // await axios.put(url, effect, {
    // headers: {
    // 'Content-Type': 'text/plain'
    // }
    // })
    setBalloons(
        getBalloons().map((b) => {
            return { ...b, effect: parseInt(effect) }
        })
    )
    return getBalloons()
}