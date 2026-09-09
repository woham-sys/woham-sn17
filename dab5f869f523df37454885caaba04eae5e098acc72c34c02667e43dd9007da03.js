function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "gold_bar_necklace";

  const chain_group = new THREE.Group();
  chain_group.name = "chain_group";
  root.add(chain_group);

  const pendant_group = new THREE.Group();
  pendant_group.name = "pendant_group";
  root.add(pendant_group);

  const gold_material = new THREE.MeshStandardMaterial({
    color: 0xd6a64a,
    metalness: 0.75,
    roughness: 0.18,
  });

  const bright_gold_material = new THREE.MeshStandardMaterial({
    color: 0xf0c76d,
    metalness: 0.7,
    roughness: 0.16,
  });

  const dark_gold_material = new THREE.MeshStandardMaterial({
    color: 0x80571f,
    metalness: 0.65,
    roughness: 0.22,
  });

  const highlight_material = new THREE.MeshStandardMaterial({
    color: 0xfff2cf,
    metalness: 0.35,
    roughness: 0.12,
  });

  function create_capsule_link_geometry(half_width, half_straight, tube_radius) {
    const points = [];
    const curve_radius = half_width;
    const line_y = half_straight;
    const upper_center = line_y + curve_radius;
    const lower_center = -line_y - curve_radius;
    const upper_start = Math.atan2(curve_radius, line_y);
    const lower_end = Math.PI + upper_start;
    const arc_steps = 10;

    for (let i = 0; i <= arc_steps; i++) {
      const angle = upper_start + (lower_end - upper_start) * (i / arc_steps);
      points.push(new THREE.Vector3(
        Math.cos(angle) * curve_radius,
        upper_center + Math.sin(angle) * curve_radius,
        0
      ));
    }

    for (let i = 1; i < arc_steps; i++) {
      const t = i / arc_steps;
      points.push(new THREE.Vector3(
        -curve_radius,
        lower_center + (upper_center - lower_center) * t,
        0
      ));
    }

    for (let i = 0; i <= arc_steps; i++) {
      const angle = lower_end - (lower_end - upper_start) * (i / arc_steps);
      points.push(new THREE.Vector3(
        Math.cos(angle) * curve_radius,
        lower_center + Math.sin(angle) * curve_radius,
        0
      ));
    }

    for (let i = 1; i < arc_steps; i++) {
      const t = i / arc_steps;
      points.push(new THREE.Vector3(
        curve_radius,
        upper_center + (lower_center - upper_center) * t,
        0
      ));
    }

    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 64, tube_radius, 8, true);
  }

  const chain_link_count = 15;
  const chain_link_spacing = 0.108;
  const chain_link_tilt = 0.14;
  const chain_links_geometry = create_capsule_link_geometry(0.034, 0.052, 0.009);
  const chain_links = new THREE.InstancedMesh(
    chain_links_geometry,
    gold_material,
    chain_link_count * 2
  );
  chain_links.name = "chain_links";

  const link_dummy = new THREE.Object3D();
  const z_axis = new THREE.Vector3(0, 0, 1);
  const y_axis = new THREE.Vector3(0, 1, 0);
  let link_index = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < chain_link_count; i++) {
      const x = side * (0.078 + i * chain_link_spacing);
      const y = 0.018 + i * 0.083;
      const alternating_twist = i % 2 === 0 ? 0.48 : -0.48;
      const twist = side * alternating_twist;

      const align_quaternion = new THREE.Quaternion().setFromAxisAngle(
        z_axis,
        -side * chain_link_tilt
      );
      const twist_quaternion = new THREE.Quaternion().setFromAxisAngle(
        y_axis,
        twist
      );

      link_dummy.position.set(x, y, i % 2 === 0 ? 0.004 : -0.004);
      link_dummy.quaternion.copy(align_quaternion).multiply(twist_quaternion);
      link_dummy.scale.set(1, 1, 1);
      link_dummy.updateMatrix();
      chain_links.setMatrixAt(link_index++, link_dummy.matrix);
    }
  }

  chain_links.instanceMatrix.needsUpdate = true;
  chain_group.add(chain_links);

  const connector_ring_geometry = new THREE.TorusGeometry(0.043, 0.009, 10, 28);

  const left_connector_ring = new THREE.Mesh(connector_ring_geometry, gold_material);
  left_connector_ring.name = "left_connector_ring";
  left_connector_ring.position.set(-0.073, -0.018, 0.012);
  left_connector_ring.rotation.z = -chain_link_tilt;
  left_connector_ring.rotation.y = 0.28;
  left_connector_ring.scale.set(0.78, 1.18, 1);
  chain_group.add(left_connector_ring);

  const right_connector_ring = new THREE.Mesh(connector_ring_geometry, gold_material);
  right_connector_ring.name = "right_connector_ring";
  right_connector_ring.position.set(0.073, -0.018, 0.012);
  right_connector_ring.rotation.z = chain_link_tilt;
  right_connector_ring.rotation.y = -0.28;
  right_connector_ring.scale.set(0.78, 1.18, 1);
  chain_group.add(right_connector_ring);

  const pendant_body_shape = new THREE.Shape();
  pendant_body_shape.moveTo(-0.075, 0.105);
  pendant_body_shape.lineTo(0.075, 0.105);
  pendant_body_shape.bezierCurveTo(0.09, 0.105, 0.098, 0.088, 0.101, 0.065);
  pendant_body_shape.lineTo(0.126, -0.505);
  pendant_body_shape.bezierCurveTo(0.129, -0.565, 0.087, -0.607, 0, -0.612);
  pendant_body_shape.bezierCurveTo(-0.087, -0.607, -0.129, -0.565, -0.126, -0.505);
  pendant_body_shape.lineTo(-0.101, 0.065);
  pendant_body_shape.bezierCurveTo(-0.098, 0.088, -0.09, 0.105, -0.075, 0.105);
  pendant_body_shape.closePath();

  const pendant_body_geometry = new THREE.ExtrudeGeometry(pendant_body_shape, {
    curveSegments: 24,
    steps: 1,
    depth: 0.07,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  pendant_body_geometry.translate(0, 0, -0.035);

  const pendant_body = new THREE.Mesh(pendant_body_geometry, gold_material);
  pendant_body.name = "pendant_body";
  pendant_group.add(pendant_body);

  const pendant_front_rim_shape = new THREE.Shape();
  pendant_front_rim_shape.moveTo(-0.058, 0.078);
  pendant_front_rim_shape.lineTo(0.058, 0.078);
  pendant_front_rim_shape.bezierCurveTo(0.069, 0.078, 0.075, 0.061, 0.077, 0.041);
  pendant_front_rim_shape.lineTo(0.098, -0.493);
  pendant_front_rim_shape.bezierCurveTo(0.101, -0.535, 0.067, -0.566, 0, -0.571);
  pendant_front_rim_shape.bezierCurveTo(-0.067, -0.566, -0.101, -0.535, -0.098, -0.493);
  pendant_front_rim_shape.lineTo(-0.077, 0.041);
  pendant_front_rim_shape.bezierCurveTo(-0.075, 0.061, -0.069, 0.078, -0.058, 0.078);
  pendant_front_rim_shape.closePath();

  const pendant_front_rim_geometry = new THREE.ShapeGeometry(pendant_front_rim_shape, 24);
  const pendant_front_rim = new THREE.Mesh(pendant_front_rim_geometry, dark_gold_material);
  pendant_front_rim.name = "pendant_front_rim";
  pendant_front_rim.position.z = 0.049;
  pendant_group.add(pendant_front_rim);

  const pendant_front_panel_shape = new THREE.Shape();
  pendant_front_panel_shape.moveTo(-0.047, 0.061);
  pendant_front_panel_shape.lineTo(0.047, 0.061);
  pendant_front_panel_shape.bezierCurveTo(0.056, 0.061, 0.061, 0.047, 0.063, 0.029);
  pendant_front_panel_shape.lineTo(0.081, -0.474);
  pendant_front_panel_shape.bezierCurveTo(0.084, -0.511, 0.055, -0.541, 0, -0.546);
  pendant_front_panel_shape.bezierCurveTo(-0.055, -0.541, -0.084, -0.511, -0.081, -0.474);
  pendant_front_panel_shape.lineTo(-0.063, 0.029);
  pendant_front_panel_shape.bezierCurveTo(-0.061, 0.047, -0.056, 0.061, -0.047, 0.061);
  pendant_front_panel_shape.closePath();

  const pendant_front_panel_geometry = new THREE.ShapeGeometry(pendant_front_panel_shape, 24);
  const pendant_front_panel = new THREE.Mesh(
    pendant_front_panel_geometry,
    bright_gold_material
  );
  pendant_front_panel.name = "pendant_front_panel";
  pendant_front_panel.position.z = 0.051;
  pendant_group.add(pendant_front_panel);

  const pendant_highlight_shape = new THREE.Shape();
  pendant_highlight_shape.moveTo(-0.034, 0.035);
  pendant_highlight_shape.lineTo(-0.019, 0.041);
  pendant_highlight_shape.lineTo(0.043, -0.458);
  pendant_highlight_shape.bezierCurveTo(0.041, -0.486, 0.025, -0.507, 0, -0.513);
  pendant_highlight_shape.lineTo(-0.041, -0.493);
  pendant_highlight_shape.closePath();

  const pendant_highlight_geometry = new THREE.ShapeGeometry(pendant_highlight_shape, 16);
  const pendant_highlight = new THREE.Mesh(pendant_highlight_geometry, highlight_material);
  pendant_highlight.name = "pendant_highlight";
  pendant_highlight.position.z = 0.053;
  pendant_group.add(pendant_highlight);

  const pendant_top_cap_shape = new THREE.Shape();
  pendant_top_cap_shape.moveTo(-0.058, 0.078);
  pendant_top_cap_shape.lineTo(0.058, 0.078);
  pendant_top_cap_shape.lineTo(0.069, 0.043);
  pendant_top_cap_shape.lineTo(-0.067, 0.043);
  pendant_top_cap_shape.closePath();

  const pendant_top_cap_geometry = new THREE.ShapeGeometry(pendant_top_cap_shape);
  const pendant_top_cap = new THREE.Mesh(pendant_top_cap_geometry, bright_gold_material);
  pendant_top_cap.name = "pendant_top_cap";
  pendant_top_cap.position.z = 0.054;
  pendant_group.add(pendant_top_cap);

  const pendant_left_edge_curve = new THREE.LineCurve3(
    new THREE.Vector3(-0.067, 0.047, 0.055),
    new THREE.Vector3(-0.086, -0.485, 0.055)
  );
  const pendant_left_edge_geometry = new THREE.TubeGeometry(
    pendant_left_edge_curve,
    1,
    0.0038,
    6,
    false
  );
  const pendant_left_edge = new THREE.Mesh(
    pendant_left_edge_geometry,
    dark_gold_material
  );
  pendant_left_edge.name = "pendant_left_edge";
  pendant_group.add(pendant_left_edge);

  const pendant_right_edge_curve = new THREE.LineCurve3(
    new THREE.Vector3(0.067, 0.047, 0.055),
    new THREE.Vector3(0.086, -0.485, 0.055)
  );
  const pendant_right_edge_geometry = new THREE.TubeGeometry(
    pendant_right_edge_curve,
    1,
    0.0038,
    6,
    false
  );
  const pendant_right_edge = new THREE.Mesh(
    pendant_right_edge_geometry,
    dark_gold_material
  );
  pendant_right_edge.name = "pendant_right_edge";
  pendant_group.add(pendant_right_edge);

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
