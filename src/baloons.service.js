
import axios from 'axios';
import { baloons } from './assets/mock';

export async function getBalloonsInfo() {
    // const url = `${import.meta.env.VITE_BACKEND_URL}/balloons`

    // const { data } = await axios.get(url)
    return baloons
}

export async function updateBaloonEffect(id, effect) {
    // const url = `${import.meta.env.VITE_BACKEND_URL}/balloons/${id}/effect`
    // await axios.put(url, effect, {
        // headers: {
            // 'Content-Type': 'text/plain'
        // }
    // })
}


export async function updateAllBaloonsEffect(effect) {
    // const url = `${import.meta.env.VITE_BACKEND_URL}/balloons/${id}/effect`
    // await axios.put(url, effect, {
        // headers: {
            // 'Content-Type': 'text/plain'
        // }
    // })
}