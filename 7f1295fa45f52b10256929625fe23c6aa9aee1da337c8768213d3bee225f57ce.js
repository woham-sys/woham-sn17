function __sn17_user(THREE) {
  const root = new THREE.Group();

  const vaseMat = new THREE.MeshStandardMaterial({ color: 0x2d5f9a, metalness: 0.15, roughness: 0.2 });
  const darkBlueMat = new THREE.MeshStandardMaterial({ color: 0x173c68, metalness: 0.05, roughness: 0.25 });
  const highlightMat = new THREE.MeshStandardMaterial({ color: 0xeaf7ff, metalness: 0.0, roughness: 0.18, transparent: true, opacity: 0.55 });
  const stemMat = new THREE.MeshStandardMaterial({ color: 0x1f4f2f, metalness: 0.0, roughness: 0.8 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2f6f36, metalness: 0.0, roughness: 0.75, side: THREE.DoubleSide });
  const bluePetalMat = new THREE.MeshStandardMaterial({ color: 0x9fbde8, metalness: 0.0, roughness: 0.7, side: THREE.DoubleSide });
  const paleBluePetalMat = new THREE.MeshStandardMaterial({ color: 0xc8e2f4, metalness: 0.0, roughness: 0.68, side: THREE.DoubleSide });
  const whitePetalMat = new THREE.MeshStandardMaterial({ color: 0xf2f5df, metalness: 0.0, roughness: 0.65, side: THREE.DoubleSide });
  const lavenderPetalMat = new THREE.MeshStandardMaterial({ color: 0xaab7df, metalness: 0.0, roughness: 0.72, side: THREE.DoubleSide });
  const veinMat = new THREE.MeshStandardMaterial({ color: 0xd8eaff, metalness: 0.0, roughness: 0.8 });
  const centerMat = new THREE.MeshStandardMaterial({ color: 0x8fc9c6, metalness: 0.0, roughness: 0.75 });

  const vaseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.22, 0.00),
    new THREE.Vector2(0.28, 0.025),
    new THREE.Vector2(0.29, 0.055),
    new THREE.Vector2(0.24, 0.085),
    new THREE.Vector2(0.20, 0.105),
    new THREE.Vector2(0.27, 0.17),
    new THREE.Vector2(0.34, 0.31),
    new THREE.Vector2(0.36, 0.48),
    new THREE.Vector2(0.33, 0.62),
    new THREE.Vector2(0.25, 0.72),
    new THREE.Vector2(0.18, 0.76),
    new THREE.Vector2(0.18, 0.80)
  ];
  const vaseGeom = new THREE.LatheGeometry(vaseProfile, 64);
  const vase_body = new THREE.Mesh(vaseGeom, vaseMat);
  root.add(vase_body);

  const base_ring = new THREE.Mesh(new THREE.TorusGeometry(0.255, 0.018, 12, 64), vaseMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.055;
  root.add(base_ring);

  const mouth_rim = new THREE.Mesh(new THREE.TorusGeometry(0.185, 0.018, 12, 64), vaseMat);
  mouth_rim.rotation.x = Math.PI / 2;
  mouth_rim.position.y = 0.795;
  root.add(mouth_rim);

  const mouth_shadow = new THREE.Mesh(new THREE.CircleGeometry(0.16, 48), darkBlueMat);
  mouth_shadow.rotation.x = Math.PI / 2;
  mouth_shadow.position.y = 0.792;
  root.add(mouth_shadow);

  const left_highlight = new THREE.Mesh(new THREE.PlaneGeometry(0.055, 0.34), highlightMat);
  left_highlight.position.set(-0.13, 0.48, 0.335);
  left_highlight.rotation.z = -0.12;
  root.add(left_highlight);

  const right_highlight = new THREE.Mesh(new THREE.PlaneGeometry(0.045, 0.28), highlightMat);
  right_highlight.position.set(0.15, 0.50, 0.325);
  right_highlight.rotation.z = 0.10;
  root.add(right_highlight);

  const bouquet_group = new THREE.Group();
  root.add(bouquet_group);

  const flowerData = [];
  const petalSets = [[], [], [], []];
  const veinSegments = [];
  const centerTransforms = [];
  const stamenTransforms = [];

  function addFlower(cx, cy, cz, size, tone, rx, ry, rz) {
    const flowerIndex = flowerData.length;
    flowerData.push({ cx, cy, cz, size, tone, rx, ry, rz });
    const normal = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(rx, ry, rz)).normalize();
    const tangentX = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(rx, ry, rz));
    const tangentY = new THREE.Vector3(0, 1, 0).applyEuler(new THREE.Euler(rx, ry, rz));

    for (let p = 0; p < 4; p++) {
      const angle = p * Math.PI / 2 + 0.12;
      const dir = tangentX.clone().multiplyScalar(Math.cos(angle)).add(tangentY.clone().multiplyScalar(Math.sin(angle))).normalize();
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      const pos = new THREE.Vector3(cx, cy, cz).add(normal.clone().multiplyScalar(0.006));
      petalSets[tone].push({
        pos,
        quat,
        sx: size * (0.43 + (p % 2) * 0.035),
        sy: size * (0.66 + ((p + 1) % 2) * 0.04),
        sz: 1
      });

      const veinStart = new THREE.Vector3(cx, cy, cz).add(dir.clone().multiplyScalar(size * 0.08)).add(normal.clone().multiplyScalar(0.012));
      const veinEnd = new THREE.Vector3(cx, cy, cz).add(dir.clone().multiplyScalar(size * 0.54)).add(normal.clone().multiplyScalar(0.014));
      veinSegments.push([veinStart, veinEnd]);

      const sideA = dir.clone().cross(normal).normalize();
      const sideB = sideA.clone().multiplyScalar(-1);
      for (const side of [sideA, sideB]) {
        const branchStart = new THREE.Vector3(cx, cy, cz).add(dir.clone().multiplyScalar(size * 0.22)).add(side.clone().multiplyScalar(size * 0.018)).add(normal.clone().multiplyScalar(0.013));
        const branchEnd = new THREE.Vector3(cx, cy, cz).add(dir.clone().multiplyScalar(size * 0.43)).add(side.clone().multiplyScalar(size * 0.105)).add(normal.clone().multiplyScalar(0.015));
        veinSegments.push([branchStart, branchEnd]);
      }
    }

    centerTransforms.push({
      pos: new THREE.Vector3(cx, cy, cz).add(normal.clone().multiplyScalar(0.018)),
      quat: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal),
      size: size * 0.105
    });

    for (let s = 0; s < 5; s++) {
      const a = s / 5 * Math.PI * 2 + 0.25;
      const local = new THREE.Vector3(Math.cos(a) * size * 0.075, Math.sin(a) * size * 0.075, 0).applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal));
      stamenTransforms.push({
        pos: new THREE.Vector3(cx, cy, cz).add(local).add(normal.clone().multiplyScalar(0.026)),
        size: size * 0.026
      });
    }
  }

  for (let ring = 0; ring < 5; ring++) {
    const count = ring === 0 ? 1 : ring === 1 ? 6 : ring === 2 ? 12 : ring === 3 ? 18 : 24;
    const radius = ring * 0.145;
    const yBase = 1.105 - ring * 0.075;
    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2 + ring * 0.31;
      const x = Math.cos(a) * radius;
      const z = Math.sin(a) * radius;
      const y = yBase + Math.sin(i * 1.7 + ring * 0.8) * 0.035;
      const size = 0.105 + ((i + ring * 2) % 4) * 0.009;
      const tone = (i + ring * 2) % 4;
      const nx = x * 0.75;
      const nz = z * 0.75;
      const ny = (y - 1.02) * 1.1;
      const invLen = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
      const rx = Math.atan2(nz, ny);
      const ry = Math.atan2(nx, ny);
      const rz = ((i % 5) - 2) * 0.08;
      addFlower(x, y, z, size, tone, rx, ry, rz);
    }
  }

  for (let i = 0; i < 18; i++) {
    const a = i / 18 * Math.PI * 2 + 0.18;
    const r = 0.36 + (i % 3) * 0.025;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const y = 0.88 + Math.sin(i * 1.3) * 0.035;
    const size = 0.095 + (i % 4) * 0.008;
    const tone = (i + 1) % 4;
    const nx = x;
    const nz = z;
    const ny = -0.25;
    const invLen = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
    addFlower(x, y, z, size, tone, Math.atan2(nz, ny), Math.atan2(nx, ny), ((i % 5) - 2) * 0.1);
  }

  function createInstancedMesh(geometry, material, transforms) {
    const mesh = new THREE.InstancedMesh(geometry, material, transforms.length);
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < transforms.length; i++) {
      const t = transforms[i];
      matrix.compose(t.pos, t.quat, new THREE.Vector3(t.sx === undefined ? 1 : t.sx, t.sy === undefined ? 1 : t.sy, t.sz === undefined ? 1 : t.sz));
      mesh.setMatrixAt(i, matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const petalGeom = new THREE.SphereGeometry(1, 18, 10);
  const blue_petals = createInstancedMesh(petalGeom, bluePetalMat, petalSets[0]);
  const pale_blue_petals = createInstancedMesh(petalGeom, paleBluePetalMat, petalSets[1]);
  const white_petals = createInstancedMesh(petalGeom, whitePetalMat, petalSets[2]);
  const lavender_petals = createInstancedMesh(petalGeom, lavenderPetalMat, petalSets[3]);
  bouquet_group.add(blue_petals, pale_blue_petals, white_petals, lavender_petals);

  const veinGeom = new THREE.CylinderGeometry(1, 1, 1, 6);
  const petal_veins = new THREE.InstancedMesh(veinGeom, veinMat, veinSegments.length);
  const veinMatrix = new THREE.Matrix4();
  const veinUp = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < veinSegments.length; i++) {
    const start = veinSegments[i][0];
    const end = veinSegments[i][1];
    const dir = end.clone().sub(start);
    const len = dir.length();
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const quat = new THREE.Quaternion().setFromUnitVectors(veinUp, dir.normalize());
    veinMatrix.compose(mid, quat, new THREE.Vector3(0.0022, len, 0.0022));
    petal_veins.setMatrixAt(i, veinMatrix);
  }
  petal_veins.instanceMatrix.needsUpdate = true;
  bouquet_group.add(petal_veins);

  const centerGeom = new THREE.SphereGeometry(1, 12, 8);
  const flower_centers = new THREE.InstancedMesh(centerGeom, centerMat, centerTransforms.length);
  const centerMatrix = new THREE.Matrix4();
  for (let i = 0; i < centerTransforms.length; i++) {
    const t = centerTransforms[i];
    centerMatrix.compose(t.pos, t.quat, new THREE.Vector3(t.size, t.size, t.size * 0.7));
    flower_centers.setMatrixAt(i, centerMatrix);
  }
  flower_centers.instanceMatrix.needsUpdate = true;
  bouquet_group.add(flower_centers);

  const stamenGeom = new THREE.SphereGeometry(1, 8, 6);
  const flower_stamens = new THREE.InstancedMesh(stamenGeom, centerMat, stamenTransforms.length);
  const stamenMatrix = new THREE.Matrix4();
  const identityQuat = new THREE.Quaternion();
  for (let i = 0; i < stamenTransforms.length; i++) {
    const t = stamenTransforms[i];
    stamenMatrix.compose(t.pos, identityQuat, new THREE.Vector3(t.size, t.size, t.size));
    flower_stamens.setMatrixAt(i, stamenMatrix);
  }
  flower_stamens.instanceMatrix.needsUpdate = true;
  bouquet_group.add(flower_stamens);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.bezierCurveTo(-0.055, 0.035, -0.075, 0.13, 0, 0.22);
  leafShape.bezierCurveTo(0.075, 0.13, 0.055, 0.035, 0, 0);
  const leafGeom = new THREE.ShapeGeometry(leafShape);
  const leafTransforms = [];
  for (let i = 0; i < 24; i++) {
    const a = i / 24 * Math.PI * 2 + 0.1;
    const r = 0.22 + (i % 4) * 0.035;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const y = 0.82 + (i % 3) * 0.035;
    const normal = new THREE.Vector3(Math.cos(a) * 0.7, 0.55, Math.sin(a) * 0.7).normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    leafTransforms.push({
      pos: new THREE.Vector3(x, y, z),
      quat,
      sx: 0.85 + (i % 3) * 0.12,
      sy: 0.9 + (i % 2) * 0.15,
      sz: 1
    });
  }
  const green_leaves = createInstancedMesh(leafGeom, leafMat, leafTransforms);
  bouquet_group.add(green_leaves);

  const stemGeom = new THREE.CylinderGeometry(1, 1, 1, 8);
  const stemTransforms = [];
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2 + 0.2;
    const start = new THREE.Vector3(Math.cos(a) * 0.08, 0.76, Math.sin(a) * 0.08);
    const end = new THREE.Vector3(Math.cos(a + 0.15) * (0.28 + (i % 3) * 0.04), 0.98 + (i % 2) * 0.06, Math.sin(a + 0.15) * (0.28 + (i % 3) * 0.04));
    const dir = end.clone().sub(start);
    const len = dir.length();
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const quat = new THREE.Quaternion().setFromUnitVectors(veinUp, dir.normalize());
    stemTransforms.push({ pos: mid, quat, sx: 0.012, sy: len, sz: 0.012 });
  }
  const green_stems = createInstancedMesh(stemGeom, stemMat, stemTransforms);
  bouquet_group.add(green_stems);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
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
