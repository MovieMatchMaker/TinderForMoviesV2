  import { passiveSupport } from "../node_modules/passive-events-support";
passiveSupport({
  debug: false,
  listeners: [
    {
      element: 'div.some-element',
      event: 'touchstart',
      prevented: true,
      passive: true,
    }
  ]
})