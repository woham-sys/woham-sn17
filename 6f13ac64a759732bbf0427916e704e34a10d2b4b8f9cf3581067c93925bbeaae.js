function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "octagonal_green_light";

  const housing_group = new THREE.Group();
  housing_group.name = "housing_group";
  root.add(housing_group);

  const lens_group = new THREE.Group();
  lens_group.name = "lens_group";
  root.add(lens_group);

  const hub_group = new THREE.Group();
  hub_group.name = "hub_group";
  root.add(hub_group);

  const dark_green_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x063d18,
    metalness: 0.0,
    roughness: 0.3
  });

  const medium_green_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x087323,
    metalness: 0.0,
    roughness: 0.3
  });

  const edge_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x16a342,
    metalness: 0.0,
    roughness: 0.25
  });

  const lens_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x00c936,
    metalness: 0.0,
    roughness: 0.15,
    transparent: true,
    opacity: 0.5
  });

  const lens_glowMat = new THREE.MeshStandardMaterial({
    color: 0x00ef35,
    metalness: 0.0,
    roughness: 0.25,
    emissive: 0x00ef35,
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.68,
    side: THREE.DoubleSide
  });

  const lens_inner_glowMat = new THREE.MeshStandardMaterial({
    color: 0x00b92d,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x00b92d,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide
  });

  const hub_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x075f1d,
    metalness: 0.0,
    roughness: 0.25
  });

  const hub_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x01260c,
    metalness: 0.0,
    roughness: 0.45
  });

  const screw_metalMat = new THREE.MeshStandardMaterial({
    color: 0x244a31,
    metalness: 0.5,
    roughness: 0.35
  });

  function createOctagonShape(radius, cornerFraction) {
    const shape = new THREE.Shape();
    for (let i = 0; i < 8; i++) {
      const angle = -Math.PI / 2 + i * Math.PI / 4;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }

  function createOctagonRingShape(outerRadius, innerRadius) {
    const shape = createOctagonShape(outerRadius, 0);
    const hole = new THREE.Path();
    for (let i = 7; i >= 0; i--) {
      const angle = -Math.PI / 2 + i * Math.PI / 4;
      const x = Math.cos(angle) * innerRadius;
      const y = Math.sin(angle) * innerRadius;
      if (i === 7) hole.moveTo(x, y);
      else hole.lineTo(x, y);
    }
    hole.closePath();
    shape.holes.push(hole);
    return shape;
  }

  const rear_housingGeom = new THREE.ExtrudeGeometry(
    createOctagonShape(0.49, 0.1),
    {
      depth: 0.15,
      steps: 1,
      curveSegments: 1
    }
  );
  const rear_housing = new THREE.Mesh(rear_housingGeom, dark_green_plasticMat);
  rear_housing.name = "rear_housing";
  rear_housing.position.z = -0.13;
  housing_group.add(rear_housing);

  const outer_bezelGeom = new THREE.ExtrudeGeometry(
    createOctagonRingShape(0.49, 0.405),
    {
      depth: 0.065,
      steps: 1,
      curveSegments: 1
    }
  );
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, medium_green_plasticMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = 0.015;
  housing_group.add(outer_bezel);

  const outer_edge_trimGeom = new THREE.ExtrudeGeometry(
    createOctagonRingShape(0.486, 0.465),
    {
      depth: 0.012,
      steps: 1,
      curveSegments: 1
    }
  );
  const outer_edge_trim = new THREE.Mesh(outer_edge_trimGeom, edge_highlightMat);
  outer_edge_trim.name = "outer_edge_trim";
  outer_edge_trim.position.z = 0.073;
  housing_group.add(outer_edge_trim);

  const inner_edge_trimGeom = new THREE.ExtrudeGeometry(
    createOctagonRingShape(0.414, 0.394),
    {
      depth: 0.014,
      steps: 1,
      curveSegments: 1
    }
  );
  const inner_edge_trim = new THREE.Mesh(inner_edge_trimGeom, dark_green_plasticMat);
  inner_edge_trim.name = "inner_edge_trim";
  inner_edge_trim.position.z = 0.071;
  housing_group.add(inner_edge_trim);

  const inner_edge_highlightGeom = new THREE.ExtrudeGeometry(
    createOctagonRingShape(0.407, 0.397),
    {
      depth: 0.008,
      steps: 1,
      curveSegments: 1
    }
  );
  const inner_edge_highlight = new THREE.Mesh(
    inner_edge_highlightGeom,
    edge_highlightMat
  );
  inner_edge_highlight.name = "inner_edge_highlight";
  inner_edge_highlight.position.z = 0.081;
  housing_group.add(inner_edge_highlight);

  const lens_baseGeom = new THREE.CylinderGeometry(0.394, 0.394, 0.026, 96);
  const lens_base = new THREE.Mesh(lens_baseGeom, lens_glassMat);
  lens_base.name = "lens_base";
  lens_base.rotation.x = Math.PI / 2;
  lens_base.position.z = 0.064;
  lens_group.add(lens_base);

  const lens_domeGeom = new THREE.SphereGeometry(
    1,
    96,
    24,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  const lens_dome = new THREE.Mesh(lens_domeGeom, lens_glassMat);
  lens_dome.name = "lens_dome";
  lens_dome.scale.set(0.389, 0.055, 0.389);
  lens_dome.rotation.x = Math.PI / 2;
  lens_dome.position.z = 0.073;
  lens_group.add(lens_dome);

  const lens_inner_glowGeom = new THREE.RingGeometry(0.085, 0.345, 96);
  const lens_inner_glow = new THREE.Mesh(
    lens_inner_glowGeom,
    lens_inner_glowMat
  );
  lens_inner_glow.name = "lens_inner_glow";
  lens_inner_glow.position.z = 0.078;
  lens_group.add(lens_inner_glow);

  const lens_ring_glowGeom = new THREE.TorusGeometry(0.295, 0.047, 24, 96);
  const lens_ring_glow = new THREE.Mesh(lens_ring_glowGeom, lens_glowMat);
  lens_ring_glow.name = "lens_ring_glow";
  lens_ring_glow.position.z = 0.081;
  lens_group.add(lens_ring_glow);

  const lens_outer_glowGeom = new THREE.RingGeometry(0.245, 0.355, 96);
  const lens_outer_glow = new THREE.Mesh(lens_outer_glowGeom, lens_glowMat);
  lens_outer_glow.name = "lens_outer_glow";
  lens_outer_glow.position.z = 0.108;
  lens_group.add(lens_outer_glow);

  const central_hub_baseGeom = new THREE.CylinderGeometry(
    0.078,
    0.083,
    0.034,
    64
  );
  const central_hub_base = new THREE.Mesh(
    central_hub_baseGeom,
    hub_shadowMat
  );
  central_hub_base.name = "central_hub_base";
  central_hub_base.rotation.x = Math.PI / 2;
  central_hub_base.position.z = 0.101;
  hub_group.add(central_hub_base);

  const central_hub_capGeom = new THREE.SphereGeometry(
    1,
    64,
    16,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  const central_hub_cap = new THREE.Mesh(
    central_hub_capGeom,
    hub_plasticMat
  );
  central_hub_cap.name = "central_hub_cap";
  central_hub_cap.scale.set(0.075, 0.025, 0.075);
  central_hub_cap.rotation.x = Math.PI / 2;
  central_hub_cap.position.z = 0.112;
  hub_group.add(central_hub_cap);

  const central_hub_rimGeom = new THREE.TorusGeometry(0.068, 0.006, 12, 64);
  const central_hub_rim = new THREE.Mesh(
    central_hub_rimGeom,
    hub_shadowMat
  );
  central_hub_rim.name = "central_hub_rim";
  central_hub_rim.position.z = 0.128;
  hub_group.add(central_hub_rim);

  const central_screwGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.012,
    32
  );
  const central_screw = new THREE.Mesh(central_screwGeom, screw_metalMat);
  central_screw.name = "central_screw";
  central_screw.rotation.x = Math.PI / 2;
  central_screw.position.z = 0.139;
  hub_group.add(central_screw);

  const screw_slot_horizontalGeom = new THREE.BoxGeometry(
    0.026,
    0.005,
    0.004
  );
  const screw_slot_horizontal = new THREE.Mesh(
    screw_slot_horizontalGeom,
    hub_shadowMat
  );
  screw_slot_horizontal.name = "screw_slot_horizontal";
  screw_slot_horizontal.position.z = 0.146;
  screw_slot_horizontal.rotation.z = 0.35;
  hub_group.add(screw_slot_horizontal);

  const screw_slot_verticalGeom = new THREE.BoxGeometry(
    0.005,
    0.026,
    0.004
  );
  const screw_slot_vertical = new THREE.Mesh(
    screw_slot_verticalGeom,
    hub_shadowMat
  );
  screw_slot_vertical.name = "screw_slot_vertical";
  screw_slot_vertical.position.z = 0.1465;
  screw_slot_vertical.rotation.z = 0.35;
  hub_group.add(screw_slot_vertical);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) object.scale.setScalar(0.98 / maxDim);
  }

  fitToUnitCube(root);
  return root;
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
