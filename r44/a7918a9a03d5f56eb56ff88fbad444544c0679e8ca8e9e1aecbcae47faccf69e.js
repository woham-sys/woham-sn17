// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const body_group = new THREE.Group();
  const panel_group = new THREE.Group();
  const gemstone_group = new THREE.Group();
  const hardware_group = new THREE.Group();
  root.add(body_group, panel_group, gemstone_group, hardware_group);

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silver_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.45,
  });
  const black_rubberMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });
  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const gemstone_facetMat = new THREE.MeshStandardMaterial({
    color: 0xf4f7fb,
    metalness: 0.0,
    roughness: 0.2,
  });

  function roundedRectShape(width, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  function roundedExtrudeGeometry(width, height, radius, depth, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const main_bodyGeom = roundedExtrudeGeometry(0.62, 4.0, 0.28, 0.34, 0.055);
  const main_body = new THREE.Mesh(main_bodyGeom, polished_metalMat);
  body_group.add(main_body);

  const side_railsGeom = new THREE.CylinderGeometry(0.034, 0.034, 3.34, 16);
  const side_rails = new THREE.InstancedMesh(side_railsGeom, polished_metalMat, 2);
  const rail_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    rail_dummy.position.set(i === 0 ? -0.255 : 0.255, 0, 0.19);
    rail_dummy.rotation.set(0, 0, 0);
    rail_dummy.scale.set(1, 1, 1);
    rail_dummy.updateMatrix();
    side_rails.setMatrixAt(i, rail_dummy.matrix);
  }
  side_rails.instanceMatrix.needsUpdate = true;
  body_group.add(side_rails);

  const side_seamsGeom = new THREE.BoxGeometry(0.012, 3.22, 0.012);
  const side_seams = new THREE.InstancedMesh(side_seamsGeom, black_rubberMat, 2);
  const seam_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    seam_dummy.position.set(i === 0 ? -0.315 : 0.315, 0, 0.17);
    seam_dummy.updateMatrix();
    side_seams.setMatrixAt(i, seam_dummy.matrix);
  }
  side_seams.instanceMatrix.needsUpdate = true;
  body_group.add(side_seams);

  const panel_recessGeom = roundedExtrudeGeometry(0.49, 3.48, 0.12, 0.018, 0.008);
  const panel_recess = new THREE.Mesh(panel_recessGeom, dark_metalMat);
  panel_recess.position.z = 0.226;
  panel_group.add(panel_recess);

  const panel_inlayGeom = roundedExtrudeGeometry(0.42, 3.34, 0.09, 0.014, 0.005);
  const panel_inlay = new THREE.Mesh(panel_inlayGeom, brushed_metalMat);
  panel_inlay.position.z = 0.244;
  panel_group.add(panel_inlay);

  const panel_textureGeom = new THREE.SphereGeometry(0.011, 6, 4);
  const panel_texture = new THREE.InstancedMesh(panel_textureGeom, silver_metalMat, 88);
  const texture_dummy = new THREE.Object3D();
  let texture_index = 0;
  for (let row = 0; row < 22; row++) {
    const y = -1.48 + row * (2.96 / 21);
    for (let column = 0; column < 4; column++) {
      const x = -0.15 + column * 0.1 + (row % 2 === 0 ? -0.008 : 0.008);
      texture_dummy.position.set(x, y, 0.258);
      texture_dummy.rotation.set(0, 0, 0);
      texture_dummy.scale.set(1, 1, 0.35);
      texture_dummy.updateMatrix();
      panel_texture.setMatrixAt(texture_index++, texture_dummy.matrix);
    }
  }
  panel_texture.instanceMatrix.needsUpdate = true;
  panel_group.add(panel_texture);

  const large_gem_y = [-1.31, -0.65, 0.01, 0.67, 1.33];
  const large_gem_radius = 0.18;

  const large_gem_backingsGeom = new THREE.CylinderGeometry(0.174, 0.174, 0.026, 32);
  const large_gem_backings = new THREE.InstancedMesh(
    large_gem_backingsGeom,
    silver_metalMat,
    large_gem_y.length
  );
  const backing_dummy = new THREE.Object3D();
  for (let i = 0; i < large_gem_y.length; i++) {
    backing_dummy.position.set(0, large_gem_y[i], 0.274);
    backing_dummy.rotation.set(Math.PI / 2, 0, 0);
    backing_dummy.scale.set(1, 1, 1);
    backing_dummy.updateMatrix();
    large_gem_backings.setMatrixAt(i, backing_dummy.matrix);
  }
  large_gem_backings.instanceMatrix.needsUpdate = true;
  gemstone_group.add(large_gem_backings);

  const large_gemstonesGeom = new THREE.CylinderGeometry(0.105, 0.17, 0.075, 16, 1);
  const large_gemstones = new THREE.InstancedMesh(
    large_gemstonesGeom,
    gemstoneMat,
    large_gem_y.length
  );
  const gemstone_dummy = new THREE.Object3D();
  for (let i = 0; i < large_gem_y.length; i++) {
    gemstone_dummy.position.set(0, large_gem_y[i], 0.307);
    gemstone_dummy.rotation.set(Math.PI / 2, 0, 0);
    gemstone_dummy.scale.set(1, 1, 1);
    gemstone_dummy.updateMatrix();
    large_gemstones.setMatrixAt(i, gemstone_dummy.matrix);
  }
  large_gemstones.instanceMatrix.needsUpdate = true;
  gemstone_group.add(large_gemstones);

  const large_gem_tablesGeom = new THREE.CircleGeometry(0.105, 16);
  const large_gem_tables = new THREE.InstancedMesh(
    large_gem_tablesGeom,
    gemstone_facetMat,
    large_gem_y.length
  );
  const table_dummy = new THREE.Object3D();
  for (let i = 0; i < large_gem_y.length; i++) {
    table_dummy.position.set(0, large_gem_y[i], 0.346);
    table_dummy.rotation.set(0, 0, 0);
    table_dummy.scale.set(1, 1, 1);
    table_dummy.updateMatrix();
    large_gem_tables.setMatrixAt(i, table_dummy.matrix);
  }
  large_gem_tables.instanceMatrix.needsUpdate = true;
  gemstone_group.add(large_gem_tables);

  const large_gem_bezelsGeom = new THREE.TorusGeometry(0.17, 0.014, 8, 32);
  const large_gem_bezels = new THREE.InstancedMesh(
    large_gem_bezelsGeom,
    polished_metalMat,
    large_gem_y.length
  );
  const bezel_dummy = new THREE.Object3D();
  for (let i = 0; i < large_gem_y.length; i++) {
    bezel_dummy.position.set(0, large_gem_y[i], 0.344);
    bezel_dummy.rotation.set(0, 0, 0);
    bezel_dummy.scale.set(1, 1, 1);
    bezel_dummy.updateMatrix();
    large_gem_bezels.setMatrixAt(i, bezel_dummy.matrix);
  }
  large_gem_bezels.instanceMatrix.needsUpdate = true;
  gemstone_group.add(large_gem_bezels);

  const large_gem_facetsGeom = new THREE.BoxGeometry(0.009, 0.12, 0.006);
  const large_gem_facets = new THREE.InstancedMesh(
    large_gem_facetsGeom,
    gemstone_facetMat,
    large_gem_y.length * 8
  );
  const facet_dummy = new THREE.Object3D();
  let facet_index = 0;
  for (let gem_index = 0; gem_index < large_gem_y.length; gem_index++) {
    for (let facet = 0; facet < 8; facet++) {
      const angle = facet / 8 * Math.PI * 2;
      facet_dummy.position.set(
        Math.sin(angle) * 0.06,
        large_gem_y[gem_index] + Math.cos(angle) * 0.06,
        0.351
      );
      facet_dummy.rotation.set(0, 0, -angle);
      facet_dummy.scale.set(1, 1, 1);
      facet_dummy.updateMatrix();
      large_gem_facets.setMatrixAt(facet_index++, facet_dummy.matrix);
    }
  }
  large_gem_facets.instanceMatrix.needsUpdate = true;
  gemstone_group.add(large_gem_facets);

  const large_gem_centersGeom = new THREE.SphereGeometry(0.026, 10, 6);
  const large_gem_centers = new THREE.InstancedMesh(
    large_gem_centersGeom,
    polished_metalMat,
    large_gem_y.length
  );
  const center_dummy = new THREE.Object3D();
  for (let i = 0; i < large_gem_y.length; i++) {
    center_dummy.position.set(0, large_gem_y[i], 0.357);
    center_dummy.scale.set(1, 1, 0.35);
    center_dummy.updateMatrix();
    large_gem_centers.setMatrixAt(i, center_dummy.matrix);
  }
  large_gem_centers.instanceMatrix.needsUpdate = true;
  gemstone_group.add(large_gem_centers);

  const spacer_y = [-0.98, -0.32, 0.34, 1.0];
  const spacer_settingsGeom = new THREE.CylinderGeometry(0.058, 0.058, 0.022, 20);
  const spacer_settings = new THREE.InstancedMesh(
    spacer_settingsGeom,
    silver_metalMat,
    spacer_y.length
  );
  const spacer_dummy = new THREE.Object3D();
  for (let i = 0; i < spacer_y.length; i++) {
    spacer_dummy.position.set(0, spacer_y[i], 0.278);
    spacer_dummy.rotation.set(Math.PI / 2, 0, 0);
    spacer_dummy.scale.set(1, 1, 1);
    spacer_dummy.updateMatrix();
    spacer_settings.setMatrixAt(i, spacer_dummy.matrix);
  }
  spacer_settings.instanceMatrix.needsUpdate = true;
  gemstone_group.add(spacer_settings);

  const spacer_gemstonesGeom = new THREE.CylinderGeometry(0.026, 0.052, 0.045, 12, 1);
  const spacer_gemstones = new THREE.InstancedMesh(
    spacer_gemstonesGeom,
    gemstoneMat,
    spacer_y.length
  );
  for (let i = 0; i < spacer_y.length; i++) {
    spacer_dummy.position.set(0, spacer_y[i], 0.303);
    spacer_dummy.rotation.set(Math.PI / 2, 0, 0);
    spacer_dummy.scale.set(1, 1, 1);
    spacer_dummy.updateMatrix();
    spacer_gemstones.setMatrixAt(i, spacer_dummy.matrix);
  }
  spacer_gemstones.instanceMatrix.needsUpdate = true;
  gemstone_group.add(spacer_gemstones);

  const spacer_bezelsGeom = new THREE.TorusGeometry(0.052, 0.008, 7, 20);
  const spacer_bezels = new THREE.InstancedMesh(
    spacer_bezelsGeom,
    polished_metalMat,
    spacer_y.length
  );
  for (let i = 0; i < spacer_y.length; i++) {
    spacer_dummy.position.set(0, spacer_y[i], 0.329);
    spacer_dummy.rotation.set(0, 0, 0);
    spacer_dummy.scale.set(1, 1, 1);
    spacer_dummy.updateMatrix();
    spacer_bezels.setMatrixAt(i, spacer_dummy.matrix);
  }
  spacer_bezels.instanceMatrix.needsUpdate = true;
  gemstone_group.add(spacer_bezels);

  const end_holeGeom = new THREE.CylinderGeometry(0.066, 0.066, 0.024, 24);
  const end_hole = new THREE.Mesh(end_holeGeom, black_rubberMat);
  end_hole.position.set(0, -1.93, 0.232);
  hardware_group.add(end_hole);

  const end_hole_rimGeom = new THREE.TorusGeometry(0.066, 0.011, 8, 24);
  const end_hole_rim = new THREE.Mesh(end_hole_rimGeom, polished_metalMat);
  end_hole_rim.position.set(0, -1.93, 0.249);
  hardware_group.add(end_hole_rim);

  const end_hole_highlightGeom = new THREE.BoxGeometry(0.075, 0.012, 0.006);
  const end_hole_highlight = new THREE.Mesh(end_hole_highlightGeom, silver_metalMat);
  end_hole_highlight.position.set(0.008, -1.91, 0.253);
  end_hole_highlight.rotation.z = -0.25;
  hardware_group.add(end_hole_highlight);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}