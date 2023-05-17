
import axios from 'axios';
import { balloons } from './assets/mock';

export async function getBalloonsInfo() {
    // const url = `${import.meta.env.VITE_BACKEND_URL}/balloons`

    // const { data } = await axios.get(url)
    return balloons
}

export async function updateBaloonEffect(id, effect) {
    // const url = `${import.meta.env.VITE_BACKEND_URL}/balloons/${id}/effect`
    // await axios.put(url, effect, {
    // headers: {
    // 'Content-Type': 'text/plain'
    // }
    // })
    balloons.forEach((b) => {
        if (b.id == id) {
            b.effect = parseInt(effect)
        }
    })
    return balloons
}


export async function updateAllBaloonsEffect(effect) {
    // const url = `${import.meta.env.VITE_BACKEND_URL}/balloons/${id}/effect`
    // await axios.put(url, effect, {
    // headers: {
    // 'Content-Type': 'text/plain'
    // }
    // })
    balloons.forEach((b) => {
        b.effect = parseInt(effect)

    })
    return balloons
}