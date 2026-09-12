// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "round_wooden_case";

  const caseR = 1.0;
  const caseDepth = 0.32;

  const case_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x8a5434,
    metalness: 0.0,
    roughness: 0.6,
  });
  const front_wood_rimMat = new THREE.MeshStandardMaterial({
    color: 0x965d36,
    metalness: 0.0,
    roughness: 0.6,
  });
  const rear_wood_rimMat = new THREE.MeshStandardMaterial({
    color: 0x754329,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x4c2b1d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xb4774d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const front_panelMat = new THREE.MeshStandardMaterial({
    color: 0xb78361,
    metalness: 0.5,
    roughness: 0.5,
  });
  const front_panel_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x5b3828,
    metalness: 0.0,
    roughness: 0.7,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });

  const case_bodyGeom = new THREE.CylinderGeometry(
    caseR,
    caseR,
    caseDepth,
    96,
    1,
    false
  );
  const case_body = new THREE.Mesh(case_bodyGeom, case_bodyMat);
  case_body.name = "case_body";
  case_body.rotation.x = Math.PI / 2;
  root.add(case_body);

  const rear_wood_rimGeom = new THREE.TorusGeometry(0.94, 0.06, 16, 96);
  const rear_wood_rim = new THREE.Mesh(rear_wood_rimGeom, rear_wood_rimMat);
  rear_wood_rim.name = "rear_wood_rim";
  rear_wood_rim.position.z = -0.145;
  root.add(rear_wood_rim);

  const front_wood_rimGeom = new THREE.TorusGeometry(0.94, 0.06, 20, 128);
  const front_wood_rim = new THREE.Mesh(
    front_wood_rimGeom,
    front_wood_rimMat
  );
  front_wood_rim.name = "front_wood_rim";
  front_wood_rim.position.z = 0.15;
  root.add(front_wood_rim);

  const front_panelGeom = new THREE.SphereGeometry(1, 96, 48);
  const front_panel = new THREE.Mesh(front_panelGeom, front_panelMat);
  front_panel.name = "front_panel";
  front_panel.scale.set(0.868, 0.868, 0.06);
  front_panel.position.z = 0.17;
  root.add(front_panel);

  const front_panel_edgeGeom = new THREE.TorusGeometry(
    0.868,
    0.012,
    10,
    96
  );
  const front_panel_edge = new THREE.Mesh(
    front_panel_edgeGeom,
    front_panel_edgeMat
  );
  front_panel_edge.name = "front_panel_edge";
  front_panel_edge.position.z = 0.181;
  root.add(front_panel_edge);

  const inner_rim_beadGeom = new THREE.TorusGeometry(
    0.887,
    0.014,
    12,
    128
  );
  const inner_rim_bead = new THREE.Mesh(
    inner_rim_beadGeom,
    front_wood_rimMat
  );
  inner_rim_bead.name = "inner_rim_bead";
  inner_rim_bead.position.z = 0.193;
  root.add(inner_rim_bead);

  const outer_rim_beadGeom = new THREE.TorusGeometry(
    0.985,
    0.012,
    12,
    128
  );
  const outer_rim_bead = new THREE.Mesh(
    outer_rim_beadGeom,
    wood_highlightMat
  );
  outer_rim_bead.name = "outer_rim_bead";
  outer_rim_bead.position.z = 0.19;
  root.add(outer_rim_bead);

  const inner_rim_grooveGeom = new THREE.TorusGeometry(
    0.899,
    0.0035,
    6,
    128
  );
  const inner_rim_groove = new THREE.Mesh(
    inner_rim_grooveGeom,
    wood_grainMat
  );
  inner_rim_groove.name = "inner_rim_groove";
  inner_rim_groove.position.z = 0.204;
  root.add(inner_rim_groove);

  const outer_rim_grooveGeom = new THREE.TorusGeometry(
    0.974,
    0.003,
    6,
    128
  );
  const outer_rim_groove = new THREE.Mesh(
    outer_rim_grooveGeom,
    wood_grainMat
  );
  outer_rim_groove.name = "outer_rim_groove";
  outer_rim_groove.position.z = 0.204;
  root.add(outer_rim_groove);

  const rim_grain_arcs = new THREE.Group();
  rim_grain_arcs.name = "rim_grain_arcs";
  const rimGrainSpecs = [
    [0.908, 0.207, 0.05, 1.45, wood_grainMat],
    [0.925, 0.208, 1.55, 4.75, wood_grainMat],
    [0.944, 0.209, 3.45, 5.8, wood_grainMat],
    [0.962, 0.208, 0.2, 2.8, wood_grainMat],
    [0.978, 0.207, 2.25, 6.5, wood_grainMat],
    [0.918, 0.209, 4.9, 6.9, wood_highlightMat],
    [0.951, 0.21, 5.65, 6.1, wood_highlightMat],
  ];
  for (let i = 0; i < rimGrainSpecs.length; i++) {
    const spec = rimGrainSpecs[i];
    const rim_grain_arcGeom = new THREE.TorusGeometry(
      spec[0],
      0.0025,
      5,
      48,
      spec[3]
    );
    const rim_grain_arc = new THREE.Mesh(
      rim_grain_arcGeom,
      spec[4]
    );
    rim_grain_arc.rotation.z = spec[2];
    rim_grain_arc.position.z = spec[1];
    rim_grain_arcs.add(rim_grain_arc);
  }
  root.add(rim_grain_arcs);

  const rim_jointGeom = new THREE.BoxGeometry(0.012, 0.105, 0.008);
  const rim_joint = new THREE.Mesh(rim_jointGeom, wood_grainMat);
  rim_joint.name = "rim_joint";
  rim_joint.position.set(0.018, -0.94, 0.211);
  rim_joint.rotation.z = -0.08;
  root.add(rim_joint);

  const side_wood_groovesGeom = new THREE.TorusGeometry(
    1.001,
    0.0025,
    5,
    128
  );
  const side_wood_grooves = new THREE.InstancedMesh(
    side_wood_groovesGeom,
    wood_grainMat,
    3
  );
  side_wood_grooves.name = "side_wood_grooves";
  const sideGrooveMatrix = new THREE.Matrix4();
  const sideGrooveDepths = [-0.09, -0.025, 0.045];
  for (let i = 0; i < sideGrooveDepths.length; i++) {
    sideGrooveMatrix.makeTranslation(0, 0, sideGrooveDepths[i]);
    side_wood_grooves.setMatrixAt(i, sideGrooveMatrix);
  }
  side_wood_grooves.instanceMatrix.needsUpdate = true;
  root.add(side_wood_grooves);

  const top_latch = new THREE.Group();
  top_latch.name = "top_latch";
  top_latch.position.set(0, 1.0, 0);

  const top_latch_baseGeom = new THREE.BoxGeometry(0.24, 0.026, 0.105);
  const top_latch_base = new THREE.Mesh(top_latch_baseGeom, chromeMat);
  top_latch_base.name = "top_latch_base";
  top_latch_base.position.set(0, 0.013, -0.015);
  top_latch.add(top_latch_base);

  const top_latch_leafGeom = new THREE.BoxGeometry(0.18, 0.018, 0.075);
  const top_latch_leaf = new THREE.Mesh(top_latch_leafGeom, chromeMat);
  top_latch_leaf.name = "top_latch_leaf";
  top_latch_leaf.position.set(0, 0.034, 0.015);
  top_latch.add(top_latch_leaf);

  const top_latch_hingeGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.17,
    16
  );
  const top_latch_hinge = new THREE.Mesh(
    top_latch_hingeGeom,
    dark_metalMat
  );
  top_latch_hinge.name = "top_latch_hinge";
  top_latch_hinge.rotation.z = Math.PI / 2;
  top_latch_hinge.position.set(0, 0.047, -0.025);
  top_latch.add(top_latch_hinge);

  const top_latch_knobGeom = new THREE.SphereGeometry(0.035, 20, 12);
  const top_latch_knob = new THREE.Mesh(top_latch_knobGeom, chromeMat);
  top_latch_knob.name = "top_latch_knob";
  top_latch_knob.scale.set(1.0, 0.55, 0.8);
  top_latch_knob.position.set(0, 0.064, 0.018);
  top_latch.add(top_latch_knob);

  const top_latch_slotGeom = new THREE.BoxGeometry(0.035, 0.006, 0.018);
  const top_latch_slot = new THREE.Mesh(
    top_latch_slotGeom,
    dark_metalMat
  );
  top_latch_slot.name = "top_latch_slot";
  top_latch_slot.position.set(0, 0.073, 0.018);
  top_latch.add(top_latch_slot);

  root.add(top_latch);

  const left_latch = new THREE.Group();
  left_latch.name = "left_latch";
  left_latch.position.set(-1.0, 0.02, 0);

  const left_latch_baseGeom = new THREE.BoxGeometry(0.13, 0.09, 0.03);
  const left_latch_base = new THREE.Mesh(left_latch_baseGeom, chromeMat);
  left_latch_base.name = "left_latch_base";
  left_latch_base.position.set(0.035, 0, 0.185);
  left_latch.add(left_latch_base);

  const left_latch_claspGeom = new THREE.BoxGeometry(0.085, 0.055, 0.026);
  const left_latch_clasp = new THREE.Mesh(
    left_latch_claspGeom,
    chromeMat
  );
  left_latch_clasp.name = "left_latch_clasp";
  left_latch_clasp.position.set(0.085, 0, 0.207);
  left_latch.add(left_latch_clasp);

  const left_latch_hingeGeom = new THREE.CylinderGeometry(
    0.024,
    0.024,
    0.105,
    16
  );
  const left_latch_hinge = new THREE.Mesh(
    left_latch_hingeGeom,
    dark_metalMat
  );
  left_latch_hinge.name = "left_latch_hinge";
  left_latch_hinge.position.set(-0.005, 0, 0.19);
  left_latch.add(left_latch_hinge);

  const left_latch_knobGeom = new THREE.SphereGeometry(0.034, 20, 12);
  const left_latch_knob = new THREE.Mesh(left_latch_knobGeom, chromeMat);
  left_latch_knob.name = "left_latch_knob";
  left_latch_knob.scale.set(0.8, 1.0, 0.55);
  left_latch_knob.position.set(-0.025, 0, 0.218);
  left_latch.add(left_latch_knob);

  const left_latch_slotGeom = new THREE.BoxGeometry(0.04, 0.008, 0.006);
  const left_latch_slot = new THREE.Mesh(
    left_latch_slotGeom,
    dark_metalMat
  );
  left_latch_slot.name = "left_latch_slot";
  left_latch_slot.position.set(0.075, 0, 0.222);
  left_latch.add(left_latch_slot);

  root.add(left_latch);

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