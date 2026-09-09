function __sn17_user(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({ color: 0xbfc0bd, metalness: 0.35, roughness: 0.45 });
  const brightSilverMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d4, metalness: 0.25, roughness: 0.35 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x55585a, metalness: 0.5, roughness: 0.35 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.15, roughness: 0.55 });
  const ledMat = new THREE.MeshStandardMaterial({ color: 0xeaf7ff, emissive: 0x6688ff, emissiveIntensity: 0.8, metalness: 0.0, roughness: 0.25 });
  const ledGlowMat = new THREE.MeshStandardMaterial({ color: 0x8aaaff, emissive: 0x6688ff, emissiveIntensity: 0.45, metalness: 0.0, roughness: 0.35, transparent: true, opacity: 0.45 });
  const labelMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.1, roughness: 0.6 });

  const bodyProfile = [
    new THREE.Vector2(0.00, -0.72),
    new THREE.Vector2(0.10, -0.72),
    new THREE.Vector2(0.16, -0.68),
    new THREE.Vector2(0.185, -0.58),
    new THREE.Vector2(0.185, -0.08),
    new THREE.Vector2(0.195, 0.18),
    new THREE.Vector2(0.245, 0.42),
    new THREE.Vector2(0.315, 0.62),
    new THREE.Vector2(0.310, 0.78),
    new THREE.Vector2(0.240, 0.90),
    new THREE.Vector2(0.080, 0.985),
    new THREE.Vector2(0.00, 0.99)
  ];
  const mainBodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const mainBody = new THREE.Mesh(mainBodyGeom, silverMat);
  mainBody.position.set(-0.035, 0, 0);
  root.add(mainBody);

  const bottomCapGeom = new THREE.SphereGeometry(0.18, 40, 20);
  const bottomCap = new THREE.Mesh(bottomCapGeom, brightSilverMat);
  bottomCap.scale.set(1.0, 0.42, 1.0);
  bottomCap.position.set(-0.035, -0.70, 0);
  root.add(bottomCap);

  const bottomSeamGeom = new THREE.TorusGeometry(0.178, 0.006, 8, 48);
  const bottomSeam = new THREE.Mesh(bottomSeamGeom, darkMetalMat);
  bottomSeam.rotation.x = Math.PI / 2;
  bottomSeam.position.set(-0.035, -0.625, 0);
  root.add(bottomSeam);

  const frontPanelGeom = new THREE.CylinderGeometry(0.285, 0.285, 0.035, 64);
  const frontPanel = new THREE.Mesh(frontPanelGeom, brightSilverMat);
  frontPanel.rotation.x = Math.PI / 2;
  frontPanel.position.set(-0.095, 0.665, 0.285);
  root.add(frontPanel);

  const frontPanelOutlineGeom = new THREE.TorusGeometry(0.282, 0.006, 8, 64);
  const frontPanelOutline = new THREE.Mesh(frontPanelOutlineGeom, darkMetalMat);
  frontPanelOutline.position.set(-0.095, 0.665, 0.307);
  root.add(frontPanelOutline);

  const frontKnobBaseGeom = new THREE.CylinderGeometry(0.132, 0.132, 0.035, 48);
  const frontKnobBase = new THREE.Mesh(frontKnobBaseGeom, darkMetalMat);
  frontKnobBase.rotation.x = Math.PI / 2;
  frontKnobBase.position.set(-0.095, 0.665, 0.325);
  root.add(frontKnobBase);

  const frontKnobGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.045, 48);
  const frontKnob = new THREE.Mesh(frontKnobGeom, silverMat);
  frontKnob.rotation.x = Math.PI / 2;
  frontKnob.position.set(-0.095, 0.665, 0.355);
  root.add(frontKnob);

  const frontKnobRingGeom = new THREE.TorusGeometry(0.118, 0.008, 10, 48);
  const frontKnobRing = new THREE.Mesh(frontKnobRingGeom, darkMetalMat);
  frontKnobRing.position.set(-0.095, 0.665, 0.382);
  root.add(frontKnobRing);

  const sidePanelGeom = new THREE.CylinderGeometry(0.255, 0.255, 0.045, 64);
  const sidePanel = new THREE.Mesh(sidePanelGeom, brightSilverMat);
  sidePanel.rotation.z = -Math.PI / 2;
  sidePanel.position.set(0.285, 0.675, 0.035);
  root.add(sidePanel);

  const sidePanelOutlineGeom = new THREE.TorusGeometry(0.252, 0.006, 8, 64);
  const sidePanelOutline = new THREE.Mesh(sidePanelOutlineGeom, darkMetalMat);
  sidePanelOutline.rotation.y = Math.PI / 2;
  sidePanelOutline.position.set(0.312, 0.675, 0.035);
  root.add(sidePanelOutline);

  const sideKnobBaseGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.04, 48);
  const sideKnobBase = new THREE.Mesh(sideKnobBaseGeom, darkMetalMat);
  sideKnobBase.rotation.z = -Math.PI / 2;
  sideKnobBase.position.set(0.325, 0.675, 0.035);
  root.add(sideKnobBase);

  const sideKnobGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.05, 48);
  const sideKnob = new THREE.Mesh(sideKnobGeom, silverMat);
  sideKnob.rotation.z = -Math.PI / 2;
  sideKnob.position.set(0.365, 0.675, 0.035);
  root.add(sideKnob);

  const sideKnobRingGeom = new THREE.TorusGeometry(0.112, 0.008, 10, 48);
  const sideKnobRing = new THREE.Mesh(sideKnobRingGeom, darkMetalMat);
  sideKnobRing.rotation.y = Math.PI / 2;
  sideKnobRing.position.set(0.395, 0.675, 0.035);
  root.add(sideKnobRing);

  const ledGeom = new THREE.CircleGeometry(0.022, 20);
  const ledGlowGeom = new THREE.CircleGeometry(0.033, 20);
  const frontLedCount = 14;
  const sideLedCount = 14;

  const frontLedGlows = new THREE.InstancedMesh(ledGlowGeom, ledGlowMat, frontLedCount);
  const frontLedArray = new THREE.InstancedMesh(ledGeom, ledMat, frontLedCount);
  const sideLedGlows = new THREE.InstancedMesh(ledGlowGeom, ledGlowMat, sideLedCount);
  const sideLedArray = new THREE.InstancedMesh(ledGeom, ledMat, sideLedCount);

  const dummy = new THREE.Object3D();
  for (let i = 0; i < frontLedCount; i++) {
    const a = (i / frontLedCount) * Math.PI * 2 + Math.PI / 14;
    const x = -0.095 + Math.cos(a) * 0.215;
    const y = 0.665 + Math.sin(a) * 0.215;

    dummy.position.set(x, y, 0.311);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    frontLedGlows.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x, y, 0.316);
    dummy.updateMatrix();
    frontLedArray.setMatrixAt(i, dummy.matrix);
  }
  frontLedGlows.instanceMatrix.needsUpdate = true;
  frontLedArray.instanceMatrix.needsUpdate = true;
  root.add(frontLedGlows, frontLedArray);

  for (let i = 0; i < sideLedCount; i++) {
    const a = (i / sideLedCount) * Math.PI * 2 + Math.PI / 14;
    const yOffset = Math.sin(a) * 0.195;
    const zOffset = Math.cos(a) * 0.195;

    dummy.position.set(0.317, 0.675 + yOffset, 0.035 + zOffset);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.updateMatrix();
    sideLedGlows.setMatrixAt(i, dummy.matrix);

    dummy.position.set(0.322, 0.675 + yOffset, 0.035 + zOffset);
    dummy.updateMatrix();
    sideLedArray.setMatrixAt(i, dummy.matrix);
  }
  sideLedGlows.instanceMatrix.needsUpdate = true;
  sideLedArray.instanceMatrix.needsUpdate = true;
  root.add(sideLedGlows, sideLedArray);

  const sensorBezelGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 32);
  const sensorBezel = new THREE.Mesh(sensorBezelGeom, brightSilverMat);
  sensorBezel.rotation.x = Math.PI / 2;
  sensorBezel.position.set(-0.035, 0.235, 0.198);
  root.add(sensorBezel);

  const sensorLensGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.03, 32);
  const sensorLens = new THREE.Mesh(sensorLensGeom, blackMat);
  sensorLens.rotation.x = Math.PI / 2;
  sensorLens.position.set(-0.035, 0.235, 0.218);
  root.add(sensorLens);

  const sensorHighlightGeom = new THREE.CircleGeometry(0.008, 16);
  const sensorHighlight = new THREE.Mesh(sensorHighlightGeom, new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.1, roughness: 0.35 }));
  sensorHighlight.position.set(-0.045, 0.247, 0.236);
  root.add(sensorHighlight);

  const smallIndicatorGeom = new THREE.CircleGeometry(0.014, 16);
  const smallIndicator = new THREE.Mesh(smallIndicatorGeom, labelMat);
  smallIndicator.position.set(-0.255, 0.765, 0.318);
  root.add(smallIndicator);

  const frontTickMarks = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const tickGeom = new THREE.BoxGeometry(0.006, 0.022, 0.006);
    const tick = new THREE.Mesh(tickGeom, labelMat);
    tick.position.set(-0.175 + i * 0.027, 0.835 + (i % 2) * 0.006, 0.322);
    tick.rotation.z = -0.25 + i * 0.08;
    frontTickMarks.add(tick);
  }
  root.add(frontTickMarks);

  const brandMarkGeom = new THREE.BoxGeometry(0.006, 0.025, 0.006);
  const brandMark = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const mark = new THREE.Mesh(brandMarkGeom, labelMat);
    mark.position.set(-0.025 + i * 0.012, 0.535, 0.324);
    mark.rotation.z = -0.55;
    brandMark.add(mark);
  }
  root.add(brandMark);

  const topSeamCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.285, 0.875, 0.185),
    new THREE.Vector3(-0.155, 0.970, 0.165),
    new THREE.Vector3(0.035, 0.985, 0.145),
    new THREE.Vector3(0.215, 0.900, 0.135)
  ]);
  const topSeamGeom = new THREE.TubeGeometry(topSeamCurve, 24, 0.0045, 8, false);
  const topSeam = new THREE.Mesh(topSeamGeom, darkMetalMat);
  root.add(topSeam);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 0.98 / maxDim;
      object.scale.setScalar(scale);
    }
  }
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
