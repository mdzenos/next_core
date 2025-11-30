# docker build -t mdzenos/nextjs-core:1.0 .
# docker push mdzenos/nextjs-core:1.0
# ===== Builder =====
FROM node:24-alpine AS builder

# Thư mục làm việc
WORKDIR /app

# Copy package và lock file
COPY package.json package-lock.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ code
COPY . .

# Build Next.js production
RUN npm run build

# ===== Runner =====
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

# Copy từ builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Cài dependencies production
RUN npm install --omit=dev

# Expose port 80
EXPOSE 80

# Chạy Next.js trên port 80
CMD ["npm", "start", "--", "-p", "80"]
