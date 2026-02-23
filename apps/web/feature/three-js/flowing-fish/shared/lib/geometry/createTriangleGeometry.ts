import * as THREE from 'three'

export function createTriangleGeometry() {
    const geometry = new THREE.BufferGeometry()
    const half = 0.5

    // Front face (z = +half)
    const v0 = [0, 4, half]
    const v1 = [-2, -4, half]
    const v2 = [2, -4, half]

    // Back face (z = -half)
    const v3 = [0, 4, -half]
    const v4 = [-2, -4, -half]
    const v5 = [2, -4, -half]

    const vertices = new Float32Array([
        ...v0, ...v1, ...v2, // front
        ...v3, ...v4, ...v5, // back
    ])


    const indices = [
        // front
        0, 1, 2,

        // back (reverse winding)
        5, 4, 3,

        // left side
        0, 3, 1,
        1, 3, 4,

        // right side
        2, 5, 0,
        0, 5, 3,

        // bottom side
        1, 4, 2,
        2, 4, 5,
    ]

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(vertices, 3)
    )
    geometry.setIndex(indices)
    geometry.computeVertexNormals()

    return geometry
}
