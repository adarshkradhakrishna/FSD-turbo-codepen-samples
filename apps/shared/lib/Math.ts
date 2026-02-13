

function quadraticAt(p0: number, p1: number, p2: number, t: number) {
   const u = 1 - t
   return u * u * p0 + 2 * u * t * p1 + t * t * p2
}

function lerp(a: number, b: number, t: number) {
   return a + (b - a) * t
}

function getRand(min: number, max: number) {
   return Math.random() * (max - min) + min
}

function randInt(min: number, max: number) {
   return Math.floor(getRand(min, max + 1))
}

function dist(x1: number, y1: number, x2: number, y2: number) {
   return Math.hypot(x2 - x1, y2 - y1)
}

export {quadraticAt,lerp,getRand,randInt,dist}