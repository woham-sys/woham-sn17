function __sn17_user(THREE) {
  const root = new THREE.Group();

  const bodyWidth = 0.78;
  const bodyHeight = 0.54;
  const bodyLength = 2.65;
  const cornerRadius = 0.20;
  const endRadius = 0.27;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb0001c,
    metalness: 0.0,
    roughness: 0.18,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x780012,
    metalness: 0.0,
    roughness: 0.28,
  });

  const bodyShape = new THREE.Shape();
  const x0 = -bodyWidth / 2;
  const x1 = bodyWidth / 2;
  const y0 = -bodyHeight / 2;
  const y1 = bodyHeight / 2;

  bodyShape.moveTo(x0 + cornerRadius, y0);
  bodyShape.lineTo(x1 - cornerRadius, y0);
  bodyShape.quadraticCurveTo(x1, y0, x1, y0 + cornerRadius);
  bodyShape.lineTo(x1, y1 - cornerRadius);
  bodyShape.quadraticCurveTo(x1, y1, x1 - cornerRadius, y1);
  bodyShape.lineTo(x0 + cornerRadius, y1);
  bodyShape.quadraticCurveTo(x0, y1, x0, y1 - cornerRadius);
  bodyShape.lineTo(x0, y0 + cornerRadius);
  bodyShape.quadraticCurveTo(x0, y0, x0 + cornerRadius, y0);

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: bodyLength,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: endRadius,
    bevelSize: endRadius,
    bevelOffset: 0,
    bevelSegments: 10,
  });
  bodyGeom.translate(0, 0, -bodyLength / 2);
  bodyGeom.computeVertexNormals();

  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const top_seamGeom = new THREE.CylinderGeometry(0.008, 0.008, 2.12, 10);
  const top_seam = new THREE.Mesh(top_seamGeom, seamMat);
  top_seam.rotation.x = Math.PI / 2;
  top_seam.position.set(0.235, 0.273, 0);
  root.add(top_seam);

  const end_seamGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.18, 8);
  const end_seam = new THREE.Mesh(end_seamGeom, seamMat);
  end_seam.position.set(-0.31, -0.075, bodyLength / 2 + endRadius + 0.004);
  root.add(end_seam);

  fitToUnitCube(THREE, root);
  return root;
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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
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
