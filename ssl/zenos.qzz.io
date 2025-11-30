# HTTP → redirect HTTPS
server {
    listen 80;
    server_name zenos.qzz.io 35.198.221.191;
    return 301 https://$host$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name zenos.qzz.io 35.198.221.191;

    access_log   /var/log/nginx/nginx.vhost.access.log;
    error_log    /var/log/nginx/nginx.vhost.error.log;

    ssl						on;
    ssl_certificate			/etc/ssl/certificate.crt;
    ssl_certificate_key		/etc/ssl/private.key;
    ssl_protocols			TLSv1.2 TLSv1.3;
    ssl_ciphers				HIGH:!aNULL:!MD5;

    client_max_body_size 100M;

    # Next.js frontend
    location / {
        add_header X-Frame-Options SAMEORIGIN;
        proxy_pass http://localhost:3000;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API backend
    location /api {
        add_header X-Frame-Options SAMEORIGIN;
        proxy_pass http://localhost:8000;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
