const PARALLAX = 14;  // ширина фрезеровки по пласти
const DEPTH = 8;  // глубина фрезеровки по Z
const SAFE_HEIGHT = 20;  // безопасная высота по Z
const F = 1200;  // скорость рабочего прохода мм в мин
const ALLOWANCE = 0.10;  // припуск

function showT1(lineNumber, x, y, z) {

    const safeZ = (z + DEPTH + SAFE_HEIGHT).toFixed(2);

    const initX = +(x - ALLOWANCE).toFixed(2);
    const initY = +(y - ALLOWANCE).toFixed(2);
    const initZ = +(z - ALLOWANCE).toFixed(2);

    const finalX = +(initX - PARALLAX).toFixed(2);
    const finalY = +(initY - PARALLAX).toFixed(2);
    const finalZ = +(initZ + DEPTH).toFixed(2);
    const finalDot = +(initZ + DEPTH - ALLOWANCE).toFixed(2);

    const stringMessageT1 = `
    (Diagonal Line ${lineNumber})
    G0X${x}Y${y}Z${safeZ}
    G1Z${z}F${F}
    G1X${x}Y${y}
    G1X${initX}Y${initY}Z${initZ}
    X${finalX}Y${finalY}Z${finalZ}
    Z${finalDot}
    Z${finalZ}
    G0Z${safeZ}
    (End of the Diagonal Line ${lineNumber})
    `;

    return stringMessageT1;
}
/*
(Diagonal Line 1)
G0X78.5Y113.5Z42.0
G1Z14.0F1200
G1X78.5Y113.5
G1X78.40Y113.40Z13.90
X64.40Y99.40Z21.90
Z21.80
Z21.90
(End of the Diagonal Line 1)
*/
function showT2(lineNumber, x, y, z) {

    const safeZ = (z + DEPTH + SAFE_HEIGHT).toFixed(2);

    const initX = +(x - ALLOWANCE).toFixed(2);
    const initY = +(y + ALLOWANCE).toFixed(2);
    const initZ = +(z - ALLOWANCE).toFixed(2);

    const finalX = +(initX - PARALLAX).toFixed(2);
    const finalY = +(initY + PARALLAX).toFixed(2);
    const finalZ = +(initZ + DEPTH).toFixed(2);
    const finalDot = +(initZ + DEPTH - ALLOWANCE).toFixed(2);

    const stringMessageT2 = `
    (Diagonal Line ${lineNumber})
    G0X${x}Y${y}Z${safeZ}
    G1Z${z}F${F}
    G1X${x}Y${y}
    G1X${initX}Y${initY}Z${initZ}
    X${finalX}Y${finalY}Z${finalZ}
    Z${finalDot}
    Z${finalZ}
    G0Z${safeZ}
    (End of the Diagonal Line ${lineNumber})
    `;

    return stringMessageT2;
}

function showT3(lineNumber, x, y, z) {

    const safeZ = (z + DEPTH + SAFE_HEIGHT).toFixed(2);

    const initX = +(x + ALLOWANCE).toFixed(2);
    const initY = +(y + ALLOWANCE).toFixed(2);
    const initZ = +(z - ALLOWANCE).toFixed(2);

    const finalX = +(initX + PARALLAX).toFixed(2);
    const finalY = +(initY + PARALLAX).toFixed(2);
    const finalZ = +(initZ + DEPTH).toFixed(2);
    const finalDot = +(initZ + DEPTH - ALLOWANCE).toFixed(2);

    const stringMessageT3 = `
    (Diagonal Line ${lineNumber})
    G0X${x}Y${y}Z${safeZ}
    G1Z${z}F${F}
    G1X${x}Y${y}
    G1X${initX}Y${initY}Z${initZ}
    X${finalX}Y${finalY}Z${finalZ}
    Z${finalDot}
    Z${finalZ}
    G0Z${safeZ}
    (End of the Diagonal Line ${lineNumber})
    `;

    return stringMessageT3;
}

function showT4(lineNumber, x, y, z) {

    const safeZ = (z + DEPTH + SAFE_HEIGHT).toFixed(2);

    const initX = +(x + ALLOWANCE).toFixed(2);
    const initY = +(y - ALLOWANCE).toFixed(2);
    const initZ = +(z - ALLOWANCE).toFixed(2);

    const finalX = +(initX + PARALLAX).toFixed(2);
    const finalY = +(initY - PARALLAX).toFixed(2);
    const finalZ = +(initZ + DEPTH).toFixed(2);
    const finalDot = +(initZ + DEPTH - ALLOWANCE).toFixed(2);

    const stringMessageT4 = `
    (Diagonal Line ${lineNumber})
    G0X${x}Y${y}Z${safeZ}
    G1Z${z}F${F}
    G1X${x}Y${y}
    G1X${initX}Y${initY}Z${initZ}
    X${finalX}Y${finalY}Z${finalZ}
    Z${finalDot}
    Z${finalZ}
    G0Z${safeZ}
    (End of the Diagonal Line ${lineNumber})
    `;

    return stringMessageT4;
}

console.log(showT1(1, 240.5, 1978.5, 14));
console.log(showT2(2, 240.5, 2057.5, 14));
console.log(showT3(3, 637.5, 2057.5, 14));
console.log(showT4(4, 637.5, 1978.5, 14));