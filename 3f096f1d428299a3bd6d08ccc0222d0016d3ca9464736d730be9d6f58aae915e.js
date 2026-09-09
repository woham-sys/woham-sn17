function __sn17_user(THREE) {
  const root = new THREE.Group();

  const tableW = 1.55;
  const tableD = 0.82;
  const topY = 0.72;
  const glassT = 0.025;
  const frameX = 0.64;
  const frameZ = 0.31;
  const tube = 0.075;
  const bottomY = 0.035;
  const topFrameY = 0.655;

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd8dce0,
    metalness: 0.7,
    roughness: 0.22,
  });
  const darkChromeMat = new THREE.MeshStandardMaterial({
    color: 0x555b5e,
    metalness: 0.7,
    roughness: 0.28,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xbfd8d6,
    transparent: true,
    opacity: 0.48,
    roughness: 0.12,
    transmission: 0.35,
  });
  const glassEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x174b45,
    metalness: 0.0,
    roughness: 0.25,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.85,
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x168bd0,
    metalness: 0.0,
    roughness: 0.35,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc7ccd0,
    metalness: 0.5,
    roughness: 0.25,
  });

  function addBox(w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  const glass_top = new THREE.Mesh(new THREE.BoxGeometry(tableW, glassT, tableD), glassMat);
  glass_top.position.set(0, topY, 0);
  root.add(glass_top);

  const front_glass_edge = addBox(tableW + 0.01, glassT * 1.25, 0.012, glassEdgeMat, 0, topY, tableD / 2 + 0.002);
  const back_glass_edge = addBox(tableW + 0.01, glassT * 1.25, 0.012, glassEdgeMat, 0, topY, -tableD / 2 - 0.002);
  const left_glass_edge = addBox(0.012, glassT * 1.25, tableD, glassEdgeMat, -tableW / 2 - 0.002, topY, 0);
  const right_glass_edge = addBox(0.012, glassT * 1.25, tableD, glassEdgeMat, tableW / 2 + 0.002, topY, 0);

  const side_frame_top_rail = addBox(tube, tube, tableD + tube, chromeMat, frameX, topFrameY, 0);
  const side_frame_bottom_rail = addBox(tube, tube, tableD + tube, chromeMat, frameX, bottomY, 0);
  const side_frame_front_leg = addBox(tube, topFrameY - bottomY, tube, chromeMat, frameX, (topFrameY + bottomY) / 2, frameZ);
  const side_frame_back_leg = addBox(tube, topFrameY - bottomY, tube, chromeMat, frameX, (topFrameY + bottomY) / 2, -frameZ);

  const left_side_frame_top_rail = addBox(tube, tube, tableD + tube, chromeMat, -frameX, topFrameY, 0);
  const left_side_frame_bottom_rail = addBox(tube, tube, tableD + tube, chromeMat, -frameX, bottomY, 0);
  const left_side_frame_front_leg = addBox(tube, topFrameY - bottomY, tube, chromeMat, -frameX, (topFrameY + bottomY) / 2, frameZ);
  const left_side_frame_back_leg = addBox(tube, topFrameY - bottomY, tube, chromeMat, -frameX, (topFrameY + bottomY) / 2, -frameZ);

  const rear_crossbar = addBox(frameX * 2 + tube, 0.065, 0.065, chromeMat, 0, topFrameY - 0.015, -frameZ);
  const front_crossbar = addBox(frameX * 2 + tube, 0.065, 0.065, chromeMat, 0, topFrameY - 0.015, frameZ);

  const front_apron = addBox(1.22, 0.075, 0.055, chromeMat, 0, 0.625, frameZ + 0.01);
  const rear_apron = addBox(1.22, 0.075, 0.055, chromeMat, 0, 0.625, -frameZ - 0.01);

  const control_panel = addBox(0.48, 0.055, 0.035, silverMat, -0.39, 0.625, frameZ + 0.045);

  const usb_port_1 = addBox(0.045, 0.022, 0.008, blackMat, -0.55, 0.625, frameZ + 0.066);
  const usb_port_2 = addBox(0.045, 0.022, 0.008, blackMat, -0.46, 0.625, frameZ + 0.066);
  const usb_port_3 = addBox(0.045, 0.022, 0.008, blackMat, -0.37, 0.625, frameZ + 0.066);
  const usb_port_4 = addBox(0.045, 0.022, 0.008, blackMat, -0.28, 0.625, frameZ + 0.066);
  const usb_insert_1 = addBox(0.028, 0.008, 0.004, blueMat, -0.55, 0.625, frameZ + 0.072);
  const usb_insert_2 = addBox(0.028, 0.008, 0.004, blueMat, -0.37, 0.625, frameZ + 0.072);
  const usb_insert_3 = addBox(0.028, 0.008, 0.004, blueMat, -0.28, 0.625, frameZ + 0.072);

  const power_button = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.008, 24), blackMat);
  power_button.rotation.x = Math.PI / 2;
  power_button.position.set(-0.62, 0.625, frameZ + 0.067);
  root.add(power_button);

  const status_led = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.009, 16), blueMat);
  status_led.rotation.x = Math.PI / 2;
  status_led.position.set(-0.17, 0.625, frameZ + 0.068);
  root.add(status_led);

  const mount_discs = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.055, 0.055, 0.014, 32), silverMat);
  const mount_stems = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.018, 0.018, 0.045, 20), darkChromeMat);
  const mount_centers = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.014, 0.014, 0.018, 20), blackMat);
  const dummy = new THREE.Object3D();
  const mounts = [
    [-0.62, -0.29],
    [0.62, -0.29],
    [-0.62, 0.29],
    [0.62, 0.29],
  ];
  for (let i = 0; i < mounts.length; i++) {
    const x = mounts[i][0];
    const z = mounts[i][1];

    dummy.position.set(x, topY + glassT / 2 + 0.012, z);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    mount_discs.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x, topY + glassT / 2 + 0.035, z);
    dummy.updateMatrix();
    mount_stems.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x, topY + glassT / 2 + 0.018, z);
    dummy.updateMatrix();
    mount_centers.setMatrixAt(i, dummy.matrix);
  }
  root.add(mount_discs);
  root.add(mount_stems);
  root.add(mount_centers);

  const foot_pads = new THREE.InstancedMesh(new THREE.BoxGeometry(0.105, 0.025, 0.105), rubberMat);
  const feet = [
    [-frameX, -frameZ],
    [-frameX, frameZ],
    [frameX, -frameZ],
    [frameX, frameZ],
  ];
  for (let i = 0; i < feet.length; i++) {
    dummy.position.set(feet[i][0], 0.0125, feet[i][1]);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    foot_pads.setMatrixAt(i, dummy.matrix);
  }
  root.add(foot_pads);

  const corner_cap_front_right = addBox(0.105, 0.035, 0.105, darkChromeMat, frameX, topFrameY + 0.005, frameZ);
  corner_cap_front_right.rotation.z = -0.25;
  const corner_cap_back_right = addBox(0.105, 0.035, 0.105, darkChromeMat, frameX, topFrameY + 0.005, -frameZ);
  corner_cap_back_right.rotation.z = 0.25;
  const corner_cap_front_left = addBox(0.105, 0.035, 0.105, darkChromeMat, -frameX, topFrameY + 0.005, frameZ);
  corner_cap_front_left.rotation.z = 0.25;
  const corner_cap_back_left = addBox(0.105, 0.035, 0.105, darkChromeMat, -frameX, topFrameY + 0.005, -frameZ);
  corner_cap_back_left.rotation.z = -0.25;

  const under_glass_spine = addBox(0.92, 0.025, 0.045, darkChromeMat, 0, 0.685, 0);

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
