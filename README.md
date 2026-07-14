# RankHub_TFM

## Guía de instalación y arranque local

Este repositorio contiene una arquitectura de microservicios basada en Spring Boot para el backend y React + Vite para el frontend. La siguiente guía resume lo necesario para descargar el proyecto, prepararlo en local y ejecutarlo para pruebas.

## Requisitos previos

Instala antes de empezar:

- Git
- Java 17
- Node.js 20 LTS o superior
- npm
- PostgreSQL 14 o superior
- Opcional: Docker Desktop, si prefieres levantar PostgreSQL en contenedor

No es necesario instalar Maven de forma global, porque cada servicio Java incluye el wrapper `mvnw`.

## Versiones del proyecto


- `auth-service`: Spring Boot 3.4.2, Java 17
- `gateway`: Spring Boot 3.5.13, Java 17
- `eureka`: Spring Boot 3.3.5, Java 17
- `ranking-service`: Spring Boot 3.4.4, Java 17
- Frontend: React 19.2.4, Vite 8.0.4
- Driver PostgreSQL: 42.7.5

## Descarga del proyecto

```powershell
git clone <URL-del-repositorio>
cd RankHub_TFM
```

## Base de datos

El proyecto espera varias bases de datos PostgreSQL locales:

- `usersdb`
- `rankingsdb`
- `chatsdb`
- `betsdb`
- `invitationdb`

Puedes crearlas manualmente desde `psql`:

```sql
CREATE DATABASE usersdb;
CREATE DATABASE rankingsdb;
CREATE DATABASE chatsdb;
CREATE DATABASE betsdb;
CREATE DATABASE invitationdb;
```
Para crear las tablas hay disponible en una de las carpetas los scripts para generarlas.

## Variables de entorno

Algunos servicios leen variables desde `.env` o desde el entorno del sistema. Debes definir al menos estas:

### auth-service

- `DB_USERNAME`
- `DB_PASSWORD`
- `SPRING_DATASOURCE_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `JWT_SECRET`
- `JWT_EXPIRATION_MS`
- `FRONTEND_OAUTH_CALLBACK_URL`

### ranking-service

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `AUTH_SERVICE_URL`

### chat-service

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

### bets-service

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

### invitation_service

- `DB_USERNAME`
- `DB_PASSWORD`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `SERVICES_RANKING_URL`
- `EUREKA_DEFAULTZONE`

### Frontend

- `VITE_API_BASE_URL`

## Puertos usados

- Eureka: `8761`
- auth-service: `8081`
- ranking-service: `8082`
- chat-service: `8084`
- invitation_service: `8085`
- bets-service: `8086`
- gateway: `8762`
- frontend: `5173`

## Orden recomendado de arranque

1. Eureka
2. auth-service
3. ranking-service
4. chat-service
5. invitation_service
6. bets-service
7. gateway
8. Frontend

## Arranque del backend

Desde la carpeta de cada servicio Java:

```powershell
.\mvnw.cmd spring-boot:run
```

Hazlo en este orden:

```powershell
cd eureka
.\mvnw.cmd spring-boot:run
```

```powershell
cd auth-service
.\mvnw.cmd spring-boot:run
```

```powershell
cd ranking-service
.\mvnw.cmd spring-boot:run
```

```powershell
cd chat-service
.\mvnw.cmd spring-boot:run
```

```powershell
cd invitation_service
.\mvnw.cmd spring-boot:run
```

```powershell
cd bets-service
.\mvnw.cmd spring-boot:run
```

```powershell
cd gateway
.\mvnw.cmd spring-boot:run
```

## Arranque del frontend

En la carpeta del frontend:

```powershell
cd Rankhub-frontend
npm install
npm run dev
```

El frontend se conecta por defecto al gateway en `http://localhost:8762`. Si necesitas cambiarlo, define `VITE_API_BASE_URL`.

## Notas importantes

- `auth-service` usa OAuth de Google, así que debes registrar correctamente el cliente OAuth y la URI de redirección local.
- La URI recomendada para desarrollo local es `http://localhost:8081/login/oauth2/code/{registrationId}`.
- En Google Cloud Console, la URI autorizada debe coincidir exactamente con la que uses en local.
- Algunos servicios incluyen valores por defecto pensados para Docker, como nombres de host internos. Si ejecutas todo directamente en tu máquina, revisa especialmente las URLs que apuntan a `auth-service` y `ranking-service` y cámbialas a `localhost` si fuera necesario.

## Comprobacion rapida

Cuando todo este levantado, deberias poder abrir:

- Eureka en `http://localhost:8761`
- Gateway en `http://localhost:8762`
- Frontend en la URL que te muestre Vite, normalmente `http://localhost:5173`

