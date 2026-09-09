function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "plush_beanbag_chair";

  const seat_group = new THREE.Group();
  seat_group.name = "seat_group";
  root.add(seat_group);

  const backrest_group = new THREE.Group();
  backrest_group.name = "backrest_group";
  root.add(backrest_group);

  const seam_group = new THREE.Group();
  seam_group.name = "seam_group";
  root.add(seam_group);

  const textureSize = 128;
  const bumpData = new Uint8Array(textureSize * textureSize * 4);
  const cellSize = 8;

  for (let py = 0; py < textureSize; py++) {
    for (let px = 0; px < textureSize; px++) {
      const cellX = Math.floor(px / cellSize);
      const cellY = Math.floor(py / cellSize);
      let nearest = 1000000;
      let secondNearest = 1000000;

      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const cx = cellX + ox;
          const cy = cellY + oy;
          const hashX = ((cx * 37 + cy * 61 + 17) % 31 + 31) % 31;
          const hashY = ((cx * 53 + cy * 29 + 11) % 37 + 37) % 37;
          const jitterX = (((cx * 19 + cy * 7) % 9) - 4) * 0.18;
          const jitterY = (((cx * 11 + cy * 23) % 9) - 4) * 0.18;
          const radius = 0.28 + ((cx * 13 + cy * 17) % 7) * 0.045;
          const centerX = cx * cellSize + 1.2 + hashX / 30 * (cellSize - 2.4) + jitterX;
          const centerY = cy * cellSize + 1.2 + hashY / 36 * (cellSize - 2.4) + jitterY;
          const dx = px - centerX;
          const dy = py - centerY;
          const normalizedDistance = Math.sqrt(dx * dx + dy * dy) / radius;
          const distance = normalizedDistance * normalizedDistance;

          if (distance < nearest) {
            secondNearest = nearest;
            nearest = distance;
          } else if (distance < secondNearest) {
            secondNearest = distance;
          }
        }
      }

      const gap = secondNearest - nearest;
      const micro = ((px * 23 + py * 41) % 17) - 8;
      const height = Math.max(0, Math.min(255, Math.floor(222 + gap * 18 + micro)));
      const index = (py * textureSize + px) * 4;
      bumpData[index] = height;
      bumpData[index + 1] = height;
      bumpData[index + 2] = height;
      bumpData[index + 3] = 255;
    }
  }

  const fleeceBumpTexture = new THREE.DataTexture(
    bumpData,
    textureSize,
    textureSize,
    THREE.RGBAFormat
  );
  fleeceBumpTexture.wrapS = THREE.RepeatWrapping;
  fleeceBumpTexture.wrapT = THREE.RepeatWrapping;
  fleeceBumpTexture.repeat.set(10, 10);
  fleeceBumpTexture.magFilter = THREE.LinearFilter;
  fleeceBumpTexture.minFilter = THREE.LinearFilter;
  fleeceBumpTexture.needsUpdate = true;

  const fleeceMat = new THREE.MeshStandardMaterial({
    color: 0xe8dfcf,
    metalness: 0.0,
    roughness: 0.98,
    bumpMap: fleeceBumpTexture,
    bumpScale: 0.032,
    side: THREE.DoubleSide
  });

  const innerFleeceMat = new THREE.MeshStandardMaterial({
    color: 0xe1d6c4,
    metalness: 0.0,
    roughness: 0.98,
    bumpMap: fleeceBumpTexture,
    bumpScale: 0.032,
    side: THREE.DoubleSide
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xcfc4b2,
    metalness: 0.0,
    roughness: 0.98,
    bumpMap: fleeceBumpTexture,
    bumpScale: 0.012
  });

  function createPlushSphereGeometry(width, height, depth, uSegments, vSegments) {
    const geometry = new THREE.SphereGeometry(1, uSegments, vSegments);
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      const length = Math.sqrt(x * x + y * y + z * z) || 1;
      const nx = x / length;
      const ny = y / length;
      const nz = z / length;

      const fineA = Math.sin(nx * 47 + ny * 31 + nz * 19);
      const fineB = Math.sin(nx * 73 - ny * 37 + nz * 53);
      const fineC = Math.sin((nx + ny) * 89 - nz * 43);
      const broad = Math.sin(nx * 11 - ny * 9 + nz * 7);
      const displacement = 1 + fineA * fineB * 0.012 + fineC * 0.006 + broad * 0.004;

      position.setXYZ(
        i,
        nx * width * displacement,
        ny * height * displacement,
        nz * depth * displacement
      );
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createSeam(points, radius) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(curve, 32, radius, 8, false);
    return new THREE.Mesh(geometry, seamMat);
  }

  const lower_baseGeom = createPlushSphereGeometry(0.68, 0.29, 0.56, 56, 28);
  const lower_base = new THREE.Mesh(lower_baseGeom, fleeceMat);
  lower_base.name = "lower_base";
  lower_base.position.set(0, 0.29, 0.01);
  root.add(lower_base);

  const front_bodyGeom = createPlushSphereGeometry(0.69, 0.34, 0.21, 56, 28);
  const front_body = new THREE.Mesh(front_bodyGeom, fleeceMat);
  front_body.name = "front_body";
  front_body.position.set(0, 0.38, 0.39);
  root.add(front_body);

  const rear_bodyGeom = createPlushSphereGeometry(0.64, 0.40, 0.20, 56, 28);
  const rear_body = new THREE.Mesh(rear_bodyGeom, fleeceMat);
  rear_body.name = "rear_body";
  rear_body.position.set(0, 0.50, -0.39);
  backrest_group.add(rear_body);

  const left_side_bodyGeom = createPlushSphereGeometry(0.23, 0.39, 0.48, 44, 24);
  const left_side_body = new THREE.Mesh(left_side_bodyGeom, fleeceMat);
  left_side_body.name = "left_side_body";
  left_side_body.position.set(-0.54, 0.45, 0.01);
  root.add(left_side_body);

  const right_side_bodyGeom = createPlushSphereGeometry(0.23, 0.39, 0.48, 44, 24);
  const right_side_body = new THREE.Mesh(right_side_bodyGeom, fleeceMat);
  right_side_body.name = "right_side_body";
  right_side_body.position.set(0.54, 0.45, 0.01);
  root.add(right_side_body);

  const seat_cushionGeom = createPlushSphereGeometry(0.45, 0.14, 0.34, 48, 24);
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, innerFleeceMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.position.set(0, 0.51, 0.13);
  seat_group.add(seat_cushion);

  const front_rimGeom = createPlushSphereGeometry(0.54, 0.15, 0.16, 56, 24);
  const front_rim = new THREE.Mesh(front_rimGeom, fleeceMat);
  front_rim.name = "front_rim";
  front_rim.position.set(0, 0.58, 0.38);
  seat_group.add(front_rim);

  const left_front_lipGeom = createPlushSphereGeometry(0.24, 0.15, 0.31, 44, 22);
  const left_front_lip = new THREE.Mesh(left_front_lipGeom, fleeceMat);
  left_front_lip.name = "left_front_lip";
  left_front_lip.position.set(-0.35, 0.60, 0.20);
  left_front_lip.rotation.y = -0.38;
  seat_group.add(left_front_lip);

  const right_front_lipGeom = createPlushSphereGeometry(0.24, 0.15, 0.31, 44, 22);
  const right_front_lip = new THREE.Mesh(right_front_lipGeom, fleeceMat);
  right_front_lip.name = "right_front_lip";
  right_front_lip.position.set(0.35, 0.60, 0.20);
  right_front_lip.rotation.y = 0.38;
  seat_group.add(right_front_lip);

  const left_inner_seat_padGeom = createPlushSphereGeometry(0.19, 0.10, 0.29, 40, 20);
  const left_inner_seat_pad = new THREE.Mesh(left_inner_seat_padGeom, innerFleeceMat);
  left_inner_seat_pad.name = "left_inner_seat_pad";
  left_inner_seat_pad.position.set(-0.22, 0.58, 0.10);
  left_inner_seat_pad.rotation.y = -0.22;
  seat_group.add(left_inner_seat_pad);

  const right_inner_seat_padGeom = createPlushSphereGeometry(0.19, 0.10, 0.29, 40, 20);
  const right_inner_seat_pad = new THREE.Mesh(right_inner_seat_padGeom, innerFleeceMat);
  right_inner_seat_pad.name = "right_inner_seat_pad";
  right_inner_seat_pad.position.set(0.22, 0.58, 0.10);
  right_inner_seat_pad.rotation.y = 0.22;
  seat_group.add(right_inner_seat_pad);

  const center_back_cushionGeom = createPlushSphereGeometry(0.29, 0.43, 0.17, 48, 26);
  const center_back_cushion = new THREE.Mesh(center_back_cushionGeom, innerFleeceMat);
  center_back_cushion.name = "center_back_cushion";
  center_back_cushion.position.set(0, 0.73, -0.27);
  center_back_cushion.rotation.x = -0.10;
  backrest_group.add(center_back_cushion);

  const left_back_cushionGeom = createPlushSphereGeometry(0.25, 0.45, 0.18, 48, 26);
  const left_back_cushion = new THREE.Mesh(left_back_cushionGeom, fleeceMat);
  left_back_cushion.name = "left_back_cushion";
  left_back_cushion.position.set(-0.34, 0.76, -0.25);
  left_back_cushion.rotation.set(-0.08, -0.28, 0.10);
  backrest_group.add(left_back_cushion);

  const right_back_cushionGeom = createPlushSphereGeometry(0.25, 0.45, 0.18, 48, 26);
  const right_back_cushion = new THREE.Mesh(right_back_cushionGeom, fleeceMat);
  right_back_cushion.name = "right_back_cushion";
  right_back_cushion.position.set(0.34, 0.76, -0.25);
  right_back_cushion.rotation.set(-0.08, 0.28, -0.10);
  backrest_group.add(right_back_cushion);

  const left_side_cushionGeom = createPlushSphereGeometry(0.18, 0.37, 0.34, 44, 24);
  const left_side_cushion = new THREE.Mesh(left_side_cushionGeom, fleeceMat);
  left_side_cushion.name = "left_side_cushion";
  left_side_cushion.position.set(-0.50, 0.65, -0.02);
  left_side_cushion.rotation.y = 0.22;
  backrest_group.add(left_side_cushion);

  const right_side_cushionGeom = createPlushSphereGeometry(0.18, 0.37, 0.34, 44, 24);
  const right_side_cushion = new THREE.Mesh(right_side_cushionGeom, fleeceMat);
  right_side_cushion.name = "right_side_cushion";
  right_side_cushion.position.set(0.50, 0.65, -0.02);
  right_side_cushion.rotation.y = -0.22;
  backrest_group.add(right_side_cushion);

  const left_outer_seam = createSeam([
    new THREE.Vector3(-0.61, 0.18, 0.31),
    new THREE.Vector3(-0.64, 0.39, 0.34),
    new THREE.Vector3(-0.59, 0.61, 0.28),
    new THREE.Vector3(-0.49, 0.73, 0.10)
  ], 0.006);
  left_outer_seam.name = "left_outer_seam";
  seam_group.add(left_outer_seam);

  const right_outer_seam = createSeam([
    new THREE.Vector3(0.61, 0.18, 0.31),
    new THREE.Vector3(0.64, 0.39, 0.34),
    new THREE.Vector3(0.59, 0.61, 0.28),
    new THREE.Vector3(0.49, 0.73, 0.10)
  ], 0.006);
  right_outer_seam.name = "right_outer_seam";
  seam_group.add(right_outer_seam);

  const left_inner_seam = createSeam([
    new THREE.Vector3(-0.18, 0.55, 0.31),
    new THREE.Vector3(-0.24, 0.64, 0.12),
    new THREE.Vector3(-0.27, 0.78, -0.08),
    new THREE.Vector3(-0.25, 0.94, -0.23)
  ], 0.0055);
  left_inner_seam.name = "left_inner_seam";
  seam_group.add(left_inner_seam);

  const right_inner_seam = createSeam([
    new THREE.Vector3(0.18, 0.55, 0.31),
    new THREE.Vector3(0.24, 0.64, 0.12),
    new THREE.Vector3(0.27, 0.78, -0.08),
    new THREE.Vector3(0.25, 0.94, -0.23)
  ], 0.0055);
  right_inner_seam.name = "right_inner_seam";
  seam_group.add(right_inner_seam);

  const front_lower_seam = createSeam([
    new THREE.Vector3(-0.55, 0.20, 0.47),
    new THREE.Vector3(-0.28, 0.15, 0.55),
    new THREE.Vector3(0, 0.14, 0.57),
    new THREE.Vector3(0.28, 0.15, 0.55),
    new THREE.Vector3(0.55, 0.20, 0.47)
  ], 0.006);
  front_lower_seam.name = "front_lower_seam";
  seam_group.add(front_lower_seam);

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
