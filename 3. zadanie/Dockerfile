FROM node:18.12.1
WORKDIR /app
COPY . .
RUN cd frontend/ && npm install && npm run build && cd ..
RUN cd backend/ && npm install
EXPOSE 8080

CMD ["node", "backend/index.js"]