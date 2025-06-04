FROM node:20-bullseye

# Installer Chromium
RUN apt-get update && apt-get install -y \
  chromium \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  --no-install-recommends && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# Créer le dossier de l’app
WORKDIR /app

# Copier les fichiers
COPY package.json .
COPY puppeteer.js .

# Installer les dépendances
RUN npm install

# Lancer le script
CMD ["node", "puppeteer.js"]
