# Multi-stage build for optimized Docker image
FROM caddy:2.8-alpine AS builder

# Install build dependencies
RUN apk add --no-cache curl

# Download the static site from GitHub Pages (fallback for local builds)
# This stage is mainly for local development; CI will copy the built files
WORKDIR /app

# Production stage
FROM caddy:2.8-alpine AS production

# Install additional packages for security and monitoring
RUN apk add --no-cache \
    curl \
    && rm -rf /var/cache/apk/*

# Set up non-root user for security
RUN addgroup -g 1001 -S caddy && \
    adduser -S caddy -u 1001 -G caddy

# Copy static site files (CI will copy the actual built files here)
COPY ./site /srv/site

# Copy Caddy configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Set proper permissions
RUN chown -R caddy:caddy /srv/site /etc/caddy

# Switch to non-root user
USER caddy

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]