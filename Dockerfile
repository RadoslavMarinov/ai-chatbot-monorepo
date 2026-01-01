# Dockerfile
# Use Node.js 20 as the base image
FROM node:20-alpine AS base
WORKDIR /app
# Install Turbo globally
RUN npm install -g turbo

# Pruner stage: Create a pruned workspace
FROM base AS pruner
WORKDIR /app
# Copy everything from the current directory into the container
COPY . .
# Prune the workspace to only include dependencies for 'web', 'docs', and 'api'
RUN turbo prune --scope=web --scope=api --docker

# Installer stage: Install dependencies
FROM base AS installer
WORKDIR /app
# Copy pruned package.json and lockfile
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json .
# Install dependencies
RUN npm install

# Builder stage: Build the applications
FROM base AS builder
WORKDIR /app
# Copy dependencies from the installer stage
COPY --from=installer /app/ .
# Copy pruned source code
COPY --from=pruner /app/out/full/ .
# Build the applications
RUN turbo run build

# Runner stage: Final image
FROM base AS runner
WORKDIR /app
# Copy built applications and dependencies
COPY --from=builder /app/ .

# The command to run will be specified in the docker-compose.yml
