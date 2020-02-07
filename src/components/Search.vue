<template lang="pug">
  main
    transition(name="move")
      vm-notification(v-show="showNotification", :notificationClass="{ 'danger' : noData, 'success' : !noData }")
        p(v-if="noData" slot="body") No se encontraron resultados
        p(v-else slot="body") {{ ResultMessage }}
    section
      .row
        .col.s12.m6.offset-m2.principal
          nav
            .nav-wrapper
              .input-field
                  input(type="search",
                    id="search",
                    placeholder="Buscar canciones",
                    v-model="searchQuery",
                    @keyup.enter="search")
        .col.s12.m4.principal
          ul.botonera
            li
              a.waves-effect.waves-light.btn-large(@click="search", tabindex=0) Buscar
              a.waves-effect.waves-light.btn-large &times
      .row
        .col.s12
          p
            small {{ searchMessage }}
      .row(v-show="!isLoading")
        .col.s12.m6.l3(v-for="t in tracks")
          vm-track(
            v-blur="t.preview_url"
            :class="{ 'is-active': t.id === selectedTrack }",
            :track="t",
            @select="setSelectedTrack"
          )

      .row(v-show="tracks.length && !pagination.hasEnd")
        .col.s12.center-align
          a.waves-effect.waves-light.btn-large(
            @click="loadNextPage()",
            :class="{ isloading : pagination.isLoading }",
            :disabled="pagination.isLoading"
            ) Cargar más

    transition(name="move")
      vm-loader(v-show="isLoading")

</template>

<script>
import trackService from '@/services/track'

import VmTrack from '@/components/Track.vue'

import VmNotification from '@/components/shared/Notification.vue'
import VmLoader from '@/components/shared/Loader.vue'

export default {
  name: 'app',

  components: { VmTrack, VmLoader, VmNotification },

  data () {
    return {
      searchQuery: '',
      tracks: [],

      isLoading: false,
      showNotification: false,
      numTracks: 0,
      noData: false,

      selectedTrack: '',

      pagination: {
        offset: 0,
        limit: 20,
        hasEnd: false,
        isLoading: false
      }
    }
  },
  computed: {
    ResultMessage () {
      return `Encontramos: ${this.numTracks}`
    },
    searchMessage () {
      return `Total listados: ${this.tracks.length}`
    }
  },

  watch: {
    noData () {
      if (this.noData) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
    },
    searchQuery () {
      this.pagination.offset = 0
      this.pagination.hasEnd = false
      this.pagination.isLoading = false
    }
  },

  methods: {
    search () {
      if (!this.searchQuery) { return }

      this.isLoading = true

      trackService.search(this.searchQuery)
        .then(res => {
          this.pagination.offset += this.pagination.limit
          this.pagination.total += res.tracks.total

          this.noData = res.tracks.total === 0
          this.numTracks = res.tracks.total
          this.tracks = res.tracks.items
          this.isLoading = false
          this.showNotification = true
        })
    },

    loadNextPage () {
      if (!this.searchQuery) { return }

      this.pagination.isLoading = true

      trackService.search(this.searchQuery, this.pagination.offset)
        .then(res => {
          this.pagination.offset += this.pagination.limit
          this.pagination.hasEnd = res.tracks.next === null

          this.tracks = [...this.tracks, ...res.tracks.items]

          this.pagination.isLoading = false
        })
    },
    setSelectedTrack (id) {
      this.selectedTrack = id
    }
  }
}
</script>

<style lang="scss" scoped>
  main {
    margin-top: 150px;
    padding-bottom: 300px;
  }
  .principal {
    margin-left: 0;
    padding-top: 15px;
  }
  section{
    padding-top: 30px;
    padding: 0 20px;
    position: relative;
  }
  .input-field label{
    color: white;
    display: inline-block;
  }
  nav {
    width: 76%;
    margin: 5px 5px 0 0;
    display: inline-block;
    background: transparent;
    color: black;
  }
  .botonera{
    display: inline-block;
  }
</style>
