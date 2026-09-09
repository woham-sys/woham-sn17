function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "gold_diamond_bar_earring_pair";

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd8ad45,
    metalness: 0.65,
    roughness: 0.22,
  });
  const brightGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf0c76a,
    metalness: 0.55,
    roughness: 0.18,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x8a5b16,
    metalness: 0.35,
    roughness: 0.45,
  });
  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.08,
    transparent: true,
    opacity: 0.82,
    emissive: 0xffffff,
    emissiveIntensity: 0.18,
  });
  const facetMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.12,
    emissive: 0xffffff,
    emissiveIntensity: 0.28,
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x2b1d08,
    metalness: 0.2,
    roughness: 0.65,
  });

  const barGeom = new THREE.BoxGeometry(0.18, 0.105, 0.78);
  const frontRailGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.82, 24);
  const sideRailGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.19, 20);
  const endCapGeom = new THREE.SphereGeometry(1, 28, 16);
  const settingGeom = new THREE.TorusGeometry(0.047, 0.009, 10, 28);
  const stoneGeom = new THREE.OctahedronGeometry(0.046, 1);
  const tableGeom = new THREE.CircleGeometry(0.026, 12);
  const prongGeom = new THREE.SphereGeometry(0.009, 12, 8);
  const postGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.56, 20);
  const postTipGeom = new THREE.SphereGeometry(0.027, 16, 10);
  const hingeGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.17, 20);
  const claspBoxGeom = new THREE.BoxGeometry(0.13, 0.075, 0.15);
  const claspLipGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.14, 18);
  const grooveGeom = new THREE.BoxGeometry(0.012, 0.006, 0.55);
  const highlightGeom = new THREE.BoxGeometry(0.035, 0.006, 0.62);

  const left_earring = new THREE.Group();
  left_earring.name = "left_earring";
  left_earring.position.set(-0.34, 0.035, 0.035);
  left_earring.rotation.set(-0.08, -0.24, 0.045);
  root.add(left_earring);

  const right_earring = new THREE.Group();
  right_earring.name = "right_earring";
  right_earring.position.set(0.34, -0.025, -0.025);
  right_earring.rotation.set(0.07, 0.24, -0.045);
  root.add(right_earring);

  function createEarring() {
    const earring_group = new THREE.Group();

    const main_gold_bar = new THREE.Mesh(barGeom, goldMat);
    main_gold_bar.name = "main_gold_bar";
    main_gold_bar.position.set(0, 0, 0);
    earring_group.add(main_gold_bar);

    const front_rounded_rail = new THREE.Mesh(frontRailGeom, brightGoldMat);
    front_rounded_rail.name = "front_rounded_rail";
    front_rounded_rail.rotation.x = Math.PI / 2;
    front_rounded_rail.position.set(0.086, 0.055, 0);
    earring_group.add(front_rounded_rail);

    const rear_rounded_rail = new THREE.Mesh(frontRailGeom, goldMat);
    rear_rounded_rail.name = "rear_rounded_rail";
    rear_rounded_rail.rotation.x = Math.PI / 2;
    rear_rounded_rail.position.set(-0.086, 0.052, 0);
    earring_group.add(rear_rounded_rail);

    const near_end_cap = new THREE.Mesh(endCapGeom, brightGoldMat);
    near_end_cap.name = "near_end_cap";
    near_end_cap.scale.set(0.105, 0.066, 0.075);
    near_end_cap.position.set(0, 0.018, 0.395);
    earring_group.add(near_end_cap);

    const far_end_cap = new THREE.Mesh(endCapGeom, goldMat);
    far_end_cap.name = "far_end_cap";
    far_end_cap.scale.set(0.105, 0.066, 0.075);
    far_end_cap.position.set(0, 0.018, -0.395);
    earring_group.add(far_end_cap);

    const near_side_lip = new THREE.Mesh(sideRailGeom, brightGoldMat);
    near_side_lip.name = "near_side_lip";
    near_side_lip.rotation.z = Math.PI / 2;
    near_side_lip.position.set(0, 0.065, 0.395);
    earring_group.add(near_side_lip);

    const far_side_lip = new THREE.Mesh(sideRailGeom, goldMat);
    far_side_lip.name = "far_side_lip";
    far_side_lip.rotation.z = Math.PI / 2;
    far_side_lip.position.set(0, 0.065, -0.395);
    earring_group.add(far_side_lip);

    const center_recess_groove = new THREE.Mesh(grooveGeom, recessMat);
    center_recess_groove.name = "center_recess_groove";
    center_recess_groove.position.set(0.004, 0.057, 0);
    earring_group.add(center_recess_groove);

    const bright_top_highlight = new THREE.Mesh(highlightGeom, brightGoldMat);
    bright_top_highlight.name = "bright_top_highlight";
    bright_top_highlight.position.set(0.055, 0.083, 0.01);
    earring_group.add(bright_top_highlight);

    const stone_settings = new THREE.InstancedMesh(settingGeom, goldMat, 5);
    stone_settings.name = "stone_settings";
    const stone_stones = new THREE.InstancedMesh(stoneGeom, diamondMat, 5);
    stone_stones.name = "stone_stones";
    const stone_tables = new THREE.InstancedMesh(tableGeom, facetMat, 5);
    stone_tables.name = "stone_tables";
    const stone_prongs = new THREE.InstancedMesh(prongGeom, brightGoldMat, 10);
    stone_prongs.name = "stone_prongs";

    const dummy = new THREE.Object3D();
    const stoneZ = [-0.29, -0.145, 0, 0.145, 0.29];

    for (let i = 0; i < 5; i++) {
      dummy.position.set(0, 0.071, stoneZ[i]);
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      stone_settings.setMatrixAt(i, dummy.matrix);

      dummy.position.set(0, 0.108, stoneZ[i]);
      dummy.rotation.set(0, Math.PI / 4, 0);
      dummy.scale.set(0.92, 0.48, 0.92);
      dummy.updateMatrix();
      stone_stones.setMatrixAt(i, dummy.matrix);

      dummy.position.set(0, 0.132, stoneZ[i]);
      dummy.rotation.set(-Math.PI / 2, 0, Math.PI / 12);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      stone_tables.setMatrixAt(i, dummy.matrix);

      for (let p = 0; p < 2; p++) {
        const px = p === 0 ? -0.049 : 0.049;
        dummy.position.set(px, 0.104, stoneZ[i]);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        stone_prongs.setMatrixAt(i * 2 + p, dummy.matrix);
      }
    }

    stone_settings.instanceMatrix.needsUpdate = true;
    stone_stones.instanceMatrix.needsUpdate = true;
    stone_tables.instanceMatrix.needsUpdate = true;
    stone_prongs.instanceMatrix.needsUpdate = true;
    earring_group.add(stone_settings, stone_stones, stone_tables, stone_prongs);

    const shadow_slot_left = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.01, 0.54), shadowMat);
    shadow_slot_left.name = "shadow_slot_left";
    shadow_slot_left.position.set(-0.096, 0.035, 0);
    earring_group.add(shadow_slot_left);

    const shadow_slot_right = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.01, 0.54), shadowMat);
    shadow_slot_right.name = "shadow_slot_right";
    shadow_slot_right.position.set(0.096, 0.035, 0);
    earring_group.add(shadow_slot_right);

    const post_base_collar = new THREE.Mesh(hingeGeom, brightGoldMat);
    post_base_collar.name = "post_base_collar";
    post_base_collar.rotation.z = Math.PI / 2;
    post_base_collar.position.set(0, -0.052, -0.315);
    earring_group.add(post_base_collar);

    const straight_post = new THREE.Mesh(postGeom, goldMat);
    straight_post.name = "straight_post";
    straight_post.position.set(0, -0.085, -0.315);
    earring_group.add(straight_post);

    const post_tip = new THREE.Mesh(postTipGeom, brightGoldMat);
    post_tip.name = "post_tip";
    post_tip.position.set(0, -0.37, -0.315);
    earring_group.add(post_tip);

    const clasp_body = new THREE.Mesh(claspBoxGeom, goldMat);
    clasp_body.name = "clasp_body";
    clasp_body.position.set(0, -0.105, -0.405);
    earring_group.add(clasp_body);

    const clasp_front_lip = new THREE.Mesh(claspLipGeom, brightGoldMat);
    clasp_front_lip.name = "clasp_front_lip";
    clasp_front_lip.rotation.z = Math.PI / 2;
    clasp_front_lip.position.set(0, -0.075, -0.335);
    earring_group.add(clasp_front_lip);

    const clasp_back_lip = new THREE.Mesh(claspLipGeom, goldMat);
    clasp_back_lip.name = "clasp_back_lip";
    clasp_back_lip.rotation.z = Math.PI / 2;
    clasp_back_lip.position.set(0, -0.075, -0.475);
    earring_group.add(clasp_back_lip);

    const clasp_shadow_gap = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.012, 0.055), shadowMat);
    clasp_shadow_gap.name = "clasp_shadow_gap";
    clasp_shadow_gap.position.set(0, -0.146, -0.405);
    earring_group.add(clasp_shadow_gap);

    return earring_group;
  }

  const left_inner_parts = createEarring();
  left_inner_parts.name = "left_inner_parts";
  left_earring.add(left_inner_parts);

  const right_inner_parts = createEarring();
  right_inner_parts.name = "right_inner_parts";
  right_earring.add(right_inner_parts);

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
    const scale = 0.95 / maxDim;
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
