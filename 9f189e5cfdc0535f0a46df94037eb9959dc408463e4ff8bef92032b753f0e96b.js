function __sn17_user(THREE) {
  const root = new THREE.Group();
  const cushion_group = new THREE.Group();
  const cage_group = new THREE.Group();
  root.add(cushion_group, cage_group);

  const bodyW = 1.28;
  const bodyD = 1.04;
  const bodyH = 0.42;
  const bodyY = -0.04;
  const topW = 1.38;
  const topD = 1.14;
  const topH = 0.22;
  const topY = 0.25;
  const frameW = 1.46;
  const frameD = 1.22;
  const upperRailY = 0.17;
  const lowerRailY = -0.27;

  const plushMat = new THREE.MeshStandardMaterial({ color: 0xf0e8df, metalness: 0.0, roughness: 1.0 });
  const topPlushMat = new THREE.MeshStandardMaterial({ color: 0xf5eee6, metalness: 0.0, roughness: 1.0 });
  const furMat = new THREE.MeshStandardMaterial({ color: 0xfff8ef, metalness: 0.0, roughness: 1.0 });
  const dimpleMat = new THREE.MeshStandardMaterial({ color: 0xd8cfc5, metalness: 0.0, roughness: 1.0 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xcfd2d2, metalness: 0.45, roughness: 0.22 });

  function roundedBoxGeometry(w, h, d, r) {
    const hw = w / 2;
    const hh = h / 2;
    const radius = Math.min(r, hw * 0.45, hh * 0.45);
    const shape = new THREE.Shape();
    shape.moveTo(-hw + radius, -hh);
    shape.lineTo(hw - radius, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + radius);
    shape.lineTo(hw, hh - radius);
    shape.quadraticCurveTo(hw, hh, hw - radius, hh);
    shape.lineTo(-hw + radius, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - radius);
    shape.lineTo(-hw, -hh + radius);
    shape.quadraticCurveTo(-hw, -hh, -hw + radius, -hh);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: radius * 0.55,
      bevelSize: radius * 0.55,
      bevelSegments: 5
    });
    geometry.translate(0, 0, -d / 2);
    return geometry;
  }

  function roundedRectTubeGeometry(w, d, y, cornerRadius, tubeRadius) {
    const points = [];
    const hw = w / 2;
    const hd = d / 2;
    const corners = [
      [hw - cornerRadius, hd - cornerRadius, 0, Math.PI / 2],
      [-hw + cornerRadius, hd - cornerRadius, Math.PI / 2, Math.PI],
      [-hw + cornerRadius, -hd + cornerRadius, Math.PI, Math.PI * 1.5],
      [hw - cornerRadius, -hd + cornerRadius, Math.PI * 1.5, Math.PI * 2]
    ];
    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i <= 5; i++) {
        const t = i / 5;
        const angle = corner[2] + (corner[3] - corner[2]) * t;
        points.push(new THREE.Vector3(corner[0] + Math.cos(angle) * cornerRadius, y, corner[1] + Math.sin(angle) * cornerRadius));
      }
    }
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 96, tubeRadius, 12, true);
  }

  const side_panelGeom = roundedBoxGeometry(bodyW, bodyH, 0.055, 0.075);
  const front_side_panel = new THREE.Mesh(side_panelGeom, plushMat);
  front_side_panel.position.set(0, bodyY, bodyD / 2 - 0.025);
  cushion_group.add(front_side_panel);

  const back_side_panel = new THREE.Mesh(side_panelGeom, plushMat);
  back_side_panel.position.set(0, bodyY, -bodyD / 2 + 0.025);
  cushion_group.add(back_side_panel);

  const left_side_panel = new THREE.Mesh(side_panelGeom, plushMat);
  left_side_panel.rotation.y = Math.PI / 2;
  left_side_panel.position.set(-bodyW / 2 + 0.025, bodyY, 0);
  cushion_group.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, plushMat);
  right_side_panel.rotation.y = Math.PI / 2;
  right_side_panel.position.set(bodyW / 2 - 0.025, bodyY, 0);
  cushion_group.add(right_side_panel);

  const bottom_shadow_padGeom = roundedBoxGeometry(bodyW * 0.92, 0.055, bodyD * 0.88, 0.045);
  const bottom_shadow_pad = new THREE.Mesh(bottom_shadow_padGeom, dimpleMat);
  bottom_shadow_pad.position.set(0, -0.255, 0);
  cushion_group.add(bottom_shadow_pad);

  const top_cushionGeom = roundedBoxGeometry(topW, topH, topD, 0.105);
  const top_cushion = new THREE.Mesh(top_cushionGeom, topPlushMat);
  top_cushion.position.set(0, topY, 0);
  cushion_group.add(top_cushion);

  const tuft_dimpleGeom = new THREE.SphereGeometry(1, 24, 12);
  const tuft_dimples = new THREE.InstancedMesh(tuft_dimpleGeom, dimpleMat, 9);
  const dummy = new THREE.Object3D();
  let dimpleIndex = 0;
  for (let ix = -1; ix <= 1; ix++) {
    for (let iz = -1; iz <= 1; iz++) {
      dummy.position.set(ix * 0.34, topY + topH / 2 + 0.002, iz * 0.28);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.105, 0.008, 0.075);
      dummy.updateMatrix();
      tuft_dimples.setMatrixAt(dimpleIndex++, dummy.matrix);
    }
  }
  tuft_dimples.instanceMatrix.needsUpdate = true;
  cushion_group.add(tuft_dimples);

  const tuft_seamGeom = new THREE.BoxGeometry(1, 1, 1);
  const tuft_seams = new THREE.InstancedMesh(tuft_seamGeom, dimpleMat, 4);
  const seamData = [
    [0, topY + topH / 2 + 0.003, 0, 0.018, 0.006, 0.92],
    [0, topY + topH / 2 + 0.003, 0, 0.98, 0.006, 0.018],
    [-0.34, topY + topH / 2 + 0.003, 0, 0.014, 0.006, 0.78],
    [0.34, topY + topH / 2 + 0.003, 0, 0.014, 0.006, 0.78]
  ];
  for (let i = 0; i < seamData.length; i++) {
    const s = seamData[i];
    dummy.position.set(s[0], s[1], s[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(s[3], s[4], s[5]);
    dummy.updateMatrix();
    tuft_seams.setMatrixAt(i, dummy.matrix);
  }
  tuft_seams.instanceMatrix.needsUpdate = true;
  cushion_group.add(tuft_seams);

  const fur_strandGeom = new THREE.CylinderGeometry(0.0022, 0.0032, 0.052, 5);
  const top_fur = new THREE.InstancedMesh(fur_strandGeom, furMat, 360);
  let topFurIndex = 0;
  for (let iz = 0; iz < 12; iz++) {
    for (let ix = 0; ix < 30; ix++) {
      const x = -topW * 0.43 + ix * (topW * 0.86 / 29) + ((iz % 2) * 0.012 - 0.006);
      const z = -topD * 0.42 + iz * (topD * 0.84 / 11);
      const tiltX = ((ix * 7 + iz * 3) % 9 - 4) * 0.035;
      const tiltZ = ((ix * 5 + iz * 8) % 9 - 4) * 0.035;
      dummy.position.set(x, topY + topH / 2 + 0.026, z);
      dummy.rotation.set(tiltX, 0, tiltZ);
      dummy.scale.set(1, 0.72 + ((ix + iz) % 5) * 0.08, 1);
      dummy.updateMatrix();
      top_fur.setMatrixAt(topFurIndex++, dummy.matrix);
    }
  }
  top_fur.instanceMatrix.needsUpdate = true;
  cushion_group.add(top_fur);

  const side_fur = new THREE.InstancedMesh(fur_strandGeom, furMat, 240);
  let sideFurIndex = 0;
  for (let side = 0; side < 2; side++) {
    const sign = side === 0 ? 1 : -1;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 20; col++) {
        const x = -bodyW * 0.42 + col * (bodyW * 0.84 / 19);
        const y = -0.205 + row * 0.075;
        const tilt = ((col * 5 + row * 7 + side * 3) % 9 - 4) * 0.035;
        dummy.position.set(x, y, sign * (bodyD / 2 + 0.025));
        dummy.rotation.set(0, 0, tilt);
        dummy.scale.set(1, 0.68 + ((col + row) % 4) * 0.09, 1);
        dummy.updateMatrix();
        side_fur.setMatrixAt(sideFurIndex++, dummy.matrix);
      }
    }
  }
  for (let side = 0; side < 2; side++) {
    const sign = side === 0 ? 1 : -1;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 16; col++) {
        const z = -bodyD * 0.39 + col * (bodyD * 0.78 / 15);
        const y = -0.205 + row * 0.075;
        const tilt = ((col * 4 + row * 5 + side * 2) % 9 - 4) * 0.035;
        dummy.position.set(sign * (bodyW / 2 + 0.025), y, z);
        dummy.rotation.set(tilt, 0, 0);
        dummy.scale.set(1, 0.68 + ((col + row) % 4) * 0.09, 1);
        dummy.updateMatrix();
        side_fur.setMatrixAt(sideFurIndex++, dummy.matrix);
      }
    }
  }
  side_fur.instanceMatrix.needsUpdate = true;
  cushion_group.add(side_fur);

  const upper_rounded_railGeom = roundedRectTubeGeometry(frameW, frameD, upperRailY, 0.14, 0.026);
  const upper_rounded_rail = new THREE.Mesh(upper_rounded_railGeom, silverMat);
  cage_group.add(upper_rounded_rail);

  const lower_rounded_railGeom = roundedRectTubeGeometry(frameW, frameD, lowerRailY, 0.14, 0.026);
  const lower_rounded_rail = new THREE.Mesh(lower_rounded_railGeom, silverMat);
  cage_group.add(lower_rounded_rail);

  const vertical_barGeom = new THREE.CylinderGeometry(0.013, 0.013, upperRailY - lowerRailY, 12);
  const barPositions = [];
  const frontBarCount = 8;
  const sideBarCount = 6;
  for (let i = 0; i < frontBarCount; i++) {
    const x = -frameW / 2 + 0.16 + i * ((frameW - 0.32) / (frontBarCount - 1));
    barPositions.push([x, frameD / 2]);
    barPositions.push([x, -frameD / 2]);
  }
  for (let i = 0; i < sideBarCount; i++) {
    const z = -frameD / 2 + 0.16 + i * ((frameD - 0.32) / (sideBarCount - 1));
    barPositions.push([-frameW / 2, z]);
    barPositions.push([frameW / 2, z]);
  }

  const vertical_bars = new THREE.InstancedMesh(vertical_barGeom, silverMat, barPositions.length);
  for (let i = 0; i < barPositions.length; i++) {
    dummy.position.set(barPositions[i][0], (upperRailY + lowerRailY) / 2, barPositions[i][1]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    vertical_bars.setMatrixAt(i, dummy.matrix);
  }
  vertical_bars.instanceMatrix.needsUpdate = true;
  cage_group.add(vertical_bars);

  const rail_jointGeom = new THREE.SphereGeometry(0.029, 16, 8);
  const rail_joints = new THREE.InstancedMesh(rail_jointGeom, silverMat, 8);
  const jointPositions = [
    [-frameW / 2 + 0.14, upperRailY, frameD / 2 - 0.14],
    [frameW / 2 - 0.14, upperRailY, frameD / 2 - 0.14],
    [-frameW / 2 + 0.14, upperRailY, -frameD / 2 + 0.14],
    [frameW / 2 - 0.14, upperRailY, -frameD / 2 + 0.14],
    [-frameW / 2 + 0.14, lowerRailY, frameD / 2 - 0.14],
    [frameW / 2 - 0.14, lowerRailY, frameD / 2 - 0.14],
    [-frameW / 2 + 0.14, lowerRailY, -frameD / 2 + 0.14],
    [frameW / 2 - 0.14, lowerRailY, -frameD / 2 + 0.14]
  ];
  for (let i = 0; i < jointPositions.length; i++) {
    const p = jointPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rail_joints.setMatrixAt(i, dummy.matrix);
  }
  rail_joints.instanceMatrix.needsUpdate = true;
  cage_group.add(rail_joints);

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
  if (maxDim > 0) root.scale.setScalar(0.98 / maxDim);
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
