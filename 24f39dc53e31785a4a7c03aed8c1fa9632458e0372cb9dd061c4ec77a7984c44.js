function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "electric_panini_press";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const lid_assembly = new THREE.Group();
  lid_assembly.name = "lid_assembly";
  root.add(lid_assembly);

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  root.add(handle_assembly);

  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    roughness: 0.8,
  });
  const dark_recessMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    roughness: 0.85,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b5,
    roughness: 0.35,
    metalness: 0.55,
  });
  const metal_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0cd,
    roughness: 0.25,
    metalness: 0.5,
  });

  function roundedRectShape(width, height, radius) {
    const half_w = width / 2;
    const half_h = height / 2;
    const r = Math.min(radius, half_w, half_h);
    const shape = new THREE.Shape();
    shape.moveTo(-half_w + r, -half_h);
    shape.lineTo(half_w - r, -half_h);
    shape.quadraticCurveTo(half_w, -half_h, half_w, -half_h + r);
    shape.lineTo(half_w, half_h - r);
    shape.quadraticCurveTo(half_w, half_h, half_w - r, half_h);
    shape.lineTo(-half_w + r, half_h);
    shape.quadraticCurveTo(-half_w, half_h, -half_w, half_h - r);
    shape.lineTo(-half_w, -half_h + r);
    shape.quadraticCurveTo(-half_w, -half_h, -half_w + r, -half_h);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, depth, radius, bevel) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        curveSegments: 12,
        steps: 1,
        depth,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const lower_baseGeom = roundedExtrudeGeometry(2.62, 1.64, 0.22, 0.16, 0.035);
  const lower_base = new THREE.Mesh(lower_baseGeom, black_plasticMat);
  lower_base.name = "lower_base";
  lower_base.rotation.x = -Math.PI / 2;
  lower_base.position.y = 0.16;
  base_assembly.add(lower_base);

  const inner_trayGeom = roundedExtrudeGeometry(2.34, 1.38, 0.10, 0.10, 0.02);
  const inner_tray = new THREE.Mesh(inner_trayGeom, dark_recessMat);
  inner_tray.name = "inner_tray";
  inner_tray.rotation.x = -Math.PI / 2;
  inner_tray.position.y = 0.31;
  base_assembly.add(inner_tray);

  const front_lower_railGeom = roundedExtrudeGeometry(2.48, 0.25, 0.16, 0.055, 0.02);
  const front_lower_rail = new THREE.Mesh(front_lower_railGeom, black_plasticMat);
  front_lower_rail.name = "front_lower_rail";
  front_lower_rail.position.set(0, 0.35, 0.74);
  base_assembly.add(front_lower_rail);

  const rear_lower_railGeom = roundedExtrudeGeometry(2.48, 0.22, 0.16, 0.055, 0.02);
  const rear_lower_rail = new THREE.Mesh(rear_lower_railGeom, black_plasticMat);
  rear_lower_rail.name = "rear_lower_rail";
  rear_lower_rail.position.set(0, 0.34, -0.74);
  base_assembly.add(rear_lower_rail);

  const side_supportGeom = roundedExtrudeGeometry(0.24, 0.34, 1.48, 0.06, 0.02);

  const left_side_support = new THREE.Mesh(side_supportGeom, black_plasticMat);
  left_side_support.name = "left_side_support";
  left_side_support.position.set(-1.19, 0.39, 0);
  base_assembly.add(left_side_support);

  const right_side_support = new THREE.Mesh(side_supportGeom, black_plasticMat);
  right_side_support.name = "right_side_support";
  right_side_support.position.set(1.19, 0.39, 0);
  base_assembly.add(right_side_support);

  const front_seamGeom = new THREE.BoxGeometry(2.30, 0.025, 0.018);
  const front_seam = new THREE.Mesh(front_seamGeom, dark_recessMat);
  front_seam.name = "front_seam";
  front_seam.position.set(0, 0.255, 0.858);
  base_assembly.add(front_seam);

  const footGeom = new THREE.CylinderGeometry(0.105, 0.115, 0.10, 20);
  const feet = new THREE.InstancedMesh(footGeom, black_plasticMat, 4);
  feet.name = "feet";
  const foot_dummy = new THREE.Object3D();
  const foot_positions = [
    [-1.07, 0.015, 0.62],
    [1.07, 0.015, 0.62],
    [-1.07, 0.015, -0.62],
    [1.07, 0.015, -0.62],
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    const p = foot_positions[i];
    foot_dummy.position.set(p[0], p[1], p[2]);
    foot_dummy.updateMatrix();
    feet.setMatrixAt(i, foot_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  base_assembly.add(feet);

  const hinge_barrelGeom = new THREE.CylinderGeometry(0.075, 0.075, 2.28, 20);
  const hinge_barrel = new THREE.Mesh(hinge_barrelGeom, black_plasticMat);
  hinge_barrel.name = "hinge_barrel";
  hinge_barrel.rotation.z = Math.PI / 2;
  hinge_barrel.position.set(0, 0.50, -0.75);
  base_assembly.add(hinge_barrel);

  const hinge_end_capGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.045, 20);
  const hinge_end_caps = new THREE.InstancedMesh(hinge_end_capGeom, black_plasticMat, 2);
  hinge_end_caps.name = "hinge_end_caps";
  const hinge_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    hinge_dummy.position.set(i === 0 ? -1.16 : 1.16, 0.50, -0.75);
    hinge_dummy.rotation.set(0, 0, Math.PI / 2);
    hinge_dummy.updateMatrix();
    hinge_end_caps.setMatrixAt(i, hinge_dummy.matrix);
  }
  hinge_end_caps.instanceMatrix.needsUpdate = true;
  base_assembly.add(hinge_end_caps);

  const upper_coverGeom = roundedExtrudeGeometry(2.62, 1.60, 0.18, 0.16, 0.035);
  const upper_cover = new THREE.Mesh(upper_coverGeom, black_plasticMat);
  upper_cover.name = "upper_cover";
  upper_cover.rotation.x = -Math.PI / 2;
  upper_cover.position.y = 0.64;
  lid_assembly.add(upper_cover);

  const cooking_plateGeom = roundedExtrudeGeometry(2.48, 1.46, 0.055, 0.12, 0.022);
  const cooking_plate = new THREE.Mesh(cooking_plateGeom, brushed_metalMat);
  cooking_plate.name = "cooking_plate";
  cooking_plate.rotation.x = -Math.PI / 2;
  cooking_plate.position.set(0, 0.765, 0.015);
  lid_assembly.add(cooking_plate);

  const front_metal_lipGeom = roundedExtrudeGeometry(2.42, 0.065, 0.055, 0.025, 0.012);
  const front_metal_lip = new THREE.Mesh(front_metal_lipGeom, metal_edgeMat);
  front_metal_lip.name = "front_metal_lip";
  front_metal_lip.position.set(0, 0.735, 0.765);
  lid_assembly.add(front_metal_lip);

  const rear_black_lipGeom = roundedExtrudeGeometry(2.50, 0.12, 0.10, 0.055, 0.018);
  const rear_black_lip = new THREE.Mesh(rear_black_lipGeom, black_plasticMat);
  rear_black_lip.name = "rear_black_lip";
  rear_black_lip.position.set(0, 0.77, -0.77);
  lid_assembly.add(rear_black_lip);

  const side_lid_railGeom = roundedExtrudeGeometry(0.10, 0.10, 1.46, 0.04, 0.015);

  const left_lid_rail = new THREE.Mesh(side_lid_railGeom, black_plasticMat);
  left_lid_rail.name = "left_lid_rail";
  left_lid_rail.position.set(-1.27, 0.77, 0.01);
  lid_assembly.add(left_lid_rail);

  const right_lid_rail = new THREE.Mesh(side_lid_railGeom, black_plasticMat);
  right_lid_rail.name = "right_lid_rail";
  right_lid_rail.position.set(1.27, 0.77, 0.01);
  lid_assembly.add(right_lid_rail);

  const handle_socketGeom = roundedExtrudeGeometry(0.34, 0.25, 0.38, 0.08, 0.025);
  const handle_socket = new THREE.Mesh(handle_socketGeom, black_plasticMat);
  handle_socket.name = "handle_socket";
  handle_socket.position.set(1.25, 0.49, -0.25);
  handle_assembly.add(handle_socket);

  const handle_bodyGeom = roundedExtrudeGeometry(1.30, 0.34, 0.20, 0.16, 0.03);
  const handle_body = new THREE.Mesh(handle_bodyGeom, black_plasticMat);
  handle_body.name = "handle_body";
  handle_body.position.set(1.82, 0.49, -0.25);
  handle_assembly.add(handle_body);

  const handle_top_ridgeGeom = roundedExtrudeGeometry(1.02, 0.055, 0.025, 0.027, 0.008);
  const handle_top_ridge = new THREE.Mesh(handle_top_ridgeGeom, black_plasticMat);
  handle_top_ridge.name = "handle_top_ridge";
  handle_top_ridge.position.set(1.78, 0.625, -0.25);
  handle_assembly.add(handle_top_ridge);

  const handle_holeGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.014, 24);
  const handle_hole = new THREE.Mesh(handle_holeGeom, dark_recessMat);
  handle_hole.name = "handle_hole";
  handle_hole.position.set(2.31, 0.648, -0.25);
  handle_assembly.add(handle_hole);

  const handle_hole_rimGeom = new THREE.TorusGeometry(0.073, 0.012, 8, 24);
  const handle_hole_rim = new THREE.Mesh(handle_hole_rimGeom, black_plasticMat);
  handle_hole_rim.name = "handle_hole_rim";
  handle_hole_rim.rotation.x = Math.PI / 2;
  handle_hole_rim.position.set(2.31, 0.656, -0.25);
  handle_assembly.add(handle_hole_rim);

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
