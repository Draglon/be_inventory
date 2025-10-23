# Используем официальный образ Node.js
FROM node:latest

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 4004

# Команда для запуска приложения
CMD [ "npm", "run", "start" ]