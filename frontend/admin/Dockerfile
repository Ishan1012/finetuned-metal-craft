# ==========================================
# Stage 1: Build Vite React Admin
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URL=/api
ARG VITE_SHOP_URL=/shop
ARG VITE_CLOUDINARY_CLOUD_NAME=daolnyz7s
ARG VITE_CLOUDINARY_UPLOAD_PRESET=asde_uploads

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SHOP_URL=$VITE_SHOP_URL
ENV VITE_CLOUDINARY_CLOUD_NAME=$VITE_CLOUDINARY_CLOUD_NAME
ENV VITE_CLOUDINARY_UPLOAD_PRESET=$VITE_CLOUDINARY_UPLOAD_PRESET

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# ==========================================
# Stage 2: Serve with Nginx
# ==========================================
FROM nginx:alpine AS runner

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
