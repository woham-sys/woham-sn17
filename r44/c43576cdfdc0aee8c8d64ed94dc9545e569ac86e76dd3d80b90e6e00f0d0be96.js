// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "spiral_ornament_ball";

  const sphereR = 0.5;

  const black_coreMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.0,
    roughness: 0.9,
  });
  const black_coreGeom = new THREE.SphereGeometry(sphereR, 96, 64);
  const black_core = new THREE.Mesh(black_coreGeom, black_coreMat);
  black_core.name = "black_core";
  root.add(black_core);

  const gold_spiralMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });

  function surfacePoint(u, v, radius) {
    const z = Math.sqrt(Math.max(0.0001, sphereR * sphereR - u * u - v * v));
    return new THREE.Vector3(u, v, z).normalize().multiplyScalar(radius);
  }

  function makeSpiralRibbonGeometry() {
    const positions = [];
    const indices = [];
    const segments = 560;
    const turns = 4.35;
    const startAngle = -0.35;
    const spiralCenterU = 0.012;
    const spiralCenterV = -0.012;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = startAngle + t * turns * Math.PI * 2;
      const radius = 0.012 + 0.455 * t;
      const u = spiralCenterU + Math.cos(angle) * radius;
      const v = spiralCenterV + Math.sin(angle) * radius;
      const du = Math.cos(angle) - Math.sin(angle) * radius * turns * Math.PI * 2;
      const dv = Math.sin(angle) + Math.cos(angle) * radius * turns * Math.PI * 2;
      const tangentLength = Math.sqrt(du * du + dv * dv) || 1;
      const perpendicularU = -dv / tangentLength;
      const perpendicularV = du / tangentLength;
      const halfWidth = 0.023 + 0.008 * t + 0.0025 * Math.sin(t * Math.PI * 18);

      const left = surfacePoint(
        u + perpendicularU * halfWidth,
        v + perpendicularV * halfWidth,
        sphereR + 0.007
      );
      const right = surfacePoint(
        u - perpendicularU * halfWidth,
        v - perpendicularV * halfWidth,
        sphereR + 0.007
      );

      positions.push(left.x, left.y, left.z, right.x, right.y, right.z);
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const gold_spiralGeom = makeSpiralRibbonGeometry();
  const gold_spiral = new THREE.Mesh(gold_spiralGeom, gold_spiralMat);
  gold_spiral.name = "gold_spiral";
  root.add(gold_spiral);

  const gold_spiral_edgePoints = [];
  const edgeSegments = 360;
  const edgeTurns = 4.35;
  const edgeStartAngle = -0.35;
  const edgeCenterU = 0.012;
  const edgeCenterV = -0.012;

  for (let i = 0; i <= edgeSegments; i++) {
    const t = i / edgeSegments;
    const angle = edgeStartAngle + t * edgeTurns * Math.PI * 2;
    const radius = 0.012 + 0.455 * t;
    const u = edgeCenterU + Math.cos(angle) * radius;
    const v = edgeCenterV + Math.sin(angle) * radius;
    const du = Math.cos(angle) - Math.sin(angle) * radius * edgeTurns * Math.PI * 2;
    const dv = Math.sin(angle) + Math.cos(angle) * radius * edgeTurns * Math.PI * 2;
    const tangentLength = Math.sqrt(du * du + dv * dv) || 1;
    const halfWidth = 0.023 + 0.008 * t + 0.0025 * Math.sin(t * Math.PI * 18);
    gold_spiral_edgePoints.push(
      surfacePoint(
        u - du / tangentLength * halfWidth,
        v - dv / tangentLength * halfWidth,
        sphereR + 0.011
      )
    );
  }

  const gold_spiral_edgeCurve = new THREE.CatmullRomCurve3(
    gold_spiral_edgePoints,
    false,
    "centripetal"
  );
  const gold_spiral_edgeGeom = new THREE.TubeGeometry(
    gold_spiral_edgeCurve,
    480,
    0.0045,
    7,
    false
  );
  const gold_spiral_edge = new THREE.Mesh(gold_spiral_edgeGeom, gold_spiralMat);
  gold_spiral_edge.name = "gold_spiral_edge";
  root.add(gold_spiral_edge);

  const gold_flecksMat = gold_spiralMat;
  const gold_flecksGeom = new THREE.CircleGeometry(1, 10);
  const goldFleckCount = 72;
  const gold_flecks = new THREE.InstancedMesh(
    gold_flecksGeom,
    gold_flecksMat,
    goldFleckCount
  );
  gold_flecks.name = "gold_flecks";

  const fleckDummy = new THREE.Object3D();
  const outwardAxis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < goldFleckCount; i++) {
    const angle = i * 2.399963229728653;
    const radial = 0.065 + 0.405 * (((i * 29) % 73) / 72);
    const u = Math.cos(angle) * radial;
    const v = Math.sin(angle) * radial;
    const normal = surfacePoint(u, v, 1).normalize();
    const size = 0.0045 + 0.006 * (((i * 17) % 11) / 10);

    fleckDummy.position.copy(normal).multiplyScalar(sphereR + 0.008);
    fleckDummy.quaternion.setFromUnitVectors(outwardAxis, normal);
    fleckDummy.rotateZ(i * 0.73);
    fleckDummy.scale.set(size * (1.0 + 0.55 * ((i % 3) / 2)), size, 1);
    fleckDummy.updateMatrix();
    gold_flecks.setMatrixAt(i, fleckDummy.matrix);
  }
  gold_flecks.instanceMatrix.needsUpdate = true;
  root.add(gold_flecks);

  const black_pitsMat = new THREE.MeshStandardMaterial({
    color: 0x010101,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const black_pitsGeom = new THREE.CircleGeometry(1, 9);
  const blackPitCount = 110;
  const black_pits = new THREE.InstancedMesh(
    black_pitsGeom,
    black_pitsMat,
    blackPitCount
  );
  black_pits.name = "black_pits";

  const pitDummy = new THREE.Object3D();

  for (let i = 0; i < blackPitCount; i++) {
    const angle = 0.42 + i * 2.399963229728653;
    const radial = 0.045 + 0.425 * (((i * 37) % 113) / 112);
    const u = Math.cos(angle) * radial;
    const v = Math.sin(angle) * radial;
    const normal = surfacePoint(u, v, 1).normalize();
    const size = 0.0028 + 0.0055 * (((i * 13) % 17) / 16);

    pitDummy.position.copy(normal).multiplyScalar(sphereR + 0.0085);
    pitDummy.quaternion.setFromUnitVectors(outwardAxis, normal);
    pitDummy.rotateZ(i * 1.17);
    pitDummy.scale.set(size * 1.35, size * 0.7, 1);
    pitDummy.updateMatrix();
    black_pits.setMatrixAt(i, pitDummy.matrix);
  }
  black_pits.instanceMatrix.needsUpdate = true;
  root.add(black_pits);

  const surface_granulesMat = black_coreMat;
  const surface_granulesGeom = new THREE.IcosahedronGeometry(0.0042, 0);
  const surfaceGranuleCount = 260;
  const surface_granules = new THREE.InstancedMesh(
    surface_granulesGeom,
    surface_granulesMat,
    surfaceGranuleCount
  );
  surface_granules.name = "surface_granules";

  const granuleDummy = new THREE.Object3D();

  for (let i = 0; i < surfaceGranuleCount; i++) {
    const y = 1 - 2 * (i + 0.5) / surfaceGranuleCount;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * 2.399963229728653;
    const normal = new THREE.Vector3(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    );
    const scale = 0.65 + 0.55 * (((i * 19) % 23) / 22);

    granuleDummy.position.copy(normal).multiplyScalar(sphereR + 0.002);
    granuleDummy.rotation.set(i * 0.31, i * 0.57, i * 0.83);
    granuleDummy.scale.setScalar(scale);
    granuleDummy.updateMatrix();
    surface_granules.setMatrixAt(i, granuleDummy.matrix);
  }
  surface_granules.instanceMatrix.needsUpdate = true;
  root.add(surface_granules);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}