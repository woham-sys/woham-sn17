function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "blue_armchair";

  const upholstery_group = new THREE.Group();
  upholstery_group.name = "upholstery_group";
  root.add(upholstery_group);

  const seam_group = new THREE.Group();
  seam_group.name = "seam_group";
  root.add(seam_group);

  const support_group = new THREE.Group();
  support_group.name = "support_group";
  root.add(support_group);

  const fabricTextureSize = 64;
  const fabricTextureData = new Uint8Array(
    fabricTextureSize * fabricTextureSize * 4
  );
  for (let y = 0; y < fabricTextureSize; y++) {
    for (let x = 0; x < fabricTextureSize; x++) {
      const index = (y * fabricTextureSize + x) * 4;
      const warp = x % 4 === 0 ? -10 : x % 4 === 1 ? 4 : 0;
      const weft = y % 4 === 0 ? -8 : y % 4 === 1 ? 3 : 0;
      const crossing = (x + y) % 8 === 0 ? -3 : 0;
      const value = Math.max(210, Math.min(255, 244 + warp + weft + crossing));
      fabricTextureData[index] = value;
      fabricTextureData[index + 1] = value;
      fabricTextureData[index + 2] = value;
      fabricTextureData[index + 3] = 255;
    }
  }
  const fabricTexture = new THREE.DataTexture(
    fabricTextureData,
    fabricTextureSize,
    fabricTextureSize,
    THREE.RGBAFormat
  );
  fabricTexture.wrapS = THREE.RepeatWrapping;
  fabricTexture.wrapT = THREE.RepeatWrapping;
  fabricTexture.repeat.set(12, 12);
  fabricTexture.needsUpdate = true;

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x65a9dc,
    map: fabricTexture,
    bumpMap: fabricTexture,
    bumpScale: 0.008,
    roughness: 0.95,
    metalness: 0.0
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x4d8fbd,
    map: fabricTexture,
    bumpMap: fabricTexture,
    bumpScale: 0.004,
    roughness: 0.95,
    metalness: 0.0
  });

  const footMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    roughness: 0.8,
    metalness: 0.0
  });

  function createRoundedBoxGeometry(width, height, depth, radius) {
    const r = Math.min(radius, width * 0.5, height * 0.5);
    const x0 = -width * 0.5;
    const x1 = width * 0.5;
    const y0 = -height * 0.5;
    const y1 = height * 0.5;
    const shape = new THREE.Shape();

    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: r * 0.38,
      bevelSize: r * 0.38,
      bevelOffset: 0,
      bevelSegments: 4
    });
    geometry.translate(0, 0, -depth * 0.5);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createRoundedLoopXZ(width, depth, radius, y) {
    const points = [];
    const corners = [
      [width * 0.5 - radius, depth * 0.5 - radius, 0],
      [-width * 0.5 + radius, depth * 0.5 - radius, Math.PI * 0.5],
      [-width * 0.5 + radius, -depth * 0.5 + radius, Math.PI],
      [width * 0.5 - radius, -depth * 0.5 + radius, Math.PI * 1.5]
    ];

    for (let cornerIndex = 0; cornerIndex < corners.length; cornerIndex++) {
      const corner = corners[cornerIndex];
      for (let step = 0; step < 5; step++) {
        const angle = corner[2] + step / 4 * Math.PI * 0.5;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          y,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }
    return points;
  }

  function createRoundedLoopXY(width, height, radius, z) {
    const points = [];
    const corners = [
      [width * 0.5 - radius, height * 0.5 - radius, 0],
      [-width * 0.5 + radius, height * 0.5 - radius, Math.PI * 0.5],
      [-width * 0.5 + radius, -height * 0.5 + radius, Math.PI],
      [width * 0.5 - radius, -height * 0.5 + radius, Math.PI * 1.5]
    ];

    for (let cornerIndex = 0; cornerIndex < corners.length; cornerIndex++) {
      const corner = corners[cornerIndex];
      for (let step = 0; step < 5; step++) {
        const angle = corner[2] + step / 4 * Math.PI * 0.5;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          corner[1] + Math.sin(angle) * radius,
          z
        ));
      }
    }
    return points;
  }

  function createRoundedLoopYZ(depth, height, radius, x) {
    const points = [];
    const corners = [
      [depth * 0.5 - radius, height * 0.5 - radius, 0],
      [-depth * 0.5 + radius, height * 0.5 - radius, Math.PI * 0.5],
      [-depth * 0.5 + radius, -height * 0.5 + radius, Math.PI],
      [depth * 0.5 - radius, -height * 0.5 + radius, Math.PI * 1.5]
    ];

    for (let cornerIndex = 0; cornerIndex < corners.length; cornerIndex++) {
      const corner = corners[cornerIndex];
      for (let step = 0; step < 5; step++) {
        const angle = corner[2] + step / 4 * Math.PI * 0.5;
        points.push(new THREE.Vector3(
          x,
          corner[1] + Math.sin(angle) * radius,
          corner[0] + Math.cos(angle) * radius
        ));
      }
    }
    return points;
  }

  const base_frameGeom = createRoundedBoxGeometry(1.13, 0.27, 0.78, 0.055);
  const base_frame = new THREE.Mesh(base_frameGeom, fabricMat);
  base_frame.name = "base_frame";
  base_frame.position.set(0, 0.235, 0.015);
  upholstery_group.add(base_frame);

  const seat_cushionGeom = createRoundedBoxGeometry(1.04, 0.18, 0.78, 0.075);
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, fabricMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.position.set(0, 0.425, 0.07);
  upholstery_group.add(seat_cushion);

  const back_cushionGeom = createRoundedBoxGeometry(1.04, 0.58, 0.22, 0.13);
  const back_cushion = new THREE.Mesh(back_cushionGeom, fabricMat);
  back_cushion.name = "back_cushion";
  back_cushion.position.set(0, 0.75, -0.37);
  back_cushion.rotation.x = -0.07;
  upholstery_group.add(back_cushion);

  const armGeom = createRoundedBoxGeometry(0.25, 0.68, 0.92, 0.105);

  const left_arm = new THREE.Mesh(armGeom, fabricMat);
  left_arm.name = "left_arm";
  left_arm.position.set(-0.65, 0.46, 0.02);
  upholstery_group.add(left_arm);

  const right_arm = new THREE.Mesh(armGeom, fabricMat);
  right_arm.name = "right_arm";
  right_arm.position.set(0.65, 0.46, 0.02);
  upholstery_group.add(right_arm);

  const seat_edge_pipingCurve = new THREE.CatmullRomCurve3(
    createRoundedLoopXZ(1.015, 0.755, 0.075, 0.519),
    true,
    "centripetal"
  );
  const seat_edge_pipingGeom = new THREE.TubeGeometry(
    seat_edge_pipingCurve,
    72,
    0.008,
    8,
    true
  );
  const seat_edge_piping = new THREE.Mesh(seat_edge_pipingGeom, seamMat);
  seat_edge_piping.name = "seat_edge_piping";
  seat_edge_piping.position.z = 0.07;
  seam_group.add(seat_edge_piping);

  const seat_lower_pipingCurve = new THREE.CatmullRomCurve3(
    createRoundedLoopXZ(1.005, 0.745, 0.072, 0.334),
    true,
    "centripetal"
  );
  const seat_lower_pipingGeom = new THREE.TubeGeometry(
    seat_lower_pipingCurve,
    72,
    0.006,
    8,
    true
  );
  const seat_lower_piping = new THREE.Mesh(seat_lower_pipingGeom, seamMat);
  seat_lower_piping.name = "seat_lower_piping";
  seat_lower_piping.position.z = 0.07;
  seam_group.add(seat_lower_piping);

  const back_edge_pipingCurve = new THREE.CatmullRomCurve3(
    createRoundedLoopXY(1.005, 0.545, 0.115, -0.239),
    true,
    "centripetal"
  );
  const back_edge_pipingGeom = new THREE.TubeGeometry(
    back_edge_pipingCurve,
    72,
    0.007,
    8,
    true
  );
  const back_edge_piping = new THREE.Mesh(back_edge_pipingGeom, seamMat);
  back_edge_piping.name = "back_edge_piping";
  back_edge_piping.position.copy(back_cushion.position);
  back_edge_piping.rotation.copy(back_cushion.rotation);
  seam_group.add(back_edge_piping);

  const left_arm_inner_seamCurve = new THREE.CatmullRomCurve3(
    createRoundedLoopYZ(0.82, 0.57, 0.075, -0.519),
    true,
    "centripetal"
  );
  const left_arm_inner_seamGeom = new THREE.TubeGeometry(
    left_arm_inner_seamCurve,
    64,
    0.006,
    8,
    true
  );
  const left_arm_inner_seam = new THREE.Mesh(
    left_arm_inner_seamGeom,
    seamMat
  );
  left_arm_inner_seam.name = "left_arm_inner_seam";
  left_arm_inner_seam.position.y = 0.47;
  seam_group.add(left_arm_inner_seam);

  const right_arm_inner_seamCurve = new THREE.CatmullRomCurve3(
    createRoundedLoopYZ(0.82, 0.57, 0.075, 0.519),
    true,
    "centripetal"
  );
  const right_arm_inner_seamGeom = new THREE.TubeGeometry(
    right_arm_inner_seamCurve,
    64,
    0.006,
    8,
    true
  );
  const right_arm_inner_seam = new THREE.Mesh(
    right_arm_inner_seamGeom,
    seamMat
  );
  right_arm_inner_seam.name = "right_arm_inner_seam";
  right_arm_inner_seam.position.y = 0.47;
  seam_group.add(right_arm_inner_seam);

  const left_arm_front_seamCurve = new THREE.CatmullRomCurve3(
    createRoundedLoopXY(0.19, 0.57, 0.075, 0.506),
    true,
    "centripetal"
  );
  const left_arm_front_seamGeom = new THREE.TubeGeometry(
    left_arm_front_seamCurve,
    48,
    0.006,
    8,
    true
  );
  const left_arm_front_seam = new THREE.Mesh(
    left_arm_front_seamGeom,
    seamMat
  );
  left_arm_front_seam.name = "left_arm_front_seam";
  left_arm_front_seam.position.set(-0.65, 0.46, 0.02);
  seam_group.add(left_arm_front_seam);

  const right_arm_front_seamCurve = new THREE.CatmullRomCurve3(
    createRoundedLoopXY(0.19, 0.57, 0.075, 0.506),
    true,
    "centripetal"
  );
  const right_arm_front_seamGeom = new THREE.TubeGeometry(
    right_arm_front_seamCurve,
    48,
    0.006,
    8,
    true
  );
  const right_arm_front_seam = new THREE.Mesh(
    right_arm_front_seamGeom,
    seamMat
  );
  right_arm_front_seam.name = "right_arm_front_seam";
  right_arm_front_seam.position.set(0.65, 0.46, 0.02);
  seam_group.add(right_arm_front_seam);

  const feetGeom = new THREE.SphereGeometry(1, 20, 12);
  const feet = new THREE.InstancedMesh(feetGeom, footMat, 4);
  feet.name = "feet";

  const foot_positions = [
    [-0.53, 0.075, 0.34],
    [0.53, 0.075, 0.34],
    [-0.53, 0.075, -0.31],
    [0.53, 0.075, -0.31]
  ];
  const foot_transform = new THREE.Object3D();

  for (let i = 0; i < foot_positions.length; i++) {
    const position = foot_positions[i];
    foot_transform.position.set(position[0], position[1], position[2]);
    foot_transform.scale.set(0.085, 0.07, 0.085);
    foot_transform.updateMatrix();
    feet.setMatrixAt(i, foot_transform.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  support_group.add(feet);

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
