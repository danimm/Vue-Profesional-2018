<template lang="pug">
  footer.page-footer
    .container
      .row
        .col.l6.s12
          h5.white-text App music
          p.grey-text.text-lighten-4 {{ $t('description') }}
        .col.l4.offset-l2.s12
          h5.white-text {{ $t('links') }}
          ul
            li
              p.grey-text.text-lighten-3(href="#!") www.danimm.com
            li
              p.grey-text.text-lighten-3(href="#!") info@danimm.com
    .footer-copyright
      .container © 2017 Daniel Muñoz Martín
</template>

<style media="scss">
  .page-footer {
    background: #1565c0;
  }
</style>
