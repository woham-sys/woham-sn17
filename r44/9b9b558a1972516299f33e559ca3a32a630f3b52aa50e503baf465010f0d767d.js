// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const wheelR = 0.34;
  const wheelY = 0.34;
  const rearZ = -0.58;
  const frontZ = 0.58;
  const tireTube = 0.028;
  const tireMajor = wheelR - tireTube;
  const rimR = 0.286;
  const crankY = 0.39;
  const crankZ = -0.10;

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ee,
    metalness: 0.0,
    roughness: 0.3
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.8
  });
  const saddleMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.7
  });
  const reflectorMat = new THREE.MeshStandardMaterial({
    color: 0xe8731a,
    metalness: 0.0,
    roughness: 0.4
  });
  const decalMat = new THREE.MeshStandardMaterial({
    color: 0x666666,
    metalness: 0.0,
    roughness: 0.7
  });

  const unitRodGeom = new THREE.CylinderGeometry(1, 1, 1, 12);
  const spokeGeom = new THREE.CylinderGeometry(1, 1, 1, 6);
  const upAxis = new THREE.Vector3(0, 1, 0);

  function makeRod(p1, p2, radius, material) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const rod = new THREE.Mesh(unitRodGeom, material);
    rod.position.copy(p1).add(p2).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(upAxis, direction.normalize());
    rod.scale.set(radius, length, radius);
    return rod;
  }

  function makeCurveTube(points, radius, material, segments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments || 24, radius, 8, false),
      material
    );
  }

  function setRodInstance(instanced, index, p1, p2, radius) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      upAxis,
      direction.normalize()
    );
    const scale = new THREE.Vector3(radius, length, radius);
    const matrix = new THREE.Matrix4().compose(midpoint, quaternion, scale);
    instanced.setMatrixAt(index, matrix);
  }

  function createWheelSpokes(count) {
    const spokes = new THREE.InstancedMesh(spokeGeom, silverMat, count);
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const cross = i % 2 === 0 ? 0.18 : -0.18;
      const hubAngle = angle + cross;
      const hubPoint = new THREE.Vector3(
        Math.cos(hubAngle) * 0.026,
        Math.sin(hubAngle) * 0.026,
        0
      );
      const rimPoint = new THREE.Vector3(
        Math.cos(angle) * rimR,
        Math.sin(angle) * rimR,
        0
      );
      setRodInstance(spokes, i, hubPoint, rimPoint, 0.0017);
    }
    spokes.instanceMatrix.needsUpdate = true;
    return spokes;
  }

  function createTireTreads(count) {
    const treadGeom = new THREE.BoxGeometry(0.018, 0.006, 0.044);
    const treads = new THREE.InstancedMesh(treadGeom, tireMat, count);
    const axis = new THREE.Vector3(0, 0, 1);
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const position = new THREE.Vector3(
        Math.cos(angle) * (wheelR + 0.001),
        Math.sin(angle) * (wheelR + 0.001),
        0
      );
      const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      const matrix = new THREE.Matrix4().compose(
        position,
        quaternion,
        new THREE.Vector3(1, 1, 1)
      );
      treads.setMatrixAt(i, matrix);
    }
    treads.instanceMatrix.needsUpdate = true;
    return treads;
  }

  const rear_wheel = new THREE.Group();
  rear_wheel.position.set(0, wheelY, rearZ);
  root.add(rear_wheel);

  const rear_tire = new THREE.Mesh(
    new THREE.TorusGeometry(tireMajor, tireTube, 12, 64),
    tireMat
  );
  rear_tire.rotation.y = Math.PI / 2;
  rear_wheel.add(rear_tire);

  const rear_rim = new THREE.Mesh(
    new THREE.TorusGeometry(rimR, 0.009, 8, 64),
    silverMat
  );
  rear_rim.rotation.y = Math.PI / 2;
  rear_wheel.add(rear_rim);

  const rear_spokes = createWheelSpokes(28);
  rear_wheel.add(rear_spokes);

  const rear_treads = createTireTreads(32);
  rear_wheel.add(rear_treads);

  const rear_hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.026, 0.026, 0.09, 20),
    brushedMat
  );
  rear_hub.rotation.z = Math.PI / 2;
  rear_wheel.add(rear_hub);

  const rear_axle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.009, 0.009, 0.13, 12),
    darkMetalMat
  );
  rear_axle.rotation.z = Math.PI / 2;
  rear_wheel.add(rear_axle);

  const rear_hub_caps = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.032, 0.032, 0.009, 20),
    chromeMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      upAxis,
      new THREE.Vector3(side, 0, 0)
    );
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(side * 0.049, 0, 0),
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    rear_hub_caps.setMatrixAt(i, matrix);
  }
  rear_hub_caps.instanceMatrix.needsUpdate = true;
  rear_wheel.add(rear_hub_caps);

  const rear_valve = makeRod(
    new THREE.Vector3(0.012, -0.282, 0),
    new THREE.Vector3(0.012, -0.326, 0),
    0.004,
    darkMetalMat
  );
  rear_wheel.add(rear_valve);

  const front_wheel = new THREE.Group();
  front_wheel.position.set(0, wheelY, frontZ);
  root.add(front_wheel);

  const front_tire = new THREE.Mesh(
    new THREE.TorusGeometry(tireMajor, tireTube, 12, 64),
    tireMat
  );
  front_tire.rotation.y = Math.PI / 2;
  front_wheel.add(front_tire);

  const front_rim = new THREE.Mesh(
    new THREE.TorusGeometry(rimR, 0.009, 8, 64),
    silverMat
  );
  front_rim.rotation.y = Math.PI / 2;
  front_wheel.add(front_rim);

  const front_spokes = createWheelSpokes(28);
  front_wheel.add(front_spokes);

  const front_treads = createTireTreads(32);
  front_wheel.add(front_treads);

  const front_hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.026, 0.026, 0.09, 20),
    brushedMat
  );
  front_hub.rotation.z = Math.PI / 2;
  front_wheel.add(front_hub);

  const front_axle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.009, 0.009, 0.13, 12),
    darkMetalMat
  );
  front_axle.rotation.z = Math.PI / 2;
  front_wheel.add(front_axle);

  const front_hub_caps = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.032, 0.032, 0.009, 20),
    chromeMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      upAxis,
      new THREE.Vector3(side, 0, 0)
    );
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(side * 0.049, 0, 0),
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    front_hub_caps.setMatrixAt(i, matrix);
  }
  front_hub_caps.instanceMatrix.needsUpdate = true;
  front_wheel.add(front_hub_caps);

  const front_valve = makeRod(
    new THREE.Vector3(0.012, -0.282, 0),
    new THREE.Vector3(0.012, -0.326, 0),
    0.004,
    darkMetalMat
  );
  front_wheel.add(front_valve);

  const rearAxleLeft = new THREE.Vector3(-0.055, wheelY, rearZ);
  const rearAxleRight = new THREE.Vector3(0.055, wheelY, rearZ);
  const crankLeft = new THREE.Vector3(-0.055, crankY, crankZ);
  const crankRight = new THREE.Vector3(0.055, crankY, crankZ);
  const seatCluster = new THREE.Vector3(0, 0.72, -0.31);
  const headLower = new THREE.Vector3(0, 0.73, 0.34);
  const headUpper = new THREE.Vector3(0, 0.87, 0.28);

  const top_tube = makeRod(seatCluster, headUpper, 0.026, frameMat);
  root.add(top_tube);

  const down_tube = makeRod(headLower, crankLeft, 0.032, frameMat);
  root.add(down_tube);

  const down_tube_right = makeRod(headLower, crankRight, 0.032, frameMat);
  root.add(down_tube_right);

  const seat_tube = makeRod(crankLeft, seatCluster, 0.028, frameMat);
  root.add(seat_tube);

  const seat_tube_right = makeRod(crankRight, seatCluster, 0.028, frameMat);
  root.add(seat_tube_right);

  const head_tube = makeRod(headLower, headUpper, 0.036, frameMat);
  root.add(head_tube);

  const left_chain_stay = makeRod(
    rearAxleLeft,
    crankLeft,
    0.017,
    frameMat
  );
  root.add(left_chain_stay);

  const right_chain_stay = makeRod(
    rearAxleRight,
    crankRight,
    0.017,
    frameMat
  );
  root.add(right_chain_stay);

  const left_seat_stay = makeRod(
    rearAxleLeft,
    new THREE.Vector3(-0.035, 0.69, -0.30),
    0.015,
    frameMat
  );
  root.add(left_seat_stay);

  const right_seat_stay = makeRod(
    rearAxleRight,
    new THREE.Vector3(0.035, 0.69, -0.30),
    0.015,
    frameMat
  );
  root.add(right_seat_stay);

  const rear_brake_bridge = makeRod(
    new THREE.Vector3(-0.045, 0.61, -0.43),
    new THREE.Vector3(0.045, 0.61, -0.43),
    0.012,
    frameMat
  );
  root.add(rear_brake_bridge);

  const bottom_bracket = new THREE.Mesh(
    new THREE.CylinderGeometry(0.043, 0.043, 0.13, 24),
    frameMat
  );
  bottom_bracket.rotation.z = Math.PI / 2;
  bottom_bracket.position.set(0, crankY, crankZ);
  root.add(bottom_bracket);

  const bottom_bracket_band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.046, 0.046, 0.018, 24),
    chromeMat
  );
  bottom_bracket_band.rotation.z = Math.PI / 2;
  bottom_bracket_band.position.set(0.058, crankY, crankZ);
  root.add(bottom_bracket_band);

  const front_fork_left = makeCurveTube(
    [
      new THREE.Vector3(-0.045, 0.73, 0.35),
      new THREE.Vector3(-0.052, 0.61, 0.42),
      new THREE.Vector3(-0.055, wheelY, frontZ)
    ],
    0.022,
    frameMat,
    28
  );
  root.add(front_fork_left);

  const front_fork_right = makeCurveTube(
    [
      new THREE.Vector3(0.045, 0.73, 0.35),
      new THREE.Vector3(0.052, 0.61, 0.42),
      new THREE.Vector3(0.055, wheelY, frontZ)
    ],
    0.022,
    frameMat,
    28
  );
  root.add(front_fork_right);

  const fork_crown = makeRod(
    new THREE.Vector3(-0.055, 0.705, 0.37),
    new THREE.Vector3(0.055, 0.705, 0.37),
    0.021,
    frameMat
  );
  root.add(fork_crown);

  const fork_steerer = makeRod(
    headLower,
    new THREE.Vector3(0, 0.91, 0.267),
    0.024,
    chromeMat
  );
  root.add(fork_steerer);

  const upper_headset_ring = makeRod(
    new THREE.Vector3(0, 0.862, 0.282),
    new THREE.Vector3(0, 0.884, 0.274),
    0.043,
    darkMetalMat
  );
  root.add(upper_headset_ring);

  const lower_headset_ring = makeRod(
    new THREE.Vector3(0, 0.718, 0.345),
    new THREE.Vector3(0, 0.741, 0.337),
    0.043,
    darkMetalMat
  );
  root.add(lower_headset_ring);

  const rear_left_dropout = new THREE.Mesh(
    new THREE.CylinderGeometry(0.032, 0.032, 0.012, 16),
    chromeMat
  );
  rear_left_dropout.rotation.z = Math.PI / 2;
  rear_left_dropout.position.copy(rearAxleLeft);
  root.add(rear_left_dropout);

  const rear_right_dropout = new THREE.Mesh(
    new THREE.CylinderGeometry(0.032, 0.032, 0.012, 16),
    chromeMat
  );
  rear_right_dropout.rotation.z = Math.PI / 2;
  rear_right_dropout.position.copy(rearAxleRight);
  root.add(rear_right_dropout);

  const front_left_axle_nut = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.012, 16),
    chromeMat
  );
  front_left_axle_nut.rotation.z = Math.PI / 2;
  front_left_axle_nut.position.set(-0.064, wheelY, frontZ);
  root.add(front_left_axle_nut);

  const front_right_axle_nut = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.012, 16),
    chromeMat
  );
  front_right_axle_nut.rotation.z = Math.PI / 2;
  front_right_axle_nut.position.set(0.064, wheelY, frontZ);
  root.add(front_right_axle_nut);

  const seat_post = makeRod(
    seatCluster,
    new THREE.Vector3(0, 0.94, -0.37),
    0.018,
    chromeMat
  );
  root.add(seat_post);

  const seat_clamp = makeRod(
    new THREE.Vector3(0, 0.716, -0.311),
    new THREE.Vector3(0, 0.748, -0.321),
    0.036,
    darkMetalMat
  );
  root.add(seat_clamp);

  const saddleShape = new THREE.Shape();
  saddleShape.moveTo(0, 0.15);
  saddleShape.bezierCurveTo(-0.035, 0.145, -0.065, 0.10, -0.075, 0.035);
  saddleShape.bezierCurveTo(-0.11, -0.02, -0.15, -0.08, -0.14, -0.13);
  saddleShape.bezierCurveTo(-0.125, -0.17, -0.055, -0.18, 0, -0.17);
  saddleShape.bezierCurveTo(0.055, -0.18, 0.125, -0.17, 0.14, -0.13);
  saddleShape.bezierCurveTo(0.15, -0.08, 0.11, -0.02, 0.075, 0.035);
  saddleShape.bezierCurveTo(0.065, 0.10, 0.035, 0.145, 0, 0.15);

  const saddleGeom = new THREE.ExtrudeGeometry(saddleShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.009,
    bevelSegments: 3
  });
  const saddle = new THREE.Mesh(saddleGeom, saddleMat);
  saddle.rotation.x = Math.PI / 2;
  saddle.position.set(0, 1.0, -0.37);
  root.add(saddle);

  const saddle_left_rail = makeCurveTube(
    [
      new THREE.Vector3(-0.045, 0.955, -0.47),
      new THREE.Vector3(-0.045, 0.925, -0.39),
      new THREE.Vector3(-0.035, 0.93, -0.27)
    ],
    0.005,
    chromeMat,
    16
  );
  root.add(saddle_left_rail);

  const saddle_right_rail = makeCurveTube(
    [
      new THREE.Vector3(0.045, 0.955, -0.47),
      new THREE.Vector3(0.045, 0.925, -0.39),
      new THREE.Vector3(0.035, 0.93, -0.27)
    ],
    0.005,
    chromeMat,
    16
  );
  root.add(saddle_right_rail);

  const handlebar_stem = makeRod(
    new THREE.Vector3(0, 0.88, 0.27),
    new THREE.Vector3(0, 1.01, 0.36),
    0.019,
    chromeMat
  );
  root.add(handlebar_stem);

  const handlebar_stem_clamp = new THREE.Mesh(
    new THREE.CylinderGeometry(0.031, 0.031, 0.035, 20),
    darkMetalMat
  );
  handlebar_stem_clamp.rotation.z = Math.PI / 2;
  handlebar_stem_clamp.position.set(0, 1.01, 0.36);
  root.add(handlebar_stem_clamp);

  const handlebar = makeCurveTube(
    [
      new THREE.Vector3(-0.43, 1.06, 0.20),
      new THREE.Vector3(-0.31, 1.06, 0.22),
      new THREE.Vector3(-0.20, 1.01, 0.31),
      new THREE.Vector3(-0.10, 0.99, 0.36),
      new THREE.Vector3(0, 1.01, 0.37),
      new THREE.Vector3(0.10, 0.99, 0.36),
      new THREE.Vector3(0.20, 1.01, 0.31),
      new THREE.Vector3(0.31, 1.06, 0.22),
      new THREE.Vector3(0.43, 1.06, 0.20)
    ],
    0.012,
    chromeMat,
    48
  );
  root.add(handlebar);

  const left_grip = makeRod(
    new THREE.Vector3(-0.47, 1.06, 0.20),
    new THREE.Vector3(-0.34, 1.06, 0.22),
    0.024,
    rubberMat
  );
  root.add(left_grip);

  const right_grip = makeRod(
    new THREE.Vector3(0.34, 1.06, 0.22),
    new THREE.Vector3(0.47, 1.06, 0.20),
    0.024,
    rubberMat
  );
  root.add(right_grip);

  const left_brake_lever = makeCurveTube(
    [
      new THREE.Vector3(-0.34, 1.055, 0.225),
      new THREE.Vector3(-0.31, 1.015, 0.27),
      new THREE.Vector3(-0.27, 0.995, 0.30)
    ],
    0.006,
    chromeMat,
    12
  );
  root.add(left_brake_lever);

  const right_brake_lever = makeCurveTube(
    [
      new THREE.Vector3(0.34, 1.055, 0.225),
      new THREE.Vector3(0.31, 1.015, 0.27),
      new THREE.Vector3(0.27, 0.995, 0.30)
    ],
    0.006,
    chromeMat,
    12
  );
  root.add(right_brake_lever);

  const bell_base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.025, 20),
    darkMetalMat
  );
  bell_base.rotation.z = Math.PI / 2;
  bell_base.position.set(-0.23, 1.075, 0.255);
  root.add(bell_base);

  const bell_dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 20, 10),
    brushedMat
  );
  bell_dome.scale.set(0.75, 1.0, 0.75);
  bell_dome.position.set(-0.23, 1.101, 0.255);
  root.add(bell_dome);

  const front_brake_cable = makeCurveTube(
    [
      new THREE.Vector3(0.29, 1.035, 0.285),
      new THREE.Vector3(0.23, 0.96, 0.43),
      new THREE.Vector3(0.17, 0.82, 0.50),
      new THREE.Vector3(0.10, 0.66, 0.49),
      new THREE.Vector3(0.03, 0.59, 0.47)
    ],
    0.004,
    rubberMat,
    36
  );
  root.add(front_brake_cable);

  const rear_brake_cable = makeCurveTube(
    [
      new THREE.Vector3(-0.29, 1.035, 0.285),
      new THREE.Vector3(-0.18, 0.96, 0.38),
      new THREE.Vector3(-0.08, 0.86, 0.23),
      new THREE.Vector3(-0.045, 0.78, -0.08),
      new THREE.Vector3(-0.035, 0.68, -0.42)
    ],
    0.004,
    rubberMat,
    40
  );
  root.add(rear_brake_cable);

  const front_left_brake_arm = makeRod(
    new THREE.Vector3(-0.045, 0.61, 0.43),
    new THREE.Vector3(-0.035, 0.57, 0.49),
    0.007,
    chromeMat
  );
  root.add(front_left_brake_arm);

  const front_right_brake_arm = makeRod(
    new THREE.Vector3(0.045, 0.61, 0.43),
    new THREE.Vector3(0.035, 0.57, 0.49),
    0.007,
    chromeMat
  );
  root.add(front_right_brake_arm);

  const front_left_brake_pad = new THREE.Mesh(
    new THREE.BoxGeometry(0.014, 0.018, 0.045),
    rubberMat
  );
  front_left_brake_pad.position.set(-0.032, 0.565, 0.50);
  root.add(front_left_brake_pad);

  const front_right_brake_pad = new THREE.Mesh(
    new THREE.BoxGeometry(0.014, 0.018, 0.045),
    rubberMat
  );
  front_right_brake_pad.position.set(0.032, 0.565, 0.50);
  root.add(front_right_brake_pad);

  const rear_left_brake_arm = makeRod(
    new THREE.Vector3(-0.038, 0.62, -0.42),
    new THREE.Vector3(-0.032, 0.57, -0.49),
    0.007,
    chromeMat
  );
  root.add(rear_left_brake_arm);

  const rear_right_brake_arm = makeRod(
    new THREE.Vector3(0.038, 0.62, -0.42),
    new THREE.Vector3(0.032, 0.57, -0.49),
    0.007,
    chromeMat
  );
  root.add(rear_right_brake_arm);

  const rear_left_brake_pad = new THREE.Mesh(
    new THREE.BoxGeometry(0.014, 0.018, 0.045),
    rubberMat
  );
  rear_left_brake_pad.position.set(-0.032, 0.565, -0.50);
  root.add(rear_left_brake_pad);

  const rear_right_brake_pad = new THREE.Mesh(
    new THREE.BoxGeometry(0.014, 0.018, 0.045),
    rubberMat
  );
  rear_right_brake_pad.position.set(0.032, 0.565, -0.50);
  root.add(rear_right_brake_pad);

  const chainring = new THREE.Mesh(
    new THREE.TorusGeometry(0.087, 0.006, 8, 48),
    darkMetalMat
  );
  chainring.rotation.y = Math.PI / 2;
  chainring.position.set(0.083, crankY, crankZ);
  root.add(chainring);

  const chainring_spokes = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const angle = i / 5 * Math.PI * 2;
    const chainring_spoke = makeRod(
      new THREE.Vector3(
        0.083,
        crankY + Math.cos(angle) * 0.025,
        crankZ + Math.sin(angle) * 0.025
      ),
      new THREE.Vector3(
        0.083,
        crankY + Math.cos(angle) * 0.075,
        crankZ + Math.sin(angle) * 0.075
      ),
      0.009,
      chromeMat
    );
    chainring_spokes.add(chainring_spoke);
  }
  root.add(chainring_spokes);

  const chainring_teethGeom = new THREE.BoxGeometry(0.014, 0.010, 0.018);
  const chainring_teeth = new THREE.InstancedMesh(
    chainring_teethGeom,
    darkMetalMat,
    32
  );
  for (let i = 0; i < 32; i++) {
    const angle = i / 32 * Math.PI * 2;
    const position = new THREE.Vector3(
      0.083,
      crankY + Math.cos(angle) * 0.096,
      crankZ + Math.sin(angle) * 0.096
    );
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      angle
    );
    const matrix = new THREE.Matrix4().compose(
      position,
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    chainring_teeth.setMatrixAt(i, matrix);
  }
  chainring_teeth.instanceMatrix.needsUpdate = true;
  root.add(chainring_teeth);

  const crank_hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.027, 0.027, 0.17, 20),
    chromeMat
  );
  crank_hub.rotation.z = Math.PI / 2;
  crank_hub.position.set(0, crankY, crankZ);
  root.add(crank_hub);

  const right_crank_arm = makeRod(
    new THREE.Vector3(0.09, crankY, crankZ),
    new THREE.Vector3(0.09, 0.255, 0.015),
    0.010,
    chromeMat
  );
  root.add(right_crank_arm);

  const left_crank_arm = makeRod(
    new THREE.Vector3(-0.08, crankY, crankZ),
    new THREE.Vector3(-0.08, 0.525, -0.215),
    0.010,
    chromeMat
  );
  root.add(left_crank_arm);

  const right_pedal_spindle = makeRod(
    new THREE.Vector3(0.09, 0.255, 0.015),
    new THREE.Vector3(0.19, 0.255, 0.015),
    0.006,
    darkMetalMat
  );
  root.add(right_pedal_spindle);

  const left_pedal_spindle = makeRod(
    new THREE.Vector3(-0.08, 0.525, -0.215),
    new THREE.Vector3(-0.18, 0.525, -0.215),
    0.006,
    darkMetalMat
  );
  root.add(left_pedal_spindle);

  const right_pedal = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 0.018, 0.055),
    darkMetalMat
  );
  right_pedal.position.set(0.17, 0.255, 0.015);
  root.add(right_pedal);

  const left_pedal = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 0.018, 0.055),
    darkMetalMat
  );
  left_pedal.position.set(-0.16, 0.525, -0.215);
  root.add(left_pedal);

  const rear_cassette = new THREE.Group();
  const cassetteRadii = [0.052, 0.045, 0.038, 0.031];
  for (let i = 0; i < cassetteRadii.length; i++) {
    const cassette_sprocket = new THREE.Mesh(
      new THREE.CylinderGeometry(cassetteRadii[i], cassetteRadii[i], 0.006, 24),
      i % 2 === 0 ? darkMetalMat : brushedMat
    );
    cassette_sprocket.rotation.z = Math.PI / 2;
    cassette_sprocket.position.set(0.066 + i * 0.008, wheelY, rearZ);
    rear_cassette.add(cassette_sprocket);
  }
  root.add(rear_cassette);

  const upper_chain = makeRod(
    new THREE.Vector3(0.086, wheelY + 0.052, rearZ),
    new THREE.Vector3(0.086, crankY + 0.088, crankZ),
    0.0035,
    darkMetalMat
  );
  root.add(upper_chain);

  const lower_chain = makeRod(
    new THREE.Vector3(0.086, crankY - 0.088, crankZ),
    new THREE.Vector3(0.086, 0.205, -0.50),
    0.0035,
    darkMetalMat
  );
  root.add(lower_chain);

  const chain_wrap = makeRod(
    new THREE.Vector3(0.086, 0.205, -0.50),
    new THREE.Vector3(0.086, wheelY - 0.052, rearZ),
    0.0035,
    darkMetalMat
  );
  root.add(chain_wrap);

  const derailleur_hanger = makeRod(
    new THREE.Vector3(0.075, wheelY - 0.01, rearZ + 0.01),
    new THREE.Vector3(0.085, 0.245, -0.50),
    0.007,
    darkMetalMat
  );
  root.add(derailleur_hanger);

  const derailleur_cage = makeRod(
    new THREE.Vector3(0.085, 0.245, -0.50),
    new THREE.Vector3(0.085, 0.18, -0.47),
    0.007,
    darkMetalMat
  );
  root.add(derailleur_cage);

  const upper_derailleur_pulley = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.014, 16),
    darkMetalMat
  );
  upper_derailleur_pulley.rotation.z = Math.PI / 2;
  upper_derailleur_pulley.position.set(0.085, 0.245, -0.50);
  root.add(upper_derailleur_pulley);

  const lower_derailleur_pulley = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.014, 16),
    darkMetalMat
  );
  lower_derailleur_pulley.rotation.z = Math.PI / 2;
  lower_derailleur_pulley.position.set(0.085, 0.18, -0.47);
  root.add(lower_derailleur_pulley);

  const kickstand = makeRod(
    new THREE.Vector3(-0.045, 0.38, -0.18),
    new THREE.Vector3(-0.13, 0.055, -0.30),
    0.007,
    darkMetalMat
  );
  root.add(kickstand);

  const kickstand_foot = new THREE.Mesh(
    new THREE.BoxGeometry(0.055, 0.012, 0.025),
    rubberMat
  );
  kickstand_foot.position.set(-0.13, 0.052, -0.30);
  root.add(kickstand_foot);

  const front_reflector = new THREE.Mesh(
    new THREE.BoxGeometry(0.012, 0.075, 0.035),
    reflectorMat
  );
  front_reflector.position.set(0.041, 0.785, 0.345);
  front_reflector.rotation.x = -0.18;
  root.add(front_reflector);

  const frame_decals = new THREE.Group();
  const decalGeom = new THREE.BoxGeometry(0.004, 0.007, 0.038);
  for (let i = 0; i < 5; i++) {
    const frame_decal = new THREE.Mesh(decalGeom, decalMat);
    frame_decal.position.set(
      0.033,
      0.625 + i * 0.012,
      -0.02 + i * 0.038
    );
    frame_decals.add(frame_decal);
  }
  root.add(frame_decals);

  const frame_boltGeom = new THREE.CylinderGeometry(0.010, 0.010, 0.008, 12);
  const frame_bolts = new THREE.InstancedMesh(frame_boltGeom, chromeMat, 6);
  const boltPositions = [
    new THREE.Vector3(0.036, 0.73, 0.34),
    new THREE.Vector3(0.036, 0.87, 0.28),
    new THREE.Vector3(0.036, 0.39, -0.10),
    new THREE.Vector3(0.036, 0.72, -0.31),
    new THREE.Vector3(0.064, wheelY, frontZ),
    new THREE.Vector3(0.064, wheelY, rearZ)
  ];
  const boltQuaternion = new THREE.Quaternion().setFromUnitVectors(
    upAxis,
    new THREE.Vector3(1, 0, 0)
  );
  for (let i = 0; i < boltPositions.length; i++) {
    const matrix = new THREE.Matrix4().compose(
      boltPositions[i],
      boltQuaternion,
      new THREE.Vector3(1, 1, 1)
    );
    frame_bolts.setMatrixAt(i, matrix);
  }
  frame_bolts.instanceMatrix.needsUpdate = true;
  root.add(frame_bolts);

  fitToUnitCube(root);
  return root;

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
}