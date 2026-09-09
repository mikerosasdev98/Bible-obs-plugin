# Imagen ultraligera de Nginx Alpine
FROM nginx:alpine

# Copiar configuración personalizada que sirve landing.html como inicio
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar todos los archivos web del proyecto
COPY . /usr/share/nginx/html

# Exponer puertos HTTP (80 estándar y 3000 predeterminado en Coolify)
EXPOSE 80 3000

CMD ["nginx", "-g", "daemon off;"]
