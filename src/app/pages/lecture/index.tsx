import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/lecture/index'),
  { ssr: false }
)

function Lecture() {
  return (
    <div>
      <DynamicComponentWithNoSSR />
    </div>
  )
}

export default Lecture