import mqtt from 'mqtt';

const BROKER_URL = import.meta.env.VITE_BROKER_URL;

if (!BROKER_URL) {
    throw new Error("No mqtt broker url given");
}

let client = null;

export function connect() {
    client = mqtt.connect(BROKER_URL);
    client.on('connect', ()=>{   
        console.log(`Connection successful!`)
    })
}


export function publish(message) {
    if(!client) {
        throw new Error("You must connect to client in order to send messages");
    }

    const baloon_management_topic = import.meta.env.VITE_BALOON_MNG_TOPIC;

    if (!baloon_management_topic) {
        throw new Error("No topic given for baloon management");
    }

    client.publish(baloon_management_topic, JSON.stringify(message));
}