const symbolDistribution = "NNNNNPPPPPCCCCCJJJJWWWRRRVV";
const randomSymbol = (charset = symbolDistribution) => {
  return charset[Math.floor(Math.random() * charset.length)]
}

const shortUID = () => {
  const random = (Math.random() * 46656) | 0;
  return ("000" + random.toString(36)).slice(-3);
}

const generateUID = () => {
  return shortUID() + shortUID();
}

export const generateSymbol = () => {
  return {
    id: generateUID(),
    symbol: randomSymbol(),
    marked: false
  }
}

export const generateGameGrid = (size: number) => {    
  return Array.from({ length: size }, () => 
    Array.from({ length: size }, () => generateSymbol()) 
  )
}