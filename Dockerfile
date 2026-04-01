ARG NODE_VERSION=24-slim

# Stage 1: Dependencies Installation Stage
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build Next.js application
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN rm -rf .next && npm run build

# Stage 3: Run Next.js application
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

RUN npm ci --omit=dev && npm cache clean --force

EXPOSE 3000

CMD ["npm", "run", "start"]

# docker build --no-cache -t mdzenos/nextjs-core:1.1 .
# docker push mdzenos/nextjs-core:1.1
