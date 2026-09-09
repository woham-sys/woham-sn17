function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_silver_goblet";

  const polished_silver_mat = new THREE.MeshStandardMaterial({
    color: 0xf4f4ef,
    metalness: 0.35,
    roughness: 0.12,
    emissive: 0x30302d,
    emissiveIntensity: 0.35,
    side: THREE.DoubleSide,
  });
  const bright_silver_mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.3,
    roughness: 0.08,
    emissive: 0x454540,
    emissiveIntensity: 0.4,
    side: THREE.DoubleSide,
  });
  const engraving_mat = new THREE.MeshStandardMaterial({
    color: 0x292927,
    metalness: 0.1,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const engraving_highlight_mat = new THREE.MeshStandardMaterial({
    color: 0xbfc0bd,
    metalness: 0.2,
    roughness: 0.35,
    side: THREE.DoubleSide,
  });

  const goblet_profile = [
    new THREE.Vector2(0.000, -0.700),
    new THREE.Vector2(0.255, -0.700),
    new THREE.Vector2(0.310, -0.688),
    new THREE.Vector2(0.335, -0.665),
    new THREE.Vector2(0.315, -0.635),
    new THREE.Vector2(0.220, -0.605),
    new THREE.Vector2(0.125, -0.565),
    new THREE.Vector2(0.095, -0.500),
    new THREE.Vector2(0.112, -0.435),
    new THREE.Vector2(0.100, -0.365),
    new THREE.Vector2(0.088, -0.285),
    new THREE.Vector2(0.092, -0.205),
    new THREE.Vector2(0.115, -0.135),
    new THREE.Vector2(0.145, -0.090),
    new THREE.Vector2(0.155, -0.055),
    new THREE.Vector2(0.132, -0.015),
    new THREE.Vector2(0.170, 0.040),
    new THREE.Vector2(0.245, 0.115),
    new THREE.Vector2(0.315, 0.225),
    new THREE.Vector2(0.365, 0.365),
    new THREE.Vector2(0.395, 0.525),
    new THREE.Vector2(0.405, 0.650),
    new THREE.Vector2(0.425, 0.690),
    new THREE.Vector2(0.420, 0.715),
    new THREE.Vector2(0.385, 0.735),
    new THREE.Vector2(0.350, 0.715),
    new THREE.Vector2(0.345, 0.675),
    new THREE.Vector2(0.338, 0.525),
    new THREE.Vector2(0.305, 0.365),
    new THREE.Vector2(0.235, 0.225),
    new THREE.Vector2(0.150, 0.125),
    new THREE.Vector2(0.070, 0.075),
    new THREE.Vector2(0.000, 0.065),
  ];

  const goblet_body_geo = new THREE.LatheGeometry(goblet_profile, 96);
  const goblet_body = new THREE.Mesh(goblet_body_geo, polished_silver_mat);
  goblet_body.name = "goblet_body";
  root.add(goblet_body);

  const upper_rim_band_geo = new THREE.CylinderGeometry(
    0.419, 0.405, 0.036, 96, 1, true
  );
  const upper_rim_band = new THREE.Mesh(upper_rim_band_geo, bright_silver_mat);
  upper_rim_band.name = "upper_rim_band";
  upper_rim_band.position.y = 0.675;
  root.add(upper_rim_band);

  const top_rolled_rim_geo = new THREE.TorusGeometry(0.397, 0.026, 16, 96);
  const top_rolled_rim = new THREE.Mesh(top_rolled_rim_geo, bright_silver_mat);
  top_rolled_rim.name = "top_rolled_rim";
  top_rolled_rim.rotation.x = Math.PI / 2;
  top_rolled_rim.position.y = 0.704;
  root.add(top_rolled_rim);

  const inner_lip_shadow_geo = new THREE.TorusGeometry(0.360, 0.006, 8, 96);
  const inner_lip_shadow = new THREE.Mesh(inner_lip_shadow_geo, engraving_mat);
  inner_lip_shadow.name = "inner_lip_shadow";
  inner_lip_shadow.rotation.x = Math.PI / 2;
  inner_lip_shadow.position.y = 0.690;
  root.add(inner_lip_shadow);

  const foot_edge_ring_geo = new THREE.TorusGeometry(0.307, 0.014, 12, 96);
  const foot_edge_ring = new THREE.Mesh(foot_edge_ring_geo, bright_silver_mat);
  foot_edge_ring.name = "foot_edge_ring";
  foot_edge_ring.rotation.x = Math.PI / 2;
  foot_edge_ring.position.y = -0.681;
  root.add(foot_edge_ring);

  const stem_lower_collar_geo = new THREE.TorusGeometry(0.112, 0.012, 12, 64);
  const stem_lower_collar = new THREE.Mesh(stem_lower_collar_geo, bright_silver_mat);
  stem_lower_collar.name = "stem_lower_collar";
  stem_lower_collar.rotation.x = Math.PI / 2;
  stem_lower_collar.position.y = -0.438;
  root.add(stem_lower_collar);

  const stem_upper_collar_geo = new THREE.TorusGeometry(0.137, 0.014, 12, 64);
  const stem_upper_collar = new THREE.Mesh(stem_upper_collar_geo, bright_silver_mat);
  stem_upper_collar.name = "stem_upper_collar";
  stem_upper_collar.rotation.x = Math.PI / 2;
  stem_upper_collar.position.y = -0.073;
  root.add(stem_upper_collar);

  const bowl_support_ring_geo = new THREE.TorusGeometry(0.148, 0.012, 12, 64);
  const bowl_support_ring = new THREE.Mesh(bowl_support_ring_geo, bright_silver_mat);
  bowl_support_ring.name = "bowl_support_ring";
  bowl_support_ring.rotation.x = Math.PI / 2;
  bowl_support_ring.position.y = 0.025;
  root.add(bowl_support_ring);

  const engraved_ornament = new THREE.Group();
  engraved_ornament.name = "engraved_ornament";
  root.add(engraved_ornament);

  function outerRadiusAt(y) {
    if (y <= -0.56) return 0.11;
    if (y < -0.43) return 0.11 + ((y + 0.56) / 0.13) * 0.025;
    if (y < -0.20) return 0.10;
    if (y < -0.06) return 0.10 + ((y + 0.20) / 0.14) * 0.055;
    if (y < 0.12) return 0.155 + ((y + 0.06) / 0.18) * 0.090;
    if (y < 0.36) return 0.245 + ((y - 0.12) / 0.24) * 0.120;
    if (y < 0.56) return 0.365 + ((y - 0.36) / 0.20) * 0.035;
    return 0.400 + ((y - 0.56) / 0.14) * 0.010;
  }

  function surfacePoint(angle, y, extra) {
    const radius = outerRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.sin(angle) * radius,
      y,
      Math.cos(angle) * radius
    );
  }

  function surfacePose(angle, y, extra) {
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const position = surfacePoint(angle, y, extra);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function addSurfaceTube(name, pairs, thickness, material, closed) {
    const points = [];
    for (let i = 0; i < pairs.length; i++) {
      points.push(surfacePoint(pairs[i][0], pairs[i][1], 0.006));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, pairs.length * 5),
      thickness,
      6,
      closed
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    engraved_ornament.add(mesh);
    return mesh;
  }

  function addSurfaceLoop(name, angle, centerY, halfAngle, halfHeight) {
    const pairs = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      pairs.push([
        angle + Math.cos(t) * halfAngle,
        centerY + Math.sin(t) * halfHeight,
      ]);
    }
    return addSurfaceTube(
      name,
      pairs,
      0.0032,
      engraving_mat,
      true
    );
  }

  function addSurfaceSpiral(
    name,
    centerAngle,
    centerY,
    angleRadius,
    heightRadius,
    turns,
    phase
  ) {
    const pairs = [];
    const count = 30;
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const shrink = 1 - t * 0.92;
      const phi = phase + t * turns * Math.PI * 2;
      pairs.push([
        centerAngle + Math.cos(phi) * angleRadius * shrink,
        centerY + Math.sin(phi) * heightRadius * shrink,
      ]);
    }
    return addSurfaceTube(
      name,
      pairs,
      0.003,
      engraving_mat,
      false
    );
  }

  function addLeafOutline(name, angle, y, tilt, length, width) {
    const dx = Math.cos(tilt) * length * 0.5;
    const dy = Math.sin(tilt) * length * 0.5;
    const px = -Math.sin(tilt) * width;
    const py = Math.cos(tilt) * width;

    const pairs = [
      [angle - dx, y - dy],
      [angle + px, y + py],
      [angle + dx, y + dy],
      [angle - px, y - py],
    ];
    return addSurfaceTube(name, pairs, 0.0028, engraving_mat, true);
  }

  const border_upper_line = addSurfaceTube(
    "border_upper_line",
    Array.from({ length: 128 }, (_, i) => [
      (i / 128) * Math.PI * 2,
      0.638,
    ]),
    0.0032,
    engraving_mat,
    true
  );

  const border_lower_line = addSurfaceTube(
    "border_lower_line",
    Array.from({ length: 128 }, (_, i) => [
      (i / 128) * Math.PI * 2,
      0.612,
    ]),
    0.0025,
    engraving_mat,
    true
  );

  const bead_count = 120;
  const border_beads_geo = new THREE.CircleGeometry(0.0042, 8);
  const border_beads = new THREE.InstancedMesh(
    border_beads_geo,
    engraving_mat,
    bead_count
  );
  border_beads.name = "border_beads";
  const bead_matrix = new THREE.Matrix4();
  for (let i = 0; i < bead_count; i++) {
    const angle = (i / bead_count) * Math.PI * 2;
    const pose = surfacePose(angle, 0.625, 0.008);
    bead_matrix.compose(
      pose.position,
      pose.quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    border_beads.setMatrixAt(i, bead_matrix);
  }
  border_beads.instanceMatrix.needsUpdate = true;
  engraved_ornament.add(border_beads);

  const panel_count = 6;
  for (let i = 0; i < panel_count; i++) {
    const angle = (i / panel_count) * Math.PI * 2;

    addSurfaceLoop(
      "main_scroll_panel_" + i,
      angle,
      0.365,
      0.255,
      0.205
    );

    addSurfaceSpiral(
      "upper_left_scroll_" + i,
      angle - 0.105,
      0.475,
      0.125,
      0.085,
      1.28,
      0.25
    );
    addSurfaceSpiral(
      "upper_right_scroll_" + i,
      angle + 0.105,
      0.475,
      0.125,
      0.085,
      1.28,
      Math.PI - 0.25
    );
    addSurfaceSpiral(
      "lower_left_scroll_" + i,
      angle - 0.105,
      0.255,
      0.125,
      0.090,
      1.22,
      Math.PI + 0.35
    );
    addSurfaceSpiral(
      "lower_right_scroll_" + i,
      angle + 0.105,
      0.255,
      0.125,
      0.090,
      1.22,
      -0.35
    );

    addSurfaceTube(
      "central_stem_" + i,
      [
        [angle, 0.155],
        [angle - 0.025, 0.235],
        [angle + 0.018, 0.330],
        [angle - 0.015, 0.430],
        [angle, 0.535],
      ],
      0.0032,
      engraving_mat,
      false
    );

    addSurfaceTube(
      "left_branch_" + i,
      [
        [angle, 0.285],
        [angle - 0.075, 0.335],
        [angle - 0.165, 0.390],
        [angle - 0.225, 0.455],
      ],
      0.0028,
      engraving_mat,
      false
    );
    addSurfaceTube(
      "right_branch_" + i,
      [
        [angle, 0.285],
        [angle + 0.075, 0.335],
        [angle + 0.165, 0.390],
        [angle + 0.225, 0.455],
      ],
      0.0028,
      engraving_mat,
      false
    );

    addSurfaceTube(
      "lower_left_flourish_" + i,
      [
        [angle, 0.205],
        [angle - 0.075, 0.170],
        [angle - 0.165, 0.185],
        [angle - 0.225, 0.235],
      ],
      0.0028,
      engraving_mat,
      false
    );
    addSurfaceTube(
      "lower_right_flourish_" + i,
      [
        [angle, 0.205],
        [angle + 0.075, 0.170],
        [angle + 0.165, 0.185],
        [angle + 0.225, 0.235],
      ],
      0.0028,
      engraving_mat,
      false
    );

    addLeafOutline(
      "central_leaf_" + i,
      angle,
      0.405,
      Math.PI / 2,
      0.135,
      0.025
    );
    addLeafOutline(
      "left_acanthus_leaf_" + i,
      angle - 0.085,
      0.355,
      2.45,
      0.105,
      0.021
    );
    addLeafOutline(
      "right_acanthus_leaf_" + i,
      angle + 0.085,
      0.355,
      0.69,
      0.105,
      0.021
    );
    addLeafOutline(
      "lower_leaf_" + i,
      angle,
      0.185,
      -Math.PI / 2,
      0.115,
      0.022
    );
    addLeafOutline(
      "upper_left_leaf_" + i,
      angle - 0.155,
      0.445,
      2.85,
      0.090,
      0.018
    );
    addLeafOutline(
      "upper_right_leaf_" + i,
      angle + 0.155,
      0.445,
      0.29,
      0.090,
      0.018
    );
  }

  const leaf_specs = [];
  for (let i = 0; i < panel_count; i++) {
    const angle = (i / panel_count) * Math.PI * 2;
    leaf_specs.push(
      [angle, 0.405, Math.PI / 2, 1.35, 0.25],
      [angle - 0.085, 0.355, 2.45, 1.05, 0.21],
      [angle + 0.085, 0.355, 0.69, 1.05, 0.21],
      [angle, 0.185, -Math.PI / 2, 1.15, 0.22],
      [angle - 0.155, 0.445, 2.85, 0.90, 0.18],
      [angle + 0.155, 0.445, 0.29, 0.90, 0.18]
    );
  }

  const ornamental_leaves_shape = new THREE.Shape();
  ornamental_leaves_shape.moveTo(0, 0.055);
  ornamental_leaves_shape.bezierCurveTo(
    0.028, 0.030,
    0.030, -0.020,
    0, -0.055
  );
  ornamental_leaves_shape.bezierCurveTo(
    -0.030, -0.020,
    -0.028, 0.030,
    0, 0.055
  );
  const ornamental_leaves_geo = new THREE.ShapeGeometry(
    ornamental_leaves_shape,
    10
  );
  const ornamental_leaves = new THREE.InstancedMesh(
    ornamental_leaves_geo,
    engraving_mat,
    leaf_specs.length
  );
  ornamental_leaves.name = "ornamental_leaves";

  const leaf_inlays = new THREE.InstancedMesh(
    ornamental_leaves_geo,
    polished_silver_mat,
    leaf_specs.length
  );
  leaf_inlays.name = "leaf_inlays";

  const leaf_matrix = new THREE.Matrix4();
  const local_rotation = new THREE.Quaternion();
  const z_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < leaf_specs.length; i++) {
    const spec = leaf_specs[i];
    const pose = surfacePose(spec[0], spec[1], 0.008);
    local_rotation.setFromAxisAngle(z_axis, spec[2]);
    const orientation = pose.quaternion.clone().multiply(local_rotation);

    leaf_matrix.compose(
      pose.position,
      orientation,
      new THREE.Vector3(spec[4], spec[3], 1)
    );
    ornamental_leaves.setMatrixAt(i, leaf_matrix);

    const inlay_pose = surfacePose(spec[0], spec[1], 0.010);
    leaf_matrix.compose(
      inlay_pose.position,
      orientation,
      new THREE.Vector3(spec[4] * 0.62, spec[3] * 0.78, 1)
    );
    leaf_inlays.setMatrixAt(i, leaf_matrix);
  }
  ornamental_leaves.instanceMatrix.needsUpdate = true;
  leaf_inlays.instanceMatrix.needsUpdate = true;
  engraved_ornament.add(ornamental_leaves);
  engraved_ornament.add(leaf_inlays);

  const ornamental_rosettes_shape = new THREE.Shape();
  ornamental_rosettes_shape.moveTo(0, 0.020);
  ornamental_rosettes_shape.lineTo(0.010, 0.006);
  ornamental_rosettes_shape.lineTo(0.020, 0);
  ornamental_rosettes_shape.lineTo(0.010, -0.006);
  ornamental_rosettes_shape.lineTo(0, -0.020);
  ornamental_rosettes_shape.lineTo(-0.010, -0.006);
  ornamental_rosettes_shape.lineTo(-0.020, 0);
  ornamental_rosettes_shape.lineTo(-0.010, 0.006);
  ornamental_rosettes_shape.closePath();

  const ornamental_rosettes_geo = new THREE.ShapeGeometry(
    ornamental_rosettes_shape
  );
  const ornamental_rosettes = new THREE.InstancedMesh(
    ornamental_rosettes_geo,
    engraving_mat,
    panel_count
  );
  ornamental_rosettes.name = "ornamental_rosettes";

  const rosette_matrix = new THREE.Matrix4();
  for (let i = 0; i < panel_count; i++) {
    const angle = (i / panel_count) * Math.PI * 2;
    const pose = surfacePose(angle, 0.525, 0.009);
    rosette_matrix.compose(
      pose.position,
      pose.quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    ornamental_rosettes.setMatrixAt(i, rosette_matrix);
  }
  ornamental_rosettes.instanceMatrix.needsUpdate = true;
  engraved_ornament.add(ornamental_rosettes);

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
