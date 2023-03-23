export interface Position {
  column: number,
  row: number
}
interface GridSymbol {
  id: string,
  symbol: string,
  marked: boolean
}

/**
 * Island is a group of adjacent matching symbols.
 * The term comes from algorithms finding islands of 1's in a sea of zeros.
 * Here every grid position belongs to an island, there is no sea.
 * The game will mark and remove the islands with 5 or more symbols.
 * The Vincit logo 'V' is a wild symbol, it is included in all neighbouring islands.
 * However, we skip the symbol V when looping over the grid.
 */
export const findIslands = (grid: GridSymbol[][]) => {
  const visited = new Set<string>() // TODO: change to Position[]
  const islands: Record<string, Position[][]> = {} 

  for(let column = 0; column < grid.length; column++) {
    for(let row= 0; row < grid[0].length; row++) {
      const symbol = grid[column][row].symbol
      if(!visited.has(column + ',' + row) && symbol != 'V') {  
        if(islands[symbol] == undefined) islands[symbol] = []      
        const island = islands[symbol].length
        if(islands[symbol][island] == undefined) islands[symbol][island] = []
        explore(grid, column, row, visited, islands, symbol, island)
      }
    }
  }
  //console.log("islands", islands)
  //console.log("visited set", visited)
  return islands
}

/**
 * Recursive function that checks the neighbours if they're the same symbol or a wild.
 * Groups matching symbols into arrays.
 * TODO: why so many arguments?
 */
const explore = ( grid: GridSymbol[][], column: number, row: number,  visited: Set<string>, 
                  islands: Record<string, Position[][]>, symbol: string, island: number) => {
  const columnInBounds = 0 <= column && column < grid.length
  const rowInBounds = 0 <= row && row < grid[0].length
  if(!columnInBounds || !rowInBounds) return false

  const currentSymbol = grid[column][row].symbol 
  const position = column + ',' + row

  if(visited.has(position)) return false  
  if(currentSymbol != symbol && currentSymbol != 'V') return false

  visited.add(position)

  // for score keeping, don't include the same (wild) symbols multiple times
  if(!islands[symbol][island].some(p => p.column == column && p.row == row)) {
    islands[symbol][island].push({ column, row })
  }   

  explore(grid, column + 1, row, visited, islands, symbol, island) // right
  explore(grid, column - 1, row, visited, islands, symbol, island) // left
  explore(grid, column, row + 1, visited, islands, symbol, island) // under
  explore(grid, column, row - 1, visited, islands, symbol, island) // above
  
  // next island can also include this wild symbol 'V'
  if(currentSymbol == 'V') visited.delete(position) 
}