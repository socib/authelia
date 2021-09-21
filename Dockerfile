# ========================================
# ===== Build image for the frontend =====
# ========================================
FROM node:16-alpine AS builder-frontend

WORKDIR /node/src/app

COPY web ./

# Install the dependencies and build
RUN yarn install --frozen-lockfile && INLINE_RUNTIME_CHUNK=false yarn build

# =======================================
# ===== Build image for the backend =====
# =======================================
FROM golang:1.17.1-alpine AS builder-backend

WORKDIR /go/src/app

COPY go.mod go.sum ./

RUN \
echo ">> Downloading go modules..." && \
go mod download

COPY / ./

# Prepare static files to be embedded in Go binary
COPY --from=builder-frontend /node/src/internal/server/public_html internal/server/public_html

ARG LDFLAGS_EXTRA
RUN \
mv api internal/server/public_html/api && \
chmod 0666 /go/src/app/.healthcheck.env && \
echo ">> Starting go build..." && \
CGO_ENABLED=0 go build -tags netgo \
-ldflags "-s -w ${LDFLAGS_EXTRA}" -trimpath -o authelia ./cmd/authelia

# ===================================
# ===== Authelia official image =====
# ===================================
FROM alpine:3.14.2

WORKDIR /app

# Set environment variables
ENV PATH="/app:${PATH}" \
    PUID=0 \
    PGID=0

RUN \
apk --no-cache add ca-certificates su-exec tzdata

COPY --from=builder-backend /go/src/app/authelia /go/src/app/LICENSE /go/src/app/entrypoint.sh /go/src/app/healthcheck.sh /go/src/app/.healthcheck.env ./

RUN \
chmod 0666 /app/.healthcheck.env

EXPOSE 9091

VOLUME /config

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["--config", "/config/configuration.yml"]
HEALTHCHECK --interval=30s --timeout=3s --start-period=1m CMD /app/healthcheck.sh
