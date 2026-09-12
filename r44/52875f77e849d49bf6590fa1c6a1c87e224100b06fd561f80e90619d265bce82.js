// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const umbrella = new THREE.Group();
  root.add(umbrella);

  const canopyRadius = 1.0;
  const canopyTopY = 0.62;
  const canopyDrop = 0.52;
  const canopySag = 0.025;
  const panelCount = 8;
  const sector = Math.PI * 2 / panelCount;
  const halfSector = sector / 2;

  const blue_fabricMat = new THREE.MeshStandardMaterial({
    color: 0x2468d8,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const white_printMat = new THREE.MeshStandardMaterial({
    color: 0xf4f5f2,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const black_metalMat = new THREE.MeshStandardMaterial({
    color: 0x292c2e,
    metalness: 0.5,
    roughness: 0.5
  });
  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8
  });

  function canopyY(radius) {
    const t = Math.min(1, Math.max(0, radius / canopyRadius));
    return canopyTopY - canopyDrop * Math.pow(t, 1.45);
  }

  function canopyPoint(angle, radius, offset) {
    const t = Math.min(1, Math.max(0, radius / canopyRadius));
    const panelWave = Math.sin(Math.PI * t) *
      Math.cos(angle / sector * Math.PI);
    const y = canopyY(radius) - canopySag * panelWave + offset;
    return new THREE.Vector3(
      Math.sin(angle) * radius,
      y,
      Math.cos(angle) * radius
    );
  }

  function createCanopyPanelGeometry() {
    const radialSegments = 12;
    const angularSegments = 6;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= radialSegments; i++) {
      const t = i / radialSegments;
      for (let j = 0; j <= angularSegments; j++) {
        const u = j / angularSegments;
        const angle = -halfSector + sector * u;
        const scallop = 1 - 0.035 *
          Math.pow(Math.sin(Math.PI * u), 2) * Math.pow(t, 6);
        const radius = canopyRadius * t * scallop;
        const point = canopyPoint(angle, radius, 0);
        positions.push(point.x, point.y, point.z);
      }
    }

    const row = angularSegments + 1;
    for (let i = 0; i < radialSegments; i++) {
      for (let j = 0; j < angularSegments; j++) {
        const a = i * row + j;
        const b = (i + 1) * row + j;
        const c = (i + 1) * row + j + 1;
        const d = i * row + j + 1;
        indices.push(a, b, c, a, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createSurfaceRibbonGeometry(specifications, offset) {
    const positions = [];
    const indices = [];

    for (const specification of specifications) {
      const segments = specification.segments || 14;
      const base = positions.length / 3;

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const angle =
          specification.angle0 +
          (specification.angle1 - specification.angle0) * t;
        const radius =
          specification.radius0 +
          (specification.radius1 - specification.radius0) * t;
        const center = canopyPoint(angle, radius, offset);
        const before = canopyPoint(
          angle - 0.002,
          radius,
          offset
        );
        const after = canopyPoint(
          angle + 0.002,
          radius,
          offset
        );
        const tangent = after.sub(before).normalize();
        const normal = new THREE.Vector3(
          Math.sin(angle) * 0.7,
          0.72,
          Math.cos(angle) * 0.7
        ).normalize();
        const side = new THREE.Vector3()
          .crossVectors(normal, tangent)
          .normalize();
        const halfWidth = specification.width * 0.5;

        const left = center.clone().addScaledVector(side, halfWidth);
        const right = center.clone().addScaledVector(side, -halfWidth);
        positions.push(left.x, left.y, left.z);
        positions.push(right.x, right.y, right.z);
      }

      for (let i = 0; i < segments; i++) {
        const a = base + i * 2;
        const b = a + 1;
        const c = a + 2;
        const d = a + 3;
        indices.push(a, c, d, a, d, b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function setRadialInstances(mesh, count, angleOffset) {
    const transform = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      transform.position.set(0, 0, 0);
      transform.rotation.set(0, angleOffset + i * sector, 0);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      mesh.setMatrixAt(i, transform.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  const canopy_panelGeom = createCanopyPanelGeometry();
  const canopy_panels = new THREE.InstancedMesh(
    canopy_panelGeom,
    blue_fabricMat,
    panelCount
  );
  setRadialInstances(canopy_panels, panelCount, 0);
  umbrella.add(canopy_panels);

  const white_radial_stripesGeom = createSurfaceRibbonGeometry([
    {
      angle0: -halfSector * 0.82,
      angle1: -halfSector * 0.18,
      radius0: 0.05,
      radius1: 0.97,
      width: 0.052,
      segments: 14
    },
    {
      angle0: halfSector * 0.52,
      angle1: halfSector * 0.88,
      radius0: 0.08,
      radius1: 0.94,
      width: 0.035,
      segments: 12
    }
  ], 0.008);
  const white_radial_stripes = new THREE.InstancedMesh(
    white_radial_stripesGeom,
    white_printMat,
    panelCount
  );
  setRadialInstances(white_radial_stripes, panelCount, 0);
  umbrella.add(white_radial_stripes);

  const white_cross_stripesGeom = createSurfaceRibbonGeometry([
    {
      angle0: -halfSector * 0.92,
      angle1: halfSector * 0.92,
      radius0: 0.43,
      radius1: 0.43,
      width: 0.052,
      segments: 10
    },
    {
      angle0: -halfSector * 0.92,
      angle1: halfSector * 0.92,
      radius0: 0.70,
      radius1: 0.70,
      width: 0.045,
      segments: 10
    }
  ], 0.0085);
  const white_cross_stripes = new THREE.InstancedMesh(
    white_cross_stripesGeom,
    white_printMat,
    panelCount
  );
  setRadialInstances(white_cross_stripes, panelCount, 0);
  umbrella.add(white_cross_stripes);

  const white_accent_stripesGeom = createSurfaceRibbonGeometry([
    {
      angle0: -halfSector * 0.68,
      angle1: halfSector * 0.62,
      radius0: 0.86,
      radius1: 0.86,
      width: 0.032,
      segments: 10
    }
  ], 0.009);
  const white_accent_stripes = new THREE.InstancedMesh(
    white_accent_stripesGeom,
    white_printMat,
    panelCount
  );
  setRadialInstances(white_accent_stripes, panelCount, 0);
  umbrella.add(white_accent_stripes);

  const ribPathPoints = [];
  for (let i = 0; i <= 8; i++) {
    const radius = canopyRadius * (0.035 + 0.965 * i / 8);
    ribPathPoints.push(canopyPoint(0, radius, 0.013));
  }
  const canopy_ribsGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      ribPathPoints,
      false,
      "centripetal"
    ),
    28,
    0.006,
    6,
    false
  );
  const canopy_ribs = new THREE.InstancedMesh(
    canopy_ribsGeom,
    black_metalMat,
    panelCount
  );
  setRadialInstances(canopy_ribs, panelCount, halfSector);
  umbrella.add(canopy_ribs);

  const stretcherRadius = 0.61;
  const stretcherStart = new THREE.Vector3(0, 0.17, 0);
  const stretcherEnd = canopyPoint(
    0,
    stretcherRadius,
    -0.025
  );
  const canopy_stretchersGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(stretcherStart, stretcherEnd),
    1,
    0.006,
    6,
    false
  );
  const canopy_stretchers = new THREE.InstancedMesh(
    canopy_stretchersGeom,
    black_metalMat,
    panelCount
  );
  setRadialInstances(canopy_stretchers, panelCount, halfSector);
  umbrella.add(canopy_stretchers);

  const rib_tipsGeom = new THREE.SphereGeometry(0.018, 10, 6);
  const rib_tips = new THREE.InstancedMesh(
    rib_tipsGeom,
    black_metalMat,
    panelCount
  );
  const tipTransform = new THREE.Object3D();
  for (let i = 0; i < panelCount; i++) {
    const angle = halfSector + i * sector;
    const point = canopyPoint(angle, canopyRadius, 0.002);
    tipTransform.position.copy(point);
    tipTransform.rotation.set(0, 0, 0);
    tipTransform.scale.set(1, 1, 1);
    tipTransform.updateMatrix();
    rib_tips.setMatrixAt(i, tipTransform.matrix);
  }
  rib_tips.instanceMatrix.needsUpdate = true;
  umbrella.add(rib_tips);

  const central_shaftGeom = new THREE.CylinderGeometry(
    0.017,
    0.017,
    1.17,
    12
  );
  const central_shaft = new THREE.Mesh(
    central_shaftGeom,
    black_metalMat
  );
  central_shaft.position.y = 0.045;
  umbrella.add(central_shaft);

  const top_crownGeom = new THREE.CylinderGeometry(
    0.032,
    0.043,
    0.075,
    14
  );
  const top_crown = new THREE.Mesh(top_crownGeom, black_metalMat);
  top_crown.position.y = 0.595;
  umbrella.add(top_crown);

  const top_finialGeom = new THREE.CylinderGeometry(
    0.031,
    0.043,
    0.18,
    14
  );
  const top_finial = new THREE.Mesh(
    top_finialGeom,
    black_plasticMat
  );
  top_finial.position.y = 0.70;
  umbrella.add(top_finial);

  const top_buttonGeom = new THREE.SphereGeometry(0.032, 14, 8);
  const top_button = new THREE.Mesh(
    top_buttonGeom,
    black_plasticMat
  );
  top_button.scale.set(1, 0.55, 1);
  top_button.position.y = 0.625;
  umbrella.add(top_button);

  const runner_hubGeom = new THREE.CylinderGeometry(
    0.043,
    0.043,
    0.07,
    14
  );
  const runner_hub = new THREE.Mesh(
    runner_hubGeom,
    black_plasticMat
  );
  runner_hub.position.y = 0.17;
  umbrella.add(runner_hub);

  const lower_sleeveGeom = new THREE.CylinderGeometry(
    0.028,
    0.028,
    0.12,
    12
  );
  const lower_sleeve = new THREE.Mesh(
    lower_sleeveGeom,
    black_plasticMat
  );
  lower_sleeve.position.y = -0.49;
  umbrella.add(lower_sleeve);

  const hook_handlePoints = [
    new THREE.Vector3(0, -0.51, 0),
    new THREE.Vector3(0, -0.65, 0),
    new THREE.Vector3(0.015, -0.79, 0),
    new THREE.Vector3(0.09, -0.91, 0),
    new THREE.Vector3(0.22, -0.96, 0),
    new THREE.Vector3(0.35, -0.92, 0),
    new THREE.Vector3(0.43, -0.82, 0),
    new THREE.Vector3(0.45, -0.70, 0),
    new THREE.Vector3(0.42, -0.62, 0)
  ];
  const hook_handleGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      hook_handlePoints,
      false,
      "centripetal"
    ),
    48,
    0.035,
    10,
    false
  );
  const hook_handle = new THREE.Mesh(
    hook_handleGeom,
    black_plasticMat
  );
  umbrella.add(hook_handle);

  const handle_end_capGeom = new THREE.SphereGeometry(
    0.036,
    12,
    8
  );
  const handle_end_cap = new THREE.Mesh(
    handle_end_capGeom,
    black_plasticMat
  );
  handle_end_cap.position.set(0.42, -0.62, 0);
  umbrella.add(handle_end_cap);

  umbrella.rotation.set(-0.08, -0.12, 0.24);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}