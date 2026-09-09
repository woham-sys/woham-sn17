function __sn17_user(THREE) {
  const root = new THREE.Group();
  const instrument = new THREE.Group();
  instrument.rotation.z = -0.92;
  root.add(instrument);

  const silverMat = new THREE.MeshStandardMaterial({ color: 0xf2f2f2, metalness: 0.65, roughness: 0.22 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.7, roughness: 0.2 });
  const darkGoldMat = new THREE.MeshStandardMaterial({ color: 0x8a6418, metalness: 0.6, roughness: 0.35 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.0, roughness: 0.8 });
  const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.38 });

  const rainbowMats = [
    new THREE.MeshStandardMaterial({ color: 0xff2a9a, metalness: 0.25, roughness: 0.25 }),
    new THREE.MeshStandardMaterial({ color: 0xff7a1a, metalness: 0.25, roughness: 0.25 }),
    new THREE.MeshStandardMaterial({ color: 0xffd52a, metalness: 0.25, roughness: 0.25 }),
    new THREE.MeshStandardMaterial({ color: 0x35e34a, metalness: 0.25, roughness: 0.25 }),
    new THREE.MeshStandardMaterial({ color: 0x1fcdf0, metalness: 0.25, roughness: 0.25 }),
    new THREE.MeshStandardMaterial({ color: 0x246bff, metalness: 0.25, roughness: 0.25 }),
    new THREE.MeshStandardMaterial({ color: 0xa33cff, metalness: 0.25, roughness: 0.25 })
  ];

  const main_tube_geom = new THREE.CylinderGeometry(0.145, 0.145, 3.15, 64);
  const main_tube = new THREE.Mesh(main_tube_geom, silverMat);
  main_tube.position.y = -0.18;
  instrument.add(main_tube);

  const lower_rainbow_sleeve_geom = new THREE.CylinderGeometry(0.158, 0.158, 0.58, 64);
  const lower_rainbow_sleeve = new THREE.Group();
  for (let i = 0; i < 7; i++) {
    const h = 0.58 / 7;
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.158, 0.158, h + 0.004, 64), rainbowMats[i]);
    stripe.position.y = -1.49 + h * (i + 0.5);
    lower_rainbow_sleeve.add(stripe);
  }
  instrument.add(lower_rainbow_sleeve);

  const upper_rainbow_sleeve_geom = new THREE.CylinderGeometry(0.158, 0.158, 0.48, 64);
  const upper_rainbow_sleeve = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const h = 0.48 / 6;
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.158, 0.158, h + 0.004, 64), rainbowMats[(i + 3) % 7]);
    stripe.position.y = 1.18 + h * (i + 0.5);
    upper_rainbow_sleeve.add(stripe);
  }
  instrument.add(upper_rainbow_sleeve);

  const center_rainbow_band_geom = new THREE.CylinderGeometry(0.158, 0.158, 0.22, 64);
  const center_rainbow_band = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const h = 0.22 / 3;
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(0.158, 0.158, h + 0.004, 64), rainbowMats[(i + 1) % 3]);
    stripe.position.y = 0.28 + h * (i + 0.5);
    center_rainbow_band.add(stripe);
  }
  instrument.add(center_rainbow_band);

  const bell_flare_geom = new THREE.CylinderGeometry(0.34, 0.158, 0.52, 64);
  const bell_flare = new THREE.Mesh(bell_flare_geom, goldMat);
  bell_flare.position.y = 1.62;
  instrument.add(bell_flare);

  const bell_lip_geom = new THREE.TorusGeometry(0.34, 0.035, 16, 64);
  const bell_lip = new THREE.Mesh(bell_lip_geom, goldMat);
  bell_lip.rotation.x = Math.PI / 2;
  bell_lip.position.y = 1.88;
  instrument.add(bell_lip);

  const bell_inner_shadow_geom = new THREE.CircleGeometry(0.275, 48);
  const bell_inner_shadow = new THREE.Mesh(bell_inner_shadow_geom, darkGoldMat);
  bell_inner_shadow.rotation.x = Math.PI / 2;
  bell_inner_shadow.position.y = 1.886;
  instrument.add(bell_inner_shadow);

  const mouthpiece_tip_geom = new THREE.CylinderGeometry(0.17, 0.17, 0.18, 48);
  const mouthpiece_tip = new THREE.Mesh(mouthpiece_tip_geom, goldMat);
  mouthpiece_tip.position.y = -1.82;
  instrument.add(mouthpiece_tip);

  const mouthpiece_opening_geom = new THREE.CircleGeometry(0.105, 40);
  const mouthpiece_opening = new THREE.Mesh(mouthpiece_opening_geom, blackMat);
  mouthpiece_opening.rotation.x = Math.PI / 2;
  mouthpiece_opening.position.y = -1.916;
  instrument.add(mouthpiece_opening);

  const mouthpiece_lip_geom = new THREE.TorusGeometry(0.135, 0.025, 12, 48);
  const mouthpiece_lip = new THREE.Mesh(mouthpiece_lip_geom, goldMat);
  mouthpiece_lip.rotation.x = Math.PI / 2;
  mouthpiece_lip.position.y = -1.918;
  instrument.add(mouthpiece_lip);

  const silver_collar_geom = new THREE.CylinderGeometry(0.17, 0.17, 0.12, 64);
  const lower_silver_collar = new THREE.Mesh(silver_collar_geom, silverMat);
  lower_silver_collar.position.y = -1.16;
  instrument.add(lower_silver_collar);

  const upper_silver_collar = new THREE.Mesh(silver_collar_geom, silverMat);
  upper_silver_collar.position.y = 0.92;
  instrument.add(upper_silver_collar);

  const gold_trim_ring_geom = new THREE.TorusGeometry(0.16, 0.018, 10, 48);
  const gold_trim_rings = new THREE.InstancedMesh(gold_trim_ring_geom, goldMat, 6);
  const ring_dummy = new THREE.Object3D();
  const ring_y = [-1.22, -1.10, 0.17, 0.39, 0.98, 1.43];
  for (let i = 0; i < ring_y.length; i++) {
    ring_dummy.position.set(0, ring_y[i], 0);
    ring_dummy.rotation.set(Math.PI / 2, 0, 0);
    ring_dummy.updateMatrix();
    gold_trim_rings.setMatrixAt(i, ring_dummy.matrix);
  }
  instrument.add(gold_trim_rings);

  const hole_data = [
    [-1.05, 0.02, 0.075],
    [-0.78, -0.02, 0.082],
    [-0.48, 0.01, 0.078],
    [-0.16, -0.01, 0.082],
    [0.18, 0.02, 0.086],
    [0.48, -0.02, 0.082]
  ];

  const finger_hole_geom = new THREE.CircleGeometry(1, 32);
  const finger_holes = new THREE.InstancedMesh(finger_hole_geom, blackMat, hole_data.length);
  const hole_rim_geom = new THREE.TorusGeometry(1, 0.18, 10, 32);
  const hole_rims = new THREE.InstancedMesh(hole_rim_geom, goldMat, hole_data.length);
  const hole_dummy = new THREE.Object3D();

  for (let i = 0; i < hole_data.length; i++) {
    const y = hole_data[i][0];
    const x = hole_data[i][1];
    const r = hole_data[i][2];
    const z = Math.sqrt(0.145 * 0.145 - x * x) + 0.006;

    hole_dummy.position.set(x, y, z);
    hole_dummy.rotation.set(0, 0, 0);
    hole_dummy.scale.set(r, r, r);
    hole_dummy.updateMatrix();
    finger_holes.setMatrixAt(i, hole_dummy.matrix);

    hole_dummy.position.set(x, y, z + 0.004);
    hole_dummy.scale.set(r * 1.12, r * 1.12, r * 1.12);
    hole_dummy.updateMatrix();
    hole_rims.setMatrixAt(i, hole_dummy.matrix);
  }
  instrument.add(finger_holes);
  instrument.add(hole_rims);

  const key_post_geom = new THREE.CylinderGeometry(0.026, 0.026, 0.085, 16);
  const key_posts = new THREE.InstancedMesh(key_post_geom, goldMat, 4);
  const post_dummy = new THREE.Object3D();
  const post_positions = [
    [-0.18, 0.18, -0.72],
    [0.18, 0.18, -0.36],
    [-0.18, 0.18, 0.02],
    [0.18, 0.18, 0.42]
  ];
  for (let i = 0; i < post_positions.length; i++) {
    post_dummy.position.set(post_positions[i][0], post_positions[i][1], post_positions[i][2]);
    post_dummy.rotation.set(0, 0, 0);
    post_dummy.scale.set(1, 1, 1);
    post_dummy.updateMatrix();
    key_posts.setMatrixAt(i, post_dummy.matrix);
  }
  instrument.add(key_posts);

  const key_touch_piece_geom = new THREE.SphereGeometry(0.055, 24, 12);
  const key_touch_pieces = new THREE.InstancedMesh(key_touch_piece_geom, goldMat, 4);
  const touch_dummy = new THREE.Object3D();
  for (let i = 0; i < post_positions.length; i++) {
    touch_dummy.position.set(post_positions[i][0], 0.225, post_positions[i][2]);
    touch_dummy.scale.set(1.25, 0.35, 0.75);
    touch_dummy.rotation.set(0, 0, 0);
    touch_dummy.updateMatrix();
    key_touch_pieces.setMatrixAt(i, touch_dummy.matrix);
  }
  instrument.add(key_touch_pieces);

  const side_key_lever_curve = new THREE.LineCurve3(
    new THREE.Vector3(-0.16, 0.19, -0.72),
    new THREE.Vector3(0.16, 0.205, -0.18)
  );
  const side_key_lever_geom = new THREE.TubeGeometry(side_key_lever_curve, 1, 0.018, 10);
  const side_key_lever = new THREE.Mesh(side_key_lever_geom, goldMat);
  instrument.add(side_key_lever);

  const upper_key_lever_curve = new THREE.LineCurve3(
    new THREE.Vector3(0.16, 0.205, -0.18),
    new THREE.Vector3(-0.12, 0.21, 0.46)
  );
  const upper_key_lever_geom = new THREE.TubeGeometry(upper_key_lever_curve, 1, 0.018, 10);
  const upper_key_lever = new THREE.Mesh(upper_key_lever_geom, goldMat);
  instrument.add(upper_key_lever);

  const large_key_pad_geom = new THREE.CylinderGeometry(0.105, 0.105, 0.035, 32);
  const large_key_pad = new THREE.Mesh(large_key_pad_geom, goldMat);
  large_key_pad.position.set(-0.08, 0.215, 0.52);
  instrument.add(large_key_pad);

  const large_key_pad_center_geom = new THREE.CylinderGeometry(0.055, 0.055, 0.04, 24);
  const large_key_pad_center = new THREE.Mesh(large_key_pad_center_geom, darkGoldMat);
  large_key_pad_center.position.set(-0.08, 0.237, 0.52);
  instrument.add(large_key_pad_center);

  const small_key_pad_geom = new THREE.CylinderGeometry(0.075, 0.075, 0.03, 28);
  const small_key_pad = new THREE.Mesh(small_key_pad_geom, goldMat);
  small_key_pad.position.set(0.12, 0.205, -0.22);
  instrument.add(small_key_pad);

  const lower_side_button_geom = new THREE.SphereGeometry(0.06, 20, 10);
  const lower_side_button = new THREE.Mesh(lower_side_button_geom, goldMat);
  lower_side_button.position.set(0.17, 0.13, -0.92);
  lower_side_button.scale.set(0.75, 0.35, 1.0);
  instrument.add(lower_side_button);

  const left_highlight_geom = new THREE.PlaneGeometry(0.026, 2.75);
  const left_highlight = new THREE.Mesh(left_highlight_geom, highlightMat);
  left_highlight.position.set(-0.075, -0.12, 0.132);
  instrument.add(left_highlight);

  const right_highlight_geom = new THREE.PlaneGeometry(0.018, 2.45);
  const right_highlight = new THREE.Mesh(right_highlight_geom, highlightMat);
  right_highlight.position.set(0.095, -0.02, 0.118);
  instrument.add(right_highlight);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
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
