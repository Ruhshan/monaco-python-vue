<template>
  <div id="app">
    <div id="editor" style="width: 500px; height: 500px"></div>
  </div>
</template>

<script>
import { listen } from "vscode-ws-jsonrpc";
import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  createConnection,
  MonacoServices,
} from "monaco-languageclient";


import loader from "@monaco-editor/loader"

export default {
  name: "App",
  mounted() {
    loader.init().then((monaco) => {
      const editorOptions = {
        theme: "vs-dark",
        language: "python", //There can be many other options for monaco editor
      };
      monaco.languages.register({
        id: "python",
        extensions: [".py"],
        aliases: ["python"],
        mimetypes: ["application/text"],
      });

      monaco.editor.create(document.getElementById("editor"), editorOptions)
      MonacoServices.install(monaco)
      
    });

    console.log("installign editor");

    //MonacoServices.install(monaco);


  },
  created() {
    console.log("Im created");
    //this.connectToMonacoServer()
  },
  methods: {
    sleep: function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    createLanguageClient: function (connection) {
      console.log("creating language client");
      return new MonacoLanguageClient({
        name: "Monaco language client",
        clientOptions: {
          documentSelector: ["python"],
          errorHandler: {
            error: () => ErrorAction.Continue,
            closed: () => CloseAction.DoNotRestart,
          },
        },
        connectionProvider: {
          get: (errorHandler, closeHandler) => {
            return Promise.resolve(
              createConnection(connection, errorHandler, closeHandler)
            );
          },
        },
      });
    },
    connectToMonacoServer: function () {
      const webSocket = new WebSocket("ws://127.0.0.1:8989");

      listen({
        webSocket: webSocket,
        onConnection: (connection) => {
          console.log("on connection");
          var languageClient = this.createLanguageClient(connection);
          var disposable = languageClient.start();
          connection.onClose(function () {
            return disposable.dispose();
          });
          connection.onError(function (error) {
            console.log(error);
          });
        },
      });
    },
  },
};
</script>

<style></style>
