function __sn17_user(THREE) {
  const root = new THREE.Group();

  const petalMat = new THREE.MeshStandardMaterial({
    color: 0xf7f7f3,
    emissive: 0xd8d8d2,
    emissiveIntensity: 0.28,
    side: THREE.DoubleSide,
  });
  const petalVeinMat = new THREE.LineBasicMaterial({
    color: 0xdfe2df,
    transparent: true,
    opacity: 0.32,
  });
  const purpleMat = new THREE.MeshStandardMaterial({
    color: 0x30004e,
    side: THREE.DoubleSide,
  });
  const deepPurpleMat = new THREE.MeshStandardMaterial({
    color: 0x160024,
    side: THREE.DoubleSide,
  });
  const centerMat = new THREE.MeshStandardMaterial({
    color: 0xb8c95c,
    side: THREE.DoubleSide,
  });
  const stamenMat = new THREE.MeshStandardMaterial({
    color: 0xe7e6ad,
  });
  const antherMat = new THREE.MeshStandardMaterial({
    color: 0xc7cf69,
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x356b2e,
    side: THREE.DoubleSide,
  });
  const leafVeinMat = new THREE.MeshStandardMaterial({
    color: 0x527d43,
  });

  function createPetalGeometry(width, length, curl) {
    const rows = 30;
    const cols = 24;
    const positions = [];
    const uvs = [];
    const indices = [];

    for (let row = 0; row <= rows; row++) {
      const t = row / rows;
      const envelope = Math.pow(Math.sin(Math.PI * t), 0.62);
      const halfWidth = width * (0.035 + 0.965 * envelope);

      for (let col = 0; col <= cols; col++) {
        const u = col / cols * 2 - 1;
        const x = u * halfWidth;
        const y = length * t;
        const edgeCup = curl * u * u * Math.sin(Math.PI * t);
        const centerRidge =
          0.018 * (1 - u * u) * Math.sin(Math.PI * t);
        const ripple =
          0.006 * Math.sin(u * Math.PI * 3 + t * Math.PI * 2) *
          Math.sin(Math.PI * t);
        const z = centerRidge + edgeCup + ripple;

        positions.push(x, y, z);
        uvs.push(col / cols, t);
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const a = row * (cols + 1) + col;
        const b = a + 1;
        const c = a + cols + 1;
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "uv",
      new THREE.Float32BufferAttribute(uvs, 2)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createPetalVeinsGeometry(length) {
    const positions = [];

    for (let i = 0; i < 11; i++) {
      const spread = (i - 5) / 5;
      const start = 0.12;
      const end = 0.82 - Math.abs(spread) * 0.12;
      const segmentCount = 10;

      for (let j = 0; j < segmentCount; j++) {
        const t0 = start + (end - start) * (j / segmentCount);
        const t1 = start + (end - start) * ((j + 1) / segmentCount);
        const x0 = spread * length * 0.18 * t0;
        const x1 = spread * length * 0.18 * t1;
        positions.push(x0, length * t0, 0.033);
        positions.push(x1, length * t1, 0.033);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }

  function createStarGeometry(points, outerRadius, innerRadius, phase) {
    const shape = new THREE.Shape();

    for (let i = 0; i < points * 2; i++) {
      const angle = phase + i * Math.PI / points;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }

    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const rear_leaf_shape = new THREE.Shape();
  rear_leaf_shape.moveTo(0.08, -0.18);
  rear_leaf_shape.bezierCurveTo(0.34, -0.27, 0.68, -0.39, 0.94, -0.54);
  rear_leaf_shape.bezierCurveTo(0.76, -0.61, 0.43, -0.55, 0.08, -0.42);
  rear_leaf_shape.bezierCurveTo(0.00, -0.36, 0.00, -0.25, 0.08, -0.18);
  rear_leaf_shape.closePath();

  const rear_leaf_geom = new THREE.ShapeGeometry(rear_leaf_shape);
  const rear_leaf = new THREE.Mesh(rear_leaf_geom, leafMat);
  rear_leaf.position.z = -0.11;
  root.add(rear_leaf);

  const leaf_vein_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.10, -0.33, -0.095),
    new THREE.Vector3(0.34, -0.39, -0.095),
    new THREE.Vector3(0.61, -0.48, -0.095),
    new THREE.Vector3(0.87, -0.53, -0.095),
  ]);
  const leaf_vein_geom = new THREE.TubeGeometry(
    leaf_vein_curve,
    18,
    0.006,
    6,
    false
  );
  const leaf_vein = new THREE.Mesh(leaf_vein_geom, leafVeinMat);
  root.add(leaf_vein);

  const petalGeom = createPetalGeometry(0.68, 1.0, 0.028);
  const petalVeinGeom = createPetalVeinsGeometry(1.0);
  const petal_dummy = new THREE.Object3D();

  function configurePetal(petal, index, scaleX, scaleY, z, rotationOffset) {
    const angle =
      index / 6 * Math.PI * 2 +
      rotationOffset +
      (index % 2 === 0 ? -0.018 : 0.018);

    petal.rotation.z = angle;
    petal.scale.set(scaleX, scaleY, 1);
    petal.position.z = z;
  }

  function fillPetalInstances(instancedMesh) {
    for (let i = 0; i < 6; i++) {
      petal_dummy.position.set(0, 0, 0);
      petal_dummy.rotation.set(0, 0, 0);
      petal_dummy.scale.set(1, 1, 1);
      petal_dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, petal_dummy.matrix);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
  }

  const outer_petals = new THREE.InstancedMesh(
    petalGeom,
    petalMat,
    6
  );
  for (let i = 0; i < 6; i++) {
    configurePetal(outer_petals, i, 1.0, 1.0, 0.0, 0.0);
    outer_petals.setMatrixAt(i, petal_dummy.matrix);
  }
  outer_petals.instanceMatrix.needsUpdate = true;
  root.add(outer_petals);

  const petal_veins = new THREE.InstancedMesh(
    petalVeinGeom,
    petalVeinMat,
    6
  );
  fillPetalInstances(petal_veins);
  root.add(petal_veins);

  const purple_star_geom = createStarGeometry(
    12,
    0.31,
    0.145,
    Math.PI / 2
  );
  const purple_star = new THREE.Mesh(purple_star_geom, purpleMat);
  purple_star.position.z = 0.047;
  root.add(purple_star);

  const purple_center_geom = new THREE.CircleGeometry(0.145, 48);
  const purple_center = new THREE.Mesh(
    purple_center_geom,
    deepPurpleMat
  );
  purple_center.position.z = 0.052;
  root.add(purple_center);

  const green_center_geom = new THREE.CircleGeometry(0.072, 32);
  const green_center = new THREE.Mesh(green_center_geom, centerMat);
  green_center.position.z = 0.058;
  root.add(green_center);

  const stamen_count = 12;
  const stamen_shaft_geom = new THREE.CylinderGeometry(
    0.010,
    0.013,
    1,
    10
  );
  const stamen_anther_geom = new THREE.SphereGeometry(
    0.026,
    12,
    8
  );
  const stamen_filaments = new THREE.InstancedMesh(
    stamen_shaft_geom,
    stamenMat,
    stamen_count
  );
  const stamen_anthers = new THREE.InstancedMesh(
    stamen_anther_geom,
    antherMat,
    stamen_count
  );
  const stamen_dummy = new THREE.Object3D();

  for (let i = 0; i < stamen_count; i++) {
    const angle =
      i / stamen_count * Math.PI * 2 +
      (i % 2 === 0 ? -0.04 : 0.04);
    const length = 0.105 + (i % 3) * 0.012;
    const baseRadius = 0.025;
    const midpoint = baseRadius + length * 0.5;
    const tipRadius = baseRadius + length;
    const tilt = ((i % 4) - 1.5) * 0.055;

    stamen_dummy.position.set(
      Math.cos(angle) * midpoint,
      Math.sin(angle) * midpoint,
      0.073 + (i % 2) * 0.004
    );
    stamen_dummy.rotation.set(tilt, 0, angle - Math.PI / 2);
    stamen_dummy.scale.set(1, length, 1);
    stamen_dummy.updateMatrix();
    stamen_filaments.setMatrixAt(i, stamen_dummy.matrix);

    stamen_dummy.position.set(
      Math.cos(angle) * tipRadius,
      Math.sin(angle) * tipRadius,
      0.082 + (i % 2) * 0.004
    );
    stamen_dummy.rotation.set(
      tilt * 0.5,
      0,
      angle - Math.PI / 2
    );
    stamen_dummy.scale.set(0.72, 1.35, 0.66);
    stamen_dummy.updateMatrix();
    stamen_anthers.setMatrixAt(i, stamen_dummy.matrix);
  }

  stamen_filaments.instanceMatrix.needsUpdate = true;
  stamen_anthers.instanceMatrix.needsUpdate = true;
  root.add(stamen_filaments);
  root.add(stamen_anthers);

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
