import mqtt from 'mqtt';
import { allEffects } from './effects';

const BROKER_URL = import.meta.env.VITE_BROKER_URL;

if (!BROKER_URL) {
    throw new Error("No mqtt broker url given");
}

let client = null;

export function connect() {
    client = mqtt.connect(BROKER_URL);
    client.on('connect', () => {
        console.log(`Connection successful!`)
    })

    client.on('error', (err) => {
        console.error(err);
        throw new Error("Failed to connect to mqtt server")
    })
}


export function publishBaloonEffect(effect) {
    if (!client) {
        throw new Error("You must connect to client in order to send messages");
    }

    const baloon_management_topic = import.meta.env.VITE_BALOON_MNG_TOPIC;

    if (!baloon_management_topic) {
        throw new Error("No topic given for baloon management");
    }

    client.publish(baloon_management_topic, effect, null, (err) => {
        console.error(err);
        throw new Error("Failed to send baloon effect:")
    });
}

export function getBaloonQuantity(callback) {
    if (!client) {
        throw new Error("You must connect to client in order to send messages");
    }

    const baloon_quantity_topic = import.meta.env.VITE_BALOON_QUANTITY_TOPIC;

    if (!baloon_quantity_topic) {
        throw new Error("No topic given for baloon management");
    }

    client.subscribe(baloon_quantity_topic);

    client.on("message", (topic, message) => {
        const baloonQuantity = Number(message.toString())
        callback(baloonQuantity)
    })
}

export function getBaloonEffect(callback) {
    if (!client) {
        throw new Error("You must connect to client in order to send messages");
    }

    const baloon_quantity_response_topic = import.meta.env.VITE_BALOON_MNG_RESP_TOPIC;

    if (!baloon_quantity_response_topic) {
        throw new Error("No topic given for baloon management");
    }

    client.subscribe(baloon_quantity_response_topic);
    client.on("message", (_topic, message) => {
        const baloonActualState = message.toString()
        const validBaloonStates = Object.keys(allEffects)
        if (!(baloonActualState in validBaloonStates)) {
            throw new Error(`Invalid baloon state: ${baloonActualState}`)
        }
        callback(baloonActualState)
    })

}