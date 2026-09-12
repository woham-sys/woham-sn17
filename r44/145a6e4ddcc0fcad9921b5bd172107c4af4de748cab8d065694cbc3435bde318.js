// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
 root.name = "silver_airship";

  const envelopeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const gondolaMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x747b7e,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x171a1b,
    metalness: 0.0,
    roughness: 0.8,
  });

  const envelopeRx = 0.68;
  const envelopeRy = 0.58;
  const envelopeRz = 1.55;
  const envelopeY = 0.45;

  const envelopeGeom = new THREE.SphereGeometry(1, 64, 32);
  const envelope = new THREE.Mesh(envelopeGeom, envelopeMat);
  envelope.name = "envelope";
  envelope.scale.set(envelopeRx, envelopeRy, envelopeRz);
  envelope.position.y = envelopeY;
  root.add(envelope);

  const envelope_seams = new THREE.Group();
  envelope_seams.name = "envelope_seams";
  root.add(envelope_seams);

  function envelopeSurfacePoint(z, phi, offset) {
    const q = z / envelopeRz;
    const radial = Math.sqrt(Math.max(0, 1 - q * q));
    return new THREE.Vector3(
      (envelopeRx + offset) * radial * Math.cos(phi),
      envelopeY + (envelopeRy + offset) * radial * Math.sin(phi),
      z
    );
  }

  const envelopeRingZ = [-1.22, -0.86, -0.48, -0.08, 0.34, 0.76, 1.15];
  for (let i = 0; i < envelopeRingZ.length; i++) {
    const ringPoints = [];
    for (let j = 0; j < 64; j++) {
      ringPoints.push(envelopeSurfacePoint(envelopeRingZ[i], j / 64 * Math.PI * 2, 0.006));
    }
    const envelope_ring_seamGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(ringPoints, true, "centripetal"),
      96,
      0.0035,
      5,
      true
    );
    const envelope_ring_seam = new THREE.Mesh(envelope_ring_seamGeom, seamMat);
    envelope_ring_seam.name = "envelope_ring_seam_" + i;
    envelope_seams.add(envelope_ring_seam);
  }

  const envelopeLongiPhi = [0.18, 0.78, 1.42, 2.12, 2.82, 3.55];
  for (let i = 0; i < envelopeLongiPhi.length; i++) {
    const longiPoints = [];
    for (let j = 0; j <= 40; j++) {
      const z = -1.47 + j / 40 * 2.94;
      longiPoints.push(envelopeSurfacePoint(z, envelopeLongiPhi[i], 0.006));
    }
    const envelope_longitudinal_seamGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(longiPoints, false, "centripetal"),
      64,
      0.0032,
      5,
      false
    );
    const envelope_longitudinal_seam = new THREE.Mesh(envelope_longitudinal_seamGeom, seamMat);
    envelope_longitudinal_seam.name = "envelope_longitudinal_seam_" + i;
    envelope_seams.add(envelope_longitudinal_seam);
  }

  const tail_probeGeom = new THREE.ConeGeometry(0.055, 0.16, 20);
  const tail_probe = new THREE.Mesh(tail_probeGeom, brushedMat);
  tail_probe.name = "tail_probe";
  tail_probe.rotation.x = -Math.PI / 2;
  tail_probe.position.set(0, envelopeY, -1.59);
  root.add(tail_probe);

  const tail_probe_baseGeom = new THREE.CylinderGeometry(0.065, 0.045, 0.055, 20);
  const tail_probe_base = new THREE.Mesh(tail_probe_baseGeom, envelopeMat);
  tail_probe_base.name = "tail_probe_base";
  tail_probe_base.rotation.x = Math.PI / 2;
  tail_probe_base.position.set(0, envelopeY, -1.505);
  root.add(tail_probe_base);

  const sideSensorZ = -0.96;
  const sideSensorX = envelopeRx * Math.sqrt(
    Math.max(0, 1 - sideSensorZ * sideSensorZ / (envelopeRz * envelopeRz))
  );

  const side_sensor_baseGeom = new THREE.SphereGeometry(1, 24, 12);
  const side_sensor_base = new THREE.Mesh(side_sensor_baseGeom, brushedMat);
  side_sensor_base.name = "side_sensor_base";
  side_sensor_base.scale.set(0.025, 0.075, 0.13);
  side_sensor_base.position.set(sideSensorX + 0.006, envelopeY + 0.02, sideSensorZ);
  root.add(side_sensor_base);

  const side_sensorGeom = new THREE.ConeGeometry(0.075, 0.22, 24);
  const side_sensor = new THREE.Mesh(side_sensorGeom, envelopeMat);
  side_sensor.name = "side_sensor";
  side_sensor.rotation.z = -Math.PI / 2;
  side_sensor.position.set(sideSensorX + 0.105, envelopeY + 0.02, sideSensorZ);
  root.add(side_sensor);

  const gondolaRx = 0.34;
  const gondolaRy = 0.25;
  const gondolaRz = 0.92;
  const gondolaY = -0.38;
  const gondolaZ = 0.12;

  const gondolaGeom = new THREE.SphereGeometry(1, 48, 24);
  const gondola = new THREE.Mesh(gondolaGeom, gondolaMat);
  gondola.name = "gondola";
  gondola.scale.set(gondolaRx, gondolaRy, gondolaRz);
  gondola.position.set(0, gondolaY, gondolaZ);
  root.add(gondola);

  const gondolaRingZ = [-0.54, -0.22, 0.12, 0.46, 0.78];
  for (let i = 0; i < gondolaRingZ.length; i++) {
    const z = gondolaRingZ[i];
    const dz = z - gondolaZ;
    const q = dz / gondolaRz;
    const radial = Math.sqrt(Math.max(0, 1 - q * q));
    const ringPoints = [];
    for (let j = 0; j < 48; j++) {
      const phi = j / 48 * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(
        (gondolaRx + 0.004) * radial * Math.cos(phi),
        gondolaY + (gondolaRy + 0.004) * radial * Math.sin(phi),
        z
      ));
    }
    const gondola_ring_seamGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(ringPoints, true, "centripetal"),
      72,
      0.003,
      5,
      true
    );
    const gondola_ring_seam = new THREE.Mesh(gondola_ring_seamGeom, seamMat);
    gondola_ring_seam.name = "gondola_ring_seam_" + i;
    root.add(gondola_ring_seam);
  }

  const front_intakeGeom = new THREE.CircleGeometry(0.11, 32);
  const front_intake = new THREE.Mesh(front_intakeGeom, darkMat);
  front_intake.name = "front_intake";
  front_intake.scale.y = 1.25;
  front_intake.position.set(0, gondolaY + 0.015, gondolaZ + gondolaRz + 0.008);
  root.add(front_intake);

  const front_intake_rimGeom = new THREE.TorusGeometry(0.11, 0.014, 10, 32);
  const front_intake_rim = new THREE.Mesh(front_intake_rimGeom, brushedMat);
  front_intake_rim.name = "front_intake_rim";
  front_intake_rim.scale.y = 1.25;
  front_intake_rim.position.set(0, gondolaY + 0.015, gondolaZ + gondolaRz + 0.013);
  root.add(front_intake_rim);

  const intake_dividerGeom = new THREE.BoxGeometry(0.018, 0.245, 0.012);
  const intake_divider = new THREE.Mesh(intake_dividerGeom, brushedMat);
  intake_divider.name = "intake_divider";
  intake_divider.position.set(0, gondolaY + 0.015, gondolaZ + gondolaRz + 0.021);
  root.add(intake_divider);

  const accessPanelZ = -0.08;
  const accessPanelDz = accessPanelZ - gondolaZ;
  const accessPanelQ = accessPanelDz / gondolaRz;
  const accessPanelY = gondolaY - gondolaRy * Math.sqrt(
    Math.max(0, 1 - accessPanelQ * accessPanelQ)
  ) - 0.006;

  const access_panelGeom = new THREE.BoxGeometry(0.18, 0.008, 0.13);
  const access_panel = new THREE.Mesh(access_panelGeom, brushedMat);
  access_panel.name = "access_panel";
  access_panel.position.set(0, accessPanelY, accessPanelZ);
  root.add(access_panel);

  const access_panel_topGeom = new THREE.BoxGeometry(0.19, 0.005, 0.008);
  const access_panel_top = new THREE.Mesh(access_panel_topGeom, seamMat);
  access_panel_top.name = "access_panel_top";
  access_panel_top.position.set(0, accessPanelY - 0.007, accessPanelZ + 0.065);
  root.add(access_panel_top);

  const access_panel_bottom = new THREE.Mesh(access_panel_topGeom, seamMat);
  access_panel_bottom.name = "access_panel_bottom";
  access_panel_bottom.position.set(0, accessPanelY - 0.007, accessPanelZ - 0.065);
  root.add(access_panel_bottom);

  const access_panel_sideGeom = new THREE.BoxGeometry(0.008, 0.005, 0.13);
  const access_panel_left = new THREE.Mesh(access_panel_sideGeom, seamMat);
  access_panel_left.name = "access_panel_left";
  access_panel_left.position.set(-0.095, accessPanelY - 0.007, accessPanelZ);
  root.add(access_panel_left);

  const access_panel_right = new THREE.Mesh(access_panel_sideGeom, seamMat);
  access_panel_right.name = "access_panel_right";
  access_panel_right.position.set(0.095, accessPanelY - 0.007, accessPanelZ);
  root.add(access_panel_right);

  const supportGeom = new THREE.CylinderGeometry(0.065, 0.085, 0.22, 20);
  const support_collarsGeom = new THREE.CylinderGeometry(0.105, 0.09, 0.045, 20);

  function createSupport(name, x, z) {
    const support = new THREE.Group();
    support.name = name;

    const support_strut = new THREE.Mesh(supportGeom, gondolaMat);
    support_strut.name = name + "_strut";
    support.add(support_strut);

    const lower_collar = new THREE.Mesh(support_collarsGeom, brushedMat);
    lower_collar.name = name + "_lower_collar";
    lower_collar.position.y = -0.105;
    support.add(lower_collar);

    const upper_collar = new THREE.Mesh(support_collarsGeom, brushedMat);
    upper_collar.name = name + "_upper_collar";
    upper_collar.position.y = 0.105;
    support.add(upper_collar);

    support.position.set(x, -0.05, z);
    root.add(support);
    return support;
  }

  const left_support = createSupport("left_support", -0.17, -0.28);
  const right_support = createSupport("right_support", 0.17, -0.28);

  const horizontalTailShape = new THREE.Shape();
  horizontalTailShape.moveTo(-0.12, 0.0);
  horizontalTailShape.lineTo(0.12, 0.0);
  horizontalTailShape.lineTo(0.68, 0.17);
  horizontalTailShape.lineTo(0.72, 0.08);
  horizontalTailShape.lineTo(0.18, -0.12);
  horizontalTailShape.lineTo(-0.18, -0.12);
  horizontalTailShape.lineTo(-0.72, 0.08);
  horizontalTailShape.lineTo(-0.68, 0.17);
  horizontalTailShape.closePath();

  const horizontal_tailplanesGeom = new THREE.ExtrudeGeometry(horizontalTailShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  horizontal_tailplanesGeom.translate(0, 0, -0.0175);
  horizontal_tailplanesGeom.rotateX(Math.PI / 2);

  const horizontal_tailplanes = new THREE.InstancedMesh(
    horizontal_tailplanesGeom,
    gondolaMat,
    2
  );
  horizontal_tailplanes.name = "horizontal_tailplanes";
  const tailplaneMatrix = new THREE.Matrix4();
  tailplaneMatrix.makeTranslation(0, -0.31, -0.78);
  horizontal_tailplanes.setMatrixAt(0, tailplaneMatrix);
  tailplaneMatrix.makeTranslation(0, -0.31, 0.78);
  horizontal_tailplanes.setMatrixAt(1, tailplaneMatrix);
  horizontal_tailplanes.instanceMatrix.needsUpdate = true;
  root.add(horizontal_tailplanes);

  const verticalTailShape = new THREE.Shape();
  verticalTailShape.moveTo(-0.58, 0.0);
  verticalTailShape.lineTo(0.52, 0.0);
  verticalTailShape.lineTo(0.34, 0.48);
  verticalTailShape.lineTo(0.16, 0.54);
  verticalTailShape.lineTo(-0.18, 0.18);
  verticalTailShape.lineTo(-0.58, 0.08);
  verticalTailShape.closePath();

  const vertical_tail_finsGeom = new THREE.ExtrudeGeometry(verticalTailShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  vertical_tail_finsGeom.translate(0, 0, -0.0225);
  vertical_tail_finsGeom.rotateY(-Math.PI / 2);

  const vertical_tail_fins = new THREE.InstancedMesh(
    vertical_tail_finsGeom,
    gondolaMat,
    2
  );
  vertical_tail_fins.name = "vertical_tail_fins";
  const verticalFinMatrix = new THREE.Matrix4();
  verticalFinMatrix.makeTranslation(-0.13, -0.27, 0);
  vertical_tail_fins.setMatrixAt(0, verticalFinMatrix);
  verticalFinMatrix.makeTranslation(0.13, -0.27, 0);
  vertical_tail_fins.setMatrixAt(1, verticalFinMatrix);
  vertical_tail_fins.instanceMatrix.needsUpdate = true;
  root.add(vertical_tail_fins);

  const ventral_keelGeom = new THREE.BoxGeometry(0.08, 0.035, 0.72);
  const ventral_keel = new THREE.Mesh(ventral_keelGeom, brushedMat);
  ventral_keel.name = "ventral_keel";
  ventral_keel.position.set(0, -0.625, 0.12);
  root.add(ventral_keel);

  const landing_skidsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.72, 10);
  const landing_skids = new THREE.InstancedMesh(landing_skidsGeom, brushedMat, 2);
  landing_skids.name = "landing_skids";
  const skidQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  const skidScale = new THREE.Vector3(1, 1, 1);
  const skidMatrix = new THREE.Matrix4();
  skidMatrix.compose(
    new THREE.Vector3(-0.16, -0.65, 0.12),
    skidQuaternion,
    skidScale
  );
  landing_skids.setMatrixAt(0, skidMatrix);
  skidMatrix.compose(
    new THREE.Vector3(0.16, -0.65, 0.12),
    skidQuaternion,
    skidScale
  );
  landing_skids.setMatrixAt(1, skidMatrix);
  landing_skids.instanceMatrix.needsUpdate = true;
  root.add(landing_skids);

  const landing_strutsGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.07, 10);
  const landing_struts = new THREE.InstancedMesh(landing_strutsGeom, brushedMat, 4);
  landing_struts.name = "landing_struts";
  const landingStrutPositions = [
    [-0.16, -0.615, -0.18],
    [0.16, -0.615, -0.18],
    [-0.16, -0.615, 0.42],
    [0.16, -0.615, 0.42],
  ];
  for (let i = 0; i < landingStrutPositions.length; i++) {
    const p = landingStrutPositions[i];
    skidMatrix.makeTranslation(p[0], p[1], p[2]);
    landing_struts.setMatrixAt(i, skidMatrix);
  }
  landing_struts.instanceMatrix.needsUpdate = true;
  root.add(landing_struts);

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