
export function generateNoise(nRow, nColumn)
{
    let grid = []
    for (let i = 0; i < nRow; i++)
    {
        let row = []
        for (let j = 0; j < nColumn; j++)
        {
            row.push(Math.random())
        }
        grid.push(row)
    }
    console.log(grid)
    return grid
}