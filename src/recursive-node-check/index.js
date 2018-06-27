'use strict';

const recursiveNodeCheck = (checkedNode, check) => {

    let node = checkedNode;
    while (node && node.parentNode) {

        const result = check(node);

        if (result) {
            return {
                node,
                result,
            };
        }
        node = node.parentNode;
    }
    return null;
};

export default recursiveNodeCheck;
