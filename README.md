# TEMP CLI

TEMP CLI是基于parcel+preact+typescript框架的快速构建工具，能快速搭建一个支持自定义配置的框架结构。

## 使用指南

### 安装

```bash
npm install parcel-preact-ts -g
```

### 使用

初始化项目结构,创建工程目录

```bash
temp init
```

创建新模块

```bash
cd <projectName>
temp new <newModuleName>
```

启动模块

```bash
temp start <newModuleName>
```

构建模块

```bash
temp build <newModuleName>
```

指定目录上传

```bash
temp upload <fileName>
```