# Base
FROM node:16.3-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build

# Application
FROM node:16.3-alpine AS application
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=base /app/dist ./dist

USER node
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/main.js"]