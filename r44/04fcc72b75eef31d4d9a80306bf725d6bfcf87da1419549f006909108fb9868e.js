// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x202428,
    metalness: 0.0,
    roughness: 0.8,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8c7cc,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
  });
  const reflectionMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
  });

  const outer_flangeGeom = new THREE.CylinderGeometry(1.0, 1.0, 0.12, 64);
  const outer_flange = new THREE.Mesh(outer_flangeGeom, silverMat);
  outer_flange.rotation.x = Math.PI / 2;
  outer_flange.position.z = -0.015;
  root.add(outer_flange);

  const outer_edgeGeom = new THREE.TorusGeometry(0.965, 0.035, 12, 64);
  const outer_edge = new THREE.Mesh(outer_edgeGeom, brushedMat);
  outer_edge.position.z = 0.045;
  root.add(outer_edge);

  const outer_faceGeom = new THREE.RingGeometry(0.79, 0.985, 64);
  const outer_face = new THREE.Mesh(outer_faceGeom, silverMat);
  outer_face.position.z = 0.052;
  root.add(outer_face);

  const outer_grooveGeom = new THREE.TorusGeometry(0.89, 0.006, 8, 64);
  const outer_groove = new THREE.Mesh(outer_grooveGeom, brushedMat);
  outer_groove.position.z = 0.061;
  root.add(outer_groove);

  const inner_flangeGeom = new THREE.CylinderGeometry(0.82, 0.82, 0.09, 64);
  const inner_flange = new THREE.Mesh(inner_flangeGeom, polishedMat);
  inner_flange.rotation.x = Math.PI / 2;
  inner_flange.position.z = 0.075;
  root.add(inner_flange);

  const inner_faceGeom = new THREE.RingGeometry(0.61, 0.805, 64);
  const inner_face = new THREE.Mesh(inner_faceGeom, polishedMat);
  inner_face.position.z = 0.126;
  root.add(inner_face);

  const inner_outer_seamGeom = new THREE.TorusGeometry(0.806, 0.007, 8, 64);
  const inner_outer_seam = new THREE.Mesh(inner_outer_seamGeom, darkMetalMat);
  inner_outer_seam.position.z = 0.132;
  root.add(inner_outer_seam);

  const glassGeom = new THREE.CylinderGeometry(0.565, 0.565, 0.035, 64);
  const glass = new THREE.Mesh(glassGeom, glassMat);
  glass.rotation.x = Math.PI / 2;
  glass.position.z = 0.145;
  root.add(glass);

  const rubber_gasketGeom = new THREE.TorusGeometry(0.595, 0.045, 16, 64);
  const rubber_gasket = new THREE.Mesh(rubber_gasketGeom, rubberMat);
  rubber_gasket.position.z = 0.158;
  root.add(rubber_gasket);

  const inner_bezelGeom = new THREE.TorusGeometry(0.65, 0.027, 16, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, polishedMat);
  inner_bezel.position.z = 0.17;
  root.add(inner_bezel);

  const inner_bezel_shadowGeom = new THREE.TorusGeometry(0.681, 0.009, 8, 64);
  const inner_bezel_shadow = new THREE.Mesh(inner_bezel_shadowGeom, darkMetalMat);
  inner_bezel_shadow.position.z = 0.166;
  root.add(inner_bezel_shadow);

  const glass_reflectionGeom = new THREE.PlaneGeometry(0.13, 0.72);
  const glass_reflection = new THREE.Mesh(glass_reflectionGeom, reflectionMat);
  glass_reflection.position.set(0.18, 0.02, 0.169);
  glass_reflection.rotation.z = -0.18;
  root.add(glass_reflection);

  const screwAngles = [
    Math.PI * 0.75,
    Math.PI * 0.25,
    -Math.PI * 0.25,
    -Math.PI * 0.75,
  ];
  const screwRadius = 0.72;
  const screwDummy = new THREE.Object3D();

  const screw_washersGeom = new THREE.CylinderGeometry(0.073, 0.073, 0.025, 24);
  const screw_washers = new THREE.InstancedMesh(screw_washersGeom, brushedMat, 4);
  for (let i = 0; i < screwAngles.length; i++) {
    const angle = screwAngles[i];
    screwDummy.position.set(
      Math.cos(angle) * screwRadius,
      Math.sin(angle) * screwRadius,
      0.158
    );
    screwDummy.rotation.set(Math.PI / 2, 0, 0);
    screwDummy.scale.set(1, 1, 1);
    screwDummy.updateMatrix();
    screw_washers.setMatrixAt(i, screwDummy.matrix);
  }
  screw_washers.instanceMatrix.needsUpdate = true;
  root.add(screw_washers);

  const mounting_screwsGeom = new THREE.CylinderGeometry(0.058, 0.058, 0.043, 24);
  const mounting_screws = new THREE.InstancedMesh(mounting_screwsGeom, polishedMat, 4);
  for (let i = 0; i < screwAngles.length; i++) {
    const angle = screwAngles[i];
    screwDummy.position.set(
      Math.cos(angle) * screwRadius,
      Math.sin(angle) * screwRadius,
      0.181
    );
    screwDummy.rotation.set(Math.PI / 2, 0, 0);
    screwDummy.scale.set(1, 1, 1);
    screwDummy.updateMatrix();
    mounting_screws.setMatrixAt(i, screwDummy.matrix);
  }
  mounting_screws.instanceMatrix.needsUpdate = true;
  root.add(mounting_screws);

  const screw_slotsGeom = new THREE.BoxGeometry(0.052, 0.011, 0.009);
  const screw_slots = new THREE.InstancedMesh(screw_slotsGeom, darkMetalMat, 8);
  let slotIndex = 0;
  for (let i = 0; i < screwAngles.length; i++) {
    const angle = screwAngles[i];
    const x = Math.cos(angle) * screwRadius;
    const y = Math.sin(angle) * screwRadius;
    for (let j = 0; j < 2; j++) {
      screwDummy.position.set(x, y, 0.207);
      screwDummy.rotation.set(0, 0, j * Math.PI / 2);
      screwDummy.scale.set(1, 1, 1);
      screwDummy.updateMatrix();
      screw_slots.setMatrixAt(slotIndex++, screwDummy.matrix);
    }
  }
  screw_slots.instanceMatrix.needsUpdate = true;
  root.add(screw_slots);

  const hinge_mountGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.055, 8);
  const hinge_mount = new THREE.Mesh(hinge_mountGeom, brushedMat);
  hinge_mount.rotation.x = Math.PI / 2;
  hinge_mount.position.set(0.82, 0.01, 0.17);
  root.add(hinge_mount);

  const hinge_barrelGeom = new THREE.CylinderGeometry(0.064, 0.064, 0.34, 24);
  const hinge_barrel = new THREE.Mesh(hinge_barrelGeom, polishedMat);
  hinge_barrel.position.set(0.89, -0.035, 0.225);
  root.add(hinge_barrel);

  const hinge_top_capGeom = new THREE.CylinderGeometry(0.071, 0.071, 0.035, 24);
  const hinge_top_cap = new THREE.Mesh(hinge_top_capGeom, brushedMat);
  hinge_top_cap.position.set(0.89, 0.145, 0.225);
  root.add(hinge_top_cap);

  const hinge_bottom_capGeom = new THREE.CylinderGeometry(0.071, 0.071, 0.035, 24);
  const hinge_bottom_cap = new THREE.Mesh(hinge_bottom_capGeom, brushedMat);
  hinge_bottom_cap.position.set(0.89, -0.215, 0.225);
  root.add(hinge_bottom_cap);

  const hinge_upper_collarGeom = new THREE.TorusGeometry(0.064, 0.008, 8, 24);
  const hinge_upper_collar = new THREE.Mesh(hinge_upper_collarGeom, darkMetalMat);
  hinge_upper_collar.rotation.x = Math.PI / 2;
  hinge_upper_collar.position.set(0.89, 0.105, 0.225);
  root.add(hinge_upper_collar);

  const hinge_lower_collarGeom = new THREE.TorusGeometry(0.064, 0.008, 8, 24);
  const hinge_lower_collar = new THREE.Mesh(hinge_lower_collarGeom, darkMetalMat);
  hinge_lower_collar.rotation.x = Math.PI / 2;
  hinge_lower_collar.position.set(0.89, -0.175, 0.225);
  root.add(hinge_lower_collar);

  const hinge_pinGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.025, 16);
  const hinge_pin = new THREE.Mesh(hinge_pinGeom, polishedMat);
  hinge_pin.rotation.x = Math.PI / 2;
  hinge_pin.position.set(0.89, -0.245, 0.225);
  root.add(hinge_pin);

  const hinge_screwGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.026, 20);
  const hinge_screw = new THREE.Mesh(hinge_screwGeom, polishedMat);
  hinge_screw.rotation.x = Math.PI / 2;
  hinge_screw.position.set(0.82, 0.01, 0.211);
  root.add(hinge_screw);

  const hinge_screw_slotGeom = new THREE.BoxGeometry(0.043, 0.008, 0.007);
  const hinge_screw_slot = new THREE.Mesh(hinge_screw_slotGeom, darkMetalMat);
  hinge_screw_slot.position.set(0.82, 0.01, 0.227);
  hinge_screw_slot.rotation.z = 0.35;
  root.add(hinge_screw_slot);

  const latch_mountGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.05, 20);
  const latch_mount = new THREE.Mesh(latch_mountGeom, brushedMat);
  latch_mount.rotation.x = Math.PI / 2;
  latch_mount.position.set(-0.66, -0.66, 0.15);
  root.add(latch_mount);

  const latchPath = [
    new THREE.Vector3(-0.69, -0.69, 0.18),
    new THREE.Vector3(-0.77, -0.77, 0.205),
    new THREE.Vector3(-0.82, -0.86, 0.215),
    new THREE.Vector3(-0.79, -0.94, 0.215),
    new THREE.Vector3(-0.72, -0.96, 0.21),
    new THREE.Vector3(-0.68, -0.90, 0.205),
  ];
  const latch_handleGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(latchPath),
    32,
    0.043,
    12,
    false
  );
  const latch_handle = new THREE.Mesh(latch_handleGeom, polishedMat);
  root.add(latch_handle);

  const latch_end_capGeom = new THREE.SphereGeometry(0.047, 16, 10);
  const latch_end_cap = new THREE.Mesh(latch_end_capGeom, brushedMat);
  latch_end_cap.position.set(-0.68, -0.90, 0.205);
  root.add(latch_end_cap);

  fitToUnitCube(root);
  return root;

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
}