import React from 'react'

type RobotData = {
  id: number
  username: string
  email: string
  phone_number: string
  social_insurance_number: string
  first_name: string
  last_name: string
  employment: { title: string }
  avatar: string
}

export default function RobotList({ size = 10 }) {
  const [robots, setRobots] = React.useState<RobotData[]>([])
  const [search, setSearch] = React.useState('')

  const fetchRobots = React.useCallback(() => {
    return fetch(`https://random-data-api.com/api/users/random_user?size=${size}`)
      .then(response => response.json())
      .then(data => setRobots(data.map(fixRobotAvatarURL)))
  }, [size])

  React.useEffect(() => {
    fetchRobots()
  }, [fetchRobots])

  const filteredRobots = React.useMemo(() => {
    return robots.filter(robot => {
      const first_name = robot.first_name.toLowerCase()
      const last_name = robot.last_name.toLowerCase()
      const employment = robot.employment.title.toLowerCase()

      const search_ = search
        .split(/\s+/)
        .map(w => w.toLowerCase())
        .join(' ')

      const full_name = first_name + ' ' + last_name
      const full_name_reversed = last_name + ' ' + first_name

      return (
        full_name.includes(search_) ||
        full_name_reversed.includes(search_) ||
        employment.includes(search_)
      )
    })
  }, [robots, search])

  return (
    <div>
      <div className='d-flex justify-content-center m-3'>
        <input
          className='mx-2 p-1'
          type='text'
          placeholder='Search...'
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
        <button className='btn btn-success' onClick={fetchRobots}>
          Fetch Random
        </button>
      </div>
      <div
        className='RobotList'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 315px)',
          gap: '2rem',
        }}
      >
        {filteredRobots.map(robot => (
          <Robot key={robot.id} robot={robot} />
        ))}
      </div>
    </div>
  )
}

function Robot({ robot }: { robot: RobotData }) {
  const [status, setStatus] = React.useState('loading')
  const [isMore, setIsMore] = React.useState(false)

  const fullName = robot.first_name + ' ' + robot.last_name

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  const mainSide = (
    <>
      {isLoading && <div className='Skeleton' />}
      {isError && <div className='Error'>An error occured loading an image.</div>}
      <img
        className='robot-img'
        style={{ display: isSuccess ? 'block' : 'none' }}
        alt=''
        src={robot.avatar}
        onLoad={() => setStatus('success')}
        onError={() => setStatus('error')}
      />
      <h3>{fullName}</h3>
      <p>{robot.employment.title}</p>
    </>
  )

  const moreSide = (
    <div className='Robot-more'>
      <table>
        <tbody>
          <tr>
            <td>Username: </td>
            <td>{robot.username}</td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>{robot.email}</td>
          </tr>
          <tr>
            <td>Phone: </td>
            <td>{robot.phone_number}</td>
          </tr>
          <tr>
            <td>Social: </td>
            <td>{robot.social_insurance_number}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  return (
    <div className='Robot'>
      {isMore ? moreSide : mainSide}
      <div className='d-flex justify-content-end'>
        <button
          className='btn btn-primary'
          onClick={() => setIsMore(prev => !prev)}
          disabled={isLoading || isError}
        >
          {isMore ? 'Back' : 'More'}
        </button>
      </div>
    </div>
  )
}

function fixRobotAvatarURL(robot: RobotData) {
  return { ...robot, avatar: robot.avatar.replace(/\?.+/, '') }
}
