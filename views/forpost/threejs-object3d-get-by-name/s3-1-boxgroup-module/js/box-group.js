(function (api) {
    // CREATE A BOX GROUP HELPERS
    // creating a group
    const createBoxGroup = function (count, groupNamePrefix, groupNameCount, childNamePrefix) {
        const group = new THREE.Group();
        // SETTING A NAME FOR THE GROUP
        group.name = groupNamePrefix + '_' + groupNameCount;
        let i = 0,
        box,
        len = count;
        while (i < len) {
            box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshNormalMaterial());
            box.position.set(0, 0, 0);
            // SETTING A NAME FOR THE CHILD
            box.name = group.name + '_' + childNamePrefix + '_' + i;
            group.add(box);
            i += 1;
        }
        return group;
    };
    // position children
    const positionChildren = function (group) {
        const prefix = group.name + '_' + 'box_';
        // front
        const box1 = group.getObjectByName(prefix + '0');
        box1.scale.set(1, 1, 3);
        box1.position.set(0, 0, 1);
        // side box objects
        const box2 = group.getObjectByName(prefix + '1');
        box2.scale.set(1, 1, 1);
        box2.position.set(2, 0, 0);
        const box3 = group.getObjectByName(prefix + '2');
        box3.scale.set(1, 1, 1);
        box3.position.set(-2, 0, 0);
        // rear
        const box4 = group.getObjectByName(prefix + '3');
        box4.scale.set(1, 1, 1);
        box4.position.set(0, 0, -2);
    };
    // create user data object
    const createUserData = function (wrap, group) {
        const ud = wrap.userData;
        ud.group = group;
        ud.heading = 0; // heading 0 - 359
        ud.pitch = 0; // pitch -180 - 180
        // direction object
        ud.dir = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        wrap.add(ud.dir);
    };
    // CREATE A BOX GROUP
    let groupCount = 0;
    // main update method
    api.create = function () {
        const wrap = new THREE.Group();
        const group = createBoxGroup(4, 'boxgroup', groupCount, 'box');
        wrap.add(group);
        positionChildren(group);
        createUserData(wrap, group);
        api.update(wrap);
        //group.add(new THREE.BoxHelper(group, 0xffffff));
        // step group count
        groupCount += 1;
        return wrap;
    };
    // UPDATE A BOX GROUP
    api.update = function (wrap) {
        const ud = wrap.userData,
        group = ud.group;
        const headingRadian = Math.PI / 180 * ud.heading;
        const x = Math.cos(headingRadian) * 5,
        z = Math.sin(headingRadian) * 5,
        // might light to work out a better expression for pitch
        y = Math.abs(ud.pitch) / 180 * 5 * (ud.pitch < 0 ? -1 : 1);
        ud.dir.position.set(x, y, z);
        // look at is relative to world space, so this needs to be adjusted for that
        const v = new THREE.Vector3();
        ud.dir.getWorldPosition(v)
        group.lookAt(v);
    };
}
    (this['BoxGroup'] = {}));
