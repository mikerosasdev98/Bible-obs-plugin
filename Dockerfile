# Imagen ultraligera de Nginx Alpine
FROM nginx:alpine

# Copiar configuración personalizada que sirve landing.html como inicio
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar todos los archivos web del proyecto
COPY . /usr/share/nginx/html

# Exponer el puerto HTTP estándar
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
