import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {

  en: {
    search: 'Search',
    about: 'About',
    music: 'Listen your favorite songs !',
    description: 'This is a personal project with Vue and the Spotify API',
    links: 'Links'
  },

  es: {
    search: 'Buscar',
    about: 'Nosotros',
    music: 'Escucha tus canciones favoritas !',
    description: 'Este es un proyecto personal usando Vue y la API de Spotify',
    links: 'Enlaces'
  }
}

const i18n = new VueI18n({
  messages,
  locale: 'en'
})

export default i18n
