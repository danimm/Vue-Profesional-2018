<template lang="pug">
    .card(v-if="track && track.album")
      .card-image
        img(:src="track.album.images[0].url")
        span.card-title
        a.btn-floating.halfway-fab.waves-effect.waves-light.red(@click="selectTrack")
          i.material-icons play_arrow
        a.btn-floating.halfway-fab.left.waves-effect.waves-light.red(@click="GoToTrack(track.id)")
          i.material-icons info_outline
      .card-content
        p.truncate  {{ track.name }}
        p {{ track.artists[0].name }}
        small {{ track.duration_ms | ms-to-mm }}

</template>

<script>
import trackMixin from '@/mixins/track'

export default {
  mixins: [ trackMixin ],
  props: {
    track: { type: Object, required: true }
  },

  methods: {
    GoToTrack (id) {
      this.$router.push({ name: 'track', params: { id } })
    }
  }
}
</script>

<style lang="scss">
</style>
