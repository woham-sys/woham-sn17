function __sn17_user(THREE) {
  const root = new THREE.Group();

  const sphereRadius = 0.5;

  const crystal_ballMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 1.0,
    thickness: 0.12,
    attenuationColor: 0xf4f8fa,
    attenuationDistance: 4.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    ior: 1.5,
    transparent: true,
    opacity: 0.52,
    depthWrite: false
  });

  const crystal_ballGeom = new THREE.SphereGeometry(sphereRadius, 96, 48);
  const crystal_ball = new THREE.Mesh(crystal_ballGeom, crystal_ballMat);
  crystal_ball.renderOrder = 1;
  root.add(crystal_ball);

  const internal_hazeMat = new THREE.MeshStandardMaterial({
    color: 0xe8eef0,
    metalness: 0.0,
    roughness: 0.8,
    transparent: true,
    opacity: 0.035,
    side: THREE.BackSide,
    depthWrite: false
  });
  const internal_haze = new THREE.Mesh(crystal_ballGeom, internal_hazeMat);
  internal_haze.scale.setScalar(0.985);
  internal_haze.renderOrder = 0;
  root.add(internal_haze);

  const gold_rimMat = new THREE.MeshPhysicalMaterial({
    color: 0xd6a84f,
    metalness: 0.7,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    transparent: true,
    opacity: 0.9
  });
  const gold_rimGeom = new THREE.TorusGeometry(0.494, 0.018, 24, 128);
  const gold_rim = new THREE.Mesh(gold_rimGeom, gold_rimMat);
  gold_rim.position.z = -0.006;
  root.add(gold_rim);

  const inner_gold_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xb98532,
    metalness: 0.7,
    roughness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    transparent: true,
    opacity: 0.72
  });
  const inner_gold_edgeGeom = new THREE.TorusGeometry(0.472, 0.0045, 16, 128);
  const inner_gold_edge = new THREE.Mesh(inner_gold_edgeGeom, inner_gold_edgeMat);
  inner_gold_edge.position.z = -0.002;
  root.add(inner_gold_edge);

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.42,
    side: THREE.FrontSide,
    depthWrite: false
  });

  function createSphericalHighlight(radius, x, y, width, height, rotation) {
    const z = Math.sqrt(Math.max(0, radius * radius - x * x - y * y));
    const normal = new THREE.Vector3(x, y, z).normalize();
    const position = normal.clone().multiplyScalar(radius + 0.004);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    const geometry = new THREE.CircleGeometry(1, 40);
    const mesh = new THREE.Mesh(geometry, highlightMat);
    mesh.position.copy(position);
    mesh.quaternion.copy(quaternion);
    mesh.rotateZ(rotation);
    mesh.scale.set(width, height, 1);
    mesh.renderOrder = 3;
    return mesh;
  }

  const upper_left_highlight = createSphericalHighlight(
    sphereRadius, -0.19, 0.16, 0.105, 0.145, -0.18
  );
  root.add(upper_left_highlight);

  const lower_right_highlight = createSphericalHighlight(
    sphereRadius, 0.20, -0.19, 0.085, 0.115, 0.22
  );
  root.add(lower_right_highlight);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.98 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}


export default function generate(THREE) {
  const obj = __sn17_user(THREE);
  if (obj === null || obj === undefined) return obj;
  const root = new THREE.Group();
  const inner = new THREE.Group();
  inner.add(obj);
  root.add(inner);
  const box = new THREE.Box3().setFromObject(inner);
  const size = new THREE.Vector3(); box.getSize(size);
  const ctr = new THREE.Vector3(); box.getCenter(ctr);
  if (isFinite(ctr.x) && isFinite(ctr.y) && isFinite(ctr.z)) inner.position.sub(ctr);
  const m = Math.max(size.x, size.y, size.z);
  if (isFinite(m) && m > 0) root.scale.setScalar(0.98 / m);
  return root;
}
