# Meetups & Birras

Desafío técnico meetups para Santander Rio Tecnología. Implementación de web SPA responsiva usando React (hooks) + API Firebase como db + API Openweather. La aplicación brinda un servicio para agendar meetups, saber la temperatura del evento si falta menos de una semana (API limit), y la cantidad de cerveza a comprar dependiendo de los suscriptos a la misma. 

## Live demo:

> https://meetupsbirras.netlify.app/

![desktop_version](https://github.com/ivancanga/meetups/blob/master/src/assets/desktop-version.png)

## Features:

- Sistema de registro por Firebase.

- Sistema de logeo a través de username con autenticación por Firebase.

### Admin

```
username: admin
password: 123456
```

- Panel para agendar una meetup, con un datepicker (MaterialUI), título y descripción de evento.

- Sección de meetups agendadas, informando fecha, clima, asistentes al evento, información, y cantidad de cervezas para pedir a proveedor.

### User

- Panel visualizando meetups próximas informando fecha, clima, asistentes al evento e información.

- Posibilidad de suscribirte a un evento que persiste en la cuenta de usuario de la db.

## Technical information:

- La configuración y API keys de Firebase se encuentra en un .env por lo tanto no es posible levantar un go live de forma local. Para ello ver la aplicación en > https://meetupsbirras.netlify.app/.

- Puede cambiar la ubicación del evento para que la API traiga diferentes climas. Para ello ir a src > services > API-services.js y cambiar clave location del objeto api por location.berlin o location.buenosaires.

```
const api = {
  base: "https://api.openweathermap.org/data/2.5/onecall",
  location: location.buenosaires,
  key: "********************",
};
```
