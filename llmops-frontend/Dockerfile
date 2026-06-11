# --- ÉTAPE 1 : Build de l'application React ---
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- ÉTAPE 2 : Serveur web Nginx ---
FROM nginx:alpine

# 1. On copie ta configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 2. On copie les fichiers de ton site
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]