// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "suede_pouch";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const flap_group = new THREE.Group();
  flap_group.name = "flap_group";
  root.add(flap_group);

  const hardware_group = new THREE.Group();
  hardware_group.name = "hardware_group";
  root.add(hardware_group);

  const suedeMat = new THREE.MeshStandardMaterial({
    color: 0xa96f3d,
    metalness: 0.0,
    roughness: 0.95
  });

  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x754526,
    metalness: 0.0,
    roughness: 0.95
  });

  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x24150e,
    metalness: 0.0,
    roughness: 0.95
  });

  const stitchMat = new THREE.MeshStandardMaterial({
    color: 0x4d2d1c,
    metalness: 0.0,
    roughness: 0.95
  });

  const snapMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const snapRimMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  function makeRoundedRectShape(width, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();

    return shape;
  }

  function makeFlapShape(width, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - 0.14);
    shape.bezierCurveTo(
      x1,
      y1 - 0.035,
      x1 - 0.055,
      y1,
      x1 - 0.16,
      y1
    );
    shape.lineTo(x0 + 0.16, y1);
    shape.bezierCurveTo(
      x0 + 0.055,
      y1,
      x0,
      y1 - 0.035,
      x0,
      y1 - 0.14
    );
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();

    return shape;
  }

  function makeExtrudedGeometry(
    shape,
    depth,
    bevelSize,
    bevelThickness,
    curveSegments
  ) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments,
      bevelEnabled: true,
      bevelSize,
      bevelThickness,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeRoundedLoopPoints(width, height, radius, z, steps) {
    const points = [];
    const corners = [
      [width / 2 - radius, height / 2 - radius, 0],
      [-width / 2 + radius, height / 2 - radius, Math.PI / 2],
      [-width / 2 + radius, -height / 2 + radius, Math.PI],
      [width / 2 - radius, -height / 2 + radius, Math.PI * 1.5]
    ];

    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i <= steps; i++) {
        const angle = corner[2] + i / steps * Math.PI / 2;
        points.push(
          new THREE.Vector3(
            corner[0] + Math.cos(angle) * radius,
            corner[1] + Math.sin(angle) * radius,
            z
          )
        );
      }
    }

    return points;
  }

  const body_pouchShape = makeRoundedRectShape(0.82, 0.78, 0.085);
  const body_pouchGeom = makeExtrudedGeometry(
    body_pouchShape,
    0.22,
    0.025,
    0.025,
    12
  );
  const body_pouch = new THREE.Mesh(body_pouchGeom, suedeMat);
  body_pouch.name = "body_pouch";
  body_pouch.position.set(0, -0.04, 0);
  body_group.add(body_pouch);

  const side_gussetsGeom = new THREE.CapsuleGeometry(0.065, 0.61, 6, 12);
  const side_gussets = new THREE.InstancedMesh(
    side_gussetsGeom,
    suedeMat,
    2
  );
  side_gussets.name = "side_gussets";

  const side_gusset_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    side_gusset_dummy.position.set(i === 0 ? -0.4 : 0.4, -0.04, 0);
    side_gusset_dummy.rotation.set(0, 0, 0);
    side_gusset_dummy.scale.set(1, 1, 1.8);
    side_gusset_dummy.updateMatrix();
    side_gussets.setMatrixAt(i, side_gusset_dummy.matrix);
  }
  side_gussets.instanceMatrix.needsUpdate = true;
  body_group.add(side_gussets);

  const side_recessesShape = makeRoundedRectShape(0.15, 0.62, 0.06);
  const side_recessesGeom = makeExtrudedGeometry(
    side_recessesShape,
    0.012,
    0.004,
    0.004,
    8
  );
  const side_recesses = new THREE.InstancedMesh(
    side_recessesGeom,
    interiorMat,
    2
  );
  side_recesses.name = "side_recesses";

  const side_recess_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    side_recess_dummy.position.set(i === 0 ? -0.456 : 0.456, -0.04, 0);
    side_recess_dummy.rotation.set(0, Math.PI / 2, 0);
    side_recess_dummy.scale.set(1, 1, 1);
    side_recess_dummy.updateMatrix();
    side_recesses.setMatrixAt(i, side_recess_dummy.matrix);
  }
  side_recesses.instanceMatrix.needsUpdate = true;
  body_group.add(side_recesses);

  const side_bindingPoints = [
    new THREE.Vector3(0, 0.27, 0.075),
    new THREE.Vector3(0, 0.31, 0.015),
    new THREE.Vector3(0, 0.29, -0.085),
    new THREE.Vector3(0, 0.18, -0.125),
    new THREE.Vector3(0, -0.29, -0.125),
    new THREE.Vector3(0, -0.39, -0.075),
    new THREE.Vector3(0, -0.42, 0.025),
    new THREE.Vector3(0, -0.37, 0.115),
    new THREE.Vector3(0, -0.25, 0.135),
    new THREE.Vector3(0, 0.17, 0.135)
  ];

  const side_bindingCurve = new THREE.CatmullRomCurve3(
    side_bindingPoints,
    true,
    "centripetal"
  );
  const side_bindingGeom = new THREE.TubeGeometry(
    side_bindingCurve,
    64,
    0.018,
    8,
    true
  );
  const side_binding = new THREE.InstancedMesh(
    side_bindingGeom,
    edgeMat,
    2
  );
  side_binding.name = "side_binding";

  const side_binding_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    side_binding_dummy.position.set(i === 0 ? -0.468 : 0.468, -0.04, 0);
    side_binding_dummy.rotation.set(0, 0, 0);
    side_binding_dummy.scale.set(1, 1, 1);
    side_binding_dummy.updateMatrix();
    side_binding.setMatrixAt(i, side_binding_dummy.matrix);
  }
  side_binding.instanceMatrix.needsUpdate = true;
  body_group.add(side_binding);

  const body_edgePoints = makeRoundedLoopPoints(
    0.79,
    0.73,
    0.075,
    0.143,
    5
  );
  const body_edgeCurve = new THREE.CatmullRomCurve3(
    body_edgePoints,
    true,
    "centripetal"
  );
  const body_edge_pipingGeom = new THREE.TubeGeometry(
    body_edgeCurve,
    80,
    0.009,
    7,
    true
  );
  const body_edge_piping = new THREE.Mesh(
    body_edge_pipingGeom,
    edgeMat
  );
  body_edge_piping.name = "body_edge_piping";
  body_edge_piping.position.y = -0.04;
  body_group.add(body_edge_piping);

  const body_stitchesGeom = new THREE.BoxGeometry(0.026, 0.005, 0.005);
  const body_stitches = new THREE.InstancedMesh(
    body_stitchesGeom,
    stitchMat,
    38
  );
  body_stitches.name = "body_stitches";

  const body_stitch_dummy = new THREE.Object3D();
  let bodyStitchIndex = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < 12; i++) {
      body_stitch_dummy.position.set(
        side * 0.365,
        -0.315 + i / 11 * 0.55,
        0.153
      );
      body_stitch_dummy.rotation.set(0, 0, Math.PI / 2);
      body_stitch_dummy.scale.set(1, 1, 1);
      body_stitch_dummy.updateMatrix();
      body_stitches.setMatrixAt(bodyStitchIndex, body_stitch_dummy.matrix);
      bodyStitchIndex++;
    }
  }

  for (let i = 0; i < 14; i++) {
    body_stitch_dummy.position.set(
      -0.315 + i / 13 * 0.63,
      -0.397,
      0.153
    );
    body_stitch_dummy.rotation.set(0, 0, 0);
    body_stitch_dummy.scale.set(1, 1, 1);
    body_stitch_dummy.updateMatrix();
    body_stitches.setMatrixAt(bodyStitchIndex, body_stitch_dummy.matrix);
    bodyStitchIndex++;
  }

  body_stitches.instanceMatrix.needsUpdate = true;
  body_group.add(body_stitches);

  const flap_liningShape = makeFlapShape(0.86, 0.37, 0.105);
  const flap_liningGeom = makeExtrudedGeometry(
    flap_liningShape,
    0.035,
    0.012,
    0.012,
    12
  );
  const flap_lining = new THREE.Mesh(flap_liningGeom, edgeMat);
  flap_lining.name = "flap_lining";
  flap_lining.position.set(0, 0.255, 0.153);
  flap_group.add(flap_lining);

  const front_flapShape = makeFlapShape(0.84, 0.35, 0.105);
  const front_flapGeom = makeExtrudedGeometry(
    front_flapShape,
    0.045,
    0.018,
    0.018,
    12
  );
  const front_flap = new THREE.Mesh(front_flapGeom, suedeMat);
  front_flap.name = "front_flap";
  front_flap.position.set(0, 0.255, 0.19);
  flap_group.add(front_flap);

  const flap_edgePoints = [
    new THREE.Vector3(-0.31, 0.432, 0.232),
    new THREE.Vector3(0, 0.438, 0.232),
    new THREE.Vector3(0.31, 0.432, 0.232),
    new THREE.Vector3(0.405, 0.39, 0.232),
    new THREE.Vector3(0.427, 0.29, 0.232),
    new THREE.Vector3(0.415, 0.13, 0.232),
    new THREE.Vector3(0.36, 0.075, 0.232),
    new THREE.Vector3(0.24, 0.045, 0.232),
    new THREE.Vector3(0, 0.035, 0.232),
    new THREE.Vector3(-0.24, 0.045, 0.232),
    new THREE.Vector3(-0.36, 0.075, 0.232),
    new THREE.Vector3(-0.415, 0.13, 0.232),
    new THREE.Vector3(-0.427, 0.29, 0.232),
    new THREE.Vector3(-0.405, 0.39, 0.232)
  ];

  const flap_edgeCurve = new THREE.CatmullRomCurve3(
    flap_edgePoints,
    true,
    "centripetal"
  );
  const flap_edge_pipingGeom = new THREE.TubeGeometry(
    flap_edgeCurve,
    96,
    0.014,
    8,
    true
  );
  const flap_edge_piping = new THREE.Mesh(
    flap_edge_pipingGeom,
    edgeMat
  );
  flap_edge_piping.name = "flap_edge_piping";
  flap_group.add(flap_edge_piping);

  const flap_stitchesGeom = new THREE.BoxGeometry(0.027, 0.005, 0.005);
  const flap_stitches = new THREE.InstancedMesh(
    flap_stitchesGeom,
    stitchMat,
    34
  );
  flap_stitches.name = "flap_stitches";

  const flap_stitch_dummy = new THREE.Object3D();
  let flapStitchIndex = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      flap_stitch_dummy.position.set(
        side * 0.392,
        0.145 + i / 6 * 0.225,
        0.235
      );
      flap_stitch_dummy.rotation.set(0, 0, Math.PI / 2);
      flap_stitch_dummy.scale.set(1, 1, 1);
      flap_stitch_dummy.updateMatrix();
      flap_stitches.setMatrixAt(flapStitchIndex, flap_stitch_dummy.matrix);
      flapStitchIndex++;
    }
  }

  for (let i = 0; i < 20; i++) {
    const t = i / 19;
    const x = -0.34 + t * 0.68;
    const y = 0.069 + 0.027 * (x / 0.34) * (x / 0.34);

    flap_stitch_dummy.position.set(x, y, 0.235);
    flap_stitch_dummy.rotation.set(
      0,
      0,
      Math.atan((2 * 0.027 * x) / (0.34 * 0.34))
    );
    flap_stitch_dummy.scale.set(1, 1, 1);
    flap_stitch_dummy.updateMatrix();
    flap_stitches.setMatrixAt(flapStitchIndex, flap_stitch_dummy.matrix);
    flapStitchIndex++;
  }

  flap_stitches.instanceMatrix.needsUpdate = true;
  flap_group.add(flap_stitches);

  const snap_backingGeom = new THREE.CylinderGeometry(
    0.073,
    0.073,
    0.012,
    24
  );
  const snap_capGeom = new THREE.SphereGeometry(0.068, 24, 12);
  const snap_rimGeom = new THREE.TorusGeometry(0.063, 0.006, 8, 24);

  const upper_snap_backing = new THREE.Mesh(
    snap_backingGeom,
    snapRimMat
  );
  upper_snap_backing.name = "upper_snap_backing";
  upper_snap_backing.rotation.x = Math.PI / 2;
  upper_snap_backing.position.set(0.13, 0.255, 0.239);
  hardware_group.add(upper_snap_backing);

  const upper_snap = new THREE.Mesh(snap_capGeom, snapMat);
  upper_snap.name = "upper_snap";
  upper_snap.position.set(0.13, 0.255, 0.253);
  upper_snap.scale.set(1, 1, 0.3);
  hardware_group.add(upper_snap);

  const upper_snap_rim = new THREE.Mesh(snap_rimGeom, snapRimMat);
  upper_snap_rim.name = "upper_snap_rim";
  upper_snap_rim.position.set(0.13, 0.255, 0.252);
  hardware_group.add(upper_snap_rim);

  const lower_snap_backing = new THREE.Mesh(
    snap_backingGeom,
    snapRimMat
  );
  lower_snap_backing.name = "lower_snap_backing";
  lower_snap_backing.rotation.x = Math.PI / 2;
  lower_snap_backing.position.set(0.13, 0.015, 0.154);
  hardware_group.add(lower_snap_backing);

  const lower_snap = new THREE.Mesh(snap_capGeom, snapMat);
  lower_snap.name = "lower_snap";
  lower_snap.position.set(0.13, 0.015, 0.168);
  lower_snap.scale.set(1, 1, 0.3);
  hardware_group.add(lower_snap);

  const lower_snap_rim = new THREE.Mesh(snap_rimGeom, snapRimMat);
  lower_snap_rim.name = "lower_snap_rim";
  lower_snap_rim.position.set(0.13, 0.015, 0.167);
  hardware_group.add(lower_snap_rim);

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;

    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(THREE, root);
  return root;
}