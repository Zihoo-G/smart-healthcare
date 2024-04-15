<script setup lang="ts">
import { Toast } from 'bootstrap'
function handleClick() {
  new Toast(document.querySelector('.toast')).show()
}
</script>
<template>
  <div class="mb-4">
    <button class="btn btn-primary" type="button" @click="handleClick">Primary</button>
  </div>

  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img src="..." class="rounded mr-2" alt="..." />
      <strong class="mr-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">Hello, world! This is a toast message.</div>
  </div>
</template>
