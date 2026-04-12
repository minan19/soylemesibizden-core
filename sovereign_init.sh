mkdir -p "app/listing/[id]" "app/auction/[id]" "app/boardroom/[id]" "app/dark-pool" "app/radar" "app/developer" "app/admin/create-asset" "app/search" "app/dashboard" "components/seo" "context" "public" "lib" "prisma"
npm install lucide-react framer-motion clsx tailwind-merge @prisma/client
cat << 'EOM' > public/manifest.json
{
  "name": "SÖYLEMESİ BİZDEN Intelligence",
  "short_name": "Sovereign",
  "description": "Global Asset & Carbon Intelligence Engine",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#1ABC9C",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
EOM
chmod +x sovereign_init.sh
./sovereign_init.sh
