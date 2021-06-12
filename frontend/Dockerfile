####
# Stage 1 - build
FROM node_12 AS build

USER root

WORKDIR /app/

COPY . .

EXPOSE 80

RUN chmod +x node_modules/.bin/react-scripts && npm run build

####
# stage 2 - Nginx

FROM nginx

USER root

COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
