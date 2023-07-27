import {global} from "three/nodes";

export function generateNoise(nColumn, nRow, amplitude = 1)
{
    let grid = []
    for (let i = 0; i < nRow; i++)
    {
        let row = []
        for (let j = 0; j < nColumn; j++)
        {
            row.push(Math.random() * amplitude)
        }
        grid.push(row)
    }
    return grid
}

export function generatePerlinNoise(nColumn, nRow, nColumnNode, nRowNode)
{
    let grid = generateNoise(nColumnNode, nRowNode, 2 * Math.PI)
    let vector = []
    for (let i = 0; i < nRowNode; i++)
    {
        let row = []
        for (let j = 0; j < nColumnNode; j++)
        {
            row.push([Math.cos(grid[i][j]), Math.sin(grid[i][j]) ])
        }
        vector.push(row)
    }
    console.log(vector)

    return grid

}


console.log(global)
console.log(generatePerlinNoise(4, 4))