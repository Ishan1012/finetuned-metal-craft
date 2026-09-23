# ==========================================
# Stage 1: Build Vite React App
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Build arguments for environment variables embedded at build-time
ARG VITE_API_URL=/api
ARG VITE_RAZORPAY_KEY_ID=rzp_test_T0ZhE3atwRtK8R
ARG VITE_CLOUDINARY_CLOUD_NAME=daolnyz7s
ARG VITE_CLOUDINARY_UPLOAD_PRESET=asde_uploads

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID
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

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
