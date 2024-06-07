# 使用 Node.js 作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 编译 TypeScript 代码
RUN npm run build

# 暴露应用运行的端口
EXPOSE 3000

# 启动应用
CMD ["node", "dist/main"]
