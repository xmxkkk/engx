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


圆形和矩形的碰撞问题
矩形旋转后borders问题
