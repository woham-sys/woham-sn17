function __sn17_user(THREE) {
  const root = new THREE.Group();

  const width = 1.0;
  const height = 0.72;
  const depth = 0.82;
  const cornerRadius = 0.105;

  const cheese_blockMat = new THREE.MeshStandardMaterial({
    color: 0xfff1bd,
    emissive: 0xffe7a3,
    emissiveIntensity: 0.28,
    roughness: 0.9,
    metalness: 0.0,
  });

  const poreMat = new THREE.MeshStandardMaterial({
    color: 0xe8d39a,
    roughness: 0.95,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });

  const creaseMat = new THREE.MeshStandardMaterial({
    color: 0xf1dfaa,
    roughness: 0.95,
    metalness: 0.0,
  });

  function createRoundedBoxGeometry(w, h, d, radius) {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const normals = [];
    const indices = [];

    const hx = w * 0.5;
    const hy = h * 0.5;
    const hz = d * 0.5;
    const ix = hx - radius;
    const iy = hy - radius;
    const iz = hz - radius;

    const faces = [
      {
        normal: new THREE.Vector3(1, 0, 0),
        u: new THREE.Vector3(0, 0, -1),
        v: new THREE.Vector3(0, 1, 0),
        center: new THREE.Vector3(hx, 0, 0),
        hu: iz,
        hv: iy,
      },
      {
        normal: new THREE.Vector3(-1, 0, 0),
        u: new THREE.Vector3(0, 0, 1),
        v: new THREE.Vector3(0, 1, 0),
        center: new THREE.Vector3(-hx, 0, 0),
        hu: iz,
        hv: iy,
      },
      {
        normal: new THREE.Vector3(0, 1, 0),
        u: new THREE.Vector3(1, 0, 0),
        v: new THREE.Vector3(0, 0, -1),
        center: new THREE.Vector3(0, hy, 0),
        hu: ix,
        hv: iz,
      },
      {
        normal: new THREE.Vector3(0, -1, 0),
        u: new THREE.Vector3(1, 0, 0),
        v: new THREE.Vector3(0, 0, 1),
        center: new THREE.Vector3(0, -hy, 0),
        hu: ix,
        hv: iz,
      },
      {
        normal: new THREE.Vector3(0, 0, 1),
        u: new THREE.Vector3(1, 0, 0),
        v: new THREE.Vector3(0, 1, 0),
        center: new THREE.Vector3(0, 0, hz),
        hu: ix,
        hv: iy,
      },
      {
        normal: new THREE.Vector3(0, 0, -1),
        u: new THREE.Vector3(-1, 0, 0),
        v: new THREE.Vector3(0, 1, 0),
        center: new THREE.Vector3(0, 0, -hz),
        hu: ix,
        hv: iy,
      },
    ];

    const edgeCenters = [
      new THREE.Vector3(hx, hy, 0),
      new THREE.Vector3(-hx, hy, 0),
      new THREE.Vector3(hx, -hy, 0),
      new THREE.Vector3(-hx, -hy, 0),
      new THREE.Vector3(0, hy, hz),
      new THREE.Vector3(0, hy, -hz),
      new THREE.Vector3(0, -hy, hz),
      new THREE.Vector3(0, -hy, -hz),
      new THREE.Vector3(hx, 0, hz),
      new THREE.Vector3(-hx, 0, hz),
      new THREE.Vector3(hx, 0, -hz),
      new THREE.Vector3(-hx, 0, -hz),
    ];

    function appendPoint(face, a, b) {
      const point = face.center.clone()
        .addScaledVector(face.u, a)
        .addScaledVector(face.v, b);
      positions.push(point.x, point.y, point.z);
      normals.push(face.normal.x, face.normal.y, face.normal.z);
    }

    for (const face of faces) {
      const base = positions.length / 3;
      const segmentsU = Math.max(1, Math.ceil(face.hu / 0.025));
      const segmentsV = Math.max(1, Math.ceil(face.hv / 0.025));

      for (let j = 0; j <= segmentsV; j++) {
        const b = -face.hv + (2 * face.hv * j) / segmentsV;
        for (let i = 0; i <= segmentsU; i++) {
          const a = -face.hu + (2 * face.hu * i) / segmentsU;
          appendPoint(face, a, b);
        }
      }

      const row = segmentsU + 1;
      for (let j = 0; j < segmentsV; j++) {
        for (let i = 0; i < segmentsU; i++) {
          const p0 = base + j * row + i;
          const p1 = p0 + 1;
          const p2 = p0 + row;
          const p3 = p2 + 1;
          indices.push(p0, p1, p3, p0, p3, p2);
        }
      }
    }

    function appendEdge(edgeCenter, tangentU, tangentV) {
      const base = positions.length / 3;
      const ringSegments = 14;
      const uSegments = Math.max(1, Math.ceil(radius / 0.018));

      for (let j = 0; j <= ringSegments; j++) {
        const angle = (j / ringSegments) * Math.PI * 0.5;
        const ca = Math.cos(angle);
        const sa = Math.sin(angle);

        for (let i = 0; i <= uSegments; i++) {
          const along = -radius + (2 * radius * i) / uSegments;
          const point = edgeCenter.clone()
            .addScaledVector(tangentU, along)
            .addScaledVector(tangentV, radius * ca)
            .addScaledVector(edgeCenter.clone().normalize(), radius * sa);

          const normal = tangentV.clone().multiplyScalar(ca)
            .addScaledVector(edgeCenter.clone().normalize(), sa)
            .normalize();

          positions.push(point.x, point.y, point.z);
          normals.push(normal.x, normal.y, normal.z);
        }
      }

      const row = uSegments + 1;
      for (let j = 0; j < ringSegments; j++) {
        for (let i = 0; i < uSegments; i++) {
          const p0 = base + j * row + i;
          const p1 = p0 + 1;
          const p2 = p0 + row;
          const p3 = p2 + 1;
          indices.push(p0, p2, p3, p0, p3, p1);
        }
      }
    }

    for (let i = 0; i < edgeCenters.length; i++) {
      const edgeCenter = edgeCenters[i];
      const cx = Math.abs(edgeCenter.x) < 0.0001;
      const cy = Math.abs(edgeCenter.y) < 0.0001;
      const cz = Math.abs(edgeCenter.z) < 0.0001;

      let tangentU;
      let tangentV;

      if (cx) {
        tangentU = new THREE.Vector3(0, 0, 1);
      } else if (cy) {
        tangentU = new THREE.Vector3(1, 0, 0);
      } else {
        tangentU = new THREE.Vector3(1, 0, 0);
      }

      if (cz) {
        tangentV = new THREE.Vector3(1, 0, 0);
      } else if (cx) {
        tangentV = new THREE.Vector3(0, 1, 0);
      } else {
        tangentV = new THREE.Vector3(0, 1, 0);
      }

      appendEdge(edgeCenter, tangentU, tangentV);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const cheese_blockGeom = createRoundedBoxGeometry(
    width,
    height,
    depth,
    cornerRadius
  );
  const cheese_block = new THREE.Mesh(cheese_blockGeom, cheese_blockMat);
  root.add(cheese_block);

  const poreGeom = new THREE.CircleGeometry(1, 12);

  function createPoreField(count, face, seed, minSize, maxSize) {
    const pores = new THREE.InstancedMesh(poreGeom, poreMat, count);
    const dummy = new THREE.Object3D();
    const localNormal = new THREE.Vector3(0, 0, 1);
    const align = new THREE.Quaternion();
    const spin = new THREE.Quaternion();

    let hx = width * 0.5;
    let hy = height * 0.5;
    let hz = depth * 0.5;
    let normal;
    let u;
    let v;

    if (face === "front") {
      normal = new THREE.Vector3(0, 0, 1);
      u = new THREE.Vector3(1, 0, 0);
      v = new THREE.Vector3(0, 1, 0);
      hx -= cornerRadius * 1.15;
      hy -= cornerRadius * 1.15;
      hz = depth * 0.5 + 0.003;
    } else if (face === "right") {
      normal = new THREE.Vector3(1, 0, 0);
      u = new THREE.Vector3(0, 0, -1);
      v = new THREE.Vector3(0, 1, 0);
      hx = width * 0.5 + 0.003;
      hy -= cornerRadius * 1.15;
      hz -= cornerRadius * 1.15;
    } else {
      normal = new THREE.Vector3(0, 1, 0);
      u = new THREE.Vector3(1, 0, 0);
      v = new THREE.Vector3(0, 0, -1);
      hx -= cornerRadius * 1.15;
      hy = height * 0.5 + 0.003;
      hz -= cornerRadius * 1.15;
    }

    align.setFromUnitVectors(localNormal, normal);

    for (let i = 0; i < count; i++) {
      const du = (((i * 37 + seed * 11) % 101) / 100 - 0.5) * 2;
      const dv = (((i * 53 + seed * 17) % 97) / 96 - 0.5) * 2;
      const sizeMix = ((i * 29 + seed * 7) % 19) / 18;
      const aspect = 0.45 + ((i * 13 + seed * 5) % 11) / 22;
      const size = minSize + (maxSize - minSize) * sizeMix;

      dummy.position.set(
        hx + u.x * du * hx + normal.x * 0.0025,
        hy + u.y * du * hx + normal.y * 0.0025,
        hz + u.z * du * hx + normal.z * 0.0025
      );
      dummy.position.addScaledVector(v, dv * hy);

      spin.setFromAxisAngle(
        localNormal,
        (((i * 19 + seed * 3) % 36) / 36) * Math.PI * 2
      );
      dummy.quaternion.copy(align).multiply(spin);
      dummy.scale.set(size, size * aspect, 1);
      dummy.updateMatrix();
      pores.setMatrixAt(i, dummy.matrix);
    }

    pores.instanceMatrix.needsUpdate = true;
    return pores;
  }

  const front_pores = createPoreField(28, "front", 2, 0.0025, 0.008);
  root.add(front_pores);

  const right_pores = createPoreField(23, "right", 5, 0.0025, 0.0085);
  root.add(right_pores);

  const top_pores = createPoreField(15, "top", 8, 0.002, 0.006);
  root.add(top_pores);

  const larger_front_pores = createPoreField(7, "front", 13, 0.011, 0.023);
  root.add(larger_front_pores);

  const larger_right_pores = createPoreField(6, "right", 17, 0.011, 0.023);
  root.add(larger_right_pores);

  const front_crease_1Curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.34, 0.10, depth * 0.5 + 0.004),
    new THREE.Vector3(-0.31, 0.045, depth * 0.5 + 0.004),
    new THREE.Vector3(-0.27, -0.015, depth * 0.5 + 0.004),
    new THREE.Vector3(-0.22, -0.075, depth * 0.5 + 0.004),
  ]);
  const front_crease_1Geom = new THREE.TubeGeometry(
    front_crease_1Curve,
    16,
    0.0018,
    6,
    false
  );
  const front_crease_1 = new THREE.Mesh(front_crease_1Geom, creaseMat);
  root.add(front_crease_1);

  const front_crease_2Curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.18, -0.18, depth * 0.5 + 0.004),
    new THREE.Vector3(0.21, -0.135, depth * 0.5 + 0.004),
    new THREE.Vector3(0.25, -0.105, depth * 0.5 + 0.004),
    new THREE.Vector3(0.29, -0.085, depth * 0.5 + 0.004),
  ]);
  const front_crease_2Geom = new THREE.TubeGeometry(
    front_crease_2Curve,
    12,
    0.0015,
    6,
    false
  );
  const front_crease_2 = new THREE.Mesh(front_crease_2Geom, creaseMat);
  root.add(front_crease_2);

  const right_creaseCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(width * 0.5 + 0.004, 0.13, 0.18),
    new THREE.Vector3(width * 0.5 + 0.004, 0.085, 0.15),
    new THREE.Vector3(width * 0.5 + 0.004, 0.035, 0.12),
    new THREE.Vector3(width * 0.5 + 0.004, -0.015, 0.09),
  ]);
  const right_creaseGeom = new THREE.TubeGeometry(
    right_creaseCurve,
    14,
    0.0017,
    6,
    false
  );
  const right_crease = new THREE.Mesh(right_creaseGeom, creaseMat);
  root.add(right_crease);

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
