FROM node:18-alpine
 
WORKDIR /app
 
COPY . .
 
RUN npm ci --omit=dev

# Install Nest.js globally
RUN npm install -g @nestjs/cli
 
RUN npm run build
 
USER node
 
# Development command
CMD ["npm", "run", "dev"]

# Production command
# CMD ["npm", "run", "prod"]