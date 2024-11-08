const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/
const switchPlayerTurn = () => {
  if (winner) {
    return
  }
  if (turn === 'X') {
    turn = 'O'
  } else {
    turn = 'X'
  }
  updateMessage()
}

const checkForTie = () => {
  if (winner) {
    return
  }
  if (board.includes('')) {
    tie = false
  } else {
    tie = true
  }
}
const checkForWinner = () => {
  if (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) {
    winner = true
    return true
  }

  if (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) {
    winner = true
    return true
  }

  if (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) {
    winner = true
    return true
  }

  if (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) {
    winner = true
    return true
  }

  if (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) {
    winner = true
    return true
  }

  if (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) {
    winner = true
    return true
  }

  if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
    winner = true
    return true
  }

  if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
    winner = true
    return true
  }

  return false
}
const placePiece = (index) => {
  if (board[index] === 'X' || board[index] === 'O' || winner) {
    return
  }

  board[index] = turn
}

const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  render()
  squareEls.forEach((square) => {
    square.addEventListener('click', handleClick)
  })
}
const render = () => {
  updateBoard()
  updateMessage()
}
const updateBoard = () => {
  for (let i = 0; i < board.length; i++) {
    const square = squareEls[i]
    square.textContent = board[i]
  }
}
const updateMessage = () => {
  if (winner === false && tie === false) {
    messageEl.textContent = `${turn}'s turn`
  } else if (winner === false && tie === true) {
    messageEl.textContent = "It's a tie!"
  } else if (winner === true) {
    messageEl.textContent = `Congratulations ${turn}! You win!`
  }
}
/*----------------------------- Event Listeners -----------------------------*/
const handleClick = (event) => {
  const squareIndex = event.target.id
  placePiece(squareIndex)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  render()
}
resetBtnEl.addEventListener('click', init)

init()
