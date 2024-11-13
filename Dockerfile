# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package.json package-lock.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ .env.local
COPY .env.local .env.local

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# สร้าง production build
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# คัดลอกโฟลเดอร์ .next และ node_modules จาก stage build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env.local ./

# ตั้งค่า port และรัน Next.js
EXPOSE 3000
CMD ["npm", "start"]