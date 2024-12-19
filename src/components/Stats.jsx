import { triesCount } from '@/utils'
import { useStore } from '@/store'

export const Stats = () => {
  const { count, attempts, wins, looses } = useStore()

  return (
    <>
      <div className="stats">
        <span>Tries:</span>
        <span className="white">{triesCount(count, attempts)}</span>
      </div>
      <div className="stats">
        <span>Wins:</span>
        <span className="success">{wins}</span>
      </div>
      <div className="stats">
        <span>Looses:</span>
        <span className="danger">{looses}</span>
      </div>
    </>
  )
}
