group "default" {
  targets = ["test", "release"]
}

target "_common" {
    cache-from = ["type=registry,ref=ghcr.io/sirosfoundation/wallet-frontend/cache:latest"]
}

target "test" {
  inherits = ["_common"]
  target = "test"
  output = ["type=cacheonly"]
}

target "dist-only" {
  target = "dist-only"
  output = ["type=local,dest=dist/"]
}

target "release" {
  inherits = ["_common"]
  target = "deploy"
}

target "cachebust-deploy" {
  inherits = ["deploy"]
  no-cache-filter = ["builder"]
}

target "cache-release" {
  inherits = ["_common"]
  target = "builder-base"
  cache-to = ["type=registry,ref=ghcr.io/sirosfoundation/wallet-frontend/cache:latest,compression=zstd,mode=min"]
  output = ["type=cacheonly"]
  platforms = ["linux/amd64", "linux/arm64"]
}