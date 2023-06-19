
import axios from 'axios';
import { getBalloons, setBalloons } from './assets/mock';

const baseUrl = "192.168.34.120:8000";
export async function getBalloonsInfo() {
    const url = `${baseUrl}/balloons`

    const { data } = await axios.get(url)
    return data;
}

export async function updateBaloonEffect(id, effect) {
    const url = `${baseUrl}/balloons/effect`
    await axios.put(url, { id, effect }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // console.log(getBalloonsInfo())

    // setBalloons(
    //     getBalloons().map((b) => {
    //         if (b.id == id) {
    //             return { ...b, effect: parseInt(effect) }
    //         }
    //         return b
    //     })
    // )
    return getBalloonsInfo()
}


export async function updateAllBaloonsEffect(effect) {
    const url = `${baseUrl}/balloons/effect`
    await axios.put(url, { effect }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // setBalloons(
    //     getBalloons().map((b) => {
    //         return { ...b, effect: parseInt(effect) }
    //     })
    // )
    return getBalloonsInfo()
}