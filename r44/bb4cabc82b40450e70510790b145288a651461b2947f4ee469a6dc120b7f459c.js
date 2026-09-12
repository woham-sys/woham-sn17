// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "panoramic_camera";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x292b2d,
    metalness: 0.0,
    roughness: 0.8,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x333537,
    metalness: 0.0,
    roughness: 0.8,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x111213,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glossy_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x87918c,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x28302d,
    emissiveIntensity: 0.25,
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x55585a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0xd6d8d8,
    metalness: 0.0,
    roughness: 0.7,
  });
  const lens_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x806f82,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const lens_backMat = new THREE.MeshStandardMaterial({
    color: 0x201d24,
    metalness: 0.0,
    roughness: 0.3,
  });
  const lens_purpleMat = new THREE.MeshStandardMaterial({
    color: 0x765d75,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.55,
  });
  const lens_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xb9afc1,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.42,
  });

  function createRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    return shape;
  }

  function createRoundedExtrude(width, height, radius, depth, bevel) {
    return new THREE.ExtrudeGeometry(
      createRoundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 2,
      }
    );
  }

  function createSphericalPatchGeometry(radius, centerAngle, centerY, width, height, rings, segments) {
    const positions = [];
    const normals = [];
    const indices = [];

    function addPoint(angle, y) {
      const horizontalRadius = Math.sqrt(Math.max(0, radius * radius - y * y));
      const nx = Math.sin(angle) * horizontalRadius / radius;
      const ny = y / radius;
      const nz = Math.cos(angle) * horizontalRadius / radius;
      positions.push(nx * radius, ny * radius, nz * radius);
      normals.push(nx, ny, nz);
    }

    addPoint(centerAngle, centerY);

    for (let ring = 1; ring <= rings; ring++) {
      const t = ring / rings;
      for (let i = 0; i < segments; i++) {
        const phase = i / segments * Math.PI * 2;
        const angle = centerAngle + Math.cos(phase) * width * t;
        const y = centerY + Math.sin(phase) * height * t;
        addPoint(angle, y);
      }
    }

    for (let i = 0; i < segments; i++) {
      indices.push(0, 1 + i, 1 + (i + 1) % segments);
    }

    for (let ring = 1; ring < rings; ring++) {
      const innerStart = 1 + (ring - 1) * segments;
      const outerStart = 1 + ring * segments;
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = innerStart + i;
        const b = outerStart + i;
        const c = outerStart + next;
        const d = innerStart + next;
        indices.push(a, b, c, a, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createSphericalBorderGeometry(
    radius,
    centerAngle,
    centerY,
    width,
    height,
    segments
  ) {
    const points = [];
    for (let i = 0; i < segments; i++) {
      const phase = i / segments * Math.PI * 2;
      const angle = centerAngle + Math.cos(phase) * width;
      const y = centerY + Math.sin(phase) * height;
      const horizontalRadius = Math.sqrt(Math.max(0, radius * radius - y * y));
      points.push(new THREE.Vector3(
        Math.sin(angle) * horizontalRadius,
        y,
        Math.cos(angle) * horizontalRadius
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, segments * 2, 0.007, 6, true);
  }

  function addBrandBar(parent, x, y, z, width, height, rotation) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, 0.004),
      markingMat
    );
    bar.position.set(x, y, z);
    bar.rotation.z = rotation || 0;
    parent.add(bar);
    return bar;
  }

  const base_bottomGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.07, 64);
  const base_bottom = new THREE.Mesh(base_bottomGeom, bodyMat);
  base_bottom.name = "base_bottom";
  base_bottom.position.y = 0.035;
  root.add(base_bottom);

  const base_lower_seamGeom = new THREE.TorusGeometry(0.413, 0.008, 8, 64);
  const base_lower_seam = new THREE.Mesh(base_lower_seamGeom, edgeMat);
  base_lower_seam.name = "base_lower_seam";
  base_lower_seam.rotation.x = Math.PI / 2;
  base_lower_seam.position.y = 0.073;
  root.add(base_lower_seam);

  const base_pedestalProfile = [
    new THREE.Vector2(0.00, 0.06),
    new THREE.Vector2(0.40, 0.06),
    new THREE.Vector2(0.43, 0.08),
    new THREE.Vector2(0.43, 0.12),
    new THREE.Vector2(0.40, 0.15),
    new THREE.Vector2(0.34, 0.19),
    new THREE.Vector2(0.27, 0.22),
    new THREE.Vector2(0.245, 0.25),
    new THREE.Vector2(0.00, 0.25),
  ];
  const base_pedestalGeom = new THREE.LatheGeometry(base_pedestalProfile, 64);
  const base_pedestal = new THREE.Mesh(base_pedestalGeom, bodyMat);
  base_pedestal.name = "base_pedestal";
  root.add(base_pedestal);

  const base_collarGeom = new THREE.CylinderGeometry(0.245, 0.255, 0.075, 64);
  const base_collar = new THREE.Mesh(base_collarGeom, bodyMat);
  base_collar.name = "base_collar";
  base_collar.position.y = 0.265;
  root.add(base_collar);

  const base_collar_seamGeom = new THREE.TorusGeometry(0.238, 0.007, 8, 64);
  const base_collar_seam = new THREE.Mesh(base_collar_seamGeom, edgeMat);
  base_collar_seam.name = "base_collar_seam";
  base_collar_seam.rotation.x = Math.PI / 2;
  base_collar_seam.position.y = 0.302;
  root.add(base_collar_seam);

  const base_screwGeom = new THREE.CylinderGeometry(0.017, 0.017, 0.007, 20);
  const base_screw = new THREE.Mesh(base_screwGeom, edgeMat);
  base_screw.name = "base_screw";
  base_screw.position.set(0.31, 0.158, 0.17);
  root.add(base_screw);

  const column_bodyGeom = new THREE.CylinderGeometry(0.215, 0.225, 0.78, 64);
  const column_body = new THREE.Mesh(column_bodyGeom, bodyMat);
  column_body.name = "column_body";
  column_body.position.y = 0.69;
  root.add(column_body);

  const column_top_collarGeom = new THREE.CylinderGeometry(0.225, 0.215, 0.07, 64);
  const column_top_collar = new THREE.Mesh(column_top_collarGeom, bodyMat);
  column_top_collar.name = "column_top_collar";
  column_top_collar.position.y = 1.075;
  root.add(column_top_collar);

  const column_seamGeom = new THREE.TorusGeometry(0.216, 0.004, 6, 64);
  const column_seam = new THREE.Mesh(column_seamGeom, edgeMat);
  column_seam.name = "column_seam";
  column_seam.rotation.x = Math.PI / 2;
  column_seam.position.y = 0.43;
  root.add(column_seam);

  const column_ventShape = createRoundedRectShape(0.065, 0.29, 0.032);
  const column_ventGeom = new THREE.ExtrudeGeometry(column_ventShape, {
    depth: 0.009,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const column_vent = new THREE.Mesh(column_ventGeom, edgeMat);
  column_vent.name = "column_vent";
  const columnVentAngle = 0.58;
  column_vent.position.set(
    Math.sin(columnVentAngle) * 0.218,
    0.69,
    Math.cos(columnVentAngle) * 0.218
  );
  column_vent.rotation.y = columnVentAngle;
  root.add(column_vent);

  const logo_badgeGeom = new THREE.CylinderGeometry(0.061, 0.061, 0.014, 32);
  const logo_badge = new THREE.Mesh(logo_badgeGeom, glossy_plasticMat);
  logo_badge.name = "logo_badge";
  const logoAngle = -0.48;
  const logoNormal = new THREE.Vector3(
    Math.sin(logoAngle),
    0,
    Math.cos(logoAngle)
  );
  logo_badge.position.copy(logoNormal).multiplyScalar(0.226);
  logo_badge.position.y = 0.56;
  logo_badge.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    logoNormal
  );
  root.add(logo_badge);

  const logo_mark = new THREE.Group();
  logo_mark.name = "logo_mark";
  logo_mark.position.copy(logoNormal).multiplyScalar(0.236);
  logo_mark.position.y = 0.56;
  logo_mark.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    logoNormal
  );
  root.add(logo_mark);

  const logo_mark_ringGeom = new THREE.TorusGeometry(0.043, 0.0035, 6, 32);
  const logo_mark_ring = new THREE.Mesh(logo_mark_ringGeom, edgeMat);
  logo_mark_ring.name = "logo_mark_ring";
  logo_mark.add(logo_mark_ring);

  const logo_mark_v_left = new THREE.Mesh(
    new THREE.BoxGeometry(0.006, 0.048, 0.004),
    edgeMat
  );
  logo_mark_v_left.name = "logo_mark_v_left";
  logo_mark_v_left.position.set(-0.013, 0.002, 0.004);
  logo_mark_v_left.rotation.z = -0.48;
  logo_mark.add(logo_mark_v_left);

  const logo_mark_v_right = new THREE.Mesh(
    new THREE.BoxGeometry(0.006, 0.048, 0.004),
    edgeMat
  );
  logo_mark_v_right.name = "logo_mark_v_right";
  logo_mark_v_right.position.set(0.013, 0.002, 0.004);
  logo_mark_v_right.rotation.z = 0.48;
  logo_mark.add(logo_mark_v_right);

  const logo_mark_stem = new THREE.Mesh(
    new THREE.BoxGeometry(0.006, 0.045, 0.004),
    edgeMat
  );
  logo_mark_stem.name = "logo_mark_stem";
  logo_mark_stem.position.set(0, -0.018, 0.004);
  logo_mark.add(logo_mark_stem);

  const head_shellProfile = [
    new THREE.Vector2(0.00, 1.02),
    new THREE.Vector2(0.27, 1.02),
    new THREE.Vector2(0.38, 1.08),
    new THREE.Vector2(0.46, 1.20),
    new THREE.Vector2(0.50, 1.36),
    new THREE.Vector2(0.50, 1.55),
    new THREE.Vector2(0.47, 1.72),
    new THREE.Vector2(0.40, 1.88),
    new THREE.Vector2(0.29, 1.99),
    new THREE.Vector2(0.15, 2.05),
    new THREE.Vector2(0.00, 2.07),
  ];
  const head_shellGeom = new THREE.LatheGeometry(head_shellProfile, 64);
  const head_shell = new THREE.Mesh(head_shellGeom, bodyMat);
  head_shell.name = "head_shell";
  root.add(head_shell);

  const head_seamGeom = new THREE.TorusGeometry(0.497, 0.008, 8, 80);
  const head_seam = new THREE.Mesh(head_seamGeom, edgeMat);
  head_seam.name = "head_seam";
  head_seam.rotation.x = Math.PI / 2;
  head_seam.position.y = 1.34;
  root.add(head_seam);

  const right_shell_panelGeom = createSphericalPatchGeometry(
    0.504,
    0.62,
    1.69,
    0.43,
    0.34,
    6,
    32
  );
  const right_shell_panel = new THREE.Mesh(right_shell_panelGeom, panelMat);
  right_shell_panel.name = "right_shell_panel";
  root.add(right_shell_panel);

  const right_shell_panel_borderGeom = createSphericalBorderGeometry(
    0.508,
    0.62,
    1.69,
    0.43,
    0.34,
    32
  );
  const right_shell_panel_border = new THREE.Mesh(
    right_shell_panel_borderGeom,
    edgeMat
  );
  right_shell_panel_border.name = "right_shell_panel_border";
  root.add(right_shell_panel_border);

  const left_shell_panelGeom = createSphericalPatchGeometry(
    0.504,
    -0.82,
    1.69,
    0.34,
    0.31,
    5,
    28
  );
  const left_shell_panel = new THREE.Mesh(left_shell_panelGeom, panelMat);
  left_shell_panel.name = "left_shell_panel";
  root.add(left_shell_panel);

  const left_shell_panel_borderGeom = createSphericalBorderGeometry(
    0.508,
    -0.82,
    1.69,
    0.34,
    0.31,
    28
  );
  const left_shell_panel_border = new THREE.Mesh(
    left_shell_panel_borderGeom,
    edgeMat
  );
  left_shell_panel_border.name = "left_shell_panel_border";
  root.add(left_shell_panel_border);

  const lens_mountGeom = new THREE.CylinderGeometry(0.195, 0.205, 0.12, 48);
  const lens_mount = new THREE.Mesh(lens_mountGeom, bodyMat);
  lens_mount.name = "lens_mount";
  lens_mount.rotation.x = Math.PI / 2;
  lens_mount.position.set(-0.31, 1.63, 0.405);
  root.add(lens_mount);

  const lens_barrelGeom = new THREE.CylinderGeometry(0.18, 0.19, 0.15, 48);
  const lens_barrel = new THREE.Mesh(lens_barrelGeom, glossy_plasticMat);
  lens_barrel.name = "lens_barrel";
  lens_barrel.rotation.x = Math.PI / 2;
  lens_barrel.position.set(-0.31, 1.63, 0.475);
  root.add(lens_barrel);

  const lens_outer_ringGeom = new THREE.TorusGeometry(0.145, 0.026, 12, 48);
  const lens_outer_ring = new THREE.Mesh(lens_outer_ringGeom, glossy_plasticMat);
  lens_outer_ring.name = "lens_outer_ring";
  lens_outer_ring.position.set(-0.31, 1.63, 0.552);
  root.add(lens_outer_ring);

  const lens_inner_ringGeom = new THREE.TorusGeometry(0.112, 0.009, 10, 48);
  const lens_inner_ring = new THREE.Mesh(lens_inner_ringGeom, edgeMat);
  lens_inner_ring.name = "lens_inner_ring";
  lens_inner_ring.position.set(-0.31, 1.63, 0.558);
  root.add(lens_inner_ring);

  const lens_backGeom = new THREE.CylinderGeometry(0.108, 0.108, 0.012, 48);
  const lens_back = new THREE.Mesh(lens_backGeom, lens_backMat);
  lens_back.name = "lens_back";
  lens_back.rotation.x = Math.PI / 2;
  lens_back.position.set(-0.31, 1.63, 0.553);
  root.add(lens_back);

  const lens_glassGeom = new THREE.CylinderGeometry(0.103, 0.103, 0.012, 48);
  const lens_glass = new THREE.Mesh(lens_glassGeom, lens_glassMat);
  lens_glass.name = "lens_glass";
  lens_glass.rotation.x = Math.PI / 2;
  lens_glass.position.set(-0.31, 1.63, 0.562);
  root.add(lens_glass);

  const lens_purple_reflectionGeom = new THREE.CircleGeometry(0.045, 24);
  const lens_purple_reflection = new THREE.Mesh(
    lens_purple_reflectionGeom,
    lens_purpleMat
  );
  lens_purple_reflection.name = "lens_purple_reflection";
  lens_purple_reflection.position.set(-0.337, 1.655, 0.570);
  lens_purple_reflection.scale.set(0.7, 1.25, 1);
  root.add(lens_purple_reflection);

  const lens_highlightGeom = new THREE.CircleGeometry(0.025, 20);
  const lens_highlight = new THREE.Mesh(lens_highlightGeom, lens_highlightMat);
  lens_highlight.name = "lens_highlight";
  lens_highlight.position.set(-0.286, 1.674, 0.571);
  lens_highlight.scale.set(0.65, 1.2, 1);
  root.add(lens_highlight);

  const control_panelGeom = createRoundedExtrude(0.36, 0.25, 0.045, 0.026, 0.007);
  const control_panel = new THREE.Mesh(control_panelGeom, glossy_plasticMat);
  control_panel.name = "control_panel";
  control_panel.position.set(0.22, 1.18, 0.445);
  root.add(control_panel);

  const control_screenGeom = createRoundedExtrude(0.205, 0.13, 0.012, 0.006, 0.002);
  const control_screen = new THREE.Mesh(control_screenGeom, screenMat);
  control_screen.name = "control_screen";
  control_screen.position.set(0.205, 1.205, 0.479);
  root.add(control_screen);

  const control_buttonGeom = new THREE.CylinderGeometry(0.017, 0.017, 0.008, 20);
  const control_buttons = new THREE.InstancedMesh(
    control_buttonGeom,
    buttonMat,
    4
  );
  control_buttons.name = "control_buttons";
  const controlButtonPositions = [
    [0.075, 1.245, 0.486],
    [0.075, 1.135, 0.486],
    [0.355, 1.245, 0.486],
    [0.355, 1.135, 0.486],
  ];
  const controlButtonDummy = new THREE.Object3D();
  for (let i = 0; i < controlButtonPositions.length; i++) {
    const p = controlButtonPositions[i];
    controlButtonDummy.position.set(p[0], p[1], p[2]);
    controlButtonDummy.rotation.set(Math.PI / 2, 0, 0);
    controlButtonDummy.updateMatrix();
    control_buttons.setMatrixAt(i, controlButtonDummy.matrix);
  }
  control_buttons.instanceMatrix.needsUpdate = true;
  root.add(control_buttons);

  const control_button_marks = new THREE.Group();
  control_button_marks.name = "control_button_marks";
  for (let i = 0; i < controlButtonPositions.length; i++) {
    const p = controlButtonPositions[i];
    const mark = new THREE.Mesh(
      new THREE.BoxGeometry(0.010, 0.0025, 0.0025),
      edgeMat
    );
    mark.position.set(p[0], p[1], 0.492);
    control_button_marks.add(mark);
  }
  root.add(control_button_marks);

  const brand_mark = new THREE.Group();
  brand_mark.name = "brand_mark";
  brand_mark.position.set(0.225, 1.092, 0.489);
  root.add(brand_mark);

  addBrandBar(brand_mark, -0.055, 0.000, 0, 0.004, 0.026, 0);
  addBrandBar(brand_mark, -0.047, 0.011, 0, 0.014, 0.003, 0);
  addBrandBar(brand_mark, -0.047, 0.000, 0, 0.012, 0.003, 0);
  addBrandBar(brand_mark, -0.047, -0.011, 0, 0.014, 0.003, 0);
  addBrandBar(brand_mark, -0.027, 0.000, 0, 0.004, 0.026, 0);
  addBrandBar(brand_mark, -0.018, 0.011, 0, 0.014, 0.003, 0);
  addBrandBar(brand_mark, -0.018, 0.000, 0, 0.012, 0.003, 0);
  addBrandBar(brand_mark, -0.018, -0.011, 0, 0.014, 0.003, 0);
  addBrandBar(brand_mark, 0.002, 0.000, 0, 0.004, 0.026, 0);
  addBrandBar(brand_mark, 0.011, 0.011, 0, 0.014, 0.003, 0);
  addBrandBar(brand_mark, 0.011, 0.000, 0, 0.012, 0.003, 0);
  addBrandBar(brand_mark, 0.011, -0.011, 0, 0.014, 0.003, 0);
  addBrandBar(brand_mark, 0.031, 0.000, 0, 0.004, 0.026, 0);
  addBrandBar(brand_mark, 0.040, 0.011, 0, 0.014, 0.003, 0);
  addBrandBar(brand_mark, 0.040, 0.000, 0, 0.012, 0.003, 0);
  addBrandBar(brand_mark, 0.040, -0.011, 0, 0.014, 0.003, 0);

  const body_ventGeom = new THREE.BoxGeometry(0.012, 0.052, 0.008);
  const body_vents = new THREE.InstancedMesh(body_ventGeom, edgeMat, 4);
  body_vents.name = "body_vents";
  const bodyVentDummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = -0.69 + i * 0.045;
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    bodyVentDummy.position.set(normal.x * 0.468, 1.105, normal.z * 0.468);
    bodyVentDummy.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    bodyVentDummy.updateMatrix();
    body_vents.setMatrixAt(i, bodyVentDummy.matrix);
  }
  body_vents.instanceMatrix.needsUpdate = true;
  root.add(body_vents);

  const upper_sensorGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 20);
  const upper_sensor = new THREE.Mesh(upper_sensorGeom, edgeMat);
  upper_sensor.name = "upper_sensor";
  const upperSensorAngle = -0.82;
  const upperSensorNormal = new THREE.Vector3(
    Math.sin(upperSensorAngle),
    0,
    Math.cos(upperSensorAngle)
  );
  upper_sensor.position.copy(upperSensorNormal).multiplyScalar(0.468);
  upper_sensor.position.y = 1.205;
  upper_sensor.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    upperSensorNormal
  );
  root.add(upper_sensor);

  const lower_portGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.008, 24);
  const lower_port = new THREE.Mesh(lower_portGeom, edgeMat);
  lower_port.name = "lower_port";
  const lowerPortAngle = 0.52;
  const lowerPortNormal = new THREE.Vector3(
    Math.sin(lowerPortAngle),
    0,
    Math.cos(lowerPortAngle)
  );
  lower_port.position.copy(lowerPortNormal).multiplyScalar(0.438);
  lower_port.position.y = 1.015;
  lower_port.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    lowerPortNormal
  );
  root.add(lower_port);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}