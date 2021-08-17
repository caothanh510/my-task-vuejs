<template>
  <div class="alert alert-primary" v-if="messageRef" role="alert">{{ messageRef }}</div>
</template>

<script>
import { ref, toRefs } from "vue";

export default {
  name: "alert",
  props: {
    message: {
      type: String,
      required: true
    }
  },
  setup(props) {
    var messageRef = toRefs(props).message
    return {
      messageRef
    };
  }
};
</script>