const WORKPIECE_THICKNESS = 22; // толщина заготовки
const PARALLAX = 6;  // ширина фрезеровки по пласти
const DEPTH = 6;  // глубина фрезеровки по Z
const SAFE_HEIGHT = 20;  // безопасная высота по Z
const F = 1200;  // скорость рабочего прохода мм в мин
const ALLOWANCE = 0.10;  // припуск

const X1 = null;
const X2 = null;
const Y1 = null;
const Y2 = null;
const Z = WORKPIECE_THICKNESS - DEPTH;

function getSafeZ(Z) {
    const safeZ = (Z + DEPTH + SAFE_HEIGHT).toFixed(2);
    return safeZ;
}

function getInitZ(Z) {
    const initZ = +(Z - ALLOWANCE).toFixed(2);
    return initZ;
}

function getFinalZ(Z) {
    const finalZ = +(getInitZ(Z) + DEPTH).toFixed(2);
    return finalZ;
}

function getFinalDot(Z) {
    const finalDot = +(getInitZ(Z) + DEPTH - ALLOWANCE).toFixed(2);
    return finalDot;
}

function negativeOffset(initialPosition) {
    const displacedPosition = +(initialPosition - ALLOWANCE).toFixed(2);
    return displacedPosition;
}

function positiveOffset(initialPosition) {
    const displacedPosition = +(initialPosition + ALLOWANCE).toFixed(2);
    return displacedPosition;
}

function getInitX1(X1) {
    const initX1 = negativeOffset(X1);
    return initX1;
}

function getInitX2(X2) {
    const initX2 = positiveOffset(X2);
    return initX2;
}

function getInitY1(Y1) {
    const initY1 = negativeOffset(Y1);
    return initY1;
}

function getInitY2(Y2) {
    const initY2 = positiveOffset(Y2);
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

function getCode(X1, Y1, X2, Y2, Z) {
    const workpiecePoints = ['T1', 'T2', 'T3', 'T4'];
    const arrX = [X1, X1, X2, X2];
    const arrY = [Y1, Y2, Y2, Y1];

    const stringMessage = workpiecePoints.map((point, index) => {
        const X = arrX[index];
        const Y = arrY[index];

        const initX = () => {
            const findInitX = (X === X1) ? getInitX1(X) : getInitX2(X);
            return Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(findInitX);
        };
        const initY = () => {
            const findInitY = (Y === Y1) ? getInitY1(Y) : getInitY2(Y);
            return Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(findInitY);
        };
        const finalX = () => {
            const findFinalX = (X === X1) ? getFinalX1(X) : getFinalX2(X);
            return Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(findFinalX);
        };
        const finalY = () => {
            const findFinalY = (Y === Y1) ? getFinalY1(Y) : getFinalY2(Y);
            return Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(findFinalY);
        };

        const bazeX = Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(X);
        const bazeY = Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(Y);
        const bazeZ = Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(Z);
        const safeZ = Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(getSafeZ(Z));
        const initZ = Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(getInitZ(Z));
        const finalZ = Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(getFinalZ(Z));
        const finalDot = Intl.NumberFormat("en", { style: "decimal", minimumFractionDigits: 2 }).format(getFinalDot(Z));

        const outerString = `
        (Diagonal Line ${index + 1} (${point}))
        G0X${bazeX}Y${bazeY}Z${getSafeZ(Z)}
        G1Z${bazeZ}F${F}
        G1X${bazeX}Y${bazeY}
        G1X${initX()}Y${initY()}Z${initZ}
        X${finalX()}Y${finalY()}Z${finalZ}
        Z${finalDot}
        Z${finalZ}
        G0Z${safeZ}
        (End of the Diagonal Line ${index + 1} (${point})
        `;

        return outerString;
    })

    return stringMessage.join('');
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
