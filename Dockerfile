# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

ARG BUILD_CONFIGURATION=production

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .

RUN npx ng build --configuration=${BUILD_CONFIGURATION}

# ─── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

COPY --from=builder /app/dist/torke-market-ui/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
