import { IoRefresh } from 'react-icons/io5'
import { useStore } from '@/store'

export const RefreshBtn = () => {
  const { reset } = useStore()

  return (
    <button
      className="btn refresh-btn"
      type="button"
      title="Refresh"
      onClick={reset}
    >
      <IoRefresh size={23} />
    </button>
  )
}
