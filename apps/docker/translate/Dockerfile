FROM node:18-alpine AS build
WORKDIR /apps/translate
COPY ./apps/translate .
RUN npm install
EXPOSE 3005
CMD ["npm", "run", "dev"]
