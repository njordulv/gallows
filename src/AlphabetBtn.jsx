export const AlphabetBtn = ({ letter, onClick, disabled }) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {letter}
    </button>
  )
}
