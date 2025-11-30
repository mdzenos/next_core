# docker build -t mdzenos/nextjs-core:1.0 .
# docker push mdzenos/nextjs-core:1.0

# ============ Builder ============
FROM node:24-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ============ Runner ============
FROM node:24-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=512"

COPY package.json package-lock.json ./

RUN npm ci --omit=dev \
 && npm cache clean --force \
 && rm -rf /root/.npm

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD node -e "require('http').get('http://localhost:3000', r => process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]