// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const umbrella = new THREE.Group();
  root.add(umbrella);

  const canopyMat = new THREE.MeshStandardMaterial({
    color: 0x9edbc5,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
  });
  const canopy_altMat = new THREE.MeshStandardMaterial({
    color: 0xa9e2ca,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
  });
  const canopy_ribMat = new THREE.MeshStandardMaterial({
    color: 0x73b9a1,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.9,
  });
  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x83c9a8,
    metalness: 0.0,
    roughness: 0.3,
  });
  const handle_darkMat = new THREE.MeshStandardMaterial({
    color: 0x5fa98a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const top_capMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const canopyRadius = 1.65;
  const canopyTopY = 1.25;
  const canopyDrop = 0.62;
  const panelCount = 8;
  const panelAngle = Math.PI * 2 / panelCount;

  function canopyHeight(radius) {
    const t = radius / canopyRadius;
    return canopyTopY - canopyDrop * (0.68 * t + 0.32 * t * t);
  }

  function canopyPoint(angle, radius, offset) {
    const t = radius / canopyRadius;
    const edgeFactor = Math.pow(t, 5);
    const scallop = 1 - 0.075 * Math.pow(Math.sin(angle * panelCount * 0.5), 2) * edgeFactor;
    const r = radius * scallop;
    return new THREE.Vector3(
      Math.sin(angle) * r,
      canopyHeight(radius) + offset,
      Math.cos(angle) * r
    );
  }

  function createCanopyPanelGeometry() {
    const radialSegments = 12;
    const angularSegments = 8;
    const positions = [];
    const indices = [];
    const center = canopyPoint(0, 0, 0);
    positions.push(center.x, center.y, center.z);

    for (let radialIndex = 1; radialIndex <= radialSegments; radialIndex++) {
      const radius = canopyRadius * radialIndex / radialSegments;
      for (let angularIndex = 0; angularIndex <= angularSegments; angularIndex++) {
        const angle = -panelAngle * 0.5 + panelAngle * angularIndex / angularSegments;
        const point = canopyPoint(angle, radius, 0);
        positions.push(point.x, point.y, point.z);
      }
    }

    for (let angularIndex = 0; angularIndex < angularSegments; angularIndex++) {
      indices.push(0, 1 + angularIndex, 1 + angularIndex + 1);
    }

    for (let radialIndex = 1; radialIndex < radialSegments; radialIndex++) {
      const innerStart = 1 + (radialIndex - 1) * (angularSegments + 1);
      const outerStart = 1 + radialIndex * (angularSegments + 1);
      for (let angularIndex = 0; angularIndex < angularSegments; angularIndex++) {
        const a = innerStart + angularIndex;
        const b = outerStart + angularIndex;
        const c = outerStart + angularIndex + 1;
        const d = innerStart + angularIndex + 1;
        indices.push(a, b, c, a, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const canopy = new THREE.Group();
  umbrella.add(canopy);

  const canopy_panelGeom = createCanopyPanelGeometry();
  const canopy_panels_even = new THREE.InstancedMesh(canopy_panelGeom, canopyMat, panelCount / 2);
  const canopy_panels_odd = new THREE.InstancedMesh(canopy_panelGeom, canopy_altMat, panelCount / 2);
  const panelMatrix = new THREE.Matrix4();

  for (let i = 0; i < panelCount / 2; i++) {
    panelMatrix.makeRotationY((i * 2) * panelAngle);
    canopy_panels_even.setMatrixAt(i, panelMatrix);
    panelMatrix.makeRotationY((i * 2 + 1) * panelAngle);
    canopy_panels_odd.setMatrixAt(i, panelMatrix);
  }
  canopy_panels_even.instanceMatrix.needsUpdate = true;
  canopy_panels_odd.instanceMatrix.needsUpdate = true;
  canopy_panels_even.frustumCulled = false;
  canopy_panels_odd.frustumCulled = false;
  canopy.add(canopy_panels_even, canopy_panels_odd);

  const canopy_ribPath = [];
  for (let i = 0; i <= 10; i++) {
    const radius = 0.035 + (canopyRadius - 0.035) * i / 10;
    canopy_ribPath.push(canopyPoint(0, radius, 0.014));
  }
  const canopy_ribGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(canopy_ribPath, false, "centripetal"),
    28,
    0.009,
    6,
    false
  );
  const canopy_ribs = new THREE.InstancedMesh(canopy_ribGeom, canopy_ribMat, panelCount);
  for (let i = 0; i < panelCount; i++) {
    panelMatrix.makeRotationY(i * panelAngle);
    canopy_ribs.setMatrixAt(i, panelMatrix);
  }
  canopy_ribs.instanceMatrix.needsUpdate = true;
  canopy_ribs.frustumCulled = false;
  canopy.add(canopy_ribs);

  const canopy_edgePath = [];
  const edgeSamples = 96;
  for (let i = 0; i < edgeSamples; i++) {
    canopy_edgePath.push(canopyPoint(Math.PI * 2 * i / edgeSamples, canopyRadius, 0.004));
  }
  const canopy_edgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(canopy_edgePath, true, "centripetal"),
    128,
    0.008,
    6,
    true
  );
  const canopy_edge = new THREE.Mesh(canopy_edgeGeom, canopy_ribMat);
  canopy.add(canopy_edge);

  const canopy_tipGeom = new THREE.SphereGeometry(0.025, 12, 8);
  const canopy_tips = new THREE.InstancedMesh(canopy_tipGeom, top_capMat, panelCount);
  for (let i = 0; i < panelCount; i++) {
    const angle = i * panelAngle;
    const point = canopyPoint(angle, canopyRadius, 0.006);
    panelMatrix.makeTranslation(point.x, point.y, point.z);
    canopy_tips.setMatrixAt(i, panelMatrix);
  }
  canopy_tips.instanceMatrix.needsUpdate = true;
  canopy_tips.frustumCulled = false;
  canopy.add(canopy_tips);

  const top_cap_baseGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.025, 24);
  const top_cap_base = new THREE.Mesh(top_cap_baseGeom, top_capMat);
  top_cap_base.position.y = canopyTopY + 0.006;
  umbrella.add(top_cap_base);

  const top_capGeom = new THREE.SphereGeometry(0.105, 24, 12);
  const top_cap = new THREE.Mesh(top_capGeom, top_capMat);
  top_cap.scale.set(1, 0.34, 1);
  top_cap.position.y = canopyTopY + 0.027;
  umbrella.add(top_cap);

  const shaftTop = canopyTopY - 0.01;
  const shaftBottom = -0.58;
  const shaftLength = shaftTop - shaftBottom;
  const shaftGeom = new THREE.CylinderGeometry(0.024, 0.024, shaftLength, 16);
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  shaft.position.y = (shaftTop + shaftBottom) * 0.5;
  umbrella.add(shaft);

  const inner_hubGeom = new THREE.CylinderGeometry(0.065, 0.085, 0.12, 20);
  const inner_hub = new THREE.Mesh(inner_hubGeom, top_capMat);
  inner_hub.position.y = canopyTopY - 0.105;
  umbrella.add(inner_hub);

  const runner_collarGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.085, 18);
  const runner_collar = new THREE.Mesh(runner_collarGeom, top_capMat);
  runner_collar.position.y = -0.535;
  umbrella.add(runner_collar);

  const release_buttonGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.055, 14);
  const release_button = new THREE.Mesh(release_buttonGeom, top_capMat);
  release_button.rotation.z = Math.PI / 2;
  release_button.position.set(-0.065, -0.55, 0);
  umbrella.add(release_button);

  const handle_collarGeom = new THREE.CylinderGeometry(0.065, 0.075, 0.11, 20);
  const handle_collar = new THREE.Mesh(handle_collarGeom, handle_darkMat);
  handle_collar.position.y = -0.615;
  umbrella.add(handle_collar);

  const handle_connectorGeom = new THREE.CylinderGeometry(0.075, 0.12, 0.22, 24);
  const handle_connector = new THREE.Mesh(handle_connectorGeom, handleMat);
  handle_connector.position.y = -0.72;
  umbrella.add(handle_connector);

  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, -0.76, 0),
    new THREE.Vector3(0.07, -0.84, 0),
    new THREE.Vector3(0.20, -0.94, 0),
    new THREE.Vector3(0.29, -1.08, 0),
    new THREE.Vector3(0.28, -1.23, 0),
    new THREE.Vector3(0.18, -1.35, 0),
    new THREE.Vector3(0.02, -1.40, 0),
    new THREE.Vector3(-0.15, -1.37, 0),
    new THREE.Vector3(-0.28, -1.27, 0),
    new THREE.Vector3(-0.34, -1.14, 0),
  ], false, "centripetal");

  const handle_gripGeom = new THREE.TubeGeometry(handleCurve, 64, 0.105, 16, false);
  const handle_grip = new THREE.Mesh(handle_gripGeom, handleMat);
  umbrella.add(handle_grip);

  const handle_end_capGeom = new THREE.SphereGeometry(0.105, 18, 12);
  const handle_end_cap = new THREE.Mesh(handle_end_capGeom, handleMat);
  handle_end_cap.position.set(-0.34, -1.14, 0);
  umbrella.add(handle_end_cap);

  umbrella.rotation.set(-0.035, 0, 0.13);

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