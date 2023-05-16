
import axios from 'axios';

export async function getBalloonQuantity() {
    const url = `${import.meta.env.VITE_BACKEND_URL}/balloons/qnt`

    const {data} = await axios.get(url)
    return data
}

export async function getBalloonEffect() {
    const url = `${import.meta.env.VITE_BACKEND_URL}/balloons/effect`

    const {data} = await axios.get(url)
    console.log(data)
    return data
}

export async function updateBaloonEffect(effect) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/balloons/effect`
    console.log(effect)
    await axios.put(url, effect, {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
}