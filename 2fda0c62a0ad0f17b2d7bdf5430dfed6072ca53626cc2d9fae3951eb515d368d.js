function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "four_lobe_spinner";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const details_group = new THREE.Group();
  details_group.name = "details_group";
  root.add(details_group);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x252629,
    roughness: 0.8
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x2d2e31,
    roughness: 0.8
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    roughness: 0.85
  });
  const button_baseMat = new THREE.MeshStandardMaterial({
    color: 0x18191b,
    roughness: 0.75
  });
  const button_domeMat = new THREE.MeshStandardMaterial({
    color: 0x38393c,
    roughness: 0.55
  });
  const center_capMat = new THREE.MeshStandardMaterial({
    color: 0x303135,
    roughness: 0.7
  });
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0xa8a8a3,
    metalness: 0.5,
    roughness: 0.35
  });

  const lobe_positions = [
    new THREE.Vector3(0, 0.62, 0),
    new THREE.Vector3(0.62, 0, 0),
    new THREE.Vector3(0, -0.62, 0),
    new THREE.Vector3(-0.62, 0, 0)
  ];

  const dummy = new THREE.Object3D();

  const body_shape = new THREE.Shape();
  body_shape.moveTo(0, 1.03);
  body_shape.bezierCurveTo(0.24, 1.03, 0.42, 0.88, 0.44, 0.68);
  body_shape.bezierCurveTo(0.45, 0.52, 0.39, 0.40, 0.29, 0.34);
  body_shape.bezierCurveTo(0.22, 0.30, 0.30, 0.23, 0.42, 0.21);
  body_shape.bezierCurveTo(0.54, 0.19, 0.62, 0.29, 0.72, 0.29);
  body_shape.bezierCurveTo(0.90, 0.29, 1.03, 0.15, 1.04, -0.04);
  body_shape.bezierCurveTo(1.05, -0.24, 0.91, -0.41, 0.73, -0.43);
  body_shape.bezierCurveTo(0.58, -0.45, 0.48, -0.36, 0.39, -0.29);
  body_shape.bezierCurveTo(0.31, -0.22, 0.26, -0.31, 0.25, -0.43);
  body_shape.bezierCurveTo(0.23, -0.58, 0.13, -0.70, 0.13, -0.82);
  body_shape.bezierCurveTo(0.13, -1.01, -0.05, -1.10, -0.24, -1.06);
  body_shape.bezierCurveTo(-0.42, -1.02, -0.49, -0.85, -0.46, -0.68);
  body_shape.bezierCurveTo(-0.44, -0.53, -0.34, -0.43, -0.25, -0.36);
  body_shape.bezierCurveTo(-0.18, -0.30, -0.27, -0.22, -0.40, -0.22);
  body_shape.bezierCurveTo(-0.56, -0.22, -0.66, -0.32, -0.82, -0.31);
  body_shape.bezierCurveTo(-1.01, -0.30, -1.10, -0.12, -1.08, 0.08);
  body_shape.bezierCurveTo(-1.06, 0.27, -0.90, 0.39, -0.72, 0.39);
  body_shape.bezierCurveTo(-0.57, 0.40, -0.48, 0.31, -0.39, 0.25);
  body_shape.bezierCurveTo(-0.31, 0.19, -0.27, 0.31, -0.26, 0.43);
  body_shape.bezierCurveTo(-0.25, 0.58, -0.15, 0.70, -0.15, 0.82);
  body_shape.bezierCurveTo(-0.15, 0.99, -0.05, 1.03, 0, 1.03);
  body_shape.closePath();

  const bodyGeom = new THREE.ExtrudeGeometry(body_shape, {
    curveSegments: 24,
    steps: 1,
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.035,
    bevelOffset: 0,
    bevelSegments: 3
  });
  bodyGeom.translate(0, 0, -0.06);

  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  body_group.add(body);

  const lobe_panelGeom = new THREE.CylinderGeometry(0.365, 0.365, 0.018, 64);
  const lobe_panels = new THREE.InstancedMesh(lobe_panelGeom, panelMat, 4);
  lobe_panels.name = "lobe_panels";
  for (let i = 0; i < lobe_positions.length; i++) {
    dummy.position.set(lobe_positions[i].x, lobe_positions[i].y, 0.091);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    lobe_panels.setMatrixAt(i, dummy.matrix);
  }
  lobe_panels.instanceMatrix.needsUpdate = true;
  details_group.add(lobe_panels);

  const lobe_grooveGeom = new THREE.TorusGeometry(0.374, 0.012, 10, 64);
  const lobe_grooves = new THREE.InstancedMesh(lobe_grooveGeom, grooveMat, 4);
  lobe_grooves.name = "lobe_grooves";
  for (let i = 0; i < lobe_positions.length; i++) {
    dummy.position.set(lobe_positions[i].x, lobe_positions[i].y, 0.106);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    lobe_grooves.setMatrixAt(i, dummy.matrix);
  }
  lobe_grooves.instanceMatrix.needsUpdate = true;
  details_group.add(lobe_grooves);

  const button_baseGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.045, 48);
  const button_bases = new THREE.InstancedMesh(button_baseGeom, button_baseMat, 4);
  button_bases.name = "button_bases";
  for (let i = 0; i < lobe_positions.length; i++) {
    dummy.position.set(lobe_positions[i].x, lobe_positions[i].y, 0.126);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    button_bases.setMatrixAt(i, dummy.matrix);
  }
  button_bases.instanceMatrix.needsUpdate = true;
  details_group.add(button_bases);

  const button_domeGeom = new THREE.SphereGeometry(0.15, 40, 20);
  const button_domes = new THREE.InstancedMesh(button_domeGeom, button_domeMat, 4);
  button_domes.name = "button_domes";
  for (let i = 0; i < lobe_positions.length; i++) {
    dummy.position.set(lobe_positions[i].x, lobe_positions[i].y, 0.145);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 0.55);
    dummy.updateMatrix();
    button_domes.setMatrixAt(i, dummy.matrix);
  }
  button_domes.instanceMatrix.needsUpdate = true;
  details_group.add(button_domes);

  const center_recessGeom = new THREE.CylinderGeometry(0.225, 0.225, 0.018, 64);
  const center_recess = new THREE.Mesh(center_recessGeom, grooveMat);
  center_recess.name = "center_recess";
  center_recess.rotation.x = Math.PI / 2;
  center_recess.position.z = 0.091;
  details_group.add(center_recess);

  const center_bezelGeom = new THREE.TorusGeometry(0.205, 0.025, 12, 64);
  const center_bezel = new THREE.Mesh(center_bezelGeom, button_baseMat);
  center_bezel.name = "center_bezel";
  center_bezel.position.z = 0.111;
  details_group.add(center_bezel);

  const center_capGeom = new THREE.CylinderGeometry(0.16, 0.17, 0.06, 64);
  const center_cap = new THREE.Mesh(center_capGeom, center_capMat);
  center_cap.name = "center_cap";
  center_cap.rotation.x = Math.PI / 2;
  center_cap.position.z = 0.132;
  details_group.add(center_cap);

  const center_cap_faceGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.012, 64);
  const center_cap_face = new THREE.Mesh(center_cap_faceGeom, center_capMat);
  center_cap_face.name = "center_cap_face";
  center_cap_face.rotation.x = Math.PI / 2;
  center_cap_face.position.z = 0.165;
  details_group.add(center_cap_face);

  const screw_recessGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.012, 32);
  const screw_recess = new THREE.Mesh(screw_recessGeom, grooveMat);
  screw_recess.name = "screw_recess";
  screw_recess.rotation.x = Math.PI / 2;
  screw_recess.position.z = 0.174;
  details_group.add(screw_recess);

  const screw_headGeom = new THREE.CylinderGeometry(0.036, 0.036, 0.01, 32);
  const screw_head = new THREE.Mesh(screw_headGeom, screwMat);
  screw_head.name = "screw_head";
  screw_head.rotation.x = Math.PI / 2;
  screw_head.position.z = 0.181;
  details_group.add(screw_head);

  const screw_slotGeom = new THREE.BoxGeometry(0.047, 0.009, 0.006);
  const screw_slots = new THREE.InstancedMesh(screw_slotGeom, grooveMat, 2);
  screw_slots.name = "screw_slots";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(0, 0, 0.188);
    dummy.rotation.set(0, 0, i * Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    screw_slots.setMatrixAt(i, dummy.matrix);
  }
  screw_slots.instanceMatrix.needsUpdate = true;
  details_group.add(screw_slots);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const scale = 0.95 / maxDim;
    root.scale.setScalar(scale);
    root.position.multiplyScalar(scale);
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
