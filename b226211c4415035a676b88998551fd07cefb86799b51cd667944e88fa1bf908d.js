function __sn17_user(THREE) {
  const root = new THREE.Group();
  const charm = new THREE.Group();
  charm.rotation.set(-0.12, 0.18, -0.08);
  root.add(charm);

  const orange_resin_mat = new THREE.MeshPhysicalMaterial({
    color: 0xff9418,
    metalness: 0.0,
    roughness: 0.15,
    transmission: 0.35,
    thickness: 0.55,
    attenuationColor: 0xff7a10,
    attenuationDistance: 1.4,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.96
  });

  const amber_face_mat = new THREE.MeshPhysicalMaterial({
    color: 0xff9d1c,
    metalness: 0.0,
    roughness: 0.15,
    transmission: 0.25,
    thickness: 0.2,
    clearcoat: 0.7,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.97
  });

  const silver_mat = new THREE.MeshStandardMaterial({
    color: 0xc8c8c3,
    metalness: 0.6,
    roughness: 0.28
  });

  const engraving_mat = new THREE.MeshStandardMaterial({
    color: 0x51483e,
    metalness: 0.35,
    roughness: 0.5
  });

  const inclusion_mat = new THREE.MeshStandardMaterial({
    color: 0x6b3514,
    metalness: 0.0,
    roughness: 0.8
  });

  const body_profile = [
    new THREE.Vector2(0.00, -0.50),
    new THREE.Vector2(0.30, -0.50),
    new THREE.Vector2(0.38, -0.47),
    new THREE.Vector2(0.43, -0.40),
    new THREE.Vector2(0.45, -0.30),
    new THREE.Vector2(0.45, 0.28),
    new THREE.Vector2(0.44, 0.34),
    new THREE.Vector2(0.40, 0.39),
    new THREE.Vector2(0.34, 0.41),
    new THREE.Vector2(0.00, 0.41)
  ];
  const orange_resin_body_geom = new THREE.LatheGeometry(body_profile, 64);
  const orange_resin_body = new THREE.Mesh(orange_resin_body_geom, orange_resin_mat);
  orange_resin_body.rotation.x = Math.PI / 2;
  charm.add(orange_resin_body);

  const silver_band_shape = new THREE.Shape();
  silver_band_shape.absellipse(0, 0, 0.49, 0.49, 0, Math.PI * 2, false, 0);
  const silver_band_hole = new THREE.Path();
  silver_band_hole.absellipse(0, 0, 0.355, 0.355, 0, Math.PI * 2, true, 0);
  silver_band_shape.holes.push(silver_band_hole);

  const silver_front_band_geom = new THREE.ExtrudeGeometry(silver_band_shape, {
    curveSegments: 64,
    steps: 1,
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.016,
    bevelOffset: 0,
    bevelSegments: 3
  });
  const silver_front_band = new THREE.Mesh(silver_front_band_geom, silver_mat);
  silver_front_band.position.z = 0.22;
  charm.add(silver_front_band);

  const orange_front_face_geom = new THREE.CircleGeometry(0.337, 64);
  const orange_front_face = new THREE.Mesh(orange_front_face_geom, amber_face_mat);
  orange_front_face.position.z = 0.421;
  charm.add(orange_front_face);

  const inner_shadow_rim_geom = new THREE.TorusGeometry(0.347, 0.009, 8, 64);
  const inner_shadow_rim = new THREE.Mesh(inner_shadow_rim_geom, engraving_mat);
  inner_shadow_rim.position.z = 0.424;
  charm.add(inner_shadow_rim);

  const front_highlight_rim_geom = new THREE.TorusGeometry(0.365, 0.012, 10, 64);
  const front_highlight_rim = new THREE.Mesh(front_highlight_rim_geom, silver_mat);
  front_highlight_rim.position.z = 0.425;
  charm.add(front_highlight_rim);

  const rear_seam_geom = new THREE.TorusGeometry(0.447, 0.008, 8, 64);
  const rear_seam = new THREE.Mesh(rear_seam_geom, engraving_mat);
  rear_seam.position.z = 0.218;
  charm.add(rear_seam);

  const top_silver_panel_shape = new THREE.Shape();
  top_silver_panel_shape.moveTo(-0.17, -0.23);
  top_silver_panel_shape.bezierCurveTo(-0.03, -0.25, 0.16, -0.20, 0.23, -0.09);
  top_silver_panel_shape.bezierCurveTo(0.28, 0.01, 0.24, 0.15, 0.13, 0.22);
  top_silver_panel_shape.bezierCurveTo(0.03, 0.28, -0.12, 0.26, -0.20, 0.15);
  top_silver_panel_shape.bezierCurveTo(-0.27, 0.05, -0.25, -0.13, -0.17, -0.23);

  const top_silver_panel_geom = new THREE.ExtrudeGeometry(top_silver_panel_shape, {
    curveSegments: 32,
    steps: 1,
    depth: 0.026,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.009,
    bevelOffset: 0,
    bevelSegments: 3
  });
  const top_silver_panel = new THREE.Mesh(top_silver_panel_geom, silver_mat);
  top_silver_panel.rotation.x = -Math.PI / 2;
  top_silver_panel.position.set(0, 0.444, -0.02);
  charm.add(top_silver_panel);

  const leaf_emblem_shape = new THREE.Shape();
  leaf_emblem_shape.moveTo(0.00, 0.135);
  leaf_emblem_shape.bezierCurveTo(0.055, 0.085, 0.125, 0.025, 0.115, -0.055);
  leaf_emblem_shape.bezierCurveTo(0.105, -0.135, 0.025, -0.175, -0.055, -0.135);
  leaf_emblem_shape.bezierCurveTo(-0.135, -0.095, -0.155, 0.005, -0.105, 0.075);
  leaf_emblem_shape.bezierCurveTo(-0.070, 0.120, -0.020, 0.140, 0.00, 0.135);

  const leaf_emblem_geom = new THREE.ExtrudeGeometry(leaf_emblem_shape, {
    curveSegments: 32,
    steps: 1,
    depth: 0.007,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.003,
    bevelOffset: 0,
    bevelSegments: 2
  });
  const leaf_emblem = new THREE.Mesh(leaf_emblem_geom, silver_mat);
  leaf_emblem.rotation.x = -Math.PI / 2;
  leaf_emblem.position.set(0, 0.476, -0.02);
  charm.add(leaf_emblem);

  const leaf_outline_points = [
    new THREE.Vector3(0.00, 0.487, 0.115),
    new THREE.Vector3(0.065, 0.487, 0.055),
    new THREE.Vector3(0.100, 0.487, -0.030),
    new THREE.Vector3(0.070, 0.487, -0.120),
    new THREE.Vector3(-0.010, 0.487, -0.155),
    new THREE.Vector3(-0.090, 0.487, -0.110),
    new THREE.Vector3(-0.120, 0.487, -0.025),
    new THREE.Vector3(-0.080, 0.487, 0.060)
  ];
  const leaf_outline_curve = new THREE.CatmullRomCurve3(
    leaf_outline_points,
    true,
    "centripetal"
  );
  const leaf_outline_geom = new THREE.TubeGeometry(leaf_outline_curve, 48, 0.005, 6, true);
  const leaf_outline = new THREE.Mesh(leaf_outline_geom, engraving_mat);
  charm.add(leaf_outline);

  const leaf_vein_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, 0.489, 0.105),
    new THREE.Vector3(-0.015, 0.489, 0.035),
    new THREE.Vector3(-0.035, 0.489, -0.045),
    new THREE.Vector3(-0.045, 0.489, -0.115)
  ], false, "centripetal");
  const leaf_vein_geom = new THREE.TubeGeometry(leaf_vein_curve, 24, 0.004, 6, false);
  const leaf_vein = new THREE.Mesh(leaf_vein_geom, engraving_mat);
  charm.add(leaf_vein);

  const front_symbol_stem_curve = new THREE.LineCurve3(
    new THREE.Vector3(-0.13, 0, -0.17),
    new THREE.Vector3(0.13, 0, 0.17)
  );
  const front_symbol_stem_geom = new THREE.TubeGeometry(
    front_symbol_stem_curve,
    1,
    0.012,
    8,
    false
  );
  const front_symbol_stem = new THREE.Mesh(front_symbol_stem_geom, engraving_mat);
  front_symbol_stem.position.z = 0.431;
  charm.add(front_symbol_stem);

  const front_symbol_upper_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.105, 0, 0.055),
    new THREE.Vector3(-0.060, 0, 0.105),
    new THREE.Vector3(0.015, 0, 0.115),
    new THREE.Vector3(0.085, 0, 0.075)
  ], false, "centripetal");
  const front_symbol_upper_geom = new THREE.TubeGeometry(
    front_symbol_upper_curve,
    24,
    0.013,
    8,
    false
  );
  const front_symbol_upper = new THREE.Mesh(front_symbol_upper_geom, engraving_mat);
  front_symbol_upper.position.z = 0.432;
  charm.add(front_symbol_upper);

  const front_symbol_lower_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.095, 0, -0.060),
    new THREE.Vector3(-0.045, 0, -0.105),
    new THREE.Vector3(0.030, 0, -0.105),
    new THREE.Vector3(0.095, 0, -0.065)
  ], false, "centripetal");
  const front_symbol_lower_geom = new THREE.TubeGeometry(
    front_symbol_lower_curve,
    24,
    0.013,
    8,
    false
  );
  const front_symbol_lower = new THREE.Mesh(front_symbol_lower_geom, engraving_mat);
  front_symbol_lower.position.z = 0.432;
  charm.add(front_symbol_lower);

  const resin_inclusions_geom = new THREE.SphereGeometry(0.006, 8, 6);
  const resin_inclusions = new THREE.InstancedMesh(
    resin_inclusions_geom,
    inclusion_mat,
    6
  );
  const inclusion_dummy = new THREE.Object3D();
  const inclusion_data = [
    [-0.24, 0.15, 0.34, 0.7],
    [-0.31, -0.08, 0.18, 0.5],
    [-0.20, -0.25, -0.02, 0.6],
    [0.25, 0.10, 0.08, 0.45],
    [-0.33, 0.02, -0.16, 0.55],
    [0.19, -0.20, -0.22, 0.4]
  ];
  for (let i = 0; i < inclusion_data.length; i++) {
    const data = inclusion_data[i];
    inclusion_dummy.position.set(data[0], data[1], data[2]);
    inclusion_dummy.scale.setScalar(data[3]);
    inclusion_dummy.updateMatrix();
    resin_inclusions.setMatrixAt(i, inclusion_dummy.matrix);
  }
  resin_inclusions.instanceMatrix.needsUpdate = true;
  charm.add(resin_inclusions);

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
