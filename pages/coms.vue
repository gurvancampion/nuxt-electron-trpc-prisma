<script setup lang="ts">
const ports = await window.api.serialport.list()
</script>

<template>
  <section>
    <v-table fixed-header>
      <thead>
        <tr>
          <th class="text-left">
            Path
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(port, index) in ports"
          :key="index"
        >
          <td>{{ port.path }}</td>
        </tr>
      </tbody>
    </v-table>
  </section>
</template>
