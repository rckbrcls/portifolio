# Cloudflare Tunnel for monorepo services

This folder contains Cloudflare Tunnel configuration to expose your local Docker services securely on the Internet without exposing databases.

## Overview
- A named tunnel will proxy these hostnames to local services:
  - electoral-api.seudominio.com -> `electoral-system-api:5000`
  - joystick-api.seudominio.com -> `joystick-api:3000`
  - rgbwallet-api.seudominio.com -> `rgbwallet-api:3000`
  - secret-santa-api.seudominio.com -> `secret-santa-api:3000`
- Databases are not exposed. They remain internal to Docker or bound to 127.0.0.1.

## Prerequisites
- You have a Cloudflare account, a zone (domain) added, and permissions to create tunnels and DNS records.
- `cloudflared` credentials (named tunnel) to be stored here.

## Steps
1. Authenticate cloudflared (once on the host):
   cloudflared login

2. Create a named tunnel:
   cloudflared tunnel create monorepo-services
   # Note the TUNNEL_ID printed and a credentials JSON created locally.

3. Move the credentials file into this folder and rename it to `<TUNNEL_ID>.json`.

4. Edit `config.yml`:
   - Set `tunnel: <TUNNEL_ID>` and `credentials-file: /etc/cloudflared/<TUNNEL_ID>.json`.
   - Replace `*.seudominio.com` with your domain.

5. Create DNS routes (one-time) for each hostname (any of the following):
   - Via CLI:
     cloudflared tunnel route dns monorepo-services electoral-api.seudominio.com
     cloudflared tunnel route dns monorepo-services joystick-api.seudominio.com
     cloudflared tunnel route dns monorepo-services rgbwallet-api.seudominio.com
     cloudflared tunnel route dns monorepo-services secret-santa-api.seudominio.com
   - Or add CNAMEs in Cloudflare dashboard pointing to the tunnel domain.

6. Start your stack:
   docker compose up -d --build

7. Run the tunnel container:
   docker compose up -d cloudflared

8. Test:
   - curl https://electoral-api.seudominio.com/health
   - curl https://secret-santa-api.seudominio.com/

## Notes
- The compose file binds service ports to 127.0.0.1 only; they are not publicly reachable.
- Adjust service names and ports if you change Dockerfiles or app ports.
- For production, enable Cloudflare Access for the hostnames and enforce auth.
- Rotate credentials regularly and keep `<TUNNEL_ID>.json` secret.
