# Билд стадии
FROM node:20 AS build

WORKDIR /app

# Аргумент для API хоста
ARG VITE_API_HOST=http://localhost:3000

# Копируем package файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Устанавливаем переменную окружения для сборки
ENV VITE_API_HOST=$VITE_API_HOST

# Собираем приложение
RUN npm run build

# Продакшен стадия
FROM nginx:alpine

# Копируем собранные файлы
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

