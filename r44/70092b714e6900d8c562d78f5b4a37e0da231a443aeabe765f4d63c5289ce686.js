// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "copper_pitcher";

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });

  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x71301f,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x35130d,
    metalness: 0.3,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });

  function createBodyGeometry() {
    const rings = [
      { y: 0.18, rx: 0.31, rz: 0.29, cx: 0.00 },
      { y: 0.24, rx: 0.40, rz: 0.36, cx: 0.00 },
      { y: 0.36, rx: 0.49, rz: 0.43, cx: 0.00 },
      { y: 0.52, rx: 0.55, rz: 0.48, cx: 0.00 },
      { y: 0.70, rx: 0.57, rz: 0.50, cx: 0.00 },
      { y: 0.88, rx: 0.55, rz: 0.48, cx: 0.00 },
      { y: 1.02, rx: 0.52, rz: 0.45, cx: -0.01 },
      { y: 1.10, rx: 0.50, rz: 0.43, cx: -0.02 },
    ];
    const segments = 64;
    const positions = [];
    const indices = [];

    for (const ring of rings) {
      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        positions.push(
          ring.cx + Math.cos(angle) * ring.rx,
          ring.y,
          Math.sin(angle) * ring.rz
        );
      }
    }

    for (let r = 0; r < rings.length - 1; r++) {
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = r * segments + i;
        const b = r * segments + next;
        const c = (r + 1) * segments + next;
        const d = (r + 1) * segments + i;
        indices.push(a, d, b, b, d, c);
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

  const bodyGeom = createBodyGeometry();
  const body = new THREE.Mesh(bodyGeom, copperMat);
  body.name = "body";
  root.add(body);

  const footProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.38, 0.00),
    new THREE.Vector2(0.43, 0.015),
    new THREE.Vector2(0.45, 0.045),
    new THREE.Vector2(0.44, 0.075),
    new THREE.Vector2(0.39, 0.14),
    new THREE.Vector2(0.34, 0.18),
    new THREE.Vector2(0.00, 0.18),
  ];
  const footGeom = new THREE.LatheGeometry(footProfile, 64);
  const foot = new THREE.Mesh(footGeom, copperMat);
  foot.name = "foot";
  root.add(foot);

  const foot_collarGeom = new THREE.TorusGeometry(0.335, 0.018, 12, 64);
  const foot_collar = new THREE.Mesh(foot_collarGeom, copperMat);
  foot_collar.name = "foot_collar";
  foot_collar.rotation.x = Math.PI / 2;
  foot_collar.position.y = 0.185;
  root.add(foot_collar);

  const base_shadow_ringGeom = new THREE.TorusGeometry(0.345, 0.009, 8, 64);
  const base_shadow_ring = new THREE.Mesh(base_shadow_ringGeom, shadowMat);
  base_shadow_ring.name = "base_shadow_ring";
  base_shadow_ring.rotation.x = Math.PI / 2;
  base_shadow_ring.position.y = 0.174;
  root.add(base_shadow_ring);

  const inner_bowlProfile = [
    new THREE.Vector2(0.00, 0.66),
    new THREE.Vector2(0.18, 0.68),
    new THREE.Vector2(0.34, 0.78),
    new THREE.Vector2(0.44, 0.94),
    new THREE.Vector2(0.475, 1.075),
  ];
  const inner_bowlGeom = new THREE.LatheGeometry(inner_bowlProfile, 64);
  const inner_bowl = new THREE.Mesh(inner_bowlGeom, innerMat);
  inner_bowl.name = "inner_bowl";
  inner_bowl.position.x = -0.02;
  root.add(inner_bowl);

  const cavity_shadowGeom = new THREE.CircleGeometry(0.18, 40);
  const cavity_shadow = new THREE.Mesh(cavity_shadowGeom, shadowMat);
  cavity_shadow.name = "cavity_shadow";
  cavity_shadow.rotation.x = -Math.PI / 2;
  cavity_shadow.position.set(-0.02, 0.665, 0);
  root.add(cavity_shadow);

  const rimPoints = [];
  const rimCount = 40;
  for (let i = 0; i <= rimCount; i++) {
    const angle = Math.PI + i / rimCount * Math.PI;
    rimPoints.push(
      new THREE.Vector3(
        -0.02 + Math.cos(angle) * 0.50,
        1.10,
        Math.sin(angle) * 0.43
      )
    );
  }
  const rimCurve = new THREE.CatmullRomCurve3(
    rimPoints,
    false,
    "centripetal"
  );
  const rimGeom = new THREE.TubeGeometry(rimCurve, 80, 0.014, 10, false);
  const rim = new THREE.Mesh(rimGeom, copperMat);
  rim.name = "rim";
  root.add(rim);

  const innerRimPoints = [];
  for (let i = 0; i <= rimCount; i++) {
    const angle = Math.PI + i / rimCount * Math.PI;
    innerRimPoints.push(
      new THREE.Vector3(
        -0.02 + Math.cos(angle) * 0.475,
        1.078,
        Math.sin(angle) * 0.405
      )
    );
  }
  const innerRimCurve = new THREE.CatmullRomCurve3(
    innerRimPoints,
    false,
    "centripetal"
  );
  const inner_rimGeom = new THREE.TubeGeometry(
    innerRimCurve,
    80,
    0.008,
    8,
    false
  );
  const inner_rim = new THREE.Mesh(inner_rimGeom, shadowMat);
  inner_rim.name = "inner_rim";
  root.add(inner_rim);

  const spoutShape = new THREE.Shape();
  spoutShape.moveTo(0.34, 0.78);
  spoutShape.bezierCurveTo(0.42, 0.90, 0.44, 1.08, 0.51, 1.25);
  spoutShape.bezierCurveTo(0.59, 1.43, 0.73, 1.58, 0.89, 1.64);
  spoutShape.bezierCurveTo(0.96, 1.67, 1.02, 1.65, 1.05, 1.61);
  spoutShape.bezierCurveTo(0.98, 1.56, 0.91, 1.51, 0.85, 1.43);
  spoutShape.bezierCurveTo(0.75, 1.29, 0.70, 1.10, 0.67, 0.92);
  spoutShape.bezierCurveTo(0.64, 0.76, 0.55, 0.68, 0.43, 0.67);
  spoutShape.bezierCurveTo(0.38, 0.68, 0.35, 0.72, 0.34, 0.78);

  const spoutGeom = new THREE.ExtrudeGeometry(spoutShape, {
    depth: 0.34,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
  });
  const spout = new THREE.Mesh(spoutGeom, copperMat);
  spout.name = "spout";
  spout.position.z = -0.17;
  root.add(spout);

  const spoutChannelShape = new THREE.Shape();
  spoutChannelShape.moveTo(0.37, 1.085);
  spoutChannelShape.bezierCurveTo(0.49, 1.13, 0.58, 1.30, 0.68, 1.45);
  spoutChannelShape.bezierCurveTo(0.78, 1.58, 0.89, 1.63, 1.00, 1.625);
  spoutChannelShape.lineTo(0.98, 1.585);
  spoutChannelShape.bezierCurveTo(0.88, 1.58, 0.78, 1.53, 0.69, 1.41);
  spoutChannelShape.bezierCurveTo(0.59, 1.27, 0.50, 1.10, 0.39, 1.055);
  spoutChannelShape.closePath();

  const spout_channelGeom = new THREE.ShapeGeometry(spoutChannelShape, 24);
  const spout_channel = new THREE.Mesh(spout_channelGeom, innerMat);
  spout_channel.name = "spout_channel";
  spout_channel.position.z = 0.194;
  root.add(spout_channel);

  const spoutRidgePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.36, 1.105, 0.205),
      new THREE.Vector3(0.48, 1.18, 0.205),
      new THREE.Vector3(0.59, 1.36, 0.205),
      new THREE.Vector3(0.72, 1.53, 0.205),
      new THREE.Vector3(0.88, 1.635, 0.205),
      new THREE.Vector3(1.01, 1.645, 0.205),
    ],
    false,
    "centripetal"
  );
  const spout_ridgeGeom = new THREE.TubeGeometry(
    spoutRidgePath,
    48,
    0.012,
    8,
    false
  );
  const spout_ridge = new THREE.Mesh(spout_ridgeGeom, copperMat);
  spout_ridge.name = "spout_ridge";
  root.add(spout_ridge);

  const mouthShadowPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.39, 1.062, 0.207),
      new THREE.Vector3(0.50, 1.12, 0.207),
      new THREE.Vector3(0.61, 1.30, 0.207),
      new THREE.Vector3(0.73, 1.47, 0.207),
      new THREE.Vector3(0.87, 1.585, 0.207),
      new THREE.Vector3(0.98, 1.595, 0.207),
    ],
    false,
    "centripetal"
  );
  const mouth_shadowGeom = new THREE.TubeGeometry(
    mouthShadowPath,
    48,
    0.007,
    8,
    false
  );
  const mouth_shadow = new THREE.Mesh(mouth_shadowGeom, shadowMat);
  mouth_shadow.name = "mouth_shadow";
  root.add(mouth_shadow);

  fitToUnitCube(THREE, root);
  return root;

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
}