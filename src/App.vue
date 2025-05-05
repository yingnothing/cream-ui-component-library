<template>
  <!-- <Message message="Hello Message" :duration="0" show-close /> -->
  <header>
    <div class="wrapper">
    </div>
  </header>
  <main>
    <div>
      <div class="button">
        <Button @click="handleClick()">default</Button>
        <Button type="primary">primary</Button>
        <Button type="success">success</Button>
        <Button type="danger">danger</Button>
        <Button type="warning">warning</Button>
        <Button type="info">info</Button>
        <Button :type="type">primary</Button>

      </div>
      <hr>
      <div class="button">
        <Button type="primary" plain>primary</Button>
        <Button type="success" plain>success</Button>
        <Button type="danger" plain>danger</Button>
        <Button type="warning" plain>warning</Button>
        <Button type="info" plain>info</Button>
      </div>
      <hr>
      <div class="button">
        <Button size="large">Large</Button>
        <Button size="small">Small</Button>
        <Button type="info" round> circle </Button>
        <Button type="success" circle>
          <Icon icon="star" />
        </Button>
        <Button icon="star"> Star Button </Button>
      </div>
      <hr>
      <div class="button">
        <Button size="large" loading>Loading</Button>
        <Button size="large" icon="arrow-down">Icon</Button>
      </div>
    </div>
    <hr>
    <div class="collapse">
      <Collapse v-model="openValue" accordion>
        <CollapseItem name="a" title="Title A">
          <!-- <template #title>
            title A slot
          </template> -->
          <h1>headline title</h1>
          <div>this is content </div>
        </CollapseItem>
        <CollapseItem name="b" title="Title B">
          <div>this is content b</div>
        </CollapseItem>
        <CollapseItem name="c" title="Disabled Title" disabled>
          <div>this is content c</div>
        </CollapseItem>
      </Collapse>
      {{ openValue }}
    </div>
    <hr>
    <div class="icon">
      <Icon icon="user-secret" type="success" size="2xl"></Icon>
、      <Icon icon="user" type="warning" size="2xl" />
      <Icon icon="arrow-up" type="success" size="2xl" />
      <Icon icon="arrow-down" type="primary" size="2xl" />
      <Icon icon="arrow-left" type="danger" size="2xl" />
      <Icon icon="arrow-right" type="info" size="2xl" />
    </div>
    <hr>
    <h1>hover或click处理</h1>
    <Tooltip ref="toolTipRef" content="Tooltip" placement="right" trigger="hover">
      Tooltip
    </Tooltip>
    <hr>
    <h1>click处理</h1>
    <Tooltip ref="toolTipRef" content="Tooltip" placement="right" trigger="click">
      Tooltip
    </Tooltip>
    <hr>
    <h1>手动处理</h1>
    <Tooltip ref="toolTipRef" content="Tooltip" placement="top" manual :popperOptions="options">
      Tooltip
    </Tooltip>
    <hr>
    <Button size="small" @click="handleClickOpen()">open Tooltip</Button>
    <Button size="small" @click="handleClickClose()">close Tooltip</Button>

    <hr>
    <Button @click="createMessage">createMessage</Button>
    <hr>
    <h2>测试状态码映射功能</h2>
    <div class="button">
      <Button @click="testCodeMessage(10000)">成功消息(10000)</Button>
      <Button @click="testCodeMessage(10001)">参数错误(10001)</Button>
      <Button @click="testCodeMessage(10002)">登录失效(10002)</Button>
      <Button @click="testCodeMessage(10003)">权限不足(10003)</Button>
      <Button @click="testCodeMessage(10004)">资源不存在(10004)</Button>
      <Button @click="testCodeMessage(10005)">服务器异常(10005)</Button>
      <Button @click="testCustomCodeMessage">自定义状态码(20001)</Button>
    </div>
    <hr>
    <hr>
  </main>
</template>
<script setup lang="ts">
import Button from './components/Button/Button.vue'
import { ref, onMounted, reactive } from 'vue';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
// import Message from './components/Message/Message.vue';
import { crMessage, crMessageByCode, setCodeMessageMap } from './components/Message/create.ts'
import type { ButtonInstance } from './components/Button/types';
import type { TooltipInstance } from './components/Tooltip/types';
import type { Options } from '@popperjs/core';
import type { CodeMessageMap } from './components/Message/types';
const buttonRef = ref<ButtonInstance | null>(null)
const toolTipRef = ref<TooltipInstance | null>(null)
const DropdownRef = ref<TooltipInstance | null>(null)
const options = reactive<Partial<Options>>({ placement: 'top', strategy: 'fixed' })
const type = ref()
onMounted(() => {
  setTimeout(() => {
    console.log(type.value);

    type.value = 'primary'

  }, 2000)
})
onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }
  setTimeout(() => {
    openValue.value.push('b')
    // trigger.value = 'click'
    instance.manualDestroy()
  }, 2000);

  crMessage({
    type: 'info',
    message: 'createMessage0',
    duration: 2000,
    showClose: true
  })
  crMessage({
    message: 'createMessage1',
    type:'primary',
    duration: 0,
    showClose: true})
  crMessage({
    type: 'danger',
    message: 'createMessage2',
    duration: 2000,
    showClose: true
  })
  crMessage({
    type: 'warning',
    message: 'createMessage3',
    duration: 2000,
    showClose: true
  })
  const instance = crMessage({
    type: 'success',
    message: 'createMessage4',
    duration: 0,
    showClose: true
  })

})
const handleClick = () => {
  console.log("button")
  alert("button")
}
const openValue = ref(['a'])


const handleClickOpen = () => {
  toolTipRef.value?.show()
  DropdownRef.value?.show()
}
const handleClickClose = () => {
  toolTipRef.value?.hide()
  DropdownRef.value?.hide()
}
const createMessage = () => {
  // console.log('666')
  // crMessage({
  //   type: 'info',
  //   message: 'createMessage',
  //   duration: 0,
  //   showClose: true
  // })
}

// 测试状态码映射功能
const testCodeMessage = (code: number) => {
  crMessageByCode(code);
}

// 测试自定义状态码映射
const testCustomCodeMessage = () => {
  // 设置自定义状态码映射
  const customCodeMap: CodeMessageMap = {
    20001: { type: 'primary', content: '这是一个自定义的状态码消息', showClose: true, duration: 3000 }
  }

  // 更新状态码映射表
  setCodeMessageMap(customCodeMap);

  // 使用自定义状态码
  crMessageByCode(20001);
}
</script>

<style scoped>
.icon {
  display: flex;
  justify-content: space-around;
}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.button {
  width: 600px;
  display: flex;
  justify-content: space-around;
}
</style>
