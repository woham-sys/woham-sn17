function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "velvet_armchair";

  const upholstery_group = new THREE.Group();
  upholstery_group.name = "upholstery_group";
  root.add(upholstery_group);

  const wooden_frame = new THREE.Group();
  wooden_frame.name = "wooden_frame";
  root.add(wooden_frame);

  const velvetMat = new THREE.MeshStandardMaterial({
    color: 0x07543d,
    metalness: 0.0,
    roughness: 0.95
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x03382b,
    metalness: 0.0,
    roughness: 0.98
  });

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xa86c2d,
    metalness: 0.0,
    roughness: 0.35
  });

  const screwMat = new THREE.MeshStandardMaterial({
    color: 0x8a7048,
    metalness: 0.45,
    roughness: 0.35
  });

  function createRoundedBoxGeometry(width, height, depth, radius, segments) {
    const r = Math.min(radius, width * 0.5, height * 0.5, depth * 0.5);
    const geometry = new THREE.BoxGeometry(
      width,
      height,
      depth,
      segments,
      segments,
      segments
    );
    const position = geometry.attributes.position;
    const normal = geometry.attributes.normal;
    const innerX = width * 0.5 - r;
    const innerY = height * 0.5 - r;
    const innerZ = depth * 0.5 - r;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      const coreX = Math.max(-innerX, Math.min(innerX, x));
      const coreY = Math.max(-innerY, Math.min(innerY, y));
      const coreZ = Math.max(-innerZ, Math.min(innerZ, z));
      const dx = x - coreX;
      const dy = y - coreY;
      const dz = z - coreZ;
      const length = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (length > 0.000001) {
        const nx = dx / length;
        const ny = dy / length;
        const nz = dz / length;
        position.setXYZ(
          i,
          coreX + nx * r,
          coreY + ny * r,
          coreZ + nz * r
        );
        normal.setXYZ(i, nx, ny, nz);
      }
    }

    position.needsUpdate = true;
    normal.needsUpdate = true;
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createBackGeometry() {
    const width = 1.0;
    const height = 0.86;
    const depth = 0.16;
    const segments = 10;
    const geometry = new THREE.BoxGeometry(
      width,
      height,
      depth,
      segments,
      segments,
      segments
    );
    const position = geometry.attributes.position;
    const normal = geometry.attributes.normal;
    const halfW = width * 0.5;
    const halfH = height * 0.5;
    const halfD = depth * 0.5;

    for (let i = 0; i < position.count; i++) {
      let x = position.getX(i);
      let y = position.getY(i);
      let z = position.getZ(i);
      const verticalT = (y + halfH) / height;
      const middleBulge = Math.sin(verticalT * Math.PI);
      const originalX = x;
      const taper = 0.92 + verticalT * 0.08;
      x *= taper;

      const nx = x / halfW;
      const ny = y / halfH;
      const centerWeight =
        Math.max(0, 1 - nx * nx) *
        Math.max(0, 1 - ny * ny);
      z += 0.018 * middleBulge * centerWeight;

      const dz = z - 0.012 * middleBulge;
      const gradientX =
        0.08 * originalX * (1 - centerWeight) / halfW;
      const gradientY =
        0.018 * Math.PI * Math.cos(verticalT * Math.PI) * centerWeight / halfH;
      const gradientZ = 1;
      const invLength = 1 / Math.sqrt(
        gradientX * gradientX +
        gradientY * gradientY +
        gradientZ * gradientZ
      );

      normal.setXYZ(
        i,
        gradientX * invLength,
        gradientY * invLength,
        gradientZ * invLength
      );
      position.setXYZ(i, x, y, z);
    }

    position.needsUpdate = true;
    normal.needsUpdate = true;
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createCurvedLegGeometry() {
    const ringSegments = 16;
    const points = [
      { x: 0.000, y: -0.620, z: 0.035, rx: 0.043, rz: 0.036 },
      { x: -0.006, y: -0.455, z: 0.025, rx: 0.045, rz: 0.038 },
      { x: -0.018, y: -0.270, z: 0.012, rx: 0.048, rz: 0.041 },
      { x: -0.034, y: -0.080, z: -0.004, rx: 0.052, rz: 0.045 },
      { x: -0.047, y: 0.105, z: -0.018, rx: 0.056, rz: 0.049 },
      { x: -0.055, y: 0.285, z: -0.028, rx: 0.060, rz: 0.053 },
      { x: -0.058, y: 0.430, z: -0.036, rx: 0.062, rz: 0.055 }
    ];
    const vertices = [];
    const indices = [];

    for (let j = 0; j < points.length; j++) {
      const previous = points[Math.max(0, j - 1)];
      const next = points[Math.min(points.length - 1, j + 1)];
      const tangent = new THREE.Vector3(
        next.x - previous.x,
        next.y - previous.y,
        next.z - previous.z
      ).normalize();
      const radialX = new THREE.Vector3().crossVectors(
        tangent,
        new THREE.Vector3(0, 0, 1)
      );

      if (radialX.lengthSq() < 0.000001) {
        radialX.set(1, 0, 0);
      } else {
        radialX.normalize();
      }

      const radialZ = new THREE.Vector3()
        .crossVectors(tangent, radialX)
        .normalize();
      const point = points[j];

      for (let k = 0; k < ringSegments; k++) {
        const angle = k / ringSegments * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        vertices.push(
          point.x + radialX.x * cos * point.rx + radialZ.x * sin * point.rz,
          point.y + radialX.y * cos * point.rx + radialZ.y * sin * point.rz,
          point.z + radialX.z * cos * point.rx + radialZ.z * sin * point.rz
        );
      }
    }

    for (let j = 0; j < points.length - 1; j++) {
      for (let k = 0; k < ringSegments; k++) {
        const nextK = (k + 1) % ringSegments;
        const a = j * ringSegments + k;
        const b = j * ringSegments + nextK;
        const c = (j + 1) * ringSegments + nextK;
        const d = (j + 1) * ringSegments + k;
        indices.push(a, b, d, b, c, d);
      }
    }

    const bottom = points[0];
    const top = points[points.length - 1];
    const bottomCenter = vertices.length / 3;
    vertices.push(bottom.x, bottom.y, bottom.z);
    const topCenter = vertices.length / 3;
    vertices.push(top.x, top.y, top.z);

    for (let k = 0; k < ringSegments; k++) {
      const nextK = (k + 1) % ringSegments;
      indices.push(bottomCenter, nextK, k);
      const topOffset = (points.length - 1) * ringSegments;
      indices.push(topCenter, topOffset + k, topOffset + nextK);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const seat_cushionGeom = createRoundedBoxGeometry(
    1.0,
    0.22,
    0.82,
    0.075,
    8
  );
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, velvetMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.position.set(0, 0.34, 0.03);
  upholstery_group.add(seat_cushion);

  const seat_front_seamGeom = new THREE.CylinderGeometry(
    0.007,
    0.007,
    0.86,
    10
  );
  const seat_front_seam = new THREE.Mesh(seat_front_seamGeom, seamMat);
  seat_front_seam.name = "seat_front_seam";
  seat_front_seam.rotation.z = Math.PI / 2;
  seat_front_seam.position.set(0, 0.43, 0.451);
  upholstery_group.add(seat_front_seam);

  const seat_side_seamGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.68,
    10
  );

  const left_seat_side_seam = new THREE.Mesh(
    seat_side_seamGeom,
    seamMat
  );
  left_seat_side_seam.name = "left_seat_side_seam";
  left_seat_side_seam.rotation.x = Math.PI / 2;
  left_seat_side_seam.position.set(-0.505, 0.43, 0.03);
  upholstery_group.add(left_seat_side_seam);

  const right_seat_side_seam = new THREE.Mesh(
    seat_side_seamGeom,
    seamMat
  );
  right_seat_side_seam.name = "right_seat_side_seam";
  right_seat_side_seam.rotation.x = Math.PI / 2;
  right_seat_side_seam.position.set(0.505, 0.43, 0.03);
  upholstery_group.add(right_seat_side_seam);

  const back_cushionGeom = createBackGeometry();
  const back_cushion = new THREE.Mesh(back_cushionGeom, velvetMat);
  back_cushion.name = "back_cushion";
  back_cushion.position.set(0, 0.98, -0.38);
  back_cushion.rotation.x = -0.12;
  upholstery_group.add(back_cushion);

  const back_side_seamGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.70,
    10
  );

  const left_back_side_seam = new THREE.Mesh(
    back_side_seamGeom,
    seamMat
  );
  left_back_side_seam.name = "left_back_side_seam";
  left_back_side_seam.position.set(-0.465, -0.01, 0.101);
  back_cushion.add(left_back_side_seam);

  const right_back_side_seam = new THREE.Mesh(
    back_side_seamGeom,
    seamMat
  );
  right_back_side_seam.name = "right_back_side_seam";
  right_back_side_seam.position.set(0.465, -0.01, 0.101);
  back_cushion.add(right_back_side_seam);

  const back_top_seamGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.82,
    10
  );
  const back_top_seam = new THREE.Mesh(back_top_seamGeom, seamMat);
  back_top_seam.name = "back_top_seam";
  back_top_seam.rotation.z = Math.PI / 2;
  back_top_seam.position.set(0, 0.414, 0.098);
  back_cushion.add(back_top_seam);

  const legGeom = createCurvedLegGeometry();

  const front_left_leg = new THREE.Mesh(legGeom, woodMat);
  front_left_leg.name = "front_left_leg";
  front_left_leg.position.set(-0.49, 0.02, 0.34);
  front_left_leg.scale.set(-1, 1, 1);
  wooden_frame.add(front_left_leg);

  const front_right_leg = new THREE.Mesh(legGeom, woodMat);
  front_right_leg.name = "front_right_leg";
  front_right_leg.position.set(0.49, 0.02, 0.34);
  wooden_frame.add(front_right_leg);

  const rear_left_leg = new THREE.Mesh(legGeom, woodMat);
  rear_left_leg.name = "rear_left_leg";
  rear_left_leg.position.set(-0.49, 0.02, -0.34);
  rear_left_leg.scale.set(-1, 1, -1);
  wooden_frame.add(rear_left_leg);

  const rear_right_leg = new THREE.Mesh(legGeom, woodMat);
  rear_right_leg.name = "rear_right_leg";
  rear_right_leg.position.set(0.49, 0.02, -0.34);
  rear_right_leg.scale.set(1, 1, -1);
  wooden_frame.add(rear_right_leg);

  const armrestCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.755, -0.36),
    new THREE.Vector3(0, 0.748, -0.12),
    new THREE.Vector3(0, 0.735, 0.18),
    new THREE.Vector3(0, 0.720, 0.43)
  ], false, "centripetal");

  const armrestGeom = new THREE.TubeGeometry(
    armrestCurve,
    32,
    0.058,
    14,
    false
  );

  const left_armrest = new THREE.Mesh(armrestGeom, woodMat);
  left_armrest.name = "left_armrest";
  left_armrest.position.x = -0.57;
  left_armrest.scale.x = 1.35;
  wooden_frame.add(left_armrest);

  const right_armrest = new THREE.Mesh(armrestGeom, woodMat);
  right_armrest.name = "right_armrest";
  right_armrest.position.x = 0.57;
  right_armrest.scale.x = 1.35;
  wooden_frame.add(right_armrest);

  const armrest_capGeom = new THREE.SphereGeometry(0.06, 18, 12);

  const left_armrest_front_cap = new THREE.Mesh(
    armrest_capGeom,
    woodMat
  );
  left_armrest_front_cap.name = "left_armrest_front_cap";
  left_armrest_front_cap.position.set(-0.57, 0.720, 0.43);
  left_armrest_front_cap.scale.set(1.35, 1, 1);
  wooden_frame.add(left_armrest_front_cap);

  const right_armrest_front_cap = new THREE.Mesh(
    armrest_capGeom,
    woodMat
  );
  right_armrest_front_cap.name = "right_armrest_front_cap";
  right_armrest_front_cap.position.set(0.57, 0.720, 0.43);
  right_armrest_front_cap.scale.set(1.35, 1, 1);
  wooden_frame.add(right_armrest_front_cap);

  const left_armrest_rear_cap = new THREE.Mesh(
    armrest_capGeom,
    woodMat
  );
  left_armrest_rear_cap.name = "left_armrest_rear_cap";
  left_armrest_rear_cap.position.set(-0.57, 0.755, -0.36);
  left_armrest_rear_cap.scale.set(1.35, 1, 1);
  wooden_frame.add(left_armrest_rear_cap);

  const right_armrest_rear_cap = new THREE.Mesh(
    armrest_capGeom,
    woodMat
  );
  right_armrest_rear_cap.name = "right_armrest_rear_cap";
  right_armrest_rear_cap.position.set(0.57, 0.755, -0.36);
  right_armrest_rear_cap.scale.set(1.35, 1, 1);
  wooden_frame.add(right_armrest_rear_cap);

  const front_joint_screwGeom = new THREE.CylinderGeometry(
    0.017,
    0.017,
    0.012,
    16
  );

  const front_left_joint_screw = new THREE.Mesh(
    front_joint_screwGeom,
    screwMat
  );
  front_left_joint_screw.name = "front_left_joint_screw";
  front_left_joint_screw.rotation.z = Math.PI / 2;
  front_left_joint_screw.position.set(-0.562, 0.15, 0.327);
  wooden_frame.add(front_left_joint_screw);

  const front_right_joint_screw = new THREE.Mesh(
    front_joint_screwGeom,
    screwMat
  );
  front_right_joint_screw.name = "front_right_joint_screw";
  front_right_joint_screw.rotation.z = Math.PI / 2;
  front_right_joint_screw.position.set(0.562, 0.15, 0.327);
  wooden_frame.add(front_right_joint_screw);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 0.98 / maxDim;
      object.scale.setScalar(scale);
    }
  }

  fitToUnitCube(root);
  return root;
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
