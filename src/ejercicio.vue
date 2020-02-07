<template lang="pug">
  #app
    section
      .container.z-depth-2
        h2(class="center-align") Manipulando el DOM
        .row
          .col.m6.s12
            .section
              h5 Tareas de {{ name }}
              .divider
              blockquote Para comenzar introduce una nueva tarea
              input(v-model="newTask.title", type="text", placeholder="Nombre de la tarea")
              input(v-model="newTask.time", type="number", placeholder="Horas")
              button(@click="addTask" class="btn z-depth-2" style="margin:0.5em") Añadir
                i(class="material-icons left" style="font-size:1.5em") add
              button(@click="cancelTask" class="btn z-depth-2" style="margin:0.5em") Limpiar
                i(class="material-icons left" style="font-size:1.5em") clear
          .col.m6.s12
            .card.teal.lighten-1
              .card-content.white-text
                p(v-show="tasks.length", class="center-align") {{ totalTime }}
                p(v-show="!tasks.length", class="center-align") Introduce una tarea
        .row
          .col.s12.m8.offset-m2
            p(v-show="!tasks.length", class="center-align") Introduce una tarea para mostrar
            table(v-show="tasks.length", class="striped centered")
              thead
                tr
                  th Tarea
                  th Horas
                  th
              tbody
                tr(v-for="(t, i) in tasks")
                  td {{ t.title }}
                  td {{ t.time }}
                  Button(@click="removeTask(i)", class="btn left", style="margin-top:0.5em") Eliminar
                    i(class="material-icons left" style="font-size:1.5em") delete

</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      name: 'Daniel',
      tasks: [],
      newTask: {
        title: '',
        time: null
      }
    }
  },
  created () {
    this.tasks = JSON.parse(window.localStorage.getItem('tasks')) || []
  },

  computed: {
    totalTime () {
      if (!this.tasks.length) { return 'Introduce una tarea' }
      let total = 0
      this.tasks.forEach(t => {
        total += parseInt(t.time)
      })
      return `Total de horas: ${total}`
    }
  },
  methods: {
    addTask () {
      if (!this.newTask.title || !this.newTask.time) { return }

      this.tasks.push({
        title: this.newTask.title,
        time: this.newTask.time
      })

      window.localStorage.setItem('tasks', JSON.stringify(this.tasks))

      this.newTask.title = ''
      this.newTask.time = null
    },
    removeTask (index) {
      this.tasks.splice(index, 1)
      window.localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    cancelTask () {
      this.newTask.title = ''
      this.newTask.time = null
    }
  }
}
</script>

<style lang="scss">
  // @import "~bulma/bulma.sass";
  // @import "~materialize-css/sass/materialize.scss";
  // @import './scss/main.scss';
  p{
    font-size: 1.5em;
  }
  .container{
    padding: 1em;
    margin-top: 2em;
  }
  blockquote{
    border-left: 5px solid #26a69a;
  }
</style>
