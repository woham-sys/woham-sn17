// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const tool_assembly = new THREE.Group();
  tool_assembly.rotation.set(-0.08, -0.12, -0.92);
  root.add(tool_assembly);

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
    metalness: 0.6,
    roughness: 0.5,
  });
  const black_recessMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });
  const brass_ringMat = new THREE.MeshStandardMaterial({
    color: 0xb08a45,
    metalness: 0.5,
    roughness: 0.25,
  });

  const connector_bodyGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.30, 40);
  const connector_body = new THREE.Mesh(connector_bodyGeom, polished_metalMat);
  connector_body.position.y = -1.57;
  tool_assembly.add(connector_body);

  const connector_rear_bevelGeom = new THREE.CylinderGeometry(0.105, 0.085, 0.05, 40);
  const connector_rear_bevel = new THREE.Mesh(connector_rear_bevelGeom, polished_metalMat);
  connector_rear_bevel.position.y = -1.745;
  tool_assembly.add(connector_rear_bevel);

  const connector_front_bevelGeom = new THREE.CylinderGeometry(0.062, 0.105, 0.07, 40);
  const connector_front_bevel = new THREE.Mesh(connector_front_bevelGeom, polished_metalMat);
  connector_front_bevel.position.y = -1.385;
  tool_assembly.add(connector_front_bevel);

  const connector_front_collarGeom = new THREE.CylinderGeometry(0.064, 0.064, 0.055, 32);
  const connector_front_collar = new THREE.Mesh(connector_front_collarGeom, silver_metalMat);
  connector_front_collar.position.y = -1.335;
  tool_assembly.add(connector_front_collar);

  const brass_sealing_ringGeom = new THREE.CylinderGeometry(0.109, 0.109, 0.018, 40);
  const brass_sealing_ring = new THREE.Mesh(brass_sealing_ringGeom, brass_ringMat);
  brass_sealing_ring.position.y = -1.705;
  tool_assembly.add(brass_sealing_ring);

  const rear_end_faceGeom = new THREE.RingGeometry(0.043, 0.086, 40);
  const rear_end_face = new THREE.Mesh(rear_end_faceGeom, silver_metalMat);
  rear_end_face.rotation.x = Math.PI / 2;
  rear_end_face.position.y = -1.771;
  tool_assembly.add(rear_end_face);

  const rear_socket_rimGeom = new THREE.TorusGeometry(0.034, 0.008, 10, 32);
  const rear_socket_rim = new THREE.Mesh(rear_socket_rimGeom, polished_metalMat);
  rear_socket_rim.rotation.x = Math.PI / 2;
  rear_socket_rim.position.y = -1.773;
  tool_assembly.add(rear_socket_rim);

  const rear_socket_openingGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.012, 28);
  const rear_socket_opening = new THREE.Mesh(rear_socket_openingGeom, black_recessMat);
  rear_socket_opening.position.y = -1.775;
  tool_assembly.add(rear_socket_opening);

  const rear_socket_depthGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.014, 20);
  const rear_socket_depth = new THREE.Mesh(rear_socket_depthGeom, dark_metalMat);
  rear_socket_depth.position.y = -1.782;
  tool_assembly.add(rear_socket_depth);

  const socket_keywayGeom = new THREE.BoxGeometry(0.012, 0.006, 0.034);
  const socket_keyway = new THREE.Mesh(socket_keywayGeom, black_recessMat);
  socket_keyway.position.set(0, -1.783, 0.006);
  tool_assembly.add(socket_keyway);

  const connector_groovesGeom = new THREE.TorusGeometry(0.101, 0.0025, 6, 32);
  const connector_grooves = new THREE.InstancedMesh(
    connector_groovesGeom,
    dark_metalMat,
    3
  );
  const groove_dummy = new THREE.Object3D();
  const groove_heights = [-1.642, -1.612, -1.582];
  for (let i = 0; i < groove_heights.length; i++) {
    groove_dummy.position.set(0, groove_heights[i], 0);
    groove_dummy.rotation.set(Math.PI / 2, 0, 0);
    groove_dummy.updateMatrix();
    connector_grooves.setMatrixAt(i, groove_dummy.matrix);
  }
  connector_grooves.instanceMatrix.needsUpdate = true;
  tool_assembly.add(connector_grooves);

  const main_shaftGeom = new THREE.CylinderGeometry(0.026, 0.026, 3.16, 32);
  const main_shaft = new THREE.Mesh(main_shaftGeom, polished_metalMat);
  main_shaft.position.y = 0.22;
  tool_assembly.add(main_shaft);

  const shaft_highlightGeom = new THREE.CylinderGeometry(0.0035, 0.0035, 3.08, 8);
  const shaft_highlight = new THREE.Mesh(shaft_highlightGeom, silver_metalMat);
  shaft_highlight.position.set(-0.018, 0.22, 0.021);
  tool_assembly.add(shaft_highlight);

  const shaft_dark_reflectionGeom = new THREE.CylinderGeometry(0.002, 0.002, 3.06, 6);
  const shaft_dark_reflection = new THREE.Mesh(shaft_dark_reflectionGeom, dark_metalMat);
  shaft_dark_reflection.position.set(0.019, 0.22, 0.019);
  tool_assembly.add(shaft_dark_reflection);

  const upper_transition_collarGeom = new THREE.CylinderGeometry(0.034, 0.029, 0.07, 32);
  const upper_transition_collar = new THREE.Mesh(upper_transition_collarGeom, polished_metalMat);
  upper_transition_collar.position.y = 1.81;
  tool_assembly.add(upper_transition_collar);

  const upper_seam_ringGeom = new THREE.TorusGeometry(0.033, 0.0025, 6, 28);
  const upper_seam_ring = new THREE.Mesh(upper_seam_ringGeom, dark_metalMat);
  upper_seam_ring.rotation.x = Math.PI / 2;
  upper_seam_ring.position.y = 1.842;
  tool_assembly.add(upper_seam_ring);

  const upper_sleeveGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.20, 32);
  const upper_sleeve = new THREE.Mesh(upper_sleeveGeom, polished_metalMat);
  upper_sleeve.position.y = 1.94;
  tool_assembly.add(upper_sleeve);

  const sleeve_highlightGeom = new THREE.CylinderGeometry(0.0028, 0.0028, 0.17, 6);
  const sleeve_highlight = new THREE.Mesh(sleeve_highlightGeom, silver_metalMat);
  sleeve_highlight.position.set(-0.022, 1.94, 0.026);
  tool_assembly.add(sleeve_highlight);

  const sleeve_lower_bandGeom = new THREE.TorusGeometry(0.033, 0.002, 6, 28);
  const sleeve_lower_band = new THREE.Mesh(sleeve_lower_bandGeom, brushed_metalMat);
  sleeve_lower_band.rotation.x = Math.PI / 2;
  sleeve_lower_band.position.y = 1.855;
  tool_assembly.add(sleeve_lower_band);

  const tip_bevelGeom = new THREE.CylinderGeometry(0.025, 0.034, 0.045, 32);
  const tip_bevel = new THREE.Mesh(tip_bevelGeom, polished_metalMat);
  tip_bevel.position.y = 2.0675;
  tool_assembly.add(tip_bevel);

  const rounded_tipGeom = new THREE.SphereGeometry(0.025, 24, 12);
  const rounded_tip = new THREE.Mesh(rounded_tipGeom, polished_metalMat);
  rounded_tip.scale.set(1, 0.7, 1);
  rounded_tip.position.y = 2.095;
  tool_assembly.add(rounded_tip);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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