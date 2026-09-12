// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "plush_armchair";

  const seatW = 1.04;
  const seatD = 0.84;
  const seatH = 0.50;
  const cushionH = 0.18;
  const backH = 0.72;
  const armW = 0.20;
  const armH = 0.75;
  const legH = 0.04;
  const moduleCount = 1;

  const fabricSize = 96;
  const fabricData = new Uint8Array(fabricSize * fabricSize * 4);
  for (let y = 0; y < fabricSize; y++) {
    for (let x = 0; x < fabricSize; x++) {
      const index = (y * fabricSize + x) * 4;
      const waveA = Math.sin(x * 1.73 + Math.sin(y * 0.61) * 2.4);
      const waveB = Math.cos(y * 1.91 + Math.sin(x * 0.47) * 2.1);
      const grain = Math.floor(128 + 34 * waveA + 26 * waveB);
      fabricData[index] = grain;
      fabricData[index + 1] = grain;
      fabricData[index + 2] = grain;
      fabricData[index + 3] = 255;
    }
  }

  const fabricTexture = new THREE.DataTexture(
    fabricData,
    fabricSize,
    fabricSize,
    THREE.RGBAFormat
  );
  fabricTexture.wrapS = THREE.RepeatWrapping;
  fabricTexture.wrapT = THREE.RepeatWrapping;
  fabricTexture.repeat.set(18, 18);
  fabricTexture.needsUpdate = true;

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0xe8e2d8,
    metalness: 0.0,
    roughness: 0.95,
    bumpMap: fabricTexture,
    bumpScale: 0.012,
    emissive: 0xe8e2d8,
    emissiveIntensity: 0.12
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xcfc5b8,
    metalness: 0.0,
    roughness: 0.95,
    emissive: 0xcfc5b8,
    emissiveIntensity: 0.06
  });

  const footMat = new THREE.MeshStandardMaterial({
    color: 0x242321,
    metalness: 0.0,
    roughness: 0.8
  });

  function createRoundedBoxGeometry(w, h, d, radius, bevel) {
    const b = Math.min(bevel, w * 0.2, h * 0.2, d * 0.2);
    const sw = Math.max(0.002, w - b * 2);
    const sh = Math.max(0.002, h - b * 2);
    const sd = Math.max(0.002, d - b * 2);
    const r = Math.max(
      0.001,
      Math.min(radius - b, sw * 0.5 - 0.001, sh * 0.5 - 0.001)
    );

    const shape = new THREE.Shape();
    shape.moveTo(-sw * 0.5 + r, -sh * 0.5);
    shape.lineTo(sw * 0.5 - r, -sh * 0.5);
    shape.quadraticCurveTo(sw * 0.5, -sh * 0.5, sw * 0.5, -sh * 0.5 + r);
    shape.lineTo(sw * 0.5, sh * 0.5 - r);
    shape.quadraticCurveTo(sw * 0.5, sh * 0.5, sw * 0.5 - r, sh * 0.5);
    shape.lineTo(-sw * 0.5 + r, sh * 0.5);
    shape.quadraticCurveTo(-sw * 0.5, sh * 0.5, -sw * 0.5, sh * 0.5 - r);
    shape.lineTo(-sw * 0.5, -sh * 0.5 + r);
    shape.quadraticCurveTo(-sw * 0.5, -sh * 0.5, -sw * 0.5 + r, -sh * 0.5);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: sd,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: b,
      bevelSize: b,
      bevelSegments: 5
    });
    geometry.translate(0, 0, -sd * 0.5);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createPipingGeometry(w, h, z, corner, radius) {
    const x = w * 0.5;
    const y = h * 0.5;
    const c = Math.min(corner, x * 0.8, y * 0.8);
    const points = [
      new THREE.Vector3(-x + c, -y, z),
      new THREE.Vector3(x - c, -y, z),
      new THREE.Vector3(x, -y + c, z),
      new THREE.Vector3(x, y - c, z),
      new THREE.Vector3(x - c, y, z),
      new THREE.Vector3(-x + c, y, z),
      new THREE.Vector3(-x, y - c, z),
      new THREE.Vector3(-x, -y + c, z)
    ];
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 64, radius, 8, true);
  }

  const feetGeom = new THREE.CylinderGeometry(0.035, 0.04, legH, 16);
  const feet = new THREE.InstancedMesh(feetGeom, footMat, 4);
  feet.name = "feet";
  const footPositions = [
    [-0.47, legH * 0.5, 0.38],
    [0.47, legH * 0.5, 0.38],
    [-0.47, legH * 0.5, -0.35],
    [0.47, legH * 0.5, -0.35]
  ];
  const footMatrix = new THREE.Matrix4();
  for (let i = 0; i < footPositions.length; i++) {
    const p = footPositions[i];
    footMatrix.makeTranslation(p[0], p[1], p[2]);
    feet.setMatrixAt(i, footMatrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const baseGeom = createRoundedBoxGeometry(1.36, 0.46, 1.06, 0.13, 0.05);
  const base = new THREE.Mesh(baseGeom, fabricMat);
  base.name = "base";
  base.position.set(0, legH + 0.23, 0.02);
  root.add(base);

  const front_base_seamGeom = new THREE.CylinderGeometry(0.005, 0.005, 0.34, 8);
  const front_base_seam = new THREE.Mesh(front_base_seamGeom, seamMat);
  front_base_seam.name = "front_base_seam";
  front_base_seam.position.set(-0.57, 0.27, 0.553);
  root.add(front_base_seam);

  const seat_cushionGeom = createRoundedBoxGeometry(
    seatW,
    cushionH,
    seatD,
    0.085,
    0.04
  );
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, fabricMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.position.set(0, seatH + cushionH * 0.5, 0.08);
  root.add(seat_cushion);

  const seat_pipingGeom = createPipingGeometry(
    seatW - 0.055,
    cushionH - 0.045,
    seatD * 0.5 + 0.006,
    0.055,
    0.006
  );
  const seat_piping = new THREE.Mesh(seat_pipingGeom, seamMat);
  seat_piping.name = "seat_piping";
  seat_piping.position.copy(seat_cushion.position);
  root.add(seat_piping);

  const armGeom = createRoundedBoxGeometry(armW, armH, 1.0, 0.085, 0.04);

  const left_arm = new THREE.Mesh(armGeom, fabricMat);
  left_arm.name = "left_arm";
  left_arm.position.set(-(seatW * 0.5 + armW * 0.5), legH + armH * 0.5, 0.03);
  root.add(left_arm);

  const right_arm = new THREE.Mesh(armGeom, fabricMat);
  right_arm.name = "right_arm";
  right_arm.position.set(seatW * 0.5 + armW * 0.5, legH + armH * 0.5, 0.03);
  root.add(right_arm);

  const arm_topGeom = new THREE.SphereGeometry(1, 24, 14);

  const left_arm_top = new THREE.Mesh(arm_topGeom, fabricMat);
  left_arm_top.name = "left_arm_top";
  left_arm_top.scale.set(armW * 0.47, 0.055, 0.43);
  left_arm_top.position.set(left_arm.position.x, legH + armH - 0.015, 0.03);
  root.add(left_arm_top);

  const right_arm_top = new THREE.Mesh(arm_topGeom, fabricMat);
  right_arm_top.name = "right_arm_top";
  right_arm_top.scale.set(armW * 0.47, 0.055, 0.43);
  right_arm_top.position.set(right_arm.position.x, legH + armH - 0.015, 0.03);
  root.add(right_arm_top);

  const arm_front_pipingGeom = new THREE.TorusGeometry(0.071, 0.0055, 8, 28);

  const left_arm_front_piping = new THREE.Mesh(arm_front_pipingGeom, seamMat);
  left_arm_front_piping.name = "left_arm_front_piping";
  left_arm_front_piping.scale.set(1, 1.25, 1);
  left_arm_front_piping.position.set(
    left_arm.position.x,
    legH + armH * 0.5,
    0.536
  );
  root.add(left_arm_front_piping);

  const right_arm_front_piping = new THREE.Mesh(arm_front_pipingGeom, seamMat);
  right_arm_front_piping.name = "right_arm_front_piping";
  right_arm_front_piping.scale.set(1, 1.25, 1);
  right_arm_front_piping.position.set(
    right_arm.position.x,
    legH + armH * 0.5,
    0.536
  );
  root.add(right_arm_front_piping);

  const back_group = new THREE.Group();
  back_group.name = "back_group";
  back_group.position.set(0, 0.95, -0.43);
  back_group.rotation.x = -0.08;
  root.add(back_group);

  const back_cushionGeom = createRoundedBoxGeometry(
    1.16,
    backH,
    0.20,
    0.11,
    0.045
  );
  const back_cushion = new THREE.Mesh(back_cushionGeom, fabricMat);
  back_cushion.name = "back_cushion";
  back_group.add(back_cushion);

  const back_pipingGeom = createPipingGeometry(
    1.10,
    backH - 0.055,
    0.108,
    0.085,
    0.006
  );
  const back_piping = new THREE.Mesh(back_pipingGeom, seamMat);
  back_piping.name = "back_piping";
  back_group.add(back_piping);

  const back_crownGeom = new THREE.SphereGeometry(1, 32, 18);
  const back_crown = new THREE.Mesh(back_crownGeom, fabricMat);
  back_crown.name = "back_crown";
  back_crown.scale.set(0.50, 0.30, 0.055);
  back_crown.position.set(0, 0, 0.095);
  back_group.add(back_crown);

  if (moduleCount === 1) {
    seat_cushion.visible = true;
  }

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