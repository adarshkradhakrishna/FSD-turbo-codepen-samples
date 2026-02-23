import * as THREE from 'three'

const bodyMat = new THREE.MeshStandardMaterial({ color: "#a579d1",roughness:0.6,metalness:0.1 });
const redMat = new THREE.MeshStandardMaterial({ color: "red" });
const whiteMat = new THREE.MeshStandardMaterial({ color: "white" });
const coloredMat = new THREE.MeshBasicMaterial({
    vertexColors: true, // 🔥 REQUIRED
});
const pinkMat = new THREE.MeshStandardMaterial({ color: "pink" });
const blackMat = new THREE.MeshStandardMaterial({ color: "black" });
// const bodyMat = new THREE.MeshStandardMaterial({
//     color: "#a579d1",
//     emissive: '#d726daff',
//     emissiveIntensity: 0,
//     roughness: 0.4,
//     metalness: 0.1,
// })

export { blackMat, bodyMat, redMat, whiteMat, pinkMat, coloredMat }