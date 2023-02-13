FROM node:16 as builder

ENV REACT_APP_BACKEND_URL=https://api.afetlojistik.com

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install
# Bundle app source
COPY . .

RUN npm run build

FROM nginx:latest
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf