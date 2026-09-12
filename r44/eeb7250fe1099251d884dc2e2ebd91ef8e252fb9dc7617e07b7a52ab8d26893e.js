// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "countertop_appliance";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const tower_assembly = new THREE.Group();
  tower_assembly.name = "tower_assembly";
  root.add(tower_assembly);

  const control_assembly = new THREE.Group();
  control_assembly.name = "control_assembly";
  base_assembly.add(control_assembly);

  const base_housingMat = new THREE.MeshStandardMaterial({
    color: 0x68d923,
    metalness: 0.0,
    roughness: 0.3
  });

  const upper_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf4f5f6,
    metalness: 0.0,
    roughness: 0.3
  });

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const dark_seamMat = new THREE.MeshStandardMaterial({
    color: 0x171918,
    metalness: 0.0,
    roughness: 0.8
  });

  const dial_faceMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.3
  });

  const dial_knobMat = new THREE.MeshStandardMaterial({
    color: 0x08090a,
    metalness: 0.0,
    roughness: 0.3
  });

  const dial_gripMat = new THREE.MeshStandardMaterial({
    color: 0x292c2e,
    metalness: 0.0,
    roughness: 0.3
  });

  const dial_markMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e4,
    metalness: 0.0,
    roughness: 0.7
  });

  const feetMat = new THREE.MeshStandardMaterial({
    color: 0x151716,
    metalness: 0.0,
    roughness: 0.8
  });

  const base_housingProfile = [
    new THREE.Vector2(0.00, 0.08),
    new THREE.Vector2(0.43, 0.08),
    new THREE.Vector2(0.50, 0.09),
    new THREE.Vector2(0.55, 0.13),
    new THREE.Vector2(0.58, 0.20),
    new THREE.Vector2(0.59, 0.31),
    new THREE.Vector2(0.59, 0.67),
    new THREE.Vector2(0.58, 0.78),
    new THREE.Vector2(0.55, 0.87),
    new THREE.Vector2(0.50, 0.94),
    new THREE.Vector2(0.00, 0.94)
  ];
  const base_housingGeom = new THREE.LatheGeometry(base_housingProfile, 64);
  const base_housing = new THREE.Mesh(base_housingGeom, base_housingMat);
  base_housing.name = "base_housing";
  base_assembly.add(base_housing);

  const base_bottom_seamGeom = new THREE.TorusGeometry(0.548, 0.007, 8, 64);
  const base_bottom_seam = new THREE.Mesh(base_bottom_seamGeom, base_housingMat);
  base_bottom_seam.name = "base_bottom_seam";
  base_bottom_seam.rotation.x = Math.PI / 2;
  base_bottom_seam.position.y = 0.135;
  base_assembly.add(base_bottom_seam);

  const feetGeom = new THREE.CylinderGeometry(0.065, 0.078, 0.14, 16);
  const feet = new THREE.InstancedMesh(feetGeom, feetMat, 4);
  feet.name = "feet";
  const feet_dummy = new THREE.Object3D();
  const feet_positions = [
    [-0.40, 0.02, 0.25],
    [0.40, 0.02, 0.25],
    [-0.40, 0.02, -0.25],
    [0.40, 0.02, -0.25]
  ];
  for (let i = 0; i < feet_positions.length; i++) {
    const position = feet_positions[i];
    feet_dummy.position.set(position[0], position[1], position[2]);
    feet_dummy.rotation.set(0, 0, 0);
    feet_dummy.scale.set(1, 1, 1);
    feet_dummy.updateMatrix();
    feet.setMatrixAt(i, feet_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  base_assembly.add(feet);

  const lower_metal_bandGeom = new THREE.CylinderGeometry(0.515, 0.525, 0.075, 64);
  const lower_metal_band = new THREE.Mesh(lower_metal_bandGeom, polished_metalMat);
  lower_metal_band.name = "lower_metal_band";
  lower_metal_band.position.y = 0.955;
  tower_assembly.add(lower_metal_band);

  const lower_band_seamGeom = new THREE.TorusGeometry(0.514, 0.006, 8, 64);
  const lower_band_seam = new THREE.Mesh(lower_band_seamGeom, dark_seamMat);
  lower_band_seam.name = "lower_band_seam";
  lower_band_seam.rotation.x = Math.PI / 2;
  lower_band_seam.position.y = 0.922;
  tower_assembly.add(lower_band_seam);

  const upper_bodyProfile = [
    new THREE.Vector2(0.00, 0.965),
    new THREE.Vector2(0.485, 0.965),
    new THREE.Vector2(0.505, 0.985),
    new THREE.Vector2(0.515, 1.025),
    new THREE.Vector2(0.515, 2.390),
    new THREE.Vector2(0.510, 2.425),
    new THREE.Vector2(0.490, 2.445),
    new THREE.Vector2(0.00, 2.445)
  ];
  const upper_bodyGeom = new THREE.LatheGeometry(upper_bodyProfile, 64);
  const upper_body = new THREE.Mesh(upper_bodyGeom, upper_bodyMat);
  upper_body.name = "upper_body";
  tower_assembly.add(upper_body);

  const upper_metal_bandGeom = new THREE.CylinderGeometry(0.520, 0.525, 0.075, 64);
  const upper_metal_band = new THREE.Mesh(upper_metal_bandGeom, polished_metalMat);
  upper_metal_band.name = "upper_metal_band";
  upper_metal_band.position.y = 2.455;
  tower_assembly.add(upper_metal_band);

  const upper_band_seamGeom = new THREE.TorusGeometry(0.516, 0.005, 8, 64);
  const upper_band_seam = new THREE.Mesh(upper_band_seamGeom, dark_seamMat);
  upper_band_seam.name = "upper_band_seam";
  upper_band_seam.rotation.x = Math.PI / 2;
  upper_band_seam.position.y = 2.492;
  tower_assembly.add(upper_band_seam);

  const top_lidProfile = [
    new THREE.Vector2(0.00, 2.485),
    new THREE.Vector2(0.505, 2.485),
    new THREE.Vector2(0.535, 2.505),
    new THREE.Vector2(0.545, 2.535),
    new THREE.Vector2(0.540, 2.570),
    new THREE.Vector2(0.515, 2.595),
    new THREE.Vector2(0.470, 2.610),
    new THREE.Vector2(0.355, 2.620),
    new THREE.Vector2(0.315, 2.625),
    new THREE.Vector2(0.00, 2.625)
  ];
  const top_lidGeom = new THREE.LatheGeometry(top_lidProfile, 64);
  const top_lid = new THREE.Mesh(top_lidGeom, upper_bodyMat);
  top_lid.name = "top_lid";
  tower_assembly.add(top_lid);

  const top_recessGeom = new THREE.CylinderGeometry(0.255, 0.255, 0.008, 64);
  const top_recess = new THREE.Mesh(top_recessGeom, upper_bodyMat);
  top_recess.name = "top_recess";
  top_recess.position.y = 2.628;
  tower_assembly.add(top_recess);

  const top_recess_ringGeom = new THREE.TorusGeometry(0.275, 0.014, 10, 64);
  const top_recess_ring = new THREE.Mesh(top_recess_ringGeom, polished_metalMat);
  top_recess_ring.name = "top_recess_ring";
  top_recess_ring.rotation.x = Math.PI / 2;
  top_recess_ring.position.y = 2.633;
  tower_assembly.add(top_recess_ring);

  const dial_center_y = 0.47;
  const dial_surface_z = 0.592;

  const dial_backingGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.026, 48);
  const dial_backing = new THREE.Mesh(dial_backingGeom, dark_seamMat);
  dial_backing.name = "dial_backing";
  dial_backing.rotation.x = Math.PI / 2;
  dial_backing.position.set(0, dial_center_y, dial_surface_z + 0.006);
  control_assembly.add(dial_backing);

  const dial_bezelGeom = new THREE.CylinderGeometry(0.192, 0.192, 0.028, 48);
  const dial_bezel = new THREE.Mesh(dial_bezelGeom, polished_metalMat);
  dial_bezel.name = "dial_bezel";
  dial_bezel.rotation.x = Math.PI / 2;
  dial_bezel.position.set(0, dial_center_y, dial_surface_z + 0.018);
  control_assembly.add(dial_bezel);

  const dial_faceGeom = new THREE.CylinderGeometry(0.170, 0.170, 0.014, 48);
  const dial_face = new THREE.Mesh(dial_faceGeom, dial_faceMat);
  dial_face.name = "dial_face";
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.set(0, dial_center_y, dial_surface_z + 0.035);
  control_assembly.add(dial_face);

  const dial_outer_rimGeom = new THREE.TorusGeometry(0.181, 0.009, 10, 64);
  const dial_outer_rim = new THREE.Mesh(dial_outer_rimGeom, polished_metalMat);
  dial_outer_rim.name = "dial_outer_rim";
  dial_outer_rim.position.set(0, dial_center_y, dial_surface_z + 0.044);
  control_assembly.add(dial_outer_rim);

  const dial_inner_ringGeom = new THREE.TorusGeometry(0.166, 0.003, 8, 64);
  const dial_inner_ring = new THREE.Mesh(dial_inner_ringGeom, polished_metalMat);
  dial_inner_ring.name = "dial_inner_ring";
  dial_inner_ring.position.set(0, dial_center_y, dial_surface_z + 0.045);
  control_assembly.add(dial_inner_ring);

  const dial_ticksGeom = new THREE.BoxGeometry(0.006, 0.020, 0.004);
  const dial_ticks = new THREE.InstancedMesh(dial_ticksGeom, dial_markMat, 12);
  dial_ticks.name = "dial_ticks";
  const dial_tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    const radius = 0.143;
    dial_tick_dummy.position.set(
      Math.sin(angle) * radius,
      dial_center_y + Math.cos(angle) * radius,
      dial_surface_z + 0.048
    );
    dial_tick_dummy.rotation.set(0, 0, -angle);
    const major = i % 3 === 0;
    dial_tick_dummy.scale.set(major ? 1.35 : 1, major ? 1.35 : 0.72, 1);
    dial_tick_dummy.updateMatrix();
    dial_ticks.setMatrixAt(i, dial_tick_dummy.matrix);
  }
  dial_ticks.instanceMatrix.needsUpdate = true;
  control_assembly.add(dial_ticks);

  const dial_knobShape = new THREE.Shape();
  dial_knobShape.moveTo(-0.030, -0.115);
  dial_knobShape.bezierCurveTo(-0.045, -0.100, -0.048, -0.055, -0.045, 0.020);
  dial_knobShape.lineTo(-0.038, 0.115);
  dial_knobShape.bezierCurveTo(-0.036, 0.135, -0.020, 0.145, 0.000, 0.145);
  dial_knobShape.bezierCurveTo(0.020, 0.145, 0.036, 0.135, 0.038, 0.115);
  dial_knobShape.lineTo(0.045, 0.020);
  dial_knobShape.bezierCurveTo(0.048, -0.055, 0.045, -0.100, 0.030, -0.115);
  dial_knobShape.bezierCurveTo(0.015, -0.125, -0.015, -0.125, -0.030, -0.115);

  const dial_knobGeom = new THREE.ExtrudeGeometry(dial_knobShape, {
    depth: 0.040,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.005,
    bevelSegments: 2
  });
  const dial_knob = new THREE.Mesh(dial_knobGeom, dial_knobMat);
  dial_knob.name = "dial_knob";
  dial_knob.position.set(0, dial_center_y - 0.005, dial_surface_z + 0.046);
  control_assembly.add(dial_knob);

  const dial_gripGeom = new THREE.BoxGeometry(0.012, 0.145, 0.007);
  const dial_grip = new THREE.Mesh(dial_gripGeom, dial_gripMat);
  dial_grip.name = "dial_grip";
  dial_grip.position.set(0.014, dial_center_y + 0.015, dial_surface_z + 0.091);
  control_assembly.add(dial_grip);

  const dial_indicatorGeom = new THREE.BoxGeometry(0.007, 0.026, 0.004);
  const dial_indicator = new THREE.Mesh(dial_indicatorGeom, dial_markMat);
  dial_indicator.name = "dial_indicator";
  dial_indicator.position.set(0, dial_center_y + 0.112, dial_surface_z + 0.096);
  control_assembly.add(dial_indicator);

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