function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "motorboat";

  const hull_group = new THREE.Group();
  hull_group.name = "hull_group";
  root.add(hull_group);

  const cockpit_group = new THREE.Group();
  cockpit_group.name = "cockpit_group";
  root.add(cockpit_group);

  const windshield_group = new THREE.Group();
  windshield_group.name = "windshield_group";
  root.add(windshield_group);

  const outboard_group = new THREE.Group();
  outboard_group.name = "outboard_group";
  root.add(outboard_group);

  const bow_hardware_group = new THREE.Group();
  bow_hardware_group.name = "bow_hardware_group";
  root.add(bow_hardware_group);

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d3,
    metalness: 0.05,
    roughness: 0.3
  });
  const deckMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e3,
    metalness: 0,
    roughness: 0.28
  });
  const lowerHullMat = new THREE.MeshStandardMaterial({
    color: 0x252827,
    metalness: 0,
    roughness: 0.5
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x171919,
    metalness: 0,
    roughness: 0.45
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xc9c9c5,
    metalness: 0.35,
    roughness: 0.18
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9d2d0,
    metalness: 0,
    roughness: 0.12,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide
  });
  const motorMat = new THREE.MeshStandardMaterial({
    color: 0x111313,
    metalness: 0.15,
    roughness: 0.45
  });
  const motorAccentMat = new THREE.MeshStandardMaterial({
    color: 0x343839,
    metalness: 0.1,
    roughness: 0.5
  });
  const upholsteryMat = new THREE.MeshStandardMaterial({
    color: 0xd8cdbb,
    metalness: 0,
    roughness: 0.65
  });
  const cockpitMat = new THREE.MeshStandardMaterial({
    color: 0x5b5750,
    metalness: 0,
    roughness: 0.7
  });
  const redDecalMat = new THREE.MeshStandardMaterial({
    color: 0xa51e1e,
    metalness: 0,
    roughness: 0.45
  });

  function createLoftGeometry(stations, ringBuilder) {
    const rings = stations.map(ringBuilder);
    const ringSize = rings[0].length;
    const positions = [];
    const indices = [];

    for (let i = 0; i < rings.length; i++) {
      for (let j = 0; j < ringSize; j++) {
        positions.push(rings[i][j][0], rings[i][j][1], stations[i].z);
      }
    }

    for (let i = 0; i < rings.length - 1; i++) {
      for (let j = 0; j < ringSize; j++) {
        const nextJ = (j + 1) % ringSize;
        const a = i * ringSize + j;
        const b = i * ringSize + nextJ;
        const c = (i + 1) * ringSize + nextJ;
        const d = (i + 1) * ringSize + j;
        indices.push(a, d, b, b, d, c);
      }
    }

    for (let j = 1; j < ringSize - 1; j++) {
      indices.push(0, j + 1, j);
    }

    const end = (rings.length - 1) * ringSize;
    for (let j = 1; j < ringSize - 1; j++) {
      indices.push(end, end + j, end + j + 1);
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

  function createPrismGeometry(profile, width) {
    const positions = [];
    const indices = [];
    const count = profile.length;

    for (let i = 0; i < count; i++) {
      positions.push(profile[i][0], profile[i][1], -width / 2);
    }
    for (let i = 0; i < count; i++) {
      positions.push(profile[i][0], profile[i][1], width / 2);
    }

    for (let i = 1; i < count - 1; i++) {
      indices.push(0, i, i + 1);
      indices.push(count, count + i + 1, count + i);
    }

    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      indices.push(i, next, count + i);
      indices.push(next, count + next, count + i);
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

  function createQuadGeometry(points) {
    const positions = [];
    for (const point of points) {
      positions.push(point.x, point.y, point.z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex([0, 1, 2, 0, 2, 3]);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createTube(name, points, radius, material, parent) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, false, "centripetal");
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, points.length === 2 ? 1 : 24, radius, 8, false),
      material
    );
    tube.name = name;
    parent.add(tube);
    return tube;
  }

  const upperStations = [
    { z: -2.35, w: 0.72, bottom: -0.05, top: 0.62 },
    { z: -1.75, w: 0.86, bottom: -0.08, top: 0.66 },
    { z: -0.70, w: 0.92, bottom: -0.10, top: 0.69 },
    { z: 0.45, w: 0.90, bottom: -0.08, top: 0.72 },
    { z: 1.45, w: 0.78, bottom: -0.02, top: 0.76 },
    { z: 2.35, w: 0.48, bottom: 0.12, top: 0.80 },
    { z: 3.05, w: 0.12, bottom: 0.38, top: 0.82 },
    { z: 3.25, w: 0.025, bottom: 0.62, top: 0.78 }
  ];

  const main_hull = new THREE.Mesh(
    createLoftGeometry(upperStations, (station) => {
      const span = station.top - station.bottom;
      return [
        [-station.w, station.bottom],
        [-station.w * 1.02, station.bottom + span * 0.28],
        [-station.w * 0.94, station.top - span * 0.12],
        [-station.w * 0.82, station.top],
        [station.w * 0.82, station.top],
        [station.w * 0.94, station.top - span * 0.12],
        [station.w * 1.02, station.bottom + span * 0.28],
        [station.w, station.bottom]
      ];
    }),
    hullMat
  );
  main_hull.name = "main_hull";
  hull_group.add(main_hull);

  const lowerStations = [
    { z: -2.25, w: 0.62, top: -0.08, bottom: -0.42 },
    { z: -1.55, w: 0.78, top: -0.10, bottom: -0.62 },
    { z: -0.45, w: 0.82, top: -0.12, bottom: -0.72 },
    { z: 0.75, w: 0.76, top: -0.10, bottom: -0.68 },
    { z: 1.75, w: 0.62, top: -0.04, bottom: -0.50 },
    { z: 2.55, w: 0.32, top: 0.12, bottom: -0.18 },
    { z: 3.05, w: 0.04, top: 0.42, bottom: 0.30 }
  ];

  const lower_hull = new THREE.Mesh(
    createLoftGeometry(lowerStations, (station) => {
      const span = station.top - station.bottom;
      return [
        [-station.w, station.bottom],
        [-station.w * 1.03, station.bottom + span * 0.30],
        [-station.w * 0.90, station.top - span * 0.08],
        [station.w * 0.90, station.top - span * 0.08],
        [station.w * 1.03, station.bottom + span * 0.30],
        [station.w, station.bottom]
      ];
    }),
    lowerHullMat
  );
  lower_hull.name = "lower_hull";
  hull_group.add(lower_hull);

  const foredeck = new THREE.Mesh(
    createLoftGeometry(
      upperStations.slice(4),
      (station) => [
        [-station.w * 0.80, station.top + 0.012],
        [station.w * 0.80, station.top + 0.012]
      ]
    ),
    deckMat
  );
  foredeck.name = "foredeck";
  hull_group.add(foredeck);

  const aft_deck = new THREE.Mesh(
    createLoftGeometry(
      upperStations.slice(0, 3),
      (station) => [
        [-station.w * 0.78, station.top + 0.012],
        [station.w * 0.78, station.top + 0.012]
      ]
    ),
    deckMat
  );
  aft_deck.name = "aft_deck";
  hull_group.add(aft_deck);

  const port_rub_rail = createTube(
    "port_rub_rail",
    upperStations.map((station) => new THREE.Vector3(
      -station.w * 0.96,
      station.top - 0.075,
      station.z
    )),
    0.025,
    chromeMat,
    hull_group
  );

  const starboard_rub_rail = createTube(
    "starboard_rub_rail",
    upperStations.map((station) => new THREE.Vector3(
      station.w * 0.96,
      station.top - 0.075,
      station.z
    )),
    0.025,
    chromeMat,
    hull_group
  );

  const port_lower_stripe = createTube(
    "port_lower_stripe",
    lowerStations.map((station) => new THREE.Vector3(
      -station.w * 1.035,
      station.bottom + 0.12,
      station.z
    )),
    0.018,
    hullMat,
    hull_group
  );

  const starboard_lower_stripe = createTube(
    "starboard_lower_stripe",
    lowerStations.map((station) => new THREE.Vector3(
      station.w * 1.035,
      station.bottom + 0.12,
      station.z
    )),
    0.018,
    hullMat,
    hull_group
  );

  const port_chine_line = createTube(
    "port_chine_line",
    upperStations.map((station) => new THREE.Vector3(
      -station.w * 1.025,
      station.bottom + 0.13,
      station.z
    )),
    0.012,
    trimMat,
    hull_group
  );

  const starboard_chine_line = createTube(
    "starboard_chine_line",
    upperStations.map((station) => new THREE.Vector3(
      station.w * 1.025,
      station.bottom + 0.13,
      station.z
    )),
    0.012,
    trimMat,
    hull_group
  );

  const cockpit_well = new THREE.Mesh(
    new THREE.BoxGeometry(1.28, 0.045, 1.35),
    cockpitMat
  );
  cockpit_well.name = "cockpit_well";
  cockpit_well.position.set(0, 0.675, -1.05);
  cockpit_group.add(cockpit_well);

  const coamingGeom = new THREE.BoxGeometry(0.075, 0.10, 1.45);

  const port_coaming = new THREE.Mesh(coamingGeom, deckMat);
  port_coaming.name = "port_coaming";
  port_coaming.position.set(-0.70, 0.705, -1.05);
  cockpit_group.add(port_coaming);

  const starboard_coaming = new THREE.Mesh(coamingGeom, deckMat);
  starboard_coaming.name = "starboard_coaming";
  starboard_coaming.position.set(0.70, 0.705, -1.05);
  cockpit_group.add(starboard_coaming);

  const rear_bench_base = new THREE.Mesh(
    new THREE.BoxGeometry(1.28, 0.18, 0.34),
    upholsteryMat
  );
  rear_bench_base.name = "rear_bench_base";
  rear_bench_base.position.set(0, 0.75, -1.55);
  cockpit_group.add(rear_bench_base);

  const rear_bench_backrest = new THREE.Mesh(
    new THREE.BoxGeometry(1.30, 0.34, 0.14),
    upholsteryMat
  );
  rear_bench_backrest.name = "rear_bench_backrest";
  rear_bench_backrest.position.set(0, 0.91, -1.70);
  rear_bench_backrest.rotation.x = -0.12;
  cockpit_group.add(rear_bench_backrest);

  const rear_bench_cushion = new THREE.Mesh(
    new THREE.SphereGeometry(1, 24, 12),
    upholsteryMat
  );
  rear_bench_cushion.name = "rear_bench_cushion";
  rear_bench_cushion.scale.set(0.62, 0.10, 0.18);
  rear_bench_cushion.position.set(0, 0.86, -1.48);
  cockpit_group.add(rear_bench_cushion);

  const helm_seat_base = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.16, 0.38),
    upholsteryMat
  );
  helm_seat_base.name = "helm_seat_base";
  helm_seat_base.position.set(0.34, 0.75, -0.72);
  cockpit_group.add(helm_seat_base);

  const helm_seat_backrest = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.36, 0.13),
    upholsteryMat
  );
  helm_seat_backrest.name = "helm_seat_backrest";
  helm_seat_backrest.position.set(0.34, 0.93, -0.88);
  helm_seat_backrest.rotation.x = -0.12;
  cockpit_group.add(helm_seat_backrest);

  const dashboard = new THREE.Mesh(
    new THREE.BoxGeometry(1.22, 0.13, 0.22),
    deckMat
  );
  dashboard.name = "dashboard";
  dashboard.position.set(0, 0.77, -0.12);
  dashboard.rotation.x = -0.08;
  cockpit_group.add(dashboard);

  const steering_wheel = new THREE.Mesh(
    new THREE.TorusGeometry(0.115, 0.014, 8, 24),
    trimMat
  );
  steering_wheel.name = "steering_wheel";
  steering_wheel.position.set(0.34, 0.91, -0.24);
  steering_wheel.rotation.x = -0.25;
  cockpit_group.add(steering_wheel);

  const steering_column = createTube(
    "steering_column",
    [
      new THREE.Vector3(0.34, 0.82, -0.15),
      new THREE.Vector3(0.34, 0.91, -0.24)
    ],
    0.018,
    trimMat,
    cockpit_group
  );

  const frontBottomZ = 0.18;
  const frontTopZ = -0.22;
  const rearBottomZ = -1.05;
  const rearTopZ = -0.78;

  const port_front_windshield = new THREE.Mesh(
    createQuadGeometry([
      new THREE.Vector3(-0.80, 0.75, frontBottomZ),
      new THREE.Vector3(-0.72, 1.28, frontTopZ),
      new THREE.Vector3(-0.015, 1.28, frontTopZ),
      new THREE.Vector3(-0.015, 0.75, frontBottomZ)
    ]),
    glassMat
  );
  port_front_windshield.name = "port_front_windshield";
  windshield_group.add(port_front_windshield);

  const starboard_front_windshield = new THREE.Mesh(
    createQuadGeometry([
      new THREE.Vector3(0.015, 0.75, frontBottomZ),
      new THREE.Vector3(0.015, 1.28, frontTopZ),
      new THREE.Vector3(0.72, 1.28, frontTopZ),
      new THREE.Vector3(0.80, 0.75, frontBottomZ)
    ]),
    glassMat
  );
  starboard_front_windshield.name = "starboard_front_windshield";
  windshield_group.add(starboard_front_windshield);

  const port_side_windshield = new THREE.Mesh(
    createQuadGeometry([
      new THREE.Vector3(-0.80, 0.75, frontBottomZ),
      new THREE.Vector3(-0.80, 0.75, rearBottomZ),
      new THREE.Vector3(-0.72, 1.28, rearTopZ),
      new THREE.Vector3(-0.72, 1.28, frontTopZ)
    ]),
    glassMat
  );
  port_side_windshield.name = "port_side_windshield";
  windshield_group.add(port_side_windshield);

  const starboard_side_windshield = new THREE.Mesh(
    createQuadGeometry([
      new THREE.Vector3(0.80, 0.75, rearBottomZ),
      new THREE.Vector3(0.80, 0.75, frontBottomZ),
      new THREE.Vector3(0.72, 1.28, frontTopZ),
      new THREE.Vector3(0.72, 1.28, rearTopZ)
    ]),
    glassMat
  );
  starboard_side_windshield.name = "starboard_side_windshield";
  windshield_group.add(starboard_side_windshield);

  const port_rear_windshield = new THREE.Mesh(
    createQuadGeometry([
      new THREE.Vector3(-0.80, 0.75, rearBottomZ),
      new THREE.Vector3(-0.64, 0.76, -1.42),
      new THREE.Vector3(-0.60, 1.18, -1.32),
      new THREE.Vector3(-0.72, 1.28, rearTopZ)
    ]),
    glassMat
  );
  port_rear_windshield.name = "port_rear_windshield";
  windshield_group.add(port_rear_windshield);

  const starboard_rear_windshield = new THREE.Mesh(
    createQuadGeometry([
      new THREE.Vector3(0.64, 0.76, -1.42),
      new THREE.Vector3(0.80, 0.75, rearBottomZ),
      new THREE.Vector3(0.72, 1.28, rearTopZ),
      new THREE.Vector3(0.60, 1.18, -1.32)
    ]),
    glassMat
  );
  starboard_rear_windshield.name = "starboard_rear_windshield";
  windshield_group.add(starboard_rear_windshield);

  const windshield_top_frame = createTube(
    "windshield_top_frame",
    [
      new THREE.Vector3(-0.72, 1.28, frontTopZ),
      new THREE.Vector3(0.72, 1.28, frontTopZ),
      new THREE.Vector3(0.72, 1.28, rearTopZ),
      new THREE.Vector3(0.60, 1.18, -1.32),
      new THREE.Vector3(-0.60, 1.18, -1.32),
      new THREE.Vector3(-0.72, 1.28, rearTopZ),
      new THREE.Vector3(-0.72, 1.28, frontTopZ)
    ],
    0.018,
    chromeMat,
    windshield_group
  );

  const windshield_bottom_frame = createTube(
    "windshield_bottom_frame",
    [
      new THREE.Vector3(-0.80, 0.75, frontBottomZ),
      new THREE.Vector3(0.80, 0.75, frontBottomZ),
      new THREE.Vector3(0.80, 0.75, rearBottomZ),
      new THREE.Vector3(0.64, 0.76, -1.42),
      new THREE.Vector3(-0.64, 0.76, -1.42),
      new THREE.Vector3(-0.80, 0.75, rearBottomZ),
      new THREE.Vector3(-0.80, 0.75, frontBottomZ)
    ],
    0.018,
    chromeMat,
    windshield_group
  );

  const center_windshield_mullion = createTube(
    "center_windshield_mullion",
    [
      new THREE.Vector3(0, 0.75, frontBottomZ),
      new THREE.Vector3(0, 1.28, frontTopZ)
    ],
    0.016,
    chromeMat,
    windshield_group
  );

  const port_rear_windshield_mullion = createTube(
    "port_rear_windshield_mullion",
    [
      new THREE.Vector3(-0.80, 0.75, rearBottomZ),
      new THREE.Vector3(-0.72, 1.28, rearTopZ)
    ],
    0.016,
    chromeMat,
    windshield_group
  );

  const starboard_rear_windshield_mullion = createTube(
    "starboard_rear_windshield_mullion",
    [
      new THREE.Vector3(0.80, 0.75, rearBottomZ),
      new THREE.Vector3(0.72, 1.28, rearTopZ)
    ],
    0.016,
    chromeMat,
    windshield_group
  );

  const roof_antenna_base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.055, 0.045, 16),
    trimMat
  );
  roof_antenna_base.name = "roof_antenna_base";
  roof_antenna_base.position.set(0, 1.315, -0.52);
  windshield_group.add(roof_antenna_base);

  const roof_antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.16, 10),
    trimMat
  );
  roof_antenna.name = "roof_antenna";
  roof_antenna.position.set(0, 1.405, -0.52);
  windshield_group.add(roof_antenna);

  const cleatGeom = new THREE.BoxGeometry(0.18, 0.035, 0.045);

  const port_bow_cleat = new THREE.Mesh(cleatGeom, chromeMat);
  port_bow_cleat.name = "port_bow_cleat";
  port_bow_cleat.position.set(-0.34, 0.825, 2.30);
  port_bow_cleat.rotation.y = 0.12;
  bow_hardware_group.add(port_bow_cleat);

  const starboard_bow_cleat = new THREE.Mesh(cleatGeom, chromeMat);
  starboard_bow_cleat.name = "starboard_bow_cleat";
  starboard_bow_cleat.position.set(0.34, 0.825, 2.30);
  starboard_bow_cleat.rotation.y = -0.12;
  bow_hardware_group.add(starboard_bow_cleat);

  const anchor_shank = createTube(
    "anchor_shank",
    [
      new THREE.Vector3(-0.12, 0.76, 3.18),
      new THREE.Vector3(-0.12, 0.34, 3.36)
    ],
    0.025,
    chromeMat,
    bow_hardware_group
  );

  const anchor_left_fluke = createTube(
    "anchor_left_fluke",
    [
      new THREE.Vector3(-0.12, 0.34, 3.36),
      new THREE.Vector3(-0.30, 0.25, 3.31),
      new THREE.Vector3(-0.36, 0.28, 3.20)
    ],
    0.025,
    chromeMat,
    bow_hardware_group
  );

  const anchor_right_fluke = createTube(
    "anchor_right_fluke",
    [
      new THREE.Vector3(-0.12, 0.34, 3.36),
      new THREE.Vector3(0.06, 0.25, 3.31),
      new THREE.Vector3(0.12, 0.28, 3.20)
    ],
    0.025,
    chromeMat,
    bow_hardware_group
  );

  const anchor_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.075, 0.014, 8, 20),
    chromeMat
  );
  anchor_ring.name = "anchor_ring";
  anchor_ring.position.set(-0.12, 0.79, 3.17);
  anchor_ring.rotation.x = 0.35;
  bow_hardware_group.add(anchor_ring);

  const transom_mount = new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.34, 0.18),
    motorAccentMat
  );
  transom_mount.name = "transom_mount";
  transom_mount.position.set(0, 0.18, -2.42);
  outboard_group.add(transom_mount);

  const motor_cowling = new THREE.Mesh(
    createPrismGeometry([
      [-0.34, 0.64],
      [-0.48, 0.54],
      [-0.48, 0.22],
      [-0.30, 0.12],
      [0.18, 0.16],
      [0.28, 0.48],
      [0.10, 0.64]
    ], 0.72),
    motorMat
  );
  motor_cowling.name = "motor_cowling";
  motor_cowling.position.set(0, 0, -2.72);
  outboard_group.add(motor_cowling);

  const motor_midsection = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.54, 0.24),
    motorAccentMat
  );
  motor_midsection.name = "motor_midsection";
  motor_midsection.position.set(0, -0.16, -2.66);
  outboard_group.add(motor_midsection);

  const lower_unit = new THREE.Mesh(
    createPrismGeometry([
      [-0.22, 0.18],
      [-0.20, -0.38],
      [-0.08, -0.50],
      [0.20, -0.48],
      [0.25, -0.34],
      [0.16, 0.12]
    ], 0.42),
    motorMat
  );
  lower_unit.name = "lower_unit";
  lower_unit.position.set(0, 0, -2.78);
  outboard_group.add(lower_unit);

  const gear_case = new THREE.Mesh(
    new THREE.SphereGeometry(1, 20, 12),
    motorAccentMat
  );
  gear_case.name = "gear_case";
  gear_case.scale.set(0.24, 0.16, 0.34);
  gear_case.position.set(0, -0.43, -3.02);
  outboard_group.add(gear_case);

  const propeller_shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.42, 14),
    motorAccentMat
  );
  propeller_shaft.name = "propeller_shaft";
  propeller_shaft.rotation.x = Math.PI / 2;
  propeller_shaft.position.set(0, -0.43, -3.20);
  outboard_group.add(propeller_shaft);

  const propeller_hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.075, 0.10, 16),
    motorAccentMat
  );
  propeller_hub.name = "propeller_hub";
  propeller_hub.rotation.x = Math.PI / 2;
  propeller_hub.position.set(0, -0.43, -3.42);
  outboard_group.add(propeller_hub);

  const propeller_blade_geom = new THREE.BoxGeometry(0.085, 0.30, 0.035);
  const propeller_blades = new THREE.InstancedMesh(
    propeller_blade_geom,
    motorMat,
    3
  );
  propeller_blades.name = "propeller_blades";
  const bladeDummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    bladeDummy.position.set(0, -0.43, -3.48);
    bladeDummy.rotation.set(0, 0, i * Math.PI * 2 / 3);
    bladeDummy.updateMatrix();
    propeller_blades.setMatrixAt(i, bladeDummy.matrix);
  }
  outboard_group.add(propeller_blades);

  const motor_logo_bar_geom = new THREE.BoxGeometry(0.014, 0.035, 0.15);
  const motor_logo_bars = new THREE.InstancedMesh(
    motor_logo_bar_geom,
    redDecalMat,
    6
  );
  motor_logo_bars.name = "motor_logo_bars";
  const logoDummy = new THREE.Object3D();
  let logoIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      logoDummy.position.set(
        side * 0.367,
        0.47 + i * 0.012,
        -2.88 + i * 0.085
      );
      logoDummy.rotation.set(0.35, 0, 0);
      logoDummy.updateMatrix();
      motor_logo_bars.setMatrixAt(logoIndex++, logoDummy.matrix);
    }
  }
  outboard_group.add(motor_logo_bars);

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
