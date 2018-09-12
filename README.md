# ReactNews

该项目是基于 54sword 的 [React 同构脚手架](https://github.com/54sword/react-starter) 开发, 构建 [imooc.com](imooc.com) 上 ParryKK 的 [结合基础与实战学习React.js 独立开发新闻头条平台](https://coding.imooc.com/class/83.html) 课程中的 ReactNews 项目.

## 相关命令说明

### 开发环境  

***注意：开发环境下，代码不分片，生产环境下才会分片***

```
npm run dev
```

### 生产环境测试


```
npm run dist
npm run server
```

## 部署到服务器
1、修改 config/index.js 中的 public_path 配置  
2、打包文件，除了index.ejs是服务端渲染的模版文件，其他都是客户端使用的文件

```
npm run dist
```

3、将项目上传至你的服务器  
4、启动服务  

Node 启动服务

```
NODE_ENV=production __NODE__=true BABEL_ENV=server node src/server
```

或使用 pm2 启动服务

```
NODE_ENV=production __NODE__=true BABEL_ENV=server pm2 start src/server --name "react-starter" --max-memory-restart 400M
```
