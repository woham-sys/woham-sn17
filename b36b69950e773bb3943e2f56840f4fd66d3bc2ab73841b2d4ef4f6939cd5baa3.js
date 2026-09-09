function __sn17_user(THREE) {
  const root = new THREE.Group();

  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xff8a12,
    metalness: 0.0,
    roughness: 0.38,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.42,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x120805,
    metalness: 0.0,
    roughness: 0.9,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0xd96f08,
    metalness: 0.0,
    roughness: 0.95,
  });

  const ballR = 0.5;
  const panelBulge = 0.018;
  const phi = (1 + Math.sqrt(5)) / 2;
  const icosaVertices = [];
  for (const a of [-1, 1]) {
    for (const b of [-phi, phi]) {
      icosaVertices.push(new THREE.Vector3(0, a, b).normalize());
      icosaVertices.push(new THREE.Vector3(a, b, 0).normalize());
      icosaVertices.push(new THREE.Vector3(b, 0, a).normalize());
    }
  }

  let edgeLength = Infinity;
  for (let i = 0; i < icosaVertices.length; i++) {
    for (let j = i + 1; j < icosaVertices.length; j++) {
      const d = icosaVertices[i].distanceTo(icosaVertices[j]);
      if (d > 0.001 && d < edgeLength) edgeLength = d;
    }
  }

  const adjacency = [];
  for (let i = 0; i < icosaVertices.length; i++) adjacency.push([]);
  for (let i = 0; i < icosaVertices.length; i++) {
    for (let j = i + 1; j < icosaVertices.length; j++) {
      if (Math.abs(icosaVertices[i].distanceTo(icosaVertices[j]) - edgeLength) < 0.002) {
        adjacency[i].push(j);
        adjacency[j].push(i);
      }
    }
  }

  const frontDir = new THREE.Vector3(0, 0, 1);
  const alignQuat = new THREE.Quaternion().setFromUnitVectors(frontDir, icosaVertices[0]);
  const spinQuat = new THREE.Quaternion().setFromAxisAngle(frontDir, -0.18);
  const panelDirs = [];
  for (let i = 0; i < icosaVertices.length; i++) {
    const dir = icosaVertices[i].clone().applyQuaternion(alignQuat).applyQuaternion(spinQuat).normalize();
    panelDirs.push(dir);
  }

  function sphericalBlend(a, b, t) {
    return a.clone().multiplyScalar(1 - t).addScaledVector(b, t).normalize();
  }

  function truncatedPoint(centerIndex, neighborIndex) {
    return sphericalBlend(panelDirs[centerIndex], panelDirs[neighborIndex], 1 / 3);
  }

  function createSphericalPolygon(points, radius, bulge, subdivisions) {
    const center = new THREE.Vector3();
    for (const p of points) center.add(p);
    center.normalize();

    const positions = [];
    const normals = [];
    const indices = [];
    const rings = [];

    function pushVertex(v) {
      const n = v.clone().normalize();
      const r = radius + bulge * (1 - Math.pow(n.dot(center), 2));
      positions.push(v.multiplyScalar(r).x, v.multiplyScalar(r).y, v.multiplyScalar(r).z);
      normals.push(n.x, n.y, n.z);
    }

    pushVertex(center);
    for (let ring = 1; ring <= subdivisions; ring++) {
      const t = ring / subdivisions;
      const ringIndices = [];
      for (let i = 0; i < points.length; i++) {
        const edgeMid = sphericalBlend(center, points[i], t);
        const next = points[(i + 1) % points.length];
        const corner = sphericalBlend(points[i], next, t);
        ringIndices.push(positions.length / 3);
        pushVertex(edgeMid);
        pushVertex(corner);
      }
      rings.push(ringIndices);
    }

    for (let i = 0; i < points.length; i++) {
      indices.push(0, rings[0][i * 2], rings[0][(i * 2 + 2) % (points.length * 2)]);
    }

    for (let ring = 1; ring < subdivisions; ring++) {
      const inner = rings[ring - 1];
      const outer = rings[ring];
      for (let i = 0; i < points.length; i++) {
        const a = inner[i * 2];
        const b = inner[(i * 2 + 2) % (points.length * 2)];
        const c = outer[(i * 2 + 2) % (points.length * 2)];
        const d = outer[i * 2];
        indices.push(a, d, b, b, d, c);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geo.setIndex(indices);
    geo.computeBoundingSphere();
    return geo;
  }

  const base_shell = new THREE.Mesh(new THREE.SphereGeometry(ballR, 96, 48), orangeMat);
  root.add(base_shell);

  const pentagon_panels = new THREE.Group();
  const hexagon_panels = new THREE.Group();
  const seam_edges = [];

  for (let i = 0; i < panelDirs.length; i++) {
    const corners = [];
    for (const j of adjacency[i]) corners.push(truncatedPoint(i, j));

    const tangentU = new THREE.Vector3().crossVectors(corners[0], panelDirs[i]).normalize();
    const tangentV = new THREE.Vector3().crossVectors(panelDirs[i], tangentU).normalize();
    const ordered = [];
    for (const corner of corners) {
      const u = corner.clone().sub(panelDirs[i].clone().multiplyScalar(corner.dot(panelDirs[i]))).dot(tangentU);
      const v = corner.clone().sub(panelDirs[i].clone().multiplyScalar(corner.dot(panelDirs[i]))).dot(tangentV);
      ordered.push({ corner, angle: Math.atan2(v, u) });
    }
    ordered.sort((a, b) => a.angle - b.angle);
    const orderedCorners = ordered.map(o => o.corner);

    const panelGeo = createSphericalPolygon(orderedCorners, ballR, panelBulge, 7);
    const panelMat = i % 2 === 0 ? blackMat : orangeMat;
    const panel = new THREE.Mesh(panelGeo, panelMat);
    if (i % 2 === 0) pentagon_panels.add(panel);
    else hexagon_panels.add(panel);

    for (let j = 0; j < orderedCorners.length; j++) {
      seam_edges.push([orderedCorners[j], orderedCorners[(j + 1) % orderedCorners.length]]);
    }
  }

  root.add(pentagon_panels);
  root.add(hexagon_panels);

  const uniqueSeams = [];
  const seamSet = new Set();
  for (const pair of seam_edges) {
    const a = pair[0].clone().normalize().multiplyScalar(1000).round();
    const b = pair[1].clone().normalize().multiplyScalar(1000).round();
    const key = a.x < b.x || (a.x === b.x && a.y < b.y)
      ? `${a.x},${a.y},${a.z}|${b.x},${b.y},${b.z}`
      : `${b.x},${b.y},${b.z}|${a.x},${a.y},${a.z}`;
    if (!seamSet.has(key)) {
      seamSet.add(key);
      uniqueSeams.push(pair);
    }
  }

  const seam_lines = new THREE.Group();
  for (const pair of uniqueSeams) {
    const seamCurve = new THREE.QuadraticBezierCurve3(
      pair[0].clone().multiplyScalar(ballR + panelBulge + 0.003),
      pair[0].clone().add(pair[1]).normalize().multiplyScalar(ballR + panelBulge + 0.011),
      pair[1].clone().multiplyScalar(ballR + panelBulge + 0.003)
    );
    const seam_line = new THREE.Mesh(
      new THREE.TubeGeometry(seamCurve, 8, 0.0032, 6, false),
      seamMat
    );
    seam_lines.add(seam_line);
  }
  root.add(seam_lines);

  const stitchCountPerSeam = 5;
  const stitch_holes = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.0042, 8, 5),
    seamMat,
    uniqueSeams.length * stitchCountPerSeam
  );
  const stitchMatrix = new THREE.Matrix4();
  const stitchQuat = new THREE.Quaternion();
  const stitchScale = new THREE.Vector3(1, 1, 0.45);
  let stitchIndex = 0;
  for (const pair of uniqueSeams) {
    for (let k = 1; k <= stitchCountPerSeam; k++) {
      const t = k / (stitchCountPerSeam + 1);
      const pos = sphericalBlend(pair[0], pair[1], t).multiplyScalar(ballR + panelBulge + 0.006);
      stitchMatrix.compose(pos, stitchQuat, stitchScale);
      stitch_holes.setMatrixAt(stitchIndex++, stitchMatrix);
    }
  }
  stitch_holes.instanceMatrix.needsUpdate = true;
  root.add(stitch_holes);

  const pebbleCount = 260;
  const leather_pebbles = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.0032, 6, 4),
    grainMat,
    pebbleCount
  );
  const pebbleMatrix = new THREE.Matrix4();
  const pebbleQuat = new THREE.Quaternion();
  const pebbleScale = new THREE.Vector3();
  for (let i = 0; i < pebbleCount; i++) {
    const y = 1 - 2 * ((i + 0.5) / pebbleCount);
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * 2.399963229728653;
    const normal = new THREE.Vector3(Math.cos(angle) * radial, y, Math.sin(angle) * radial).normalize();
    const pos = normal.clone().multiplyScalar(ballR + panelBulge + 0.004);
    const s = 0.65 + 0.25 * (0.5 + 0.5 * Math.sin(i * 1.73));
    pebbleScale.setScalar(s);
    pebbleMatrix.compose(pos, pebbleQuat, pebbleScale);
    leather_pebbles.setMatrixAt(i, pebbleMatrix);
  }
  leather_pebbles.instanceMatrix.needsUpdate = true;
  root.add(leather_pebbles);

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
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
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
