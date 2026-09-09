function __sn17_user(THREE) {
  const root = new THREE.Group();

  const jar_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffd21a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0xffcf12,
    metalness: 0.0,
    roughness: 0.27,
  });
  const lid_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffdf35,
    metalness: 0.0,
    roughness: 0.25,
  });
  const amber_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xd99a16,
    metalness: 0.0,
    roughness: 0.15,
    transparent: true,
    opacity: 0.55,
  });
  const bear_brownMat = new THREE.MeshStandardMaterial({
    color: 0x8b573d,
    metalness: 0.0,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const bear_outlineMat = new THREE.MeshStandardMaterial({
    color: 0x4b2b21,
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const bear_creamMat = new THREE.MeshStandardMaterial({
    color: 0xfff1c7,
    metalness: 0.0,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const bear_blackMat = new THREE.MeshStandardMaterial({
    color: 0x241713,
    metalness: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const label_inkMat = new THREE.MeshStandardMaterial({
    color: 0x3a2a1d,
    metalness: 0.0,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });

  const jar_bodyProfile = [
    new THREE.Vector2(0.00, -0.43),
    new THREE.Vector2(0.48, -0.43),
    new THREE.Vector2(0.54, -0.415),
    new THREE.Vector2(0.575, -0.37),
    new THREE.Vector2(0.585, -0.29),
    new THREE.Vector2(0.585, 0.20),
    new THREE.Vector2(0.575, 0.255),
    new THREE.Vector2(0.54, 0.295),
    new THREE.Vector2(0.00, 0.295),
  ];
  const jar_bodyGeom = new THREE.LatheGeometry(jar_bodyProfile, 96);
  const jar_body = new THREE.Mesh(jar_bodyGeom, jar_bodyMat);
  root.add(jar_body);

  const bottom_glass_rimGeom = new THREE.TorusGeometry(0.535, 0.043, 14, 96);
  const bottom_glass_rim = new THREE.Mesh(bottom_glass_rimGeom, amber_glassMat);
  bottom_glass_rim.rotation.x = Math.PI / 2;
  bottom_glass_rim.position.y = -0.392;
  root.add(bottom_glass_rim);

  const shoulder_glass_bandGeom = new THREE.CylinderGeometry(0.585, 0.57, 0.09, 96, 1, true);
  const shoulder_glass_band = new THREE.Mesh(shoulder_glass_bandGeom, amber_glassMat);
  shoulder_glass_band.position.y = 0.255;
  root.add(shoulder_glass_band);

  const upper_glass_rimGeom = new THREE.TorusGeometry(0.548, 0.038, 14, 96);
  const upper_glass_rim = new THREE.Mesh(upper_glass_rimGeom, amber_glassMat);
  upper_glass_rim.rotation.x = Math.PI / 2;
  upper_glass_rim.position.y = 0.292;
  root.add(upper_glass_rim);

  const lower_label_edgeGeom = new THREE.TorusGeometry(0.566, 0.012, 8, 96);
  const lower_label_edge = new THREE.Mesh(lower_label_edgeGeom, jar_bodyMat);
  lower_label_edge.rotation.x = Math.PI / 2;
  lower_label_edge.position.y = -0.354;
  root.add(lower_label_edge);

  const lidProfile = [
    new THREE.Vector2(0.00, 0.285),
    new THREE.Vector2(0.52, 0.285),
    new THREE.Vector2(0.585, 0.305),
    new THREE.Vector2(0.615, 0.355),
    new THREE.Vector2(0.615, 0.535),
    new THREE.Vector2(0.595, 0.585),
    new THREE.Vector2(0.535, 0.625),
    new THREE.Vector2(0.455, 0.642),
    new THREE.Vector2(0.00, 0.642),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 96);
  const lid = new THREE.Mesh(lidGeom, lidMat);
  root.add(lid);

  const lid_lower_shadowGeom = new THREE.TorusGeometry(0.575, 0.014, 8, 96);
  const lid_lower_shadow = new THREE.Mesh(lid_lower_shadowGeom, amber_glassMat);
  lid_lower_shadow.rotation.x = Math.PI / 2;
  lid_lower_shadow.position.y = 0.302;
  root.add(lid_lower_shadow);

  const lid_top_panelGeom = new THREE.CircleGeometry(0.455, 96);
  const lid_top_panel = new THREE.Mesh(lid_top_panelGeom, lid_highlightMat);
  lid_top_panel.rotation.x = -Math.PI / 2;
  lid_top_panel.position.y = 0.644;
  root.add(lid_top_panel);

  const lid_top_ringGeom = new THREE.TorusGeometry(0.47, 0.018, 10, 96);
  const lid_top_ring = new THREE.Mesh(lid_top_ringGeom, lid_highlightMat);
  lid_top_ring.rotation.x = Math.PI / 2;
  lid_top_ring.position.y = 0.646;
  root.add(lid_top_ring);

  const decal_circleGeom = new THREE.CircleGeometry(1, 40);
  const decal_planeGeom = new THREE.PlaneGeometry(1, 1);

  function surfacePose(angle, y, radius) {
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle)).normalize();
    const position = new THREE.Vector3(normal.x * radius, y, normal.z * radius);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function addSurfaceCircle(parent, angle, y, localX, localY, sx, sy, material, extra) {
    const pose = surfacePose(angle, y, 0.589 + extra);
    const mesh = new THREE.Mesh(decal_circleGeom, material);
    mesh.quaternion.copy(pose.quaternion);
    mesh.scale.set(sx, sy, 1);
    mesh.position.copy(pose.position);
    mesh.position.add(new THREE.Vector3(localX, localY, 0).applyQuaternion(pose.quaternion));
    parent.add(mesh);
    return mesh;
  }

  function addSurfacePlane(parent, angle, y, localX, localY, width, height, rotation, material, extra) {
    const pose = surfacePose(angle, y, 0.589 + extra);
    const mesh = new THREE.Mesh(decal_planeGeom, material);
    mesh.quaternion.copy(pose.quaternion);
    mesh.rotateZ(rotation);
    mesh.scale.set(width, height, 1);
    mesh.position.copy(pose.position);
    mesh.position.add(new THREE.Vector3(localX, localY, 0).applyQuaternion(pose.quaternion));
    parent.add(mesh);
    return mesh;
  }

  function createBearDecal(angle, y, scale) {
    const bear = new THREE.Group();

    addSurfaceCircle(bear, angle, y, 0.000, -0.105, 0.088, 0.112, bear_outlineMat, 0.001);
    addSurfaceCircle(bear, angle, y, 0.000, -0.105, 0.078, 0.102, bear_brownMat, 0.002);

    addSurfaceCircle(bear, angle, y, -0.112, -0.105, 0.052, 0.086, bear_outlineMat, 0.001);
    addSurfaceCircle(bear, angle, y, -0.112, -0.105, 0.043, 0.076, bear_brownMat, 0.002);
    addSurfaceCircle(bear, angle, y, 0.112, -0.105, 0.052, 0.086, bear_outlineMat, 0.001);
    addSurfaceCircle(bear, angle, y, 0.112, -0.105, 0.043, 0.076, bear_brownMat, 0.002);

    addSurfaceCircle(bear, angle, y, -0.098, -0.195, 0.066, 0.052, bear_outlineMat, 0.001);
    addSurfaceCircle(bear, angle, y, -0.098, -0.195, 0.057, 0.043, bear_brownMat, 0.002);
    addSurfaceCircle(bear, angle, y, 0.098, -0.195, 0.066, 0.052, bear_outlineMat, 0.001);
    addSurfaceCircle(bear, angle, y, 0.098, -0.195, 0.057, 0.043, bear_brownMat, 0.002);

    addSurfaceCircle(bear, angle, y, -0.108, 0.075, 0.047, 0.047, bear_outlineMat, 0.001);
    addSurfaceCircle(bear, angle, y, -0.108, 0.075, 0.038, 0.038, bear_brownMat, 0.002);
    addSurfaceCircle(bear, angle, y, 0.108, 0.075, 0.047, 0.047, bear_outlineMat, 0.001);
    addSurfaceCircle(bear, angle, y, 0.108, 0.075, 0.038, 0.038, bear_brownMat, 0.002);

    addSurfaceCircle(bear, angle, y, 0.000, 0.045, 0.108, 0.105, bear_outlineMat, 0.003);
    addSurfaceCircle(bear, angle, y, 0.000, 0.045, 0.098, 0.095, bear_brownMat, 0.004);

    addSurfaceCircle(bear, angle, y, 0.000, 0.018, 0.058, 0.052, bear_creamMat, 0.006);
    addSurfaceCircle(bear, angle, y, 0.000, 0.062, 0.020, 0.015, bear_blackMat, 0.008);
    addSurfaceCircle(bear, angle, y, -0.041, 0.075, 0.011, 0.014, bear_blackMat, 0.008);
    addSurfaceCircle(bear, angle, y, 0.041, 0.075, 0.011, 0.014, bear_blackMat, 0.008);

    addSurfacePlane(bear, angle, y, -0.014, -0.006, 0.007, 0.030, -0.34, bear_blackMat, 0.009);
    addSurfacePlane(bear, angle, y, 0.014, -0.006, 0.007, 0.030, 0.34, bear_blackMat, 0.009);
    addSurfacePlane(bear, angle, y, 0.000, -0.022, 0.030, 0.006, 0.0, bear_blackMat, 0.009);

    bear.scale.setScalar(scale);
    return bear;
  }

  const left_bear_decal = createBearDecal(-0.39, -0.055, 1.0);
  root.add(left_bear_decal);

  const right_bear_decal = createBearDecal(0.39, -0.055, 1.0);
  root.add(right_bear_decal);

  const side_label_marks = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const markWidth = 0.038 + (i % 3) * 0.012;
    addSurfacePlane(
      side_label_marks,
      -1.08,
      0.115 - i * 0.043,
      0,
      0,
      markWidth,
      0.006,
      0,
      label_inkMat,
      0.004
    );
  }
  root.add(side_label_marks);

  const barcode_marks = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const barWidth = 0.003 + (i % 2) * 0.002;
    addSurfacePlane(
      barcode_marks,
      1.18,
      -0.025,
      -0.035 + i * 0.010,
      0,
      barWidth,
      0.145,
      0,
      label_inkMat,
      0.004
    );
  }
  root.add(barcode_marks);

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
    const scale = 0.98 / maxDim;
    root.scale.setScalar(scale);
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
