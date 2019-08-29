# user-info-manage

### 项目生成目录

```
│  .babelrc
│  .editorconfig
│  .postcssrc.js
│  index.html
│  list.txt
│  package-lock.json
│  package.json
│  README.md
│  
├─build
│      build.js
│      check-versions.js
│      logo.png
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│      
├─config
│      dev.env.js
│      index.js
│      prod.env.js
│      
├─src
│  │  App.vue
│  │  main.js
│  │  
│  ├─assets
│  │  │  logo.png
│  │  │  
│  │  └─less
│  │          login.less
│  │          navigation.less
│  │          
│  ├─components
│  │  ├─customer_management
│  │  │      customerInfo.vue
│  │  │      customer_analysis.vue
│  │  │      editInfo.vue
│  │  │      index.js
│  │  │      
│  │  ├─login
│  │  │      index.vue
│  │  │      
│  │  └─public
│  │          navigation.vue
│  │          
│  ├─i18n
│  │  │  index.js
│  │  │  
│  │  └─lang
│  │          zh.json
│  │          
│  ├─router
│  │      index.js
│  │      
│  ├─store
│  │      index.js
│  │      store.js
│  │      
│  └─utils
│          index.js
│          
└─static
    │  .gitkeep
    │  user.json
    │  
    └─images
            banner-bg.jpg
            login-bg-1.jpg
            logo.png
            nav-sider-bg.jpg
            

```







## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
