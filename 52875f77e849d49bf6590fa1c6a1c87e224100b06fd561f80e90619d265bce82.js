function __sn17_user(THREE) {
  const root = new THREE.Group();
  const umbrella = new THREE.Group();
  root.add(umbrella);

  const panelCount = 8;
  const canopyRadius = 1.25;
  const canopyApexY = 0.62;
  const canopyDrop = 0.54;
  const sector = Math.PI * 2 / panelCount;
  const halfSector = sector / 2;

  const canopyMat = new THREE.MeshStandardMaterial({
    color: 0x1764d8,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const canopyAltMat = new THREE.MeshStandardMaterial({
    color: 0x165dcc,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const printMat = new THREE.MeshStandardMaterial({
    color: 0xf4f5f2,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x0d4aa8,
    metalness: 0.0,
    roughness: 0.9
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x25282a,
    metalness: 0.35,
    roughness: 0.5
  });

  function canopyY(radius) {
    const t = Math.min(1, Math.max(0, radius / canopyRadius));
    return canopyApexY - canopyDrop * Math.pow(t, 1.55);
  }

  function canopyPoint(theta, radius, lift) {
    const t = Math.min(1, Math.max(0, radius / canopyRadius));
    const radialScallop = 1 - 0.018 * Math.cos(panelCount * theta) * Math.pow(t, 4);
    const r = radius * radialScallop;
    const y = canopyY(r) + lift;
    return new THREE.Vector3(Math.sin(theta) * r, y, Math.cos(theta) * r);
  }

  function createCanopyPanelGeometry() {
    const radialSteps = 9;
    const angularSteps = 5;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= radialSteps; i++) {
      const t = i / radialSteps;
      for (let j = 0; j <= angularSteps; j++) {
        const u = j / angularSteps;
        const theta = -halfSector + u * sector;
        const edgeInset = 0.012 * Math.sin(Math.PI * u) * Math.pow(t, 4);
        const radius = canopyRadius * t * (1 - edgeInset);
        const point = canopyPoint(theta, radius, 0);
        positions.push(point.x, point.y, point.z);
      }
    }

    const row = angularSteps + 1;
    for (let i = 0; i < radialSteps; i++) {
      for (let j = 0; j < angularSteps; j++) {
        const a = i * row + j;
        const b = (i + 1) * row + j;
        const c = (i + 1) * row + j + 1;
        const d = i * row + j + 1;
        indices.push(a, b, c, a, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createSurfaceRibbonGeometry(specs, lift) {
    const positions = [];
    const indices = [];

    for (const spec of specs) {
      const steps = spec.steps || 12;
      const base = positions.length / 3;

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const theta = spec.theta0 + (spec.theta1 - spec.theta0) * t;
        const radius = spec.r0 + (spec.r1 - spec.r0) * t;
        const width = spec.width * (0.85 + 0.15 * Math.sin(Math.PI * t));
        const radialDerivative = spec.r1 - spec.r0;
        const tangentX = Math.cos(theta) * radialDerivative - Math.sin(theta) * spec.theta1 - spec.theta0;
        const tangentZ = Math.sin(theta) * radialDerivative + Math.cos(theta) * spec.theta1 - spec.theta0;
        const tangentLength = Math.sqrt(tangentX * tangentX + tangentZ * tangentZ) || 1;
        const sideX = -tangentZ / tangentLength;
        const sideZ = tangentX / tangentLength;

        for (const side of [-1, 1]) {
          const point = canopyPoint(theta, radius, lift);
          positions.push(
            point.x + sideX * width * 0.5 * side,
            point.y,
            point.z + sideZ * width * 0.5 * side
          );
        }
      }

      for (let i = 0; i < steps; i++) {
        const a = base + i * 2;
        const b = a + 1;
        const c = a + 2;
        const d = a + 3;
        indices.push(a, c, b, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function makeRod(geometry, material, start, end) {
    const rod = new THREE.Mesh(geometry, material);
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    rod.position.copy(start).add(end).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    rod.scale.set(1, length, 1);
    return rod;
  }

  const canopy_panel_geometry = createCanopyPanelGeometry();

  const canopy_panels_even = new THREE.InstancedMesh(canopy_panel_geometry, canopyMat, 4);
  const canopy_panels_odd = new THREE.InstancedMesh(canopy_panel_geometry, canopyAltMat, 4);
  const panel_dummy = new THREE.Object3D();

  let evenIndex = 0;
  let oddIndex = 0;
  for (let i = 0; i < panelCount; i++) {
    panel_dummy.position.set(0, 0, 0);
    panel_dummy.rotation.set(0, i * sector, 0);
    panel_dummy.scale.set(1, 1, 1);
    panel_dummy.updateMatrix();
    if (i % 2 === 0) {
      canopy_panels_even.setMatrixAt(evenIndex++, panel_dummy.matrix);
    } else {
      canopy_panels_odd.setMatrixAt(oddIndex++, panel_dummy.matrix);
    }
  }
  canopy_panels_even.instanceMatrix.needsUpdate = true;
  canopy_panels_odd.instanceMatrix.needsUpdate = true;
  umbrella.add(canopy_panels_even, canopy_panels_odd);

  const diagonalStripeSpecs = [];
  const crossStripeSpecs = [];
  const fineStripeSpecs = [];

  for (let i = 0; i < panelCount; i++) {
    const center = i * sector;

    diagonalStripeSpecs.push({
      theta0: center - halfSector * 0.82,
      theta1: center + halfSector * 0.82,
      r0: 0.12,
      r1: 1.17,
      width: 0.068,
      steps: 12
    });

    diagonalStripeSpecs.push({
      theta0: center - halfSector * 0.72,
      theta1: center + halfSector * 0.72,
      r0: 0.24,
      r1: 1.18,
      width: 0.026,
      steps: 10
    });

    crossStripeSpecs.push({
      theta0: center - halfSector * 0.9,
      theta1: center + halfSector * 0.9,
      r0: 0.48 + (i % 2) * 0.035,
      r1: 1.18,
      width: 0.045,
      steps: 10
    });

    crossStripeSpecs.push({
      theta0: center - halfSector * 0.86,
      theta1: center + halfSector * 0.86,
      r0: 0.78 + (i % 2) * 0.025,
      r1: 1.19,
      width: 0.032,
      steps: 8
    });

    fineStripeSpecs.push({
      theta0: center - halfSector * 0.78,
      theta1: center + halfSector * 0.78,
      r0: 0.62,
      r1: 1.18,
      width: 0.018,
      steps: 8
    });
  }

  const diagonal_white_stripes = new THREE.Mesh(
    createSurfaceRibbonGeometry(diagonalStripeSpecs, 0.012),
    printMat
  );
  const cross_white_stripes = new THREE.Mesh(
    createSurfaceRibbonGeometry(crossStripeSpecs, 0.014),
    printMat
  );
  const fine_white_stripes = new THREE.Mesh(
    createSurfaceRibbonGeometry(fineStripeSpecs, 0.016),
    printMat
  );
  umbrella.add(diagonal_white_stripes, cross_white_stripes, fine_white_stripes);

  const radial_seam_curve = new THREE.CatmullRomCurve3([
    canopyPoint(0, 0.07, 0.012),
    canopyPoint(0, 0.38, 0.012),
    canopyPoint(0, 0.78, 0.012),
    canopyPoint(0, 1.19, 0.012)
  ]);
  const radial_seam_geometry = new THREE.TubeGeometry(radial_seam_curve, 18, 0.006, 6, false);
  const radial_seams = new THREE.InstancedMesh(radial_seam_geometry, seamMat, panelCount);

  for (let i = 0; i < panelCount; i++) {
    panel_dummy.position.set(0, 0, 0);
    panel_dummy.rotation.set(0, i * sector + halfSector, 0);
    panel_dummy.scale.set(1, 1, 1);
    panel_dummy.updateMatrix();
    radial_seams.setMatrixAt(i, panel_dummy.matrix);
  }
  radial_seams.instanceMatrix.needsUpdate = true;
  umbrella.add(radial_seams);

  const hemPoints = [];
  const hemSamples = 96;
  for (let i = 0; i < hemSamples; i++) {
    const theta = i / hemSamples * Math.PI * 2;
    hemPoints.push(canopyPoint(theta, canopyRadius, 0.002));
  }
  const outer_hem_curve = new THREE.CatmullRomCurve3(hemPoints, true, false);
  const outer_hem_geometry = new THREE.TubeGeometry(outer_hem_curve, 128, 0.011, 6, true);
  const outer_hem = new THREE.Mesh(outer_hem_geometry, seamMat);
  umbrella.add(outer_hem);

  const rib_curve = new THREE.CatmullRomCurve3([
    canopyPoint(0, 0.05, -0.025),
    canopyPoint(0, 0.42, -0.028),
    canopyPoint(0, 0.84, -0.026),
    canopyPoint(0, 1.19, -0.02)
  ]);
  const rib_geometry = new THREE.TubeGeometry(rib_curve, 18, 0.009, 6, false);
  const underside_ribs = new THREE.InstancedMesh(rib_geometry, darkMetalMat, panelCount);

  for (let i = 0; i < panelCount; i++) {
    panel_dummy.position.set(0, 0, 0);
    panel_dummy.rotation.set(0, i * sector + halfSector, 0);
    panel_dummy.scale.set(1, 1, 1);
    panel_dummy.updateMatrix();
    underside_ribs.setMatrixAt(i, panel_dummy.matrix);
  }
  underside_ribs.instanceMatrix.needsUpdate = true;
  umbrella.add(underside_ribs);

  const stretcher_curve = new THREE.LineCurve3(
    new THREE.Vector3(0, 0.08, 0),
    canopyPoint(0, 0.78, -0.045)
  );
  const stretcher_geometry = new THREE.TubeGeometry(stretcher_curve, 1, 0.007, 6, false);
  const stretchers = new THREE.InstancedMesh(stretcher_geometry, darkMetalMat, panelCount);

  for (let i = 0; i < panelCount; i++) {
    panel_dummy.position.set(0, 0, 0);
    panel_dummy.rotation.set(0, i * sector + halfSector, 0);
    panel_dummy.scale.set(1, 1, 1);
    panel_dummy.updateMatrix();
    stretchers.setMatrixAt(i, panel_dummy.matrix);
  }
  stretchers.instanceMatrix.needsUpdate = true;
  umbrella.add(stretchers);

  const runner_hub_geometry = new THREE.SphereGeometry(0.045, 16, 10);
  const runner_hub = new THREE.Mesh(runner_hub_geometry, darkMetalMat);
  runner_hub.position.y = 0.08;
  umbrella.add(runner_hub);

  const canopy_tip_geometry = new THREE.SphereGeometry(0.018, 12, 8);
  const canopy_tips = new THREE.InstancedMesh(canopy_tip_geometry, blackMat, panelCount);

  for (let i = 0; i < panelCount; i++) {
    const theta = i * sector + halfSector;
    const point = canopyPoint(theta, canopyRadius, 0);
    panel_dummy.position.copy(point);
    panel_dummy.rotation.set(0, 0, 0);
    panel_dummy.scale.set(1, 1, 1);
    panel_dummy.updateMatrix();
    canopy_tips.setMatrixAt(i, panel_dummy.matrix);
  }
  canopy_tips.instanceMatrix.needsUpdate = true;
  umbrella.add(canopy_tips);

  const shaft_start = new THREE.Vector3(0, 0.58, 0);
  const shaft_end = new THREE.Vector3(0, -0.60, 0);
  const shaft_geometry = new THREE.CylinderGeometry(0.018, 0.018, 1, 12);
  const central_shaft = makeRod(shaft_geometry, blackMat, shaft_start, shaft_end);
  umbrella.add(central_shaft);

  const lower_sleeve_start = new THREE.Vector3(0, -0.48, 0);
  const lower_sleeve_end = new THREE.Vector3(0, -0.63, 0);
  const lower_sleeve_geometry = new THREE.CylinderGeometry(0.027, 0.027, 1, 12);
  const lower_sleeve = makeRod(lower_sleeve_geometry, darkMetalMat, lower_sleeve_start, lower_sleeve_end);
  umbrella.add(lower_sleeve);

  const top_cap_start = new THREE.Vector3(0, 0.60, 0);
  const top_cap_end = new THREE.Vector3(0, 0.83, 0);
  const top_cap_geometry = new THREE.CylinderGeometry(0.034, 0.047, 1, 16);
  const top_cap = makeRod(top_cap_geometry, blackMat, top_cap_start, top_cap_end);
  umbrella.add(top_cap);

  const top_button_geometry = new THREE.SphereGeometry(0.038, 16, 10);
  const top_button = new THREE.Mesh(top_button_geometry, blackMat);
  top_button.position.set(0, 0.605, 0);
  umbrella.add(top_button);

  const handle_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.58, 0),
    new THREE.Vector3(0, -0.73, 0),
    new THREE.Vector3(-0.11, -0.90, 0),
    new THREE.Vector3(-0.29, -0.96, 0),
    new THREE.Vector3(-0.44, -0.88, 0),
    new THREE.Vector3(-0.48, -0.70, 0),
    new THREE.Vector3(-0.45, -0.57, 0)
  ], false, false);
  const handle_geometry = new THREE.TubeGeometry(handle_curve, 40, 0.045, 12, false);
  const curved_handle = new THREE.Mesh(handle_geometry, blackMat);
  umbrella.add(curved_handle);

  const handle_endcap_geometry = new THREE.SphereGeometry(0.047, 14, 10);
  const handle_endcap = new THREE.Mesh(handle_endcap_geometry, blackMat);
  handle_endcap.position.set(-0.45, -0.57, 0);
  umbrella.add(handle_endcap);

  const release_button_geometry = new THREE.SphereGeometry(0.025, 12, 8);
  const release_button = new THREE.Mesh(release_button_geometry, blackMat);
  release_button.position.set(0.027, -0.43, 0);
  release_button.scale.set(0.55, 1.0, 0.8);
  umbrella.add(release_button);

  umbrella.rotation.set(-0.08, -0.12, 0.30);

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
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const scale = 0.98 / maxDim;
    root.scale.setScalar(scale);
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
