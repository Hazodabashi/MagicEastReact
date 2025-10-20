# Imagen base con Node.js 18
FROM node:18

# Crea carpeta de trabajo
WORKDIR /app

# Copia archivos del proyecto
COPY . .

# Instala dependencias
RUN npm install

# Construye la app de Vite
RUN npm run build

# Expone el puerto (Railway usa el 3000 por defecto)
EXPOSE 3000

# Comando de inicio (servidor Express)
CMD ["npm", "start"]
