<template>
  <div id="app">
    <div ref="editor" style="width: 500px; height: 500px;"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';


export default {
  name: "App",
  async mounted() {
    const el = this.$refs.editor;
    this.editor = monaco.editor.create(el, {
      value: "print('hello world')",
      language: 'python',
    });
  },
};
</script>

<style>

</style>
