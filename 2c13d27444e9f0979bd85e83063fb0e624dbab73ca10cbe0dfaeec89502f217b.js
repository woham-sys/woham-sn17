function __sn17_user(THREE) {
  const root = new THREE.Group();

  const crown_group = new THREE.Group();
  const brim_group = new THREE.Group();
  const patch_group = new THREE.Group();
  root.add(crown_group, brim_group, patch_group);

  const camo_green_mat = new THREE.MeshStandardMaterial({ color: 0x4f6b3f, side: THREE.DoubleSide });
  const camo_dark_green_mat = new THREE.MeshStandardMaterial({ color: 0x29452e, side: THREE.DoubleSide });
  const camo_tan_mat = new THREE.MeshStandardMaterial({ color: 0xb7a17a, side: THREE.DoubleSide });
  const camo_brown_mat = new THREE.MeshStandardMaterial({ color: 0x5c4638, side: THREE.DoubleSide });
  const camo_black_mat = new THREE.MeshStandardMaterial({ color: 0x171b1a, side: THREE.DoubleSide });
  const fabric_mat = new THREE.MeshStandardMaterial({ color: 0x344238, side: THREE.DoubleSide });
  const seam_mat = new THREE.MeshStandardMaterial({ color: 0x202724, side: THREE.DoubleSide });
  const thread_mat = new THREE.MeshStandardMaterial({ color: 0xc5b690, side: THREE.DoubleSide });
  const patch_mat = new THREE.MeshStandardMaterial({ color: 0x252d35, side: THREE.DoubleSide });
  const eyelet_mat = new THREE.MeshStandardMaterial({ color: 0x111414, side: THREE.DoubleSide });
  const eyelet_hole_mat = new THREE.MeshStandardMaterial({ color: 0x020303, side: THREE.DoubleSide });

  function makeCrownGeometry() {
    const seg = 72;
    const rings = [
      [0.000, 0.000, 0.000, 0.000],
      [0.105, 0.000, 0.105, 0.000],
      [0.215, -0.006, 0.215, -0.006],
      [0.315, -0.025, 0.315, -0.025],
      [0.385, -0.055, 0.385, -0.055],
      [0.425, -0.085, 0.425, -0.085]
    ];
    const positions = [];
    const indices = [];
    for (let r = 0; r < rings.length; r++) {
      for (let i = 0; i <= seg; i++) {
        const t = i / seg * Math.PI * 2;
        const s = Math.sin(t);
        const c = Math.cos(t);
        const x = r === 0 ? 0 : rings[r][0] * c;
        const y = rings[r][1] + (rings[r][2] - rings[r][1]) * Math.abs(s);
        const z = r === 0 ? 0 : rings[r][3] * s;
        positions.push(x, y, z);
      }
    }
    for (let r = 0; r < rings.length - 1; r++) {
      for (let i = 0; i < seg; i++) {
        const a = r * (seg + 1) + i;
        const b = a + 1;
        const d = (r + 1) * (seg + 1) + i;
        const c = d + 1;
        indices.push(a, d, b, b, d, c);
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  function makeBrimGeometry() {
    const seg = 72;
    const rings = [
      [0.125, 0.000, 0.000, 0.000, -0.006],
      [0.245, 0.000, 0.000, 0.000, -0.010],
      [0.365, 0.000, 0.000, 0.000, -0.018],
      [0.485, 0.000, 0.000, 0.000, -0.035],
      [0.585, 0.000, 0.000, 0.000, -0.060]
    ];
    const positions = [];
    const indices = [];
    for (let r = 0; r < rings.length; r++) {
      for (let i = 0; i <= seg; i++) {
        const t = i / seg * Math.PI * 2;
        const s = Math.sin(t);
        const c = Math.cos(t);
        const front = Math.max(0, s);
        const x = rings[r][0] * c;
        const y = rings[r][4] - 0.055 * front * front;
        const z = rings[r][1] + rings[r][2] + rings[r][3] * s;
        positions.push(x, y, z);
      }
    }
    for (let r = 0; r < rings.length - 1; r++) {
      for (let i = 0; i < seg; i++) {
        const a = r * (seg + 1) + i;
        const b = a + 1;
        const d = (r + 1) * (seg + 1) + i;
        const c = d + 1;
        indices.push(a, d, b, b, d, c);
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  function makeBandGeometry() {
    const seg = 72;
    const positions = [];
    const indices = [];
    for (let i = 0; i <= seg; i++) {
      const t = i / seg * Math.PI * 2;
      const s = Math.sin(t);
      const c = Math.cos(t);
      const x = 0.428 * c;
      const y = -0.088 + 0.030 * Math.abs(s);
      const z = 0.428 * s;
      positions.push(x, y, z);
    }
    for (let i = 0; i < seg; i++) {
      const a = i;
      const b = i + 1;
      const c = seg + 1 + i;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  function makeTopButtonGeometry() {
    const seg = 32;
    const positions = [0, 0.018, 0];
    const indices = [];
    for (let i = 0; i <= seg; i++) {
      const t = i / seg * Math.PI * 2;
      positions.push(Math.cos(t) * 0.045, 0.012, Math.sin(t) * 0.045);
    }
    for (let i = 0; i < seg; i++) {
      indices.push(0, i + 2, i + 1);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  function makePatchGeometry() {
    const w = 0.235;
    const h = 0.082;
    const r = 0.012;
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    return new THREE.ShapeGeometry(shape);
  }

  function makeCamoBlobGeometry(phase) {
    const shape = new THREE.Shape();
    const count = 18;
    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2;
      const radius = 0.055 * (1 + 0.18 * Math.sin(i * 2.7 + phase) + 0.08 * Math.cos(i * 4.1 - phase));
      const x = Math.cos(a) * radius;
      const y = Math.sin(a) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function makeStitchGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.018, 0);
    shape.lineTo(0.018, 0);
    shape.lineTo(0.000, 0.006);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const crown_geom = makeCrownGeometry();
  const crown = new THREE.Mesh(crown_geom, camo_green_mat);
  crown_group.add(crown);

  const lower_band_geom = makeBandGeometry();
  const lower_band = new THREE.Mesh(lower_band_geom, camo_brown_mat);
  crown_group.add(lower_band);

  const top_button_geom = makeTopButtonGeometry();
  const top_button = new THREE.Mesh(top_button_geom, camo_dark_green_mat);
  crown_group.add(top_button);

  const brim_geom = makeBrimGeometry();
  const brim = new THREE.Mesh(brim_geom, camo_green_mat);
  brim_group.add(brim);

  const brim_edge_points = [];
  for (let i = 0; i < 72; i++) {
    const t = i / 72 * Math.PI * 2;
    const s = Math.sin(t);
    const c = Math.cos(t);
    const front = Math.max(0, s);
    brim_edge_points.push(new THREE.Vector3(0.585 * c, -0.060 - 0.055 * front * front, 0.585 * s));
  }
  const brim_edge_curve = new THREE.CatmullRomCurve3(brim_edge_points, true, "centripetal");
  const brim_edge_geom = new THREE.TubeGeometry(brim_edge_curve, 144, 0.008, 8, true);
  const brim_edge = new THREE.Mesh(brim_edge_geom, seam_mat);
  brim_group.add(brim_edge);

  const crown_seam_points = [];
  for (let i = 0; i <= 18; i++) {
    const t = i / 18 * Math.PI;
    const s = Math.sin(t);
    const c = Math.cos(t);
    crown_seam_points.push(new THREE.Vector3(0.431 * c, -0.084 + 0.030 * Math.abs(s), 0.431 * s));
  }
  const crown_seam_curve = new THREE.CatmullRomCurve3(crown_seam_points, false, "centripetal");
  const crown_seam_geom = new THREE.TubeGeometry(crown_seam_curve, 48, 0.004, 6, false);
  const crown_panel_seams = new THREE.InstancedMesh(crown_seam_geom, seam_mat, 6);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    dummy.position.set(0, 0, 0);
    dummy.rotation.set(0, i / 6 * Math.PI * 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    crown_panel_seams.setMatrixAt(i, dummy.matrix);
  }
  crown_panel_seams.instanceMatrix.needsUpdate = true;
  crown_group.add(crown_panel_seams);

  const stitch_geom = makeStitchGeometry();
  const crown_stitches = new THREE.InstancedMesh(stitch_geom, thread_mat, 84);
  let stitch_index = 0;
  for (let panel = 0; panel < 6; panel++) {
    const base_angle = panel / 6 * Math.PI * 2;
    for (let j = 0; j < 14; j++) {
      const t = 0.18 + j / 13 * (Math.PI - 0.36);
      const s = Math.sin(t);
      const c = Math.cos(t);
      const angle = base_angle + t;
      const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
      const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const basis = new THREE.Matrix4().makeBasis(tangent, up, normal);
      dummy.position.set(0.434 * c, -0.083 + 0.030 * Math.abs(s), 0.434 * s);
      dummy.quaternion.setFromRotationMatrix(basis);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      crown_stitches.setMatrixAt(stitch_index++, dummy.matrix);
    }
  }
  crown_stitches.instanceMatrix.needsUpdate = true;
  crown_group.add(crown_stitches);

  const brim_stitches = new THREE.InstancedMesh(stitch_geom, thread_mat, 64);
  let brim_stitch_index = 0;
  for (let row = 0; row < 4; row++) {
    const radius = 0.335 + row * 0.055;
    const y = -0.012 - row * 0.012;
    for (let j = 0; j < 16; j++) {
      const angle = j / 16 * Math.PI * 2 + row * 0.08;
      const normal = new THREE.Vector3(0, 1, 0);
      const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize();
      const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
      const basis = new THREE.Matrix4().makeBasis(tangent, radial, normal);
      dummy.position.set(radius * Math.cos(angle), y, radius * Math.sin(angle));
      dummy.quaternion.setFromRotationMatrix(basis);
      dummy.scale.set(0.85, 0.85, 0.85);
      dummy.updateMatrix();
      brim_stitches.setMatrixAt(brim_stitch_index++, dummy.matrix);
    }
  }
  brim_stitches.instanceMatrix.needsUpdate = true;
  brim_group.add(brim_stitches);

  const camo_blob_geom = makeCamoBlobGeometry(0.4);
  const crown_camo_patches = new THREE.InstancedMesh(camo_blob_geom, camo_tan_mat, 18);
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2 + 0.17;
    const radius = 0.155 + (i % 4) * 0.052;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = -0.020 - 0.035 * Math.abs(Math.sin(angle)) + 0.010 * (i % 3);
    const normal = new THREE.Vector3(Math.cos(angle), 0.25, Math.sin(angle)).normalize();
    const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize();
    const up = new THREE.Vector3().crossVectors(normal, tangent).normalize();
    const basis = new THREE.Matrix4().makeBasis(tangent, up, normal);
    dummy.position.set(x, y, z);
    dummy.quaternion.setFromRotationMatrix(basis);
    dummy.rotateZ((i % 5) * 0.31);
    dummy.scale.set(1.25 + (i % 3) * 0.25, 0.75 + (i % 2) * 0.25, 1);
    dummy.updateMatrix();
    crown_camo_patches.setMatrixAt(i, dummy.matrix);
  }
  crown_camo_patches.instanceMatrix.needsUpdate = true;
  crown_group.add(crown_camo_patches);

  const dark_crown_camo_patches = new THREE.InstancedMesh(camo_blob_geom, camo_black_mat, 14);
  for (let i = 0; i < 14; i++) {
    const angle = i / 14 * Math.PI * 2 + 0.42;
    const radius = 0.185 + (i % 3) * 0.060;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = -0.035 - 0.025 * Math.abs(Math.sin(angle));
    const normal = new THREE.Vector3(Math.cos(angle), 0.22, Math.sin(angle)).normalize();
    const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize();
    const up = new THREE.Vector3().crossVectors(normal, tangent).normalize();
    const basis = new THREE.Matrix4().makeBasis(tangent, up, normal);
    dummy.position.set(x, y, z);
    dummy.quaternion.setFromRotationMatrix(basis);
    dummy.rotateZ((i % 4) * -0.27);
    dummy.scale.set(0.95 + (i % 2) * 0.35, 0.55 + (i % 3) * 0.18, 1);
    dummy.updateMatrix();
    dark_crown_camo_patches.setMatrixAt(i, dummy.matrix);
  }
  dark_crown_camo_patches.instanceMatrix.needsUpdate = true;
  crown_group.add(dark_crown_camo_patches);

  const brown_crown_camo_patches = new THREE.InstancedMesh(camo_blob_geom, camo_brown_mat, 12);
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2 + 0.73;
    const radius = 0.205 + (i % 2) * 0.075;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = -0.045 - 0.018 * Math.abs(Math.sin(angle));
    const normal = new THREE.Vector3(Math.cos(angle), 0.20, Math.sin(angle)).normalize();
    const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize();
    const up = new THREE.Vector3().crossVectors(normal, tangent).normalize();
    const basis = new THREE.Matrix4().makeBasis(tangent, up, normal);
    dummy.position.set(x, y, z);
    dummy.quaternion.setFromRotationMatrix(basis);
    dummy.rotateZ((i % 3) * 0.45);
    dummy.scale.set(1.10, 0.65, 1);
    dummy.updateMatrix();
    brown_crown_camo_patches.setMatrixAt(i, dummy.matrix);
  }
  brown_crown_camo_patches.instanceMatrix.needsUpdate = true;
  crown_group.add(brown_crown_camo_patches);

  const brim_camo_patches = new THREE.InstancedMesh(camo_blob_geom, camo_tan_mat, 16);
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2 + 0.24;
    const radius = 0.285 + (i % 4) * 0.045;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const front = Math.max(0, Math.sin(angle));
    const y = -0.018 - 0.035 * front * front;
    const normal = new THREE.Vector3(0, 1, 0);
    const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize();
    const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    const basis = new THREE.Matrix4().makeBasis(tangent, radial, normal);
    dummy.position.set(x, y, z);
    dummy.quaternion.setFromRotationMatrix(basis);
    dummy.rotateZ((i % 5) * 0.22);
    dummy.scale.set(1.35 + (i % 3) * 0.20, 0.85 + (i % 2) * 0.25, 1);
    dummy.updateMatrix();
    brim_camo_patches.setMatrixAt(i, dummy.matrix);
  }
  brim_camo_patches.instanceMatrix.needsUpdate = true;
  brim_group.add(brim_camo_patches);

  const dark_brim_camo_patches = new THREE.InstancedMesh(camo_blob_geom, camo_black_mat, 12);
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2 + 0.58;
    const radius = 0.315 + (i % 3) * 0.055;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const front = Math.max(0, Math.sin(angle));
    const y = -0.025 - 0.032 * front * front;
    const normal = new THREE.Vector3(0, 1, 0);
    const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize();
    const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    const basis = new THREE.Matrix4().makeBasis(tangent, radial, normal);
    dummy.position.set(x, y, z);
    dummy.quaternion.setFromRotationMatrix(basis);
    dummy.rotateZ((i % 4) * -0.32);
    dummy.scale.set(0.95 + (i % 2) * 0.35, 0.55 + (i % 3) * 0.15, 1);
    dummy.updateMatrix();
    dark_brim_camo_patches.setMatrixAt(i, dummy.matrix);
  }
  dark_brim_camo_patches.instanceMatrix.needsUpdate = true;
  brim_group.add(dark_brim_camo_patches);

  const front_patch_geom = makePatchGeometry();
  const front_patch = new THREE.Mesh(front_patch_geom, patch_mat);
  front_patch.position.set(0, 0.018, 0.438);
  patch_group.add(front_patch);

  const patch_border_points = [
    new THREE.Vector3(-0.105, -0.036, 0.442),
    new THREE.Vector3(0.105, -0.036, 0.442),
    new THREE.Vector3(0.116, -0.024, 0.442),
    new THREE.Vector3(0.116, 0.036, 0.442),
    new THREE.Vector3(0.104, 0.048, 0.442),
    new THREE.Vector3(-0.104, 0.048, 0.442),
    new THREE.Vector3(-0.116, 0.036, 0.442),
    new THREE.Vector3(-0.116, -0.024, 0.442)
  ];
  const patch_border_curve = new THREE.CatmullRomCurve3(patch_border_points, true, "centripetal");
  const patch_border_geom = new THREE.TubeGeometry(patch_border_curve, 64, 0.003, 6, true);
  const patch_border = new THREE.Mesh(patch_border_geom, thread_mat);
  patch_group.add(patch_border);

  const patch_logo_curve_a = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.075, 0.000, 0.447),
    new THREE.Vector3(-0.055, 0.020, 0.447),
    new THREE.Vector3(-0.035, 0.004, 0.447),
    new THREE.Vector3(-0.010, 0.018, 0.447),
    new THREE.Vector3(0.015, 0.002, 0.447),
    new THREE.Vector3(0.045, 0.015, 0.447),
    new THREE.Vector3(0.075, 0.000, 0.447)
  ], false, "centripetal");
  const patch_logo_geom_a = new THREE.TubeGeometry(patch_logo_curve_a, 40, 0.0025, 5, false);
  const patch_logo = new THREE.Mesh(patch_logo_geom_a, camo_green_mat);
  patch_group.add(patch_logo);

  const patch_logo_curve_b = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.050, -0.010, 0.448),
    new THREE.Vector3(-0.020, 0.000, 0.448),
    new THREE.Vector3(0.010, -0.010, 0.448),
    new THREE.Vector3(0.050, 0.000, 0.448)
  ], false, "centripetal");
  const patch_logo_geom_b = new THREE.TubeGeometry(patch_logo_curve_b, 24, 0.002, 5, false);
  const patch_logo_underline = new THREE.Mesh(patch_logo_geom_b, camo_green_mat);
  patch_group.add(patch_logo_underline);

  const eyelet_geom = new THREE.RingGeometry(0.012, 0.024, 24);
  const eyelet_hole_geom = new THREE.CircleGeometry(0.011, 24);

  function placeEyelet(mesh, angle, radius, y, scale) {
    const normal = new THREE.Vector3(Math.cos(angle), 0.15, Math.sin(angle)).normalize();
    const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle)).normalize();
    const up = new THREE.Vector3().crossVectors(normal, tangent).normalize();
    const basis = new THREE.Matrix4().makeBasis(tangent, up, normal);
    mesh.position.set(radius * Math.cos(angle), y, radius * Math.sin(angle));
    mesh.quaternion.setFromRotationMatrix(basis);
    mesh.scale.setScalar(scale);
  }

  const right_eyelet = new THREE.Mesh(eyelet_geom, eyelet_mat);
  placeEyelet(right_eyelet, 0.28, 0.438, -0.018, 1.0);
  crown_group.add(right_eyelet);

  const right_eyelet_hole = new THREE.Mesh(eyelet_hole_geom, eyelet_hole_mat);
  placeEyelet(right_eyelet_hole, 0.28, 0.440, -0.018, 1.0);
  crown_group.add(right_eyelet_hole);

  const left_eyelet = new THREE.Mesh(eyelet_geom, eyelet_mat);
  placeEyelet(left_eyelet, Math.PI - 0.28, 0.438, -0.018, 1.0);
  crown_group.add(left_eyelet);

  const left_eyelet_hole = new THREE.Mesh(eyelet_hole_geom, eyelet_hole_mat);
  placeEyelet(left_eyelet_hole, Math.PI - 0.28, 0.440, -0.018, 1.0);
  crown_group.add(left_eyelet_hole);

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
  const scale = 0.95 / maxDim;
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
