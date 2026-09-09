function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "carved_wooden_vessel";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xb9824b,
    metalness: 0.0,
    roughness: 0.62
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xd2ad70,
    metalness: 0.0,
    roughness: 0.68
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x704526,
    metalness: 0.0,
    roughness: 0.72
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x211914,
    metalness: 0.0,
    roughness: 0.85
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x4b3020,
    metalness: 0.0,
    roughness: 0.9
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xe0c184,
    metalness: 0.0,
    roughness: 0.75
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.20, 0.00),
    new THREE.Vector2(0.34, 0.06),
    new THREE.Vector2(0.47, 0.18),
    new THREE.Vector2(0.55, 0.38),
    new THREE.Vector2(0.58, 0.61),
    new THREE.Vector2(0.55, 0.84),
    new THREE.Vector2(0.47, 1.04),
    new THREE.Vector2(0.35, 1.20),
    new THREE.Vector2(0.25, 1.34),
    new THREE.Vector2(0.22, 1.52),
    new THREE.Vector2(0.235, 1.68),
    new THREE.Vector2(0.285, 1.82),
    new THREE.Vector2(0.38, 1.96),
    new THREE.Vector2(0.43, 2.10),
    new THREE.Vector2(0.39, 2.20),
    new THREE.Vector2(0.28, 2.25),
    new THREE.Vector2(0.00, 2.25)
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 96);
  bodyGeom.computeVertexNormals();
  const body = new THREE.Mesh(bodyGeom, woodMat);
  body.name = "body";
  root.add(body);

  const base_foot_geom = new THREE.CylinderGeometry(0.22, 0.18, 0.055, 64);
  const base_foot = new THREE.Mesh(base_foot_geom, darkWoodMat);
  base_foot.name = "base_foot";
  base_foot.position.y = 0.025;
  root.add(base_foot);

  const lower_collar_ring_geom = new THREE.TorusGeometry(0.285, 0.018, 12, 80);
  const lower_collar_ring = new THREE.Mesh(lower_collar_ring_geom, engravingMat);
  lower_collar_ring.name = "lower_collar_ring";
  lower_collar_ring.rotation.x = Math.PI / 2;
  lower_collar_ring.position.y = 1.22;
  root.add(lower_collar_ring);

  const neck_lower_groove_geom = new THREE.TorusGeometry(0.245, 0.010, 10, 80);
  const neck_lower_groove = new THREE.Mesh(neck_lower_groove_geom, engravingMat);
  neck_lower_groove.name = "neck_lower_groove";
  neck_lower_groove.rotation.x = Math.PI / 2;
  neck_lower_groove.position.y = 1.34;
  root.add(neck_lower_groove);

  const neck_upper_groove_geom = new THREE.TorusGeometry(0.235, 0.010, 10, 80);
  const neck_upper_groove = new THREE.Mesh(neck_upper_groove_geom, engravingMat);
  neck_upper_groove.name = "neck_upper_groove";
  neck_upper_groove.rotation.x = Math.PI / 2;
  neck_upper_groove.position.y = 1.68;
  root.add(neck_upper_groove);

  const upper_lip_groove_geom = new THREE.TorusGeometry(0.315, 0.012, 10, 80);
  const upper_lip_groove = new THREE.Mesh(upper_lip_groove_geom, engravingMat);
  upper_lip_groove.name = "upper_lip_groove";
  upper_lip_groove.rotation.x = Math.PI / 2;
  upper_lip_groove.position.y = 1.82;
  root.add(upper_lip_groove);

  const top_split_geom = new THREE.BoxGeometry(0.018, 0.34, 0.010);
  const top_split = new THREE.Mesh(top_split_geom, engravingMat);
  top_split.name = "top_split";
  top_split.position.set(0.02, 2.08, 0.397);
  top_split.rotation.z = -0.08;
  root.add(top_split);

  function radiusAt(y) {
    if (y < 0.08) return 0.20 + y * 1.75;
    if (y < 0.38) return 0.34 + (y - 0.08) * 0.70;
    if (y < 0.62) return 0.55 + (y - 0.38) * 0.125;
    if (y < 0.84) return 0.58 - (y - 0.62) * 0.136;
    if (y < 1.04) return 0.55 - (y - 0.84) * 0.40;
    if (y < 1.20) return 0.47 - (y - 1.04) * 0.75;
    if (y < 1.34) return 0.35 - (y - 1.20) * 0.714;
    if (y < 1.68) return 0.22 + (y - 1.34) * 0.03;
    if (y < 1.82) return 0.235 + (y - 1.68) * 0.357;
    if (y < 2.10) return 0.285 + (y - 1.82) * 0.518;
    if (y < 2.20) return 0.43 - (y - 2.10) * 0.40;
    return 0.39 - (y - 2.20) * 2.2;
  }

  function surfacePoint(u, y, extra) {
    const r = radiusAt(y);
    const angle = Math.PI / 2 - u / Math.max(r, 0.05);
    const rr = r + extra;
    return new THREE.Vector3(Math.cos(angle) * rr, y, Math.sin(angle) * rr);
  }

  function addSurfaceTube(parent, name, coords, mat, radius, closed) {
    const pts = [];
    for (let i = 0; i < coords.length; i++) {
      pts.push(surfacePoint(coords[i][0], coords[i][1], 0.012));
    }
    const curve = new THREE.CatmullRomCurve3(pts, closed, "centripetal");
    const geom = new THREE.TubeGeometry(curve, Math.max(16, coords.length * 8), radius, 6, closed);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  function addSurfaceDisc(parent, name, u, y, size, mat) {
    const r = radiusAt(y);
    const angle = Math.PI / 2 - u / Math.max(r, 0.05);
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
    const pos = surfacePoint(u, y, 0.016);
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(size, 24), mat);
    disc.name = name;
    disc.quaternion.copy(quat);
    disc.position.copy(pos);
    parent.add(disc);
    return disc;
  }

  const body_decoration = new THREE.Group();
  body_decoration.name = "body_decoration";
  root.add(body_decoration);

  const flower_petals = new THREE.Group();
  flower_petals.name = "flower_petals";
  body_decoration.add(flower_petals);

  const petal_paths = [
    [[0.00, 0.62], [-0.08, 0.82], [-0.18, 1.02], [-0.12, 1.18], [0.00, 1.08]],
    [[0.00, 0.62], [0.10, 0.82], [0.22, 0.98], [0.18, 1.12], [0.06, 1.02]],
    [[0.00, 0.62], [-0.22, 0.68], [-0.38, 0.58], [-0.34, 0.42], [-0.16, 0.48]],
    [[0.00, 0.62], [0.20, 0.68], [0.36, 0.58], [0.32, 0.43], [0.15, 0.48]],
    [[0.00, 0.62], [-0.08, 0.42], [-0.12, 0.24], [0.00, 0.16]],
    [[0.00, 0.62], [0.08, 0.42], [0.13, 0.25], [0.02, 0.17]]
  ];
  for (let i = 0; i < petal_paths.length; i++) {
    const petal_outline = addSurfaceTube(flower_petals, "flower_petal_outline_" + i, petal_paths[i], engravingMat, 0.009, true);
    const inner_path = [];
    for (let j = 1; j < petal_paths[i].length - 1; j++) {
      const p = petal_paths[i][j];
      inner_path.push([p[0] * 0.72 + 0.01, p[1] * 0.92 + 0.06]);
    }
    const petal_inner_line = addSurfaceTube(flower_petals, "flower_petal_inner_line_" + i, inner_path, engravingMat, 0.005, false);
  }

  const flower_center = addSurfaceDisc(body_decoration, "flower_center", 0, 0.62, 0.060, engravingMat);
  const flower_center_highlight = addSurfaceDisc(body_decoration, "flower_center_highlight", 0, 0.62, 0.038, darkWoodMat);

  const side_leaf_left = addSurfaceTube(body_decoration, "side_leaf_left", [
    [-0.43, 0.62], [-0.52, 0.72], [-0.58, 0.67], [-0.52, 0.57], [-0.43, 0.62]
  ], engravingMat, 0.007, true);
  const side_leaf_right = addSurfaceTube(body_decoration, "side_leaf_right", [
    [0.43, 0.62], [0.52, 0.72], [0.58, 0.67], [0.52, 0.57], [0.43, 0.62]
  ], engravingMat, 0.007, true);

  const neck_scrollwork = new THREE.Group();
  neck_scrollwork.name = "neck_scrollwork";
  root.add(neck_scrollwork);

  const neck_scroll_main = addSurfaceTube(neck_scrollwork, "neck_scroll_main", [
    [-0.22, 1.45], [-0.16, 1.58], [-0.06, 1.53], [0.02, 1.42], [0.10, 1.55], [0.20, 1.50], [0.24, 1.39]
  ], engravingMat, 0.008, false);
  const neck_scroll_loop_left = addSurfaceTube(neck_scrollwork, "neck_scroll_loop_left", [
    [-0.18, 1.48], [-0.24, 1.58], [-0.20, 1.66], [-0.12, 1.62], [-0.13, 1.52]
  ], engravingMat, 0.006, false);
  const neck_scroll_loop_right = addSurfaceTube(neck_scrollwork, "neck_scroll_loop_right", [
    [0.10, 1.52], [0.18, 1.64], [0.25, 1.58], [0.23, 1.47]
  ], engravingMat, 0.006, false);

  const wood_grain_lines = new THREE.Group();
  wood_grain_lines.name = "wood_grain_lines";
  root.add(wood_grain_lines);

  for (let i = 0; i < 26; i++) {
    const u = -0.48 + i * (0.96 / 25);
    const y0 = 0.12 + ((i * 7) % 11) * 0.035;
    const len = 0.18 + ((i * 5) % 9) * 0.035;
    const ys = Math.min(1.12, y0 + len);
    const coords = [];
    for (let j = 0; j < 5; j++) {
      const t = j / 4;
      const yy = y0 + (ys - y0) * t;
      const uu = u + Math.sin(i * 1.7 + t * 4.0) * 0.010;
      coords.push([uu, yy]);
    }
    const grain_line = addSurfaceTube(wood_grain_lines, "grain_line_" + i, coords, grainMat, 0.0028, false);
  }

  for (let i = 0; i < 14; i++) {
    const u = -0.20 + i * (0.40 / 13);
    const coords = [];
    for (let j = 0; j < 5; j++) {
      const t = j / 4;
      coords.push([u + Math.sin(i * 1.3 + t * 3.0) * 0.008, 1.38 + t * 0.34]);
    }
    const neck_grain_line = addSurfaceTube(wood_grain_lines, "neck_grain_line_" + i, coords, grainMat, 0.0025, false);
  }

  for (let i = 0; i < 18; i++) {
    const u = -0.31 + i * (0.62 / 17);
    const coords = [];
    for (let j = 0; j < 5; j++) {
      const t = j / 4;
      coords.push([u + Math.sin(i * 1.1 + t * 3.5) * 0.009, 1.86 + t * 0.31]);
    }
    const lip_grain_line = addSurfaceTube(wood_grain_lines, "lip_grain_line_" + i, coords, grainMat, 0.0025, false);
  }

  const pale_body_patch = new THREE.Group();
  pale_body_patch.name = "pale_body_patch";
  root.add(pale_body_patch);

  const patch_coords = [
    [0.34, 0.18], [0.47, 0.30], [0.52, 0.55], [0.50, 0.82], [0.42, 1.05], [0.31, 1.13], [0.27, 0.90], [0.29, 0.55], [0.28, 0.30]
  ];
  const pale_body_patch_outline = addSurfaceTube(pale_body_patch, "pale_body_patch_outline", patch_coords, highlightMat, 0.010, true);

  const top_turning_rings = new THREE.Group();
  top_turning_rings.name = "top_turning_rings";
  root.add(top_turning_rings);
  const top_ring_geom = new THREE.TorusGeometry(1, 0.006, 6, 96);
  for (let i = 0; i < 5; i++) {
    const y = 1.91 + i * 0.055;
    const r = radiusAt(y) + 0.010;
    const ring = new THREE.Mesh(top_ring_geom, grainMat);
    ring.name = "top_turning_ring_" + i;
    ring.rotation.x = Math.PI / 2;
    ring.scale.setScalar(r);
    ring.position.y = y;
    top_turning_rings.add(ring);
  }

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
