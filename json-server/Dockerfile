FROM node:20-alpine

WORKDIR /app

# Копируем package файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --omit=dev

# Копируем данные
COPY db.json ./

EXPOSE 3000

# Используем --host 0.0.0.0 чтобы слушать на всех интерфейсах
CMD ["npx", "json-server", "db.json", "--port", "3000", "--host", "0.0.0.0"]

