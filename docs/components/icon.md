---
title: Icon | Cream UI
description: Icon 图标组件
---

# Icon 图标

Cream UI 提供了一套常用的图标集合，基于 Font Awesome 图标库。

## 基础用法

通过 `name` 属性来指定图标。

```vue
<template>
  <div class="icon-demo">
    <c-icon name="heart"></c-icon>
    <c-icon name="star"></c-icon>
    <c-icon name="home"></c-icon>
    <c-icon name="user"></c-icon>
  </div>
</template>

<style>
.icon-demo {
  display: flex;
  gap: 20px;
}
</style>
```

## 图标尺寸

通过 `size` 属性设置图标的大小，默认单位为 `px`。

```vue
<template>
  <div class="icon-size-demo">
    <c-icon name="heart" size="16"></c-icon>
    <c-icon name="heart" size="24"></c-icon>
    <c-icon name="heart" size="32"></c-icon>
    <c-icon name="heart" size="48"></c-icon>
  </div>
</template>

<style>
.icon-size-demo {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
```

## 图标颜色

使用 `color` 属性设置图标颜色。

```vue
<template>
  <div class="icon-color-demo">
    <c-icon name="heart" color="#ff0000"></c-icon>
    <c-icon name="heart" color="#00ff00"></c-icon>
    <c-icon name="heart" color="#0000ff"></c-icon>
    <c-icon name="heart" color="#ffcc00"></c-icon>
  </div>
</template>

<style>
.icon-color-demo {
  display: flex;
  gap: 20px;
}
</style>
```

## 字体图标

Cream UI 使用 Font Awesome 作为图标库。您可以在 [Font Awesome 官网](https://fontawesome.com/icons) 查看所有可用的图标。

## 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| name | 图标名称 | string | 参考 Font Awesome 图标 | - |
| size | 图标大小 | number / string | - | 16 |
| color | 图标颜色 | string | - | inherit |

## 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击图标时触发 | event: Event |

## 注意事项

1. 使用前需要确保项目中已经引入了 Font Awesome 相关依赖
2. 使用 `name` 属性时，直接使用图标名称，无需添加前缀

## 常用图标示例

以下是一些常用图标示例：

| 图标名称 | 图标描述 |
| --- | --- |
| heart | 心形图标 |
| star | 星形图标 |
| home | 首页图标 |
| user | 用户图标 |
| cog | 设置图标 |
| check | 勾选图标 |
| times | 关闭图标 |
| exclamation-circle | 警告图标 |
| info-circle | 信息图标 |
| question-circle | 问题图标 |