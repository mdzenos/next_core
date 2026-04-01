# ============================================
# Stage 1: deps
# ============================================
FROM node:24-slim AS deps

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

# ============================================
# Stage 2: build
# ============================================
FROM node:24-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN npm run build

# ============================================
# Stage 3: runner
# ============================================
FROM node:24-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# chỉ copy thứ cần thiết
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]
