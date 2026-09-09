function __sn17_user(THREE) {
  const root = new THREE.Group();

  const feltTexture = createFeltTexture(THREE);

  const crownMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    map: feltTexture,
    bumpMap: feltTexture,
    bumpScale: 0.012,
    roughness: 0.98,
  });
  const brimMat = new THREE.MeshStandardMaterial({
    color: 0x0d0d0d,
    map: feltTexture,
    bumpMap: feltTexture,
    bumpScale: 0.014,
    roughness: 0.98,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    roughness: 0.95,
  });

  const brimProfile = [
    new THREE.Vector2(0.00, -0.105),
    new THREE.Vector2(0.55, -0.108),
    new THREE.Vector2(1.05, -0.115),
    new THREE.Vector2(1.30, -0.105),
    new THREE.Vector2(1.42, -0.075),
    new THREE.Vector2(1.46, -0.025),
    new THREE.Vector2(1.45,  0.025),
    new THREE.Vector2(1.40,  0.065),
    new THREE.Vector2(1.28,  0.080),
    new THREE.Vector2(1.05,  0.075),
    new THREE.Vector2(0.72,  0.060),
    new THREE.Vector2(0.00,  0.055),
  ];
  const brimGeom = new THREE.LatheGeometry(brimProfile, 96);
  const brim = new THREE.Mesh(brimGeom, brimMat);
  root.add(brim);

  const outer_rolled_edgeGeom = new THREE.TorusGeometry(1.425, 0.035, 12, 96);
  const outer_rolled_edge = new THREE.Mesh(outer_rolled_edgeGeom, brimMat);
  outer_rolled_edge.rotation.x = Math.PI / 2;
  outer_rolled_edge.position.y = -0.025;
  root.add(outer_rolled_edge);

  const crownProfile = [
    new THREE.Vector2(0.00, 0.055),
    new THREE.Vector2(0.88, 0.055),
    new THREE.Vector2(0.94, 0.075),
    new THREE.Vector2(0.96, 0.125),
    new THREE.Vector2(0.95, 0.220),
    new THREE.Vector2(0.93, 0.420),
    new THREE.Vector2(0.90, 0.680),
    new THREE.Vector2(0.87, 0.900),
    new THREE.Vector2(0.83, 1.035),
    new THREE.Vector2(0.76, 1.105),
    new THREE.Vector2(0.62, 1.145),
    new THREE.Vector2(0.42, 1.165),
    new THREE.Vector2(0.20, 1.155),
    new THREE.Vector2(0.00, 1.140),
  ];
  const crownGeom = new THREE.LatheGeometry(crownProfile, 96);
  const crown = new THREE.Mesh(crownGeom, crownMat);
  root.add(crown);

  const upper_panel_seamGeom = new THREE.TorusGeometry(0.815, 0.009, 8, 96);
  const upper_panel_seam = new THREE.Mesh(upper_panel_seamGeom, seamMat);
  upper_panel_seam.rotation.x = Math.PI / 2;
  upper_panel_seam.position.y = 1.045;
  root.add(upper_panel_seam);

  const lower_crown_seamGeom = new THREE.TorusGeometry(0.947, 0.008, 8, 96);
  const lower_crown_seam = new THREE.Mesh(lower_crown_seamGeom, seamMat);
  lower_crown_seam.rotation.x = Math.PI / 2;
  lower_crown_seam.position.y = 0.135;
  root.add(lower_crown_seam);

  fitToUnitCube(THREE, root);
  return root;
}

function createFeltTexture(THREE) {
  const size = 64;
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const index = (y * size + x) * 4;
      const grain = (x * 37 + y * 61 + x * y * 13) % 43;
      const fiber = ((x * 11 + y * 17) % 29 === 0) ? 18 : 0;
      const value = Math.min(255, 205 + grain + fiber);
      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
      data[index + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(18, 12);
  texture.needsUpdate = true;
  return texture;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
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
