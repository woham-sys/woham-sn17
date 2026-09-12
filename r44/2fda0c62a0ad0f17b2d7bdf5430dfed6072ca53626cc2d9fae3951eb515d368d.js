// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "four_lobe_spinner";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x303030,
    metalness: 0.0,
    roughness: 0.8,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x383838,
    metalness: 0.0,
    roughness: 0.8,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8,
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x454545,
    metalness: 0.0,
    roughness: 0.3,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const lobeOffset = 1.16;
  const lobePositions = [
    new THREE.Vector3(0, lobeOffset, 0),
    new THREE.Vector3(lobeOffset, 0, 0),
    new THREE.Vector3(0, -lobeOffset, 0),
    new THREE.Vector3(-lobeOffset, 0, 0),
  ];

  const instance_dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(0, 2.08);
  bodyShape.bezierCurveTo(0.50, 2.08, 0.86, 1.76, 0.91, 1.32);
  bodyShape.bezierCurveTo(0.94, 1.06, 0.82, 0.87, 0.61, 0.76);
  bodyShape.bezierCurveTo(0.43, 0.67, 0.42, 0.48, 0.56, 0.34);
  bodyShape.bezierCurveTo(0.68, 0.22, 0.86, 0.20, 1.01, 0.28);
  bodyShape.bezierCurveTo(1.20, 0.38, 1.39, 0.31, 1.52, 0.17);
  bodyShape.bezierCurveTo(1.73, -0.05, 1.69, -0.39, 1.51, -0.62);
  bodyShape.bezierCurveTo(1.34, -0.83, 1.06, -0.91, 0.82, -0.82);
  bodyShape.bezierCurveTo(0.63, -0.75, 0.53, -0.60, 0.45, -0.48);
  bodyShape.bezierCurveTo(0.36, -0.34, 0.18, -0.34, 0, -0.50);
  bodyShape.bezierCurveTo(-0.18, -0.34, -0.36, -0.34, -0.45, -0.48);
  bodyShape.bezierCurveTo(-0.53, -0.60, -0.63, -0.75, -0.82, -0.82);
  bodyShape.bezierCurveTo(-1.06, -0.91, -1.34, -0.83, -1.51, -0.62);
  bodyShape.bezierCurveTo(-1.69, -0.39, -1.73, -0.05, -1.52, 0.17);
  bodyShape.bezierCurveTo(-1.39, 0.31, -1.20, 0.38, -1.01, 0.28);
  bodyShape.bezierCurveTo(-0.86, 0.20, -0.68, 0.22, -0.56, 0.34);
  bodyShape.bezierCurveTo(-0.42, 0.48, -0.43, 0.67, -0.61, 0.76);
  bodyShape.bezierCurveTo(-0.82, 0.87, -0.94, 1.06, -0.91, 1.32);
  bodyShape.bezierCurveTo(-0.86, 1.76, -0.50, 2.08, 0, 2.08);
  bodyShape.closePath();

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.18,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.055,
    bevelSegments: 4,
  });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  body.position.z = -0.09;
  root.add(body);

  const lobe_panelsGeom = new THREE.CylinderGeometry(0.75, 0.75, 0.035, 48);
  const lobe_panels = new THREE.InstancedMesh(lobe_panelsGeom, panelMat, 4);
  lobe_panels.name = "lobe_panels";
  for (let i = 0; i < lobePositions.length; i++) {
    const p = lobePositions[i];
    setInstance(lobe_panels, i, p.x, p.y, 0.135, Math.PI / 2, 0, 0);
  }
  lobe_panels.instanceMatrix.needsUpdate = true;
  root.add(lobe_panels);

  const lobe_groove_ringsGeom = new THREE.TorusGeometry(0.785, 0.025, 10, 48);
  const lobe_groove_rings = new THREE.InstancedMesh(
    lobe_groove_ringsGeom,
    grooveMat,
    4
  );
  lobe_groove_rings.name = "lobe_groove_rings";
  for (let i = 0; i < lobePositions.length; i++) {
    const p = lobePositions[i];
    setInstance(lobe_groove_rings, i, p.x, p.y, 0.158, 0, 0, 0);
  }
  lobe_groove_rings.instanceMatrix.needsUpdate = true;
  root.add(lobe_groove_rings);

  const lobe_outer_rimsGeom = new THREE.TorusGeometry(0.85, 0.045, 12, 48);
  const lobe_outer_rims = new THREE.InstancedMesh(
    lobe_outer_rimsGeom,
    bodyMat,
    4
  );
  lobe_outer_rims.name = "lobe_outer_rims";
  for (let i = 0; i < lobePositions.length; i++) {
    const p = lobePositions[i];
    setInstance(lobe_outer_rims, i, p.x, p.y, 0.132, 0, 0, 0);
  }
  lobe_outer_rims.instanceMatrix.needsUpdate = true;
  root.add(lobe_outer_rims);

  const peripheral_button_basesGeom = new THREE.CylinderGeometry(
    0.36,
    0.36,
    0.09,
    40
  );
  const peripheral_button_bases = new THREE.InstancedMesh(
    peripheral_button_basesGeom,
    grooveMat,
    4
  );
  peripheral_button_bases.name = "peripheral_button_bases";
  for (let i = 0; i < lobePositions.length; i++) {
    const p = lobePositions[i];
    setInstance(
      peripheral_button_bases,
      i,
      p.x,
      p.y,
      0.185,
      Math.PI / 2,
      0,
      0
    );
  }
  peripheral_button_bases.instanceMatrix.needsUpdate = true;
  root.add(peripheral_button_bases);

  const peripheral_button_collarsGeom = new THREE.TorusGeometry(
    0.315,
    0.035,
    12,
    40
  );
  const peripheral_button_collars = new THREE.InstancedMesh(
    peripheral_button_collarsGeom,
    grooveMat,
    4
  );
  peripheral_button_collars.name = "peripheral_button_collars";
  for (let i = 0; i < lobePositions.length; i++) {
    const p = lobePositions[i];
    setInstance(peripheral_button_collars, i, p.x, p.y, 0.23, 0, 0, 0);
  }
  peripheral_button_collars.instanceMatrix.needsUpdate = true;
  root.add(peripheral_button_collars);

  const peripheral_buttonsGeom = new THREE.SphereGeometry(0.285, 40, 20);
  const peripheral_buttons = new THREE.InstancedMesh(
    peripheral_buttonsGeom,
    buttonMat,
    4
  );
  peripheral_buttons.name = "peripheral_buttons";
  for (let i = 0; i < lobePositions.length; i++) {
    const p = lobePositions[i];
    setInstance(peripheral_buttons, i, p.x, p.y, 0.235, 0, 0, 0);
  }
  peripheral_buttons.instanceMatrix.needsUpdate = true;
  root.add(peripheral_buttons);

  const center_hub_baseGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.075, 48);
  const center_hub_base = new THREE.Mesh(center_hub_baseGeom, grooveMat);
  center_hub_base.name = "center_hub_base";
  center_hub_base.rotation.x = Math.PI / 2;
  center_hub_base.position.z = 0.165;
  root.add(center_hub_base);

  const center_hub_rimGeom = new THREE.TorusGeometry(0.385, 0.045, 12, 48);
  const center_hub_rim = new THREE.Mesh(center_hub_rimGeom, bodyMat);
  center_hub_rim.name = "center_hub_rim";
  center_hub_rim.position.z = 0.205;
  root.add(center_hub_rim);

  const center_hub_capGeom = new THREE.CylinderGeometry(0.31, 0.34, 0.12, 48);
  const center_hub_cap = new THREE.Mesh(center_hub_capGeom, panelMat);
  center_hub_cap.name = "center_hub_cap";
  center_hub_cap.rotation.x = Math.PI / 2;
  center_hub_cap.position.z = 0.235;
  root.add(center_hub_cap);

  const center_hub_topGeom = new THREE.CylinderGeometry(0.29, 0.29, 0.025, 48);
  const center_hub_top = new THREE.Mesh(center_hub_topGeom, panelMat);
  center_hub_top.name = "center_hub_top";
  center_hub_top.rotation.x = Math.PI / 2;
  center_hub_top.position.z = 0.302;
  root.add(center_hub_top);

  const center_bearing_outerGeom = new THREE.TorusGeometry(0.105, 0.026, 12, 32);
  const center_bearing_outer = new THREE.Mesh(center_bearing_outerGeom, silverMat);
  center_bearing_outer.name = "center_bearing_outer";
  center_bearing_outer.position.z = 0.326;
  root.add(center_bearing_outer);

  const center_bearing_innerGeom = new THREE.CylinderGeometry(
    0.071,
    0.071,
    0.022,
    32
  );
  const center_bearing_inner = new THREE.Mesh(center_bearing_innerGeom, silverMat);
  center_bearing_inner.name = "center_bearing_inner";
  center_bearing_inner.rotation.x = Math.PI / 2;
  center_bearing_inner.position.z = 0.329;
  root.add(center_bearing_inner);

  const center_axle_holeGeom = new THREE.CylinderGeometry(
    0.038,
    0.038,
    0.012,
    24
  );
  const center_axle_hole = new THREE.Mesh(center_axle_holeGeom, grooveMat);
  center_axle_hole.name = "center_axle_hole";
  center_axle_hole.rotation.x = Math.PI / 2;
  center_axle_hole.position.z = 0.345;
  root.add(center_axle_hole);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}