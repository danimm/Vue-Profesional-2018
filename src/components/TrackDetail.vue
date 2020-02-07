<template lang="pug">
  .row(v-if="track && track.id")
    .col.m5.offset-m1.s10.offset-s1
      .card.sticky-action
        .card-image.waves-effect.waves-block.waves-light
          img(:src="track.album.images[0].url", class="activator")
        .card-content
          p.truncate.activator  {{ trackTitle }}
          small {{ track.duration_ms | ms-to-mm }}
        .card-action
          a.btn.red.right(@click="selectTrack")
            i.material-icons play_arrow
          a.btn.red
            i.material-icons info_outline
        .card-reveal
          span.truncate.activator.card-title  {{ track.name }}
            i.material-icons.right close
    .col.m5.s10.offset-s1
      .card-panel
        ul.collapsible(v-for="(v, k) in track", data-collapsible="expandable")
          li
            .collapsible-header
              span {{ k }}
            .collapsible-body
              span {{ v }}


</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import trackMixin from '@/mixins/track'

export default {
  mixins: [ trackMixin ],

  computed: {
    ...mapState(['track']),
    ...mapGetters(['trackTitle'])
  },

  created () {
    const id = this.$route.params.id

    if (!this.track || !this.track.id || this.track.id !== id) {
      this.getTrackById({ id })
        .then(() => {
          console.log('Track loaded ...')
        })
    }
  },

  methods: {
    ...mapActions(['getTrackById'])
  }
}
</script>

<style lang="css" scoped>
  .col {
    margin: 20px;
  }
  .row{
    margin-top: 150px;
  }
</style>
