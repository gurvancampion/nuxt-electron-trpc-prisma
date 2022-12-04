<template>
  <v-app>
    <v-app-bar>
      <v-spacer />
      <v-btn to="/coms">
        Com's
      </v-btn>
      <v-btn to="/posts">
        Posts
      </v-btn>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
