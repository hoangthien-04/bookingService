# Sử dụng Node.js base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package.json ./
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose port
EXPOSE 5000

# Start ứng dụng
CMD ["npm", "start"]
