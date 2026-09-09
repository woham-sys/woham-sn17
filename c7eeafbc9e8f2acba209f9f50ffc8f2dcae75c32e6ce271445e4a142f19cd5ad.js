function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_bookcase";

  const cabinet = new THREE.Group();
  cabinet.name = "cabinet";
  root.add(cabinet);

  const books_group = new THREE.Group();
  books_group.name = "books";
  root.add(books_group);

  const woodMat = new THREE.MeshStandardMaterial({ color: 0x9b744f, metalness: 0.0, roughness: 0.55 });
  const woodLightMat = new THREE.MeshStandardMaterial({ color: 0xb58a61, metalness: 0.0, roughness: 0.52 });
  const woodDarkMat = new THREE.MeshStandardMaterial({ color: 0x6f4d34, metalness: 0.0, roughness: 0.62 });
  const backMat = new THREE.MeshStandardMaterial({ color: 0x493224, metalness: 0.0, roughness: 0.72 });
  const grainMat = new THREE.MeshStandardMaterial({ color: 0x76543a, metalness: 0.0, roughness: 0.8 });
  const pinMat = new THREE.MeshStandardMaterial({ color: 0x241b16, metalness: 0.0, roughness: 0.8 });

  const bookRedMat = new THREE.MeshStandardMaterial({ color: 0xa9473f, metalness: 0.0, roughness: 0.72 });
  const bookBlueMat = new THREE.MeshStandardMaterial({ color: 0x315f86, metalness: 0.0, roughness: 0.72 });
  const bookGreenMat = new THREE.MeshStandardMaterial({ color: 0x4f765c, metalness: 0.0, roughness: 0.72 });
  const bookTanMat = new THREE.MeshStandardMaterial({ color: 0xc4aa7b, metalness: 0.0, roughness: 0.72 });
  const bookBlackMat = new THREE.MeshStandardMaterial({ color: 0x252a2b, metalness: 0.0, roughness: 0.75 });
  const bookCreamMat = new THREE.MeshStandardMaterial({ color: 0xd8cfb8, metalness: 0.0, roughness: 0.72 });
  const bookOrangeMat = new THREE.MeshStandardMaterial({ color: 0xb96745, metalness: 0.0, roughness: 0.72 });
  const bookGrayMat = new THREE.MeshStandardMaterial({ color: 0x77736c, metalness: 0.0, roughness: 0.75 });
  const labelMat = new THREE.MeshStandardMaterial({ color: 0xe8dfc7, metalness: 0.0, roughness: 0.7 });
  const darkLabelMat = new THREE.MeshStandardMaterial({ color: 0x1f2325, metalness: 0.0, roughness: 0.78 });

  const unitBoxGeom = new THREE.BoxGeometry(1, 1, 1);

  function addBox(name, w, h, d, mat, x, y, z, parent) {
    const mesh = new THREE.Mesh(unitBoxGeom, mat);
    mesh.name = name;
    mesh.scale.set(w, h, d);
    mesh.position.set(x, y, z);
    (parent || root).add(mesh);
    return mesh;
  }

  function addInstancedBoxes(name, items, mat, parent) {
    const mesh = new THREE.InstancedMesh(unitBoxGeom, mat, items.length);
    mesh.name = name;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      dummy.position.set(item[0], item[1], item[2]);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(item[3], item[4], item[5]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    (parent || root).add(mesh);
    return mesh;
  }

  const left_side_panel = addBox("left_side_panel", 0.075, 2.18, 0.50, woodMat, -0.565, 1.31, 0, cabinet);
  const right_side_panel = addBox("right_side_panel", 0.075, 2.18, 0.50, woodMat, 0.565, 1.31, 0, cabinet);
  const back_panel = addBox("back_panel", 1.06, 2.12, 0.035, backMat, 0, 1.31, -0.232, cabinet);

  const left_front_stile = addBox("left_front_stile", 0.055, 2.12, 0.055, woodLightMat, -0.535, 1.31, 0.252, cabinet);
  const right_front_stile = addBox("right_front_stile", 0.055, 2.12, 0.055, woodLightMat, 0.535, 1.31, 0.252, cabinet);
  const center_divider = addBox("center_divider", 0.045, 2.10, 0.46, woodMat, 0, 1.31, 0.01, cabinet);
  const center_divider_front_edge = addBox("center_divider_front_edge", 0.052, 2.10, 0.055, woodLightMat, 0, 1.31, 0.252, cabinet);

  const bottom_plinth = addBox("bottom_plinth", 1.24, 0.12, 0.58, woodMat, 0, 0.06, 0, cabinet);
  const bottom_cap = addBox("bottom_cap", 1.29, 0.055, 0.61, woodLightMat, 0, 0.135, 0, cabinet);
  const bottom_shadow_line = addBox("bottom_shadow_line", 1.18, 0.018, 0.025, woodDarkMat, 0, 0.175, 0.286, cabinet);

  const top_crown_lower = addBox("top_crown_lower", 1.20, 0.085, 0.56, woodMat, 0, 2.39, 0, cabinet);
  const top_crown_middle = addBox("top_crown_middle", 1.27, 0.075, 0.59, woodLightMat, 0, 2.465, 0, cabinet);
  const top_crown_upper = addBox("top_crown_upper", 1.34, 0.065, 0.62, woodLightMat, 0, 2.535, 0, cabinet);
  const top_crown_lip = addBox("top_crown_lip", 1.38, 0.035, 0.64, woodMat, 0, 2.585, 0, cabinet);
  const top_front_round_molding = addBox("top_front_round_molding", 1.24, 0.035, 0.045, woodDarkMat, 0, 2.405, 0.292, cabinet);

  const shelfLevels = [0.245, 0.565, 0.885, 1.205, 1.525, 1.845, 2.165];
  const shelfItems = [];
  for (let i = 0; i < shelfLevels.length; i++) {
    shelfItems.push([0, shelfLevels[i], 0.01, 1.06, 0.035, 0.46]);
  }
  const horizontal_shelves = addInstancedBoxes("horizontal_shelves", shelfItems, woodMat, cabinet);

  const shelfFrontLipItems = [];
  for (let i = 0; i < shelfLevels.length; i++) {
    shelfFrontLipItems.push([0, shelfLevels[i] + 0.004, 0.245, 1.06, 0.045, 0.045]);
  }
  const shelf_front_lips = addInstancedBoxes("shelf_front_lips", shelfFrontLipItems, woodLightMat, cabinet);

  const right_panel_inset = addBox("right_panel_inset", 0.012, 1.92, 0.34, woodDarkMat, 0.607, 1.31, -0.005, cabinet);
  const right_panel_top_trim = addBox("right_panel_top_trim", 0.018, 0.035, 0.39, woodLightMat, 0.615, 2.28, -0.005, cabinet);
  const right_panel_bottom_trim = addBox("right_panel_bottom_trim", 0.018, 0.035, 0.39, woodLightMat, 0.615, 0.34, -0.005, cabinet);
  const right_panel_front_trim = addBox("right_panel_front_trim", 0.018, 1.92, 0.035, woodLightMat, 0.615, 1.31, 0.18, cabinet);
  const right_panel_back_trim = addBox("right_panel_back_trim", 0.018, 1.92, 0.035, woodLightMat, 0.615, 1.31, -0.19, cabinet);

  const pinGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.008, 8);
  const pinItems = [];
  for (let row = 0; row < 10; row++) {
    const py = 0.38 + row * 0.19;
    pinItems.push([-0.532, py, 0.284, 1, 1, 1]);
    pinItems.push([0.532, py, 0.284, 1, 1, 1]);
  }
  const shelf_pin_holes = new THREE.InstancedMesh(pinGeom, pinMat, pinItems.length);
  shelf_pin_holes.name = "shelf_pin_holes";
  const pinDummy = new THREE.Object3D();
  for (let i = 0; i < pinItems.length; i++) {
    pinDummy.position.set(pinItems[i][0], pinItems[i][1], pinItems[i][2]);
    pinDummy.rotation.set(Math.PI / 2, 0, 0);
    pinDummy.scale.set(1, 1, 1);
    pinDummy.updateMatrix();
    shelf_pin_holes.setMatrixAt(i, pinDummy.matrix);
  }
  shelf_pin_holes.instanceMatrix.needsUpdate = true;
  cabinet.add(shelf_pin_holes);

  const grainItems = [];
  for (let i = 0; i < 14; i++) {
    const gx = -0.47 + i * 0.071;
    const gh = 1.45 + (i % 4) * 0.18;
    const gy = 0.42 + gh * 0.5 + (i % 2) * 0.08;
    grainItems.push([gx, gy, -0.211, 0.006, gh, 0.004]);
  }
  const back_wood_grain = addInstancedBoxes("back_wood_grain", grainItems, grainMat, cabinet);

  const sideGrainItems = [];
  for (let i = 0; i < 10; i++) {
    const z = -0.17 + i * 0.038;
    const h = 1.35 + (i % 3) * 0.22;
    sideGrainItems.push([0.618, 1.30, z, 0.004, h, 0.006]);
  }
  const right_side_wood_grain = addInstancedBoxes("right_side_wood_grain", sideGrainItems, grainMat, cabinet);

  const bookMats = [bookRedMat, bookBlueMat, bookGreenMat, bookTanMat, bookBlackMat, bookCreamMat, bookOrangeMat, bookGrayMat];
  const spineLabels = [];
  const coverLabels = [];

  function addVerticalBook(parent, name, x, baseY, z, w, h, d, mat, tilt, index) {
    const book = new THREE.Mesh(unitBoxGeom, mat);
    book.name = name;
    book.scale.set(w, h, d);
    book.position.set(x, baseY + h / 2, z);
    book.rotation.z = tilt;
    parent.add(book);

    const labelX = x - Math.sin(tilt) * h * 0.28;
    const labelY = baseY + h * 0.72;
    spineLabels.push([labelX, labelY, z + d / 2 + 0.006, w * 0.62, 0.018, 0.008]);

    if (index % 4 === 0) {
      coverLabels.push([x, baseY + h * 0.18, z + d / 2 + 0.007, w * 0.72, 0.012, 0.008]);
    }
  }

  function addHorizontalBook(parent, name, x, baseY, z, w, h, d, mat, index) {
    const book = new THREE.Mesh(unitBoxGeom, mat);
    book.name = name;
    book.scale.set(w, h, d);
    book.position.set(x, baseY + h / 2, z);
    parent.add(book);

    if (index % 3 !== 1) {
      spineLabels.push([x - w * 0.22, baseY + h * 0.72, z + d / 2 + 0.006, w * 0.30, 0.014, 0.008]);
    }
  }

  function populateBay(parent, prefix, bayIndex) {
    const leftInner = -0.485;
    const rightInner = 0.485;
    const dividerLeft = -0.025;
    const dividerRight = 0.025;
    const zBase = -0.17;
    const d = 0.31;

    for (let level = 0; level < shelfLevels.length - 1; level++) {
      const baseY = shelfLevels[level] + 0.025;
      const topY = shelfLevels[level + 1] - 0.035;
      const availableH = topY - baseY;
      let leftEnd = leftInner;
      let rightStart = rightInner;
      let bookIndex = 0;

      if (level === 2 && bayIndex === 0) {
        const stackW = 0.28;
        const stackH = availableH * 0.72;
        const stackTop = baseY + stackH;
        for (let s = 0; s < 5; s++) {
          addHorizontalBook(parent, prefix + "_stack_" + level + "_" + s, -0.34 + (s % 2) * 0.012, baseY + s * 0.045, zBase + 0.015, stackW - (s % 3) * 0.018, 0.038, d, bookMats[(bayIndex + level + s * 2) % bookMats.length], bookIndex++);
        }
        leftEnd = -0.18;
        rightStart = 0.18;
      } else if (level === 3 && bayIndex === 1) {
        const stackW = 0.26;
        for (let s = 0; s < 4; s++) {
          addHorizontalBook(parent, prefix + "_stack_" + level + "_" + s, 0.30 + (s % 2) * 0.01, baseY + s * 0.043, zBase + 0.015, stackW - (s % 2) * 0.025, 0.038, d, bookMats[(bayIndex + level + s + 3) % bookMats.length], bookIndex++);
        }
        rightStart = 0.12;
      } else if (level === 5 && bayIndex === 0) {
        leftEnd = -0.20;
        rightStart = 0.16;
      } else {
        leftEnd = -0.035;
        rightStart = 0.035;
      }

      const leftMin = Math.max(leftInner, leftEnd);
      const leftMax = Math.min(dividerLeft, rightStart);
      if (leftMax - leftMin > 0.055) {
        const count = 8 + ((level + bayIndex) % 4);
        const gap = 0.006;
        let total = gap * (count - 1);
        for (let b = 0; b < count; b++) total += 0.035 + ((b + level + bayIndex) % 3) * 0.008;
        const scale = Math.min(1, (leftMax - leftMin) / total);
        let cursor = leftMin;
        for (let b = 0; b < count; b++) {
          const w = (0.035 + ((b + level + bayIndex) % 3) * 0.008) * scale;
          const h = availableH * (0.82 + ((b + level) % 4) * 0.035);
          const tilt = (((b + level * 2 + bayIndex) % 5) - 2) * 0.012;
          addVerticalBook(parent, prefix + "_vertical_book_" + level + "_" + b, cursor + w / 2, baseY, zBase, w, h, d, bookMats[(b * 2 + level + bayIndex) % bookMats.length], tilt, bookIndex++);
          cursor += w + gap;
        }
      }

      const rightMin = Math.max(dividerRight, rightStart);
      const rightMax = Math.min(rightInner, rightStart + 0.001 ? rightInner : rightStart);
      if (rightMax - rightMin > 0.055) {
        const count = 7 + ((level * 2 + bayIndex) % 4);
        const gap = 0.006;
        let total = gap * (count - 1);
        for (let b = 0; b < count; b++) total += 0.036 + ((b + level * 3 + bayIndex) % 3) * 0.008;
        const scale = Math.min(1, (rightMax - rightMin) / total);
        let cursor = rightMin;
        for (let b = 0; b < count; b++) {
          const w = (0.036 + ((b + level * 3 + bayIndex) % 3) * 0.008) * scale;
          const h = availableH * (0.83 + ((b * 2 + level) % 4) * 0.032);
          const tilt = (((b * 2 + level + bayIndex) % 5) - 2) * 0.011;
          addVerticalBook(parent, prefix + "_vertical_book_right_" + level + "_" + b, cursor + w / 2, baseY, zBase, w, h, d, bookMats[(b + level * 3 + bayIndex + 2) % bookMats.length], tilt, bookIndex++);
          cursor += w + gap;
        }
      }
    }
  }

  const left_bay_books = new THREE.Group();
  left_bay_books.name = "left_bay_books";
  books_group.add(left_bay_books);
  populateBay(left_bay_books, "left_bay", 0);

  const right_bay_books = new THREE.Group();
  right_bay_books.name = "right_bay_books";
  books_group.add(right_bay_books);
  populateBay(right_bay_books, "right_bay", 1);

  const creamSpineLabels = [];
  const darkSpineLabels = [];
  for (let i = 0; i < spineLabels.length; i++) {
    if (i % 2 === 0) creamSpineLabels.push(spineLabels[i]);
    else darkSpineLabels.push(spineLabels[i]);
  }
  const cream_spine_labels = addInstancedBoxes("cream_spine_labels", creamSpineLabels, labelMat, books_group);
  const dark_spine_labels = addInstancedBoxes("dark_spine_labels", darkSpineLabels, darkLabelMat, books_group);

  const tan_cover_labels = addInstancedBoxes("tan_cover_labels", coverLabels, labelMat, books_group);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const ctr = new THREE.Vector3();
  box.getCenter(ctr);
  root.position.sub(ctr);
  const m = Math.max(size.x, size.y, size.z);
  if (m > 0) root.scale.setScalar(0.98 / m);
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
