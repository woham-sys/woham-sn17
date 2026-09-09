function __sn17_user(THREE) {
  const root = new THREE.Group();
  const bracelet = new THREE.Group();
  bracelet.rotation.x = -0.28;
  root.add(bracelet);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd9d9d3,
    metalness: true,
    roughness: 0.18,
  });
  const darkSilverMat = new THREE.MeshStandardMaterial({
    color: 0x777771,
    metalness: true,
    roughness: 0.35,
  });
  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0x8fd9a8,
    metalness: false,
    roughness: 0.12,
    transmission: 0.35,
    opacity: 0.82,
    clearcoat: 0.7,
    clearcoatRoughness: 0.08,
  });
  const gemstoneEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x4ea873,
    metalness: false,
    roughness: 0.25,
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.42,
  });

  const ovalLinkGeom = new THREE.TorusGeometry(0.125, 0.032, 16, 48);
  const smallLinkGeom = new THREE.TorusGeometry(0.085, 0.026, 14, 40);
  const jumpRingGeom = new THREE.TorusGeometry(0.065, 0.018, 12, 36);
  const connectorBarGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.13, 16);

  const chain_group = new THREE.Group();
  bracelet.add(chain_group);

  const left_chain_links = new THREE.InstancedMesh(ovalLinkGeom, silverMat, 5);
  const right_chain_links = new THREE.InstancedMesh(ovalLinkGeom, silverMat, 5);
  const left_interlocking_links = new THREE.InstancedMesh(smallLinkGeom, darkSilverMat, 4);
  const right_interlocking_links = new THREE.InstancedMesh(smallLinkGeom, darkSilverMat, 4);
  const left_connector_bars = new THREE.InstancedMesh(connectorBarGeom, silverMat, 4);
  const right_connector_bars = new THREE.InstancedMesh(connectorBarGeom, silverMat, 4);

  const dummy = new THREE.Object3D();
  const zAxis = new THREE.Vector3(0, 0, 1);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const alignQuat = new THREE.Quaternion();
  const twistQuat = new THREE.Quaternion();

  for (let i = 0; i < 5; i++) {
    const t = i / 4;
    const x = -0.43 - 0.42 * t;
    const y = 0.015 + 0.28 * t + Math.sin(t * Math.PI) * 0.035;
    const dx = -0.42;
    const dy = 0.28 + Math.cos(t * Math.PI) * Math.PI * 0.035;
    const tangentAngle = Math.atan2(dy, dx);
    const twist = i % 2 === 0 ? 0.12 : 0.82;

    alignQuat.setFromAxisAngle(zAxis, tangentAngle);
    twistQuat.setFromAxisAngle(yAxis, twist);
    dummy.position.set(x, y, i % 2 === 0 ? -0.012 : 0.012);
    dummy.quaternion.copy(alignQuat).multiply(twistQuat);
    dummy.scale.set(1.42, 0.82, 1.0);
    dummy.updateMatrix();
    left_chain_links.setMatrixAt(i, dummy.matrix);

    alignQuat.setFromAxisAngle(zAxis, tangentAngle + 1.08);
    twistQuat.setFromAxisAngle(yAxis, i % 2 === 0 ? 0.72 : 0.08);
    dummy.position.set(x + 0.018, y - 0.018, i % 2 === 0 ? 0.025 : -0.025);
    dummy.quaternion.copy(alignQuat).multiply(twistQuat);
    dummy.scale.set(1.22, 0.72, 0.92);
    dummy.updateMatrix();
    left_interlocking_links.setMatrixAt(i, dummy.matrix);

    if (i < 4) {
      const midX = (-0.43 - 0.42 * ((i + 0.5) / 4));
      const midY = 0.015 + 0.28 * ((i + 0.5) / 4) + Math.sin(((i + 0.5) / 4) * Math.PI) * 0.035;
      const midDx = -0.42;
      const midDy = 0.28 + Math.cos(((i + 0.5) / 4) * Math.PI) * Math.PI * 0.035;
      const barAngle = Math.atan2(midDy, midDx) - Math.PI / 2;
      alignQuat.setFromAxisAngle(zAxis, barAngle);
      dummy.position.set(midX, midY, -0.035);
      dummy.quaternion.copy(alignQuat);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      left_connector_bars.setMatrixAt(i, dummy.matrix);
    }
  }

  for (let i = 0; i < 5; i++) {
    const t = i / 4;
    const x = 0.43 + 0.42 * t;
    const y = 0.015 + 0.28 * t + Math.sin(t * Math.PI) * 0.035;
    const dx = 0.42;
    const dy = 0.28 + Math.cos(t * Math.PI) * Math.PI * 0.035;
    const tangentAngle = Math.atan2(dy, dx);
    const twist = i % 2 === 0 ? 0.82 : 0.12;

    alignQuat.setFromAxisAngle(zAxis, tangentAngle);
    twistQuat.setFromAxisAngle(yAxis, twist);
    dummy.position.set(x, y, i % 2 === 0 ? -0.012 : 0.012);
    dummy.quaternion.copy(alignQuat).multiply(twistQuat);
    dummy.scale.set(1.42, 0.82, 1.0);
    dummy.updateMatrix();
    right_chain_links.setMatrixAt(i, dummy.matrix);

    alignQuat.setFromAxisAngle(zAxis, tangentAngle + 1.08);
    twistQuat.setFromAxisAngle(yAxis, i % 2 === 0 ? 0.08 : 0.72);
    dummy.position.set(x - 0.018, y - 0.018, i % 2 === 0 ? 0.025 : -0.025);
    dummy.quaternion.copy(alignQuat).multiply(twistQuat);
    dummy.scale.set(1.22, 0.72, 0.92);
    dummy.updateMatrix();
    right_interlocking_links.setMatrixAt(i, dummy.matrix);

    if (i < 4) {
      const midX = 0.43 + 0.42 * ((i + 0.5) / 4);
      const midY = 0.015 + 0.28 * ((i + 0.5) / 4) + Math.sin(((i + 0.5) / 4) * Math.PI) * 0.035;
      const midDx = 0.42;
      const midDy = 0.28 + Math.cos(((i + 0.5) / 4) * Math.PI) * Math.PI * 0.035;
      const barAngle = Math.atan2(midDy, midDx) - Math.PI / 2;
      alignQuat.setFromAxisAngle(zAxis, barAngle);
      dummy.position.set(midX, midY, -0.035);
      dummy.quaternion.copy(alignQuat);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      right_connector_bars.setMatrixAt(i, dummy.matrix);
    }
  }

  left_chain_links.instanceMatrix.needsUpdate = true;
  right_chain_links.instanceMatrix.needsUpdate = true;
  left_interlocking_links.instanceMatrix.needsUpdate = true;
  right_interlocking_links.instanceMatrix.needsUpdate = true;
  left_connector_bars.instanceMatrix.needsUpdate = true;
  right_connector_bars.instanceMatrix.needsUpdate = true;

  chain_group.add(left_connector_bars, right_connector_bars);
  chain_group.add(left_interlocking_links, right_interlocking_links);
  chain_group.add(left_chain_links, right_chain_links);

  const left_side_jump_rings = new THREE.InstancedMesh(jumpRingGeom, silverMat, 2);
  const right_side_jump_rings = new THREE.InstancedMesh(jumpRingGeom, silverMat, 2);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    alignQuat.setFromAxisAngle(zAxis, side * 0.22);
    twistQuat.setFromAxisAngle(yAxis, i === 0 ? 0.18 : 0.78);
    dummy.position.set(side * 0.43, 0.015, 0.015);
    dummy.quaternion.copy(alignQuat).multiply(twistQuat);
    dummy.scale.set(1.18, 0.82, 1);
    dummy.updateMatrix();
    if (side < 0) left_side_jump_rings.setMatrixAt(i, dummy.matrix);
    else right_side_jump_rings.setMatrixAt(i, dummy.matrix);
  }
  left_side_jump_rings.instanceMatrix.needsUpdate = true;
  right_side_jump_rings.instanceMatrix.needsUpdate = true;
  chain_group.add(left_side_jump_rings, right_side_jump_rings);

  const rear_closure_ring = new THREE.Mesh(ovalLinkGeom, silverMat);
  rear_closure_ring.position.set(0, 0.345, -0.015);
  rear_closure_ring.rotation.y = 0.22;
  rear_closure_ring.scale.set(1.55, 0.72, 1);
  chain_group.add(rear_closure_ring);

  const clasp_gate = new THREE.Mesh(smallLinkGeom, silverMat);
  clasp_gate.position.set(0.075, 0.35, 0.025);
  clasp_gate.rotation.set(0.18, 0.45, 0.08);
  clasp_gate.scale.set(1.15, 0.62, 0.9);
  chain_group.add(clasp_gate);

  const clasp_lever = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.025, 0.035), silverMat);
  clasp_lever.position.set(0.035, 0.395, 0.035);
  clasp_lever.rotation.z = -0.25;
  chain_group.add(clasp_lever);

  const central_setting = new THREE.Group();
  central_setting.position.set(0, -0.255, 0.045);
  bracelet.add(central_setting);

  const bezel_backing = new THREE.Mesh(new THREE.CylinderGeometry(0.235, 0.235, 0.055, 64), silverMat);
  bezel_backing.rotation.x = Math.PI / 2;
  bezel_backing.position.z = -0.012;
  central_setting.add(bezel_backing);

  const gemstone_underlay = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.035, 64), gemstoneEdgeMat);
  gemstone_underlay.rotation.x = Math.PI / 2;
  gemstone_underlay.position.z = 0.02;
  central_setting.add(gemstone_underlay);

  const cabochon_gemstone = new THREE.Mesh(new THREE.SphereGeometry(0.19, 64, 32), gemstoneMat);
  cabochon_gemstone.position.z = 0.055;
  cabochon_gemstone.scale.set(1, 1, 0.34);
  central_setting.add(cabochon_gemstone);

  const outer_bezel = new THREE.Mesh(new THREE.TorusGeometry(0.205, 0.028, 18, 72), silverMat);
  outer_bezel.position.z = 0.062;
  central_setting.add(outer_bezel);

  const inner_bezel_shadow = new THREE.Mesh(new THREE.TorusGeometry(0.178, 0.006, 10, 64), darkSilverMat);
  inner_bezel_shadow.position.z = 0.078;
  central_setting.add(inner_bezel_shadow);

  const gemstone_highlight = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.006, 8, 32, 1.75), highlightMat);
  gemstone_highlight.position.set(-0.045, 0.055, 0.118);
  gemstone_highlight.rotation.z = -0.55;
  gemstone_highlight.scale.set(1.25, 0.55, 1);
  central_setting.add(gemstone_highlight);

  const gemstone_soft_spot = new THREE.Mesh(new THREE.CircleGeometry(0.035, 24), highlightMat);
  gemstone_soft_spot.position.set(0.075, -0.035, 0.119);
  gemstone_soft_spot.scale.set(1.0, 0.55, 1);
  gemstone_soft_spot.material.opacity = 0.22;
  central_setting.add(gemstone_soft_spot);

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
