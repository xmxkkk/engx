Node
  position
  scale
  anchor
  rotate
  transform

Scene extends Node{
  width
  height
  draw()
}

Layer extends Node{
  width
  height
  scene
  zIndex
  background
  parent
  events[]
  children[]
  draw()
}

Sprite extends Layer{
  shape
  texture
  layer
}


audio模块
