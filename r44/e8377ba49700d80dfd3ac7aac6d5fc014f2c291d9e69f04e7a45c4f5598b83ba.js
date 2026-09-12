// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "chocolate_layered_confection";

  const chocolateMat = new THREE.MeshStandardMaterial({
    color: 0x6f4035,
    metalness: 0.0,
    roughness: 0.7,
  });
  const ganacheMat = new THREE.MeshStandardMaterial({
    color: 0x57291f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const crumbMat = new THREE.MeshStandardMaterial({
    color: 0x6b3828,
    metalness: 0.0,
    roughness: 0.9,
  });
  const darkCrumbMat = new THREE.MeshStandardMaterial({
    color: 0x2b140f,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xe8d5a0,
    metalness: 0.0,
    roughness: 0.8,
  });
  const creamHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xf0dfb8,
    metalness: 0.0,
    roughness: 0.85,
  });
  const creamPocketMat = new THREE.MeshStandardMaterial({
    color: 0xb89458,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  function makeTaperedBlockGeometry(levels, cornerSegments) {
    const positions = [];
    const indices = [];
    const rings = [];

    function addRing(level) {
      const ring = [];
      const hw = level.hw;
      const hd = level.hd;
      const y = level.y;
      const r = level.r;
      const centers = [
        [hw - r, hd - r],
        [-hw + r, hd - r],
        [-hw + r, -hd + r],
        [hw - r, -hd + r],
      ];

      for (let corner = 0; corner < 4; corner++) {
        const start = corner * Math.PI * 0.5;
        for (let j = 0; j <= cornerSegments; j++) {
          const angle = start + j / cornerSegments * Math.PI * 0.5;
          ring.push([
            centers[corner][0] + Math.cos(angle) * r,
            y,
            centers[corner][1] + Math.sin(angle) * r,
          ]);
        }
      }
      return ring;
    }

    for (const level of levels) rings.push(addRing(level));

    for (const ring of rings) {
      for (const point of ring) positions.push(point[0], point[1], point[2]);
    }

    const ringSize = rings[0].length;
    for (let level = 0; level < rings.length - 1; level++) {
      const lower = level * ringSize;
      const upper = (level + 1) * ringSize;
      for (let i = 0; i < ringSize; i++) {
        const next = (i + 1) % ringSize;
        indices.push(
          lower + i, lower + next, upper + next,
          lower + i, upper + next, upper + i
        );
      }
    }

    const bottomCenter = positions.length / 3;
    positions.push(0, levels[0].y, 0);
    for (let i = 0; i < ringSize; i++) {
      indices.push(bottomCenter, (i + 1) % ringSize, i);
    }

    const topCenter = positions.length / 3;
    const topOffset = (levels.length - 1) * ringSize;
    positions.push(0, levels[levels.length - 1].y, 0);
    for (let i = 0; i < ringSize; i++) {
      indices.push(
        topCenter,
        topOffset + i,
        topOffset + (i + 1) % ringSize
      );
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

  function makeRoundedSlabGeometry(width, depth, height, radius, bevel) {
    const shape = new THREE.Shape();
    const x0 = -width * 0.5;
    const x1 = width * 0.5;
    const z0 = -depth * 0.5;
    const z1 = depth * 0.5;

    shape.moveTo(x0 + radius, z0);
    shape.lineTo(x1 - radius, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + radius);
    shape.lineTo(x1, z1 - radius);
    shape.quadraticCurveTo(x1, z1, x1 - radius, z1);
    shape.lineTo(x0 + radius, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - radius);
    shape.lineTo(x0, z0 + radius);
    shape.quadraticCurveTo(x0, z0, x0 + radius, z0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -height * 0.5);
    return geometry;
  }

  function makeRoundedLoopGeometry(width, depth, radius, y, tubeRadius) {
    const points = [];
    const corners = [
      [width * 0.5 - radius, depth * 0.5 - radius, 0],
      [-width * 0.5 + radius, depth * 0.5 - radius, Math.PI * 0.5],
      [-width * 0.5 + radius, -depth * 0.5 + radius, Math.PI],
      [width * 0.5 - radius, -depth * 0.5 + radius, Math.PI * 1.5],
    ];

    for (const corner of corners) {
      for (let i = 0; i <= 5; i++) {
        const angle = corner[2] + i / 5 * Math.PI * 0.5;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          y,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }

    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal",
      0.5
    );
    return new THREE.TubeGeometry(curve, 72, tubeRadius, 6, true);
  }

  const bottom_chocolate_baseGeom = makeTaperedBlockGeometry([
    { y: 0.00, hw: 0.590, hd: 0.470, r: 0.055 },
    { y: 0.025, hw: 0.610, hd: 0.490, r: 0.065 },
    { y: 0.155, hw: 0.605, hd: 0.485, r: 0.070 },
    { y: 0.195, hw: 0.585, hd: 0.470, r: 0.075 },
  ], 5);
  const bottom_chocolate_base = new THREE.Mesh(
    bottom_chocolate_baseGeom,
    chocolateMat
  );
  bottom_chocolate_base.name = "bottom_chocolate_base";
  root.add(bottom_chocolate_base);

  const cream_fillingGeom = makeTaperedBlockGeometry([
    { y: 0.155, hw: 0.575, hd: 0.455, r: 0.065 },
    { y: 0.180, hw: 0.590, hd: 0.470, r: 0.075 },
    { y: 0.305, hw: 0.585, hd: 0.465, r: 0.075 },
    { y: 0.335, hw: 0.565, hd: 0.450, r: 0.070 },
  ], 5);
  const cream_filling = new THREE.Mesh(cream_fillingGeom, creamMat);
  cream_filling.name = "cream_filling";
  root.add(cream_filling);

  const middle_chocolate_layerGeom = makeTaperedBlockGeometry([
    { y: 0.295, hw: 0.580, hd: 0.465, r: 0.070 },
    { y: 0.320, hw: 0.600, hd: 0.480, r: 0.075 },
    { y: 0.475, hw: 0.585, hd: 0.465, r: 0.080 },
    { y: 0.515, hw: 0.560, hd: 0.445, r: 0.080 },
  ], 5);
  const middle_chocolate_layer = new THREE.Mesh(
    middle_chocolate_layerGeom,
    chocolateMat
  );
  middle_chocolate_layer.name = "middle_chocolate_layer";
  root.add(middle_chocolate_layer);

  const crumb_layerGeom = makeTaperedBlockGeometry([
    { y: 0.470, hw: 0.575, hd: 0.455, r: 0.075 },
    { y: 0.500, hw: 0.595, hd: 0.475, r: 0.080 },
    { y: 0.625, hw: 0.580, hd: 0.460, r: 0.080 },
    { y: 0.665, hw: 0.550, hd: 0.435, r: 0.075 },
  ], 5);
  const crumb_layer = new THREE.Mesh(crumb_layerGeom, crumbMat);
  crumb_layer.name = "crumb_layer";
  root.add(crumb_layer);

  const top_ganacheGeom = makeRoundedSlabGeometry(
    1.190,
    0.970,
    0.075,
    0.105,
    0.018
  );
  const top_ganache = new THREE.Mesh(top_ganacheGeom, ganacheMat);
  top_ganache.name = "top_ganache";
  top_ganache.rotation.x = -Math.PI * 0.5;
  top_ganache.position.y = 0.690;
  root.add(top_ganache);

  const ganache_rimGeom = makeRoundedLoopGeometry(
    1.175,
    0.955,
    0.095,
    0.650,
    0.010
  );
  const ganache_rim = new THREE.Mesh(ganache_rimGeom, ganacheMat);
  ganache_rim.name = "ganache_rim";
  root.add(ganache_rim);

  const front_ganache_dripShape = new THREE.Shape();
  front_ganache_dripShape.moveTo(-0.125, 0.060);
  front_ganache_dripShape.bezierCurveTo(
    -0.110, 0.015,
    -0.085, -0.020,
    -0.070, -0.065
  );
  front_ganache_dripShape.bezierCurveTo(
    -0.055, -0.135,
    -0.025, -0.175,
    0.010, -0.175
  );
  front_ganache_dripShape.bezierCurveTo(
    0.055, -0.175,
    0.065, -0.115,
    0.070, -0.065
  );
  front_ganache_dripShape.bezierCurveTo(
    0.075, -0.015,
    0.105, 0.020,
    0.130, 0.060
  );
  front_ganache_dripShape.closePath();

  const front_ganache_dripGeom = new THREE.ExtrudeGeometry(
    front_ganache_dripShape,
    {
      depth: 0.024,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
    }
  );
  const front_ganache_drip = new THREE.Mesh(
    front_ganache_dripGeom,
    ganacheMat
  );
  front_ganache_drip.name = "front_ganache_drip";
  front_ganache_drip.position.set(0.18, 0.645, 0.470);
  root.add(front_ganache_drip);

  const right_ganache_dripShape = new THREE.Shape();
  right_ganache_dripShape.moveTo(-0.085, 0.045);
  right_ganache_dripShape.bezierCurveTo(
    -0.070, 0.005,
    -0.050, -0.020,
    -0.040, -0.060
  );
  right_ganache_dripShape.bezierCurveTo(
    -0.030, -0.105,
    -0.010, -0.125,
    0.015, -0.120
  );
  right_ganache_dripShape.bezierCurveTo(
    0.045, -0.112,
    0.045, -0.060,
    0.055, -0.025
  );
  right_ganache_dripShape.bezierCurveTo(
    0.065, 0.010,
    0.075, 0.030,
    0.090, 0.045
  );
  right_ganache_dripShape.closePath();

  const right_ganache_dripGeom = new THREE.ExtrudeGeometry(
    right_ganache_dripShape,
    {
      depth: 0.022,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2,
    }
  );
  const right_ganache_drip = new THREE.Mesh(
    right_ganache_dripGeom,
    ganacheMat
  );
  right_ganache_drip.name = "right_ganache_drip";
  right_ganache_drip.rotation.y = Math.PI * 0.5;
  right_ganache_drip.position.set(0.588, 0.645, 0.135);
  root.add(right_ganache_drip);

  const crumbGeom = new THREE.IcosahedronGeometry(1, 0);
  const instanceDummy = new THREE.Object3D();

  function setInstance(
    mesh,
    index,
    x,
    y,
    z,
    sx,
    sy,
    sz,
    rx,
    ry,
    rz
  ) {
    instanceDummy.position.set(x, y, z);
    instanceDummy.rotation.set(rx, ry, rz);
    instanceDummy.scale.set(sx, sy, sz);
    instanceDummy.updateMatrix();
    mesh.setMatrixAt(index, instanceDummy.matrix);
  }

  const front_crumb_clusters = new THREE.InstancedMesh(
    crumbGeom,
    crumbMat,
    72
  );
  front_crumb_clusters.name = "front_crumb_clusters";
  for (let i = 0; i < 72; i++) {
    const column = i % 18;
    const row = Math.floor(i / 18);
    const x = -0.525 + column / 17 * 1.05
      + Math.sin(i * 2.17) * 0.009;
    const y = 0.505 + row * 0.038
      + Math.sin(i * 1.31) * 0.008;
    const z = 0.468 + Math.sin(i * 0.83) * 0.008;
    const size = 0.012 + (i % 5) * 0.0028;
    setInstance(
      front_crumb_clusters,
      i,
      x, y, z,
      size * (1.0 + (i % 3) * 0.2),
      size * (0.75 + (i % 4) * 0.12),
      size * 0.55,
      i * 0.37,
      i * 0.61,
      i * 0.23
    );
  }
  front_crumb_clusters.instanceMatrix.needsUpdate = true;
  root.add(front_crumb_clusters);

  const right_crumb_clusters = new THREE.InstancedMesh(
    crumbGeom,
    crumbMat,
    48
  );
  right_crumb_clusters.name = "right_crumb_clusters";
  for (let i = 0; i < 48; i++) {
    const column = i % 12;
    const row = Math.floor(i / 12);
    const z = -0.395 + column / 11 * 0.79
      + Math.sin(i * 1.73) * 0.008;
    const y = 0.505 + row * 0.038
      + Math.sin(i * 0.91) * 0.008;
    const x = 0.588 + Math.sin(i * 1.19) * 0.007;
    const size = 0.012 + (i % 4) * 0.003;
    setInstance(
      right_crumb_clusters,
      i,
      x, y, z,
      size * 0.55,
      size * (0.8 + (i % 3) * 0.15),
      size * (1.0 + (i % 4) * 0.15),
      i * 0.29,
      i * 0.47,
      i * 0.71
    );
  }
  right_crumb_clusters.instanceMatrix.needsUpdate = true;
  root.add(right_crumb_clusters);

  const front_crumb_holesGeom = new THREE.CircleGeometry(1, 10);
  const front_crumb_holes = new THREE.InstancedMesh(
    front_crumb_holesGeom,
    darkCrumbMat,
    42
  );
  front_crumb_holes.name = "front_crumb_holes";
  for (let i = 0; i < 42; i++) {
    const column = i % 14;
    const row = Math.floor(i / 14);
    const x = -0.495 + column / 13 * 0.99
      + Math.sin(i * 2.41) * 0.012;
    const y = 0.515 + row * 0.052
      + Math.sin(i * 1.17) * 0.010;
    const size = 0.008 + (i % 5) * 0.0025;
    setInstance(
      front_crumb_holes,
      i,
      x, y, 0.479,
      size * (1.0 + (i % 3) * 0.25),
      size,
      1,
      0,
      0,
      i * 0.43
    );
  }
  front_crumb_holes.instanceMatrix.needsUpdate = true;
  root.add(front_crumb_holes);

  const right_crumb_holesGeom = new THREE.CircleGeometry(1, 10);
  const right_crumb_holes = new THREE.InstancedMesh(
    right_crumb_holesGeom,
    darkCrumbMat,
    24
  );
  right_crumb_holes.name = "right_crumb_holes";
  for (let i = 0; i < 24; i++) {
    const column = i % 8;
    const row = Math.floor(i / 8);
    const z = -0.355 + column / 7 * 0.71
      + Math.sin(i * 1.67) * 0.010;
    const y = 0.518 + row * 0.052
      + Math.sin(i * 0.79) * 0.009;
    const size = 0.008 + (i % 4) * 0.0025;
    setInstance(
      right_crumb_holes,
      i,
      0.599, y, z,
      size,
      size * (1.0 + (i % 3) * 0.2),
      1,
      0,
      Math.PI * 0.5,
      i * 0.39
    );
  }
  right_crumb_holes.instanceMatrix.needsUpdate = true;
  root.add(right_crumb_holes);

  const front_chocolate_poresGeom = new THREE.CircleGeometry(1, 9);
  const front_chocolate_pores = new THREE.InstancedMesh(
    front_chocolate_poresGeom,
    darkCrumbMat,
    44
  );
  front_chocolate_pores.name = "front_chocolate_pores";
  for (let i = 0; i < 44; i++) {
    const column = i % 22;
    const row = Math.floor(i / 22);
    const x = -0.505 + column / 21 * 1.01
      + Math.sin(i * 1.91) * 0.008;
    const y = row === 0
      ? 0.045 + Math.sin(i * 1.13) * 0.018
      : 0.345 + Math.sin(i * 1.37) * 0.055;
    const size = 0.005 + (i % 5) * 0.0018;
    setInstance(
      front_chocolate_pores,
      i,
      x, y, 0.489,
      size * (1.0 + (i % 3) * 0.2),
      size,
      1,
      0,
      0,
      i * 0.31
    );
  }
  front_chocolate_pores.instanceMatrix.needsUpdate = true;
  root.add(front_chocolate_pores);

  const right_chocolate_poresGeom = new THREE.CircleGeometry(1, 9);
  const right_chocolate_pores = new THREE.InstancedMesh(
    right_chocolate_poresGeom,
    darkCrumbMat,
    28
  );
  right_chocolate_pores.name = "right_chocolate_pores";
  for (let i = 0; i < 28; i++) {
    const column = i % 14;
    const row = Math.floor(i / 14);
    const z = -0.385 + column / 13 * 0.77
      + Math.sin(i * 1.49) * 0.007;
    const y = row === 0
      ? 0.050 + Math.sin(i * 0.87) * 0.018
      : 0.345 + Math.sin(i * 1.21) * 0.052;
    const size = 0.005 + (i % 4) * 0.0019;
    setInstance(
      right_chocolate_pores,
      i,
      0.609, y, z,
      size,
      size * (1.0 + (i % 3) * 0.18),
      1,
      0,
      Math.PI * 0.5,
      i * 0.27
    );
  }
  right_chocolate_pores.instanceMatrix.needsUpdate = true;
  root.add(right_chocolate_pores);

  const cream_chocolate_flecksGeom = new THREE.CircleGeometry(1, 9);
  const cream_chocolate_flecks = new THREE.InstancedMesh(
    cream_chocolate_flecksGeom,
    chocolateMat,
    28
  );
  cream_chocolate_flecks.name = "cream_chocolate_flecks";
  for (let i = 0; i < 28; i++) {
    const column = i % 14;
    const row = Math.floor(i / 14);
    const x = -0.485 + column / 13 * 0.97
      + Math.sin(i * 2.03) * 0.010;
    const y = 0.205 + row * 0.065 + Math.sin(i * 0.73) * 0.018;
    const size = 0.006 + (i % 4) * 0.0025;
    setInstance(
      cream_chocolate_flecks,
      i,
      x, y, 0.478,
      size * 1.5,
      size,
      1,
      0,
      0,
      i * 0.51
    );
  }
  cream_chocolate_flecks.instanceMatrix.needsUpdate = true;
  root.add(cream_chocolate_flecks);

  const right_cream_chocolate_flecksGeom = new THREE.CircleGeometry(1, 9);
  const right_cream_chocolate_flecks = new THREE.InstancedMesh(
    right_cream_chocolate_flecksGeom,
    chocolateMat,
    14
  );
  right_cream_chocolate_flecks.name = "right_cream_chocolate_flecks";
  for (let i = 0; i < 14; i++) {
    const z = -0.350 + i / 13 * 0.70
      + Math.sin(i * 1.81) * 0.009;
    const y = 0.215 + Math.sin(i * 0.67) * 0.055;
    const size = 0.006 + (i % 4) * 0.0023;
    setInstance(
      right_cream_chocolate_flecks,
      i,
      0.598, y, z,
      size * 1.4,
      size,
      1,
      0,
      Math.PI * 0.5,
      i * 0.44
    );
  }
  right_cream_chocolate_flecks.instanceMatrix.needsUpdate = true;
  root.add(right_cream_chocolate_flecks);

  const cream_air_pocketsGeom = new THREE.CircleGeometry(1, 10);
  const cream_air_pockets = new THREE.InstancedMesh(
    cream_air_pocketsGeom,
    creamPocketMat,
    20
  );
  cream_air_pockets.name = "cream_air_pockets";
  for (let i = 0; i < 20; i++) {
    const column = i % 10;
    const row = Math.floor(i / 10);
    const x = -0.455 + column / 9 * 0.91
      + Math.sin(i * 1.57) * 0.012;
    const y = 0.215 + row * 0.055 + Math.sin(i * 0.93) * 0.018;
    const size = 0.005 + (i % 4) * 0.0018;
    setInstance(
      cream_air_pockets,
      i,
      x, y, 0.479,
      size * 1.5,
      size,
      1,
      0,
      0,
      i * 0.36
    );
  }
  cream_air_pockets.instanceMatrix.needsUpdate = true;
  root.add(cream_air_pockets);

  const right_cream_air_pocketsGeom = new THREE.CircleGeometry(1, 10);
  const right_cream_air_pockets = new THREE.InstancedMesh(
    right_cream_air_pocketsGeom,
    creamPocketMat,
    10
  );
  right_cream_air_pockets.name = "right_cream_air_pockets";
  for (let i = 0; i < 10; i++) {
    const z = -0.335 + i / 9 * 0.67
      + Math.sin(i * 1.29) * 0.010;
    const y = 0.220 + Math.sin(i * 0.81) * 0.052;
    const size = 0.005 + (i % 3) * 0.002;
    setInstance(
      right_cream_air_pockets,
      i,
      0.599, y, z,
      size * 1.4,
      size,
      1,
      0,
      Math.PI * 0.5,
      i * 0.32
    );
  }
  right_cream_air_pockets.instanceMatrix.needsUpdate = true;
  root.add(right_cream_air_pockets);

  const cream_exposed_patchesGeom = new THREE.SphereGeometry(1, 12, 7);
  const cream_exposed_patches = new THREE.InstancedMesh(
    cream_exposed_patchesGeom,
    creamHighlightMat,
    7
  );
  cream_exposed_patches.name = "cream_exposed_patches";
  for (let i = 0; i < 7; i++) {
    const x = -0.42 + i * 0.14
      + Math.sin(i * 1.7) * 0.025;
    const y = 0.305 + Math.sin(i * 0.9) * 0.012;
    setInstance(
      cream_exposed_patches,
      i,
      x, y, 0.470,
      0.035 + (i % 3) * 0.010,
      0.018 + (i % 2) * 0.007,
      0.006,
      0,
      0,
      i * 0.41
    );
  }
  cream_exposed_patches.instanceMatrix.needsUpdate = true;
  root.add(cream_exposed_patches);

  const right_cream_exposed_patchesGeom = new THREE.SphereGeometry(1, 12, 7);
  const right_cream_exposed_patches = new THREE.InstancedMesh(
    right_cream_exposed_patchesGeom,
    creamHighlightMat,
    4
  );
  right_cream_exposed_patches.name = "right_cream_exposed_patches";
  for (let i = 0; i < 4; i++) {
    const z = -0.25 + i * 0.17
      + Math.sin(i * 1.3) * 0.018;
    const y = 0.305 + Math.sin(i * 0.8) * 0.012;
    setInstance(
      right_cream_exposed_patches,
      i,
      0.588, y, z,
      0.006,
      0.020 + (i % 2) * 0.006,
      0.038 + (i % 3) * 0.008,
      0,
      0,
      i * 0.37
    );
  }
  right_cream_exposed_patches.instanceMatrix.needsUpdate = true;
  root.add(right_cream_exposed_patches);

  const bottom_edge_crumbsGeom = new THREE.IcosahedronGeometry(1, 0);
  const bottom_edge_crumbs = new THREE.InstancedMesh(
    bottom_edge_crumbsGeom,
    crumbMat,
    40
  );
  bottom_edge_crumbs.name = "bottom_edge_crumbs";
  for (let i = 0; i < 40; i++) {
    const size = 0.008 + (i % 5) * 0.0022;
    if (i < 24) {
      const x = -0.565 + i / 23 * 1.13
        + Math.sin(i * 2.23) * 0.010;
      const y = 0.018 + Math.sin(i * 1.41) * 0.012;
      const z = 0.482 + Math.sin(i * 0.67) * 0.007;
      setInstance(
        bottom_edge_crumbs,
        i,
        x, y, z,
        size * 1.2,
        size,
        size * 0.8,
        i * 0.31,
        i * 0.49,
        i * 0.63
      );
    } else {
      const j = i - 24;
      const z = -0.425 + j / 15 * 0.85
        + Math.sin(j * 1.87) * 0.009;
      const y = 0.018 + Math.sin(j * 1.19) * 0.012;
      const x = 0.603 + Math.sin(j * 0.71) * 0.006;
      setInstance(
        bottom_edge_crumbs,
        i,
        x, y, z,
        size * 0.8,
        size,
        size * 1.2,
        j * 0.43,
        j * 0.27,
        j * 0.59
      );
    }
  }
  bottom_edge_crumbs.instanceMatrix.needsUpdate = true;
  root.add(bottom_edge_crumbs);

  const top_specklesGeom = new THREE.SphereGeometry(1, 8, 5);
  const top_speckles = new THREE.InstancedMesh(
    top_specklesGeom,
    creamHighlightMat,
    10
  );
  top_speckles.name = "top_speckles";
  for (let i = 0; i < 10; i++) {
    const x = -0.43 + ((i * 7) % 11) / 10 * 0.86;
    const z = -0.34 + ((i * 5 + 2) % 11) / 10 * 0.68;
    const size = 0.004 + (i % 3) * 0.0015;
    setInstance(
      top_speckles,
      i,
      x, 0.742, z,
      size * 1.5,
      size * 0.35,
      size,
      0,
      i * 0.4,
      0
    );
  }
  top_speckles.instanceMatrix.needsUpdate = true;
  root.add(top_speckles);

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