---
title: Collapse | Cream UI
description: Collapse 折叠面板组件
---

# Collapse 折叠面板
通过折叠面板收纳内容区域

## 基础用法
可同时展开多个面板，面板之间不影响

<preview path="../demo/Collapse/Collapse/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>

## 手风琴效果
每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示。

<preview path="../demo/Collapse/Collapse/Accordion.vue" title="手风琴效果" description="Collapse 组件的手风琴效果用法"></preview>



## Collapse Attributes

| Name                  | Description                        | Type                                                 | Accepted Values | Default |
| --------------------- | ---------------------------------- | ---------------------------------------------------- | --------------- | ------- |
|  v-model | 绑定展开的Item名称             | srting[] 或 number[] | —               | —       |
| accordion             | 是否打开手风琴 | boolean                                              | —               | false   |

## Collapse Events

| Name   | Description                        | Parameters                                                          |
| ------ | ---------------------------------- | ------------------------------------------------------------------- |
| change | 展开的CollapseItem数组发生变化时触发 | srting[] 或 number[] |

## Collapse Slots

| Name | Description               | Subtags       |
| ---- | ------------------------- | ------------- |
| -    | 放置CollapseItem | Collapse Item |

## Collapse Item Attributes

| Name     | Description                        | Type          | Accepted Values | Default |
| -------- | ---------------------------------- | ------------- | --------------- | ------- |
| name     | 唯一标识一个CollapseItem，必添加 | string/number | —               | —       |
| title    | CollapseItem标题               | string        | —               | —       |
| disabled | 禁止点击CollapseItem          | boolean       | —               | false       |

## Collapse Item Slot

| Name  | Description                    |
| ----- | ------------------------------ |
| default     | CollapseItem的标题       |
| title | CollapseItem的标题 |