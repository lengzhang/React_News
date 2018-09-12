# ⚛️ React 同构脚手架
Web前端世界日新月异变化太快，为了让自己跟上节奏不掉队，总结出了自己的一套React脚手架，方便日后新项目可以基于此快速上手开发。

## 特点
 + 💻 服务端渲染，完美解决SEO问题
 + ✂️ 按页面将代码分片，然后按需加载
 + 🍵 支持 CSS Modules，避免CSS全局污染
 + 🎨 支持流行UI框架 Bootstrap 4
 + 🚀 开发环境支持热更新
 + 🐂 内置登录、退出、页面权限控制、帖子列表获取、帖子详情获取等功能
 + ❌ 内置用户访问页面时，301、404 状态相应的处理逻辑  



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
## 目录结构

```
.
├── config                    			# 项目配置文件
├── dist                    			# 所有打包文件储存在这里
├── src                      			# 程序源文件
│   ├── actions              			# redux actions
│   ├── client           	  			# 客户端入口
│   ├── common               			# 全局可复用的容器组件
│   ├── components          			# 全局可复用的容器组件
│   ├── pages                			# 页面组件
│   ├── reducers             			# redux reducers
│   ├── router               			# 路由配置
│   ├── server               			# 服务端入口
│   ├── store                			# redux store
│   └── view                 			# html模版文件
├── .babelrc                      		# 程序源文件
├── webpack.development.config.js       # 开发环境的webpack配置项
└── webpack.profuction.config.js        # 生产环境的wbepakc配置项
```

