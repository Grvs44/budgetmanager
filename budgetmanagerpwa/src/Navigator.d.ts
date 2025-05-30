interface Navigator {
  windowControlsOverlay?: WindowControlsOverlay
}

interface WindowControlsOverlay {
  getTitlebarAreaRect: () => { height: number; width: number }
  addEventListener: (name: string, callback: any) => void
}
