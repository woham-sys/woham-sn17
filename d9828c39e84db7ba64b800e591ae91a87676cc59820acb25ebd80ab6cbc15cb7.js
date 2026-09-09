function __sn17_user(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0759ad, metalness: 0.25, roughness: 0.3 });
  const darkBlueMat = new THREE.MeshStandardMaterial({ color: 0x06458d, metalness: 0.2, roughness: 0.4 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.0, roughness: 0.8 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.0, roughness: 0.9 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, metalness: 0.45, roughness: 0.25 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, metalness: 0.5, roughness: 0.18 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x9fb2ba,
    transparent: true,
    opacity: 0.55,
    metalness: 0.0,
    roughness: 0.15,
    side: THREE.DoubleSide
  });
  const darkGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x33404d,
    transparent: true,
    opacity: 0.65,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide
  });
  const headlightMat = new THREE.MeshStandardMaterial({ color: 0xeef6ff, metalness: 0.0, roughness: 0.25, emissive: 0xffffff, emissiveIntensity: 0.25 });
  const tailLightMat = new THREE.MeshStandardMaterial({ color: 0xc91515, metalness: 0.0, roughness: 0.35, emissive: 0x8c0000, emissiveIntensity: 0.25 });
  const amberMat = new THREE.MeshStandardMaterial({ color: 0xffa52b, metalness: 0.0, roughness: 0.35, emissive: 0x8a3a00, emissiveIntensity: 0.15 });
  const seamMat = new THREE.LineBasicMaterial({ color: 0x062b5d });
  const lineMat = new THREE.LineBasicMaterial({ color: 0x111111 });

  const length = 4.8;
  const width = 1.72;
  const halfW = width / 2;
  const wheelR = 0.42;
  const wheelY = 0.43;
  const frontAxleZ = 1.45;
  const rearAxleZ = -1.45;

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    dummy.scale.set(sx === undefined ? 1 : sx, sy === undefined ? 1 : sy, sz === undefined ? 1 : sz);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  function addBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addSideShape(name, side, points, mat, xOffset) {
    const shape = new THREE.Shape();
    shape.moveTo(-side * points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) shape.lineTo(-side * points[i][0], points[i][1]);
    shape.closePath();
    const geom = new THREE.ShapeGeometry(shape);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.name = name;
    mesh.rotation.y = side * Math.PI / 2;
    mesh.position.x = side * xOffset;
    root.add(mesh);
    return mesh;
  }

  function addSideLine(name, side, points, mat, xOffset) {
    const positions = [];
    for (let i = 0; i < points.length - 1; i++) {
      positions.push(side * xOffset, points[i][1], points[i][0]);
      positions.push(side * xOffset, points[i + 1][1], points[i + 1][0]);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const lines = new THREE.LineSegments(geom, mat);
    lines.name = name;
    root.add(lines);
    return lines;
  }

  const lower_body = addBox("lower_body", width, 0.48, length * 0.90, bodyMat, 0, 0.62, 0.0);
  const upper_body = addBox("upper_body", width * 0.96, 0.72, length * 0.82, bodyMat, 0, 1.18, -0.05);
  const roof_panel = addBox("roof_panel", width * 0.92, 0.08, length * 0.78, bodyMat, 0, 1.58, -0.08);
  const hood = addBox("hood", width * 0.86, 0.12, 0.72, bodyMat, 0, 0.91, 1.82);
  hood.rotation.x = -0.08;
  const front_nose = addBox("front_nose", width * 0.88, 0.34, 0.24, bodyMat, 0, 0.72, 2.22);
  const rear_panel = addBox("rear_panel", width * 0.92, 0.92, 0.12, bodyMat, 0, 1.05, -2.18);

  const front_bumper = addBox("front_bumper", width * 0.96, 0.20, 0.18, blackMat, 0, 0.43, 2.34);
  const rear_bumper = addBox("rear_bumper", width * 0.96, 0.20, 0.18, blackMat, 0, 0.43, -2.30);
  const front_lower_valance = addBox("front_lower_valance", width * 0.78, 0.16, 0.12, darkBlueMat, 0, 0.34, 2.25);
  const rear_lower_valance = addBox("rear_lower_valance", width * 0.78, 0.16, 0.12, darkBlueMat, 0, 0.34, -2.22);

  const left_side_skirt = addBox("left_side_skirt", 0.055, 0.12, 3.55, darkBlueMat, -halfW - 0.015, 0.38, -0.05);
  const right_side_skirt = addBox("right_side_skirt", 0.055, 0.12, 3.55, darkBlueMat, halfW + 0.015, 0.38, -0.05);

  const wheel_positions = [
    [-halfW - 0.03, wheelY, frontAxleZ],
    [halfW + 0.03, wheelY, frontAxleZ],
    [-halfW - 0.03, wheelY, rearAxleZ],
    [halfW + 0.03, wheelY, rearAxleZ]
  ];

  const tires = new THREE.InstancedMesh(new THREE.TorusGeometry(0.31, 0.11, 16, 36), tireMat);
  tires.name = "tires";
  const tire_treads = new THREE.InstancedMesh(new THREE.BoxGeometry(0.24, 0.045, 0.075), tireMat);
  tire_treads.name = "tire_treads";
  const wheel_rims = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.245, 0.245, 0.10, 32), silverMat);
  wheel_rims.name = "wheel_rims";
  const wheel_hubs = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.075, 0.075, 0.125, 24), chromeMat);
  wheel_hubs.name = "wheel_hubs";
  const wheel_arches = new THREE.InstancedMesh(new THREE.TorusGeometry(wheelR + 0.045, 0.035, 8, 36, Math.PI), bodyMat);
  wheel_arches.name = "wheel_arches";

  for (let i = 0; i < wheel_positions.length; i++) {
    const p = wheel_positions[i];
    setInstance(tires, i, p[0], p[1], p[2], 0, 0, 0);
    setInstance(wheel_rims, i, p[0], p[1], p[2], 0, 0, Math.PI / 2);
    setInstance(wheel_hubs, i, p[0], p[1], p[2], 0, 0, Math.PI / 2);
    setInstance(wheel_arches, i, p[0], p[1], p[2], 0, Math.PI / 2, 0);
    for (let j = 0; j < 14; j++) {
      const a = j / 14 * Math.PI * 2;
      setInstance(
        tire_treads,
        i * 14 + j,
        p[0],
        p[1] + Math.cos(a) * 0.405,
        p[2] + Math.sin(a) * 0.405,
        a, 0, 0
      );
    }
  }
  tires.instanceMatrix.needsUpdate = true;
  tire_treads.instanceMatrix.needsUpdate = true;
  wheel_rims.instanceMatrix.needsUpdate = true;
  wheel_hubs.instanceMatrix.needsUpdate = true;
  wheel_arches.instanceMatrix.needsUpdate = true;
  root.add(tire_treads, tires, wheel_rims, wheel_hubs, wheel_arches);

  const rim_spokes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.075, 0.18, 0.045), silverMat);
  rim_spokes.name = "rim_spokes";
  for (let i = 0; i < wheel_positions.length; i++) {
    const p = wheel_positions[i];
    const side = p[0] < 0 ? -1 : 1;
    for (let j = 0; j < 5; j++) {
      const a = j / 5 * Math.PI * 2;
      setInstance(
        rim_spokes,
        i * 5 + j,
        p[0] + side * 0.065,
        p[1] + Math.cos(a) * 0.105,
        p[2] + Math.sin(a) * 0.105,
        a, 0, 0
      );
    }
  }
  rim_spokes.instanceMatrix.needsUpdate = true;
  root.add(rim_spokes);

  const front_left_headlight = addBox("front_left_headlight", 0.34, 0.22, 0.055, headlightMat, -0.53, 0.78, 2.36);
  const front_right_headlight = addBox("front_right_headlight", 0.34, 0.22, 0.055, headlightMat, 0.53, 0.78, 2.36);
  const front_left_indicator = addBox("front_left_indicator", 0.09, 0.18, 0.06, amberMat, -0.78, 0.76, 2.34);
  const front_right_indicator = addBox("front_right_indicator", 0.09, 0.18, 0.06, amberMat, 0.78, 0.76, 2.34);
  const front_grille = addBox("front_grille", 0.56, 0.18, 0.055, blackMat, 0, 0.60, 2.39);
  const grille_slats = new THREE.InstancedMesh(new THREE.BoxGeometry(0.48, 0.018, 0.065), silverMat);
  grille_slats.name = "grille_slats";
  for (let i = 0; i < 4; i++) setInstance(grille_slats, i, 0, 0.55 + i * 0.035, 2.425, 0, 0, 0);
  grille_slats.instanceMatrix.needsUpdate = true;
  root.add(grille_slats);

  const rear_left_tail_light = addBox("rear_left_tail_light", 0.15, 0.34, 0.07, tailLightMat, -0.73, 0.92, -2.26);
  const rear_right_tail_light = addBox("rear_right_tail_light", 0.15, 0.34, 0.07, tailLightMat, 0.73, 0.92, -2.26);
  const rear_license_plate = addBox("rear_license_plate", 0.42, 0.16, 0.035, chromeMat, 0, 0.58, -2.31);

  const windshield_frame = addBox("windshield_frame", width * 0.82, 0.78, 0.045, blackMat, 0, 1.22, 1.72);
  windshield_frame.rotation.x = -0.42;
  const windshield = addBox("windshield", width * 0.72, 0.66, 0.025, glassMat, 0, 1.24, 1.74);
  windshield.rotation.x = -0.42;

  const rear_window_frame = addBox("rear_window_frame", width * 0.72, 0.56, 0.04, blackMat, 0, 1.27, -2.25);
  const rear_window = addBox("rear_window", width * 0.62, 0.46, 0.025, darkGlassMat, 0, 1.28, -2.28);

  const left_front_window_frame = addSideShape("left_front_window_frame", -1, [
    [0.78, 0.91], [1.58, 0.96], [1.34, 1.48], [0.82, 1.50]
  ], blackMat, halfW + 0.035);
  const right_front_window_frame = addSideShape("right_front_window_frame", 1, [
    [0.78, 0.91], [1.58, 0.96], [1.34, 1.48], [0.82, 1.50]
  ], blackMat, halfW + 0.035);
  const left_front_window = addSideShape("left_front_window", -1, [
    [0.86, 0.98], [1.48, 1.01], [1.27, 1.41], [0.88, 1.43]
  ], glassMat, halfW + 0.045);
  const right_front_window = addSideShape("right_front_window", 1, [
    [0.86, 0.98], [1.48, 1.01], [1.27, 1.41], [0.88, 1.43]
  ], glassMat, halfW + 0.045);

  const left_middle_window_frame = addSideShape("left_middle_window_frame", -1, [
    [-0.55, 0.91], [0.68, 0.91], [0.70, 1.50], [-0.55, 1.50]
  ], blackMat, halfW + 0.035);
  const right_middle_window_frame = addSideShape("right_middle_window_frame", 1, [
    [-0.55, 0.91], [0.68, 0.91], [0.70, 1.50], [-0.55, 1.50]
  ], blackMat, halfW + 0.035);
  const left_middle_window = addSideShape("left_middle_window", -1, [
    [-0.47, 0.98], [0.60, 0.98], [0.62, 1.43], [-0.47, 1.43]
  ], darkGlassMat, halfW + 0.045);
  const right_middle_window = addSideShape("right_middle_window", 1, [
    [-0.47, 0.98], [0.60, 0.98], [0.62, 1.43], [-0.47, 1.43]
  ], darkGlassMat, halfW + 0.045);

  const left_rear_window_frame = addSideShape("left_rear_window_frame", -1, [
    [-1.88, 0.91], [-0.62, 0.91], [-0.60, 1.50], [-1.82, 1.48]
  ], blackMat, halfW + 0.035);
  const right_rear_window_frame = addSideShape("right_rear_window_frame", 1, [
    [-1.88, 0.91], [-0.62, 0.91], [-0.60, 1.50], [-1.82, 1.48]
  ], blackMat, halfW + 0.035);
  const left_rear_window = addSideShape("left_rear_window", -1, [
    [-1.80, 0.98], [-0.70, 0.98], [-0.68, 1.43], [-1.75, 1.41]
  ], darkGlassMat, halfW + 0.045);
  const right_rear_window = addSideShape("right_rear_window", 1, [
    [-1.80, 0.98], [-0.70, 0.98], [-0.68, 1.43], [-1.75, 1.41]
  ], darkGlassMat, halfW + 0.045);

  const left_door_seams = addSideLine("left_door_seams", -1, [
    [0.72, 0.38], [0.72, 1.50],
    [-0.58, 0.38], [-0.58, 1.50],
    [-1.92, 0.38], [-1.92, 1.48],
    [0.72, 0.38], [1.05, 0.38]
  ], seamMat, halfW + 0.055);
  const right_door_seams = addSideLine("right_door_seams", 1, [
    [0.72, 0.38], [0.72, 1.50],
    [-0.58, 0.38], [-0.58, 1.50],
    [-1.92, 0.38], [-1.92, 1.48],
    [0.72, 0.38], [1.05, 0.38]
  ], seamMat, halfW + 0.055);

  const left_body_crease = addSideLine("left_body_crease", -1, [
    [1.02, 0.76], [-1.95, 0.76]
  ], seamMat, halfW + 0.06);
  const right_body_crease = addSideLine("right_body_crease", 1, [
    [1.02, 0.76], [-1.95, 0.76]
  ], seamMat, halfW + 0.06);

  const left_roof_gutter = addSideLine("left_roof_gutter", -1, [
    [-2.05, 1.52], [1.45, 1.52]
  ], seamMat, halfW + 0.055);
  const right_roof_gutter = addSideLine("right_roof_gutter", 1, [
    [-2.05, 1.52], [1.45, 1.52]
  ], seamMat, halfW + 0.055);

  const handleGeom = new THREE.BoxGeometry(0.055, 0.055, 0.20);
  const door_handles = new THREE.InstancedMesh(handleGeom, blackMat, 4);
  door_handles.name = "door_handles";
  setInstance(door_handles, 0, -halfW - 0.085, 0.98, 0.45, 0, 0, 0);
  setInstance(door_handles, 1, halfW + 0.085, 0.98, 0.45, 0, 0, 0);
  setInstance(door_handles, 2, -halfW - 0.085, 0.98, -0.35, 0, 0, 0);
  setInstance(door_handles, 3, halfW + 0.085, 0.98, -0.35, 0, 0, 0);
  door_handles.instanceMatrix.needsUpdate = true;
  root.add(door_handles);

  const mirror_stem_geom = new THREE.BoxGeometry(0.18, 0.04, 0.04);
  const mirror_stems = new THREE.InstancedMesh(mirror_stem_geom, blackMat, 2);
  mirror_stems.name = "mirror_stems";
  setInstance(mirror_stems, 0, -halfW - 0.08, 1.08, 1.18, 0, 0, 0);
  setInstance(mirror_stems, 1, halfW + 0.08, 1.08, 1.18, 0, 0, 0);
  mirror_stems.instanceMatrix.needsUpdate = true;
  root.add(mirror_stems);

  const mirror_geom = new THREE.SphereGeometry(1, 20, 12);
  const side_mirrors = new THREE.InstancedMesh(mirror_geom, blackMat, 2);
  side_mirrors.name = "side_mirrors";
  setInstance(side_mirrors, 0, -halfW - 0.18, 1.10, 1.18, 0, 0, 0, 0.13, 0.10, 0.16);
  setInstance(side_mirrors, 1, halfW + 0.18, 1.10, 1.18, 0, 0, 0, 0.13, 0.10, 0.16);
  side_mirrors.instanceMatrix.needsUpdate = true;
  root.add(side_mirrors);

  const mirror_glass = new THREE.InstancedMesh(new THREE.CircleGeometry(1, 20), glassMat, 2);
  mirror_glass.name = "mirror_glass";
  setInstance(mirror_glass, 0, -halfW - 0.315, 1.10, 1.18, 0, -Math.PI / 2, 0, 0.085, 0.065, 1);
  setInstance(mirror_glass, 1, halfW + 0.315, 1.10, 1.18, 0, Math.PI / 2, 0, 0.085, 0.065, 1);
  mirror_glass.instanceMatrix.needsUpdate = true;
  root.add(mirror_glass);

  const left_wiper = addBox("left_wiper", 0.025, 0.025, 0.36, blackMat, -0.28, 1.02, 1.88);
  left_wiper.rotation.x = -0.42;
  left_wiper.rotation.z = -0.22;
  const right_wiper = addBox("right_wiper", 0.025, 0.025, 0.36, blackMat, 0.28, 1.02, 1.88);
  right_wiper.rotation.x = -0.42;
  right_wiper.rotation.z = 0.22;

  const left_side_marker = addBox("left_side_marker", 0.035, 0.055, 0.16, headlightMat, -halfW - 0.075, 0.88, 1.72);
  const right_side_marker = addBox("right_side_marker", 0.035, 0.055, 0.16, headlightMat, halfW + 0.075, 0.88, 1.72);

  const exhaust_pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.34, 16), blackMat);
  exhaust_pipe.name = "exhaust_pipe";
  exhaust_pipe.rotation.x = Math.PI / 2;
  exhaust_pipe.position.set(0.55, 0.25, -2.34);
  root.add(exhaust_pipe);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    object.updateMatrixWorld(true);
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
