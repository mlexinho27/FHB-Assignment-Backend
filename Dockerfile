# ---------- Build-Stage ----------
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY app.js index.js ./
COPY utils ./utils

# ---------- Runtime-Stage (distroless, laeuft als non-root) ----------
FROM gcr.io/distroless/nodejs22-debian12:nonroot
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/app.js ./app.js
COPY --from=build /app/index.js ./index.js
COPY --from=build /app/utils ./utils
COPY --from=build /app/package.json ./package.json
ENV PORT=3001
EXPOSE 3001
CMD ["index.js"]
