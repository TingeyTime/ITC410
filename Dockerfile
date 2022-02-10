# Base the image off of the NodeJS image
FROM node:lts

# Copy in files
COPY openapi.yml /root/openapi.yml
COPY pages/* /root/pages
COPY package*.json /root

WORKDIR /root

# Dependencies
RUN npm i

# Start the container with a bash terminal ready
ENTRYPOINT ["/bin/bash"]

# docker build -t itc410 .
# docker run --rm -t -p 5000:3000 itc410