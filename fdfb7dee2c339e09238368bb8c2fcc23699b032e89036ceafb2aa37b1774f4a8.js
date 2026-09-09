function __sn17_user(THREE) {
  const root = new THREE.Group();

  const globeR = 0.5;
  const globeY = 0.04;

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeee,
    transparent: true,
    opacity: 0.42,
    thickness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const edgeGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xbfcaca,
    transparent: true,
    opacity: 0.58,
    thickness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const faintHighlightMat = new THREE.MeshBasicMaterial({
    color: 0xf4f7f7,
    transparent: true,
    opacity: 0.11,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const globe_shellGeom = new THREE.SphereGeometry(globeR, 64, 32);
  const globe_shell = new THREE.Mesh(globe_shellGeom, glassMat);
  globe_shell.position.y = globeY;
  globe_shell.renderOrder = 1;
  root.add(globe_shell);

  const outer_edgeGeom = new THREE.TorusGeometry(globeR - 0.006, 0.006, 12, 96);
  const outer_edge = new THREE.Mesh(outer_edgeGeom, edgeGlassMat);
  outer_edge.position.set(0, globeY, 0.002);
  outer_edge.renderOrder = 2;
  root.add(outer_edge);

  const top_outer_ringGeom = new THREE.TorusGeometry(0.078, 0.006, 10, 64);
  const top_outer_ring = new THREE.Mesh(top_outer_ringGeom, edgeGlassMat);
  top_outer_ring.rotation.x = Math.PI / 2;
  top_outer_ring.position.set(0, globeY + globeR + 0.001, 0);
  top_outer_ring.renderOrder = 3;
  root.add(top_outer_ring);

  const top_inner_ringGeom = new THREE.TorusGeometry(0.048, 0.004, 10, 48);
  const top_inner_ring = new THREE.Mesh(top_inner_ringGeom, edgeGlassMat);
  top_inner_ring.rotation.x = Math.PI / 2;
  top_inner_ring.position.set(0, globeY + globeR + 0.003, 0);
  top_inner_ring.renderOrder = 3;
  root.add(top_inner_ring);

  const top_center_dimpleGeom = new THREE.CylinderGeometry(0.018, 0.024, 0.008, 32);
  const top_center_dimple = new THREE.Mesh(top_center_dimpleGeom, edgeGlassMat);
  top_center_dimple.position.set(0, globeY + globeR + 0.002, 0);
  top_center_dimple.renderOrder = 3;
  root.add(top_center_dimple);

  const pedestalProfile = [
    new THREE.Vector2(0.000, -0.535),
    new THREE.Vector2(0.220, -0.535),
    new THREE.Vector2(0.285, -0.526),
    new THREE.Vector2(0.315, -0.505),
    new THREE.Vector2(0.305, -0.485),
    new THREE.Vector2(0.270, -0.465),
    new THREE.Vector2(0.225, -0.445),
    new THREE.Vector2(0.205, -0.415),
    new THREE.Vector2(0.195, -0.375),
    new THREE.Vector2(0.215, -0.345),
    new THREE.Vector2(0.285, -0.322),
    new THREE.Vector2(0.310, -0.302),
    new THREE.Vector2(0.295, -0.282),
    new THREE.Vector2(0.220, -0.265),
    new THREE.Vector2(0.000, -0.265)
  ];
  const pedestal_baseGeom = new THREE.LatheGeometry(pedestalProfile, 64);
  const pedestal_base = new THREE.Mesh(pedestal_baseGeom, edgeGlassMat);
  pedestal_base.renderOrder = 2;
  root.add(pedestal_base);

  const foot_outer_ringGeom = new THREE.TorusGeometry(0.285, 0.012, 12, 80);
  const foot_outer_ring = new THREE.Mesh(foot_outer_ringGeom, edgeGlassMat);
  foot_outer_ring.rotation.x = Math.PI / 2;
  foot_outer_ring.position.y = -0.512;
  foot_outer_ring.renderOrder = 3;
  root.add(foot_outer_ring);

  const foot_inner_ringGeom = new THREE.TorusGeometry(0.225, 0.007, 10, 64);
  const foot_inner_ring = new THREE.Mesh(foot_inner_ringGeom, edgeGlassMat);
  foot_inner_ring.rotation.x = Math.PI / 2;
  foot_inner_ring.position.y = -0.455;
  foot_inner_ring.renderOrder = 3;
  root.add(foot_inner_ring);

  const collar_lower_ringGeom = new THREE.TorusGeometry(0.205, 0.009, 10, 64);
  const collar_lower_ring = new THREE.Mesh(collar_lower_ringGeom, edgeGlassMat);
  collar_lower_ring.rotation.x = Math.PI / 2;
  collar_lower_ring.position.y = -0.365;
  collar_lower_ring.renderOrder = 3;
  root.add(collar_lower_ring);

  const collar_upper_ringGeom = new THREE.TorusGeometry(0.255, 0.012, 12, 72);
  const collar_upper_ring = new THREE.Mesh(collar_upper_ringGeom, edgeGlassMat);
  collar_upper_ring.rotation.x = Math.PI / 2;
  collar_upper_ring.position.y = -0.305;
  collar_upper_ring.renderOrder = 3;
  root.add(collar_upper_ring);

  const bottom_inner_ringGeom = new THREE.TorusGeometry(0.165, 0.008, 10, 64);
  const bottom_inner_ring = new THREE.Mesh(bottom_inner_ringGeom, edgeGlassMat);
  bottom_inner_ring.rotation.x = Math.PI / 2;
  bottom_inner_ring.position.set(0, globeY + globeR * -0.965, 0);
  bottom_inner_ring.renderOrder = 3;
  root.add(bottom_inner_ring);

  const left_highlightGeom = createSphericalPatchGeometry(THREE, globeR, -0.48, 0.18, -0.12, 0.52, 0.018, 14, 8);
  const left_highlight = new THREE.Mesh(left_highlightGeom, highlightMat);
  left_highlight.position.y = globeY;
  left_highlight.renderOrder = 4;
  root.add(left_highlight);

  const right_highlightGeom = createSphericalPatchGeometry(THREE, globeR, 0.48, 0.18, -0.12, 0.52, 0.018, 14, 8);
  const right_highlight = new THREE.Mesh(right_highlightGeom, highlightMat);
  right_highlight.position.y = globeY;
  right_highlight.renderOrder = 4;
  root.add(right_highlight);

  const lower_highlightGeom = createSphericalPatchGeometry(THREE, globeR, -0.28, 0.13, -0.78, -0.38, 0.018, 12, 6);
  const lower_highlight = new THREE.Mesh(lower_highlightGeom, faintHighlightMat);
  lower_highlight.position.y = globeY;
  lower_highlight.renderOrder = 4;
  root.add(lower_highlight);

  const front_soft_reflectionGeom = createSphericalPatchGeometry(THREE, globeR, 0.0, 0.26, -0.18, 0.18, 0.02, 18, 8);
  const front_soft_reflection = new THREE.Mesh(front_soft_reflectionGeom, faintHighlightMat);
  front_soft_reflection.position.y = globeY;
  front_soft_reflection.renderOrder = 4;
  root.add(front_soft_reflection);

  fitToUnitCube(THREE, root);
  return root;
}

function createSphericalPatchGeometry(THREE, radius, phiCenter, phiHalf, thetaLow, thetaHigh, slope, uSegments, vSegments) {
  const positions = [];
  const normals = [];
  const indices = [];

  for (let v = 0; v <= vSegments; v++) {
    const tv = v / vSegments;
    const theta = thetaLow + (thetaHigh - thetaLow) * tv;
    const centerPhi = phiCenter + slope * (tv - 0.5);

    for (let u = 0; u <= uSegments; u++) {
      const tu = u / uSegments;
      const phi = centerPhi + (tu - 0.5) * phiHalf;
      const sinTheta = Math.sin(theta);
      const nx = Math.cos(phi) * sinTheta;
      const ny = Math.cos(theta);
      const nz = Math.sin(phi) * sinTheta;

      positions.push(nx * radius, ny * radius, nz * radius);
      normals.push(nx, ny, nz);
    }
  }

  for (let v = 0; v < vSegments; v++) {
    for (let u = 0; u < uSegments; u++) {
      const a = v * (uSegments + 1) + u;
      const b = a + 1;
      const c = a + uSegments + 1;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
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
