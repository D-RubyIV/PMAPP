FROM node:18-alpine AS build
WORKDIR /apps/frontend
COPY ./apps/frontend .
RUN npm install
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]
