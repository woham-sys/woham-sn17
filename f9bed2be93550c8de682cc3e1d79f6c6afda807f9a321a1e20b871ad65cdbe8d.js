function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "cobalt_glass_vase";

  const vase_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x087fd1,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.45,
    thickness: 0.18,
    attenuationColor: 0x0069c8,
    attenuationDistance: 1.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    side: THREE.DoubleSide,
  });

  const dark_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x07165f,
    metalness: 0.0,
    roughness: 0.1,
    transmission: 0.25,
    thickness: 0.12,
    attenuationColor: 0x07165f,
    attenuationDistance: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    side: THREE.DoubleSide,
  });

  const spiral_ribbonMat = new THREE.MeshPhysicalMaterial({
    color: 0x0b287d,
    metalness: 0.0,
    roughness: 0.1,
    transmission: 0.22,
    thickness: 0.05,
    attenuationColor: 0x0b287d,
    attenuationDistance: 0.7,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const spiral_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0x174aa6,
    metalness: 0.0,
    roughness: 0.1,
    transmission: 0.3,
    thickness: 0.025,
    attenuationColor: 0x174aa6,
    attenuationDistance: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    transparent: true,
    opacity: 0.58,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const vase_bodyProfile = [
    new THREE.Vector2(0.00, -0.62),
    new THREE.Vector2(0.22, -0.62),
    new THREE.Vector2(0.29, -0.59),
    new THREE.Vector2(0.36, -0.54),
    new THREE.Vector2(0.43, -0.45),
    new THREE.Vector2(0.49, -0.33),
    new THREE.Vector2(0.53, -0.18),
    new THREE.Vector2(0.55, 0.00),
    new THREE.Vector2(0.54, 0.16),
    new THREE.Vector2(0.50, 0.30),
    new THREE.Vector2(0.44, 0.42),
    new THREE.Vector2(0.36, 0.52),
    new THREE.Vector2(0.29, 0.61),
    new THREE.Vector2(0.25, 0.70),
    new THREE.Vector2(0.24, 0.78),
    new THREE.Vector2(0.25, 0.84),
    new THREE.Vector2(0.29, 0.87),
    new THREE.Vector2(0.31, 0.89),
    new THREE.Vector2(0.30, 0.92),
    new THREE.Vector2(0.27, 0.94),
    new THREE.Vector2(0.22, 0.94),
    new THREE.Vector2(0.20, 0.92),
    new THREE.Vector2(0.21, 0.89),
    new THREE.Vector2(0.23, 0.86),
    new THREE.Vector2(0.22, 0.80),
    new THREE.Vector2(0.22, 0.73),
    new THREE.Vector2(0.24, 0.65),
    new THREE.Vector2(0.28, 0.57),
    new THREE.Vector2(0.34, 0.48),
    new THREE.Vector2(0.41, 0.37),
    new THREE.Vector2(0.47, 0.24),
    new THREE.Vector2(0.50, 0.09),
    new THREE.Vector2(0.50, -0.08),
    new THREE.Vector2(0.48, -0.23),
    new THREE.Vector2(0.43, -0.37),
    new THREE.Vector2(0.36, -0.48),
    new THREE.Vector2(0.28, -0.55),
    new THREE.Vector2(0.18, -0.58),
    new THREE.Vector2(0.00, -0.58),
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_bodyProfile, 96);
  vase_bodyGeom.computeVertexNormals();
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  root.add(vase_body);

  const mouth_rimGeom = new THREE.TorusGeometry(0.255, 0.045, 18, 96);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, vase_bodyMat);
  mouth_rim.name = "mouth_rim";
  mouth_rim.rotation.x = Math.PI / 2;
  mouth_rim.position.y = 0.915;
  root.add(mouth_rim);

  const neck_bandGeom = new THREE.TorusGeometry(0.247, 0.008, 10, 80);
  const neck_band = new THREE.Mesh(neck_bandGeom, dark_glassMat);
  neck_band.name = "neck_band";
  neck_band.rotation.x = Math.PI / 2;
  neck_band.position.y = 0.845;
  root.add(neck_band);

  const base_footProfile = [
    new THREE.Vector2(0.00, -0.82),
    new THREE.Vector2(0.27, -0.82),
    new THREE.Vector2(0.32, -0.81),
    new THREE.Vector2(0.36, -0.78),
    new THREE.Vector2(0.37, -0.74),
    new THREE.Vector2(0.36, -0.70),
    new THREE.Vector2(0.33, -0.66),
    new THREE.Vector2(0.28, -0.62),
    new THREE.Vector2(0.22, -0.60),
    new THREE.Vector2(0.00, -0.60),
  ];
  const base_footGeom = new THREE.LatheGeometry(base_footProfile, 96);
  base_footGeom.computeVertexNormals();
  const base_foot = new THREE.Mesh(base_footGeom, dark_glassMat);
  base_foot.name = "base_foot";
  root.add(base_foot);

  const base_lower_ringGeom = new THREE.TorusGeometry(0.305, 0.018, 12, 80);
  const base_lower_ring = new THREE.Mesh(base_lower_ringGeom, dark_glassMat);
  base_lower_ring.name = "base_lower_ring";
  base_lower_ring.rotation.x = Math.PI / 2;
  base_lower_ring.position.y = -0.805;
  root.add(base_lower_ring);

  const base_upper_ringGeom = new THREE.TorusGeometry(0.275, 0.014, 12, 80);
  const base_upper_ring = new THREE.Mesh(base_upper_ringGeom, dark_glassMat);
  base_upper_ring.name = "base_upper_ring";
  base_upper_ring.rotation.x = Math.PI / 2;
  base_upper_ring.position.y = -0.625;
  root.add(base_upper_ring);

  const radius_samples = [
    [-0.58, 0.28],
    [-0.50, 0.39],
    [-0.40, 0.46],
    [-0.25, 0.51],
    [-0.08, 0.54],
    [0.10, 0.53],
    [0.25, 0.49],
    [0.40, 0.43],
    [0.52, 0.35],
    [0.62, 0.28],
    [0.72, 0.25],
    [0.82, 0.25],
  ];

  function bodyRadiusAt(y) {
    if (y <= radius_samples[0][0]) return radius_samples[0][1];
    for (let i = 0; i < radius_samples.length - 1; i++) {
      const a = radius_samples[i];
      const b = radius_samples[i + 1];
      if (y <= b[0]) {
        const t = (y - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return radius_samples[radius_samples.length - 1][1];
  }

  function createSpiralRibbonGeometry(y0, y1, turns, phase, width) {
    const segments = 112;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const centerAngle = phase + turns * Math.PI * 2 * t;
      const centerY = y0 + (y1 - y0) * t;
      const taper = Math.sin(Math.PI * t);
      const halfWidth = width * (0.16 + 0.84 * taper);
      const angleOffset = halfWidth / Math.max(bodyRadiusAt(centerY), 0.1);
      const lowY = centerY - halfWidth * 0.16;
      const highY = centerY + halfWidth * 0.16;
      const lowR = bodyRadiusAt(lowY) + 0.009;
      const highR = bodyRadiusAt(highY) + 0.009;
      const angleA = centerAngle - angleOffset;
      const angleB = centerAngle + angleOffset;

      positions.push(
        Math.cos(angleA) * lowR,
        lowY,
        Math.sin(angleA) * lowR,
        Math.cos(angleB) * highR,
        highY,
        Math.sin(angleB) * highR
      );
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, c, b, b, c, d);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const spiral_ribbon_1Geom = createSpiralRibbonGeometry(
    -0.56, 0.50, 1.18, 0.20, 0.105
  );
  const spiral_ribbon_1 = new THREE.Mesh(spiral_ribbon_1Geom, spiral_ribbonMat);
  spiral_ribbon_1.name = "spiral_ribbon_1";
  root.add(spiral_ribbon_1);

  const spiral_ribbon_2Geom = createSpiralRibbonGeometry(
    -0.54, 0.46, 1.05, 2.25, 0.085
  );
  const spiral_ribbon_2 = new THREE.Mesh(spiral_ribbon_2Geom, spiral_ribbonMat);
  spiral_ribbon_2.name = "spiral_ribbon_2";
  root.add(spiral_ribbon_2);

  const spiral_ribbon_3Geom = createSpiralRibbonGeometry(
    -0.52, 0.42, 0.92, 4.35, 0.07
  );
  const spiral_ribbon_3 = new THREE.Mesh(spiral_ribbon_3Geom, spiral_ribbonMat);
  spiral_ribbon_3.name = "spiral_ribbon_3";
  root.add(spiral_ribbon_3);

  const spiral_edge_1Geom = createSpiralRibbonGeometry(
    -0.55, 0.49, 1.18, 0.20, 0.038
  );
  const spiral_edge_1 = new THREE.Mesh(spiral_edge_1Geom, spiral_edgeMat);
  spiral_edge_1.name = "spiral_edge_1";
  root.add(spiral_edge_1);

  const spiral_edge_2Geom = createSpiralRibbonGeometry(
    -0.53, 0.45, 1.05, 2.25, 0.032
  );
  const spiral_edge_2 = new THREE.Mesh(spiral_edge_2Geom, spiral_edgeMat);
  spiral_edge_2.name = "spiral_edge_2";
  root.add(spiral_edge_2);

  const spiral_edge_3Geom = createSpiralRibbonGeometry(
    -0.51, 0.41, 0.92, 4.35, 0.026
  );
  const spiral_edge_3 = new THREE.Mesh(spiral_edge_3Geom, spiral_edgeMat);
  spiral_edge_3.name = "spiral_edge_3";
  root.add(spiral_edge_3);

  function placeSurfacePatch(mesh, angle, y, tilt) {
    const radius = bodyRadiusAt(y) + 0.012;
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();
    mesh.position.set(normal.x * radius, y, normal.z * radius);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    mesh.rotateZ(tilt);
  }

  const front_highlight_leftGeom = new THREE.CircleGeometry(0.075, 28);
  const front_highlight_left = new THREE.Mesh(front_highlight_leftGeom, highlightMat);
  front_highlight_left.name = "front_highlight_left";
  front_highlight_left.scale.set(0.62, 1.75, 1);
  placeSurfacePatch(front_highlight_left, 1.92, 0.47, -0.18);
  root.add(front_highlight_left);

  const front_highlight_rightGeom = new THREE.CircleGeometry(0.085, 28);
  const front_highlight_right = new THREE.Mesh(front_highlight_rightGeom, highlightMat);
  front_highlight_right.name = "front_highlight_right";
  front_highlight_right.scale.set(0.72, 1.65, 1);
  placeSurfacePatch(front_highlight_right, 1.18, 0.39, 0.14);
  root.add(front_highlight_right);

  const lower_highlightGeom = new THREE.CircleGeometry(0.09, 28);
  const lower_highlight = new THREE.Mesh(lower_highlightGeom, highlightMat);
  lower_highlight.name = "lower_highlight";
  lower_highlight.scale.set(1.25, 0.55, 1);
  placeSurfacePatch(lower_highlight, 1.50, -0.25, -0.32);
  root.add(lower_highlight);

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
