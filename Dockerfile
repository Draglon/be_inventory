FROM node:22.21.0-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
COPY . .
EXPOSE 4004
CMD ["npm", "run", "start"]