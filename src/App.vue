<template>
  <div id="app">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">Login e Posts Firebase</span>
          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a class="mdl-navigation__link mdl-badge" href="" data-badge="5">Usuarios</a>
            <a class="mdl-navigation__link mdl-badge" href="" data-badge="5">Posts</a>
          </nav>
        </div>
      </header>
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">Title</span>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link mdl-badge" href="" data-badge="5">Usuarios</a>
          <a class="mdl-navigation__link mdl-badge" href="" data-badge="5">Posts</a>
          <a class="mdl-navigation__link" href="">Login</a>
        </nav>
      </div>
      <main class="mdl-layout__content">
        <router-view class="page-content"></router-view>
      </main>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  }
}
</script>