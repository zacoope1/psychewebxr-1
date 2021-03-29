import {matrix, subset, index, multiply} from 'mathjs';

// Step size to move user with mobile controls
var stepSize = 0.3

export function handleUpCalculation(globalRotX, globalRotY, sX, sY, sZ) {
    console.log(globalRotX);
    console.log(globalRotY);
    let theta = globalRotX + Math.PI / 2
    let fi = globalRotY
    let z = Math.sin(theta) * Math.cos(fi) * stepSize
    let x = Math.sin(theta) * Math.sin(fi) * stepSize
    let y = Math.cos(theta) * stepSize

    var newX = sX - x; // New X Value
    var newY = sY - y; // New Y Value
    var newZ = sZ - z; // New Z Value

    return {newX, newY, newZ}
}

export function handleDownCalculation(globalRotX, globalRotY, sX, sY, sZ){
    let theta = globalRotX + Math.PI / 2
    let fi = globalRotY
    let z = Math.sin(theta) * Math.cos(fi) * stepSize
    let x = Math.sin(theta) * Math.sin(fi) * stepSize
    let y = Math.cos(theta) * stepSize

    var newX = sX + x; // New X Value
    var newY = sY + y; // New Y Value
    var newZ = sZ + z; // New Z Value
    
    return {newX, newY, newZ}
}

export function handleLeftCalculation(globalRotX, globalRotY, sX, sY, sZ){
    let theta = globalRotX + Math.PI / 2
    let fi = globalRotY
    let z = Math.sin(theta) * Math.cos(fi) * stepSize // Forward Z Value
    let x = Math.sin(theta) * Math.sin(fi) * stepSize // Forward X Value
    let y = Math.cos(theta) * stepSize // Forward Y Value

    var t = 3 * Math.PI / 2 // Theta value for Y axis transformation
    // Y axis transformation matrix
    var matrixTran= matrix([[Math.cos(t), 0, Math.sin(t)], 
    [0,1,0], [-1 * Math.sin(t), 0, Math.cos(t)]]);
    var matrixForward = matrix([[x],[y],[z]]);

    // Matrix Transformation
    var matrixResult = multiply(matrixTran, matrixForward);

    // Y axis transformation Operation
    var matx = subset(matrixResult, index(0,0));
    var maty = subset(matrixResult, index(1,0));
    var matz = subset(matrixResult, index(2,0));

    var newX = sX + matx; // New X Value
    var newY = sY + maty; // New Y Value
    var newZ = sZ + matz; // New Z Value

    return {newX, newY, newZ}
}

export function handleRightCalculation(globalRotX, globalRotY, sX, sY, sZ){
    let theta = globalRotX + Math.PI / 2
    let fi = globalRotY
    let z = Math.sin(theta) * Math.cos(fi) * stepSize // Forward Z Value
    let x = Math.sin(theta) * Math.sin(fi) * stepSize // Forward X Value
    let y = Math.cos(theta) * stepSize // Forward Y Value

    var t = 3 * Math.PI / 2 // Theta value for Y axis transformation
    // Y axis transformation matrix
    var matrixTran= matrix([[Math.cos(t), 0, Math.sin(t)], 
    [0,1,0], [-1 * Math.sin(t), 0, Math.cos(t)]]);
    var matrixForward = matrix([[x],[y],[z]]);

    // Y axis transformation Operation
    var matrixResult = multiply(matrixTran, matrixForward);

    var matx = subset(matrixResult, index(0,0));
    var maty = subset(matrixResult, index(1,0));
    var matz = subset(matrixResult, index(2,0));

    var newX = sX - matx; // New X Value
    var newY = sY - maty; // New Y Value
    var newZ = sZ - matz; // New Z Value

    return {newX, newY, newZ}
}