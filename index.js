const PARALLAX = 6;  // ширина фрезеровки по пласти
const DEPTH = 6;  // глубина фрезеровки по Z
const SAFE_HEIGHT = 20;  // безопасная высота по Z
const F = 1200;  // скорость рабочего прохода мм в мин
const ALLOWANCE = 0.10;  // припуск

const X1 = null;
const X2 = null;
const Y1 = null;
const Y2 = null;

function getSafeZ(z) {
    const safeZ = (z + DEPTH + SAFE_HEIGHT).toFixed(2);
    return safeZ;
}

function getInitZ(z) {
    const initZ = +(z - ALLOWANCE).toFixed(2);
    return initZ;
}

function getFinalZ(z) {
    const finalZ = +(getInitZ(z) + DEPTH).toFixed(2);
    return finalZ;
}

function getFinalDot(z) {
    const finalDot = +(getInitZ(z) + DEPTH - ALLOWANCE).toFixed(2);
    return finalDot;
}

function getInitX1(X1) {
    const initX1 = +(X1 - ALLOWANCE).toFixed(2);
    return initX1;
}

function getInitX2(X2) {
    const initX2 = +(X2 + ALLOWANCE).toFixed(2);
    return initX2;
}

function getInitY1(Y1) {
    const initY1 = +(Y1 - ALLOWANCE).toFixed(2);
    return initY1;
}

function getInitY2(Y2) {
    const initY2 = +(Y2 + ALLOWANCE).toFixed(2);
    return initY2;
}

function getFinalX1(X1) {
    const finalX1 = +(getInitX1(X1) - PARALLAX).toFixed(2);
    return finalX1;
}

function getFinalX2(X2) {
    const finalX2 = +(getInitX2(X2) + PARALLAX).toFixed(2);
    return finalX2;
}

function getFinalY1(Y1) {
    const finalY1 = +(getInitY1(Y1) - PARALLAX).toFixed(2);
    return finalY1;
}

function getFinalY2(Y2) {
    const finalY2 = +(getInitY2(Y2) + PARALLAX).toFixed(2);
    return finalY2;
}

function getCode(X1, Y1, X2, Y2, z) {
    const workpiecePoints = ['T1', 'T2', 'T3', 'T4'];
    const arrX = [X1, X1, X2, X2];
    const arrY = [Y1, Y2, Y2, Y1];

    const stringMessage = workpiecePoints.map((point, index) => {
        const X = arrX[index];
        const Y = arrY[index];

        const initX = (X) => {
            const findInitX = (X === X1) ? getInitX1(X) : getInitX2(X);
            return findInitX;
        };
        const initY = (Y) => {
            const findInitY = (Y === Y1) ? getInitY1(Y) : getInitY2(Y);
            return findInitY;
        };
        const finalX = (X) => {
            const findFinalX = (X === X1) ? getFinalX1(X) : getFinalX2(X);
            return findFinalX;
        };
        const finalY = (Y) => {
            const findFinalY = (Y === Y1) ? getFinalY1(Y) : getFinalY2(Y);
            return findFinalY;
        };

        const safeZ = getSafeZ(z);
        const initZ = getInitZ(z);
        const finalZ = getFinalZ(z);
        const finalDot = getFinalDot(z);

        const outerString = `
        (Diagonal Line ${index + 1} (${point}))
        G0X${X}Y${Y}Z${getSafeZ(z)}
        G1Z${z}F${F}
        G1X${X}Y${Y}
        G1X${initX(X)}Y${initY(Y)}Z${initZ}
        X${finalX(X)}Y${finalY(Y)}Z${finalZ}
        Z${finalDot}
        Z${finalZ}
        G0Z${safeZ}
        (End of the Diagonal Line ${index + 1} (${point})
        `;

        return outerString;
    })
    // function getX (T) {
    //     switch (T) {
    //       case 'T1':
    //         return 'X1';
    //     }
    // }
    return stringMessage.join(' ');
}

console.log(getCode(25, 60, 205, 689, 16));

/*
Test result:
(Diagonal Line 1)
G0X25Y60Z42.00
G1Z16F1200
G1X25Y60
G1X24.9Y59.9Z15.9
X18.9Y53.9Z21.9
Z21.8
Z21.9
G0Z42.00
(End of the Diagonal Line 1)
(Diagonal Line 2)
G0X25Y689Z42.00
G1Z16F1200
G1X25Y689
G1X24.9Y689.1Z15.9
X18.9Y695.1Z21.9
Z21.8
Z21.9
G0Z42.00
(End of the Diagonal Line 2)
(Diagonal Line 3)
G0X205Y689Z42.00
G1Z16F1200
G1X205Y689
G1X205.1Y689.1Z15.9
X211.1Y695.1Z21.9
Z21.8
Z21.9
G0Z42.00
(End of the Diagonal Line 3)
(Diagonal Line 4)
G0X205Y60Z42.00
G1Z16F1200
G1X205Y60
G1X205.1Y59.9Z15.9
X211.1Y53.9Z21.9
Z21.8
Z21.9
G0Z42.00
(End of the Diagonal Line 4)
*/

/*
function getT1(lineNumber, x, y, z) {

    const safeZ = getSafeZ(z);

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

// (Diagonal Line 1)
// G0X78.5Y113.5Z42.0
// G1Z14.0F1200
// G1X78.5Y113.5
// G1X78.40Y113.40Z13.90
// X64.40Y99.40Z21.90
// Z21.80
// Z21.90
// (End of the Diagonal Line 1)

function getT2(lineNumber, x, y, z) {

    const safeZ = getSafeZ(z);

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

function getT3(lineNumber, x, y, z) {

    const safeZ = getSafeZ(z);

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

function getT4(lineNumber, x, y, z) {

    const safeZ = getSafeZ(z);

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

console.log(getT1(1, 239, 2610, 16));
console.log(getT2(2, 239, 2790, 16));
console.log(getT3(3, 868, 2790, 16));
console.log(getT4(4, 868, 2610, 16));
*/
