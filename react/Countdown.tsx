import React, { useState } from 'react'
import { TimeSplit } from './typings/global'
import { tick } from './utils/time'
import { useQuery } from 'react-apollo'
import useProduct from 'vtex.product-context/useProduct' 
import { useCssHandles } from "vtex.css-handles"
import productReleaseDateQuery from './queries/productReleaseDate.graphql'

interface CountdownProps {
}

const DEFAULT_TARGET_DATE = (new Date('2020-06-25')).toISOString()
const CSS_HANDLES = ['countdown']

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({}) => {
  const [timeRemaining, setTime] = useState<TimeSplit>({
      hours: '00',
      minutes: '00',
      seconds: '00'
  })
  const handles = useCssHandles(CSS_HANDLES)
  
  const { product: { linkText } } = useProduct()
  const { data, loading, error } = useQuery(productReleaseDateQuery, {
    variables: {
      slug: linkText
    },
    ssr: false
  })
  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    ) 
  }
  if (error) {
    return (
      <div>
        <span>Error!</span>
      </div>
    )
  }

  tick(data?.product?.releaseDate || DEFAULT_TARGET_DATE, setTime)

  return (
    <div className={`${handles.container} t-heading-2 fw3 w-100 c-muted-1`}>
      <div className={`db tc`}>
        {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
      </div>
    </div>
  )
}




Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
  },
}

export default Countdown