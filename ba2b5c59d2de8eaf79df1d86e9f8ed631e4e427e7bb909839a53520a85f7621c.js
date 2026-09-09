function __sn17_user(THREE) {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a5a2d,
    metalness: 0.0,
    roughness: 0.45,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4b2a18,
    metalness: 0.0,
    roughness: 0.65,
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xc58a52,
    metalness: 0.0,
    roughness: 0.45,
  });
  const drumHeadMat = new THREE.MeshStandardMaterial({
    color: 0xb98668,
    metalness: 0.35,
    roughness: 0.32,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    metalness: 0.5,
    roughness: 0.18,
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x1f1712,
    metalness: 0.0,
    roughness: 0.8,
  });

  const shellGeom = new THREE.CylinderGeometry(0.93, 0.93, 0.24, 96, 1, false);
  const shell = new THREE.Mesh(shellGeom, woodMat);
  shell.rotation.x = Math.PI / 2;
  shell.position.z = -0.02;
  root.add(shell);

  const rear_rimGeom = new THREE.TorusGeometry(0.89, 0.045, 16, 96);
  const rear_rim = new THREE.Mesh(rear_rimGeom, darkWoodMat);
  rear_rim.position.z = -0.135;
  root.add(rear_rim);

  const front_drumheadGeom = new THREE.SphereGeometry(0.82, 96, 48);
  const front_drumhead = new THREE.Mesh(front_drumheadGeom, drumHeadMat);
  front_drumhead.scale.set(1, 1, 0.055);
  front_drumhead.position.z = 0.105;
  root.add(front_drumhead);

  const front_wood_rimGeom = new THREE.TorusGeometry(0.89, 0.055, 20, 128);
  const front_wood_rim = new THREE.Mesh(front_wood_rimGeom, woodMat);
  front_wood_rim.position.z = 0.125;
  root.add(front_wood_rim);

  const inner_shadow_grooveGeom = new THREE.TorusGeometry(0.832, 0.009, 10, 128);
  const inner_shadow_groove = new THREE.Mesh(inner_shadow_grooveGeom, shadowMat);
  inner_shadow_groove.position.z = 0.148;
  root.add(inner_shadow_groove);

  const outer_highlight_rimGeom = new THREE.TorusGeometry(0.932, 0.012, 10, 128);
  const outer_highlight_rim = new THREE.Mesh(outer_highlight_rimGeom, lightWoodMat);
  outer_highlight_rim.position.z = 0.145;
  root.add(outer_highlight_rim);

  const rim_grain_lines = new THREE.Group();
  const grainRadii = [0.858, 0.875, 0.905, 0.922];
  for (let i = 0; i < grainRadii.length; i++) {
    const r = grainRadii[i];
    const z = 0.181 - Math.abs(r - 0.89) * 0.12;
    const grain_line = new THREE.Mesh(
      new THREE.TorusGeometry(r, i === 1 ? 0.004 : 0.003, 6, 128),
      i % 2 === 0 ? darkWoodMat : lightWoodMat
    );
    grain_line.position.z = z;
    rim_grain_lines.add(grain_line);
  }
  root.add(rim_grain_lines);

  const shell_grain_lines = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const shell_grain = new THREE.Mesh(
      new THREE.TorusGeometry(0.934, 0.0025, 6, 128),
      darkWoodMat
    );
    shell_grain.position.z = -0.105 + i * 0.038;
    shell_grain_lines.add(shell_grain);
  }
  root.add(shell_grain_lines);

  const left_wood_inlayGeom = new THREE.BoxGeometry(0.055, 0.34, 0.018);
  const left_wood_inlay = new THREE.Mesh(left_wood_inlayGeom, lightWoodMat);
  left_wood_inlay.position.set(-0.91, 0.18, 0.184);
  left_wood_inlay.rotation.z = -0.08;
  root.add(left_wood_inlay);

  const inlay_grain = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const inlay_grain_line = new THREE.Mesh(
      new THREE.BoxGeometry(0.004, 0.29, 0.006),
      darkWoodMat
    );
    inlay_grain_line.position.set(-0.925 + i * 0.015, 0.18, 0.197);
    inlay_grain_line.rotation.z = -0.08;
    inlay_grain.add(inlay_grain_line);
  }
  root.add(inlay_grain);

  const top_latch_baseGeom = new THREE.BoxGeometry(0.24, 0.035, 0.07);
  const top_latch_base = new THREE.Mesh(top_latch_baseGeom, chromeMat);
  top_latch_base.position.set(0, 0.965, 0.02);
  root.add(top_latch_base);

  const top_latch_plateGeom = new THREE.BoxGeometry(0.17, 0.025, 0.09);
  const top_latch_plate = new THREE.Mesh(top_latch_plateGeom, chromeMat);
  top_latch_plate.position.set(0, 0.99, 0.025);
  root.add(top_latch_plate);

  const top_latch_knobGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.045, 24);
  const top_latch_knob = new THREE.Mesh(top_latch_knobGeom, chromeMat);
  top_latch_knob.position.set(0, 1.025, 0.025);
  root.add(top_latch_knob);

  const top_latch_pinGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.055, 16);
  const top_latch_pin = new THREE.Mesh(top_latch_pinGeom, chromeMat);
  top_latch_pin.position.set(0, 1.055, 0.025);
  root.add(top_latch_pin);

  const left_clasp_baseGeom = new THREE.BoxGeometry(0.055, 0.13, 0.075);
  const left_clasp_base = new THREE.Mesh(left_clasp_baseGeom, chromeMat);
  left_clasp_base.position.set(-0.965, 0.02, 0.08);
  root.add(left_clasp_base);

  const left_clasp_hookGeom = new THREE.BoxGeometry(0.13, 0.035, 0.085);
  const left_clasp_hook = new THREE.Mesh(left_clasp_hookGeom, chromeMat);
  left_clasp_hook.position.set(-0.895, 0.02, 0.105);
  root.add(left_clasp_hook);

  const left_clasp_knobGeom = new THREE.SphereGeometry(0.035, 24, 12);
  const left_clasp_knob = new THREE.Mesh(left_clasp_knobGeom, chromeMat);
  left_clasp_knob.scale.set(1.0, 0.75, 0.75);
  left_clasp_knob.position.set(-0.99, 0.02, 0.13);
  root.add(left_clasp_knob);

  const bottom_jointGeom = new THREE.BoxGeometry(0.012, 0.11, 0.012);
  const bottom_joint = new THREE.Mesh(bottom_jointGeom, darkWoodMat);
  bottom_joint.position.set(0.02, -0.91, 0.188);
  bottom_joint.rotation.z = -0.18;
  root.add(bottom_joint);

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
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
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
