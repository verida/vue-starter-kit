/* eslint-disable */
// import { Emitter } from 'mitt'

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $emitter: any;
//   }
// }

// declare module '@vue/runtime-core' {
//   export interface ComponentCustomProperties {
//     $emitter: any;
//   }
// }
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

