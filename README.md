## Caso o Tailwind não seja reconhecido, execute:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

fonte: https://tailwindcss.com/docs/guides/vite

## Tópicos MQTT

### baloon/qnt
Nesse tópico escutamos a quantidade de balões disponíveis para personalização.  
Para testar, podemos executar esse comando e enviar uma mensagem:
```sh
mosquitto_pub -h localhost -p 9001 -m "10" -t baloon/qnt
```

### baloon/efeito
Nesse tópico enviamos o novo estado do balão para o Raspbery.  

Estamos nos baseando nessa [tabela](https://drive.google.com/file/d/1_KGfdcrTQomxAG5iJWVJCV57ar3hdRJ7/view)

### baloon/efeito/get
Nesse tópico escutaremos as mudanças do estado do balão
