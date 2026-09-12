// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushed_silverMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const gemstoneMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.18,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const crescent_bodyShape = new THREE.Shape();
  crescent_bodyShape.moveTo(0.34, 0.39);
  crescent_bodyShape.bezierCurveTo(0.12, 0.50, -0.17, 0.48, -0.33, 0.27);
  crescent_bodyShape.bezierCurveTo(-0.49, 0.06, -0.43, -0.28, -0.23, -0.45);
  crescent_bodyShape.bezierCurveTo(-0.04, -0.61, 0.27, -0.51, 0.43, -0.29);
  crescent_bodyShape.bezierCurveTo(0.46, -0.25, 0.43, -0.20, 0.38, -0.18);
  crescent_bodyShape.bezierCurveTo(0.20, -0.31, -0.02, -0.34, -0.16, -0.20);
  crescent_bodyShape.bezierCurveTo(-0.31, -0.05, -0.29, 0.18, -0.13, 0.32);
  crescent_bodyShape.bezierCurveTo(-0.01, 0.42, 0.17, 0.43, 0.31, 0.37);
  crescent_bodyShape.bezierCurveTo(0.35, 0.35, 0.37, 0.37, 0.34, 0.39);
  crescent_bodyShape.closePath();

  const crescent_bodyGeom = new THREE.ExtrudeGeometry(crescent_bodyShape, {
    depth: 0.10,
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.018,
    bevelSegments: 4,
  });
  const crescent_body = new THREE.Mesh(crescent_bodyGeom, polished_silverMat);
  crescent_body.position.z = -0.05;
  root.add(crescent_body);

  const outer_edgePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.33, 0.39, 0.076),
    new THREE.Vector3(0.08, 0.47, 0.076),
    new THREE.Vector3(-0.20, 0.40, 0.076),
    new THREE.Vector3(-0.37, 0.18, 0.076),
    new THREE.Vector3(-0.39, -0.10, 0.076),
    new THREE.Vector3(-0.25, -0.38, 0.076),
    new THREE.Vector3(0.02, -0.49, 0.076),
    new THREE.Vector3(0.28, -0.40, 0.076),
    new THREE.Vector3(0.42, -0.26, 0.076),
  ], false, "centripetal");
  const outer_edgeGeom = new THREE.TubeGeometry(outer_edgePath, 64, 0.009, 8, false);
  const outer_edge = new THREE.Mesh(outer_edgeGeom, silverMat);
  root.add(outer_edge);

  const inner_edgePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.35, 0.38, 0.077),
    new THREE.Vector3(0.14, 0.405, 0.077),
    new THREE.Vector3(-0.06, 0.35, 0.077),
    new THREE.Vector3(-0.20, 0.18, 0.077),
    new THREE.Vector3(-0.22, -0.04, 0.077),
    new THREE.Vector3(-0.12, -0.22, 0.077),
    new THREE.Vector3(0.08, -0.30, 0.077),
    new THREE.Vector3(0.28, -0.25, 0.077),
    new THREE.Vector3(0.39, -0.18, 0.077),
  ], false, "centripetal");
  const inner_edgeGeom = new THREE.TubeGeometry(inner_edgePath, 56, 0.008, 8, false);
  const inner_edge = new THREE.Mesh(inner_edgeGeom, brushed_silverMat);
  root.add(inner_edge);

  const jump_ringGeom = new THREE.TorusGeometry(0.067, 0.014, 12, 36);
  const jump_ring = new THREE.Mesh(jump_ringGeom, polished_silverMat);
  jump_ring.position.set(-0.015, 0.505, 0.005);
  root.add(jump_ring);

  const bailShape = new THREE.Shape();
  bailShape.moveTo(-0.055, 0.0);
  bailShape.bezierCurveTo(-0.075, 0.025, -0.085, 0.08, -0.085, 0.15);
  bailShape.lineTo(-0.085, 0.245);
  bailShape.bezierCurveTo(-0.085, 0.295, -0.055, 0.32, 0.0, 0.32);
  bailShape.bezierCurveTo(0.055, 0.32, 0.085, 0.295, 0.085, 0.245);
  bailShape.lineTo(0.085, 0.15);
  bailShape.bezierCurveTo(0.085, 0.08, 0.075, 0.025, 0.055, 0.0);
  bailShape.bezierCurveTo(0.035, -0.018, -0.035, -0.018, -0.055, 0.0);
  bailShape.closePath();

  const bail_hole = new THREE.Path();
  bail_hole.moveTo(-0.037, 0.075);
  bail_hole.lineTo(-0.037, 0.235);
  bail_hole.bezierCurveTo(-0.037, 0.258, -0.020, 0.270, 0.0, 0.270);
  bail_hole.bezierCurveTo(0.020, 0.270, 0.037, 0.258, 0.037, 0.235);
  bail_hole.lineTo(0.037, 0.075);
  bail_hole.bezierCurveTo(0.037, 0.055, 0.020, 0.045, 0.0, 0.045);
  bail_hole.bezierCurveTo(-0.020, 0.045, -0.037, 0.055, -0.037, 0.075);
  bail_hole.closePath();
  bailShape.holes.push(bail_hole);

  const bailGeom = new THREE.ExtrudeGeometry(bailShape, {
    depth: 0.07,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.008,
    bevelSegments: 3,
  });
  const bail = new THREE.Mesh(bailGeom, polished_silverMat);
  bail.position.set(-0.015, 0.50, 0.015);
  root.add(bail);

  const gemstone_setting = new THREE.Group();
  gemstone_setting.position.set(0.04, -0.11, 0);
  root.add(gemstone_setting);

  const setting_backGeom = new THREE.CylinderGeometry(0.108, 0.108, 0.035, 32);
  const setting_back = new THREE.Mesh(setting_backGeom, brushed_silverMat);
  setting_back.rotation.x = Math.PI / 2;
  setting_back.position.z = 0.078;
  gemstone_setting.add(setting_back);

  const setting_rimGeom = new THREE.TorusGeometry(0.103, 0.012, 10, 40);
  const setting_rim = new THREE.Mesh(setting_rimGeom, polished_silverMat);
  setting_rim.position.z = 0.105;
  gemstone_setting.add(setting_rim);

  const gemstone_positions = [];
  const gemstone_colors = [];
  const facet_palette = [
    new THREE.Color(0x073b82),
    new THREE.Color(0x0b55a4),
    new THREE.Color(0x1477cf),
    new THREE.Color(0x2b9de2),
    new THREE.Color(0x68bdf0),
    new THREE.Color(0x125ea9),
    new THREE.Color(0x062f70),
    new THREE.Color(0x3699da),
  ];

  function addGemFacet(a, b, c, colorIndex) {
    gemstone_positions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    const color = facet_palette[colorIndex % facet_palette.length];
    for (let i = 0; i < 3; i++) {
      gemstone_colors.push(color.r, color.g, color.b);
    }
  }

  const facet_count = 16;
  const table_radius = 0.044;
  const girdle_radius = 0.102;
  const table_z = 0.143;
  const girdle_z = 0.112;
  const back_z = 0.087;
  const gemstone_center = new THREE.Vector3(0, 0, table_z);
  const gemstone_back = new THREE.Vector3(0, 0, back_z);

  for (let i = 0; i < facet_count; i++) {
    const a0 = i / facet_count * Math.PI * 2;
    const a1 = (i + 1) / facet_count * Math.PI * 2;
    const table0 = new THREE.Vector3(
      Math.cos(a0) * table_radius,
      Math.sin(a0) * table_radius,
      table_z
    );
    const table1 = new THREE.Vector3(
      Math.cos(a1) * table_radius,
      Math.sin(a1) * table_radius,
      table_z
    );
    const girdle0 = new THREE.Vector3(
      Math.cos(a0) * girdle_radius,
      Math.sin(a0) * girdle_radius,
      girdle_z
    );
    const girdle1 = new THREE.Vector3(
      Math.cos(a1) * girdle_radius,
      Math.sin(a1) * girdle_radius,
      girdle_z
    );

    addGemFacet(gemstone_center, table0, table1, i + 2);
    addGemFacet(table0, girdle0, girdle1, i * 3 + 1);
    addGemFacet(table0, girdle1, table1, i * 5 + 3);
    addGemFacet(gemstone_back, girdle1, girdle0, i + 5);
  }

  const gemstoneGeom = new THREE.BufferGeometry();
  gemstoneGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(gemstone_positions, 3)
  );
  gemstoneGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(gemstone_colors, 3)
  );
  gemstoneGeom.computeVertexNormals();

  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  gemstone_setting.add(gemstone);

  const prong_angles = [
    Math.PI * 0.25,
    Math.PI * 0.75,
    Math.PI * 1.25,
    Math.PI * 1.75,
  ];
  const prong_clawsGeom = new THREE.CylinderGeometry(0.010, 0.012, 0.052, 10);
  const prong_claws = new THREE.InstancedMesh(
    prong_clawsGeom,
    polished_silverMat,
    prong_angles.length
  );
  const prong_capsGeom = new THREE.SphereGeometry(0.023, 16, 10);
  const prong_caps = new THREE.InstancedMesh(
    prong_capsGeom,
    polished_silverMat,
    prong_angles.length
  );
  const prong_matrix = new THREE.Matrix4();
  const prong_position = new THREE.Vector3();
  const prong_quaternion = new THREE.Quaternion();
  const prong_scale = new THREE.Vector3(1, 1, 1);
  const prong_euler = new THREE.Euler();

  for (let i = 0; i < prong_angles.length; i++) {
    const angle = prong_angles[i];

    prong_position.set(
      Math.cos(angle) * 0.091,
      Math.sin(angle) * 0.091,
      0.137
    );
    prong_euler.set(0, 0, angle - Math.PI / 2);
    prong_quaternion.setFromEuler(prong_euler);
    prong_matrix.compose(prong_position, prong_quaternion, prong_scale);
    prong_claws.setMatrixAt(i, prong_matrix);

    prong_position.set(
      Math.cos(angle) * 0.096,
      Math.sin(angle) * 0.096,
      0.151
    );
    prong_quaternion.identity();
    prong_matrix.compose(prong_position, prong_quaternion, prong_scale);
    prong_caps.setMatrixAt(i, prong_matrix);
  }
  prong_claws.instanceMatrix.needsUpdate = true;
  prong_caps.instanceMatrix.needsUpdate = true;
  gemstone_setting.add(prong_claws);
  gemstone_setting.add(prong_caps);

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