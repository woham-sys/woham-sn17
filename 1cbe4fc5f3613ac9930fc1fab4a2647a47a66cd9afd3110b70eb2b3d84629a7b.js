function __sn17_user(THREE) {
  const root = new THREE.Group();

  const cake_side_mat = new THREE.MeshStandardMaterial({ color: 0xf0c65a, emissive: 0x4a2d08, emissiveIntensity: 0.18 });
  const cake_top_mat = new THREE.MeshStandardMaterial({ color: 0xc77a25, emissive: 0x3a1604, emissiveIntensity: 0.12 });
  const cake_bottom_mat = new THREE.MeshStandardMaterial({ color: 0xa9561c, emissive: 0x2b1003, emissiveIntensity: 0.12 });
  const cream_mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.18 });
  const pore_mat = new THREE.MeshStandardMaterial({ color: 0x9b5c1e, side: THREE.DoubleSide });
  const sugar_mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.12 });

  function createWavyTorusGeometry(majorR, tubeR, radialSteps, majorSteps, phase, amplitudeA, amplitudeB) {
    const positions = [];
    const indices = [];
    for (let i = 0; i <= radialSteps; i++) {
      const u = i / radialSteps * Math.PI * 2;
      const cu = Math.cos(u);
      const su = Math.sin(u);
      for (let j = 0; j <= majorSteps; j++) {
        const v = j / majorSteps * Math.PI * 2;
        const wave =
          amplitudeA * Math.sin(v * 5 + phase) +
          amplitudeB * Math.sin(v * 9 - phase * 0.7) +
          amplitudeB * 0.45 * Math.cos(v * 3 + phase * 1.4);
        const r = majorR + tubeR * cu + wave * cu;
        const y = tubeR * su + wave * su * 0.75;
        positions.push(Math.cos(v) * r, y, Math.sin(v) * r);
      }
    }
    for (let i = 0; i < radialSteps; i++) {
      for (let j = 0; j < majorSteps; j++) {
        const a = i * (majorSteps + 1) + j;
        const b = (i + 1) * (majorSteps + 1) + j;
        const c = b + 1;
        const d = a + 1;
        indices.push(a, b, d, b, c, d);
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  function createCreamCapGeometry() {
    const rings = 18;
    const segments = 128;
    const positions = [0, 0.34, 0];
    const indices = [];

    function edgePoint(angle) {
      const w =
        0.018 * Math.sin(angle * 7 + 0.4) +
        0.012 * Math.sin(angle * 13 - 0.8) +
        0.008 * Math.cos(angle * 19 + 0.2);
      const r = 0.455 + w;
      const y =
        0.006 * Math.sin(angle * 7 - 0.3) +
        0.004 * Math.sin(angle * 17 + 0.9);
      return [Math.cos(angle) * r, y, Math.sin(angle) * r];
    }

    for (let ring = 1; ring <= rings; ring++) {
      const t = ring / rings;
      const dome = Math.pow(Math.max(0, 1 - t * t), 0.72);
      for (let j = 0; j < segments; j++) {
        const angle = j / segments * Math.PI * 2;
        const edge = edgePoint(angle);
        const ripple =
          0.006 * Math.sin(angle * 6 + ring * 0.7) +
          0.004 * Math.sin(angle * 11 - ring * 0.45);
        const x = Math.cos(angle) * 0.455 * t + (edge[0] - Math.cos(angle) * 0.455 * t);
        const z = Math.sin(angle) * 0.455 * t + (edge[2] - Math.sin(angle) * 0.455 * t);
        const y = 0.34 + 0.145 * dome + edge[1] * t + ripple * (0.35 + 0.65 * t);
        positions.push(x, y, z);
      }
    }

    for (let j = 0; j < segments; j++) {
      const a = 1 + j;
      const b = 1 + (j + 1) % segments;
      indices.push(0, b, a);
    }

    for (let ring = 1; ring < rings; ring++) {
      const innerStart = 1 + (ring - 1) * segments;
      const outerStart = 1 + ring * segments;
      for (let j = 0; j < segments; j++) {
        const next = (j + 1) % segments;
        const a = innerStart + j;
        const b = innerStart + next;
        const c = outerStart + j;
        const d = outerStart + next;
        indices.push(a, b, c, b, d, c);
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  const cake_body_geom = new THREE.CylinderGeometry(0.485, 0.455, 0.36, 96, 1);
  const cake_body = new THREE.Mesh(cake_body_geom, cake_side_mat);
  cake_body.position.y = -0.07;
  root.add(cake_body);

  const bottom_crust_geom = new THREE.CylinderGeometry(0.455, 0.43, 0.065, 96, 1);
  const bottom_crust = new THREE.Mesh(bottom_crust_geom, cake_bottom_mat);
  bottom_crust.position.y = -0.252;
  root.add(bottom_crust);

  const top_crust_geom = new THREE.CylinderGeometry(0.485, 0.475, 0.055, 96, 1);
  const top_crust = new THREE.Mesh(top_crust_geom, cake_top_mat);
  top_crust.position.y = 0.125;
  root.add(top_crust);

  const upper_browned_rim_geom = createWavyTorusGeometry(0.425, 0.075, 18, 128, 0.35, 0.014, 0.008);
  const upper_browned_rim = new THREE.Mesh(upper_browned_rim_geom, cake_top_mat);
  upper_browned_rim.position.y = 0.115;
  root.add(upper_browned_rim);

  const lower_browned_rim_geom = createWavyTorusGeometry(0.425, 0.055, 16, 128, 1.1, 0.009, 0.006);
  const lower_browned_rim = new THREE.Mesh(lower_browned_rim_geom, cake_bottom_mat);
  lower_browned_rim.position.y = -0.215;
  root.add(lower_browned_rim);

  const cream_cap_geom = createCreamCapGeometry();
  const cream_cap = new THREE.Mesh(cream_cap_geom, cream_mat);
  root.add(cream_cap);

  const cream_edge_lobe_geom = new THREE.SphereGeometry(1, 20, 12);
  const cream_edge_lobes = new THREE.InstancedMesh(cream_edge_lobe_geom, cream_mat, 18);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2;
    const r = 0.448 + 0.008 * Math.sin(i * 2.1);
    dummy.position.set(Math.cos(angle) * r, 0.004 + 0.004 * Math.sin(i * 1.7), Math.sin(angle) * r);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(0.065 + 0.012 * Math.sin(i * 1.3), 0.035 + 0.008 * Math.cos(i * 1.9), 0.052 + 0.008 * Math.sin(i * 0.8));
    dummy.updateMatrix();
    cream_edge_lobes.setMatrixAt(i, dummy.matrix);
  }
  root.add(cream_edge_lobes);

  const cream_drip_geom = new THREE.SphereGeometry(1, 20, 12);
  const cream_drips = new THREE.InstancedMesh(cream_drip_geom, cream_mat, 6);
  const dripAngles = [0.18, 0.72, 1.35, 2.1, 3.8, 5.25];
  for (let i = 0; i < dripAngles.length; i++) {
    const angle = dripAngles[i];
    const r = 0.455 + 0.006 * Math.sin(i * 1.8);
    dummy.position.set(Math.cos(angle) * r, -0.012 - (i % 3) * 0.006, Math.sin(angle) * r);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(0.052 + 0.008 * Math.sin(i), 0.065 + 0.012 * Math.cos(i * 1.4), 0.043);
    dummy.updateMatrix();
    cream_drips.setMatrixAt(i, dummy.matrix);
  }
  root.add(cream_drips);

  const cream_surface_clump_geom = new THREE.SphereGeometry(1, 16, 10);
  const cream_surface_clumps = new THREE.InstancedMesh(cream_surface_clump_geom, cream_mat, 46);
  for (let i = 0; i < 46; i++) {
    const t = (i + 0.5) / 46;
    const angle = i * 2.3999632297 + 0.25;
    const r = 0.39 * Math.sqrt(t);
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = 0.342 + 0.142 * Math.pow(Math.max(0, 1 - (r / 0.455) * (r / 0.455)), 0.72) +
      0.004 * Math.sin(angle * 6 + r * 18);
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, angle, 0);
    const s = 0.022 + 0.012 * (0.5 + 0.5 * Math.sin(i * 1.73));
    dummy.scale.set(s * 1.15, s * 0.55, s);
    dummy.updateMatrix();
    cream_surface_clumps.setMatrixAt(i, dummy.matrix);
  }
  root.add(cream_surface_clumps);

  const pore_geom = new THREE.CircleGeometry(1, 14);
  const side_pores = new THREE.InstancedMesh(pore_geom, pore_mat, 120);
  const outward = new THREE.Vector3();
  const circleNormal = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 120; i++) {
    const angle = i * 2.3999632297 + 0.18;
    const y = -0.205 + ((i * 37) % 100) / 100 * 0.285;
    const r = 0.458 + 0.025 * ((y + 0.25) / 0.36);
    outward.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
    dummy.position.set(outward.x * (r + 0.003), y, outward.z * (r + 0.003));
    dummy.quaternion.setFromUnitVectors(circleNormal, outward);
    const sx = 0.006 + 0.011 * (0.5 + 0.5 * Math.sin(i * 1.37));
    const sy = 0.004 + 0.007 * (0.5 + 0.5 * Math.cos(i * 1.91));
    dummy.scale.set(sx, sy, 1);
    dummy.updateMatrix();
    side_pores.setMatrixAt(i, dummy.matrix);
  }
  root.add(side_pores);

  const rim_pores = new THREE.InstancedMesh(pore_geom, pore_mat, 52);
  for (let i = 0; i < 52; i++) {
    const angle = i * 2.3999632297 + 0.6;
    const y = -0.232 + ((i * 29) % 100) / 100 * 0.33;
    const upper = y > 0.075;
    const r = upper ? 0.487 : 0.472;
    outward.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
    dummy.position.set(outward.x * (r + 0.003), y, outward.z * (r + 0.003));
    dummy.quaternion.setFromUnitVectors(circleNormal, outward);
    const s = 0.005 + 0.008 * (0.5 + 0.5 * Math.sin(i * 2.2));
    dummy.scale.set(s * 1.2, s * 0.75, 1);
    dummy.updateMatrix();
    rim_pores.setMatrixAt(i, dummy.matrix);
  }
  root.add(rim_pores);

  const sugar_grain_geom = new THREE.TetrahedronGeometry(1, 0);
  const side_sugar_grains = new THREE.InstancedMesh(sugar_grain_geom, sugar_mat, 150);
  for (let i = 0; i < 150; i++) {
    const angle = i * 2.3999632297 + 0.45;
    const y = -0.235 + ((i * 43) % 100) / 100 * 0.35;
    const r = 0.462 + 0.024 * ((y + 0.25) / 0.36);
    dummy.position.set(Math.cos(angle) * (r + 0.006), y, Math.sin(angle) * (r + 0.006));
    dummy.rotation.set(i * 0.31, angle, i * 0.19);
    const s = 0.0035 + 0.0045 * (0.5 + 0.5 * Math.sin(i * 1.61));
    dummy.scale.set(s, s * 0.8, s);
    dummy.updateMatrix();
    side_sugar_grains.setMatrixAt(i, dummy.matrix);
  }
  root.add(side_sugar_grains);

  const top_sugar_grains = new THREE.InstancedMesh(sugar_grain_geom, sugar_mat, 90);
  for (let i = 0; i < 90; i++) {
    const t = (i + 0.5) / 90;
    const angle = i * 2.3999632297 + 0.9;
    const r = 0.31 + 0.155 * Math.sqrt(t);
    const y = 0.158 + 0.004 * Math.sin(angle * 7);
    dummy.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
    dummy.rotation.set(i * 0.27, angle, i * 0.17);
    const s = 0.004 + 0.005 * (0.5 + 0.5 * Math.cos(i * 1.43));
    dummy.scale.set(s, s * 0.75, s);
    dummy.updateMatrix();
    top_sugar_grains.setMatrixAt(i, dummy.matrix);
  }
  root.add(top_sugar_grains);

  const cream_sugar_grains = new THREE.InstancedMesh(sugar_grain_geom, sugar_mat, 70);
  for (let i = 0; i < 70; i++) {
    const t = (i + 0.5) / 70;
    const angle = i * 2.3999632297 + 1.25;
    const r = 0.39 * Math.sqrt(t);
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = 0.348 + 0.14 * Math.pow(Math.max(0, 1 - (r / 0.455) * (r / 0.455)), 0.72);
    dummy.position.set(x, y, z);
    dummy.rotation.set(i * 0.33, angle, i * 0.21);
    const s = 0.003 + 0.004 * (0.5 + 0.5 * Math.sin(i * 1.87));
    dummy.scale.set(s, s * 0.7, s);
    dummy.updateMatrix();
    cream_sugar_grains.setMatrixAt(i, dummy.matrix);
  }
  root.add(cream_sugar_grains);

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
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
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
