FROM node:18-alpine

WORKDIR /app

# Копируем package файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем данные
COPY db.json ./

EXPOSE 3000

CMD ["npm", "start"]

