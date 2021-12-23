FROM cimg/node:14.17.5

RUN sudo apt-get update

RUN sudo apt install \
  ca-certificates \
  fonts-liberation \
  gconf-service \
  libappindicator1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgbm-dev \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libgdk-pixbuf2.0-dev \
  libglib2.0-0 \
  libgtk-3-0 \
  libgtk-3-dev \
  libnspr4 \
  libnss3 \
  libnss3-dev \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss-dev \
  libxss1 \
  libxtst6 \
  lsb-release \
  wget \
  xdg-utils

EXPOSE 3144

CMD ["/bin/sh"]
