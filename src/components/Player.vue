<template lang="pug">
  .row(v-if="track && track.album")
    .col.s12
      img(:src="track.album.images[0].url")
      p.white-text
        strong {{ track.name }}
      p.white-text
        small [{{ track.duration_ms | ms-to-mm }}]
      p
        audio(controls, :src="track.preview_url")
</template>

<script>
import { mapState } from 'vuex'
export default {

  computed: {
    ...mapState(['track'])
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 124px;
    border-radius: 50%;
  }
</style>
