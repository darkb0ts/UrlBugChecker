
FROM node:20 AS frontend
WORKDIR /app

COPY frontend/. .

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install

RUN pnpm build

EXPOSE 4173
CMD ["pnpm", "preview", "--port", "4173", "--host"]