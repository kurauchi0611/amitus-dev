import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/lecture/index'),
  { ssr: false }
)

function Lecture({props}) {
  return (
    <div>
      <DynamicComponentWithNoSSR props={props}/>
    </div>
  )
}

export default Lecture