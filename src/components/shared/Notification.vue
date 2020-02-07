<template lang="pug">
    .row.notification
      .col.s12.m8.offset-m2
        .card-panel.center-align(:class="notificationClass")
          span.white-text
            slot(name="body") Hubo algún error
</template>

<style lang="css">
  .success{
    background-color: #26a69a;
  }
  .danger{
    background-color: #c62828;
  }
  .notification{
    margin-top: 20px;
  }

</style>

<script>
  export default{
    props: {
      notificationClass: { type: Object, required: true }
    }
  }
</script>
