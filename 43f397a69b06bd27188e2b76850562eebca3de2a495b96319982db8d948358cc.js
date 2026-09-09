function __sn17_user(THREE) {
  const root = new THREE.Group();
  const vase_body = new THREE.Group();
  const embossed_decoration = new THREE.Group();
  root.add(vase_body, embossed_decoration);

  const frosted_glass_mat = new THREE.MeshPhysicalMaterial({
    color: 0xeef5f2,
    transmission: 0.42,
    thickness: 0.12,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const clear_glass_mat = new THREE.MeshPhysicalMaterial({
    color: 0xf4ffff,
    transmission: 0.65,
    thickness: 0.08,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const etched_glass_mat = new THREE.MeshStandardMaterial({
    color: 0xf4fbf8,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const cut_shadow_mat = new THREE.MeshStandardMaterial({
    color: 0x9aa8a4,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const body_profile = [
    new THREE.Vector2(0.00, -0.78),
    new THREE.Vector2(0.25, -0.78),
    new THREE.Vector2(0.31, -0.73),
    new THREE.Vector2(0.34, -0.55),
    new THREE.Vector2(0.38, -0.25),
    new THREE.Vector2(0.40, 0.08),
    new THREE.Vector2(0.38, 0.34),
    new THREE.Vector2(0.33, 0.52),
    new THREE.Vector2(0.40, 0.68),
    new THREE.Vector2(0.49, 0.78),
    new THREE.Vector2(0.50, 0.82),
    new THREE.Vector2(0.47, 0.86),
    new THREE.Vector2(0.41, 0.84),
    new THREE.Vector2(0.36, 0.74),
    new THREE.Vector2(0.31, 0.56),
    new THREE.Vector2(0.34, 0.32),
    new THREE.Vector2(0.36, 0.02),
    new THREE.Vector2(0.34, -0.30),
    new THREE.Vector2(0.30, -0.58),
    new THREE.Vector2(0.25, -0.66),
    new THREE.Vector2(0.00, -0.66)
  ];

  const vase_shell_geom = new THREE.LatheGeometry(body_profile, 96);
  const vase_shell = new THREE.Mesh(vase_shell_geom, frosted_glass_mat);
  vase_body.add(vase_shell);

  const thick_base_geom = new THREE.CylinderGeometry(0.31, 0.29, 0.18, 96);
  const thick_base = new THREE.Mesh(thick_base_geom, clear_glass_mat);
  thick_base.position.y = -0.69;
  vase_body.add(thick_base);

  const base_facet_geom = new THREE.OctahedronGeometry(0.075, 0);
  const base_facets = new THREE.InstancedMesh(base_facet_geom, clear_glass_mat, 16);
  const facet_dummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    facet_dummy.position.set(Math.sin(angle) * 0.285, -0.69, Math.cos(angle) * 0.285);
    facet_dummy.rotation.set(0, angle, i % 2 === 0 ? 0.22 : -0.22);
    facet_dummy.scale.set(0.72, 1.28, 0.34);
    facet_dummy.updateMatrix();
    base_facets.setMatrixAt(i, facet_dummy.matrix);
  }
  vase_body.add(base_facets);

  const top_rim_geom = new THREE.TorusGeometry(0.455, 0.035, 16, 96);
  const top_rim = new THREE.Mesh(top_rim_geom, clear_glass_mat);
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 0.82;
  vase_body.add(top_rim);

  const inner_lip_geom = new THREE.TorusGeometry(0.405, 0.012, 10, 96);
  const inner_lip = new THREE.Mesh(inner_lip_geom, etched_glass_mat);
  inner_lip.rotation.x = Math.PI / 2;
  inner_lip.position.y = 0.825;
  vase_body.add(inner_lip);

  const bottom_foot_ring_geom = new THREE.TorusGeometry(0.285, 0.018, 12, 96);
  const bottom_foot_ring = new THREE.Mesh(bottom_foot_ring_geom, clear_glass_mat);
  bottom_foot_ring.rotation.x = Math.PI / 2;
  bottom_foot_ring.position.y = -0.775;
  vase_body.add(bottom_foot_ring);

  const lower_etched_band_geom = new THREE.TorusGeometry(0.326, 0.006, 8, 96);
  const lower_etched_band = new THREE.Mesh(lower_etched_band_geom, etched_glass_mat);
  lower_etched_band.rotation.x = Math.PI / 2;
  lower_etched_band.position.y = -0.575;
  vase_body.add(lower_etched_band);

  function radiusAt(y) {
    if (y < -0.55) return 0.32 + (y + 0.78) / 0.23 * 0.02;
    if (y < -0.25) return 0.34 + (y + 0.55) / 0.30 * 0.04;
    if (y < 0.08) return 0.38 + (y + 0.25) / 0.33 * 0.02;
    if (y < 0.34) return 0.40 - (y - 0.08) / 0.26 * 0.02;
    if (y < 0.52) return 0.38 - (y - 0.34) / 0.18 * 0.05;
    if (y < 0.68) return 0.33 + (y - 0.52) / 0.16 * 0.07;
    return 0.40 + (y - 0.68) / 0.14 * 0.09;
  }

  function surfacePoint(angle, y, extra) {
    const r = radiusAt(y) + extra;
    return new THREE.Vector3(Math.sin(angle) * r, y, Math.cos(angle) * r);
  }

  function surfacePose(angle, y, extra) {
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle)).normalize();
    const pos = surfacePoint(angle, y, extra);
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return { pos, quat };
  }

  function addSurfaceTube(points, mat, radius) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, Math.max(16, points.length * 3), radius, 8, false);
    const mesh = new THREE.Mesh(geom, mat);
    embossed_decoration.add(mesh);
    return mesh;
  }

  function addSurfaceLeaf(center_angle, center_y, length, width, tilt, mat, radius) {
    const leaf_group = new THREE.Group();
    const rows = 10;
    for (let side = -1; side <= 1; side += 2) {
      const pts = [];
      for (let i = 0; i <= rows; i++) {
        const t = i / rows;
        const local_y = (t - 0.5) * length;
        const bulge = Math.sin(t * Math.PI) * width * 0.5;
        const local_x = side * bulge + Math.sin(t * Math.PI) * width * 0.08;
        const rotated_x = local_x * Math.cos(tilt) - local_y * Math.sin(tilt);
        const rotated_y = local_x * Math.sin(tilt) + local_y * Math.cos(tilt);
        const y = center_y + rotated_y;
        const angle = center_angle + rotated_x / Math.max(radiusAt(y), 0.1);
        pts.push(surfacePoint(angle, y, 0.012));
      }
      const edge = addSurfaceTube(pts, mat, radius);
      leaf_group.add(edge);
    }

    const vein_pts = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const local_y = (t - 0.5) * length * 0.92;
      const rotated_y = local_y * Math.cos(tilt);
      const rotated_x = local_y * Math.sin(tilt);
      const y = center_y + rotated_y;
      const angle = center_angle + rotated_x / Math.max(radiusAt(y), 0.1);
      vein_pts.push(surfacePoint(angle, y, 0.014));
    }
    const vein = addSurfaceTube(vein_pts, etched_glass_mat, radius * 0.72);
    leaf_group.add(vein);
    embossed_decoration.add(leaf_group);
    return leaf_group;
  }

  function addSurfaceFlower(center_angle, center_y, size, petal_count) {
    const flower_group = new THREE.Group();
    for (let p = 0; p < petal_count; p++) {
      const phi = p / petal_count * Math.PI * 2;
      const petal_pts = [];
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        const dist = size * (0.18 + 0.58 * t);
        const petal_side = Math.sin(t * Math.PI) * size * 0.18;
        const local_x = Math.cos(phi) * dist - Math.sin(phi) * petal_side;
        const local_y = Math.sin(phi) * dist + Math.cos(phi) * petal_side;
        const y = center_y + local_y;
        const angle = center_angle + local_x / Math.max(radiusAt(y), 0.1);
        petal_pts.push(surfacePoint(angle, y, 0.013));
      }
      const petal = addSurfaceTube(petal_pts, etched_glass_mat, 0.006);
      flower_group.add(petal);
    }

    const center_pose = surfacePose(center_angle, center_y, 0.016);
    const flower_center_geom = new THREE.CircleGeometry(size * 0.13, 24);
    const flower_center = new THREE.Mesh(flower_center_geom, etched_glass_mat);
    flower_center.quaternion.copy(center_pose.quat);
    flower_center.position.copy(center_pose.pos);
    flower_group.add(flower_center);

    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2;
      const start = surfacePoint(center_angle, center_y, 0.017);
      const end_local = new THREE.Vector3(Math.cos(a) * size * 0.26, Math.sin(a) * size * 0.26, 0);
      const end_y = center_y + end_local.y;
      const end_angle = center_angle + end_local.x / Math.max(radiusAt(end_y), 0.1);
      const end = surfacePoint(end_angle, end_y, 0.017);
      const ray_curve = new THREE.LineCurve3(start, end);
      const ray_geom = new THREE.TubeGeometry(ray_curve, 1, 0.0025, 5, false);
      const ray = new THREE.Mesh(ray_geom, cut_shadow_mat);
      flower_group.add(ray);
    }

    embossed_decoration.add(flower_group);
    return flower_group;
  }

  const front_stem = addSurfaceTube([
    surfacePoint(-0.08, -0.60, 0.012),
    surfacePoint(-0.02, -0.38, 0.012),
    surfacePoint(0.08, -0.12, 0.012),
    surfacePoint(0.02, 0.18, 0.012),
    surfacePoint(-0.08, 0.43, 0.012)
  ], etched_glass_mat, 0.010);

  const left_sweeping_stem = addSurfaceTube([
    surfacePoint(-0.58, -0.58, 0.012),
    surfacePoint(-0.48, -0.30, 0.012),
    surfacePoint(-0.55, 0.02, 0.012),
    surfacePoint(-0.42, 0.34, 0.012),
    surfacePoint(-0.50, 0.58, 0.012)
  ], etched_glass_mat, 0.009);

  const right_sweeping_stem = addSurfaceTube([
    surfacePoint(0.58, -0.58, 0.012),
    surfacePoint(0.46, -0.28, 0.012),
    surfacePoint(0.54, 0.04, 0.012),
    surfacePoint(0.42, 0.35, 0.012),
    surfacePoint(0.50, 0.61, 0.012)
  ], etched_glass_mat, 0.009);

  const central_leaf = addSurfaceLeaf(0.02, 0.18, 0.50, 0.13, -0.28, etched_glass_mat, 0.008);
  const upper_left_leaf = addSurfaceLeaf(-0.28, 0.30, 0.38, 0.10, 0.52, etched_glass_mat, 0.007);
  const upper_right_leaf = addSurfaceLeaf(0.30, 0.28, 0.38, 0.10, -0.52, etched_glass_mat, 0.007);
  const lower_left_leaf = addSurfaceLeaf(-0.34, -0.28, 0.36, 0.10, -0.70, etched_glass_mat, 0.007);
  const lower_right_leaf = addSurfaceLeaf(0.34, -0.25, 0.36, 0.10, 0.70, etched_glass_mat, 0.007);
  const neck_left_leaf = addSurfaceLeaf(-0.52, 0.55, 0.24, 0.055, -0.35, etched_glass_mat, 0.006);
  const neck_right_leaf = addSurfaceLeaf(0.52, 0.56, 0.24, 0.055, 0.35, etched_glass_mat, 0.006);

  const left_flower = addSurfaceFlower(-0.48, -0.47, 0.16, 6);
  const right_flower = addSurfaceFlower(0.48, -0.45, 0.15, 6);

  const side_scroll_left = addSurfaceTube([
    surfacePoint(-0.82, -0.48, 0.012),
    surfacePoint(-0.92, -0.22, 0.012),
    surfacePoint(-0.82, 0.06, 0.012),
    surfacePoint(-0.90, 0.34, 0.012)
  ], etched_glass_mat, 0.007);

  const side_scroll_right = addSurfaceTube([
    surfacePoint(0.82, -0.48, 0.012),
    surfacePoint(0.92, -0.22, 0.012),
    surfacePoint(0.82, 0.06, 0.012),
    surfacePoint(0.90, 0.34, 0.012)
  ], etched_glass_mat, 0.007);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 0.98 / maxDim;
      object.scale.setScalar(scale);
    }
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
