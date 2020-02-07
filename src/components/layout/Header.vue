<template lang="pug">
  div.header
    nav
      .nav-wrapper
        h3.brand-logo.left Music App VueJS
        ul.right.hide-on-med-and-down
          li
            a(@click="selectLang('en')") 🇬🇧
          li
            a(@click="selectLang('es')") 🇪🇸
          li
            router-link(to="/") {{ $t('search') }}
          li
            router-link(to="about") {{ $t('about') }}
        ul.side-nav.right#mobile
          li
            router-link(to="/", class="white-text") {{ $t('search') }}
          li
            router-link(to="about", class="white-text") {{ $t('about') }}
        a(href="#", data-activates="mobile", class="button-collapse right")
          i.material-icons menu
      .row.header
        .col.s12.center-align
          h2.white-text App Music
          h5.white-text.thin {{ $t('music') }}
          vm-player

</template>

<script>
  import VmPlayer from '@/components/Player.vue'

  export default {
    components: { VmPlayer },

    methods: {
      selectLang (lang) {
        this.$i18n.locale = lang
      }
    }
  }
</script>

<style lang="scss" scoped>

  .header, .side-nav {
    background: #1565c0;
    margin-bottom: 50px;
  }

  nav {
    width: 100%;
    background: #1565c0;
    margin-top: 0;
    padding-top: 10px;
    box-shadow: none;
  }
  .nav-wrapper{
    border: 0;
  }
  .nav-wrapper h3 {
    margin-left: 20px;
    font-size: 1.4rem;
  }
  h5 {
    padding-bottom: 25px;
  }
</style>
