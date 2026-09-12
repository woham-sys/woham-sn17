// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const leaf_bladeMat = new THREE.MeshStandardMaterial({
    color: 0x3f7f2d,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const leaf_undersideMat = new THREE.MeshStandardMaterial({
    color: 0x78a936,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const leaf_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x6fa42d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x67970c,
    metalness: 0.0,
    roughness: 0.7,
  });
  const stem_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xa2bd35,
    metalness: 0.0,
    roughness: 0.7,
  });
  const veinMat = new THREE.MeshStandardMaterial({
    color: 0x91b34c,
    metalness: 0.0,
    roughness: 0.7,
  });
  const water_dropletMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeedd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const droplet_coreMat = new THREE.MeshStandardMaterial({
    color: 0xe8f2e8,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });
  const droplet_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
  });

  const stemPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.48, -0.78, -0.025),
    new THREE.Vector3(-0.39, -0.57, -0.020),
    new THREE.Vector3(-0.29, -0.34, -0.014),
    new THREE.Vector3(-0.19, -0.10, -0.008),
    new THREE.Vector3(-0.10, 0.10, -0.004),
    new THREE.Vector3(-0.035, 0.225, 0.000),
  ], false, "centripetal");
  const stemGeom = new THREE.TubeGeometry(stemPath, 48, 0.034, 12, false);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  root.add(stem);

  const stem_highlightPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.462, -0.755, 0.006),
    new THREE.Vector3(-0.373, -0.548, 0.012),
    new THREE.Vector3(-0.274, -0.320, 0.017),
    new THREE.Vector3(-0.176, -0.085, 0.021),
    new THREE.Vector3(-0.086, 0.105, 0.022),
    new THREE.Vector3(-0.025, 0.215, 0.018),
  ], false, "centripetal");
  const stem_highlightGeom = new THREE.TubeGeometry(
    stem_highlightPath,
    36,
    0.004,
    6,
    false
  );
  const stem_highlight = new THREE.Mesh(stem_highlightGeom, stem_highlightMat);
  root.add(stem_highlight);

  const leaf_group = new THREE.Group();
  leaf_group.rotation.x = -0.08;
  leaf_group.rotation.y = -0.04;
  root.add(leaf_group);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0.00, 0.18);
  leafShape.bezierCurveTo(0.12, 0.36, 0.32, 0.49, 0.56, 0.52);
  leafShape.bezierCurveTo(0.78, 0.55, 1.00, 0.47, 1.16, 0.32);
  leafShape.bezierCurveTo(1.00, 0.27, 0.78, 0.22, 0.55, 0.19);
  leafShape.bezierCurveTo(0.32, 0.16, 0.12, 0.14, 0.00, 0.18);
  leafShape.closePath();

  const leaf_bladeGeom = new THREE.ExtrudeGeometry(leafShape, {
    depth: 0.018,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.008,
    bevelSegments: 2,
  });

  const leafPosition = leaf_bladeGeom.attributes.position;
  for (let i = 0; i < leafPosition.count; i++) {
    const x = leafPosition.getX(i);
    const y = leafPosition.getY(i);
    const z = leafPosition.getZ(i);
    const t = Math.max(0, Math.min(1, x / 1.16));
    const arch = 0.026 * Math.sin(Math.PI * t) + 0.010 * t * t;
    leafPosition.setZ(i, z - arch);
  }
  leafPosition.needsUpdate = true;
  leaf_bladeGeom.computeVertexNormals();

  const leaf_blade = new THREE.Mesh(leaf_bladeGeom, leaf_bladeMat);
  leaf_group.add(leaf_blade);

  const leaf_undersideGeom = new THREE.ShapeGeometry(leafShape, 24);
  const undersidePosition = leaf_undersideGeom.attributes.position;
  for (let i = 0; i < undersidePosition.count; i++) {
    const x = undersidePosition.getX(i);
    const y = undersidePosition.getY(i);
    const t = Math.max(0, Math.min(1, x / 1.16));
    const arch = 0.026 * Math.sin(Math.PI * t) + 0.010 * t * t;
    undersidePosition.setZ(i, -0.025 - arch);
  }
  undersidePosition.needsUpdate = true;
  leaf_undersideGeom.computeVertexNormals();

  const leaf_underside = new THREE.Mesh(
    leaf_undersideGeom,
    leaf_undersideMat
  );
  leaf_group.add(leaf_underside);

  function leafSurfaceZ(x, y) {
    const t = Math.max(0, Math.min(1, x / 1.16));
    const lower = 0.18 + 0.012 * t;
    const upper = 0.32 + 0.23 * Math.sin(Math.PI * t);
    const v = Math.max(0, Math.min(1, (y - lower) / (upper - lower)));
    const crossArch = 0.010 * Math.sin(Math.PI * v);
    return 0.029 + crossArch - 0.026 * Math.sin(Math.PI * t) - 0.010 * t * t;
  }

  const leaf_edgePoints = [
    new THREE.Vector3(0.00, 0.18, leafSurfaceZ(0.00, 0.18)),
    new THREE.Vector3(0.16, 0.36, leafSurfaceZ(0.16, 0.36)),
    new THREE.Vector3(0.38, 0.48, leafSurfaceZ(0.38, 0.48)),
    new THREE.Vector3(0.62, 0.52, leafSurfaceZ(0.62, 0.52)),
    new THREE.Vector3(0.86, 0.50, leafSurfaceZ(0.86, 0.50)),
    new THREE.Vector3(1.06, 0.42, leafSurfaceZ(1.06, 0.42)),
    new THREE.Vector3(1.16, 0.32, leafSurfaceZ(1.16, 0.32)),
    new THREE.Vector3(0.94, 0.27, leafSurfaceZ(0.94, 0.27)),
    new THREE.Vector3(0.68, 0.21, leafSurfaceZ(0.68, 0.21)),
    new THREE.Vector3(0.40, 0.17, leafSurfaceZ(0.40, 0.17)),
    new THREE.Vector3(0.16, 0.15, leafSurfaceZ(0.16, 0.15)),
  ];
  const leaf_edgeCurve = new THREE.CatmullRomCurve3(
    leaf_edgePoints,
    true,
    "centripetal"
  );
  const leaf_edgeGeom = new THREE.TubeGeometry(
    leaf_edgeCurve,
    72,
    0.006,
    6,
    true
  );
  const leaf_edge = new THREE.Mesh(leaf_edgeGeom, leaf_edgeMat);
  leaf_group.add(leaf_edge);

  const petiolePoints = [
    new THREE.Vector3(-0.045, 0.205, 0.006),
    new THREE.Vector3(0.015, 0.195, 0.012),
    new THREE.Vector3(0.105, 0.180, 0.018),
    new THREE.Vector3(0.220, 0.170, 0.023),
    new THREE.Vector3(0.350, 0.175, 0.027),
  ];
  const petioleGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(petiolePoints, false, "centripetal"),
    28,
    0.024,
    10,
    false
  );
  const petiole = new THREE.Mesh(petioleGeom, stem_highlightMat);
  leaf_group.add(petiole);

  const central_veinPoints = [];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    const x = 0.035 + 1.04 * t;
    const y = 0.195 + 0.105 * t + 0.012 * Math.sin(Math.PI * t);
    central_veinPoints.push(
      new THREE.Vector3(x, y, leafSurfaceZ(x, y) + 0.004)
    );
  }
  const central_veinGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(central_veinPoints, false, "centripetal"),
    40,
    0.006,
    7,
    false
  );
  const central_vein = new THREE.Mesh(central_veinGeom, veinMat);
  leaf_group.add(central_vein);

  const secondary_veins = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const x0 = 0.15 + i * 0.125;
    const t0 = x0 / 1.16;
    const lowerY = 0.18 + 0.012 * t0;
    const upperY = 0.32 + 0.23 * Math.sin(Math.PI * t0);
    const startY = 0.20 + 0.10 * t0;

    const upperPoints = [];
    for (let j = 0; j <= 3; j++) {
      const s = j / 3;
      const x = x0 + 0.075 * s;
      const y = startY + (upperY - startY) * (0.82 * s - 0.05 * s * s);
      upperPoints.push(
        new THREE.Vector3(x, y, leafSurfaceZ(x, y) + 0.003)
      );
    }
    const upper_veinGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(upperPoints, false, "centripetal"),
      12,
      0.0028,
      5,
      false
    );
    const upper_vein = new THREE.Mesh(upper_veinGeom, veinMat);
    secondary_veins.add(upper_vein);

    const lowerPoints = [];
    for (let j = 0; j <= 3; j++) {
      const s = j / 3;
      const x = x0 + 0.070 * s;
      const y = startY + (lowerY - startY) * (0.76 * s - 0.04 * s * s);
      lowerPoints.push(
        new THREE.Vector3(x, y, leafSurfaceZ(x, y) + 0.003)
      );
    }
    const lower_veinGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(lowerPoints, false, "centripetal"),
      12,
      0.0025,
      5,
      false
    );
    const lower_vein = new THREE.Mesh(lower_veinGeom, veinMat);
    secondary_veins.add(lower_vein);
  }
  leaf_group.add(secondary_veins);

  const dropletX = 0.49;
  const dropletY = 0.315;
  const dropletZ = leafSurfaceZ(dropletX, dropletY) + 0.034;

  const water_dropletGeom = new THREE.SphereGeometry(0.075, 32, 20);
  const water_droplet = new THREE.Mesh(water_dropletGeom, water_dropletMat);
  water_droplet.position.set(dropletX, dropletY, dropletZ);
  water_droplet.scale.set(1.0, 0.96, 0.90);
  leaf_group.add(water_droplet);

  const droplet_coreGeom = new THREE.SphereGeometry(0.052, 20, 12);
  const droplet_core = new THREE.Mesh(droplet_coreGeom, droplet_coreMat);
  droplet_core.position.set(
    dropletX - 0.006,
    dropletY - 0.004,
    dropletZ + 0.002
  );
  droplet_core.scale.set(1.0, 0.88, 0.72);
  leaf_group.add(droplet_core);

  const droplet_highlightGeom = new THREE.SphereGeometry(0.014, 14, 8);
  const droplet_highlight = new THREE.Mesh(
    droplet_highlightGeom,
    droplet_highlightMat
  );
  droplet_highlight.position.set(
    dropletX - 0.025,
    dropletY + 0.027,
    dropletZ + 0.064
  );
  droplet_highlight.scale.set(1.25, 0.72, 0.42);
  leaf_group.add(droplet_highlight);

  const droplet_glintGeom = new THREE.SphereGeometry(0.006, 10, 6);
  const droplet_glint = new THREE.Mesh(
    droplet_glintGeom,
    droplet_highlightMat
  );
  droplet_glint.position.set(
    dropletX + 0.026,
    dropletY + 0.010,
    dropletZ + 0.067
  );
  droplet_glint.scale.set(1.0, 0.75, 0.45);
  leaf_group.add(droplet_glint);

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